export class UserResponseDto {
    constructor(user) {
        this.fullName = `${user.first_name} ${user.last_name}`;
        this.email = user.email;
        this.age = this.calculateAge(user.birthDate);
        this.role = user.role;
        this.cart = user.cart;
    }

    calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };
}
