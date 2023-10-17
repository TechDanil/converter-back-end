import { ISession } from "./session.type";

export interface IUser extends Document {
    username: string;
    password: string;
    sessions: ISession[];
}