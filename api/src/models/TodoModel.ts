import {Document, model, Schema} from 'mongoose'
import {IUserModel} from "./UserModel";

export enum TodoStatus {
    COMPLETED,
    WORKING,
    NOT_COMPLETED
}

export interface ITodoModel {
    name: string,
    status: TodoStatus,
    user: IUserModel,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}

export interface ITodoSchema extends Document {

}

const schema = new Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        default: TodoStatus.NOT_COMPLETED
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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

export const TodoSchema = model<ITodoSchema>('todo', schema);
