import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as AwsAccountSettings from "../lib/stacks/server-access-log-bucket-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsAccountSettings.AwsAccountSettingsStack(
    app,
    "MyTestStack"
  );
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
