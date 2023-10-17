import { Schema, Model, model } from 'mongoose';
import { IUser } from '../shared/user.type';
import bcrypt from 'bcrypt';

interface IUserModel extends Model<IUser> {
    verifyByUsernameAndPassword(username: string, password: string): Promise<IUser | null>;
};

const sessionSchema = new Schema({
    id: String,
    refreshToken: String,
    browser: String,
    os: String,
    platform: String,
    isActive: Boolean,
});

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    sessions: [sessionSchema],
});

userSchema.statics.verifyByUsernameAndPassword = async function (
    username: string,
    password: string
): Promise<IUser | null> {
    const user = await this.findOne({ username });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
}

export const User = model<IUser, IUserModel>('User', userSchema);