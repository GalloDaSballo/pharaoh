export default function CopyToClipboardButton({ text }: { text: string }) {
  const handleClick = async () => {
    await navigator.clipboard.writeText(text);
  };
  return <button onClick={handleClick}>COPY</button>;
}
