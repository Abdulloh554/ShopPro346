import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

function Login() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.get(`users?username=${values.username}&password=${values.password}`);
      const users = response.data;
      
      if (users.length > 0) {
        login(users[0]);
        message.success(t('login_success', 'Muvaffaqiyatli kirdingiz!'));
        navigate("/");
      } else {
        message.error(t('login_error', 'Login yoki parol noto\'g\'ri!'));
      }
    } catch (error) {
      console.error(error);
      message.error(t('server_error', 'Server bilan aloqa xatosi!'));
    } finally {
      setLoading(false);
    }
  };

  // Agar user login bo'lgan bo'lsa profil ko'rsatish
  if (user) {
    return (
      <section className="py-4 md:py-8 font-sans neu-bg flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto mb-6 neu-convex rounded-full flex items-center justify-center">
              <UserOutlined className="text-4xl text-blue-500" />
            </div>
            <h1 className="text-3xl font-black neu-text uppercase">
              {t('profile', 'Profil')}
            </h1>
          </div>

          <div className="neu-flat rounded-[40px] p-10 text-center">
            <p className="text-xl font-bold neu-text mb-6">
              {t('welcome', 'Xush kelibsiz')}, {user.username}!
            </p>
            <Button
              icon={<LogoutOutlined />}
              onClick={logout}
              className="w-full neu-convex h-14 rounded-full border-none text-lg font-black uppercase"
            >
              {t('logout', 'Chiqish')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

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

            <Form.Item 
              name="username" 
              label={t('username_label', 'Foydalanuvchi nomi')} 
              rules={[{ required: true, message: t('username_required', 'Iltimos, foydalanuvchi nomini kiriting!') }]}
            >
              <Input prefix={<UserOutlined />} className="neu-pressed rounded-[20px]" />
            </Form.Item>

            <Form.Item 
              name="password" 
              label={t('password_label', 'Parol')} 
              rules={[
                { required: true, message: t('password_required', 'Iltimos, parolingizni kiriting!') },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} className="neu-pressed rounded-[20px]" />
            </Form.Item>

            <Button
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              className="w-full neu-convex h-14 rounded-full border-none"
            >
              {t('login_btn', 'Kirish')}
            </Button>

          </Form>

          <div className="text-center mt-6">
            <span className="neu-text opacity-60 text-sm">
              {t('no_account', "Akkauntingiz yo'qmi?")}{' '}
            </span>
            <Link to="/register" className="text-blue-500 font-bold text-sm hover:underline">
              {t('register_link', "Ro'yxatdan o'tish")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;