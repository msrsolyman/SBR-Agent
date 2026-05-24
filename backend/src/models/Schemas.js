import mongoose from 'mongoose';

// ==========================================
// 1. User Schema
// ==========================================
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional if social sign-in
  avatar: { type: String },
  role: { type: String, enum: ['Owner', 'Admin', 'Editor', 'Viewer'], default: 'Owner' },
  twoFactorEnabled: { type: Boolean, default: false },
  onboardingCompleted: { type: Boolean, default: false },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  activityLogs: [{
    action: String,
    timestamp: { type: Date, default: Date.now },
    ip: String
  }],
  createdAt: { type: Date, default: Date.now }
});

// ==========================================
// 2. AI Agent Schema
// ==========================================
const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: '/placeholder-bot.png' },
  description: { type: String },
  category: { type: String, default: 'Customer Support' },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // AI Settings
  model: { type: String, default: 'gemini-1.5-pro' }, // gemini-1.5-pro, gpt-4o, claude-3-opus, deepseek-coder
  temperature: { type: Number, default: 0.7 },
  personality: { type: String, default: 'Helpful and professional AI assistant.' },
  tone: { type: String, default: 'Friendly' },
  language: { type: String, default: 'English' },

  // RAG & Knowledge
  knowledgeBases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeBase' }],
  
  // Channels Integrated
  integrations: {
    whatsapp: { enabled: { type: Boolean, default: false }, phone: String },
    messenger: { enabled: { type: Boolean, default: false }, pageId: String },
    telegram: { enabled: { type: Boolean, default: false }, username: String },
    slack: { enabled: { type: Boolean, default: false }, webhook: String },
    gmail: { enabled: { type: Boolean, default: false }, emailAddress: String }
  },
  
  status: { type: String, enum: ['Draft', 'Active', 'Suspended'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

// ==========================================
// 3. Workflow Schema
// ==========================================
const WorkflowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nodes: [{
    id: { type: String, required: true },
    type: { type: String, required: true }, // aiResponse, delay, httpRequest, database, whatsappSend, etc.
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 }
    },
    data: { type: mongoose.Schema.Types.Mixed, default: {} } // settings for the node
  }],
  edges: [{
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true }
  }],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ==========================================
// 4. Conversation Schema
// ==========================================
const ConversationSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channel: { type: String, default: 'WebChat' }, // WebChat, WhatsApp, Telegram, etc.
  messages: [{
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
    attachments: [String],
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

// ==========================================
// 5. Knowledge Base Schema
// ==========================================
const KnowledgeBaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'CSV', 'DOCX', 'TXT', 'Website'], required: true },
  sourceUrl: { type: String }, // if crawled website
  fileUrl: { type: String },
  sizeBytes: { type: Number },
  status: { type: String, enum: ['Uploading', 'Chunked', 'Error'], default: 'Chunked' },
  chunksCount: { type: Number, default: 0 },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

// ==========================================
// 6. Integration Schema
// ==========================================
const IntegrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: String, required: true }, // whatsapp, telegram, slack, gmail, shopify
  credentials: { type: mongoose.Schema.Types.Mixed, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// ==========================================
// 7. Subscription Schema
// ==========================================
const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['Free', 'Pro', 'Business', 'Enterprise'], default: 'Free' },
  status: { type: String, enum: ['active', 'canceled', 'incomplete'], default: 'active' },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  tokenLimit: { type: Number, default: 100000 },
  tokensUsed: { type: Number, default: 0 },
  conversationsLimit: { type: Number, default: 100 },
  conversationsUsed: { type: Number, default: 0 },
  currentPeriodEnd: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
});

// ==========================================
// 8. Marketplace Schema
// ==========================================
const MarketplaceProductSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, default: 0 }, // 0 = Free
  billingType: { type: String, enum: ['OneTime', 'Subscription'], default: 'OneTime' },
  installsCount: { type: Number, default: 0 },
  rating: { type: Number, default: 5 },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stars: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// ==========================================
// 9. Analytics Schema
// ==========================================
const AnalyticsSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tokensUsed: { type: Number, default: 0 },
  conversationsCount: { type: Number, default: 0 },
  latencyMs: { type: Number, default: 0 },
  revenueUsd: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

// ==========================================
// 10. Notification Schema
// ==========================================
const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['Info', 'Success', 'Warning', 'System'], default: 'Info' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// ==========================================
// Exports
// ==========================================
export const User = mongoose.model('User', UserSchema);
export const Agent = mongoose.model('Agent', AgentSchema);
export const Workflow = mongoose.model('Workflow', WorkflowSchema);
export const Conversation = mongoose.model('Conversation', ConversationSchema);
export const KnowledgeBase = mongoose.model('KnowledgeBase', KnowledgeBaseSchema);
export const Integration = mongoose.model('Integration', IntegrationSchema);
export const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export const MarketplaceProduct = mongoose.model('MarketplaceProduct', MarketplaceProductSchema);
export const Analytics = mongoose.model('Analytics', AnalyticsSchema);
export const Notification = mongoose.model('Notification', NotificationSchema);
