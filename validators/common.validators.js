import joi from "joi"

export const BodyNotEmptyValidator = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        // on fail return comma separated errors
        next(`Validation error: body empty`);
    } else {
        // req.body = value;
        next();
    }
}