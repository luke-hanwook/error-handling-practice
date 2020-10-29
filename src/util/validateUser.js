import PropertyRequiredError from '../model/error/PropertyRequiredError';

export default function validateUser(user) {
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