import jwt from 'jsonwebtoken';
import { env } from '../config/enviroment.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(403).json({ message: 'Not authenticated!' });
        }

        jwt.verify(token, env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return res.status(403).json({ message: 'Token is not valid!' });
            }
            req.userId = payload.id; // Gắn userId vào request để middleware tiếp theo sử dụng.
            next(); // Chuyển tiếp request sau khi xác thực thành công.
        });
    } catch (error) {
        return res.status(500).json({ message: error.message }); // Trả lỗi máy chủ nếu có lỗi phát sinh.
    }
};
