import * as React from 'react';

type MakeContextOptions = {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean;
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string;
  /**
   * The display name of the context
   */
  name: string;
};

type MakeContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

/**
 * Creates a named context, provider, and hook.
 */
function makeContext<ContextType>(
  options: MakeContextOptions,
  fallback: any = undefined
) {
  const {
    name,
    errorMessage = `'${name}' is undefined. Seems you forgot to wrap the component with the Context Provider`,
    strict = true,
  } = options;

  const Context = React.createContext<ContextType | undefined>(fallback);

  Context.displayName = name;

  function useContext() {
    const context = React.useContext(Context);

    if (!context && strict) {
      const error = new Error(errorMessage);
      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  return [
    Context.Provider,
    useContext,
    Context,
  ] as MakeContextReturn<ContextType>;
}

export type { MakeContextOptions, MakeContextReturn };
export { makeContext };
