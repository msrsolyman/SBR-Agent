import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Engines & Services
import { WorkflowEngine } from './services/WorkflowEngine.js';
import { RagEngine } from './services/RagEngine.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_cyber_security_key';

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false // Disabled for testing/embedding local styles & assets
}));
app.use(express.json());

// MongoDB connection with graceful catch to support pure mock mode
let dbConnected = false;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sbr_agent_ai')
  .then(() => {
    console.log('[Database] MongoDB Connected Successfully.');
    dbConnected = true;
  })
  .catch(err => {
    console.warn('[Database] MongoDB Connection failed. Booting SBR Agent AI in Mock Database Sandbox mode!');
  });

// In-Memory Database for instant Sandbox executions if DB is offline
const memoryStore = {
  users: [
    { _id: "usr_1", name: "Guest User", email: "guest@sbr.ai", role: "Owner", onboardingCompleted: true }
  ],
  agents: [
    {
      _id: "agt_101",
      name: "SBR Support Bot",
      avatar: "🤖",
      category: "Customer Support",
      description: "Handles customer inquiries and billing tickets.",
      model: "gemini-1.5-pro",
      temperature: 0.5,
      personality: "Professional, polite support representative.",
      tone: "Empathetic",
      language: "English",
      status: "Active",
      createdAt: new Date()
    },
    {
      _id: "agt_102",
      name: "DeepSales Agent",
      avatar: "📈",
      category: "E-commerce",
      description: "Drives customer retention and handles lead generation.",
      model: "deepseek-coder",
      temperature: 0.8,
      personality: "Highly energetic, persuasive sales professional.",
      tone: "Energetic",
      language: "English",
      status: "Active",
      createdAt: new Date()
    }
  ],
  workflows: [
    {
      _id: "wf_201",
      name: "WhatsApp Lead Capture",
      description: "Auto-engages users arriving from ads and captures email leads.",
      status: "Active",
      nodes: [
        { id: "node_1", type: "trigger", position: { x: 50, y: 150 }, data: { label: "Trigger: Webhook Input" } },
        { id: "node_2", type: "aiResponse", position: { x: 250, y: 150 }, data: { prompt: "Formulate a custom greetings for lead: {{leadName}} interested in SaaS." } },
        { id: "node_3", type: "whatsappSend", position: { x: 480, y: 150 }, data: { phone: "01800000000", message: "{{lastResponse}}" } }
      ],
      edges: [
        { id: "e1-2", source: "node_1", target: "node_2" },
        { id: "e2-3", source: "node_2", target: "node_3" }
      ]
    }
  ],
  conversations: [],
  knowledgeBases: [
    { _id: "kb_301", name: "SBR SaaS Product Docs.pdf", type: "PDF", sizeBytes: 1542000, status: "Chunked", chunksCount: 140, createdAt: new Date() },
    { _id: "kb_302", name: "FAQ website crawling", type: "Website", sourceUrl: "https://sbr.ai/faq", status: "Chunked", chunksCount: 42, createdAt: new Date() }
  ],
  marketplace: [
    { _id: "mp_401", agentId: "agt_101", name: "Customer Support Genius", category: "Customer Support", price: 0, installsCount: 1240, rating: 4.8 },
    { _id: "mp_402", agentId: "agt_102", name: "Enterprise Closer Bot", category: "Finance", price: 49, installsCount: 382, rating: 4.9 }
  ],
  billing: {
    plan: "Pro",
    tokenLimit: 500000,
    tokensUsed: 142380,
    conversationsLimit: 2500,
    conversationsUsed: 928,
    referralsCount: 4,
    balanceUsd: 14.50
  }
};

// Mount Workflow Interpreter Engine
const workflowEngine = new WorkflowEngine(io);

// ==========================================
// AUTH MIDDLEWARE
// ==========================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token required.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// ==========================================
// REST API ENDPOINTS
// ==========================================

