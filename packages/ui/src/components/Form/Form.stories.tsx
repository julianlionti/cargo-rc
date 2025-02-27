import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";
import {
  userEvent,
  within,
  expect,
  screen,
  fn,
  waitFor,
} from "@storybook/test";

import { faker } from "@faker-js/faker";

import { Box, Button, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createForm } from "../../utils/form.utils";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().optional(), // Optional for creating a new Cargo, required for updates
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  weight: z.number().min(0, "Weight must be a positive number"),
  reward: z.number().min(0, "Reward must be a positive number"),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]), // Enum for CargoSize
  urgency: z.enum(["LOW", "MEDIUM", "HIGH"]), // Enum for CargoUrgency

  companyId: z.string().optional(), // Optional if the company is not assigned
  licenseImage: z.string().optional(), // Optional if the company is not assigned

  originLat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  originLng: z
    .number()
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),
  destinationLat: z
    .number()
    .min(-90)
    .max(90, "Latitude must be between -90 and 90"),
  destinationLng: z
    .number()
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),

  distanceAprox: z
    .number()
    .min(0, "Distance must be a positive number")
    .optional(),

  deliveryDateTime: z.date().optional(), // Optional to allow default value at creation

  assignedToId: z.string().optional(), // Driver assignment is optional
  requestedById: z.string().optional(), // Driver request is optional
  requestedAt: z.date().optional(), // Optional timestamp for request
  approvedAt: z.date().optional(), // Optional timestamp for approval

  phoneNumber: z.string(),

  status: z.enum([
    "AVAILABLE",
    "PENDING",
    "IN_TRANSIT",
    "DELIVERED",
    "PICKED_UP",
    "CANCELLED",
  ]), // Enum for CargoStatus
});
type FormSchema = z.infer<typeof formSchema>;

const {
  Form,
  DateInput,
  DateTimeInput,
  Dropdown,
  NumberInput,
  TextInput,
  Autocomplete,
  TimeInput,
  FileUpload,
  MaskInput,
} = createForm<FormSchema>();

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Form> = {
  title: "Example/Form",
  component: Form,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Story />
      </LocalizationProvider>
    ),
  ],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onSubmit: fn(),
    children: (
      <Stack spacing={2}>
        <Stack spacing={1} direction="row">
          <TextInput id="title" label="Title" />
          <TextInput id="companyId" label="Company" />
        </Stack>
        <Stack spacing={1} direction="row">
          <Autocomplete
            id="origin"
            label="Origin"
            options={[{ id: "Uno" }, { id: "Dos" }, { id: "Tres" }]}
            onTextChanged={(text) => {
              console.log(text);
            }}
          />
          <NumberInput id="originLat" label="Origin Lat" isDisabled />
          <NumberInput id="originLng" label="Origin Lng" isDisabled />
          <MaskInput
            id="phoneNumber"
            mask="(+54) 9 11 ####-####"
            label="Phone Number"
          />
        </Stack>
        <Stack spacing={1} direction="row">
          <FileUpload id="licenseImage" label="License Image" />
          <TextInput id="destination" label="Destination" />
          <NumberInput id="destinationLat" label="Destination Lat" />
          <NumberInput id="destinationLng" label="Destination Lng" />
        </Stack>
        <Stack spacing={1} direction="row">
          <NumberInput id="weight" label="Weight" />
          <NumberInput id="reward" label="Reward" prefix="$" />
        </Stack>
        <Stack spacing={1} direction="row">
          <Dropdown
            id="size"
            options={[{ id: "SMALL" }, { id: "MEDIUM" }, { id: "LARGE" }]}
            label="Size"
          />
          <Dropdown
            id="urgency"
            options={[{ id: "LOW" }, { id: "MEDIUM" }, { id: "HIGH" }]}
            label="Urgency"
          />
        </Stack>

        <DateInput id="deliveryDateTime" label="Deliver Before" />
        <DateTimeInput id="deliveryDateTime" label="Deliver Before" />
        <TimeInput id="deliveryDateTime" label="Deliver Before" />

        <Box alignSelf="self-end">
          <Button type="submit">Submit</Button>
        </Box>
      </Stack>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByLabelText("Title"),
      faker.commerce.productName()
    );
    await userEvent.type(
      canvas.getByLabelText("Origin"),
      faker.location.city()
    );
    await userEvent.type(
      canvas.getByLabelText("Origin Lat"),
      faker.location.latitude().toString()
    );
    await userEvent.type(
      canvas.getByLabelText("Origin Lng"),
      faker.location.longitude().toString()
    );
    await userEvent.type(
      canvas.getByLabelText("Company"),
      faker.company.name()
    );
    await userEvent.type(
      canvas.getByLabelText("Destination"),
      faker.location.city()
    );
    await userEvent.type(
      canvas.getByLabelText("Destination Lat"),
      faker.location.latitude().toString()
    );
    await userEvent.type(
      canvas.getByLabelText("Destination Lng"),
      faker.location.longitude().toString()
    );
    await userEvent.type(
      canvas.getByLabelText("Reward"),
      faker.finance.amount({ min: 100000, max: 99999999 })
    );
    await userEvent.type(
      canvas.getByLabelText("Weight"),
      faker.number.int({ min: 10000, max: 30000 }).toString()
    );

    await userEvent.click(canvas.getByRole("combobox", { name: "Size" }));
    // Locate the corresponding popup (`listbox`) of options.
    const optionsPopupSize = await screen.findByRole("listbox", {
      name: "Size",
    });
    await userEvent.click(within(optionsPopupSize).getByText("MEDIUM"));

    await userEvent.click(canvas.getByRole("combobox", { name: "Urgency" }));
    // Locate the corresponding popup (`listbox`) of options.
    const optionsPopupUrgency = await screen.findByRole("listbox", {
      name: "Urgency",
    });
    await userEvent.click(within(optionsPopupUrgency).getByText("HIGH"));

    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));

    // 👇 Now we can assert that the onSubmit arg was called
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());

    // await expect(
    //   canvas.getByText(
    //     "Everything is perfect. Your account is ready and we should probably get you started!"
    //   )
    // ).toBeInTheDocument();
  },
  args: {
    schema: formSchema,
  },
};
