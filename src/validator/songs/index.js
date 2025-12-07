const InvariantError = require('../../exceptions/InvariantError');
const {SongsPayloadShema} = require('./schema');

const SongsValidator = {
    validateSongPayload: (payload) => {
        const validationResult = SongsPayloadShema.validate(payload);
        if(validationResult.error){
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = SongsValidator;