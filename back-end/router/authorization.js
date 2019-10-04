const Config = require('../config/ConfigLoaderFactory')
    .getLoader()
    .getConfig();

const protectedRoutes = ['/webhook', '/status', '/trigger', '/debug'];

const getAuthorizationPassword = request => {
    const headers = ['x-gitlab-token', 'authorization', 'token'];

    for (let header of headers) {
        if (request.headers[header]) {
            return request.headers[header];
        }
    }

    for (let header of headers) {
        if (request.query[header]) {
            return request.query[header];
        }
    }

    return '';
};

const AuthorizationMiddleware = (request, response, next) => {
    const serverPassword = Config.getServerPassword();

    if (serverPassword === '') {
        return next();
    }

    for (let protectedRoute of protectedRoutes) {
        if (request.url.startsWith(protectedRoute)) {
            const authPassword = getAuthorizationPassword(request);
            if (!authPassword) {
                console.log(`[Authorization] ${request.url} 401 API password is required.`);
                return response.status(401).json({ message: 'This API action is password protected.' });
            }

            if (authPassword !== serverPassword) {
                console.log(`[Authorization] ${request.url} Incorrect password is provided.`);
                return response.status(403).json({ message: 'The provided authorization password is incorrect.' });
            }
        }
    }

    next();
};

module.exports = AuthorizationMiddleware;
