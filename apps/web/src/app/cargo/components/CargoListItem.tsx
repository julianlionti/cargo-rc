import { Grid2, Paper, Typography, Button, Stack, Box } from "@mui/material";
import { Cargo } from "@prisma/client";
import { numberToCurrency } from "@utils";
import { ReactNode } from "react";
import StatusAlert from "./shared/StatusAlert";

interface CargoListItemProps {
  item: Cargo;
}

export default function CargoListItem({ item }: CargoListItemProps) {
  const buttonsByStatus: Record<typeof item.status, ReactNode> = {
    AVAILABLE: (
      <Stack spacing={1}>
        <Button variant="contained" href={`/cargo/${item.id}/edit`}>
          Edit cargo information
        </Button>
        <Button
          variant="outlined"
          color="error"
          href={`/cargo/${item.id}/edit`}
        >
          Cancel Cargo
        </Button>
      </Stack>
    ),
    PENDING: (
      <Stack spacing={1}>
        <Button variant="contained" href={`/cargo/${item.id}/edit`}>
          See driver details
        </Button>
        <Button
          variant="outlined"
          color="error"
          href={`/cargo/${item.id}/edit`}
        >
          Cancel Cargo
        </Button>
      </Stack>
    ),
    CANCELLED: (
      <Stack spacing={1}>
        <Button variant="contained" href={`/cargo/${item.id}/edit`}>
          Get reasons
        </Button>
        <Button
          variant="outlined"
          color="error"
          href={`/cargo/${item.id}/edit`}
        >
          Remove Cargo
        </Button>
      </Stack>
    ),
    DELIVERED: (
      <Stack spacing={1}>
        <Button variant="contained" href={`/cargo/${item.id}/edit`}>
          See Cargo Information
        </Button>
        <Button variant="outlined" href={`/cargo/${item.id}/edit`}>
          Rank Driver
        </Button>
      </Stack>
    ),
    IN_TRANSIT: (
      <Stack spacing={1}>
        <Button variant="contained" href={`/cargo/${item.id}/edit`}>
          Get Cargo Location
        </Button>
        <Button variant="outlined" href={`/cargo/${item.id}/edit`}>
          Contact Driver
        </Button>
      </Stack>
    ),
    PICKED_UP: (
      <Stack spacing={1}>
        <Button variant="contained" href={`/cargo/${item.id}/edit`}>
          Get Cargo Location
        </Button>
        <Button variant="outlined" href={`/cargo/${item.id}/edit`}>
          Contact Driver
        </Button>
      </Stack>
    ),
  };

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
      <Stack component={Paper} p={3} spacing={1} overflow="hidden" height={550}>
        <Typography variant="h2">{item.title}</Typography>
        <Stack flex={1} spacing={0.25}>
          <Typography>
            Origin: <b>{item.origin}</b>
          </Typography>
          <Typography>
            Destination: <b>{item.destination}</b>
          </Typography>
          <Typography>Size: {item.size}</Typography>
          <Typography>
            Reward: <b>{numberToCurrency(item.reward)}</b>
          </Typography>
          <Typography>Urgency: {item.urgency}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight="bold">
            Distance (Aprox): <b>{`${item.distanceAprox / 1000} Km`}</b>
          </Typography>
        </Stack>
        <StatusAlert status={item.status} />
        <Box mt={2}>{buttonsByStatus[item.status]}</Box>
      </Stack>
    </Grid2>
  );
}
