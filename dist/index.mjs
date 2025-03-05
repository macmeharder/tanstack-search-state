// src/index.ts
import { useNavigate, useSearch } from "@tanstack/react-router";
function createSearch(initialState) {
  return function useSearchState() {
    const search = useSearch({ strict: false });
    const navigate = useNavigate();
    async function set(update) {
      await navigate({
        to: ".",
        search: (prevRaw) => {
          const prev = { ...initialState, ...prevRaw };
          return typeof update === "function" ? update(prev) : { ...prev, ...update };
        }
      });
    }
    return {
      ...initialState,
      ...search,
      set
    };
  };
}
export {
  createSearch
};
