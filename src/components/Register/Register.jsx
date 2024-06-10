import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { Form, Input, notification, Button, Typography, Row, Col } from 'antd';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    image: null
  });

  const { name, email, password, password2, image } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = (values) => {
    if (values.password !== values.password2) {
      return notification.error({
        message: "Error",
        description: "Las contraseñas no coinciden",
      });
    } else {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('image', image);

      dispatch(register(formData)).unwrap().then(() => {
        navigate('/');
      }).catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message,
        });
      });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col span={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>Registro</Title>
        <Form name="register" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
          >
            <Input placeholder="Nombre" value={name} onChange={onChange} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}
          >
            <Input type="email" placeholder="Email" value={email} onChange={onChange} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password placeholder="Contraseña" value={password} onChange={onChange} />
          </Form.Item>
          <Form.Item
            name="password2"
            rules={[{ required: true, message: 'Por favor repite tu contraseña' }]}
          >
            <Input.Password placeholder="Repite Contraseña" value={password2} onChange={onChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>
          <div>
            <Link className='linkLogin' to={"/login"}>If you have an account Click Here</Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
