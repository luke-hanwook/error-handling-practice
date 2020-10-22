import axios from 'axios'
import User from '../model/User'
import ReadError from '../model/error/ReadError';

export const getUsersApi = async () => {
    try {
        const { data } = await axios.get(`/users`);
        // JSON.parse('{잘못된 형식의 json}');
        return data.map(user => new User(user));
    } catch(err) {
        throw new ReadError(err.message, err);
    }
}