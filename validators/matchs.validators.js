import joi from "joi"

export const matchValidator = (req, res, next) => {
    let schema;

    if (req.method === "POST") {
        schema = joi.object({
            homeTeam: joi.string().required(),
            awayTeam: joi.string().required(),
            date: joi.date().required(),
            place: joi.string().required(),
            category: joi.string().required(),
            sport: joi.string().required(),
            homePoints: joi.number(),
            awayPoints: joi.number(),
            homeFouls: joi.number(),
            awayFouls: joi.number(),
            duration: joi.number().required(),
        }); 
    } else {
        schema = joi.object({
            homeTeam: joi.string(),
            awayTeam: joi.string(),
            date: joi.date(),
            place: joi.string(),
            category: joi.string(),
            sport: joi.string(),
            homePoints: joi.number(),
            awayPoints: joi.number(),
            homeFouls: joi.number(),
            awayFouls: joi.number(),
            duration: joi.number(),
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