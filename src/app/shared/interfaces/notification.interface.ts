export interface CalculateType {
  important: number;
  error: number;
  warning: number;
  success: number;
  information: number;
}
export interface MessageList {
  dara: Messages[];
  Obs: Messages[];
  most: Type;
}

export interface Messages {
  icon: string;
  title: string;
  subTitle: string;
  time: string;
  type: Type;
  saw: boolean;
}

export enum Type {
  IMPORTANT_ERROR = 0,
  ERROR = 1,
  WARNING = 2,
  SUCCESS = 3,
  INFORMATION = 4,
  NUN = 5,
}

export interface ReadObjectMessage {
  index: number;
  isDara: boolean;
}

export interface Notification {
  title: string;
  subtitle: string;
  icon: string;
  state: string;
  stateNumber: string;
  show: boolean;
}
