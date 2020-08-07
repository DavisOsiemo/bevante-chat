import { Schema } from '@hapi/joi';

export const validateJoiSchema = <T>(schema: Schema, data: any): T => {
  const { error, value } = schema.validate(data);

  if (error) {
    const combinedMessages = error.details.map((d) => d.message).join(';');
    throw new Error(combinedMessages);
  }

  return value;
};
