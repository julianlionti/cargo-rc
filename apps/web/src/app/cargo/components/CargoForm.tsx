"use client";
import {
  Alert,
  AlertProps,
  Box,
  Button,
  Collapse,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CargoStatus } from "@prisma/client";
import { createForm, Form, FormRef, Position } from "@ui";
import { Option } from "@ui";
import { cargoSchema, CargoSchema } from "@utils";
import { useRouter } from "next/navigation";
import clientConfig from "rc/config/client.config";
import { useGeolocation } from "rc/hooks/useGeolocation";
import { fetchApi } from "rc/utils/fetchApi";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
} from "react";

type OptionsWithPosition = Option & { position: Position };

type HereItem = {
  id: string;
  title: string;
  resultType: string;
  position: Position;
  distance: number;
};
type HereRet = {
  items: HereItem[];
};
const getHereUrl = (
  text: string,
  location: Position = { lat: 39.31974, lng: -76.56721 }
) => {
  return `https://autosuggest.search.hereapi.com/v1/autosuggest?at=${location.lat},${location.lng}&limit=50&apiKey=${clientConfig.NEXT_PUBLIC_HERE_API}&q=${text}`;
};

const parseHereResponse = (items: HereItem[]) => {
  return items
    .filter(
      (item) =>
        item.resultType === "houseNumber" || item.resultType === "street"
    )
    .map(
      (e): OptionsWithPosition => ({
        id: e.title,
        name: e.title,
        position: e.position,
      })
    );
};

const severityByStatus: Record<CargoStatus, AlertProps["severity"]> = {
  AVAILABLE: "success",
  CANCELLED: "error",
  DELIVERED: "success",
  IN_TRANSIT: "success",
  PENDING: "warning",
  PICKED_UP: "success",
};

const {
  AutocompleteCustomOption,
  TextInput,
  NumberInput,
  Dropdown,
  DateTimeInput,
} = createForm<CargoSchema>();

const Autocomplete = AutocompleteCustomOption<OptionsWithPosition>();

interface CargoFormProps {
  defaultValues?: CargoSchema;
  companies: Option[];
}

export function CargoForm(props: CargoFormProps) {
  const { defaultValues, companies } = props;
  const router = useRouter();

  const formRef = useRef<FormRef<CargoSchema> | null>(null);
  const setValue = formRef.current?.methods.setValue;
  const watch = formRef.current?.methods.watch;

  const { location } = useGeolocation();

  const isNewItem = !defaultValues;

  const [, createCargo, isCreatingCargo] = useActionState(
    async (_: unknown, values: CargoSchema) => {
      const response = await fetch(
        `/api/cargos${isNewItem ? "" : `/${defaultValues?.id}`}`,
        {
          method: isNewItem ? "POST" : "PUT",
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        if (isNewItem) router.replace("/cargo");
        else router.refresh();
      }
    },
    null
  );

  const [locationsForOrigin, getLocationForOrigin, isGettingLocationForOrigin] =
    useActionState(async (_: OptionsWithPosition[], text: string) => {
      const { items } = await fetchApi<HereRet>(
        getHereUrl(text, location || undefined)
      );
      return parseHereResponse(items);
    }, []);

  const [
    locationsForDestination,
    getLocationForDestination,
    isGettingLocationForDestination,
  ] = useActionState(async (_: OptionsWithPosition[], text: string) => {
    const { items } = await fetchApi<HereRet>(
      getHereUrl(text, location || undefined)
    );
    return parseHereResponse(items);
  }, []);

  const [originLat, originLng, destinationLat, destinationLng] = watch
    ? watch(["originLat", "originLng", "destinationLat", "destinationLng"])
    : [];

  const [distanceAprox, status] = watch
    ? watch(["distanceAprox", "status"])
    : [];

  const getDistance = useCallback(async () => {
    if (!originLat || !originLng || !destinationLat || !destinationLng) return;
    const { items } = await fetchApi<HereRet>(
      getHereUrl(originLat + "," + originLng, {
        lat: destinationLat,
        lng: destinationLng,
      })
    );
    const [first] = items;
    if (first?.distance) {
      if (setValue) setValue("distanceAprox", first.distance);
    }
  }, [originLat, originLng, destinationLat, destinationLng, setValue]);

  useEffect(() => {
    getDistance();
  }, [getDistance]);

  return (
    <Form<CargoSchema>
      ref={formRef}
      onSubmit={(values) =>
        startTransition(() => {
          createCargo(values);
        })
      }
      schema={cargoSchema}
      isDisabled={isCreatingCargo}
      defaultValues={{
        status: "AVAILABLE",
        ...defaultValues,
        companyId: defaultValues?.companyId || undefined,
        approvedAt: defaultValues?.approvedAt || undefined,
        assignedToId: defaultValues?.companyId || undefined,
        requestedAt: defaultValues?.requestedAt || undefined,
        requestedById: defaultValues?.requestedById || undefined,
      }}
    >
      <Paper>
        {isCreatingCargo && <LinearProgress />}
        <Stack spacing={2} padding={3}>
          <Stack spacing={1} direction="row">
            <TextInput id="title" label="Title" />
            <Dropdown id="companyId" label="Company" options={companies} />
          </Stack>
          <Stack spacing={1} direction="row">
            <Autocomplete
              id="origin"
              label="Origin"
              options={locationsForOrigin}
              onOptionSelected={(option) => {
                const { position } = option || {};
                if (!setValue) return;
                setValue("originLat", (position?.lat || null) as number);
                setValue("originLng", (position?.lng || null) as number);
              }}
              onTextChanged={(next) => {
                startTransition(() => {
                  if (next.length > 2) getLocationForOrigin(next);
                });
              }}
              isLoading={isGettingLocationForOrigin}
            />
            <NumberInput id="originLat" label="Latitude" isDisabled />
            <NumberInput id="originLng" label="Longitude" isDisabled />
          </Stack>
          <Stack spacing={1} direction="row">
            <Autocomplete
              id="destination"
              label="Destination"
              options={locationsForDestination}
              onOptionSelected={(option) => {
                const { position } = option || {};
                if (!setValue) return;
                setValue("destinationLat", (position?.lat || null) as number);
                setValue("destinationLng", (position?.lng || null) as number);
              }}
              onTextChanged={(next) => {
                startTransition(() => {
                  if (next.length > 2) getLocationForDestination(next);
                });
              }}
              isLoading={isGettingLocationForDestination}
            />
            <NumberInput id="destinationLat" label="Latitude" isDisabled />
            <NumberInput id="destinationLng" label="Longitude" isDisabled />
          </Stack>
          <Collapse in={!!distanceAprox} sx={{ alignSelf: "end" }}>
            <Typography>{`Distance Aprox.: ${
              (distanceAprox || 0) / 1000
            } km`}</Typography>
          </Collapse>

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

          <DateTimeInput id="deliveryDateTime" label="Deliver Before" />

          {status && (
            <Alert severity={severityByStatus[status]}>{status}</Alert>
          )}

          <Box alignSelf="self-end">
            <Button
              variant="contained"
              type="submit"
              disabled={isCreatingCargo}
            >
              {isNewItem ? "Submit" : "Update"}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Form>
  );
}
