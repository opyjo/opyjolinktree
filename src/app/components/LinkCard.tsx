"use client";

import { Link } from "@/types/link";

type LinkCardProps = {
  link: Link;
  isEditMode: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  index?: number;
  isPendingDelete?: boolean;
};

export default function LinkCard({
  link,
  isEditMode,
  onEdit,
  onDelete,
  index = 0,
  isPendingDelete = false,
}: LinkCardProps) {
  const cardContent = (
    <div className="flex items-center gap-4">
      {/* Left: Icon circle */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/[0.08] text-accent transition-colors group-hover:bg-accent/[0.12]">
        <svg
          className="h-[18px] w-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </div>

      {/* Center: Text content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="truncate text-[15px] font-semibold text-ink">
            {link.name}
          </h2>
          {link.tag && (
            <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
              {link.tag}
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-[13px] text-slate">
          {link.description}
        </p>
      </div>

      {/* Right: Arrow or edit actions */}
      {isEditMode ? (
        <div className="flex shrink-0 gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit?.();
            }}
            className="rounded-lg p-1.5 text-slate transition-colors hover:bg-accent/10 hover:text-accent"
            aria-label="Edit link"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete?.();
            }}
            className={`rounded-lg p-1.5 transition-colors ${
              isPendingDelete
                ? "bg-red-500 text-white"
                : "text-slate hover:bg-red-50 hover:text-red-500"
            }`}
            aria-label={isPendingDelete ? "Click again to confirm delete" : "Delete link"}
            title={isPendingDelete ? "Click again to confirm" : "Delete"}
          >
            {isPendingDelete ? (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            )}
          </button>
        </div>
      ) : (
        <div className="shrink-0 text-slate/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      )}
    </div>
  );

  const baseClasses =
    "group w-full rounded-2xl border px-4 py-3.5 transition-all duration-200 opacity-0 animate-slide-up";

  const staggerDelay = `${index * 60}ms`;

  if (isEditMode) {
    return (
      <div
        className={`${baseClasses} border-accent/30 bg-white shadow-card`}
        style={{ animationDelay: staggerDelay }}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <a
      href={link.url}
      className={`${baseClasses} border-black/[0.06] bg-white hover:border-black/[0.1] hover:shadow-card-hover active:scale-[0.99]`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: staggerDelay }}
    >
      {cardContent}
    </a>
  );
}
