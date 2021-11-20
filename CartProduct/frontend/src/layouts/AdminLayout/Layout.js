import Navbar from './../../components/admin/navbar/index'


const Layout = (props) => 
{
    return (<>
    <Navbar/>
    
    <div className="container">
        {props.children}
    </div></>)
}

export default Layout;