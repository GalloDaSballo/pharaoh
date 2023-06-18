import fuzzy, { FilterResult } from "fuzzy";

const { distance, closest } = require("fastest-levenshtein");

interface State {
  headers: { string: string }[];
  scores: string[];
}

// interface Match {
//   currentHeader: string;
//   oldStateHeader: string;
//   oldStateScore: string;
// }

const PADDING = ["| ", "| [L-01]", "| [L-02]"];
// Exact matches
export const findMatches = (currentHeaders: string[], oldState: State) => {
  // Linear search I guess
  // const matches = [current, oldState.headers, oldState.score];
  console.log("findMatches currentHeaders", currentHeaders);
  console.log("findMatches oldState", oldState);
  const matches = [];
  for (let i = 0; i < currentHeaders.length; i++) {
    const found = fuzzy.filter(currentHeaders[i], oldState.headers, {
      extract(el) {
        return el.string;
      },
    });
    if (found.length > 1) {
      console.log("found", found);
    }

    if (found.length == 1) {
      console.log("Extact one match");
      matches[i] = [
        currentHeaders[i],
        found[0].string,
        oldState.scores[found[0].index],
      ];
    }
  }

  return matches;
};

const getWords = (text: string): string[] => {
  return text.split(" ");
};

export const findMatchesWords = (currentHeaders: string[], oldState: State) => {
  // Find word matches
  // One word is 1
  // Two word is 2
  // etc..
  // More words = better

  const matches = [];
  for (let i = 0; i < currentHeaders.length; i++) {
    const currentHeader = currentHeaders[i];

    const otherHeaders = oldState.headers.map((h) => h.string);

    const found = closest(currentHeader, otherHeaders);

    console.log("found", found);

    const indexOfFound = otherHeaders.indexOf(found);

    matches[i] = [currentHeader, found, oldState.scores[indexOfFound]];

    // For each word
    // Find the header that matches with the most

    // Return that one
  }

  return matches;
};
