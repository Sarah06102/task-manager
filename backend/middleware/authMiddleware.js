import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Bearer ')) {
        return res.status(401).json({message: "No token, auth denied."});
    }
    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.uid;
        next()
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({message: "Invalid or expired token."});
    }
};