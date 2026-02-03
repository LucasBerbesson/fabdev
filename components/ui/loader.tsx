"use client";

export function LoaderFive({ text = "Chargement..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <style jsx>{`
        .loader {
          border: 4px solid;
          border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: animloader 1s linear infinite;
          width: 40px;
          height: 40px;
        }

        @keyframes animloader {
          0% {
            border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75);
          }
          33% {
            border-color: rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35);
          }
          66% {
            border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25);
          }
          100% {
            border-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15);
          }
        }
      `}</style>
      <span className="loader"></span>
      {text && (
        <p className="text-sm text-neutral-400">{text}</p>
      )}
    </div>
  );
}
