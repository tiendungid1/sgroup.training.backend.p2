export function profileResponse(profile, accessToken) {
    delete profile.password;
    return {
        profile,
        accessToken
    };
}
