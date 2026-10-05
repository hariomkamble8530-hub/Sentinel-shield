const config = require("./config.json");

const store = {};

function allowRequest(req) {
    const ip = req.ip;
    const path = req.path;
    const method = req.method;

    const rule = config.rate_limits.find(r =>
        r.path === path && r.method === method
    );

    if (!rule) return true;

    const key = `${ip}_${path}`;
    const now = Date.now();

    if (!store[key]) {
        store[key] = { count: 1, startTime: now };
        return true;
    }

    const elapsed = (now - store[key].startTime) / 1000;

    if (elapsed > rule.window_seconds) {
        store[key] = { count: 1, startTime: now };
        return true;
    }

    if (store[key].count >= rule.limit) {
        return false;
    }

    store[key].count++;
    return true;
}

module.exports = { allowRequest };