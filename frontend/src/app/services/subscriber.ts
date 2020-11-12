export type SuccSubscriber<T> = (value: T) => void;
export type ErrSubscriber = (err: any) => void;

export interface Subscriber<T> {
  succSubscriber: SuccSubscriber<T>;
  errSubscriber?: (err: any) => void;
}
