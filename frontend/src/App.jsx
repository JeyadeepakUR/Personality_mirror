import React, { useState, useEffect } from 'react';

function App() {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:9000/journal/');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:9000/journal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        setContent('');
        fetchEntries();
      } else {
        console.error('Failed to create entry');
      }
    } catch (error) {
      console.error('Error creating entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-cover bg-center font-sans text-gray-800 flex flex-col">
      <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-6 px-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">My Serenity Journal</h1>
        <p className="mt-2 text-lg opacity-90">A sanctuary for your thoughts and emotions</p>
      </header>
      <div className="flex flex-1 flex-col md:flex-row max-w-7xl mx-auto w-full p-6 gap-6">
        <aside className="md:w-1/3 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Recent Entries</h2>
          {entries.length === 0 ? (
            <p className="text-gray-500 italic">No entries yet. Start your journey!</p>
          ) : (
            <ul className="space-y-3">
              {entries.slice(0, 3).map((entry) => (
                <li key={entry.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <p className="text-sm text-gray-600 truncate">{entry.content}</p>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span className="flex items-center">
                      <span className="emotion-icon mr-1">{entry.emotion}</span>
                      Emotion
                    </span>
                    <time>{new Date(entry.timestamp).toLocaleDateString()}</time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
        <main className="md:w-2/3 bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <textarea
              className="journal-input w-full p-4 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              rows="6"
              placeholder="How are you feeling today? Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              aria-label="Journal entry input"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="submit-btn mt-4 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              aria-label={loading ? 'Saving entry' : 'Save journal entry'}
            >
              {loading ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
          <section className="entries-container">
            {entries.length === 0 ? (
              <p className="text-center text-gray-500 text-lg italic">Begin your journaling journey...</p>
            ) : (
              entries.map((entry) => (
                <article key={entry.id} className="entry-card">
                  <p className="entry-content">{entry.content}</p>
                  <div className="entry-footer">
                    <span className="flex items-center">
                      <span className="emotion-icon">{entry.emotion}</span>
                      Emotion
                    </span>
                    <time className="timestamp">{new Date(entry.timestamp).toLocaleString()}</time>
                  </div>
                </article>
              ))
            )}
          </section>
        </main>
      </div>
      <footer className="bg-gray-100 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Serenity Journal
      </footer>
    </div>
  );
}

export default App;