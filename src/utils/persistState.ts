import { RootState } from "../app/store";

export function loadState<K extends keyof RootState>(
  states: K[]
): Partial<RootState> | undefined {
  try {
    const preloadedState: Partial<RootState> = {};

    const rootState = localStorage.getItem("bikeStore");
    if (!rootState) return undefined;

    const parsedState: Partial<RootState> = JSON.parse(rootState);

    states.forEach((stateKey) => {
      if (Object.prototype.hasOwnProperty.call(parsedState, stateKey)) {
        preloadedState[stateKey] = parsedState[stateKey];
      }
    });

    return preloadedState;
  } catch (e) {
    console.error("Failed to parse state from localStorage:", e);
    return undefined;
  }
}

export function saveState(partialState: Partial<RootState>): void {
  try {
    const existingState = localStorage.getItem("bikeStore");
    const currentState = existingState ? JSON.parse(existingState) : {};

    // Merge new partialState with the existing stored state
    const newState = { ...currentState, ...partialState };

    localStorage.setItem("bikeStore", JSON.stringify(newState));
  } catch (e) {
    console.error("Failed to save state to localStorage:", e);
  }
}
