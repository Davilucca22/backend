import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ msgerr: 'Acesso negado. Token não fornecido.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        res.status(400).json({ msgerr: 'Token inválido.' })
    }
}