import * as cdk from "@aws-cdk/core";
import * as cloudtrail from "@aws-cdk/aws-cloudtrail";
import * as s3 from "@aws-cdk/aws-s3";

interface CloudTrailConstructProps {
  trailName: string;
  bucket: s3.IBucket;
}

export class CloudTrailConstruct extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: CloudTrailConstructProps
  ) {
    super(scope, id);

    new cloudtrail.Trail(this, "CloudTrail", {
      trailName: props.trailName,
      bucket: props.bucket,
    });
  }
}
