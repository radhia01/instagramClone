export const loadState = () => {
  try {
    const State = localStorage.getItem("store");
    if (State === null) {
      return undefined;
    }
    return JSON.parse(State);
  } catch (err) {
    return undefined;
  }
};
export const saveState = (state) => {
  try {
    const State = JSON.stringify(state);
    localStorage.setItem("store", State);
  } catch (err) {
    console.log(err);
  }
};
export default localStorage;
