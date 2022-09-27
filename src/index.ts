#!/usr/bin/env node
import { predeploy } from "./predeploy"
import { deploy } from "./deploy"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_0, _1, PRIMARY_BRANCH, DEPLOY_BRANCH] = process.argv

if (typeof PRIMARY_BRANCH !== "string") {
  throw new Error(`Expected first argument for PRIMARY_BRANCH to be defined`)
}

if (typeof DEPLOY_BRANCH !== "string") {
  throw new Error(`Expected second argument for DEPLOY_BRANCH to be defined`)
}

predeploy(PRIMARY_BRANCH, DEPLOY_BRANCH)
deploy(PRIMARY_BRANCH, DEPLOY_BRANCH)
