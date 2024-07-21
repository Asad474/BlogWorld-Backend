export interface IUser {
    _id: string,
    username: string,
    email: string,
    password: string,
    bio: string,
    dp: {
        url: string,
        file_id: string,
    },
    matchPassword: (enteredPassword: string) => Promise<boolean>,
}