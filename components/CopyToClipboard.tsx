export default function CopyToClipboard({ text }) {
  const handleClick = async () => {
    await navigator.clipboard.writeText(text);
  };

  return <span onClick={handleClick}>{text}</span>;
}
