import joi from "joi"

export const playerValidator = (req, res, next) => {
    let schema;

    if (req.method === "POST") {
        schema = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            idTH: joi.string().required(),
            idClub: joi.string().required(),
            birthDate: joi.string().required(),
            category: joi.array().required(),
            matchsPlayed: joi.object()
        });    
    } else {
        schema = joi.object({
            firstName: joi.string(),
            lastName: joi.string(),
            idTH: joi.string(),
            idClub: joi.string(),
            birthDate: joi.string(),
            category: joi.array(),
            matchsPlayed: joi.object()
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