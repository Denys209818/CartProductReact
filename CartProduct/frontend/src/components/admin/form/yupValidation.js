import * as Yup from 'yup';

export default Yup.object({
    name: Yup.string().required('Поле не може бути пустим!'),
    price: Yup.number('Ви ввели не цифру!').required('Поле не може бути пустим!'),
    description: Yup.string().required('Поле не може бути пустим!')
});