// Global Diagnostics
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    databaseMode: dbConnected ? 'MongoDB' : 'In-Memory Sandbox',
    timestamp: new Date()
  });
});

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Custom mock credential authorization
  const token = jwt.sign({ email, role: 'Owner' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    token,
    user: {
      name: "Ahmed Kabir",
      email: email || "admin@sbr.ai",
      role: "Owner",
      onboardingCompleted: true
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const token = jwt.sign({ email, role: 'Owner' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    token,
    user: { name: name || "New Member", email, role: "Owner", onboardingCompleted: false }
  });
});

// AI Agents Endpoints
app.get('/api/agents', (req, res) => {
  res.json(memoryStore.agents);
});

app.post('/api/agents', (req, res) => {
  const newAgent = {
    _id: `agt_${Date.now()}`,
    ...req.body,
    status: 'Active',
    createdAt: new Date()
  };
  memoryStore.agents.push(newAgent);
  res.status(201).json(newAgent);
});

app.delete('/api/agents/:id', (req, res) => {
  memoryStore.agents = memoryStore.agents.filter(a => a._id !== req.params.id);
  res.json({ success: true, message: 'Agent deleted.' });
});

// Workflows Endpoints
app.get('/api/workflows', (req, res) => {
  res.json(memoryStore.workflows);
});

app.post('/api/workflows', (req, res) => {
  const newWf = {
    _id: `wf_${Date.now()}`,
    name: req.body.name || "Custom Automation",
    description: req.body.description || "Custom trigger connections",
    nodes: req.body.nodes || [],
    edges: req.body.edges || [],
    status: 'Active',
    createdAt: new Date()
  };
  memoryStore.workflows.push(newWf);
  res.status(201).json(newWf);
});

// Trigger visual workflow execution debugger!
app.post('/api/workflows/:id/execute', async (req, res) => {
  const wf = memoryStore.workflows.find(w => w._id === req.params.id);
  if (!wf) return res.status(404).json({ error: 'Workflow not found' });

  // Run async workflow so the socket emits highlights, but return immediately or resolve execution results
  const result = await workflowEngine.execute(wf, req.body.payload || { leadName: "Karim Uddin" });
  res.json({ success: true, finalVariables: result });
});

// Knowledge Base RAG File Upload & Crawling
app.get('/api/knowledge-base', (req, res) => {
  res.json(memoryStore.knowledgeBases);
});

app.post('/api/knowledge-base/upload', (req, res) => {
  const { name, type, content } = req.body;
  const chunks = RagEngine.chunkText(content || "This is a base SBR document. Content includes agent custom specifications.", 400, 80);
  const newDoc = {
    _id: `kb_${Date.now()}`,
    name: name || "uploaded_file.txt",
    type: type || "TXT",
    sizeBytes: (content || "").length || 12040,
    status: 'Chunked',
    chunksCount: chunks.length,
    createdAt: new Date()
  };
  memoryStore.knowledgeBases.push(newDoc);
  res.status(201).json({ document: newDoc, chunksCreated: chunks.length });
});

// Marketplace Endpoints
app.get('/api/marketplace', (req, res) => {
  res.json(memoryStore.marketplace);
});

app.post('/api/marketplace/purchase', (req, res) => {
  const { productId } = req.body;
  const product = memoryStore.marketplace.find(p => p._id === productId);
  if (product) {
    product.installsCount += 1;
  }
  res.json({ success: true, message: 'Agent installed to workspace.' });
});

// Billing Setup
app.get('/api/billing', (req, res) => {
  res.json(memoryStore.billing);
});

app.post('/api/billing/checkout', (req, res) => {
  const { planName, gateway } = req.body;
  res.json({
    success: true,
    gatewayUsed: gateway || 'Stripe',
    checkoutUrl: gateway === 'SSLCommerz' ? 'https://sandbox.sslcommerz.com' : 'https://checkout.stripe.com/pay/cs_test_123',
    sessionToken: `pay_tok_${Date.now()}`
  });
});

// Analytics Usage metrics
app.get('/api/analytics', (req, res) => {
  res.json({
    tokenUsageHistory: [
      { month: 'Jan', Gemini: 42000, Claude: 24000, OpenAI: 30000, DeepSeek: 12000 },
      { month: 'Feb', Gemini: 50000, Claude: 32000, OpenAI: 40000, DeepSeek: 18000 },
      { month: 'Mar', Gemini: 89000, Claude: 54000, OpenAI: 73000, DeepSeek: 32000 },
      { month: 'Apr', Gemini: 124000, Claude: 90000, OpenAI: 110000, DeepSeek: 54000 },
      { month: 'May', Gemini: 142000, Claude: 115000, OpenAI: 125000, DeepSeek: 92000 }
    ],
    agentPerformance: [
      { name: 'Support Bot', conversations: 480, responseTimeSec: 1.2, satisfaction: 4.8 },
      { name: 'Sales Bot', conversations: 310, responseTimeSec: 1.5, satisfaction: 4.9 },
      { name: 'Marketing Bot', conversations: 120, responseTimeSec: 0.9, satisfaction: 4.5 }
    ]
  });
});

// ==========================================
// SOCKET.IO REALTIME ENGINE (Streaming Chat & Prompts)
// ==========================================
io.on('connection', socket => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // Visual Node drag update event broadcast
  socket.on('canvas-node-drag', data => {
    socket.broadcast.emit('canvas-node-drag-sync', data);
  });

  // ChatGPT-style streaming responder loop
  socket.on('send-message', data => {
    const { agentId, userMessage, model } = data;
    
    // Auto respond streaming simulation
    const streamAnswers = [
      "Deciphering inquiry...",
      "Analyzing knowledge vectors...",
      "Integrating active memory scopes...",
      "Response formulated:",
      `Greetings! As SBR AI custom configured agent executing on ${model || 'Gemini 1.5 Pro'}, I scanned your request.`,
      "We verified your data blocks successfully, executing visual nodes pipelines right now. How can I help you automate further?"
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < streamAnswers.length) {
        socket.emit('message-chunk', {
          text: streamAnswers[step] + (step < streamAnswers.length - 1 ? " " : ""),
          done: step === streamAnswers.length - 1
        });
        step++;
      } else {
        clearInterval(interval);
      }
    }, 400);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`[SBR Agent AI Server] Server executing on http://localhost:${PORT}`);
});
