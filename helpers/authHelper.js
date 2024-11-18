import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword; // Add return statement here
    } catch (error) {
        console.log(error);
        throw error; // Throw the error to propagate it further
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
