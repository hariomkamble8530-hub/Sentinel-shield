function detectSQLInjection(req) {
    const suspiciousPatterns = [
        /(\bOR\b|\bAND\b).*=.*/i,
        /SELECT.*FROM/i,
        /DROP TABLE/i,
        /--/,
        /;/ 
    ];

    const data = JSON.stringify(req.body) + req.url;

    return suspiciousPatterns.some(pattern => pattern.test(data));
}

module.exports = { detectSQLInjection };