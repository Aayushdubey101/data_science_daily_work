import './Sidebar.css';

const NewChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export default function Sidebar({
  sessions, activeId, modelName, onNewChat, onSelectSession, onDeleteSession,
}) {
  return (
    <aside className="sidebar" aria-label="Chat history">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">🤖 LM Chat</h1>
        <button
          id="new-chat-btn"
          className="new-chat-btn"
          onClick={onNewChat}
          title="New conversation"
          aria-label="New conversation"
        >
          <NewChatIcon />
          <span>New</span>
        </button>
      </div>

      <nav className="session-list">
        {sessions.length === 0 && (
          <p className="no-sessions">No conversations yet</p>
        )}
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`session-item ${session.id === activeId ? 'active' : ''}`}
          >
            <button
              className="session-btn"
              onClick={() => onSelectSession(session.id)}
              title={session.title}
            >
              <span className="session-icon">💬</span>
              <span className="session-title">{session.title}</span>
            </button>
            <button
              className="delete-session-btn"
              onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
              title="Delete conversation"
              aria-label={`Delete ${session.title}`}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="model-badge">
          <span className="status-dot" />
          <span>{modelName}</span>
        </div>
      </div>
    </aside>
  );
}
