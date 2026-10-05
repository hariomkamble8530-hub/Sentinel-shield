const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./config.json");
const rateLimiter = require("./rateLimiter");
const waf = require("./waf");

const app = express();

app.use(express.json());

// 🔒 Security Middleware
app.use((req, res, next) => {
    const ip = req.ip;

    // Blacklist
    if (config.security.blacklisted_ips.includes(ip)) {
        return res.status(403).send("Blocked IP");
    }

    // WAF check
    if (waf.detectSQLInjection(req)) {
        return res.status(403).send("SQL Injection Detected");
    }

    // Rate limiting
    if (!rateLimiter.allowRequest(req)) {
        return res.status(429).send("Too Many Requests");
    }

    next();
});

// 🔁 Proxy Forwarding
app.use("/", createProxyMiddleware({
    target: config.server.backend_url,
    changeOrigin: true
}));

app.listen(config.server.listen_port, () =>
    console.log(`Proxy running on ${config.server.listen_port}`)
);