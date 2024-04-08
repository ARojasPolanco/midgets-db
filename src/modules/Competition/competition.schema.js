import z from 'zod';

import { extractValidationData } from '../../common/utils/extractErrorData.js';

const competitionSchema = z.object({
    name: z.string().min(1).max(40),
    racerId: z.number().positive()
});

export const validateCompetition = (data) => {
    const result = competitionSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: competitionData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        competitionData,
    };
};
