import * as cdk from "@aws-cdk/core";
import { GuardDutyConstruct } from "../constructs/guard-duty";

export class GuardDutyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new GuardDutyConstruct(this, "GuardDutyConstruct");
  }
}
