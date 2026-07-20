/**
 * ============================================================
 * AI CHAT WIDGET — WEBHOOK CONFIGURATION
 * ============================================================
 * 
 * This file contains all webhook-related settings.
 * Keep your n8n webhook URLs here.
 * 
 * SETUP:
 * 1. Replace the URLs with your actual n8n webhook URLs
 * 2. Set USE_TEST to true for testing, false for production
 * 
 * ============================================================
 */

const WEBHOOK_CONFIG = {

    // ============================================================
    // 🔗 N8N WEBHOOK URLS
    // ============================================================

    /**
     * Test webhook URL (for development/testing)
     * Use this when testing your n8n workflow
     */
    TEST_URL: 'https://n8n.srv1106977.hstgr.cloud/webhook-test/34ddc073-f07e-4ef6-9c64-a41e2613569c',

    /**
     * Production webhook URL (for live website)
     * Use this when your workflow is ready for production
     */
    PROD_URL: 'https://n8n.srv1106977.hstgr.cloud/webhook/34ddc073-f07e-4ef6-9c64-a41e2613569c',

    // ============================================================
    // ⚙️ WEBHOOK SETTINGS
    // ============================================================

    /**
     * Toggle between test and production mode
     * true  = Use TEST_URL (webhook-test)
     * false = Use PROD_URL (webhook)
     */
    USE_TEST: false,

    /**
     * Request timeout in milliseconds
     * Default: 30000 (30 seconds)
     */
    TIMEOUT: 30000,

    /**
     * HTTP method for webhook requests
     * Default: 'POST'
     */
    METHOD: 'POST',

    /**
     * Request headers
     */
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },

    // ============================================================
    // 🔧 HELPER METHODS
    // ============================================================

    /**
     * Get the active webhook URL based on USE_TEST setting
     * @returns {string} The active webhook URL
     */
    getURL: function() {
        return this.USE_TEST ? this.TEST_URL : this.PROD_URL;
    },

    /**
     * Get current mode as string
     * @returns {string} 'test' or 'production'
     */
    getMode: function() {
        return this.USE_TEST ? 'test' : 'production';
    },

    /**
     * Build the request payload
     * @param {string} message - User's message
     * @param {string} sessionId - Session identifier
     * @returns {object} The request payload
     */
    buildPayload: function(message, sessionId) {
        return {
            message: message,
            sessionId: sessionId,
            timestamp: new Date().toISOString()
        };
    },

    /**
     * Parse the webhook response
     * Handles various response formats from n8n
     * @param {object|string|array} data - Response data
     * @returns {object} Parsed response with text and sources
     */
    parseResponse: function(data) {
        var result = { text: '', sources: null };

        // Handle string response
        if (typeof data === 'string') {
            result.text = data;
            return result;
        }

        // Handle object response - try common field names
        if (data.output) {
            result.text = data.output;
        } else if (data.response) {
            result.text = data.response;
        } else if (data.text) {
            result.text = data.text;
        } else if (data.message) {
            result.text = data.message;
        } else if (data.answer) {
            result.text = data.answer;
        } else if (Array.isArray(data) && data.length > 0) {
            // Handle array response
            var first = data[0];
            result.text = first.output || first.response || first.text || first.message || first.answer || JSON.stringify(first);
        } else {
            // Fallback to JSON string
            result.text = JSON.stringify(data);
        }

        // Parse sources if present
        if (data.sources && Array.isArray(data.sources)) {
            result.sources = data.sources;
        } else if (data.sourceDocuments && Array.isArray(data.sourceDocuments)) {
            result.sources = data.sourceDocuments.map(function(doc) {
                return {
                    title: (doc.metadata && doc.metadata.title) || (doc.metadata && doc.metadata.source) || 'Source',
                    url: (doc.metadata && doc.metadata.url) || '#'
                };
            });
        }

        return result;
    }
};
