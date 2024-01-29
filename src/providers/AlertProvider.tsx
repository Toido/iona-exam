import { useState } from 'react';
import { IAlertContext } from 'src/types/AlertTypes';
import AlertContext from 'src/contexts/AlertContext';

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<IAlertContext>({
    bodyMessage: '',
    show: false,
  });

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
