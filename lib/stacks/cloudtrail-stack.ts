import * as cdk from "@aws-cdk/core";
import { RESOURCE_NAME } from "../../constants";
import { createResourceName } from "../util/createResourceName";
import * as s3 from "@aws-cdk/aws-s3";
import { BucketConstruct } from "../constructs/s3/bucket";
import { CloudTrailConstruct } from "../constructs/cloudtrail";

interface CloudTrailStackProps extends cdk.StackProps {
  serverAccessLogBucket: s3.IBucket;
}

export class CloudTrailStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CloudTrailStackProps) {
    super(scope, id, props);

    const bucketName = createResourceName("cloudtrail", RESOURCE_NAME.BUCKET);
    const trailName = createResourceName("cloudtrail", RESOURCE_NAME.TRAIL);

    const bucketConstruct = new BucketConstruct(this, "BucketConstruct", {
      bucketName: bucketName,
      serverAccessLogBucket: props.serverAccessLogBucket,
      serverAccessLogsPrefix: bucketName,
    });

    // bucketConstruct.bucket.addToResourcePolicy(
    //   new iam.PolicyStatement({
    //     principals: [new ServicePrincipal("cloudtrail.amazonaws.com")],
    //     actions: ["s3:PutObject"],
    //     resources: [`${bucketConstruct.bucket.bucketArn}/*`],
    //   })
    // );

    // bucketConstruct.bucket.addToResourcePolicy(
    //   new iam.PolicyStatement({
    //     sid: "fa",
    //     principals: [new ServicePrincipal("cloudtrail.amazonaws.com")],
    //     actions: ["s3:GetBucketAcl"],
    //     resources: [`${bucketConstruct.bucket.bucketArn}`],
    //   })
    // );

    new CloudTrailConstruct(this, "CloudTrailConstruct", {
      trailName: trailName,
      bucket: bucketConstruct.bucket,
    });
  }
}
