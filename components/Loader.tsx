import { Spinner } from "@nextui-org/react";

interface Props {
  label?: string;
  size?: "sm" | "md" | "lg";
  fullscreen?: boolean;
}

/**
 * Standard loading state used while we're waiting on the network. Wraps
 * NextUI's `Spinner` with a label and a sensible default fullscreen layout
 * so individual pages don't reinvent the wheel.
 */
export default function Loader({
  label = "Loading…",
  size = "md",
  fullscreen = false,
}: Props) {
  const content = (
    <div
      className="flex flex-col items-center gap-3 text-stone-700"
      role="status"
      aria-live="polite"
    >
      <Spinner size={size} color="default" />
      <span className="text-sm">{label}</span>
    </div>
  );

  if (!fullscreen) return content;
  return (
    <div className="min-h-[40vh] w-full flex items-center justify-center">
      {content}
    </div>
  );
}
