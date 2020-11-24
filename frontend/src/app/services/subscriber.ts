export type NextMethod<T> = (value: T) => void;
export type ErrorMethod = (error: any) => void;
export type CompletionMethod = () => void;
