import * as aws_config from "@aws-cdk/aws-config";

interface ConfigRule {
  configRuleName: string;
  identifier: string;
  inputParameters?: { [key: string]: unknown };
  maximumExecutionFrequency?: aws_config.MaximumExecutionFrequency;
}

export const CONFIG_RULES: ConfigRule[] = [
  {
    configRuleName: "access-key-rotated",
    identifier: aws_config.ManagedRuleIdentifiers.ACCESS_KEYS_ROTATED,
    inputParameters: { maxAccessKeyAge: 90 },
    maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  }
  // {
  //   configRuleName: "cloudformation-stack-drift-detection-check",
  //   identifier: aws_config.ManagedRuleIdentifiers.CLOUDFORMATION_STACK_DRIFT_DETECTION_CHECK,
  //   inputParameters: { cloudformationRoleArn: role.roleArn }
  // },
  // {
  //   configRuleName: "cloudformation-stack-notification-check",
  //   identifier: aws_config.ManagedRuleIdentifiers.CLOUDFORMATION_STACK_NOTIFICATION_CHECK,
  //   inputParameters: { snsTopic1: snsTopic.arn }
  // },
  // {
  //   configRuleName: "cloud-trail-enabled",
  //   identifier: aws_config.ManagedRuleIdentifiers.CLOUD_TRAIL_ENABLED,
  //   maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  // }
  // {
  //   configRuleName: "cloud-trail-encryption-enabled",
  //   identifier: aws_config.ManagedRuleIdentifiers.CLOUD_TRAIL_ENCRYPTION_ENABLED,
  //   maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  // },
  // {
  //   configRuleName: "cmk-backing-key-rotation-enabled",
  //   identifier: aws_config.ManagedRuleIdentifiers.CMK_BACKING_KEY_ROTATION_ENABLED,
  //   maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  // },
  // {
  //   configRuleName: "guardduty-enabled-centralized",
  //   identifier: aws_config.ManagedRuleIdentifiers.GUARDDUTY_ENABLED_CENTRALIZED,
  //   maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  // }
  // {
  //   configRuleName: "guardduty-non-archived-findings",
  //   identifier: aws_config.ManagedRuleIdentifiers.GUARDDUTY_NON_ARCHIVED_FINDINGS,
  //   maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  // },
  // {
  //   configRuleName: "iam-group-has-users-check",
  //   identifier: aws_config.ManagedRuleIdentifiers.IAM_GROUP_HAS_USERS_CHECK
  // },
  // {
  //   configRuleName: "root-account-mfa-enabled",
  //   identifier: aws_config.ManagedRuleIdentifiers.ROOT_ACCOUNT_MFA_ENABLED,
  //   maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  // },
  // {
  //   configRuleName: "restricted-ssh",
  //   identifier: aws_config.ManagedRuleIdentifiers.EC2_SECURITY_GROUPS_INCOMING_SSH_DISABLED
  // },
  // {
  //   configRuleName: "restricted-common-ports",
  //   identifier: aws_config.ManagedRuleIdentifiers.EC2_SECURITY_GROUPS_RESTRICTED_INCOMING_TRAFFIC
  // },
  // {
  //   configRuleName: "multi-region-cloudtrail-enabled",
  //   identifier: aws_config.ManagedRuleIdentifiers.CLOUDTRAIL_MULTI_REGION_ENABLED,
  //   maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  // },
  // {
  //   configRuleName: "kms-cmk-not-scheduled-for-deletion",
  //   identifier: aws_config.ManagedRuleIdentifiers.KMS_CMK_NOT_SCHEDULED_FOR_DELETION
  // },
  // {
  //   configRuleName: "iam-user-unused-credentials-check",
  //   identifier: aws_config.ManagedRuleIdentifiers.IAM_USER_UNUSED_CREDENTIALS_CHECK,
  //   inputParameters: { maxCredentialUsageAge: 90 },
  //   maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS
  // }
];
