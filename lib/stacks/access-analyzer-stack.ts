import * as cdk from "@aws-cdk/core";
import * as accessanalyzer from "@aws-cdk/aws-accessanalyzer";

export class AccessAnalyzerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new accessanalyzer.CfnAnalyzer(this, "CfnAnalyzer", {
      type: "ACCOUNT",
      analyzerName: "my-settings-access-analyzer"
    });
  }
}
