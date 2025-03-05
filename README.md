# tanstack-search-state

A utility for managing search params state with TanStack Router in a type-safe way. Synchronize your URL search parameters with React state using a familiar API.

## Installation

```bash
# npm
npm install tanstack-search-state

# yarn
yarn add tanstack-search-state

# pnpm
pnpm add tanstack-search-state
```

## Usage

```tsx
import { createSearch } from "tanstack-search-state";

// Create a hook with your initial state
const useSearchState = createSearch({
  page: 1,
  query: "",
  filters: [] as string[],
  sort: {
    field: "name",
    direction: "asc" as "asc" | "desc",
  },
});

function SearchComponent() {
  // Use the hook in your component
  const { page, query, filters, sort, set } = useSearchState();

  return (
    <div>
      <input
        value={query}
        onChange={(e) => set({ query: e.target.value })}
        placeholder="Search..."
      />

      <button onClick={() => set({ page: page + 1 })}>Next Page</button>

      {/* You can also use a function to update based on previous state */}
      <button
        onClick={() =>
          set((prev) => ({
            ...prev,
            filters: [...prev.filters, "new-filter"],
          }))
        }
      >
        Add Filter
      </button>

      <select
        value={sort.direction}
        onChange={(e) =>
          set((prev) => ({
            ...prev,
            sort: { ...prev.sort, direction: e.target.value as "asc" | "desc" },
          }))
        }
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
```

## Features

- 🔄 Sync URL search params with component state
- 🎯 Type-safe search params management
- 🔌 Built for TanStack Router
- 🚀 Easy to use API with familiar React state patterns
- 📦 Lightweight (~1KB gzipped)
- 🔍 Support for complex nested objects and arrays
- 🧩 Composable with other TanStack Router features

## Why?

While TanStack Router provides excellent search params management, this utility adds:

1. A simpler, more familiar API similar to React's useState
2. Automatic type inference from your initial state
3. Support for complex nested objects and arrays
4. Fallback values when URL parameters are not present

## API

### `createSearch(initialState)`

Creates a custom hook for managing search params state.

#### Parameters

- `initialState`: An object containing the initial state of your search params. This state will be used as fallback when URL parameters are not present.

#### Returns

A custom hook that returns:

- All properties from your state with proper type inference
- `set`: A function to update the state. Accepts either a partial state object or an update function.

### Types

```typescript
type SetStateAction<T> = T | ((prevState: T) => T);

type SearchState<T> = T & {
  set: (update: SetStateAction<T>) => Promise<void>;
};
```

## Requirements

- React 18+
- TanStack Router 1.0+

## License

MIT
