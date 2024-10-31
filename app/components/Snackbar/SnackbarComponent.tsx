import { Alert, AlertTitle, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { SnackbarContext } from '@/app/hooks/useSnackbar';

const SnackbarComponent = () => {
  const { title, message, duration, open, setOpen, color } =
    useContext(SnackbarContext);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      action={action}
    >
      <Alert
        icon={false}
        onClose={handleClose}
        color={color}
        variant='standard'
        sx={{ width: 'auto' }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message && <div>{message}</div>}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
