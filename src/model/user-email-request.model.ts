import { JSONSchemaType } from "ajv";

export const uerEmailRequestSchema: JSONSchemaType<IUserEmailRequest> = {
  type: "object",
  properties: {
    email: { type: "string" },
    name: { type: "string" },
    favorite: { type: "string" },
  },
  required: ["email", "name", "favorite"],
  additionalProperties: false,
};

export interface IUserEmailRequest {
  name: string;
  email: string;
  favorite: string;
}
