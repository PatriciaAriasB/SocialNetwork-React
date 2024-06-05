import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import './Register.scss';

const { Title } = Typography;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = (values) => {
    dispatch(register(values));
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col span={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>Registro</Title>
        <Form name="register" onFinish={onFinish}>
          <Form.Item name="name" rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}>
            <Input placeholder="Nombre" value={name} onChange={onChange} />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}>
            <Input type="email" placeholder="Email" value={email} onChange={onChange} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}>
            <Input.Password placeholder="Contraseña" value={password} onChange={onChange} />
            </Form.Item>
            <Form.Item name="password2" rules={[{ required: true, message: 'Por favor repite tu contraseña' }]}>  
            <Input.Password2 placeholder=" Repite Contraseña" value={password2} onChange={onChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Registro
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
