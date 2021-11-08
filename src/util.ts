import { execSync as childProcessExecSync } from "child_process"

/**
 * Shortcut to synchronously execute on the command line and return the value
 * as a utf8 which has its return value trimmed.
 *
 * We trim it for these reasons:
 *
 * - Consistent when we console.log on how spacing appears around
 * - Not having to trim when we are parse (e.g. in git rev-list)
 */
export function exec(cmd: string) {
  return childProcessExecSync(cmd, { encoding: "utf8" }).trim()
}

/**
 * Add a blank line to make output cleaner.
 *
 * NOTE:
 *
 * We elect to exit with `process.exit(1)` which displays an ugly error
 * in order to communicate that the code has exited in a state we don't want.
 *
 * Even though we show the error messages, the ugliness of the different colors
 * is a nice visual indicator that we need to pay attention.
 */
export function exit() {
  console.log("")
  process.exit(1)
}
