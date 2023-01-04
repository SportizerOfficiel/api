import joi from "joi"

export const clubValidator = (req, res, next) => {
    let schema;
    if (req.method === "POST"){
        schema = joi.object({
            name: joi.string().required(),
            sport: joi.string().required(),
            address: joi.string().required(),
            idTH: joi.string()
        });
    } else {
        schema = joi.object({
            name: joi.string(),
            sport: joi.string(),
            address: joi.string(),
            idTH: joi.string()
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
    if (error) {
        // on fail return comma separated errors
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}