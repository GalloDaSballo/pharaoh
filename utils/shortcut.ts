export const SHORTCUTS = {
  "1": "L",
  "2": "R",
  "3": "NC",
  "4": "TODO",
  "\\": "I",
  r: "-3",
};

export const applyShortcut = (val: string) => {
  // @ts-ignore // Safe because we check for falsy values
  if (SHORTCUTS[val]) {
    // @ts-ignore // Safe because we check for falsy values
    return SHORTCUTS[val];
  }
  return val;
};
