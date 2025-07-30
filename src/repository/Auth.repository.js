import GenericRepository from "./genericRepository.js";

export default class AuthRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
    getUserByEmail = (email) => {
        return this.getBy({ email });
    };
}