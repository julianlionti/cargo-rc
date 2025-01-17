"use client";
import { Form } from "@ui";
import { cargoSchema } from "@utils";

export default function CargoForm() {
  return (
    <Form onSubmit={() => {}} schema={cargoSchema}>
      <p>Cargo</p>
    </Form>
  );
}
