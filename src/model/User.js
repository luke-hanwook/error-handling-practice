import ValidationError from './error/ValidationError';
import PropertyRequiredError from './error/PropertyRequiredError';
import ReadError from './error/ReadError';

function validateUser(user) {
    if (!user.id) {
        throw new PropertyRequiredError("id");
    }

    if (!user.age) {
        throw new PropertyRequiredError("age");
    }

    if (!user.name) {
        throw new PropertyRequiredError("name");
    }
}

export default class User {
    constructor(data) {
        try {
            validateUser(data);
            this.id = data.id;
            this.name = data.name;
            this.age = data.age;
        } catch(err) {
            if (err instanceof ValidationError) {
                throw new ReadError(`Validation Error > ${err.message}`, err);
            } else {
                throw err;
            }
        }
        
    }
}