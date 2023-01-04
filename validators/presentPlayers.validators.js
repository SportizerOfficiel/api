import joi from "joi"

export const presentPlayerValidator = (req, res, next) => {
    let schema;
    
    if (req.method === "POST") {
        schema = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            fouls: joi.number().required(),
            points: joi.number().required(),
            num: joi.number().required(),
            category: joi.string().required(),
            home: joi.boolean().required(),
        });
    } else {
        schema = joi.object({
            firstName: joi.string(),
            lastName: joi.string(),
            fouls: joi.number(),
            points: joi.number(),
            num: joi.number(),
            category: joi.string(),
            home: joi.boolean(),
        });
    }

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);
    console.log(error);
    console.log(value);
    if (error) {
        // on fail return comma separated errors
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}