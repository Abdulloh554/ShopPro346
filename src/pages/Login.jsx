import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useData } from '../context/DataContext';

const API_URL = "http://localhost:3000";

function Login() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { user, login, logout } = useData();

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    

    try {
      // 1. Check if user already exists
      const usersRes = await axios.get(`${API_URL}/users?username=${values.username}`);
      let userData;

      if (usersRes.data.length > 0) {
        // user exists, check password
        const foundUser = usersRes.data[0];
        if (foundUser.password === values.password) {
            userData = foundUser;
        } else {
            message.error(t('invalid_password', 'Parol noto\'g\'ri!'));
            setLoading(false);
            return;
        }
      } else {
        // new user, create it
        const newUser = {
          username: values.username,
          password: values.password,
          loginTime: new Date().toLocaleString(),
        };
        const res = await axios.post(`${API_URL}/users`, newUser);
        userData = res.data;
      }

      // 2. Set context and local storage via login function
      login(userData);

      message.success(t('login_success', 'Muvaffaqiyatli kirdingiz!'));
      form.resetFields();

    } catch (error) {
      console.error(error);
      message.error(t('login_error', 'Xatolik yuz berdi'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    message.success(t('logout_success', 'Tizimdan chiqdingiz!'));
  };

  /* ================= PROFILE ================= */
  if (user) {
    return (
      <section className="py-4 md:py-8 font-sans neu-bg flex items-center justify-center">
        <div className="w-full max-w-md px-6">

          <div className="text-center mb-10">
            <div className="w-28 h-28 mx-auto mb-6 neu-convex rounded-full flex items-center justify-center">
              <UserOutlined className="text-5xl text-blue-500" />
            </div>

            <h1 className="text-3xl md:text-4xl font-black neu-text uppercase tracking-tight mb-2">
              {t('profile', 'Profil')}
            </h1>
          </div>

          <div className="neu-flat rounded-[40px] p-10 space-y-6">

            <div className="neu-pressed rounded-[20px] p-5 flex items-center gap-5">
              <UserOutlined className="text-xl text-blue-500" />
              <div>
                <p className="opacity-50 text-xs uppercase">Login</p>
                <p className="font-bold">{user.username}</p>
              </div>
            </div>

            <div className="neu-pressed rounded-[20px] p-5 flex items-center gap-5">
              <CalendarOutlined className="text-xl text-blue-500" />
              <div>
                <p className="opacity-50 text-xs uppercase">Vaqt</p>
                <p className="font-bold">{user.loginTime}</p>
              </div>
            </div>

            <Button
              size="large"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="w-full neu-convex border-none h-16 rounded-full"
            >
              {t('logout', 'Chiqish')}
            </Button>

          </div>
        </div>
      </section>
    );
  }

  /* ================= LOGIN ================= */
  return (
    <section className="py-4 md:py-8 font-sans neu-bg flex items-center justify-center">
      <div className="w-full max-w-md px-6">

        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-6 neu-convex rounded-full flex items-center justify-center">
            <UserOutlined className="text-4xl text-blue-500" />
          </div>

          <h1 className="text-3xl font-black neu-text uppercase">
            {t('login', 'Kirish')}
          </h1>
        </div>

        <div className="neu-flat rounded-[40px] p-10">
          <Form form={form} layout="vertical" onFinish={onFinish}>

            <Form.Item name="username" label="Login" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined />} className="neu-pressed rounded-[20px]" />
            </Form.Item>

            <Form.Item 
              name="password" 
              label="Parol" 
              rules={[
                { required: true, message: 'Iltimos, parolingizni kiriting!' },
                { 
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
                  message: 'Parol kamida 8 ta belgi bo\'lib, bitta katta harf, bitta kichik harf, bitta son va bitta belgi bo\'lishi kerak!' 
                }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} className="neu-pressed rounded-[20px]" />
            </Form.Item>

            <Button
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              className="w-full neu-convex h-14 rounded-full"
            >
              {t('login_btn', 'Kirish')}
            </Button>

          </Form>
        </div>
      </div>
    </section>
  );
}

export default Login;