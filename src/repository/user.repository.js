
import GenericRepository from "./genericRepository.js";

export default class UserRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    };
    findByIdUpdate = (userId, newPassword) => {
        return this.dao.findByIdUpdate(userId, { password: newPassword })
    }
};