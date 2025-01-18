import { FieldValues } from "react-hook-form";
import TextInput from "../components/Form/inputs/TextInput";
import Dropdown from "../components/Form/inputs/Dropdown";
import DateInput from "../components/Form/inputs/DateInput";
import NumberInput from "../components/Form/inputs/NumberInput";
import DateTimeInput from "../components/Form/inputs/DateTimeInput";
import TimeInput from "../components/Form/inputs/TimeInput";
import Autocomplete from "../components/Form/inputs/Autocomplete";
import { Option } from "../types/input.types";

type CreateFormRet<T extends FieldValues> = {
  TextInput: typeof TextInput<T>;
  Dropdown: typeof Dropdown<T>;
  NumberInput: typeof NumberInput<T>;
  DateInput: typeof DateInput<T>;
  DateTimeInput: typeof DateTimeInput<T>;
  TimeInput: typeof TimeInput<T>;
  AutocompleteCustomOption: <O extends Option>() => typeof Autocomplete<T, O>;
  Autocomplete: typeof Autocomplete<T, Option>;
};

export function createForm<T extends FieldValues>(): CreateFormRet<T> {
  return {
    TextInput: TextInput<T>,
    Dropdown: Dropdown<T>,
    NumberInput: NumberInput<T>,
    DateInput: DateInput<T>,
    DateTimeInput: DateTimeInput<T>,
    TimeInput: TimeInput<T>,
    AutocompleteCustomOption: <O extends Option>() => Autocomplete<T, O>,
    Autocomplete: Autocomplete<T, Option>,
  };
}
