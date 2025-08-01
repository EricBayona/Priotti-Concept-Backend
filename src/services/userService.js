
import { UserResponseDto } from "../dto/userResponse.dto.js";
import Users from "../presistencia/dao/Users.dao.js";
import UserRepository from "../repository/user.repository.js";
import { hasPassword } from "../utils/hasPassword.js";

const repository = new UserRepository(new Users());

class UserService {
    constructor(repository) {
        this.repository = repository;
    };

    async create(data) {
        return this.repository.create(data);
    }

    async getAll() {
        return this.repository.getAll();
    };

    async getUserById(id) {
        return this.repository.getBy({ _id: id })
    };

    async getUserByEmail(email) {
        return this.repository.getBy({ email: email })
    };

    async update(userId, updateData) {
        if (updateData.password) {
            updateData.password = hasPassword(updateData.password)
        }
        const userUpdate = await this.repository.update(userId, updateData);
        const userDto = new UserResponseDto(userUpdate);
        return userDto;
    };

    async delete(userId) {
        return this.repository.delete(userId);
    };

    async updatePassword(userId, newPassword) {
        return await this.repository.findByIdUpdate(userId, newPassword);
    };
};

export const userService = new UserService(repository);
