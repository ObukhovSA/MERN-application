import { body } from  'express-validator';

export const loginValidation = [
    body('email', 'Несуществующий адрес почты').isEmail(),
    body('password', 'Пароль должен иметь более 5 символов').isLength({ min: 5}),
]; 

export const registerValidation = [
    body('email', 'Несуществующий адрес почты').isEmail(),
    body('password', 'Пароль должен иметь более 5 символов').isLength({ min: 5}),
    body('fullName', 'Укажите имя').isLength({ min: 2}),
    body('avatarUrl', 'Ошибка доступа, возможно ссылка повреждена').optional().isURL(),
]; 

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]; 