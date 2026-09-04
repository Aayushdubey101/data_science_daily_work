import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MessageList.css';

function TypingDots() {
  return (
    <div className="typing-dots" aria-label="Assistant is typing">
      <span /><span /><span />
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser  = message.role === 'user';
  const isError = message.role === 'error';
  const isTyping = message.content === null; // null = placeholder

  return (
    <div className={`message-row ${isUser ? 'user' : 'assistant'} ${isError ? 'error' : ''}`}>
      <div className="avatar">
        {isUser ? '🧑' : isError ? '⚠️' : '🤖'}
      </div>
      <div className="bubble">
        {isTyping ? (
          <TypingDots />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {String(message.content || '')}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list" role="log" aria-live="polite">
      {messages.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h2>LM Studio Chat</h2>
          <p>Start a conversation with your local AI model.</p>
          <p className="hint">LM Studio must be running at <code>localhost:1234</code></p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
