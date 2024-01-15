import { User } from "../models";

export const Create = async (data: User) => {
    return await User.create(data)
        .catch((error: Error) => {
            console.error("Error when create user: ", error);
        });
};

export const FindByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
};

export const FindOrCreate = async (data: User) => {
    try {
        const [user, _] = await User.findOrCreate({
            where: { username: data.username },
            defaults: data
        });

        return user;
    } catch (error) {
        console.error("Error when find or create user: ", error);
        return null;
    }
};