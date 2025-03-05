import { useNavigate, useSearch } from "@tanstack/react-router";
import { BaseState, SearchState, SetStateAction } from "./types";

/**
 * Creates a hook for managing search params state with TanStack Router
 * @param initialState - The initial state of the search params
 * @returns A hook that provides access to the search state and a setter function
 * @example
 * ```tsx
 * const useSearchState = createSearch({ page: 1, query: "" });
 *
 * function Component() {
 *   const { page, query, set } = useSearchState();
 *
 *   return (
 *     <div>
 *       <input
 *         value={query}
 *         onChange={(e) => set({ query: e.target.value })}
 *       />
 *       <button onClick={() => set({ page: page + 1 })}>
 *         Next Page
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function createSearch<State extends Record<string, any>>(
  initialState: BaseState<State>
): () => SearchState<State> {
  return function useSearchState(): SearchState<State> {
    const search = useSearch({ strict: false }) as Partial<BaseState<State>>;
    const navigate = useNavigate();

    async function set(update: SetStateAction<State>): Promise<void> {
      await navigate({
        to: ".",
        search: (prevRaw: Record<string, any>) => {
          const prev = { ...initialState, ...prevRaw };
          return typeof update === "function"
            ? update(prev)
            : { ...prev, ...update };
        },
      });
    }

    return {
      ...initialState,
      ...search,
      set,
    };
  };
}

export * from "./types";
