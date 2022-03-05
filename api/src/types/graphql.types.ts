export interface IUser {
  fullName: { first: string; last: string };
  email?: string;
  token: IToken;
}

export interface IToken {
  value: string;
  expire: Date;
}

export interface ICollection {
  id: string;
  name: string;
  tasks: ITask[];
  updatedAt: Date;
  totalTasks: number;
  completedTasks: number;
}

export interface ITask {
  id: string;
  name: string;
  isDone: boolean;
  dueDate: Date | null;
  collection?: string;
}

export interface IImage {
  url: string;
  alt: string;
  sourceUrl: string;
  creatorName: string;
  creatorUrl: string;
}

export interface IHSLColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface IColors {
  textColor: IHSLColor;
  primaryColor: IHSLColor;
  successColor: IHSLColor;
  warningColor: IHSLColor;
  dangerColor: IHSLColor;
  bgColor: IHSLColor;
  cardBgColor: IHSLColor;
  bgOpacity: number;
  blur: number;
}

export interface IConfig {
  bgImage: IImage;
  colors: IColors;
}

export interface IConfigInput {
  bgImage: IImage | null;
  colors: IColors | null;
}
