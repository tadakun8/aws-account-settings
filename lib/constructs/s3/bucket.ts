import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";

interface BucketConstructProps {
  bucketName: string;
  serverAccessLogBucket?: s3.IBucket;
  serverAccessLogsPrefix?: string;
}

export class BucketConstruct extends cdk.Construct {
  public bucket: s3.IBucket;

  constructor(scope: cdk.Construct, id: string, props: BucketConstructProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, `${props.bucketName}`, {
      encryption: s3.BucketEncryption.KMS,
      bucketKeyEnabled: true,
      bucketName: props.bucketName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      serverAccessLogsBucket: props.serverAccessLogBucket,
      serverAccessLogsPrefix: props.serverAccessLogsPrefix,
    });

    this.bucket.encryptionKey?.addAlias(`alias/${this.bucket.bucketName}-key`);
  }
}
