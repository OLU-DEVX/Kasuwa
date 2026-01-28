import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-wide text-[#A46E05]">
        Error 404
      </p>
      <h1 className="text-3xl font-bold mt-2">We couldn&apos;t find that page</h1>
      <p className="text-stone-600 mt-3 max-w-md">
        The link you followed might be broken, or the page may have been
        removed. Try returning to the marketplace.
      </p>
      <Link
        href={ROUTES.home}
        className="mt-6 inline-block bg-[#38B419] text-white rounded-md py-2 px-4"
      >
        Back to home
      </Link>
    </div>
  );
}
