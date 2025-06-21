import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updated }),
    });
    const json = await res.json();
    setMessages([...updated, { role: 'assistant', content: json.reply }]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h1>Healforce AI Chat</h1>
      <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: '1rem', height: 400, overflowY: 'auto', background: '#f9f9f9' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '0.5rem 0' }}>
            <span style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: 4, background: m.role === 'user' ? '#e0f7fa' : '#e8f5e9' }}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p><em>Thinking...</em></p>}
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          style={{ flex: 1, padding: '0.5rem' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something…"
        />
        <button onClick={handleSend} style={{ padding: '0.5rem 1rem' }}>
          Send
        </button>
      </div>
    </div>
  );
}
