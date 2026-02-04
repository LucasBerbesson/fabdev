export function LoaderFive({ text = "Chargement..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="loader"></span>
      {text && (
        <p className="text-sm text-neutral-400">{text}</p>
      )}
    </div>
  );
}
