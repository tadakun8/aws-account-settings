import * as cdk from "@aws-cdk/core";
import * as sns from "@aws-cdk/aws-sns";
import * as sns_subscription from "@aws-cdk/aws-sns-subscriptions";

interface TopicConstructProps {
  topicName: string;
  emails: string[];
}

export class TopicConstruct extends cdk.Construct {
  public topic: sns.Topic;

  constructor(scope: cdk.Construct, id: string, props: TopicConstructProps) {
    super(scope, id);

    this.topic = new sns.Topic(this, `${props.topicName}`);
    props.emails.forEach((email) => {
      this.topic.addSubscription(new sns_subscription.EmailSubscription(email));
    });
  }
}
