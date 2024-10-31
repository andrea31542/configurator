'use client';

import { AlertColor } from '@mui/material';
import React, { createContext, useCallback, useContext, useState } from 'react';
import SnackbarComponent from '../components/Snackbar/SnackbarComponent';

type SnackbarType = {
  title?: string;
  message?: string;
  duration?: number;
  color?: AlertColor;
};

type SnackbarContextType = SnackbarType & {
  setTitle: (title: string | undefined) => void;
  setMessage: (message: string) => void;
  setDuration: (duration: number | undefined) => void;
  setOpen: (isOpen: boolean) => void;
  setColor: (color: AlertColor) => void;
  open: boolean;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  title: '',
  message: '',
  duration: 6000,
  open: false,
  color: undefined,
  setMessage: () => {},
  setDuration: () => {},
  setOpen: () => {},
  setColor: () => {},
  setTitle: () => {},
});

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [duration, setDuration] = useState<number | undefined>(6000);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<AlertColor>('warning');

  return (
    <SnackbarContext.Provider
      value={{
        title,
        message,
        duration,
        open,
        setMessage,
        setDuration,
        setOpen,
        color,
        setColor,
        setTitle,
      }}
    >
      {children}
      <SnackbarComponent />
    </SnackbarContext.Provider>
  );
};
const useSnackbar = () => {
  const snackbarContext = useContext(SnackbarContext);

  const createSnackbar = useCallback(
    (snackbarProps: SnackbarType) => {
      const { message = '', duration = 6000, color, title } = snackbarProps;
      const { setTitle, setMessage, setDuration, setOpen, setColor } =
        snackbarContext;
      setTitle(title);
      setMessage(message);
      setDuration(duration);
      setOpen(true);
      setColor(color ?? 'warning');
      setTimeout(() => {
        setOpen(false);
      }, duration);
    },
    [snackbarContext]
  );

  return [createSnackbar];
};

export default useSnackbar;
