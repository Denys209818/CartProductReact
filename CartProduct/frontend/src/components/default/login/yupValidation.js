import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string().required('Поле обо\'язкове для заповнення!').email('Не коректно введена пошта!'),
    password: Yup.string().required('Поле обо\'язкове для заповнення!')
});