/**
 * AI CHAT WIDGET — CONFIGURATION
 * Webhook settings are in: webhook-config.js
 */

const CHAT_CONFIG = {

    /* ==========================================
       ON/OFF SWITCHES
       ========================================== */

    CHAT_WIDGET_ENABLED: true,       /* true = Chat Widget ON, false = OFF */
    DEVICE_PREVIEW_ENABLED: true,    /* true = Preview Tool ON, false = OFF */

    /* ==========================================
       ASSISTANT
       ========================================== */

    ASSISTANT_NAME: 'AI Assistant',

    /* ==========================================
       WELCOME MESSAGES
       ========================================== */

    WELCOME_TITLE: "Hi, I'm your AI Assistant! \u{1F44B}",
    WELCOME_SUBTITLE: "Ask me anything about this website or services, and I'll be happy to help.",
    AUTO_GREETING: "Hello! I'm here to answer your questions and help you find the information you need. What would you like to know?",

    /* ==========================================
       SUGGESTED QUESTIONS
       ========================================== */

    SUGGESTED_QUESTIONS: [
        { text: "\u{1F4BC} What services do you offer?", icon: "briefcase" },
        { text: "\u{1F680} Show me your featured projects.", icon: "cpu" },
        { text: "\u{1F916} What can you build with n8n?", icon: "zap" },
        { text: "\u{1F4E9} How can I work with you?", icon: "mail" }
    ],

    /* ==========================================
       ERROR MESSAGES
       ========================================== */

    ERROR_MESSAGE: "I'm having trouble connecting right now. Please try again in a moment.",
    NETWORK_ERROR_MESSAGE: "It seems you're offline. Please check your connection and try again.",

    /* ==========================================
       APPEARANCE
       ========================================== */

    THEME: 'dark',
    INPUT_PLACEHOLDER: "Ask me anything...",

    /* ==========================================
       STORAGE
       ========================================== */

    STORAGE_PREFIX: 'ai_chat_',
    MAX_MESSAGES_STORED: 200,
    MAX_MESSAGE_LENGTH: 2000
};
