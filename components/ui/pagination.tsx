"use client";

import Link from "next/link";

const navButtonClass =
  "inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus:ring-zinc-500";

const pageButtonClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-zinc-500";

const pageButtonInactive =
  "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50";

const pageButtonActive =
  "bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath?: string;
  siblingCount?: number;
};

function getPageNumbers(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  if (totalPages <= siblingCount * 2 + 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const left = Math.max(1, page - siblingCount);
  const right = Math.min(totalPages, page + siblingCount);
  const pages: (number | "ellipsis")[] = [];
  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push("ellipsis");
  }
  for (let i = left; i <= right; i++) {
    pages.push(i);
  }
  if (right < totalPages) {
    if (right < totalPages - 1) pages.push("ellipsis");
    pages.push(totalPages);
  }
  return pages;
}

export function Pagination({
  page,
  totalPages,
  basePath = "/",
  siblingCount = 1,
}: PaginationProps) {
  const pages = getPageNumbers(page, totalPages, siblingCount);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="inline-flex items-center gap-2 rounded-xl bg-zinc-100/80 p-1.5 dark:bg-zinc-800/50"
    >
      {page > 1 ? (
        <Link
          href={`${basePath}?page=${page - 1}`}
          className={navButtonClass}
          aria-label="Previous page"
        >
          <span aria-hidden className="text-base leading-none">‹</span>
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span
          className={`${navButtonClass} cursor-not-allowed`}
          aria-disabled
        >
          <span aria-hidden className="text-base leading-none">‹</span>
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}
      <ul className="flex items-center gap-1.5">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <li
              key={`ellipsis-${i}`}
              className="flex h-9 w-9 items-center justify-center text-zinc-400 dark:text-zinc-500"
            >
              …
            </li>
          ) : (
            <li key={p}>
              {p === page ? (
                <span
                  className={`${pageButtonClass} ${pageButtonActive}`}
                  aria-current="page"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={`${basePath}?page=${p}`}
                  className={`${pageButtonClass} ${pageButtonInactive}`}
                >
                  {p}
                </Link>
              )}
            </li>
          ),
        )}
      </ul>
      {page < totalPages ? (
        <Link
          href={`${basePath}?page=${page + 1}`}
          className={navButtonClass}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden className="text-base leading-none">›</span>
        </Link>
      ) : (
        <span
          className={`${navButtonClass} cursor-not-allowed`}
          aria-disabled
        >
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden className="text-base leading-none">›</span>
        </span>
      )}
    </nav>
  );
}
