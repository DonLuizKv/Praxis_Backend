import { login, verifySession, createTestSession, register } from '../services/auth.service.js';

export const Login = async (req, res) => {
    try {
        const result = await login(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(401).json({ error: error.message });
    }
};

export const Register = async (req, res) => {
    try {
        const result = await register(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const VerifySession = async (req, res) => {
    try {
        const token = req.headers['x-access-token'] || req.headers['authorization'];

        if (!token) {
            return res.status(403).json({ error: 'Se requiere un token para la autenticación' });
        }
        
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const result = await verifySession(tokenWithoutBearer);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        return res.status(401).json({ error: error.message });
    }
};

export const CreateTestSession = async (req, res) => {
    try {
        const { role } = req.body;
        
        if (!role || !['admin', 'student'].includes(role)) {
            return res.status(400).json({ error: 'Tipo de usuario no válido' });
        }
        
        const result = await createTestSession(role);
        return res.status(200).json({
            message: 'Sesión de prueba creada con éxito',
            ...result
        });
    } catch (error) {
        console.error('Error al crear sesión de prueba:', error);
        return res.status(400).json({ error: error.message });
    }
}; 