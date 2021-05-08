import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import { BlockUnlessMfaPolicyConstruct } from "../constructs/iam/block-unless-mfa-policy";

export class IamStack extends cdk.Stack {
  public policy: iam.ManagedPolicy;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const blockUnlessMfaPolicyConstruct = new BlockUnlessMfaPolicyConstruct(this, "BlockUnlessMfaPolicyStack");

    const adminGroup = iam.Group.fromGroupArn(this, "AdminGroup", `arn:aws:iam::${props?.env?.account}:group/admin`);
    blockUnlessMfaPolicyConstruct.policy.attachToGroup(adminGroup);
  }
}
