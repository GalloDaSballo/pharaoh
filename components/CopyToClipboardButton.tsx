export default function CopyToClipboardButton({ text }) {
  const handleClick = async () => {
    await navigator.clipboard.writeText(text);
  };
  return <button onClick={handleClick}>COPY</button>;
}
