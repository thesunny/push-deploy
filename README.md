# `push-deploy`

A simple script that allows us to deploy by catching up a branch (e.g. `production`) to the `main` branch and then pushing that branch.

Does several sanity checks to help prevent errors, increments version and tags the deploy

## Usage

Add a script to `package.json` of the project like:

```json
{
  "scripts": {
    "deploy:production": "yarn push-deploy main production"
  }
}
```

If you need to update environment variables, do that before calling the script. In this example, we presume there is a script named `set-env:production` which sets the environment variables on the production servers.

```json
{
  "scripts": {
    "deploy:production": "yarn set-env:production && yarn push-deploy main production"
  }
}
```

## Sanity Checking

It does a few things that help make life easier:

- Make sure that the current `git status` is clean
- Make sure that we are starting in the correct branch. If we are deploying from `main` to `production` but we are currently not on `main`, we will show an error.
- Make sure that there aren't any commits in the target branch that don't existin the source branch. In other words, we want this to be a fast forward deploy only.

## Version Management

- Increases version of src and target to next version
- Pushes it for safekeeping
- Also pushes tags for safekeeping
