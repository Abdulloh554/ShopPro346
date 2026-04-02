import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

function Register() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Tekshirish: username allaqachon mavjudmi
      const checkResponse = await api.get(`users?username=${values.username}`);
      if (checkResponse.data.length > 0) {
        message.error(t('username_taken', "Bu foydalanuvchi nomi allaqachon band!"));
        setLoading(false);
        return;
      }

      // Yangi foydalanuvchi yaratish
      const response = await api.post("users", {
        username: values.username,
        password: values.password,
      });

      // Avtomatik login qilish
      login(response.data);
      message.success(t('register_success', "Muvaffaqiyatli ro'yxatdan o'tdingiz!"));
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error(t('server_error', 'Server bilan aloqa xatosi!'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-4 md:py-8 font-sans neu-bg flex items-center justify-center">
      <div className="w-full max-w-md px-6">

        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-6 neu-convex rounded-full flex items-center justify-center">
            <UserAddOutlined className="text-4xl text-blue-500" />
          </div>

          <h1 className="text-3xl font-black neu-text uppercase">
            {t('register', "Ro'yxatdan o'tish")}
          </h1>
        </div>

        <div className="neu-flat rounded-[40px] p-10">
          <Form form={form} layout="vertical" onFinish={onFinish}>

            <Form.Item
              name="username"
              label={t('username_label', 'Foydalanuvchi nomi')}
              rules={[
                { required: true, message: t('username_required', 'Iltimos, foydalanuvchi nomini kiriting!') },
                { min: 3, message: t('username_min', "Kamida 3 ta belgi bo'lishi kerak!") },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t('username_placeholder', "Foydalanuvchi nomingiz")}
                className="neu-pressed rounded-[20px]"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t('password_label', 'Parol')}
              rules={[
                { required: true, message: t('password_required', 'Iltimos, parolingizni kiriting!') },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
                  message: t('password_pattern', "Parol kamida 8 ta belgi, 1 katta harf, 1 kichik harf, 1 son va 1 maxsus belgi bo'lishi kerak!"),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('password_placeholder', "Parolingiz")}
                className="neu-pressed rounded-[20px]"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={t('confirm_password_label', 'Parolni tasdiqlang')}
              dependencies={['password']}
              rules={[
                { required: true, message: t('confirm_required', 'Iltimos, parolni tasdiqlang!') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t('password_mismatch', "Parollar bir xil emas!"))
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('confirm_placeholder', "Parolni qaytaring")}
                className="neu-pressed rounded-[20px]"
              />
            </Form.Item>

            <Button
              htmlType="submit"
              loading={loading}
              icon={<UserAddOutlined />}
              className="w-full neu-convex h-14 rounded-full border-none text-lg font-black uppercase"
            >
              {t('register_btn', "Ro'yxatdan o'tish")}
            </Button>

          </Form>

          <div className="text-center mt-6">
            <span className="neu-text opacity-60 text-sm">
              {t('already_have_account', "Akkauntingiz bormi?")}{' '}
            </span>
            <Link to="/login" className="text-blue-500 font-bold text-sm hover:underline">
              {t('login_link', "Kirish")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
