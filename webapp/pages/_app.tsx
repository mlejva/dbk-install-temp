// import {
//   useState
// } from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function App({ Component, pageProps }: AppProps) {
  // const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
      <Component {...pageProps} />
    // <SessionContextProvider
    //   supabaseClient={supabase}
    //   initialSession={pageProps.initialSession}
    // >
    // </SessionContextProvider>
  )
}
