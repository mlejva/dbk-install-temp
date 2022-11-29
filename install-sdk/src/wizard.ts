import path from 'path'
import fs from 'fs'
import util from 'util'
import { exec as nodeExec } from 'child_process'
const exec = util.promisify(nodeExec);

function printOut({ stdout, stderr }: { stdout: string, stderr: string }) {
  if (stderr) console.error(stderr)
  if (stdout) console.log(stdout)
}

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

  async clone(cloneURL: string) {
    await exec(`git clone ${cloneURL}`, { cwd: this.ctx.rootDir })
  }

  async checkout(branch: string) {
    // TODO: checkout to new branch
    await exec(`git checkout -b ${branch}`, { cwd: this.ctx.rootDir })
  }

  async commitAndPush(branch: string) {
    await exec('git add .', {cwd: this.ctx.rootDir})
    await exec('git commit -m "Add Tailwind"', {cwd: this.ctx.rootDir})
    await exec(`git push -u origin ${branch}`, {cwd: this.ctx.rootDir})
  }

  async createPullRequest(branch: string, title: string) {
    // TODO: Commit & push to remote
    await exec('git add .', {cwd: this.ctx.rootDir})
    await exec('git commit -m "Add Tailwind"', {cwd: this.ctx.rootDir})
    await exec(`git push -u origin ${branch}`, {cwd: this.ctx.rootDir})

    // TODO: run gh pr create --title "Pull request title"
    await exec(`gh pr create --title "${title}" --body "This PR installs Tailwind"`, {cwd: this.ctx.rootDir})
  }
}

class Cmd {
  constructor(
    private ctx: Context
  ){ }

  async run(cmd: string, ...args: string[]) {
    const fullCmd = `${cmd} ${args.join(' ')}`
    console.log(`\n>>> ${fullCmd}`)

    // const out = await exec(fullCmd, {
    //   cwd: this.ctx.rootDir,
    // })
    // printOut(out)
    await exec(fullCmd, {
      cwd: this.ctx.rootDir,
    })

    // execSync(`${cmd} ${args.join(' ')}`, { cwd: this.ctx.rootDir, stdio: 'inherit' })
  }
}

class Filesystem {
  constructor(
    private ctx: Context
  ){ }

  cd(path: string) {
    this.ctx.rootDir = path
  }

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

const ctx = new Context('/code')

const wizard = {
  repo: new Repo(ctx),
  cmd: new Cmd(ctx),
  filesystem: new Filesystem(ctx),
}

export default wizard
