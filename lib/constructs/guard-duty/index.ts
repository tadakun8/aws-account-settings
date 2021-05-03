import * as cdk from "@aws-cdk/core";
import * as guardduty from "@aws-cdk/aws-guardduty";

// interface GuardDutyConstructProps {
//   trailName: string;
//   bucket: s3.IBucket;
// }

export class GuardDutyConstruct extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    new guardduty.CfnDetector(this, "GuardDutyDetector", {
      enable: true,
    });
  }
}
