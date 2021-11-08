import { predeploy } from "./predeploy"
import { deploy } from "./deploy"

const [_0, _1, PRIMARY_BRANCH, DEPLOY_BRANCH] = process.argv

predeploy(PRIMARY_BRANCH, DEPLOY_BRANCH)
deploy(PRIMARY_BRANCH, DEPLOY_BRANCH)
