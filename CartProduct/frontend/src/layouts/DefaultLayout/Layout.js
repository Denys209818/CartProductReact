import Navbar from "../../components/default/navbar";

const Layout = (props) => {

    return (
    <>
    <Navbar/>
    <div className="container">
        {props.children}
    </div>
    </>
    );
}

export default Layout;