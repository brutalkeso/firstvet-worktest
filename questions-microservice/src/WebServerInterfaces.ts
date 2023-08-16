export interface ServerRequest {
  headers: {[key: string]: string};
  body: unknown;
}

export interface ServerResponse {
  status(code: number): ServerResponse;
  send(value?: unknown): ServerResponse;
}
