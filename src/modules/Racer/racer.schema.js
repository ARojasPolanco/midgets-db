import z from 'zod';

import { extractValidationData } from '../../common/utils/extractErrorData.js';

const racerSchema = z.object({
  name: z.string().min(3).max(50),
  position: z.string().min(1),
  position: z.string().min(1).max(160),
  number: z.string().min(1).max(200),
  category: z.string().min(1).max(20)
});


export const validateRacer = (data) => {
  const result = racerSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: racerData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    racerData,
  };
};

