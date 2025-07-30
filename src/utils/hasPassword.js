import bcrypt from 'bcrypt';

export const hasPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (usePassword, recibePassword) => {
    return bcrypt.compareSync(recibePassword, usePassword)
};