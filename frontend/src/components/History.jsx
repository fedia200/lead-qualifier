import { INTENTS, scoreColor } from "../constants";

export default function History({ items, onSelect, onClear, activeId }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">History</h2>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-stone-500 underline hover:text-stone-800"
          >
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-stone-500">
          Qualified leads will appear here. They are saved in this browser only.
        </p>
      ) : (
        <ul className="divide-y divide-stone-200">
          {items.map((item) => {
            const intent = INTENTS[item.result.intent] || INTENTS.other;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item)}
                  className={`flex w-full items-center gap-3 px-2 py-3 text-left text-sm hover:bg-stone-50 ${
                    activeId === item.id ? "bg-stone-100" : ""
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${scoreColor(
                      item.result.priority_score
                    )}`}
                    title={`Score ${item.result.priority_score}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">
                      {item.result.details?.company ||
                        item.result.details?.name ||
                        item.message}
                    </span>
                    <span className="block truncate text-xs text-stone-500">
                      {new Date(item.date).toLocaleString()}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-stone-600">
                    {intent.label} · {item.result.priority_score}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
