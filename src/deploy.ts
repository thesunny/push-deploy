import chalk from "chalk";
import { exec } from "./util";

/**
 * Start the deploy process
 */
export function deploy(PRIMARY_BRANCH: string, DEPLOY_BRANCH: string) {
  /**
   * This command increments the version in package.json and also adds does a
   * git tag with the version number and also commits the change
   */
  console.log(chalk.green(`\nIncrease version number and git tag version`));
  console.log(exec(`yarn version --patch`));

  /**
   * Push so that github has the deploy
   */
  console.log(
    chalk.green(`\ngit push ${PRIMARY_BRANCH} to remote for safe keeping`)
  );
  console.log(exec(`git push`));

  /**
   * Push the tags which doesn't happen with a normal git push.
   */
  console.log(
    chalk.green(`\ngit push ${PRIMARY_BRANCH} tags to remote for safe keeping`)
  );
  console.log(exec(`git push --tags`));

  /**
   * Switch to the deploy branch so we can merge
   */
  console.log(
    chalk.green(
      `\nSwitch to ${DEPLOY_BRANCH} branch so we can merge ${JSON.stringify(
        PRIMARY_BRANCH
      )} branch`
    )
  );
  exec(`git checkout ${DEPLOY_BRANCH}`);

  /**
   * Merge all the changes from main. Remember that the predeploy makes sure
   * there are no changes in production that aren't in main so we should have
   * a clean merge.
   */
  console.log(
    chalk.green(
      `\nMerge ${JSON.stringify(PRIMARY_BRANCH)} branch into ${JSON.stringify(
        DEPLOY_BRANCH
      )}`
    )
  );
  exec(`git merge ${PRIMARY_BRANCH}`);

  /**
   * Push the deploy branch which will start the deploy
   */
  console.log(
    chalk.green(
      `\nPush ${JSON.stringify(DEPLOY_BRANCH)} branch to initiate deploy`
    )
  );
  exec(`git push`);

  /**
   * Once we're done, we want to switch back to the primary (main or master)
   * branch.
   */
  console.log(
    chalk.green(`\nSwitch back to ${JSON.stringify(PRIMARY_BRANCH)} branch`)
  );
  exec(`git checkout ${PRIMARY_BRANCH}`);

  console.log(chalk.green(`\n`));
}
