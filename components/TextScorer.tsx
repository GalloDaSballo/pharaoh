import { useEffect, useMemo, useState } from "react";
import { getHeadersAndScores } from "c4-string-regex/lib";
import { applyShortcut } from "@/utils/shortcut";
import CopyToClipboard from "./CopyToClipboard";
import CopyToClipboardButton from "./CopyToClipboardButton";

/**
 * NOTE: This is different from the one in TextScraper
 */
const makeText = (headersAndScores: { [key: string]: string }): string => {
  let init = "";
  const keys = Object.keys(headersAndScores);
  for (let i = 0; i < keys.length; i++) {
    init += keys[i];
    init += "\n";
    init += headersAndScores[keys[i]];
    init += "\n";
  }

  return init;
};

// ON backspace
// https://bobbyhadz.com/blog/react-detect-backspace-key

interface HeadersAndScores {
  [key: string]: string;
}

export default function TextScorer() {
  const [text, setText] = useState("");

  // headersAndScores[header] = rating
  const [headersAndScores, setHeadersAndScores] = useState<HeadersAndScores>(
    {}
  );

  useEffect(() => {
    // Get headers here
    try {
      const parsedHeadersAndScores = getHeadersAndScores(text);
      setHeadersAndScores(parsedHeadersAndScores);
    } catch (err) {
      console.log("err", err);
    }
  }, [text]);

  const updateScores = (key: string, value: string) => {
    const scoresCopy = { ...headersAndScores };
    scoresCopy[key] = value;
    setHeadersAndScores(scoresCopy);
  };

  return (
    <div>
      <h2>TEXT</h2>
      <textarea onChange={(e) => setText(e.target.value)} value={text} />
      <h2>Result</h2>
      {Object.keys(headersAndScores).length > 0 && (
        <div>
          {Object.keys(headersAndScores).map((key, i) => (
            <div>
              <CopyToClipboard text={key} key={i} />
              <input
                type="text"
                onChange={(e) =>
                  updateScores(key, applyShortcut(e.target.value))
                }
                value={headersAndScores[key]}
              />
            </div>
          ))}
        </div>
      )}
      <h2>COPY</h2>
      <CopyToClipboardButton text={makeText(headersAndScores)} />
    </div>
  );
}
