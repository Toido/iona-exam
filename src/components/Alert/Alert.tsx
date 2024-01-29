import { useCallback, useContext, useEffect } from 'react';
import AlertContext from 'src/contexts/AlertContext';
import { StyledAlert, StyledText } from './styles';
import { AlertContextType } from 'src/types/AlertTypes';

const AlertComponent = () => {
  const { alert, setAlert } = useContext(AlertContext) as AlertContextType;
  const delay = 5000; // time to show alert

  const handleCloseAlert = useCallback(() => {
    setAlert({ show: false, bodyMessage: '', variant: '' });
  }, [setAlert]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseAlert();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, handleCloseAlert]);

  return (
    <StyledAlert
      show={alert.show}
      variant={alert.variant}
      onClose={() => handleCloseAlert()}
      dismissible
    >
      <StyledText>{alert.bodyMessage}</StyledText>
    </StyledAlert>
  );
};

export default AlertComponent;
