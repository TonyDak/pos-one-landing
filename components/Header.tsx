"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, ChevronDown, Menu, X } from "lucide-react";

type Language = 'vi' | 'en' | 'ko' | 'zh' | 'ja';

interface Translations {
  [key: string]: {
    vi: string;
    en: string;
    ko: string;
    zh: string;
    ja: string;
  };
}

const translations: Translations = {
  customers: { vi: 'Khách hàng', en: 'Customers', ko: '고객', zh: '客户', ja: '顧客' },
  solutions: { vi: 'Giải pháp', en: 'Solutions', ko: '솔루션', zh: '解决方案', ja: 'ソリューション' },
  aiTransformation: { vi: 'AI Transformation', en: 'AI Transformation', ko: 'AI 트랜스포메이션', zh: 'AI转型', ja: 'AI変革' },
  login: { vi: 'Đăng nhập', en: 'Login', ko: '로그인', zh: '登录', ja: 'ログイン' },
  register: { vi: 'Đăng ký', en: 'Register', ko: '등록', zh: '注册', ja: '登録' },
  trial: { vi: 'Yêu cầu dùng thử', en: 'Request Trial', ko: '체험 신청', zh: '申请试用', ja: 'トライアル申請' },
  language: { vi: 'Ngôn ngữ', en: 'Language', ko: '언어', zh: '语言', ja: '言語' },
};

const languages = [
  { code: 'vi' as Language, flag: '🇻🇳', name: 'Tiếng Việt' },
  { code: 'en' as Language, flag: '🇬🇧', name: 'English' },
  { code: 'ko' as Language, flag: '🇰🇷', name: '한국어' },
  { code: 'zh' as Language, flag: '🇨🇳', name: '中文' },
  { code: 'ja' as Language, flag: '🇯🇵', name: '日本語' },
];

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileLangMenuOpen, setMobileLangMenuOpen] = useState(false);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
    setMobileLangMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-md'
      } border-b border-gray-200`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-50">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-blue-600">KAS</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/customer" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                {t('customers')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/solution" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                {t('solutions')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/ai-transformation" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                {t('aiTransformation')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link 
                href="https://kas.asia"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 font-medium"
              >
                {t('login')}
              </Link>
              <Link
                href="https://kas.asia/register"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white border-2 border-blue-500 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300"
              >
                {t('register')}
              </Link>
              <Link
                href="https://kas.asia/trial"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-green-700 transition-all duration-300"
              >
                {t('trial')}
              </Link>

              {/* Desktop Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <Globe size={20} className="text-gray-700" />
                  <span className="text-sm font-medium text-gray-700 uppercase">{language}</span>
                  <ChevronDown size={16} className={`text-gray-700 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { onLanguageChange(lang.code); setLangMenuOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                          language === lang.code ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'
                        }`}
                      >
                        {lang.flag} {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 relative z-50 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {mobileMenuOpen ? (
                  <X size={24} className="text-gray-900" />
                ) : (
                  <Menu size={24} className="text-gray-900" />
                )}
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleMobileMenuClose}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-40 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Menu Header */}
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
            <span className="text-lg font-bold text-gray-900">Menu</span>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="space-y-2">
              {/* Navigation Links */}
              <Link
                href="/customers"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('customers')}
              </Link>
              <Link
                href="/solutions"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('solutions')}
              </Link>
              <Link
                href="/ai-transformation"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('aiTransformation')}
              </Link>

              {/* Divider */}
              <div className="my-4 border-t border-gray-200"></div>

              {/* CTA Buttons */}
              <Link
                href="https://kas.asia"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                onClick={handleMobileMenuClose}
              >
                {t('login')}
              </Link>
              <Link
                href="https://kas.asia/register"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-center bg-white border-2 border-blue-500 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('register')}
              </Link>
              <Link
                href="https://kas.asia/trial"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-center bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold hover:from-teal-600 hover:to-green-700 transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('trial')}
              </Link>

              {/* Language Selector */}
              <div className="mt-6">
                <button
                  onClick={() => setMobileLangMenuOpen(!mobileLangMenuOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-gray-600" />
                    <span>{t('language')}</span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-600 transition-transform ${mobileLangMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Mobile Language Options */}
                <div
                  className={`mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                    mobileLangMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setMobileLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 rounded-lg transition-all flex items-center space-x-3 ${
                        language === lang.code ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="border-t border-gray-200 p-4">
            <p className="text-xs text-gray-500 text-center">
              © 2021 KAS Technology Corporation
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
