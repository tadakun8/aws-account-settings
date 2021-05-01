import * as cdk from "@aws-cdk/core";
import { RESOURCE_NAME } from "../../constants";
import { BucketConstruct } from "../constructs/s3/bucket";
import { createResourceName } from "../util/createResourceName";

export class ServerAccessLogBucketStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    new BucketConstruct(this, "BucketConstruct", {
      bucketName: createResourceName("server-access-log", RESOURCE_NAME.BUCKET),
    });
  }
}
