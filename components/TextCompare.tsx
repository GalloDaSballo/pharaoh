import { useMemo, useState } from "react";
import fuzzy, { FilterResult } from "fuzzy";
import { load } from "@/utils/ls";
import { findMatches, findMatchesWords } from "@/utils/compare";

const getHeaderValues = (text: string, header: string): string[] => {
  if (header == "") return [];

  const lines = text.split("\n");
  console.log("lines", lines);
  const res = fuzzy.filter(header, lines);
  console.log("res", res);
  return res.map((v) => v.string);
};

// ON backspace
// https://bobbyhadz.com/blog/react-detect-backspace-key

export default function TextCompare() {
  const [text, setText] = useState("");
  const [header, setHeader] = useState("");

  const matches = useMemo(() => {
    if (!header) {
      return;
    }
    if (!text) {
      return;
    }
    const state = load();
    console.log(findMatchesWords(getHeaderValues(text, header), state));
    console.log(findMatches(getHeaderValues(text, header), state));
    return [];
  }, [text, header]);

  console.log("matches", matches);

  return (
    <div>
      <h2>Title</h2>
      <input
        type="text"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      />

      <h2>TEXT</h2>
      <textarea onChange={(e) => setText(e.target.value)} value={text} />
      <h2>Result</h2>
      {/* {header !== "" && text !== "" && (
        <div>
          {val.map((s, i) => (
            <div>
              <CopyToClipboard text={s.string} key={i} />
              <input
                type="text"
                onChange={(e) =>
                  updateScores(scores, i, applyShortcut(e.target.value))
                }
                value={scores?.[i]}
              />
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
