"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

type Language = 'vi' | 'en' | 'ko' | 'zh' | 'ja';

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface FormTranslations {
  [key: string]: {
    vi: string;
    en: string;
    ko: string;
    zh: string;
    ja: string;
  };
}

const formTranslations: FormTranslations = {
  title: { 
    vi: 'Đăng ký tư vấn', 
    en: 'Request Consultation', 
    ko: '상담 요청', 
    zh: '请求咨询', 
    ja: '相談をリクエスト' 
  },
  fullName: { 
    vi: 'Họ và tên', 
    en: 'Full Name', 
    ko: '이름', 
    zh: '全名', 
    ja: '氏名' 
  },
  phone: { 
    vi: 'Số điện thoại', 
    en: 'Phone Number', 
    ko: '전화번호', 
    zh: '电话号码', 
    ja: '電話番号' 
  },
  email: { 
    vi: 'Email', 
    en: 'Email', 
    ko: '이메일', 
    zh: '电子邮件', 
    ja: 'メール' 
  },
  company: { 
    vi: 'Tên công ty (nếu có)', 
    en: 'Company Name (Optional)', 
    ko: '회사명 (선택)', 
    zh: '公司名称（可选）', 
    ja: '会社名（任意）' 
  },
  businessType: { 
    vi: 'Loại hình kinh doanh', 
    en: 'Business Type', 
    ko: '사업 유형', 
    zh: '业务类型', 
    ja: 'ビジネスタイプ' 
  },
  needs: { 
    vi: 'Nhu cầu của bạn', 
    en: 'Your Needs', 
    ko: '요구사항', 
    zh: '您的需求', 
    ja: 'ご要望' 
  },
  needsPlaceholder: { 
    vi: 'Vui lòng mô tả chi tiết nhu cầu của bạn...', 
    en: 'Please describe your needs in detail...', 
    ko: '귀하의 요구 사항을 자세히 설명해 주세요...', 
    zh: '请详细描述您的需求...', 
    ja: 'ご要望を詳しく説明してください...' 
  },
  submit: { 
    vi: 'Gửi yêu cầu', 
    en: 'Submit', 
    ko: '제출', 
    zh: '提交', 
    ja: '送信' 
  },
  cancel: { 
    vi: 'Hủy', 
    en: 'Cancel', 
    ko: '취소', 
    zh: '取消', 
    ja: 'キャンセル' 
  },
  successMessage: { 
    vi: 'Cảm ơn bạn, KAS đã tiếp nhận yêu cầu và sẽ chủ động phản hồi bạn sớm nhất', 
    en: 'Thank you! KAS has received your request and will respond to you as soon as possible', 
    ko: '감사합니다! KAS가 귀하의 요청을 접수했으며 최대한 빨리 답변드리겠습니다', 
    zh: '谢谢！KAS已收到您的请求，将尽快回复您', 
    ja: 'ありがとうございます！KASがリクエストを受け取りました。できるだけ早くご返信いたします' 
  },
  required: { 
    vi: 'Vui lòng điền đầy đủ thông tin bắt buộc', 
    en: 'Please fill in all required fields', 
    ko: '필수 정보를 모두 입력해주세요', 
    zh: '请填写所有必填信息', 
    ja: '必須項目をすべて入力してください' 
  },
};

const businessTypes = {
  vi: ['Nhà hàng / Quán ăn', 'Cửa hàng bán lẻ', 'Siêu thị / Cửa hàng tiện lợi', 'Spa / Salon', 'Khách sạn', 'Cafe / Trà sữa', 'Chuỗi cửa hàng', 'Khác'],
  en: ['Restaurant / Eatery', 'Retail Store', 'Supermarket / Convenience Store', 'Spa / Salon', 'Hotel', 'Cafe / Tea Shop', 'Chain Store', 'Other'],
  ko: ['레스토랑 / 식당', '소매점', '슈퍼마켓 / 편의점', '스파 / 살롱', '호텔', '카페 / 티샵', '체인점', '기타'],
  zh: ['餐厅 / 小吃店', '零售店', '超市 / 便利店', '水疗 / 美容院', '酒店', '咖啡馆 / 茶店', '连锁店', '其他'],
  ja: ['レストラン / 飲食店', '小売店', 'スーパー / コンビニ', 'スパ / サロン', 'ホテル', 'カフェ / ティーショップ', 'チェーン店', 'その他'],
};


