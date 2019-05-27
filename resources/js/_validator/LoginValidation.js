export const LoginValidation = [
    {
        name: "email",
        type: "required",
        stateMap: "email"
    },
    {
        name: "email",
        type: "isEmail",
        stateMap: "email"
    },
    {
        name: "password",
        type: "required",
        stateMap: "password"
    }
];
