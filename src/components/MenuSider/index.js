import { Menu } from "antd";
import{ExclamationOutlined } from "@ant-design/icons"
import { getCookie } from "../../helper/cookie";
import { Link } from "react-router-dom";
function MenuSider(){
    const role = getCookie("role");
    const itemCustomer=[
        {
            label: <Link to="/dashboard/home">Trang chủ</Link>,
            icon: <ExclamationOutlined />,
            key: "/dashboard/home"
        },
        {
            label: <Link to="/dashboard/profile">Thông tin hồ sơ</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-2"
        },
        {
            label: <Link to="/dashboard/ticket">Yêu cầu hỗ trợ</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-3"
        },
    ];
    const itemStaff=[
        {
            label: <Link to="/dashboard/home">Trang chủ</Link>,
            icon: <ExclamationOutlined />,
            key: "/dashboard/home"
        },
        {
            label: <Link to="/dashboard/managerprofile">Hồ sơ khách hàng</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-2"
        },
        {
            label: <Link to="/dashboard/excutive">Yêu cầu hỗ trợ</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-3"
        },
    ];
    const itemAdmin=[
        {
            label: <Link to="/dashboard/home">Trang chủ</Link>,
            icon: <ExclamationOutlined />,
            key: "/dashboard/home"
        },
        {
            label: <Link to="/dashboard/manageraccount">Quản lý tài khoản</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-2"
        },
        {
            label: <Link to="/dashboard/managerticket">Quản lý yêu cầu hỗ trợ</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-3"
        },
    ];
    function item(){
        if (role==="admin") return itemAdmin;
        else if(role==="staff") return itemStaff;
        else if(role==="customer") return itemCustomer;
    }
    return (
        <>
        <Menu
            mode="inline"
            items={item()}
            defaultSelectedKeys={["/dashboard/home"]}
        />
        </>
    )
}
export default MenuSider;