// Custom animation classes (add to your global CSS or Tailwind config)
// .animate-modal-in { animation: modalIn 0.45s cubic-bezier(.4,0,.2,1) both; }
// .animate-modal-out { animation: modalOut 0.35s cubic-bezier(.4,0,.2,1) both; }
// .animate-overlay-in { animation: overlayIn 0.45s cubic-bezier(.4,0,.2,1) both; }
// .animate-overlay-out { animation: overlayOut 0.35s cubic-bezier(.4,0,.2,1) both; }
// .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(.4,0,.2,1) both; }
// .animate-shake { animation: shake 0.4s cubic-bezier(.4,0,.2,1); }

export default function ConsultationForm({ isOpen, onClose, language }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    businessType: '',
    needs: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');


  const t = (key: string): string => {
    return formTranslations[key]?.[language] || key;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.businessType || !formData.needs) {
      setError(t('required'));
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        company: '',
        businessType: '',
        needs: '',
      });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Overlay with gradient and fade-in/out animation */}
      <div
        className={`absolute inset-0 bg-linear-to-br from-blue-900/40 via-purple-900/40 to-indigo-900/40 backdrop-blur-md
          ${isOpen ? 'animate-overlay-in' : 'animate-overlay-out'}
          ${!isOpen ? 'pointer-events-none' : ''}`}
        onClick={onClose}
      />
      {/* Modal with fade and scale animation */}
      <div className={`relative w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden
        ${isOpen ? 'animate-modal-in' : 'animate-modal-out'}
        ${!isOpen ? 'pointer-events-none' : ''}`}
        style={{ willChange: 'opacity, transform' }}>
        {/* Decorative gradient top */}
  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Success Message with premium animation */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-white via-blue-50 to-purple-50 backdrop-blur-lg rounded-3xl z-10 animate-fadeIn">
            <div className="text-center p-8 space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50 animate-bounce-slow">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
                <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-purple-400 animate-pulse delay-75" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Thành công!
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-md mx-auto">
                  {t('successMessage')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable content wrapper */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Header with gradient background */}
          <div className="relative bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">{t('title')}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 group backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Decorative wave */}
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 48H1440V24C1440 24 1200 0 720 0C240 0 0 24 0 24V48Z" fill="white"/>
            </svg>
          </div>

          {/* Form with premium styling */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-linear-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm font-medium animate-shake">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* ...existing code... */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                {t('fullName')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>

            {/* ...existing code... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                  {t('phone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                  placeholder="0912345678"
                  required
                />
              </div>

              {/* ...existing code... */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                  {t('email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* ...existing code... */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                {t('company')}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                placeholder="Công ty TNHH ABC"
              />
            </div>

            {/* ...existing code... */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                {t('businessType')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 hover:border-gray-300 appearance-none bg-white cursor-pointer"
                  required
                >
                  <option value="">-- {t('businessType')} --</option>
                  {businessTypes[language].map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* ...existing code... */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                {t('needs')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="needs"
                value={formData.needs}
                onChange={handleChange}
                rows={4}
                placeholder={t('needsPlaceholder')}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                required
              />
            </div>

            {/* ...existing code... */}
            <div className="flex gap-4 pt-6">
                <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 bg-gray-50 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                {t('cancel')}
                </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                {isSubmitting ? (
                  <span className="flex items-center justify-center relative z-10">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('submit')}...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center">
                    {t('submit')}
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
