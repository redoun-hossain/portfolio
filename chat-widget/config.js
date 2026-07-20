/**
 * ============================================================
 * AI CHAT WIDGET — CONFIGURATION
 * ============================================================
 * 
 * Main configuration file for the AI Chat Widget.
 * Webhook settings are in: webhook-config.js
 * 
 * ============================================================
 */

const CHAT_CONFIG = {

    // ============================================================
    // 🔘 WIDGET TOGGLE
    // ============================================================

    /**
     * true  = Widget ON (visible)
     * false = Widget OFF (hidden)
     */
    ENABLED: true,

    /**
     * true  = Preview Tool ON (📱 button দেখাবে)
     * false = Preview Tool OFF (hide হবে)
     */
    PREVIEW_ENABLED: true,

    // ============================================================
    // 🤖 ASSISTANT IDENTITY
    // ============================================================

    ASSISTANT_NAME: 'AI Assistant',

    // ============================================================
    // 💬 WELCOME MESSAGES
    // ============================================================

    WELCOME_TITLE: "Hi, I'm your AI Assistant! 👋",
    WELCOME_SUBTITLE: "Ask me anything about this website or services, and I'll be happy to help.",
    AUTO_GREETING: "Hello! I'm here to answer your questions and help you find the information you need. What would you like to know?",

    // ============================================================
    // ❓ SUGGESTED QUESTIONS
    // ============================================================

    SUGGESTED_QUESTIONS: [
        { text: "💼 What services do you offer?", icon: "briefcase" },
        { text: "🚀 Show me your featured projects.", icon: "cpu" },
        { text: "🤖 What can you build with n8n?", icon: "zap" },
        { text: "📩 How can I work with you?", icon: "mail" }
    ],

    // ============================================================
    // ⚠️ ERROR MESSAGES
    // ============================================================

    ERROR_MESSAGE: "I'm having trouble connecting right now. Please try again in a moment.",
    NETWORK_ERROR_MESSAGE: "It seems you're offline. Please check your connection and try again.",

    // ============================================================
    // 🎨 APPEARANCE
    // ============================================================

    /**
     * Default theme when first opened
     * 'dark'  = Always dark (default)
     * 'light' = Always light
     * 'auto'  = Follow system preference
     */
    THEME: 'dark',

    INPUT_PLACEHOLDER: "Ask me anything...",

    // ============================================================
    // 📦 STORAGE
    // ============================================================

    STORAGE_PREFIX: 'ai_chat_',
    MAX_MESSAGES_STORED: 200,
    MAX_MESSAGE_LENGTH: 2000,
};
