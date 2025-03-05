export type BaseState<T> = { [K in keyof T]: T[K] };

export type SetStateAction<T> = T | ((prevState: T) => T);

export type SearchState<T> = BaseState<T> & {
  set: (update: SetStateAction<T>) => Promise<void>;
};
