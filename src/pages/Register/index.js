import { useNavigate } from "react-router-dom";
import { checkExits, register } from "../../Service/usersService";
import { generateToken } from "../../helper/generateToken";

function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const checkExitsEmail = await checkExits("email", email);
        if (checkExitsEmail.length > 0) {
            alert("Email da ton tai!")
        }
        else {
            const options = {
                email: email,
                password: password,
                token: generateToken(),
                role: "customer"
            }
            const response = await register(options);
            if(response){

                navigate("/");

            }
            else{
                alert("Dang ki khong thanh cong")
            }
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <input type="email" placeholder="Nhập email"></input>

                </div>
                <div>

                    <input type="password" placeholder="Nhập mật khẩu"></input>
                </div>
                <button type="submit">
                    Register
                </button>
            </form>
        </>
    )
}
export default Register;