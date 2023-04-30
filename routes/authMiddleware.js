
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

async function logMiddleware (req, res, next) {
    if (!req.session) {
        req.session = {};
    } else if (req.session.active == false) {
        // log attacker info
        unsafe_log = {
            timestamp: Date.now(),
            time: new Date().toLocaleString('vi-VN'),
            session: req.sessionID,
            user: req.session.user != null ? req.session.user.toString() : null,
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
    req.session.log.push({ timestamp: Date.now(), time: new Date().toLocaleString('vi-VN'), method: req.method, url: req.originalUrl, refferer: req.headers.referer, ip: req.ip, status: res.statusCode, user_agent: req.headers['user-agent'] });
    req.session.user = req.session.user || null;
    req.session.role = req.session.role || null;
    req.session.email = req.session.email || null;
    req.session.active = req.session.active || true;
    req.session.user_agent = req.session.user_agent || req.headers['user-agent'] || null;
    req.session.ip = req.session.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip || null;
    next();
}

function authorize(...roles) {
    return (req, res, next) => {
        try {
            // // if authorized anonymous, return next
            // if (roles.includes('anonymous')) {
            //     return next();
            // }
            if (roles.length == 0) {
                return next();
            }

            // ========== REQUIRES LOGIN ==========
            // example 0: authorize() => requires login, no role required
            // example 1: authorize('user') => requires login and requires role 'user'
            // example 2: authorize('user', 'admin') => requires login and requires role 'user' or 'admin'
            // example 3: authorize('user', 'admin', 'anonymous') => requires login and requires role 'user' or 'admin' or 'anonymous'
            // if have session but not logged in, return unauthorized
            if (req.session.user == null) {
                res.status(401).json({ error: 'Unauthorized', message: 'Not login yet' });
                req.session.log.push({ time: new Date().toLocaleString(), method: req.method, url: req.originalUrl, refferer: req.headers.referer, ip: req.ip, status: res.statusCode });
                return;
            }
            // if have session and no role required, return next
            if (roles.length == 0) {
                return next();
            }
            // if have session but not have role permission, return forbidden
            if (!roles.includes(req.session.role)) {
                res.status(403).json({ error: 'Forbidden', message: 'Thằng chó, mày đéo có quyền 🔫🔫🔫' });
                req.session.log.push({ time: new Date().toLocaleString(), method: req.method, url: req.originalUrl, refferer: req.headers.referer, ip: req.ip, status: res.statusCode });
                return;
            }
            next();
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error', message: error.message });
            req.session.log.push({ time: new Date().toLocaleString(), method: req.method, url: req.originalUrl, refferer: req.headers.referer, ip: req.ip, status: res.statusCode });
        }
    }
}

module.exports = { authorize, logMiddleware, logSession };