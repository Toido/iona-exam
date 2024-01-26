import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { AlertContextType } from 'src/@types/AlertTypes';
import AlertContext from 'src/contexts/AlertContext';

const AlertComponent = () => {
  const { alert, setAlert } = useContext(AlertContext) as AlertContextType;

  const handleCloseAlert = () => {
    setAlert({ show: false, bodyMessage: '', variant: '' });
  };

  return (
    <Alert
      show={alert.show}
      variant={alert.variant}
      onClose={() => handleCloseAlert()}
      dismissible
    >
      {alert.bodyMessage}
    </Alert>
  );
};

export default AlertComponent;
