"use client";

import Link from "next/link";

const paginationItemClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-sm font-medium transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus:ring-zinc-50";

const paginationLinkClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-sm font-medium transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus:ring-zinc-50";

const paginationActiveClass =
  "border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800 hover:text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:hover:text-zinc-950";

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
      className="flex items-center gap-1"
    >
      {page > 1 ? (
        <Link
          href={`${basePath}?page=${page - 1}`}
          className={`${paginationItemClass} gap-1 px-3`}
          aria-label="Previous page"
        >
          <span aria-hidden>‹</span>
          <span className="sr-only sm:not-sr-only sm:inline">Previous</span>
        </Link>
      ) : (
        <span
          className={`${paginationItemClass} cursor-not-allowed gap-1 px-3 opacity-50`}
          aria-disabled
        >
          <span aria-hidden>‹</span>
          <span className="sr-only sm:not-sr-only sm:inline">Previous</span>
        </span>
      )}
      <ul className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <li
              key={`ellipsis-${i}`}
              className="flex h-9 w-9 items-center justify-center"
            >
              <span className="text-zinc-500">…</span>
            </li>
          ) : (
            <li key={p}>
              {p === page ? (
                <span
                  className={`${paginationLinkClass} ${paginationActiveClass}`}
                  aria-current="page"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={`${basePath}?page=${p}`}
                  className={paginationLinkClass}
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
          className={`${paginationItemClass} gap-1 px-3`}
          aria-label="Next page"
        >
          <span className="sr-only sm:not-sr-only sm:inline">Next</span>
          <span aria-hidden>›</span>
        </Link>
      ) : (
        <span
          className={`${paginationItemClass} cursor-not-allowed gap-1 px-3 opacity-50`}
          aria-disabled
        >
          <span className="sr-only sm:not-sr-only sm:inline">Next</span>
          <span aria-hidden>›</span>
        </span>
      )}
    </nav>
  );
}
