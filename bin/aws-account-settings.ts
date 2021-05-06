#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ServerAccessLogBucketStack } from "../lib/stacks/server-access-log-bucket-stack";
import { createResourceName } from "../lib/util/createResourceName";
import { RESOURCE_NAME } from "../constants";
import { CloudTrailStack } from "../lib/stacks/cloudtrail-stack";
import { GuardDutyStack } from "../lib/stacks/guardduty-stack";
import { IamStack } from "../lib/stacks/ima-stack";

const app = new cdk.App();

const serverAccessLogBucketStack = new ServerAccessLogBucketStack(app, "ServerAccessLogBucketStack", {
  stackName: createResourceName("server-access-log-bucket", RESOURCE_NAME.STACK)
});

new CloudTrailStack(app, "CloudTrailStack", {
  stackName: createResourceName("cloudtrail", RESOURCE_NAME.STACK),
  serverAccessLogBucket: serverAccessLogBucketStack.bucket
});

new GuardDutyStack(app, "GuardDutyStack", {
  stackName: createResourceName("guardduty", RESOURCE_NAME.STACK)
});

new IamStack(app, "IamStack", {
  stackName: createResourceName("iam", RESOURCE_NAME.STACK)
});
