export type HttpError = {
  errors?: Error[];
  httpCode: number;
  message: string;
  name: string;
};

type Error = {
  property: string;
  constraints: Record<string, string>;
};
