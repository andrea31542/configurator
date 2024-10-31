'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import SnackbarComponent from '../components/SnackbarComponent';

type SnackbarType = {
  title?: string;
  message?: string;
};

type SnackbarContextType = SnackbarType & {
  setTitle: (title: string | undefined) => void;
  setMessage: (message: string) => void;
  setOpen: (isOpen: boolean) => void;
  open: boolean;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  title: '',
  message: '',
  open: false,
  setMessage: () => {},
  setOpen: () => {},
  setTitle: () => {},
});

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [open, setOpen] = useState(false);

  return (
    <SnackbarContext.Provider
      value={{
        title,
        message,
        open,
        setMessage,
        setOpen,
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
      const { message = '', title } = snackbarProps;
      const { setTitle, setMessage, setOpen } = snackbarContext;
      setTitle(title);
      setMessage(message);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 10000);
    },
    [snackbarContext]
  );

  return [createSnackbar];
};

export default useSnackbar;
