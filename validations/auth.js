import { body } from  'express-validator';

export const registerValidation = [
    body('email', 'Несуществующий адрес почты').isEmail(),
    body('password', 'Пароль должен иметь более 5 символов').isLength({ min: 5}),
    body('fullName', 'Укажите имя').isLength({ min: 2}),
    body('avatarUrl', 'Ошибка доступа, возможно ссылка повреждена').optional().isURL(),
]; 