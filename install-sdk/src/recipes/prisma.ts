export {}
//// import wizard from '@devbookhq/install'
//import wizard from '../wizard'
//
//// Maybe once our installation recipes ecosystem gets adopted we can have submodule for popular tools. Like:
//// wizard.use('prisma')
//// wizard.use('nextjs')
//// wizard.prisma.init()
//// const userDB = wizard.prisma.datasource.provider
//
//// This script runs in our Devbook microVMs.
//
//// User picked a repo.
//
//await wizard.repo.pull()
//
//await wizard.cmd.run('npm', 'install', 'prisma', '--save-dev')
//await wizard.cmd.run('npx', 'prisma', 'init', '--datasource-provider', wizard.vars.database)
//
//// In the future, wizard will have a dedicated pkg module. No need to worry if the project uses npm/yarn/whatever
//// wizard.pkg.install('prisma', { dev: true })
//
//await wizard.filesystem.write('.env', `
//DATABASE_URL="${wizard.vars.databaseURL}"
//`)
//
//
//if (wizard.choice.shouldUseDefaultSchema) {
  //await wizard.filesystem.write('prisma/schema.prisma', `
//datasource db {
  //provider = "postgresql"
  //url      = env("DATABASE_URL")
//}
//model Post {
  //id        Int      @id @default(autoincrement())
  //createdAt DateTime @default(now())
  //updatedAt DateTime @updatedAt
  //title     String   @db.VarChar(255)
  //content   String?
  //published Boolean  @default(false)
  //author    User     @relation(fields: [authorId], references: [id])
  //authorId  Int
//}
//
//model Profile {
  //id     Int     @id @default(autoincrement())
  //bio    String?
  //user   User    @relation(fields: [userId], references: [id])
  //userId Int     @unique
//}
//
//model User {
  //id      Int      @id @default(autoincrement())
  //email   String   @unique
  //name    String?
  //posts   Post[]
  //profile Profile?
//}
//`)
//} else {
  //await wizard.filesystem.write('prisma/schema.prisma', `
//datasource db {
  //provider = "postgresql"
  //url      = env("DATABASE_URL")
//}
//`)
  //await wizard.cmd.run('npx', 'prisma', 'db', 'pull')
//}
//
//
//await wizard.cmd.run('npm', 'install', '@prisma/client')
//
//