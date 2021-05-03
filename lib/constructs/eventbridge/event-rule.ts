import * as cdk from "@aws-cdk/core";
import * as events from "@aws-cdk/aws-events";
import { createResourceName } from "../../util/createResourceName";
import { RESOURCE_NAME } from "../../../constants";

interface EventRuleConstructProps {
  source: string;
  detailType: string;
}

export class EventRuleConstruct extends cdk.Construct {
  public eventRule: events.Rule;

  constructor(
    scope: cdk.Construct,
    id: string,
    props: EventRuleConstructProps
  ) {
    super(scope, id);

    this.eventRule = new events.Rule(this, "EventsRule", {
      ruleName: createResourceName(
        "guardduty-notification",
        RESOURCE_NAME.EVENTS_RULE
      ),
      eventPattern: {
        source: [props.source],
        detailType: [props.detailType],
      },
    });
  }
}
