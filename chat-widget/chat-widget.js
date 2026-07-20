/**
 * AI Chat Widget v1.0.0
 * Connects to n8n RAG AI Agent via webhook
 */
(function () {
    'use strict';

    // ============================================================
    // INJECT STYLES
    // ============================================================
    const STYLES = `
/* AI Chat Widget Styles */
:root {
    --cw-primary-50: #EEF2FF;
    --cw-primary-100: #E0E7FF;
    --cw-primary-200: #C7D2FE;
    --cw-primary-300: #A5B4FC;
    --cw-primary-400: #818CF8;
    --cw-primary-500: #6366F1;
    --cw-primary-600: #4F46E5;
    --cw-primary-700: #4338CA;
    --cw-primary-800: #3730A3;
    --cw-primary-900: #312E81;
    --cw-neutral-0: #FFFFFF;
    --cw-neutral-50: #F8FAFC;
    --cw-neutral-100: #F1F5F9;
    --cw-neutral-200: #E2E8F0;
    --cw-neutral-300: #CBD5E1;
    --cw-neutral-400: #94A3B8;
    --cw-neutral-500: #64748B;
    --cw-neutral-600: #475569;
    --cw-neutral-700: #334155;
    --cw-neutral-800: #1E293B;
    --cw-neutral-900: #0F172A;
    --cw-success-500: #22C55E;
    --cw-error-50: #FEF2F2;
    --cw-error-500: #EF4444;
    --cw-error-600: #DC2626;
    --cw-warning-500: #F59E0B;
    --cw-bg-widget: var(--cw-neutral-0);
    --cw-bg-header: linear-gradient(135deg, var(--cw-primary-600), var(--cw-primary-700));
    --cw-bg-messages: var(--cw-neutral-50);
    --cw-bg-composer: var(--cw-neutral-0);
    --cw-bg-user-msg: linear-gradient(135deg, var(--cw-primary-500), var(--cw-primary-600));
    --cw-bg-bot-msg: var(--cw-neutral-0);
    --cw-bg-suggestion: var(--cw-neutral-0);
    --cw-bg-suggestion-hover: var(--cw-primary-50);
    --cw-bg-code: var(--cw-neutral-900);
    --cw-bg-code-inline: var(--cw-neutral-100);
    --cw-bg-scroll-btn: var(--cw-neutral-0);
    --cw-bg-input: var(--cw-neutral-50);
    --cw-text-primary: var(--cw-neutral-900);
    --cw-text-secondary: var(--cw-neutral-600);
    --cw-text-tertiary: var(--cw-neutral-400);
    --cw-text-inverse: var(--cw-neutral-0);
    --cw-text-user-msg: var(--cw-neutral-0);
    --cw-text-bot-msg: var(--cw-neutral-800);
    --cw-text-link: var(--cw-primary-600);
    --cw-text-code: #E2E8F0;
    --cw-text-code-inline: var(--cw-primary-700);
    --cw-text-suggestion: var(--cw-neutral-700);
    --cw-text-placeholder: var(--cw-neutral-400);
    --cw-border-default: var(--cw-neutral-200);
    --cw-border-light: var(--cw-neutral-100);
    --cw-border-input: var(--cw-neutral-300);
    --cw-border-input-focus: var(--cw-primary-500);
    --cw-border-suggestion: var(--cw-neutral-200);
    --cw-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --cw-font-mono: 'SF Mono', 'Fira Code', Consolas, monospace;
    --cw-shadow-widget: 0 25px 60px -15px rgba(0, 0, 0, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1);
    --cw-shadow-button: 0 8px 24px -4px rgba(99, 102, 241, 0.4);
    --cw-shadow-button-hover: 0 12px 32px -4px rgba(99, 102, 241, 0.5);
    --cw-shadow-msg: 0 1px 3px rgba(0, 0, 0, 0.04);
    --cw-shadow-scroll-btn: 0 2px 12px rgba(0, 0, 0, 0.12);
    --cw-radius-xs: 4px;
    --cw-radius-sm: 6px;
    --cw-radius-md: 8px;
    --cw-radius-lg: 12px;
    --cw-radius-xl: 16px;
    --cw-radius-2xl: 20px;
    --cw-radius-full: 9999px;
    --cw-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --cw-transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --cw-transition-spring: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --cw-z-widget: 9998;
    --cw-z-button: 9999;
    --cw-widget-width: 400px;
    --cw-widget-height: 640px;
    --cw-widget-bottom: 24px;
    --cw-widget-right: 24px;
    --cw-button-size: 60px;
    --cw-header-height: 64px;
    --cw-avatar-size: 36px;
    --cw-avatar-sm: 28px;
}
[data-theme="dark"] {
    --cw-bg-widget: var(--cw-neutral-900);
    --cw-bg-header: linear-gradient(135deg, #1E1B4B, #312E81);
    --cw-bg-messages: #0F1629;
    --cw-bg-composer: var(--cw-neutral-900);
    --cw-bg-bot-msg: var(--cw-neutral-800);
    --cw-bg-suggestion: var(--cw-neutral-800);
    --cw-bg-suggestion-hover: var(--cw-neutral-700);
    --cw-bg-code: #0D1117;
    --cw-bg-code-inline: var(--cw-neutral-800);
    --cw-bg-scroll-btn: var(--cw-neutral-800);
    --cw-bg-input: var(--cw-neutral-800);
    --cw-text-primary: var(--cw-neutral-100);
    --cw-text-secondary: var(--cw-neutral-400);
    --cw-text-tertiary: var(--cw-neutral-500);
    --cw-text-bot-msg: var(--cw-neutral-200);
    --cw-text-link: var(--cw-primary-400);
    --cw-text-code-inline: var(--cw-primary-300);
    --cw-text-suggestion: var(--cw-neutral-300);
    --cw-text-placeholder: var(--cw-neutral-500);
    --cw-border-default: var(--cw-neutral-700);
    --cw-border-light: var(--cw-neutral-800);
    --cw-border-input: var(--cw-neutral-600);
    --cw-border-input-focus: var(--cw-primary-400);
    --cw-border-suggestion: var(--cw-neutral-700);
    --cw-shadow-widget: 0 25px 60px -15px rgba(0, 0, 0, 0.5);
    --cw-shadow-msg: 0 1px 3px rgba(0, 0, 0, 0.2);
    --cw-shadow-button: 0 8px 24px -4px rgba(99, 102, 241, 0.3);
    --cw-shadow-scroll-btn: 0 2px 12px rgba(0, 0, 0, 0.4);
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.cw-btn{position:fixed;bottom:var(--cw-widget-bottom);right:var(--cw-widget-right);width:var(--cw-button-size);height:var(--cw-button-size);border-radius:var(--cw-radius-full);background:var(--cw-bg-user-msg);color:var(--cw-text-inverse);display:flex;align-items:center;justify-content:center;box-shadow:var(--cw-shadow-button);z-index:var(--cw-z-button);transition:transform var(--cw-transition-base),box-shadow var(--cw-transition-base);cursor:pointer;border:none;outline:none;font-family:var(--cw-font-family);-webkit-tap-highlight-color:transparent}
.cw-btn:hover{transform:scale(1.08);box-shadow:var(--cw-shadow-button-hover)}
.cw-btn:active{transform:scale(0.95)}
.cw-btn:focus-visible{outline:3px solid var(--cw-primary-300);outline-offset:3px}
.cw-btn svg{width:28px;height:28px;transition:transform var(--cw-transition-base),opacity var(--cw-transition-fast)}
.cw-btn .cw-icon-close{position:absolute;transform:rotate(90deg) scale(0);opacity:0}
.cw-btn.is-open .cw-icon-chat{transform:rotate(-90deg) scale(0);opacity:0}
.cw-btn.is-open .cw-icon-close{transform:rotate(0) scale(1);opacity:1}
.cw-btn__badge{position:absolute;top:-2px;right:-2px;width:20px;height:20px;border-radius:var(--cw-radius-full);background:var(--cw-error-500);color:var(--cw-neutral-0);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid var(--cw-neutral-0);transform:scale(0);transition:transform var(--cw-transition-spring)}
.cw-btn__badge.is-visible{transform:scale(1)}
.cw-btn__pulse{position:absolute;width:100%;height:100%;border-radius:var(--cw-radius-full);background:var(--cw-primary-500);animation:cwPulse 2.5s ease-out infinite;opacity:0;pointer-events:none}
.cw-btn.has-pulse .cw-btn__pulse{opacity:1}
@keyframes cwPulse{0%{transform:scale(1);opacity:.4}100%{transform:scale(1.8);opacity:0}}
.cw-widget{position:fixed;bottom:calc(var(--cw-widget-bottom) + var(--cw-button-size) + 16px);right:var(--cw-widget-right);width:var(--cw-widget-width);height:var(--cw-widget-height);max-height:calc(100vh - 120px);background:var(--cw-bg-widget);border-radius:var(--cw-radius-2xl);box-shadow:var(--cw-shadow-widget);z-index:var(--cw-z-widget);display:flex;flex-direction:column;overflow:hidden;transform:scale(0) translateY(20px);transform-origin:bottom right;opacity:0;pointer-events:none;transition:transform var(--cw-transition-spring),opacity var(--cw-transition-base);font-family:var(--cw-font-family);font-size:14px;line-height:1.5;color:var(--cw-text-primary);-webkit-font-smoothing:antialiased}
.cw-widget.is-open{transform:scale(1) translateY(0);opacity:1;pointer-events:auto}
.cw-widget.is-max{bottom:16px;right:16px;width:calc(100vw - 32px);height:calc(100vh - 32px);max-height:calc(100vh - 32px);border-radius:var(--cw-radius-xl)}
.cw-header{background:var(--cw-bg-header);padding:16px 20px;display:flex;align-items:center;gap:12px;min-height:var(--cw-header-height);flex-shrink:0}
.cw-header__avatar{width:var(--cw-avatar-size);height:var(--cw-avatar-size);border-radius:var(--cw-radius-full);background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative}
.cw-header__avatar svg{width:20px;height:20px;color:var(--cw-neutral-0)}
.cw-header__online{position:absolute;bottom:-1px;right:-1px;width:10px;height:10px;border-radius:var(--cw-radius-full);background:var(--cw-success-500);border:2px solid rgba(79,70,229,1);animation:cwOnline 3s ease-in-out infinite}
@keyframes cwOnline{0%,100%{opacity:1}50%{opacity:.6}}
.cw-header__info{flex:1;min-width:0}
.cw-header__name{font-size:15px;font-weight:600;color:var(--cw-neutral-0);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cw-header__status{font-size:11px;color:rgba(255,255,255,.75)}
.cw-header__actions{display:flex;align-items:center;gap:4px}
.cw-header__btn{width:32px;height:32px;border-radius:var(--cw-radius-md);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.7);transition:background var(--cw-transition-fast),color var(--cw-transition-fast);cursor:pointer;border:none;background:none;outline:none}
.cw-header__btn:hover{background:rgba(255,255,255,.15);color:var(--cw-neutral-0)}
.cw-header__btn:focus-visible{outline:2px solid rgba(255,255,255,.5);outline-offset:1px}
.cw-header__btn svg{width:16px;height:16px}
.cw-messages{flex:1;overflow-y:auto;overflow-x:hidden;padding:20px;background:var(--cw-bg-messages);scroll-behavior:smooth;position:relative;overscroll-behavior:contain}
.cw-messages::-webkit-scrollbar{width:5px}
.cw-messages::-webkit-scrollbar-track{background:transparent}
.cw-messages::-webkit-scrollbar-thumb{background:var(--cw-neutral-300);border-radius:var(--cw-radius-full)}
[data-theme="dark"] .cw-messages::-webkit-scrollbar-thumb{background:var(--cw-neutral-600)}
.cw-welcome{display:flex;flex-direction:column;align-items:center;text-align:center;padding:24px 16px;animation:cwFadeUp .4s ease-out}
@keyframes cwFadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.cw-welcome__avatar{width:56px;height:56px;border-radius:var(--cw-radius-full);background:linear-gradient(135deg,var(--cw-primary-100),var(--cw-primary-200));display:flex;align-items:center;justify-content:center;margin-bottom:16px}
[data-theme="dark"] .cw-welcome__avatar{background:linear-gradient(135deg,rgba(99,102,241,.2),rgba(99,102,241,.3))}
.cw-welcome__avatar svg{width:28px;height:28px;color:var(--cw-primary-600)}
[data-theme="dark"] .cw-welcome__avatar svg{color:var(--cw-primary-400)}
.cw-welcome__title{font-size:18px;font-weight:700;color:var(--cw-text-primary);margin-bottom:8px}
.cw-welcome__subtitle{font-size:14px;color:var(--cw-text-secondary);line-height:1.7;margin-bottom:24px;max-width:300px}
.cw-welcome__label{font-size:11px;font-weight:600;color:var(--cw-text-tertiary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px}
.cw-suggestions{display:flex;flex-direction:column;gap:8px;width:100%}
.cw-sug-btn{width:100%;padding:12px 16px;background:var(--cw-bg-suggestion);border:1px solid var(--cw-border-suggestion);border-radius:var(--cw-radius-lg);font-size:14px;font-family:var(--cw-font-family);color:var(--cw-text-suggestion);text-align:left;cursor:pointer;transition:background var(--cw-transition-fast),border-color var(--cw-transition-fast),transform var(--cw-transition-fast);display:flex;align-items:center;gap:12px;outline:none}
.cw-sug-btn:hover{background:var(--cw-bg-suggestion-hover);border-color:var(--cw-primary-200);transform:translateY(-1px)}
[data-theme="dark"] .cw-sug-btn:hover{border-color:var(--cw-primary-800)}
.cw-sug-btn:active{transform:translateY(0)}
.cw-sug-btn:focus-visible{outline:2px solid var(--cw-primary-500);outline-offset:1px}
.cw-sug-btn__icon{width:32px;height:32px;border-radius:var(--cw-radius-md);background:var(--cw-primary-50);display:flex;align-items:center;justify-content:center;flex-shrink:0}
[data-theme="dark"] .cw-sug-btn__icon{background:rgba(99,102,241,.15)}
.cw-sug-btn__icon svg{width:16px;height:16px;color:var(--cw-primary-600)}
[data-theme="dark"] .cw-sug-btn__icon svg{color:var(--cw-primary-400)}
.cw-msg{display:flex;gap:8px;margin-bottom:16px;animation:cwMsgIn .3s ease-out;align-items:flex-start}
@keyframes cwMsgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.cw-msg--user{flex-direction:row-reverse}
.cw-msg__avatar{width:var(--cw-avatar-sm);height:var(--cw-avatar-sm);border-radius:var(--cw-radius-full);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.cw-msg--bot .cw-msg__avatar{background:linear-gradient(135deg,var(--cw-primary-100),var(--cw-primary-200))}
[data-theme="dark"] .cw-msg--bot .cw-msg__avatar{background:linear-gradient(135deg,rgba(99,102,241,.2),rgba(99,102,241,.3))}
.cw-msg--bot .cw-msg__avatar svg{width:14px;height:14px;color:var(--cw-primary-600)}
[data-theme="dark"] .cw-msg--bot .cw-msg__avatar svg{color:var(--cw-primary-400)}
.cw-msg--user .cw-msg__avatar{background:var(--cw-primary-500)}
.cw-msg--user .cw-msg__avatar svg{width:14px;height:14px;color:var(--cw-neutral-0)}
.cw-msg__content{max-width:82%;min-width:40px}
.cw-msg__bubble{padding:12px 16px;border-radius:var(--cw-radius-xl);font-size:14px;line-height:1.7;word-wrap:break-word;overflow-wrap:break-word}
.cw-msg--user .cw-msg__bubble{background:var(--cw-bg-user-msg);color:var(--cw-text-user-msg);border-bottom-right-radius:var(--cw-radius-xs)}
.cw-msg--bot .cw-msg__bubble{background:var(--cw-bg-bot-msg);color:var(--cw-text-bot-msg);border-bottom-left-radius:var(--cw-radius-xs);box-shadow:var(--cw-shadow-msg);border:1px solid var(--cw-border-light)}
.cw-msg__time{font-size:11px;color:var(--cw-text-tertiary);margin-top:4px;padding:0 4px}
.cw-msg--user .cw-msg__time{text-align:right}
.cw-msg__bubble p{margin-bottom:.5em}
.cw-msg__bubble p:last-child{margin-bottom:0}
.cw-msg__bubble strong{font-weight:600}
.cw-msg__bubble em{font-style:italic}
.cw-msg__bubble ul,.cw-msg__bubble ol{margin:.5em 0;padding-left:.5em;list-style-position:inside}
.cw-msg__bubble li{margin-bottom:.3em}
.cw-msg__bubble h1,.cw-msg__bubble h2,.cw-msg__bubble h3{font-weight:600;margin-top:.8em;margin-bottom:.4em;line-height:1.3}
.cw-msg__bubble h1{font-size:1.25em}
.cw-msg__bubble h2{font-size:1.15em}
.cw-msg__bubble h3{font-size:1.05em}
.cw-msg__bubble blockquote{border-left:3px solid var(--cw-primary-400);padding-left:12px;margin:.5em 0;color:var(--cw-text-secondary);font-style:italic}
.cw-msg__bubble a{color:var(--cw-text-link);text-decoration:underline}
.cw-msg--user .cw-msg__bubble a{color:rgba(255,255,255,.9)}
.cw-msg__bubble code:not(.cw-code__code){background:var(--cw-bg-code-inline);color:var(--cw-text-code-inline);padding:.15em .4em;border-radius:var(--cw-radius-xs);font-family:var(--cw-font-mono);font-size:.85em}
.cw-msg--user .cw-msg__bubble code{background:rgba(255,255,255,.2);color:var(--cw-text-user-msg)}
.cw-code{margin:.5em 0;border-radius:var(--cw-radius-md);overflow:hidden;background:var(--cw-bg-code);border:1px solid rgba(255,255,255,.06)}
.cw-code__header{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.06)}
.cw-code__lang{font-size:11px;color:var(--cw-neutral-400);font-family:var(--cw-font-mono);text-transform:uppercase;letter-spacing:.05em}
.cw-code__copy{display:flex;align-items:center;gap:4px;font-size:11px;font-family:var(--cw-font-family);color:var(--cw-neutral-400);padding:4px 8px;border-radius:var(--cw-radius-sm);transition:background var(--cw-transition-fast),color var(--cw-transition-fast);cursor:pointer;border:none;background:none}
.cw-code__copy:hover{background:rgba(255,255,255,.1);color:var(--cw-neutral-200)}
.cw-code__copy svg{width:14px;height:14px}
.cw-code__body{padding:12px 16px;overflow-x:auto}
.cw-code__code{font-family:var(--cw-font-mono);font-size:12px;line-height:1.6;color:var(--cw-text-code);white-space:pre;display:block}
.cw-typing{display:flex;gap:8px;margin-bottom:16px;align-items:flex-start;animation:cwMsgIn .3s ease-out}
.cw-typing__avatar{width:var(--cw-avatar-sm);height:var(--cw-avatar-sm);border-radius:var(--cw-radius-full);background:linear-gradient(135deg,var(--cw-primary-100),var(--cw-primary-200));display:flex;align-items:center;justify-content:center;flex-shrink:0}
[data-theme="dark"] .cw-typing__avatar{background:linear-gradient(135deg,rgba(99,102,241,.2),rgba(99,102,241,.3))}
.cw-typing__avatar svg{width:14px;height:14px;color:var(--cw-primary-600)}
[data-theme="dark"] .cw-typing__avatar svg{color:var(--cw-primary-400)}
.cw-typing__bubble{background:var(--cw-bg-bot-msg);border:1px solid var(--cw-border-light);border-radius:var(--cw-radius-xl);border-bottom-left-radius:var(--cw-radius-xs);padding:12px 20px;display:flex;align-items:center;gap:5px;box-shadow:var(--cw-shadow-msg)}
.cw-typing__dot{width:7px;height:7px;border-radius:var(--cw-radius-full);background:var(--cw-neutral-400);animation:cwTyping 1.4s ease-in-out infinite}
.cw-typing__dot:nth-child(2){animation-delay:.2s}
.cw-typing__dot:nth-child(3){animation-delay:.4s}
@keyframes cwTyping{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}
.cw-msg--error .cw-msg__bubble{background:var(--cw-error-50);border:1px solid var(--cw-error-500);color:var(--cw-error-600)}
[data-theme="dark"] .cw-msg--error .cw-msg__bubble{background:rgba(239,68,68,.1);color:#FCA5A5}
.cw-retry{display:inline-flex;align-items:center;gap:4px;margin-top:8px;font-size:12px;font-family:var(--cw-font-family);color:var(--cw-error-600);font-weight:500;padding:4px 8px;border-radius:var(--cw-radius-sm);cursor:pointer;border:none;background:none}
.cw-retry:hover{background:rgba(239,68,68,.1)}
.cw-retry svg{width:14px;height:14px}
.cw-sources{margin-top:12px;padding-top:12px;border-top:1px solid var(--cw-border-light)}
.cw-sources__title{font-size:11px;font-weight:600;color:var(--cw-text-tertiary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;display:flex;align-items:center;gap:4px}
.cw-sources__title svg{width:12px;height:12px}
.cw-source{display:flex;align-items:center;gap:8px;padding:8px;border-radius:var(--cw-radius-sm);font-size:12px;color:var(--cw-text-link);text-decoration:none;transition:background var(--cw-transition-fast)}
.cw-source:hover{background:var(--cw-bg-suggestion-hover)}
.cw-source svg{width:12px;height:12px;flex-shrink:0}
.cw-scroll{position:absolute;bottom:12px;left:50%;transform:translateX(-50%) scale(0);width:36px;height:36px;border-radius:var(--cw-radius-full);background:var(--cw-bg-scroll-btn);box-shadow:var(--cw-shadow-scroll-btn);display:flex;align-items:center;justify-content:center;color:var(--cw-text-secondary);transition:transform var(--cw-transition-spring);z-index:5;border:1px solid var(--cw-border-default);cursor:pointer;outline:none}
.cw-scroll.is-visible{transform:translateX(-50%) scale(1)}
.cw-scroll:hover{color:var(--cw-text-primary)}
.cw-scroll svg{width:18px;height:18px}
.cw-composer{padding:12px 16px;background:var(--cw-bg-composer);border-top:1px solid var(--cw-border-light);flex-shrink:0}
.cw-composer__inner{display:flex;align-items:flex-end;gap:8px;background:var(--cw-bg-input);border:1.5px solid var(--cw-border-input);border-radius:var(--cw-radius-xl);padding:8px 12px;transition:border-color var(--cw-transition-fast),box-shadow var(--cw-transition-fast)}
.cw-composer__inner:focus-within{border-color:var(--cw-border-input-focus);box-shadow:0 0 0 3px rgba(99,102,241,.1)}
.cw-composer__input{flex:1;min-height:24px;max-height:120px;font-size:14px;font-family:var(--cw-font-family);color:var(--cw-text-primary);line-height:1.5;padding:4px 0;overflow-y:auto;border:none;outline:none;resize:none;background:none}
.cw-composer__input::placeholder{color:var(--cw-text-placeholder)}
.cw-composer__input::-webkit-scrollbar{width:3px}
.cw-composer__input::-webkit-scrollbar-thumb{background:var(--cw-neutral-300);border-radius:2px}
.cw-composer__send{width:36px;height:36px;border-radius:var(--cw-radius-full);background:var(--cw-primary-500);color:var(--cw-neutral-0);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background var(--cw-transition-fast),transform var(--cw-transition-fast),opacity var(--cw-transition-fast);opacity:.4;pointer-events:none;cursor:pointer;border:none;outline:none}
.cw-composer__send.is-active{opacity:1;pointer-events:auto}
.cw-composer__send.is-active:hover{background:var(--cw-primary-600);transform:scale(1.05)}
.cw-composer__send.is-active:active{transform:scale(.95)}
.cw-composer__send:focus-visible{outline:2px solid var(--cw-primary-500);outline-offset:2px}
.cw-composer__send svg{width:18px;height:18px}
.cw-composer__send.is-loading svg{animation:cwSpin 1s linear infinite}
@keyframes cwSpin{to{transform:rotate(360deg)}}
.cw-composer__footer{display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding:0 8px}
.cw-composer__hint{font-size:11px;color:var(--cw-text-tertiary)}
.cw-composer__hint kbd{background:var(--cw-bg-code-inline);padding:1px 5px;border-radius:var(--cw-radius-xs);font-family:var(--cw-font-mono);font-size:.9em}
.cw-composer__chars{font-size:11px;color:var(--cw-text-tertiary);font-variant-numeric:tabular-nums}
.cw-composer__chars.is-warn{color:var(--cw-warning-500)}
.cw-composer__chars.is-error{color:var(--cw-error-500)}
.cw-date{display:flex;align-items:center;gap:12px;margin:16px 0}
.cw-date::before,.cw-date::after{content:'';flex:1;height:1px;background:var(--cw-border-default)}
.cw-date__text{font-size:11px;color:var(--cw-text-tertiary);font-weight:500;white-space:nowrap}
.cw-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:768px){.cw-widget{width:calc(100vw - 32px);right:16px;bottom:calc(var(--cw-widget-bottom) + var(--cw-button-size) + 12px)}}
@media(max-width:480px){.cw-widget{top:0;left:0;right:0;bottom:0;width:100%;height:100%;max-height:100%;border-radius:0;transform:translateY(100%);transform-origin:bottom center}.cw-widget.is-open{transform:translateY(0)}.cw-btn{bottom:16px;right:16px}.cw-btn.is-open{transform:scale(0);opacity:0;pointer-events:none}}
@supports(padding:env(safe-area-inset-bottom)){@media(max-width:480px){.cw-composer{padding-bottom:calc(12px + env(safe-area-inset-bottom))}.cw-header{padding-top:calc(16px + env(safe-area-inset-top))}}}
@media(prefers-reduced-motion:reduce){.cw-widget,.cw-btn,.cw-msg,.cw-typing,.cw-welcome,.cw-sug-btn,.cw-scroll{animation-duration:.01ms!important;transition-duration:.01ms!important}}
@media print{.cw-btn,.cw-widget{display:none!important}}
`;

    // ============================================================
    // INJECT HTML
    // ============================================================
    const HTML = `
<button class="cw-btn has-pulse" id="cwBtn" type="button" aria-label="Open chat" aria-expanded="false" aria-controls="cwWidget">
    <span class="cw-btn__pulse" aria-hidden="true"></span>
    <svg class="cw-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    <svg class="cw-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <span class="cw-btn__badge" id="cwBadge" aria-hidden="true">1</span>
</button>
<div class="cw-widget" id="cwWidget" role="dialog" aria-label="Chat Assistant" aria-modal="false">
    <header class="cw-header">
        <div class="cw-header__avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 20v-4"/><path d="M18 20v-4"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>
            <span class="cw-header__online" title="Online"></span>
        </div>
        <div class="cw-header__info">
            <div class="cw-header__name" id="cwName">AI Assistant</div>
            <div class="cw-header__status"><span id="cwStatus">Online — Ready to help</span></div>
        </div>
        <div class="cw-header__actions">
            <button class="cw-header__btn" id="cwTheme" type="button" aria-label="Toggle theme" title="Toggle theme">
                <svg id="cwSun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                <svg id="cwMoon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <button class="cw-header__btn" id="cwNew" type="button" aria-label="New chat" title="New chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <button class="cw-header__btn" id="cwMax" type="button" aria-label="Maximize" title="Maximize">
                <svg id="cwMaxIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                <svg id="cwMinIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
            </button>
            <button class="cw-header__btn" id="cwClose" type="button" aria-label="Close" title="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
    </header>
    <div class="cw-messages" id="cwMessages" role="log" aria-live="polite" tabindex="0"></div>
    <button class="cw-scroll" id="cwScroll" type="button" aria-label="Scroll to bottom">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div class="cw-composer">
        <div class="cw-composer__inner">
            <textarea class="cw-composer__input" id="cwInput" placeholder="Ask me anything..." rows="1" maxlength="2000" aria-label="Message" autocomplete="off" spellcheck="true"></textarea>
            <button class="cw-composer__send" id="cwSend" type="button" aria-label="Send" title="Send">
                <svg id="cwSendArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                <svg id="cwSendLoad" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            </button>
        </div>
        <div class="cw-composer__footer">
            <span class="cw-composer__hint"><kbd>Enter</kbd> send · <kbd>Shift+Enter</kbd> newline</span>
            <span class="cw-composer__chars" id="cwChars"></span>
        </div>
    </div>
</div>
`;

    // ============================================================
    // SVG ICONS
    // ============================================================
    const ICONS = {
        bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 20v-4"/><path d="M18 20v-4"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>',
        user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        retry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
        source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
        briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
        cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
        zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    };

    // ============================================================
    // CONFIG
    // ============================================================
    const CFG = {
        // Webhook config from webhook-config.js
        get webhookUrl() { return (typeof WEBHOOK_CONFIG !== 'undefined' && WEBHOOK_CONFIG.getURL) ? WEBHOOK_CONFIG.getURL() : ''; },
        get timeout() { return (typeof WEBHOOK_CONFIG !== 'undefined' && WEBHOOK_CONFIG.TIMEOUT) || 30000; },
        // Chat config from config.js
        name: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.ASSISTANT_NAME) || 'AI Assistant',
        welcomeTitle: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.WELCOME_TITLE) || "Hi! 👋",
        welcomeSubtitle: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.WELCOME_SUBTITLE) || "How can I help you?",
        greeting: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.AUTO_GREETING) || "Hello! I'm here to answer your questions and help you find the information you need. What would you like to know?",
        suggestions: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.SUGGESTED_QUESTIONS) || [],
        errorMsg: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.ERROR_MESSAGE) || "Something went wrong. Please try again.",
        offlineMsg: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.NETWORK_ERROR_MESSAGE) || "You're offline.",
        prefix: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.STORAGE_PREFIX) || 'cw_',
        maxLen: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.MAX_MESSAGE_LENGTH) || 2000,
        placeholder: (typeof CHAT_CONFIG !== 'undefined' && CHAT_CONFIG.INPUT_PLACEHOLDER) || "Ask me anything...",
    };

    // ============================================================
    // STATE
    // ============================================================
    const S = { open: false, max: false, sending: false, dark: false, greeted: false, session: null, msgs: [], lastReq: null, unread: 0 };

    // ============================================================
    // DOM
    // ============================================================
    let D = {};

    // ============================================================
    // UTILS
    // ============================================================
    const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); });
    const esc = s => { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; };
    const ts = () => new Date().toISOString();
    const fmtTime = iso => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fmtDate = iso => { const d = new Date(iso), t = new Date(), y = new Date(t); y.setDate(y.getDate() - 1); if (d.toDateString() === t.toDateString()) return 'Today'; if (d.toDateString() === y.toDateString()) return 'Yesterday'; return d.toLocaleDateString([], { month: 'short', day: 'numeric' }); };
    const diffDay = (a, b) => a && b && new Date(a).toDateString() !== new Date(b).toDateString();
    const online = () => navigator.onLine !== false;

    // Storage
    const store = {
        get: k => { try { const r = localStorage.getItem(CFG.prefix + k); return r ? JSON.parse(r) : null; } catch { return null; } },
        set: (k, v) => { try { localStorage.setItem(CFG.prefix + k, JSON.stringify(v)); } catch { } },
        del: k => { try { localStorage.removeItem(CFG.prefix + k); } catch { } }
    };

    // ============================================================
    // SESSION
    // ============================================================
    const initSession = () => { S.session = store.get('sid') || uuid(); store.set('sid', S.session); };
    const resetSession = () => { S.session = uuid(); store.set('sid', S.session); };

    // ============================================================
    // THEME
    // ============================================================
    const initTheme = () => {
        const t = store.get('theme');
        S.dark = t === 'dark' ? true : t === 'light' ? false : window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        applyTheme();
    };
    const toggleTheme = () => { S.dark = !S.dark; store.set('theme', S.dark ? 'dark' : 'light'); applyTheme(); };
    const applyTheme = () => {
        document.documentElement.setAttribute('data-theme', S.dark ? 'dark' : '');
        D.sun.style.display = S.dark ? 'none' : 'block';
        D.moon.style.display = S.dark ? 'block' : 'none';
    };

    // ============================================================
    // MARKDOWN
    // ============================================================
    const md = txt => {
        if (!txt) return '';
        let h = esc(txt);
        h = h.replace(/```(\w*)\n([\s\S]*?)```/g, (_, l, c) => { const id = 'c' + uuid().slice(0, 8); return `<div class="cw-code"><div class="cw-code__header"><span class="cw-code__lang">${esc(l || 'code')}</span><button class="cw-code__copy" onclick="CW.copy('${id}')" type="button">${ICONS.copy}<span>Copy</span></button></div><div class="cw-code__body"><code class="cw-code__code" id="${id}">${c}</code></div></div>`; });
        h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
        h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');
        h = h.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
        h = h.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
        h = h.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
        h = h.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');
        h = h.replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>');
        h = h.replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>');
        h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        h = h.replace(/\n\n+/g, '</p><p>');
        h = h.replace(/\n/g, '<br>');
        return h.startsWith('<') ? h : `<p>${h}</p>`;
    };

    // ============================================================
    // RENDER
    // ============================================================
    const renderWelcome = () => {
        const sugs = CFG.suggestions.map(s => `<button class="cw-sug-btn" type="button" data-q="${esc(s.text)}"><span class="cw-sug-btn__icon">${ICONS[s.icon] || ICONS.zap}</span><span>${esc(s.text)}</span></button>`).join('');
        return `<div class="cw-welcome" id="cwWelcome"><div class="cw-welcome__avatar">${ICONS.bot}</div><h2 class="cw-welcome__title">${CFG.welcomeTitle}</h2><p class="cw-welcome__subtitle">${CFG.welcomeSubtitle}</p>${sugs ? `<div class="cw-welcome__label">Popular Questions</div><div class="cw-suggestions">${sugs}</div>` : ''}</div>`;
    };

    const renderMsg = m => {
        const u = m.role === 'user', cls = u ? 'cw-msg--user' : 'cw-msg--bot', err = m.err ? ' cw-msg--error' : '';
        const av = u ? ICONS.user : ICONS.bot, content = u ? `<p>${esc(m.content)}</p>` : md(m.content);
        let src = '';
        if (m.sources?.length) {
            src = `<div class="cw-sources"><div class="cw-sources__title">${ICONS.source} Sources</div>${m.sources.map(s => `<a class="cw-source" href="${esc(s.url)}" target="_blank" rel="noopener">${ICONS.link}<span>${esc(s.title || s.url)}</span></a>`).join('')}</div>`;
        }
        const retry = m.err ? `<button class="cw-retry" onclick="CW.retry()" type="button">${ICONS.retry} Retry</button>` : '';
        return `<div class="cw-msg ${cls}${err}" data-id="${m.id}"><div class="cw-msg__avatar">${av}</div><div class="cw-msg__content"><div class="cw-msg__bubble">${content}${src}${retry}</div><div class="cw-msg__time">${fmtTime(m.ts)}</div></div></div>`;
    };

    const renderTyping = () => `<div class="cw-typing" id="cwTyping"><div class="cw-typing__avatar">${ICONS.bot}</div><div class="cw-typing__bubble"><span class="cw-typing__dot"></span><span class="cw-typing__dot"></span><span class="cw-typing__dot"></span></div></div>`;

    const renderDate = t => `<div class="cw-date"><span class="cw-date__text">${fmtDate(t)}</span></div>`;

    const renderAll = () => {
        if (!S.msgs.length) { D.msgs.innerHTML = renderWelcome(); bindSugs(); return; }
        let h = '', prev = null;
        S.msgs.forEach(m => { if (diffDay(prev, m.ts)) h += renderDate(m.ts); h += renderMsg(m); prev = m.ts; });
        D.msgs.innerHTML = h;
        scrollEnd(false);
    };

    const appendMsg = m => {
        document.getElementById('cwWelcome')?.remove();
        const last = S.msgs.length > 1 ? S.msgs[S.msgs.length - 2] : null;
        if (last && diffDay(last.ts, m.ts)) D.msgs.insertAdjacentHTML('beforeend', renderDate(m.ts));
        D.msgs.insertAdjacentHTML('beforeend', renderMsg(m));
        scrollEnd(true);
    };

    const showTyping = () => { document.getElementById('cwTyping')?.remove(); D.msgs.insertAdjacentHTML('beforeend', renderTyping()); scrollEnd(true); setStatus('Typing...'); };
    const hideTyping = () => { document.getElementById('cwTyping')?.remove(); setStatus('Online — Ready to help'); };
    const setStatus = t => { D.status.textContent = t; };

    // ============================================================
    // MESSAGES
    // ============================================================
    const createMsg = (role, content, extra = {}) => ({ id: uuid(), role, content, ts: ts(), err: extra.err || false, sources: extra.sources || null });
    const addMsg = m => { S.msgs.push(m); if (S.msgs.length > 200) S.msgs = S.msgs.slice(-200); store.set('msgs', S.msgs); };
    const loadMsgs = () => { S.msgs = store.get('msgs') || []; };
    const clearChat = () => { S.msgs = []; S.greeted = false; store.del('msgs'); resetSession(); renderAll(); };

    // ============================================================
    // WEBHOOK
    // ============================================================
    const send = txt => {
        if (S.sending || !CFG.webhookUrl) return;
        S.sending = true;
        const rid = uuid();
        S.lastReq = rid;
        setSending(true);
        showTyping();

        if (!online()) { handleRes(null, CFG.offlineMsg, rid, true); return; }

        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), CFG.timeout);

        // Use WEBHOOK_CONFIG if available, otherwise fallback
        const webhookUrl = CFG.webhookUrl;
        const headers = (typeof WEBHOOK_CONFIG !== 'undefined' && WEBHOOK_CONFIG.HEADERS) || { 'Content-Type': 'application/json' };
        const payload = (typeof WEBHOOK_CONFIG !== 'undefined' && WEBHOOK_CONFIG.buildPayload) 
            ? WEBHOOK_CONFIG.buildPayload(txt, S.session) 
            : { message: txt, sessionId: S.session, timestamp: ts() };

        fetch(webhookUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
            signal: ctrl.signal
        })
            .then(r => { clearTimeout(timer); if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
            .then(d => {
                if (S.lastReq !== rid) return;
                // Use WEBHOOK_CONFIG parser if available
                let t = '', src = null;
                if (typeof WEBHOOK_CONFIG !== 'undefined' && WEBHOOK_CONFIG.parseResponse) {
                    const parsed = WEBHOOK_CONFIG.parseResponse(d);
                    t = parsed.text;
                    src = parsed.sources;
                } else {
                    if (typeof d === 'string') t = d;
                    else t = d.output || d.response || d.text || d.message || d.answer || (Array.isArray(d) && d[0] ? (d[0].output || d[0].response || d[0].text || JSON.stringify(d[0])) : JSON.stringify(d));
                    if (d.sources) src = d.sources;
                    else if (d.sourceDocuments) src = d.sourceDocuments.map(x => ({ title: x.metadata?.title || 'Source', url: x.metadata?.url || '#' }));
                }
                handleRes(t, null, rid, false, src);
            })
            .catch(e => { clearTimeout(timer); if (S.lastReq !== rid) return; handleRes(null, e.name === 'AbortError' ? 'Request timed out.' : CFG.errorMsg, rid, true); });
    };

    const handleRes = (txt, err, rid, isErr, src) => {
        if (S.lastReq !== rid) return;
        hideTyping();
        setSending(false);
        S.sending = false;
        const m = createMsg('bot', isErr ? err : txt, { err: isErr, sources: src });
        addMsg(m);
        appendMsg(m);
        if (!S.open) { S.unread++; showBadge(S.unread); }
    };

    // ============================================================
    // SEND FLOW
    // ============================================================
    const handleSend = () => {
        const txt = D.input.value.trim();
        if (!txt || S.sending || txt.length > CFG.maxLen) return;
        const m = createMsg('user', txt);
        addMsg(m);
        appendMsg(m);
        D.input.value = '';
        resize();
        updateChars();
        updateBtn();
        D.input.focus();
        setTimeout(() => send(txt), 600);
    };

    const handleSug = txt => { D.input.value = txt; handleSend(); };

    const retry = () => {
        let last = null;
        for (let i = S.msgs.length - 1; i >= 0; i--) if (S.msgs[i].role === 'user') { last = S.msgs[i]; break; }
        if (!last) return;
        const err = S.msgs[S.msgs.length - 1];
        if (err?.err) { S.msgs.pop(); store.set('msgs', S.msgs); document.querySelector(`[data-id="${err.id}"]`)?.remove(); }
        send(last.content);
    };

    // ============================================================
    // UI
    // ============================================================
    const toggle = () => {
        S.open = !S.open;
        D.widget.classList.toggle('is-open', S.open);
        D.btn.classList.toggle('is-open', S.open);
        D.btn.setAttribute('aria-expanded', S.open);
        if (S.open) {
            D.btn.classList.remove('has-pulse');
            S.unread = 0;
            hideBadge();
            setTimeout(() => D.input.focus(), 400);
            if (!S.greeted && !S.msgs.length) {
                S.greeted = true;
                setTimeout(() => { showTyping(); setTimeout(() => { hideTyping(); const m = createMsg('bot', CFG.greeting); addMsg(m); appendMsg(m); }, 1500); }, 1200);
            }
            scrollEnd(false);
        }
    };

    const close = () => { if (!S.open) return; S.open = false; D.widget.classList.remove('is-open'); D.btn.classList.remove('is-open'); D.btn.setAttribute('aria-expanded', 'false'); if (S.max) toggleMax(); };

    const toggleMax = () => {
        S.max = !S.max;
        D.widget.classList.toggle('is-max', S.max);
        D.maxIcon.style.display = S.max ? 'none' : 'block';
        D.minIcon.style.display = S.max ? 'block' : 'none';
    };

    const setSending = on => {
        if (on) { D.send.classList.add('is-loading'); D.arrow.style.display = 'none'; D.load.style.display = 'block'; D.input.disabled = true; }
        else { D.send.classList.remove('is-loading'); D.arrow.style.display = 'block'; D.load.style.display = 'none'; D.input.disabled = false; }
        updateBtn();
    };

    const updateBtn = () => {
        const ok = D.input.value.trim().length > 0 && D.input.value.length <= CFG.maxLen && !S.sending;
        D.send.classList.toggle('is-active', ok);
        D.send.disabled = !ok;
    };

    const resize = () => { D.input.style.height = 'auto'; D.input.style.height = Math.min(D.input.scrollHeight, 120) + 'px'; };

    const updateChars = () => {
        const l = D.input.value.length;
        if (!l) { D.chars.textContent = ''; D.chars.className = 'cw-composer__chars'; return; }
        D.chars.textContent = `${l}/${CFG.maxLen}`;
        D.chars.className = 'cw-composer__chars' + (l >= CFG.maxLen ? ' is-error' : l >= 1800 ? ' is-warn' : '');
    };

    const showBadge = n => { D.badge.textContent = n > 9 ? '9+' : n; D.badge.classList.add('is-visible'); };
    const hideBadge = () => { D.badge.classList.remove('is-visible'); };

    const scrollEnd = smooth => { if (smooth) D.msgs.scrollTo({ top: D.msgs.scrollHeight, behavior: 'smooth' }); else D.msgs.scrollTop = D.msgs.scrollHeight; };
    const checkScroll = () => { const d = D.msgs.scrollHeight - D.msgs.scrollTop - D.msgs.clientHeight; D.scroll.classList.toggle('is-visible', d > 100); };

    const copyCode = id => {
        const el = document.getElementById(id);
        if (!el) return;
        navigator.clipboard?.writeText(el.textContent).then(() => {
            const btn = el.closest('.cw-code').querySelector('.cw-code__copy');
            if (btn) { const o = btn.innerHTML; btn.innerHTML = ICONS.check + '<span>Copied!</span>'; setTimeout(() => btn.innerHTML = o, 2000); }
        });
    };

    // ============================================================
    // EVENTS
    // ============================================================
    const bindSugs = () => { D.msgs.querySelectorAll('.cw-sug-btn').forEach(b => b.addEventListener('click', () => handleSug(b.dataset.q))); };

    const bindEvents = () => {
        D.btn.addEventListener('click', toggle);
        D.close.addEventListener('click', close);
        D.max.addEventListener('click', toggleMax);
        D.newBtn.addEventListener('click', () => { if (confirm('Start new conversation?')) clearChat(); });
        D.theme.addEventListener('click', toggleTheme);
        D.send.addEventListener('click', handleSend);
        D.input.addEventListener('input', () => { resize(); updateChars(); updateBtn(); });
        D.input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } });
        D.msgs.addEventListener('scroll', () => checkScroll());
        D.scroll.addEventListener('click', () => scrollEnd(true));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.open) { close(); D.btn.focus(); } });
        window.addEventListener('online', () => setStatus('Online — Ready to help'));
        window.addEventListener('offline', () => setStatus('Offline'));
        window.addEventListener('beforeunload', () => store.set('msgs', S.msgs));
    };

    // ============================================================
    // INIT
    // ============================================================
    const init = () => {
        // Inject styles
        const style = document.createElement('style');
        style.textContent = STYLES;
        document.head.appendChild(style);

        // Inject HTML
        const div = document.createElement('div');
        div.innerHTML = HTML;
        document.body.appendChild(div);

        // Cache DOM
        D = {
            btn: document.getElementById('cwBtn'),
            badge: document.getElementById('cwBadge'),
            widget: document.getElementById('cwWidget'),
            msgs: document.getElementById('cwMessages'),
            input: document.getElementById('cwInput'),
            send: document.getElementById('cwSend'),
            arrow: document.getElementById('cwSendArrow'),
            load: document.getElementById('cwSendLoad'),
            close: document.getElementById('cwClose'),
            max: document.getElementById('cwMax'),
            maxIcon: document.getElementById('cwMaxIcon'),
            minIcon: document.getElementById('cwMinIcon'),
            newBtn: document.getElementById('cwNew'),
            theme: document.getElementById('cwTheme'),
            sun: document.getElementById('cwSun'),
            moon: document.getElementById('cwMoon'),
            scroll: document.getElementById('cwScroll'),
            status: document.getElementById('cwStatus'),
            name: document.getElementById('cwName'),
            chars: document.getElementById('cwChars'),
        };

        initSession();
        initTheme();
        loadMsgs();

        D.name.textContent = CFG.name;
        D.input.placeholder = CFG.placeholder;

        renderAll();
        updateBtn();

        if (S.msgs.length) S.greeted = true;

        bindEvents();

        // Public API
        window.CW = { copy: copyCode, retry };

        console.log('%c💬 Chat Widget Ready', 'color:#6366F1;font-weight:bold');
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

})();
