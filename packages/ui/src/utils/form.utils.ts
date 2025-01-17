import { FieldValues } from "react-hook-form";
import TextInput from "../components/Form/inputs/TextInput";
import Dropdown from "../components/Form/inputs/Dropdown";
import DateInput from "../components/Form/inputs/DateInput";
import NumberInput from "../components/Form/inputs/NumberInput";
import DateTimeInput from "../components/Form/inputs/DateTimeInput";
import TimeInput from "../components/Form/inputs/TimeInput";

type CreateFormRet<T extends FieldValues> = {
  TextInput: typeof TextInput<T>;
  Dropdown: typeof Dropdown<T>;
  NumberInput: typeof NumberInput<T>;
  DateInput: typeof DateInput<T>;
  DateTimeInput: typeof DateTimeInput<T>;
  TimeInput: typeof TimeInput<T>;
};

export function createForm<T extends FieldValues>(): CreateFormRet<T> {
  return {
    TextInput: TextInput<T>,
    Dropdown: Dropdown<T>,
    NumberInput: NumberInput<T>,
    DateInput: DateInput<T>,
    DateTimeInput: DateTimeInput<T>,
    TimeInput: TimeInput<T>,
  };
}
