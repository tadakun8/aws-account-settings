import { RESOURCE_PREFIX } from "../../constants";

export const createResourceName = (use: string, resource: string): string => {
  return `${RESOURCE_PREFIX}-${use}-${resource}`;
};
