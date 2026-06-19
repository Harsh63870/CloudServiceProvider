function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File 5MB se chhoti honi chahiye' });
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, message: 'Galat ID format hai' });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server me kuch gadbad ho gayi',
    });
}

module.exports = errorHandler;
