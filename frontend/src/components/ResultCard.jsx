import { useState } from "react";
import { INTENTS, scoreColor } from "../constants";

const FIELDS = [
  ["name", "Name"],
  ["email", "Email"],
  ["company", "Company"],
  ["budget", "Budget"],
  ["timeline", "Timeline"],
];

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);
  const intent = INTENTS[result.intent] || INTENTS.other;

  async function copyReply() {
    try {
      await navigator.clipboard.writeText(result.suggested_reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be unavailable; ignore */
    }
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Result</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${intent.color}`}
        >
          {intent.label}
        </span>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-stone-600">Priority score</span>
          <span className="font-semibold">{result.priority_score} / 100</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-stone-200">
          <div
            className={`h-full rounded-full ${scoreColor(result.priority_score)}`}
            style={{ width: `${result.priority_score}%` }}
          />
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed">{result.summary}</p>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {FIELDS.map(([key, label]) => (
          <div key={key}>
            <dt className="text-xs uppercase tracking-wide text-stone-500">
              {label}
            </dt>
            <dd className="break-words">
              {result.details?.[key] || (
                <span className="text-stone-400">Not provided</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium">Suggested reply</h3>
          <button
            onClick={copyReply}
            className="rounded-md border border-stone-300 px-2.5 py-1 text-xs hover:bg-stone-100"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="whitespace-pre-wrap rounded-lg bg-stone-50 p-3 text-sm leading-relaxed ring-1 ring-stone-200">
          {result.suggested_reply}
        </p>
      </div>
    </section>
  );
}
