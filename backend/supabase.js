const { createServerClient, parseCookieHeader, serializeCookieHeader } = require('@supabase/ssr')
require('dotenv').config();

exports.createClient = (context) => {
  return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(context.req.headers.cookie ?? '')
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          const cookieOptions = {
            ...options,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
            path: '/'
          }
          context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, cookieOptions))
        })
      },
    },
  })
}