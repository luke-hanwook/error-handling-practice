import axios from 'axios'
import User from '../model/User'
import ReadError from '../model/error/ReadError';
import ValidationError from '../model/error/ValidationError';
import validateUser from '../util/validateUser'

export const getUsersApi = async () => {
    return axios.get(`/users`)
    .then(response => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response.data)
            }, 2000)
        })
    })
    .then(users => users.map(user => {
        // validateUser 로직 분리
        validateUser(user);
        return new User(user)
    }))
    .catch(err => {
        if (err instanceof ValidationError) {
            throw new ReadError(`Validation Error > ${err.message}`, err);
        } else {
            throw new ReadError(err.message, err)
        }
        
    });
}