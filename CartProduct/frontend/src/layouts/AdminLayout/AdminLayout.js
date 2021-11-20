import { Route, Switch } from "react-router";
import AdminRoutes from "../../routes/AdminRoutes";
import Layout from "./Layout";


const AdminLayout = () => 
{
    return (<Layout>
        <Switch>
            {AdminRoutes.map((route, index) => {
                return <Route key={index} name={route.name} exact={route.exact} path={route.path} component={(props) => {
                    return <route.component {...props} />
                }}/>
            })}
        </Switch>
    </Layout>);
}

export default AdminLayout;