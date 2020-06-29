import {IUserModel, IUserSchema, UserSchema} from "../../src/models/UserModel";
import {ITodoModel, ITodoSchema, TodoSchema, TodoStatus} from "../../src/models/TodoModel";
import {Bootstrap} from "../../src/Bootstrap";

Bootstrap.init();

test("create todo with user", async () => {
    const user: IUserModel = {
        email: "teste@gmail.com",
        name: "teste",
        password: "teste123"
    };

    const userMock: IUserSchema = await UserSchema.create(user);

    const todo: ITodoModel = {
        name: "Test user",
        status: TodoStatus.NOT_COMPLETED,
        user: userMock._id
    };

    const todoMock: ITodoSchema = await TodoSchema.create(todo);
    const todos = await TodoSchema.findById(todoMock._id).populate('user');

    // @ts-ignore
    expect(todos.user._id).toBeDefined();
});
