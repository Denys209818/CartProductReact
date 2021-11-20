import React from "react";

var Home = React.lazy(() => import("./../components/admin/home"));
var Edit = React.lazy(() => import("./../components/admin/Edit"));
var Add = React.lazy(() => import("./../components/admin/Add"));

const AdminRoutes = [
    {path: '/admin', exact: true, component: Home, name:"Home"},
    {path: '/admin/edit', exact: true, component: Edit, name:"Edit"},
    {path: '/admin/add', exact: true, component: Add, name:"Add"},
];

export default AdminRoutes;