export const SHORTCUTS = {
  "1": "L",
  "2": "R",
  "3": "NC",
  "4": "TODO",
  "\\": "I",
  "r": "-3"
}

export const applyShortcut = (val: string) => {
  if(SHORTCUTS[val]) {
    return SHORTCUTS[val]
  } else {return val}
}