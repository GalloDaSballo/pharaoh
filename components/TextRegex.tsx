import { useMemo, useState } from "react";
import fuzzy, { FilterResult } from "fuzzy";
import { applyShortcut } from "@/utils/shortcut";
import CopyToClipboard from "./CopyToClipboard";
import CopyToClipboardButton from "./CopyToClipboardButton";

const getHeaderValues = (
  text: string,
  header: string
): FilterResult<string>[] => {
  if (header == "") return [];

  const lines = text.split("\n");
  console.log("lines", lines);
  const res = fuzzy.filter(header, lines);
  console.log("res", res);
  return res;
};

const makeText = (
  headers: FilterResult<string>[],
  scores: string[]
): string => {
  let init = "";
  for (let i = 0; i < headers.length; i++) {
    init += headers[i].string;
    init += "\n";
    init += scores[i];
    init += "\n";
  }

  return init;
};

// ON backspace
// https://bobbyhadz.com/blog/react-detect-backspace-key

export default function TextRegex({
  onDone,
}: {
  onDone: (val: any, scores: any) => void;
}) {
  // ID of this Thingy
  // Store the whole thing as JSON
  // Button to check unique judging
  // Button to apply unique judging
  // Button to diff unique judging

  const [text, setText] = useState("");
  const [header, setHeader] = useState("");
  const [done, setDone] = useState(false);
  const val = useMemo(() => {
    return getHeaderValues(text, header);
  }, [text, header]);

  const [scores, setScores] = useState({});

  const updateScores = (scores: any, index: number, value: string) => {
    if (done) {
      return;
    }
    const scoresCopy = { ...scores };
    scoresCopy[index] = value;
    setScores(scoresCopy);
  };

  // ADD TODOs so we can export quickly
  const addTodosOnRest = (scores, index) => {
    const { length } = val;
  };

  const finalize = () => {
    if (onDone) {
      // Pass headers and scores
      onDone(val, scores);
    }

    // Set frozen
    setDone(true);
  };

  // Set doc

  // Judge

  return (
    <div>
      {!done && (
        <>
          <h2>Title</h2>
          <input
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />

          <h2>TEXT</h2>
          <textarea onChange={(e) => setText(e.target.value)} value={text} />
        </>
      )}
      <h2>Result</h2>
      {header !== "" && text !== "" && !done && (
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
      )}
      <h2>Copy Paste</h2>
      {val.length > 0 && scores?.[val.length - 1] != undefined && (
        <button type="button" onClick={finalize}>
          {done ? "IS DONE" : "SET DONE"}
        </button>
      )}
      {done && (
        <>
          <div>
            {val.map((s, i) => (
              <div>
                <p>{s.string}</p>
                <p>{scores[i]}</p>
              </div>
            ))}
          </div>
          <CopyToClipboardButton text={makeText(val, scores)} />
        </>
      )}
      <h2>COPY</h2>
      <CopyToClipboardButton text={makeText(val, scores)} />
    </div>
  );
}
