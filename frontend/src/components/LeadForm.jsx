import { SAMPLES } from "../constants";

const MIN = 5;
const MAX = 5000;

export default function LeadForm({ message, setMessage, onSubmit, loading }) {
  const tooShort = message.trim().length < MIN;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!tooShort && !loading) onSubmit();
      }}
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
    >
      <label htmlFor="message" className="mb-2 block text-sm font-medium">
        Incoming lead message
      </label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={MAX}
        rows={7}
        placeholder="Paste the email or message you received from a lead..."
        className="w-full resize-y rounded-lg border border-stone-300 p-3 text-sm outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
      />
      <div className="mt-1 text-right text-xs text-stone-500">
        {message.length} / {MAX}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-stone-500">Try an example:</span>
        {SAMPLES.map((s) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setMessage(s.message)}
            className="rounded-full border border-stone-300 px-3 py-1 text-xs hover:bg-stone-100"
          >
            {s.title}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={tooShort || loading}
        className="mt-5 w-full rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Qualifying..." : "Qualify lead"}
      </button>
    </form>
  );
}
