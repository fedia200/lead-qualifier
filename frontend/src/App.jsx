import { useEffect, useState } from "react";
import { qualifyLead } from "./api";
import LeadForm from "./components/LeadForm";
import ResultCard from "./components/ResultCard";
import History from "./components/History";

const STORAGE_KEY = "lead-qualifier-history";
const MAX_ITEMS = 50;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(null); // { id, message, result, date }
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      /* storage may be full or disabled */
    }
  }, [history]);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const result = await qualifyLead(message.trim());
      const item = {
        id: crypto.randomUUID(),
        message: message.trim(),
        result,
        date: new Date().toISOString(),
      };
      setCurrent(item);
      setHistory((prev) => [item, ...prev].slice(0, MAX_ITEMS));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(item) {
    setCurrent(item);
    setMessage(item.message);
    setError("");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Lead Qualifier
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Paste an incoming message. The AI extracts the details, detects the
          intent, scores the priority and drafts a reply.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <LeadForm
            message={message}
            setMessage={setMessage}
            onSubmit={handleSubmit}
            loading={loading}
          />
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
            >
              {error}
            </div>
          )}
          <History
            items={history}
            onSelect={handleSelect}
            onClear={() => {
              setHistory([]);
              setCurrent(null);
            }}
            activeId={current?.id}
          />
        </div>

        <div>
          {current ? (
            <ResultCard result={current.result} />
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 p-10 text-center text-sm text-stone-500">
              The analysis will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
