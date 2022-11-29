// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import url from 'url'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.url) {
    res.writeHead(400, { 'Content-Type': 'text/html' })
    res.end('No request URL')
    return
  }

  const { code }: { code?: string } = url.parse(req.url, true).query
  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/html' })
    res.end('No code param in query')
    return
  }

  const exchangeURL = new URL('login/oauth/access_token', 'https://github.com');
  exchangeURL.searchParams.set('client_id', process.env.GH_CLIENT_ID!);
  exchangeURL.searchParams.set('client_secret', process.env.GH_CLIENT_SECRET!);
  exchangeURL.searchParams.set('code', code);

  const response = await fetch(exchangeURL.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  })
  const {
    access_token,
  }: {
    access_token: string,
  } = await response.json()

  const redirectionURL = new URL('auth', 'http://localhost:3000')
  redirectionURL.searchParams.set('access_token', access_token)

  res.writeHead(302, { 'Location': redirectionURL.toString() })
  res.end()
}