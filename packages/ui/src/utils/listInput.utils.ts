import { Option } from "../types/input.types";

export function getFinalOptionList<O extends Option>(
  options: O[],
  fieldValue: string,
  labelValue: string
): O[] {
  console.log({ options, fieldValue, labelValue });
  if (options && options.length > 0) return options;
  if (!options && !fieldValue) return [];

  if ((!options || options.length === 0) && fieldValue)
    return [{ id: labelValue || fieldValue, name: fieldValue } as O];
  return [];
}
