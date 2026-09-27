// Structured Production Logger - Adhering to Rule 2 (Logging Hygiene)
// Replaces raw console.log with structured, contextual, and sanitized logging

class Logger {
    constructor(serviceName = 'payment-service') {
        this.serviceName = serviceName;
    }

    _format(level, message, metadata = {}) {
        return JSON.stringify({
            timestamp: new Date().toISOString(),
            service: this.serviceName,
            level: level.toUpperCase(),
            message,
            metadata: this._sanitize(metadata)
        });
    }

    _sanitize(metadata) {
        // Redact any sensitive information
        const sanitized = { ...metadata };
        if (sanitized.password) sanitized.password = '***REDACTED***';
        if (sanitized.creditCard) sanitized.creditCard = '***REDACTED***';
        if (sanitized.token) sanitized.token = '***REDACTED***';
        return sanitized;
    }

    info(message, metadata) {
        process.stdout.write(this._format('info', message, metadata) + '\n');
    }

    warn(message, metadata) {
        process.stdout.write(this._format('warn', message, metadata) + '\n');
    }

    error(message, metadata) {
        process.stderr.write(this._format('error', message, metadata) + '\n');
    }

    debug(message, metadata) {
        if (process.env.NODE_ENV !== 'production') {
            process.stdout.write(this._format('debug', message, metadata) + '\n');
        }
    }
}

module.exports = new Logger();
