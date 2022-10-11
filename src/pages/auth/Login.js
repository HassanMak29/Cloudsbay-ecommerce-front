import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("hassan_makhloufi@yahoo.com");
  const [password, setPassword] = useState("test1234");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const roleBasedRedirect = (role) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      const res = await createOrUpdateUser(idTokenResult.token);

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: res.data.name,
          email: res.data.email,
          token: idTokenResult.token,
          role: res.data.role,
          _id: res.data._id,
        },
      });
      setLoading(false);
      roleBasedRedirect(res.data.role);
    } catch (err) {
      console.log("Login form error", err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        const res = await createOrUpdateUser(idTokenResult.token);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,
          },
        });

        roleBasedRedirect(res.data.role);
      })
      .catch((err) => {
        console.log("login error", err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-2 mt-2"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? (
            <h4>Login</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}
          {loginForm()}
          <Button
            onClick={handleGoogleLogin}
            className="mb-2"
            type="danger"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-end text-danger">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;