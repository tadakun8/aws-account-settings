import * as cdk from "@aws-cdk/core";
import { RESOURCE_NAME } from "../../constants";
import { createResourceName } from "../util/createResourceName";
import * as s3 from "@aws-cdk/aws-s3";
import { BucketConstruct } from "../constructs/s3/bucket";
import { CloudTrailConstruct } from "../constructs/cloudtrail";
import * as kms from "@aws-cdk/aws-kms";

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

    const key = new kms.Key(this, "KmsConstruct", {
      alias: "alias/deleted",
    });

    new CloudTrailConstruct(this, "CloudTrailConstruct", {
      trailName: trailName,
      bucket: bucketConstruct.bucket,
      encryptionKey: key,
    });
  }
}
