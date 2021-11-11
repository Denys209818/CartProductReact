import React from "react";

const Home = React.lazy(() => import("../components/default/home/index"));
const Register = React.lazy(() => import("../components/default/register/index"));
const Login = React.lazy(() => import("../components/default/login/index"));
const Product = React.lazy(() => import("../components/default/product/index"));

const DefaultRoutes = [
    {exact: true, name: "Логін", path: '/login', component: Login },
    {exact: true, name: "Реєстрація", path: '/register', component: Register},
    {exact: true, name: "Головна сторінка", path: '/', component: Home},
    {exact: true, name: "Продукти", path: '/products', component: Product}
];

export default DefaultRoutes;