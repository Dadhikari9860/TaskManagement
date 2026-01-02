import React from "react";

export default function Pagination({ meta, links, onPage }) {
  if (!meta) return null;

  const current = meta.current_page;
  const last = meta.last_page;

  const pages = [];
  const start = Math.max(1, current - 2);
  const end = Math.min(last, current + 2);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <button
        className="rounded-lg border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        disabled={!links?.prev}
        onClick={() => onPage(current - 1)}
      >
        Prev
      </button>

      <div className="flex flex-wrap gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={
              p === current
                ? "rounded-lg bg-slate-900 px-3 py-2 text-sm text-white"
                : "rounded-lg border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            }
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className="rounded-lg border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        disabled={!links?.next}
        onClick={() => onPage(current + 1)}
      >
        Next
      </button>
    </div>
  );
}
