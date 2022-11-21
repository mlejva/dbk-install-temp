import wizard from '../wizard'

export async function run() {
  await wizard.repo.pull('mlejva/testing-nextjs-app')
  await wizard.repo.checkout('tailwind')

  await wizard.cmd.run('npm', 'install', '-D', 'tailwindcss', 'postcss', 'autoprefixer')
  await wizard.cmd.run('npx', 'tailwindcss', 'init', '-p')

  await wizard.filesystem.write('tailwind.config.js', `
  /** @type {import('tailwindcss').Config} */
  module.exports = {
   content: [
     "./app/**/*.{js,ts,jsx,tsx}",
     "./pages/**/*.{js,ts,jsx,tsx}",
     "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
     extend: {},
   },
   plugins: [],
  }
  `)

  await wizard.filesystem.prepend('styles/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

`)


  await wizard.repo.createPullRequest('tailwind', 'Install Tailwind')
}
