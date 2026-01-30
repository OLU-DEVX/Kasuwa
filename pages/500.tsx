import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function ServerError() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-wide text-red-600">
        Error 500
      </p>
      <h1 className="text-3xl font-bold mt-2">Something went wrong on our end</h1>
      <p className="text-stone-600 mt-3 max-w-md">
        We&apos;ve been notified and will look into it. Please try again in a
        minute — your cart is still safe.
      </p>
      <div className="flex gap-3 mt-6">
        <Link
          href={ROUTES.home}
          className="bg-[#38B419] text-white rounded-md py-2 px-4"
        >
          Back to home
        </Link>
        <Link
          href={ROUTES.cart}
          className="border border-gray-400 rounded-md py-2 px-4"
        >
          View cart
        </Link>
      </div>
    </div>
  );
}
