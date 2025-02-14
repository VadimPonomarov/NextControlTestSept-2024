import Joi from "joi";
import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";

export const schema = Joi.object<IDummyAuth>({
    username: Joi.string().required().messages({
        "string.base": "Username must be a string",
        "any.required": "Username is required",
        "string.empty": "Username is not allowed to be empty",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
    }),
    expiresInMins: Joi.number().min(30).max(60).required().messages({
        "any.required": "ExpiresInMins is required",
        "number.min": "ExpiresInMins must be at least 30",
        "number.max": "ExpiresInMins must be at most 60",
        "string.empty": "ExpiresInMins is not allowed to be empty",
    }),
});

