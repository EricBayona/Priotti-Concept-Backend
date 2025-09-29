import { UserResponseDto } from "../dto/userResponse.dto.js";
import Users from "../presistencia/dao/users.dao.js";
import AuthRepository from "../repository/Auth.repository.js";
import { createToken } from "../utils/jwt.js";

const repository = new AuthRepository(new Users());

class AuthService {
    constructor(repository) {
        this.repository = repository;
    };
    async login(email) {
        const user = await this.repository.getUserByEmail(email);
        const tokenData = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        const token = createToken(tokenData);
        const userDto = new UserResponseDto(user);
        return { user: userDto, token };
    };
    async register(userData) {
        const userDto = userData
        return new UserResponseDto(userDto);
    };
    async current(user, token) {
        if (!user || !user._id) {
            return { message: "Usuario inválido o no logueado" };
        }
        const userDto = new UserResponseDto(user);
        return {
            message: "You are logged in",
            user: userDto,
            token
        };
    };
    async logout() {
        return { message: "Logout successful" }
    }
};

export const authService = new AuthService(repository);
