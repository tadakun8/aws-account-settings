import * as cdk from "@aws-cdk/core";
import { RESOURCE_NAME } from "../../constants";
import { BucketConstruct } from "../constructs/s3/bucket";
import { createResourceName } from "../util/createResourceName";
import * as s3 from "@aws-cdk/aws-s3";

export class ServerAccessLogBucketStack extends cdk.Stack {
  public bucket: s3.IBucket;

  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const bucketConstruct = new BucketConstruct(this, "BucketConstruct", {
      bucketName: createResourceName("server-access-log", RESOURCE_NAME.BUCKET),
    });

    this.bucket = bucketConstruct.bucket;
  }
}
