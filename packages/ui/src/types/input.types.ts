export type CommonInputProps = Partial<{
  label: string;
  isDisabled: boolean;
}>;

export interface Option {
  id: string;
  title?: string;
}
