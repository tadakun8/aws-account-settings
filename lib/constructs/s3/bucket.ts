import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";

interface BucketConstrctProps {
  bucketName: string;
  serverAccessLogBucket?: s3.IBucket;
  serverAccessLogsPrefix?: string;
}

export class BucketConstruct extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: BucketConstrctProps) {
    super(scope, id);

    const bucket = new s3.Bucket(this, `${props.bucketName}`, {
      encryption: s3.BucketEncryption.KMS,
      bucketKeyEnabled: true,
      bucketName: props.bucketName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      serverAccessLogsBucket: props.serverAccessLogBucket,
      serverAccessLogsPrefix: props.serverAccessLogsPrefix,
    });

    bucket.encryptionKey?.addAlias(`alias/${bucket.bucketName}-key`);
  }
}
