"use client";

import { Paper, Typography, Divider, Stack, Button } from "@mui/material";
import { Cargo, CargoStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import StaticMap from "rc/components/shared/StaticMap";
import { fetchApi } from "rc/utils/fetchApi";
import { startTransition, useActionState } from "react";

interface CargoInformationProps {
  data: Cargo;
}

export default function CargoInformation(props: CargoInformationProps) {
  const { data } = props;
  const { refresh } = useRouter();

  const [, handleAssignCargo, isAssigningCargo] = useActionState(async () => {
    await fetchApi<Cargo>(`/api/cargos/${data.id}/assign`, { method: "POST" });
    refresh();
  }, null);

  const [, handleCancelCargo, isCancellingCargo] = useActionState(async () => {
    await fetchApi<Cargo, { status: CargoStatus }>(`/api/cargos/${data.id}`, {
      method: "PUT",
      body: { status: "CANCELLED" },
    });
    refresh();
  }, null);

  return (
    <Paper sx={{ padding: 3, boxShadow: 2 }}>
      <Typography variant="h4" gutterBottom>
        {data.title}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="h6">Origin</Typography>
      <Typography variant="body1">{data.origin}</Typography>
      <Typography variant="body1">
        Coordinates: ({data.originLat}, {data.originLng})
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Destination
      </Typography>
      <Typography variant="body1">{data.destination}</Typography>
      <Typography variant="body1">
        Coordinates: ({data.destinationLat}, {data.destinationLng})
      </Typography>
      <Stack alignItems="center">
        <StaticMap
          to={{
            lat: data.destinationLat,
            lng: data.destinationLng,
          }}
          from={{
            lat: data.originLat,
            lng: data.originLng,
          }}
        />
      </Stack>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Cargo Size: {data.size}
      </Typography>
      <Typography variant="h6">Reward: ${data.reward}</Typography>
      <Typography variant="h6">Urgency: {data.urgency}</Typography>
      <Typography variant="h6">Status: {data.status}</Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Assigned To: {data.assignedToId ? data.assignedToId : "Unassigned"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() =>
          startTransition(() => {
            handleAssignCargo();
          })
        }
        disabled={
          (data.status !== "AVAILABLE" && !!data.assignedToId) ||
          isAssigningCargo
        }
      >
        Assign to Me
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ marginTop: 2, marginLeft: 2 }}
        onClick={handleCancelCargo}
        disabled={data.status === "CANCELLED" || isCancellingCargo}
      >
        Cancel Cargo
      </Button>
    </Paper>
  );
}
