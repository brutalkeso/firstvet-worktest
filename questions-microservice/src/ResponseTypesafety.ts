import {ServerResponse} from './WebServerInterfaces';

/* Not the cleanest of solutions, but i thought it was an easy way to "force" a path to
 * always only send one response. You would have to duplicate the string value in the code to
 * use it incorrectly, or entirely sidestep the usage in index.ts.
 */
export type PathEnd = '911ab22f-50ed-48b5-b813-294d20abcc07';
const PathEndConst = '911ab22f-50ed-48b5-b813-294d20abcc07';

export function sendSuccess<T>(
  response: T,
  res: ServerResponse
): Promise<PathEnd> {
  res.status(200).send(response);
  return Promise.resolve(PathEndConst);
}
