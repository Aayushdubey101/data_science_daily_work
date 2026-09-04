import { useState, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar.jsx';
import MessageList from './components/MessageList.jsx';
import ChatInput from './components/ChatInput.jsx';
import { sendChat, MODEL } from './api/lmstudio.js';
import './App.css';

let nextId = 1;
const uid = () => String(nextId++);

function createSession() {
  return { id: uid(), title: 'New conversation', messages: [] };
}

export default function App() {
  const [sessions, setSessions]   = useState([createSession()]);
  const [activeId, setActiveId]   = useState(sessions[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  // ── Derived active session ────────────────────────────────
  const activeSession = sessions.find((s) => s.id === activeId) ?? sessions[0];

  const patchSession = useCallback((id, updater) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? updater(s) : s)));
  }, []);

  // ── New chat ──────────────────────────────────────────────
  function handleNewChat() {
    const s = createSession();
    setSessions((prev) => [s, ...prev]);
    setActiveId(s.id);
  }

  // ── Delete session ────────────────────────────────────────
  function handleDeleteSession(id) {
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      if (next.length === 0) {
        const fresh = createSession();
        setActiveId(fresh.id);
        return [fresh];
      }
      if (activeId === id) setActiveId(next[0].id);
      return next;
    });
  }

  // ── Send message ──────────────────────────────────────────
  async function handleSend(text) {
    if (isLoading) return;

    const sessionId  = activeId;
    const userMsg    = { id: uid(), role: 'user',      content: text };
    const pendingMsg = { id: uid(), role: 'assistant', content: null }; // null = typing

    // Snapshot history BEFORE appending (used for API call)
    const historySnapshot = activeSession.messages.map(({ role, content }) => ({
      role,
      content: content ?? '',
    }));

    // Append user message + typing-indicator placeholder
    patchSession(sessionId, (s) => ({
      ...s,
      title: s.messages.length === 0 ? text.slice(0, 42) || 'New conversation' : s.title,
      messages: [...s.messages, userMsg, pendingMsg],
    }));

    setIsLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const reply = await sendChat(historySnapshot, text, controller.signal);

      // Replace placeholder with actual reply
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== sessionId) return s;
          return {
            ...s,
            messages: s.messages.map((m) =>
              m.id === pendingMsg.id ? { ...m, content: reply } : m
            ),
          };
        })
      );
    } catch (err) {
      if (err.name === 'AbortError') {
        // User stopped – remove the empty placeholder
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id !== sessionId) return s;
            return { ...s, messages: s.messages.filter((m) => m.id !== pendingMsg.id) };
          })
        );
      } else {
        const isConnectError =
          err.message.includes('fetch') ||
          err.message.includes('Failed') ||
          err.message.includes('NetworkError');

        const errorContent = isConnectError
          ? '⚠️ Cannot reach LM Studio. Make sure it is running at **localhost:1234** with a model loaded, then try again.'
          : `⚠️ ${err.message}`;

        setSessions((prev) =>
          prev.map((s) => {
            if (s.id !== sessionId) return s;
            return {
              ...s,
              messages: s.messages.map((m) =>
                m.id === pendingMsg.id
                  ? { ...m, role: 'error', content: errorContent }
                  : m
              ),
            };
          })
        );
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }

  function handleStop() {
    abortRef.current?.abort();
  }

  return (
    <div className="app-layout">
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        modelName={MODEL}
        onNewChat={handleNewChat}
        onSelectSession={setActiveId}
        onDeleteSession={handleDeleteSession}
      />

      <main className="chat-main">
        <MessageList
          messages={activeSession.messages}
          isLoading={isLoading}
        />
        <ChatInput
          onSend={handleSend}
          onStop={handleStop}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
