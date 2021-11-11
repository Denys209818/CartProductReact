import * as Yup from 'yup';

export default Yup.object({
    firstname: Yup.string().required('Поле обо\'язкове для заповнення!'),
    secondname: Yup.string().required('Поле обо\'язкове для заповнення!'),
    phone: Yup.string().required('Поле обо\'язкове для заповнення!'),
    email: Yup.string().required('Поле обо\'язкове для заповнення!').email('Не коректно введена пошта!'),
    password: Yup.string().required('Поле обо\'язкове для заповнення!').min(6, 'Мінімальна кількість символів - 6'),
    confirmPassword: Yup.string().required('Поле обо\'язкове для заповнення!').oneOf([Yup.ref('password')], 'Поля не співпадають')
});