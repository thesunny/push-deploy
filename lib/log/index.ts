import chalk from "chalk"

export function log(...args: unknown[]) {
  console.log(chalk.green(...args))
}
