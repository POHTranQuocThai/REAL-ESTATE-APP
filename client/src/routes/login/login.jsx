import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../Services/authService";
import { AuthContext } from "../../context/authContext";

function Login() {
  const [error, setError] = useState('');
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const res = await authService.fetchLogin({ username, password });
      console.log('🚀 ~ handleSubmit ~ res:', res);

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify(res.data));

      setCurrentUser(res.data);
      navigate('/');
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        {/* Sử dụng onSubmit thay vì onClick */}
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" required placeholder="Password" />
          {/* Chỉ disabled khi đang tải */}
          <button type="submit" disabled={loading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
