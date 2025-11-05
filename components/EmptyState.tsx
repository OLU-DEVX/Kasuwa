import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  message?: string;
  icon?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
}

/**
 * Friendly empty-state block reused by the cart, saved items, and (soon)
 * search-result pages.
 */
export default function EmptyState({
  title,
  message,
  icon,
  actionLabel,
  actionHref,
}: Props) {
  return (
    <div className="h-[50vh] gap-2 flex flex-col justify-center items-center w-full text-center px-6">
      {icon}
      <p className="text-lg font-semibold">{title}</p>
      {message && <p className="text-stone-600 max-w-md">{message}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-3 inline-block text-white bg-[#38B419] rounded-md py-2 px-4"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
