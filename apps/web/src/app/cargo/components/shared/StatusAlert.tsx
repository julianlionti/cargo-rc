import { Alert, AlertProps } from "@mui/material";
import { CargoStatus } from "@prisma/client";

const severityByStatus: Record<CargoStatus, AlertProps["severity"]> = {
  AVAILABLE: "success",
  CANCELLED: "error",
  DELIVERED: "success",
  IN_TRANSIT: "success",
  PENDING: "warning",
  PICKED_UP: "success",
};

interface StatusAlertProps {
  status: CargoStatus | null | undefined;
}

export default function StatusAlert({ status }: StatusAlertProps) {
  if (!status) return null;
  return <Alert severity={severityByStatus[status]}>{status}</Alert>;
}
