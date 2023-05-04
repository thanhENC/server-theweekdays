
// {
//     user: username,
//     email: email,
//     log: [
//         {
//             timestamp: Date.now(),
//             time: new Date().toLocaleString(),
//             method: req.method,
//             url: req.originalUrl,
//             refferer: req.headers.referer,ư
//             ip: req.ip,
//             status: res.statusCode,
//             user_agent: req.headers['user-agent']
//         }
//      ],
//     active: true,
//     role: role,
//     ip: ip,
//     user_agent: user_agent
// }

const { unsafe_collection, session_collection } = require("../utils/mongo");

function logSession(req, res, statusCode) {
    req.session.log.push({ timestamp: Date.now(), time: new Date().toLocaleString('vi-VN'), method: req.method, url: req.originalUrl, refferer: req.headers.referer, ip: req.ip, status: statusCode, user_agent: req.headers['user-agent'] });
}

async function logMiddleware(req, res, next) {
    if (!req.session) {
        req.session = {};
    } else if (req.session.active == false) {
        // log attacker info
        unsafe_log = {
            timestamp: Date.now(),
            time: new Date().toLocaleString('vi-VN'),
            session: req.sessionID,
            user: req.session.user != null ? req.session.user : null,
            email: req.session.email != null ? req.session.email : null,
            user_ip: req.session.ip != null ? req.session.ip : null,
            user_agent: req.session.user_agent != null ? req.session.user_agent : null,
            attacker_ip: req.ip != null ? req.ip : null,
            attacker_user_agent: req.headers['user-agent'] != null ? req.headers['user-agent'] : null,
        };
        await unsafe_collection.insertOne(unsafe_log);
        res.clearCookie('connect.sid');
        req.session = null;
        res.status(401).json({ message: "Session expired" });
        return;
    }
    req.session.log = req.session.log || [];
    // req.session.log.push({ timestamp: Date.now(), time: new Date().toLocaleString('vi-VN'), method: req.method, url: req.originalUrl, refferer: req.headers.referer, ip: req.ip, status: res.statusCode, user_agent: req.headers['user-agent'] });
    req.session.user = req.session.user || null;
    req.session.role = req.session.role || null;
    req.session.email = req.session.email || null;
    req.session.active = req.session.active || true;
    req.session.user_agent = req.session.user_agent || req.headers['user-agent'] || null;
    req.session.ip = req.session.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip || null;
    next();
}

// allow access to user with role
function allowAccess(...roles) {
    return (req, res, next) => {
        try {
            // // if authorized anonymous, return next
            // if (roles.includes('anonymous')) {
            //     return next();
            // }

            // ========== REQUIRES LOGIN ==========
            // example 0: allowAccess() => requires login, no role required
            // example 1: allowAccess('user') => requires login and requires role 'user'
            // example 2: allowAccess('user', 'admin') => requires login and requires role 'user' or 'admin'
            // example 3: allowAccess('user', 'admin', 'anonymous') => requires login and requires role 'user' or 'admin' or 'anonymous'
            // if have session but not logged in, return unauthorized
            if (req.session.user == null) {
                logSession(req, res, 401);
                res.status(401).json({ error: 'Unauthorized', message: 'Not login yet' });
                return;
            }
            // if have session and no role required, return next
            if (roles.length == 0) {
                return next();
            }
            // if have session but not have role permission, return forbidden
            if (!roles.includes(req.session.role)) {
                logSession(req, res, 403);
                res.status(403).json({ error: 'Forbidden', message: 'You dont have permission to access this resource' });
                return;
            }
            next();
        }
        catch (error) {
            logSession(req, res, 500);
            res.status(500).json({ error: 'Internal server error', message: error.message });
        }
    }
}

// deny access to user with role
function denyAccess(...roles) {
    return (req, res, next) => {
        // ==================== TRY ====================
        try {
            // if denyAccess() => deny all login user, only allow anonymous
            if (roles.length == 0) {
                if (req.session.user != null) {
                    logSession(req, res, 403);
                    res.status(403).json({ error: 'Forbidden', message: 'You are already logged in. This API only allows anonymous user' });
                    return;
                } else {
                    // allow anonymous
                    return next();
                }
            } else {
                // denyAccess('user') => deny all user with role 'user'
                // denyAccess('user', 'admin') => deny all user with role 'user' or 'admin'
                // denyAccess('user', 'admin', 'superadmin') => deny all user with role 'user' or 'admin' or 'superadmin'
                if (req.session.user != null && roles.includes(req.session.role)) { // if have session and have role permission, return forbidden
                    logSession(req, res, 403);
                    res.status(403).json({ error: 'Forbidden', message: 'You dont have permission to access this resource' });
                    return;
                } else {
                    // allow user not in roles, even anonymous
                    return next();
                }
            }
        }
        // ==================== CATCH ====================
        catch (error) {
            logSession(req, res, 500);
            res.status(500).json({ error: 'Internal server error', message: error.message });
        }
    }
}

module.exports = { allowAccess, denyAccess, logMiddleware, logSession };