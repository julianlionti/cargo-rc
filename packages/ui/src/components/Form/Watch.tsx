import { debounce } from "@mui/material";
import { useEffect, useRef } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

interface WatchProps<T extends FieldValues> {
  onValuesChanged: (values: T) => T;
}
export function Watch<T extends FieldValues>(props: WatchProps<T>) {
  const { onValuesChanged } = props;

  const debouncedChange = useRef(
    debounce((values) => {
      onValuesChanged(values);
    }, 500)
  );

  const { watch } = useFormContext();

  useEffect(() => {
    watch((values) => {
      debouncedChange.current(values);
    });
  }, [watch]);

  return null;
}
