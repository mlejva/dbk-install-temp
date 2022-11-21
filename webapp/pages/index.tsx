import {
  useState,
} from 'react'
import InstallModal from '../components/InstallModal'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home() {
  const [isInstalling, setIsInstalling] = useState(false)
  const session = useSession()
  const supabase = useSupabaseClient()

  async function installTailwind(e: any) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth'
      }
    })

    console.log(data)


    console.error(error)
    // setIsInstalling(true)
  }

  function onModalClick(e: any) {
    e.stopPropagation()
  }

  return (
    <div className="h-full flex items-center justify-center">
      {isInstalling && (
        <InstallModal
          onOutsideModalClick={() => setIsInstalling(false)}
        />
      )}

      <button
        className="
          py-1
          px-2
          border
          rounded
          shadow
          transition-all
          hover:shadow-lg
          cursor-pointer
        "
        onClick={installTailwind}
      >
        Install Tailwind
      </button>
    </div>
  )
}
