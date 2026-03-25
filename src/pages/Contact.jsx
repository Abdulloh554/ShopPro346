import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const TELEGRAM_BOT_TOKEN = '8764690347:AAETV0P4WaANQWmDQHGSgowX2Id5Q7bUn0A';
const TELEGRAM_CHAT_ID = '5781687561';

function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    const text = `📬 *New Contact Message*\n\n👤 *Name:* ${values.name}\n📞 *Phone:* ${values.phone}\n💬 *Comment:* ${values.comment}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      if (response.ok) {
        message.success(t('success_msg', 'Xabaringiz muvaffaqiyatli yuborildi!'));
        form.resetFields();
      } else {
        message.error(t('error_msg', 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.'));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      message.error(t('error_msg', 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-4 md:py-8 font-sans neu-bg">
      <div className="max-w-5xl mx-auto px-6 md:px-0">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-black neu-text uppercase tracking-tight mb-4">
            {t('contact', 'Aloqa')}
          </h1>
          <p className="text-xl neu-text font-bold mb-2">
            +998 99 830 38 23
          </p>
          <p className="neu-text opacity-70 tracking-widest text-sm uppercase font-bold">
            {t('working_hours', 'Ish vaqti 24/7')}
          </p>
        </div>

        {/* NEUMORPHIC CONTAINER */}
        <div className="neu-flat rounded-[40px] overflow-hidden">
          <div className="grid md:grid-cols-2">

            {/* Left Info Panel */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <h3 className="text-3xl font-black neu-text mb-6 uppercase tracking-wide">
                {t('contact_title', "Biz bilan bog'laning")}
              </h3>
              <p className="neu-text opacity-80 mb-10 leading-relaxed text-lg font-medium">
                {t('contact_desc', "Savollaringiz bormi yoki yordam kerakmi? Quyidagi formani to'ldiring va biz sizga tez orada javob beramiz.")}
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-6 neu-text">
                  <span className="w-14 h-14 flex items-center justify-center neu-pressed rounded-full text-2xl">
                    📍
                  </span>
                  <div className="font-bold text-lg">
                    {t('address', "Toshkent shahri, O'zbekiston")}
                  </div>
                </div>
                <div className="flex items-center gap-6 neu-text">
                  <span className="w-14 h-14 flex items-center justify-center neu-pressed rounded-full text-2xl">
                    ✉️
                  </span>
                  <div className="font-bold text-lg">
                    info@shop.uz
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="p-10 md:p-14">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                className="[&_.ant-form-item-label>label]:neu-text [&_.ant-form-item-label>label]:font-black [&_.ant-form-item-label>label]:tracking-wider [&_.ant-form-item-label>label]:uppercase"
              >
                <Form.Item
                  label={t('name', 'Ism')}
                  name="name"
                  rules={[{ required: true, message: t('name_required', 'Iltimos, ismingizni kiriting!') }]}
                >
                  <Input
                    size="large"
                    placeholder={t('name_placeholder', 'Sizning ismingiz')}
                    className="neu-pressed neu-text border-none py-4 px-6 rounded-[20px] shadow-none !bg-transparent placeholder:opacity-50 font-medium text-lg"
                  />
                </Form.Item>

                <Form.Item
                  label={t('phone', 'Telefon raqam')}
                  name="phone"
                  rules={[
                    { required: true, message: t('phone_required', 'Iltimos, telefon raqamingizni kiriting!') }
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="+998 90 123 45 67"
                    className="    neu-pressed neu-text border-none py-4 px-6 rounded-[20px]
    shadow-none !bg-transparent
    text-gray-900 dark:text-white
    placeholder:opacity-50 dark:placeholder:text-gray-400
    font-medium text-lg"
                  />
                </Form.Item>

                <Form.Item
                  label={t('message', 'Xabar')}
                  name="comment"
                  rules={[{ required: true, message: t('message_required', 'Iltimos, xabaringizni yozing!') }]}
                >
                  <Input.TextArea
                    size="large"
                    rows={4}
                    placeholder={t('message_placeholder', 'Xabaringizni shu yerga yozing...')}
                    className="neu-pressed neu-text border-none py-4 px-6 rounded-[20px] shadow-none !bg-transparent placeholder:opacity-50 font-medium text-lg"
                  />
                </Form.Item>

                <Form.Item className="mb-0 pt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    icon={<SendOutlined />}
                    className="w-full neu-convex border-none h-16 text-lg font-black rounded-full text-blue-500 hover:text-blue-400 active:neu-pressed active:text-blue-600 transition-all uppercase tracking-widest !bg-transparent"
                  >
                    {t('send', 'Yuborish')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;