import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import { createResourceName } from "../../util/createResourceName";
import { RESOURCE_NAME } from "../../../constants";

export class BlockUnlessMfaPolicyConstruct extends cdk.Construct {
  public policy: iam.ManagedPolicy;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const allowListActionsStatement = new iam.PolicyStatement({
      sid: "AllowListActions",
      actions: ["iam:ListUsers", "iam:ListVirtualMFADevices"],
      resources: ["*"]
    });

    const allowIndividualUserToListOnlyTheirOwnMFAStatement = new iam.PolicyStatement({
      sid: "AllowIndividualUserToListOnlyTheirOwnMFA",
      actions: ["iam:ListMFADevices"],
      resources: ["arn:aws:iam::*:mfa/*", "arn:aws:iam::*:user/${aws:username}"]
    });

    const allowIndividualUserToManageTheirOwnMFAStatement = new iam.PolicyStatement({
      sid: "AllowIndividualUserToManageTheirOwnMFA",
      actions: [
        "iam:CreateVirtualMFADevice",
        "iam:DeleteVirtualMFADevice",
        "iam:EnableMFADevice",
        "iam:ResyncMFADevice"
      ],
      resources: ["arn:aws:iam::*:mfa/${aws:username}", "arn:aws:iam::*:user/${aws:username}"]
    });

    const allowIndividualUserToDeactivateOnlyTheirOwnMFAOnlyWhenUsingMFAStatement = new iam.PolicyStatement({
      sid: "allowIndividualUserToDeactivateOnlyTheirOwnMFAOnlyWhenUsingMFAStatement",
      actions: ["iam:DeactivateMFADevice"],
      resources: ["arn:aws:iam::*:mfa/${aws:username}", "arn:aws:iam::*:user/${aws:username}"],
      conditions: {
        Bool: {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    });

    const allowChangePasswordStatement = new iam.PolicyStatement({
      sid: "AllowChangePassword",
      actions: ["iam:ChangePassword"],
      resources: ["arn:aws:iam::*:user/${aws:username}"]
    });

    const allowGetSessionToken = new iam.PolicyStatement({
      sid: "AllowGetSessionToken",
      actions: ["sts:GetSessionToken"],
      resources: ["*"]
    });

    const blockMostAccessUnlessSignedInWithMFAStatement = new iam.PolicyStatement({
      sid: "BlockMostAccessUnlessSignedInWithMFA",
      effect: iam.Effect.DENY,
      notActions: [
        "iam:CreateVirtualMFADevice",
        "iam:EnableMFADevice",
        "iam:ListMFADevices",
        "iam:ListUsers",
        "iam:ListVirtualMFADevices",
        "iam:ResyncMFADevice",
        "iam:ChangePassword"
      ],
      resources: ["*"],
      conditions: {
        BoolIfExists: {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    });

    this.policy = new iam.ManagedPolicy(this, "BlockUnlessMfaPolicy", {
      managedPolicyName: createResourceName("block-unless-mfa-policy", RESOURCE_NAME.POLICY),
      statements: [
        allowListActionsStatement,
        allowIndividualUserToListOnlyTheirOwnMFAStatement,
        allowIndividualUserToManageTheirOwnMFAStatement,
        allowIndividualUserToDeactivateOnlyTheirOwnMFAOnlyWhenUsingMFAStatement,
        blockMostAccessUnlessSignedInWithMFAStatement,
        allowChangePasswordStatement,
        allowGetSessionToken
      ]
    });
  }
}
