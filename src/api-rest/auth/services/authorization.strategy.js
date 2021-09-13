import { UNAUTHORIZED, FORBIDDEN } from 'http-status';

function hasRole(roleRequired, roleGranted) {
    return roleRequired === roleGranted;
}

export function authorizeRole(roleName) {
    return (req, res, next) => {
        const { user } = req;

        if (!user) {
            return res.status(UNAUTHORIZED).json({ message: 'UNAUTHORIZED' });
        }

        if (!hasRole(roleName, user.roles)) {
            return res.status(FORBIDDEN).json({ message: 'You are not allowed to do this' });
        }

        return next();
    };
}
