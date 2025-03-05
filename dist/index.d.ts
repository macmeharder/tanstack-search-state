type BaseState<T> = {
    [K in keyof T]: T[K];
};
type SetStateAction<T> = T | ((prevState: T) => T);
type SearchState<T> = BaseState<T> & {
    set: (update: SetStateAction<T>) => Promise<void>;
};

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
declare function createSearch<State extends Record<string, any>>(initialState: BaseState<State>): () => SearchState<State>;

export { type BaseState, type SearchState, type SetStateAction, createSearch };
