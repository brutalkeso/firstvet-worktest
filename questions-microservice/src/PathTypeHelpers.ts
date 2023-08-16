import {Express} from 'express';
import {ServerRequest, ServerResponse} from './WebServerInterfaces';
import {PathEnd} from './ResponseTypesafety';

export const setGet = (
  app: Express,
  path: string,
  postFunc: (req: ServerRequest, res: ServerResponse) => Promise<PathEnd>
) => {
  app.get(path, (req, res) => {
    return postFunc(req as ServerRequest, res as ServerResponse);
  });
};
