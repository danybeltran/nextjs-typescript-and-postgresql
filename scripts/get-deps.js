const { dependencies, devDependencies } = require('../package.json')
const fs = require('fs')
const path = require('path')

const versions = {}
const versionsDev = {}

// Dynamically check if Bun is used
const isBun = fs.existsSync(path.join(__dirname, '../bun.lock'))

console.log('------- DEPENDENCIES -------')
const installDeps =
  (isBun ? 'bun add ' : 'npm install ') +
  Object.keys(dependencies)
    .map(dep => {
      console.log(dep + ` : (${dependencies[dep]})`)
      versions[dep] = dependencies[dep]
      return dep
    })
    .join('@latest ') +
  '@latest' + (isBun ? '' : ' -f')

console.log('\n------- DEV DEPENDENCIES -------')

const installDevDeps =
  (isBun ? 'bun add -d ' : 'npm install -D ') +
  Object.keys(devDependencies)
    .map(dep => {
      console.log(dep + ` : (${devDependencies[dep]})`)
      versionsDev[dep] = devDependencies[dep]
      return dep
    })
    .join('@latest ') +
  '@latest' + (isBun ? '' : ' -f')

fs.writeFile(
  path.join(__dirname, './installdeps.sh'),
  `${installDeps} && ${installDevDeps}`,
  () => {}
)
