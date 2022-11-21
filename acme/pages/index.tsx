import {
  useState,
} from 'react'

export default function Home() {
  const [isInstalling, setIsInstalling] = useState(false)

  function installTailwind(e: any) {
    setIsInstalling(true)
  }

  function onModalClick(e: any) {
    e.stopPropagation()
  }

  return (
    <div className="
      h-full
      flex
      flex-col
      items-center
      justify-center
    ">
      <iframe
        className="bg-red-500"
        src="http://localhost:3000"
      />
    </div>
  )
}
