import queryString from 'query-string';
import getMovements from './services';

export async function GET(request: Request) {
  const urlSplitByParams = request.url.split('?');
  const paramsUrl =
    urlSplitByParams?.length > 1 ? urlSplitByParams[1] : undefined;

  const paramsParsed = paramsUrl ? queryString.parse(paramsUrl) : {};

  // TODO: add schema validation
  const service = await getMovements(paramsParsed as any);

  const response = { data: service, status: 200, message: 'Success' };

  return Response.json(JSON.stringify(response));
}
