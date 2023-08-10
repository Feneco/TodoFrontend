import {
  Alert,
  AlertColor,
  Snackbar,
} from "@mui/material";
import React from "react";

interface AppSnackBarProps {
  open: boolean;
  text: string;
  severity?: AlertColor;
  duration?: number;
  onClose?: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

function AppSnackBar({
  open,
  duration,
  onClose,
  text,
  severity,
}: AppSnackBarProps) {
  return (
    <Snackbar open={open} autoHideDuration={duration ?? 5000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackBar;
