import { createContext } from 'react';
import { AlertContextType } from 'src/types/AlertTypes';

const AlertContext = createContext<AlertContextType>({
  alert: {
    bodyMessage: '',
    show: false,
  },
  setAlert: () => {},
});

export default AlertContext;
