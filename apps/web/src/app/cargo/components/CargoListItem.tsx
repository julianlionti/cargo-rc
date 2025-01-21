import { Grid2, Paper, Typography, Button, Stack, Box } from "@mui/material";
import { Cargo } from "@prisma/client";
import { numberToCurrency } from "@utils";
import { ReactNode } from "react";

interface CargoListItemProps {
  item: Cargo;
}

export default function CargoListItem({ item }: CargoListItemProps) {
  const buttonsByStatus: Record<typeof item.status, ReactNode> = {
    AVAILABLE: (
      <Stack spacing={1}>
        <Button variant="outlined" href={`/cargo/${item.id}/edit`}>
          Edit cargo information
        </Button>
        <Button variant="contained" href={`/cargo/${item.id}/assign`}>
          Pick This Cargo
        </Button>
      </Stack>
    ),
    CANCELLED: <></>,
    DELIVERED: <></>,
    IN_TRANSIT: <></>,
    PICKED_UP: <></>,
  };

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
      <Paper sx={{ padding: 3, boxShadow: 2, overflow: "hidden" }}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography>
          Origin: <b>{item.origin}</b>
        </Typography>
        <Typography>
          Destination: <b>{item.destination}</b>
        </Typography>
        <Typography fontWeight="bold">
          Distance (Aprox): <b>{`${item.distanceAprox / 1000} Km`}</b>
        </Typography>
        <Typography>Size: {item.size}</Typography>
        <Typography>
          Reward: <b>{numberToCurrency(item.reward)}</b>
        </Typography>
        <Typography>Urgency: {item.urgency}</Typography>
        <Typography color={item.status === "AVAILABLE" ? "success" : undefined}>
          Status: <b>{item.status}</b>
        </Typography>
        <Box mt={2}>{buttonsByStatus[item.status]}</Box>
      </Paper>
    </Grid2>
  );
}
