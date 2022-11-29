import {
  useEffect,
} from 'react'

function Auth() {
  useEffect(function sendAccessToken() {
    if (window.opener == null) {
      window.location.assign('/')
    }
    const accessToken = new URL(window.location.toString()).searchParams.get('access_token')
    const setupAction = new URL(window.location.toString()).searchParams.get('setup_action')
    window.opener.postMessage({ accessToken, setupAction });
    window.close();
  }, [])
  return (
    <div>Hello</div>
  )
}

export default Auth