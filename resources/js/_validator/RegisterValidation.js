export const RegisterValidation = [
    {
        name: "firstName",
        type: "required",
        stateMap: "firstName"
    },
    {
        name: "lastName",
        type: "required",
        stateMap: "lastName"
    },
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
        name: "phoneNumber",
        type: "required",
        stateMap: "phoneNumber"
    },
    {
        name: "phoneNumber",
        type: "minLength",
        stateMap: "phoneNumber",
        compareWith: 11
    },
    {
        name: "password",
        type: "required",
        stateMap: "password"
    },
    {
        name: "password",
        type: "minLength",
        stateMap: "password",
        compareWith: 6
    },
    {
        name: "confirmPassword",
        type: "required",
        stateMap: "confirmPassword"
    },
    {
        name: "confirmPassword",
        type: "compareFields",
        stateMap: "confirmPassword",
        compareWith: "password"
    }
];
