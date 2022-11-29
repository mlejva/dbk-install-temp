import path from 'path'
import wizard from '../wizard'

const branchName = 'devbook-install-tailwind'

export async function run(cloneURL: string, accessToken: string, repoURL: string) {
  await wizard.repo.clone(cloneURL)
  const base = path.basename(cloneURL).split('.git')[0]
  wizard.filesystem.cd(`/code/${base}`)
  await wizard.repo.checkout(branchName)

  await wizard.cmd.run('yarn', 'add', '--dev', 'tailwindcss', 'postcss', 'autoprefixer')
  await wizard.cmd.run('npx', 'tailwindcss', 'init', '-p')

  await wizard.filesystem.write('tailwind.config.js', `
  /** @type {import('tailwindcss').Config} */
  module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
     extend: {},
   },
   plugins: [],
  }
  `)

  await wizard.filesystem.prepend('src/index.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

`)

//await wizard.repo.commitAndPush(branchName)

// curl \
// -X POST \
// -H "Accept: application/vnd.github+json" \
// -H "Authorization: Bearer <YOUR-TOKEN>" \
// https://api.github.com/repos/OWNER/REPO/pulls \
// -d '{"title":"Amazing new feature","body":"Please pull these awesome changes in!","head":"octocat:new-feature","base":"master"}'
  await wizard.cmd.run(
    'curl',
    '-X', 'POST',
    '-H', '"Accept: application/vnd.github+json"',
    '-H', `"Authorization: Bearer ${accessToken}"`,
    // 'https://api.github.com/repos/OWNER/REPO/pulls',
    // 'https://api.github.com/repos/mlejva/my-react-app''
    `'${repoURL}/pulls'`,
    '-d', `'{"title":"Install Tailwind [Devbook]","body":"This PR installs Tailwind","head":"devbook-for-github:${branchName}","base":"master"}'`
  )
  // await wizard.repo.createPullRequest(branchName, 'Install Tailwind')
}

const [cloneURL, accessToken, url] = process.argv.slice(2)
run(cloneURL, accessToken, url)
.then(() => {
  console.log('=== DONE ===')
})
.catch(err => {
  console.error('ERROR!')
  console.error(err)
})

