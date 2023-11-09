import {  useNavigate } from "react-router-dom";
import { login } from "../../Service/usersService";
import { setCookie } from "../../helper/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/Login";

function Login(){
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const email=e.target[0].value;
        const password=e.target[1].value;
        const response =await login(email,password);
        if(response.length>0){
            console.log(response);
            setCookie("id",response[0].id,1);
            setCookie("email",response[0].email,1);
            setCookie("token",response[0].token,1);
            setCookie("role",response[0].role,1);
            dispatch(checkLogin(true));
            navigate("/dashboard");

        }
        else{
            alert("Sai thông tin tài khoản")
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <input type="text" placeholder="Nhập email"></input>
                    
                </div>
                <div>
                    
                    <input type="password" placeholder="Nhập mật khẩu"></input>
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </>
    )
}
export default Login;