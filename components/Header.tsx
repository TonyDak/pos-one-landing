"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, ChevronDown, Menu, X } from "lucide-react";
import ConsultationForm from "./ConsultationForm";

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
  home: { vi: 'Trang chủ', en: 'Home', ko: '홈', zh: '首页', ja: 'ホーム' },
  customers: { vi: 'Khách hàng', en: 'Customers', ko: '고객', zh: '客户', ja: '顧客' },
  solutions: { vi: 'Giải pháp', en: 'Solutions', ko: '솔루션', zh: '解决方案', ja: 'ソリューション' },
  aiTransformation: { vi: 'AI Transformation', en: 'AI Transformation', ko: 'AI 트랜스포메이션', zh: 'AI转型', ja: 'AI変革' },
  login: { vi: 'KAS POS', en: 'KAS POS', ko: 'KAS POS', zh: 'KAS POS', ja: 'KAS POS' },
  register: { vi: 'POSONE', en: 'POSONE', ko: 'POSONE', zh: 'POSONE', ja: 'POSONE' },
  trial: { vi: 'Đăng ký tư vấn', en: 'Request Consultation', ko: '상담 요청', zh: '请求咨询', ja: '相談をリクエスト' },
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
  const [consultationFormOpen, setConsultationFormOpen] = useState(false);

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
              <div className="w-14 h-14 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://api-kom.kas.asia/api/uploads/chat_image/Logo_KAS_1751350227987.png"
                  alt="KAS Logo"
                  className="w-14 h-14 object-contain"
                />
                {/* <span className="text-2xl font-bold text-blue-600">KAS</span> */}
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
              {/* <Link href="/ai-transformation" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
                {t('aiTransformation')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link> */}

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

              <Link 
                href="https://kaspos.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10">{t('login')}</span>
              </Link>
              <Link
                href="https://posone.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10">{t('register')}</span>
              </Link>
              <button
                onClick={() => setConsultationFormOpen(true)}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{t('trial')}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
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
              {/* trang chủ */}
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('home')}
              </Link>

              <Link
                href="/customer"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('customers')}
              </Link>
              <Link
                href="/solution"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('solutions')}
              </Link>
              {/* <Link
                href="/ai-transformation"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={handleMobileMenuClose}
              >
                {t('aiTransformation')}
              </Link> */}

              {/* Divider */}
              <div className="my-4 border-t border-gray-200"></div>

              {/* CTA Buttons */}
              <Link
                href="https://kaspos.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block px-4 py-3.5 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl overflow-hidden"
                onClick={handleMobileMenuClose}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10">{t('login')}</span>
              </Link>
              <Link
                href="https://posone.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block px-4 py-3.5 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl overflow-hidden"
                onClick={handleMobileMenuClose}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10">{t('register')}</span>
              </Link>
              <button
                onClick={() => {
                  handleMobileMenuClose();
                  setConsultationFormOpen(true);
                }}
                className="group relative block w-full px-4 py-3.5 text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{t('trial')}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

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

      {/* Consultation Form Modal */}
      <ConsultationForm 
        isOpen={consultationFormOpen}
        onClose={() => setConsultationFormOpen(false)}
        language={language}
      />
    </>
  );
}
