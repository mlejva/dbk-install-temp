import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

class Context {
  constructor(
    public rootDir: string
  ) { }
}

class Repo {
  constructor(
    private ctx: Context
  ){ }

  pull(repo: string) {
  }

  checkout(branch: string) {
    // TODO: checkout to new branch
    execSync(`git checkout -b ${branch}`, { cwd: this.ctx.rootDir })
  }

  createPullRequest(branch: string, title: string) {
    // TODO: Commit & push to remote
    execSync('git add .', {cwd: this.ctx.rootDir})
    execSync('git commit -m "Add Tailwind"', {cwd: this.ctx.rootDir})
    execSync(`git push -u origin ${branch}`, {cwd: this.ctx.rootDir})


    // TODO: run gh pr create --title "Pull request title"
    execSync(`gh pr create --title "${title}" --body "This PR installs Tailwind"`, {cwd: this.ctx.rootDir})
  }
}

class Cmd {
  constructor(
    private ctx: Context
  ){ }

  run(cmd: string, ...args: string[]) {
    execSync(`${cmd} ${args.join(' ')}`, { cwd: this.ctx.rootDir })
  }
}

class Filesystem {
  constructor(
    private ctx: Context
  ){ }

  write(filepath: string, content: string) {
    const p = path.join(this.ctx.rootDir, filepath)
    fs.writeFileSync(p, content, { encoding: 'utf8', flag: 'w' })
  }

  prepend(filepath: string, content: string) {
    const p = path.join(this.ctx.rootDir, filepath)

    const data = fs.readFileSync(p)
    const fd = fs.openSync(p, 'w+')
    const insert = Buffer.from(content)
    fs.writeSync(fd, insert, 0, insert.length, 0)
    fs.writeSync(fd, data, 0, data.length, insert.length)
    fs.close(fd, (err) => {
      if (err) throw err;
    })
  }
}

const ctx = new Context('/Users/vasekmlejnsky/Developer/testing-nextjs-app')

const wizard = {
  repo: new Repo(ctx),
  cmd: new Cmd(ctx),
  filesystem: new Filesystem(ctx),
}

export default wizard
