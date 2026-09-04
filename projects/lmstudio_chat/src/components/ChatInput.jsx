import { useRef, useEffect } from 'react';
import './ChatInput.css';

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const StopIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

export default function ChatInput({ onSend, onStop, isLoading, disabled }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  });

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const value = textareaRef.current?.value.trim();
    if (!value || isLoading) return;
    onSend(value);
    textareaRef.current.value = '';
    textareaRef.current.style.height = 'auto';
  }

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-bar">
        <textarea
          id="chat-textarea"
          ref={textareaRef}
          className="chat-textarea"
          placeholder={isLoading ? 'Waiting for response…' : 'Message your local AI… (Enter to send, Shift+Enter for new line)'}
          rows={1}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          aria-label="Message input"
          autoFocus
        />

        {isLoading ? (
          <button
            id="stop-btn"
            className="send-btn stop"
            onClick={onStop}
            title="Stop generation"
            aria-label="Stop generation"
          >
            <StopIcon />
          </button>
        ) : (
          <button
            id="send-btn"
            className="send-btn"
            onClick={submit}
            disabled={disabled}
            title="Send message"
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        )}
      </div>
      <p className="input-hint">
        Powered by your local LM Studio server · <code>localhost:1234</code>
      </p>
    </div>
  );
}
