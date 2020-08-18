export type ReactChild<T = never> = React.ReactElement | null | T;
export type ReactChildren<T = never> = ReactChild<T> | ReactChild<T>[];