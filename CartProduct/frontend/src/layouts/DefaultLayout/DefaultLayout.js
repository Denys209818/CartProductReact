import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import DefaultRoutes from "../../routes/DefaultRoutes";
import Layout from "./Layout";


const DefaultLayout = () => {
    
    return(<>
    <Layout>

        <Switch>
            {DefaultRoutes.map((el, index) => {
                return <Route key={index} name={el.name} exact={el.exact} path={el.path} render={(props) =>
                    {return <el.component {...props} />}
                }/>
            })}
        </Switch>
    </Layout>
    </>);
}

export default DefaultLayout;