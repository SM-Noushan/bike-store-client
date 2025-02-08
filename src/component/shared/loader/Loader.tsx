import { LucideLoader } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-30">
      <LucideLoader
        strokeWidth={1.5}
        className="size-36 text-white animate-spin"
      />
      <p className="mt-2 text-2xl font-bold tracking-widest text-white">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
