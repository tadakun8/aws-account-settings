#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ServerAccessLogBucketStack } from "../lib/stacks/server-access-log-bucket-stack";
import { createResourceName } from "../lib/util/createResourceName";
import { RESOURCE_NAME } from "../constants";

const app = new cdk.App();

new ServerAccessLogBucketStack(app, "ServerAccessLogBucketStack", {
  stackName: createResourceName(
    "server-access-log-bucket",
    RESOURCE_NAME.STACK
  ),
});
