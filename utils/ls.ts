// TODO: Make it so we can save all new keys for the contest
// TODO: Make it so we add only new findings, so all findings with unique headers have a single severity
// NOTE: This means there will need to be a manual phase at end in which we compare for quality / accuracy

export const addToState = (newValues, key = "") => {
  const currentState = load(key);
  if (currentState) {
    // Check what to add and add it
  }

  // Iterate over all keys
  // Check if found
  // If not found, set as new
};

export const save = (globalState, key = "") => {
  localStorage.setItem(`global_${key}`, JSON.stringify(globalState));
};

export const load = (key = "") => {
  const glboalState = localStorage.getItem(`global_${key}`);
  if (!glboalState) {
    return null;
  }
  return JSON.parse(glboalState);
};
