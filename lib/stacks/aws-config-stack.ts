import * as cdk from "@aws-cdk/core";
import * as aws_config from "@aws-cdk/aws-config";
import * as iam from "@aws-cdk/aws-iam";
import * as s3 from "@aws-cdk/aws-s3";

import { BucketConstruct } from "../constructs/s3/bucket";
import { createResourceName } from "../util/createResourceName";
import { RESOURCE_NAME } from "../../constants";
import { CONFIG_RULES } from "../constructs/aws-config/config-rule/const";

interface AwsConfigStackProps extends cdk.StackProps {
  serverAccessLogBucket: s3.IBucket;
}

export class AwsConfigStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AwsConfigStackProps) {
    super(scope, id, props);

    const bucketConstruct = new BucketConstruct(this, "ConfigBucket", {
      bucketName: createResourceName("aws-config", RESOURCE_NAME.BUCKET),
      serverAccessLogBucket: props.serverAccessLogBucket
    });

    const putPolicyStatement = new iam.PolicyStatement({
      actions: ["s3:PutObject"],
      principals: [new iam.ServicePrincipal("config.amazonaws.com")],
      resources: [`${bucketConstruct.bucket.bucketArn}/*`],
      conditions: { StringEquals: { "s3:x-amz-acl": "bucket-owner-full-control" } }
    });
    bucketConstruct.bucket.addToResourcePolicy(putPolicyStatement);

    const aclPolicyStatement = new iam.PolicyStatement({
      actions: ["s3:GetBucketAcl"],
      principals: [new iam.ServicePrincipal("config.amazonaws.com")],
      resources: [bucketConstruct.bucket.bucketArn]
    });
    bucketConstruct.bucket.addToResourcePolicy(aclPolicyStatement);

    new aws_config.CfnDeliveryChannel(this, "CfnDeliveryChannel", {
      s3BucketName: bucketConstruct.bucket.bucketName
    });

    const awsConfigRole = new iam.Role(this, "RoleAwsConfig", {
      assumedBy: new iam.ServicePrincipal("config.amazonaws.com"),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSConfigRole")]
    });

    const configurationRecorder = new aws_config.CfnConfigurationRecorder(this, "CfnConfigurationRecorder", {
      name: "default",
      roleArn: awsConfigRole.roleArn,
      recordingGroup: {
        allSupported: true,
        includeGlobalResourceTypes: true
      }
    });
    configurationRecorder.node.addDependency(bucketConstruct);

    CONFIG_RULES.forEach(configRule => {
      new aws_config.ManagedRule(this, `${configRule.configRuleName}`, {
        configRuleName: configRule.configRuleName,
        identifier: configRule.identifier,
        inputParameters: configRule.inputParameters,
        maximumExecutionFrequency: configRule.maximumExecutionFrequency
      });
    });
  }
}
