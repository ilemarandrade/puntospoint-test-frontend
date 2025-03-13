import getYtgAndYtg from './services';

export async function GET() {
  const data = await getYtgAndYtg();

  const response = { data, status: 200, message: 'Success' };

  return Response.json(JSON.stringify(response));
}
