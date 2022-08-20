import chalk from "chalk";
import { exec, exit } from "./util";

export function predeploy(primaryBranch: string, deployBranch: string) {
  console.log(
    chalk.greenBright(
      `\nPreparing to deploy to ${JSON.stringify(deployBranch)} branch`
    )
  );

  /**
   * Make sure we are on the primary brain
   */
  const gitBranch = exec("git branch --show-current").trim();

  if (gitBranch !== primaryBranch) {
    console.log(
      chalk.red(
        `ERROR: Must start on ${primaryBranch} branch but we are on ${gitBranch}`
      )
    );
    exit();
  }

  /**
   * Make sure git status is clean
   */
  const gitStatus = exec("git status --porcelain");

  if (gitStatus.length > 0) {
    console.log(
      chalk.red(
        `ERROR: ${primaryBranch} branch is not clean when running git status.\n`
      )
    );
    console.log(chalk.keyword("orange")(gitStatus));
    exit();
  }

  /**
   * Make sure there aren't any commits in production that aren't in main
   *
   * This command returns two numbers separated by a tab and ending with a
   * newline:
   *
   * `1\t0\n`
   *
   *
   */
  const [mainCommitCount, productionCommitCount] = exec(
    `git rev-list --left-right --count ${primaryBranch}...${deployBranch}`
  )
    .split("\t")
    .map((s) => parseInt(s));

  if (productionCommitCount > 0) {
    console.log(
      chalk.red(
        `ERROR: production branch has commits not in ${primaryBranch}. "git merge ${deployBranch}" into ${primaryBranch} before deploying.\n`
      )
    );
    console.log(
      chalk.keyword("orange")(
        `production branch is ${mainCommitCount} commits ahead of ${primaryBranch}`
      )
    );
    exit();
  }

  console.log(chalk.green(`\nPassed all predeploy checks`));
  console.log(
    chalk.green(
      `\n${primaryBranch} branch will be deploying ${mainCommitCount} commits to production`
    )
  );
}
