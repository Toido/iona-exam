export interface IAlertContext {
  bodyMessage: string;
  variant?: string;
  show: boolean;
}

export type AlertContextType = {
  alert: IAlertContext;
  setAlert: (alert: IAlertContext) => void;
};
