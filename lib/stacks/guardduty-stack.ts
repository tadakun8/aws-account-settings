import * as cdk from "@aws-cdk/core";
import * as events from "@aws-cdk/aws-events";
import * as events_targets from "@aws-cdk/aws-events-targets";
import { RESOURCE_NAME } from "../../constants";
import { EventRuleConstruct } from "../constructs/eventbridge/event-rule";
import { GuardDutyConstruct } from "../constructs/guard-duty";
import { TopicConstruct } from "../constructs/sns/topic";
import { createResourceName } from "../util/createResourceName";

export class GuardDutyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new GuardDutyConstruct(this, "GuardDutyConstruct");

    const topicName = createResourceName("guardduty", RESOURCE_NAME.TOPIC);
    const topicConstruct = new TopicConstruct(this, topicName, {
      topicName: topicName,
      emails: [process.env.EMAILS as string],
    });

    const eventRuleConstruct = new EventRuleConstruct(
      this,
      "EventRuleConstruct",
      {
        source: "aws.guardduty",
        detailType: "GuardDuty Finding",
      }
    );

    eventRuleConstruct.eventRule.addTarget(
      new events_targets.SnsTopic(topicConstruct.topic, {
        // prettier-ignore
        message: events.RuleTargetInput.fromText(`WARNING: AWS GuardDuty has discovered a ${events.EventField.fromPath('$.detail.type')} security issue for (${events.EventField.fromPath('$.region')}). Please go to https://${events.EventField.fromPath('$.region')}.console.aws.amazon.com/guardduty/ to find out more details.`),
      })
    );
  }
}
