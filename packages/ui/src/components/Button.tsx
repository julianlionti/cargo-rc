import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <MuiButton variant="contained" color="primary">
      {children}
    </MuiButton>
  );
}
