import EErrors from '../../services/errors/enums.js';

export default (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPES_USERERROR:
            res.status(400).json({status: "Error", error: error.name, message: error.message})
            break;

        case EErrors.INVALID_TYPES_PRODUCTERROR:
            res.status(400).json({status: "Error", error: error.name, message: error.message})
            break;
    
        default:
            res.status(500).json({status: "Error", error: "Error no contemplado"})
            break;
    }
}