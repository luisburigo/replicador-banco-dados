import {Document, model, Schema} from 'mongoose'

export interface IUserModel {
    name: string,
    email: string,
    password: string
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}

export interface IUserSchema extends Document {

}

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    },
});

export const UserSchema = model<IUserSchema>('user', schema);
