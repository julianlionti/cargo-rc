import { FieldValues } from "react-hook-form";
import TextInput from "../components/Form/inputs/TextInput";
import Dropdown from "../components/Form/inputs/Dropdown";
import DateInput from "../components/Form/inputs/DateInput";
import NumberInput from "../components/Form/inputs/NumberInput";
import DateTimeInput from "../components/Form/inputs/DateTimeInput";
import TimeInput from "../components/Form/inputs/TimeInput";
import Autocomplete from "../components/Form/inputs/Autocomplete";
import { Option } from "../types/input.types";
import Form from "../components/Form/Form";
import MaskInput from "../components/Form/inputs/MaskInput";
import FileUpload from "../components/Form/inputs/FileUpload";

type CreateFormRet<T extends FieldValues> = {
  Form: typeof Form<T>;
  TextInput: typeof TextInput<T>;
  MaskInput: typeof MaskInput<T>;
  Dropdown: typeof Dropdown<T>;
  NumberInput: typeof NumberInput<T>;
  DateInput: typeof DateInput<T>;
  DateTimeInput: typeof DateTimeInput<T>;
  TimeInput: typeof TimeInput<T>;
  FileUpload: typeof FileUpload<T>;
  AutocompleteCustomOption: <O extends Option>() => typeof Autocomplete<T, O>;
  Autocomplete: typeof Autocomplete<T, Option>;
};

export function createForm<T extends FieldValues>(): CreateFormRet<T> {
  return {
    Form: Form<T>,
    TextInput: TextInput<T>,
    MaskInput: MaskInput<T>,
    Dropdown: Dropdown<T>,
    NumberInput: NumberInput<T>,
    DateInput: DateInput<T>,
    FileUpload: FileUpload<T>,
    DateTimeInput: DateTimeInput<T>,
    TimeInput: TimeInput<T>,
    AutocompleteCustomOption: <O extends Option>() => Autocomplete<T, O>,
    Autocomplete: Autocomplete<T, Option>,
  };
}
