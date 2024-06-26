import './Login.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { notification, Button, Form, Input } from 'antd';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const { message, isSuccess, isError } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message
      });
      navigate("/profile");
    }
    if (isError) {
      notification.error({
        message: "Error",
        description: message
      });
    }
    dispatch(reset())
  }, [isSuccess, message, isError]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const emailRegex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  return (
    <div className="login-container">
      <Form
        name="basic"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
            {
              pattern: emailRegex,
              message: 'Please input a valid email',
            },
          ]}
        >
          <Input name="email" value={email} onChange={onChange} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password name="password" value={password} onChange={onChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="black-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
