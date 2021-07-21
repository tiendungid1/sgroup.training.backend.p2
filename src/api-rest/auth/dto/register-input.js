export function registerInput(body) {
    return {
        username: body.username,
        fullname: body.fullname,
        email: body.email,
        password: body.password
    };
}
