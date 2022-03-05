export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

export interface IInputForm {
  value: string;
  dueDate?: Date | null;
}

export type DelayedChangeCallback = (value: string) => void;
