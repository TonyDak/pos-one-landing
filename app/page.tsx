"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Smartphone, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Zap,
  Check,
  Star,
  Shield,
  Globe,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Package,
  CreditCard,
  Wifi,
  Database,
  Sparkles
} from "lucide-react";

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
  // Header
  features: { vi: 'Tính năng', en: 'Features', ko: '기능', zh: '功能', ja: '機能' },
  pricing: { vi: 'Bảng giá', en: 'Pricing', ko: '가격', zh: '价格', ja: '料金' },
  contact: { vi: 'Liên hệ', en: 'Contact', ko: '문의', zh: '联系', ja: 'お問い合わせ' },
  login: { vi: 'Đăng nhập', en: 'Login', ko: '로그인', zh: '登录', ja: 'ログイン' },
  demo: { vi: 'Đăng ký Demo', en: 'Request Demo', ko: '데모 신청', zh: '申请演示', ja: 'デモを申し込む' },
  
  // Hero
  badge: { vi: 'Giải pháp POS #1 tại Việt Nam', en: '#1 POS Solution in Vietnam', ko: '베트남 1위 POS 솔루션', zh: '越南第一POS解决方案', ja: 'ベトナムNo.1 POSソリューション' },
  heroTitle1: { vi: 'Phần Mềm POS ONE', en: 'POS ONE Software', ko: 'POS ONE 소프트웨어', zh: 'POS ONE 软件', ja: 'POS ONE ソフトウェア' },
  heroTitle2: { vi: 'Vận hành thông minh, phát triển vững mạnh', en: 'Operate smarter, Grow stronger', ko: '스마트 운영, 강력한 성장', zh: '智能运营，强劲增长', ja: 'スマートに運営、力強く成長' },
  heroDesc: { vi: 'Giải pháp quản lý bán hàng và vận hành chuỗi toàn diện. Tích hợp thanh toán, quản lý kho, báo cáo thông minh và kết nối đa nền tảng - tất cả trong một hệ thống.', en: 'Comprehensive retail and chain management solution. Payment integration, inventory management, smart reporting and multi-platform connectivity - all in one system.', ko: '종합 소매 및 체인 관리 솔루션. 결제 통합, 재고 관리, 스마트 리포팅 및 멀티 플랫폼 연결 - 하나의 시스템에서 모두.', zh: '全面的零售和连锁管理解决方案。支付集成、库存管理、智能报告和多平台连接 - 一站式系统。', ja: '包括的な小売およびチェーン管理ソリューション。決済統合、在庫管理、スマートレポート、マルチプラットフォーム連携 - すべて1つのシステムで。' },
  registerNow: { vi: 'Đăng ký ngay', en: 'Register Now', ko: '지금 등록', zh: '立即注册', ja: '今すぐ登録' },
  watchDemo: { vi: 'Xem Demo', en: 'Watch Demo', ko: '데모 보기', zh: '观看演示', ja: 'デモを見る' },
  
  // Stats
  stores: { vi: 'Cửa hàng', en: 'Stores', ko: '매장', zh: '门店', ja: '店舗' },
  transactions: { vi: 'Giao dịch/ngày', en: 'Transactions/day', ko: '일일 거래', zh: '每日交易', ja: '1日あたりの取引' },
  support: { vi: 'Hỗ trợ 24/7', en: '24/7 Support', ko: '24/7 지원', zh: '24/7 支持', ja: '24時間365日サポート' },
  
  // Features
  featuresBadge: { vi: 'Tính năng nổi bật', en: 'Key Features', ko: '주요 기능', zh: '主要功能', ja: '主な機能' },
  featuresTitle: { vi: 'Mọi thứ bạn cần cho', en: 'Everything You Need for', ko: '필요한 모든 것', zh: '您需要的一切', ja: '必要なすべて' },
  featuresHighlight: { vi: 'Quản lý bán hàng chuyên nghiệp', en: 'Professional Retail Management', ko: '전문 소매 관리', zh: '专业零售管理', ja: 'プロフェッショナルな小売管理' },
  
  feature1: { vi: 'Bán hàng nhanh chóng', en: 'Fast Sales', ko: '빠른 판매', zh: '快速销售', ja: '高速販売' },
  feature1Desc: { vi: 'Giao diện trực quan, thao tác nhanh. Hỗ trợ quét mã vạch, tìm kiếm sản phẩm thông minh và thanh toán đa hình thức.', en: 'Intuitive interface, fast operations. Support barcode scanning, smart product search and multiple payment methods.', ko: '직관적인 인터페이스, 빠른 작업. 바코드 스캔, 스마트 제품 검색 및 다양한 결제 방법 지원.', zh: '直观界面，快速操作。支持条码扫描、智能产品搜索和多种支付方式。', ja: '直感的なインターフェース、高速操作。バーコードスキャン、スマート商品検索、複数の決済方法に対応。' },
  
  feature2: { vi: 'Quản lý kho hàng', en: 'Inventory Management', ko: '재고 관리', zh: '库存管理', ja: '在庫管理' },
  feature2Desc: { vi: 'Kiểm soát tồn kho thời gian thực. Cảnh báo hết hàng, nhập xuất tự động và quản lý đa kho hiệu quả.', en: 'Real-time inventory control. Stock alerts, automatic import/export and efficient multi-warehouse management.', ko: '실시간 재고 통제. 재고 알림, 자동 입출고 및 효율적인 다중 창고 관리.', zh: '实时库存控制。库存警报、自动进出库和高效多仓库管理。', ja: 'リアルタイム在庫管理。在庫アラート、自動入出庫、効率的なマルチ倉庫管理。' },
  
  feature3: { vi: 'Báo cáo phân tích', en: 'Analytics & Reports', ko: '분석 및 보고서', zh: '分析与报告', ja: '分析とレポート' },
  feature3Desc: { vi: 'Dashboard trực quan với biểu đồ chi tiết. Phân tích doanh thu, sản phẩm bán chạy và xu hướng khách hàng.', en: 'Intuitive dashboard with detailed charts. Revenue analysis, best-selling products and customer trends.', ko: '상세한 차트가 있는 직관적인 대시보드. 수익 분석, 베스트셀러 제품 및 고객 트렌드.', zh: '直观的仪表板和详细图表。收入分析、畅销产品和客户趋势。', ja: '詳細なチャート付き直感的ダッシュボード。売上分析、ベストセラー商品、顧客トレンド。' },
  
  feature4: { vi: 'Quản lý khách hàng', en: 'Customer Management', ko: '고객 관리', zh: '客户管理', ja: '顧客管理' },
  feature4Desc: { vi: 'CRM tích hợp sẵn. Theo dõi lịch sử mua hàng, tích điểm thành viên và chương trình khuyến mãi tự động.', en: 'Built-in CRM. Purchase history tracking, loyalty points and automated promotion programs.', ko: '내장 CRM. 구매 이력 추적, 로열티 포인트 및 자동 프로모션 프로그램.', zh: '内置CRM。购买历史跟踪、会员积分和自动促销计划。', ja: '統合CRM。購入履歴追跡、ロイヤルティポイント、自動プロモーションプログラム。' },
  
  feature5: { vi: 'Thanh toán đa dạng', en: 'Multiple Payments', ko: '다양한 결제', zh: '多种支付', ja: '多様な決済' },
  feature5Desc: { vi: 'Kết nối với các cổng thanh toán uy tín. Hỗ trợ tiền mặt, chuyển khoản, QR Code và ví điện tử.', en: 'Connect with trusted payment gateways. Support cash, bank transfer, QR Code and e-wallets.', ko: '신뢰할 수 있는 결제 게이트웨이 연결. 현금, 계좌 이체, QR 코드 및 전자 지갑 지원.', zh: '连接可信支付网关。支持现金、银行转账、二维码和电子钱包。', ja: '信頼できる決済ゲートウェイと連携。現金、銀行振込、QRコード、電子マネーに対応。' },
  
  feature6: { vi: 'Kết nối đa nền tảng', en: 'Multi-Platform', ko: '다중 플랫폼', zh: '多平台连接', ja: 'マルチプラットフォーム' },
  feature6Desc: { vi: 'Tích hợp Grab Food, Shopee Food. Đồng bộ đơn hàng online tự động và quản lý tập trung.', en: 'Integrate with Grab Food, Shopee Food. Automatic online order sync and centralized management.', ko: 'Grab Food, Shopee Food와 통합. 자동 온라인 주문 동기화 및 중앙 관리.', zh: '集成Grab Food、Shopee Food。自动在线订单同步和集中管理。', ja: 'Grab Food、Shopee Foodと連携。自動オンライン注文同期と一元管理。' },
  
  // Pricing
  pricingBadge: { vi: 'Bảng giá ưu đãi tháng 8', en: 'August Special Pricing', ko: '8월 특별 가격', zh: '8月特惠价格', ja: '8月特別価格' },
  pricingTitle: { vi: 'Chọn gói phù hợp với quy mô cửa hàng', en: 'Choose the Right Plan for Your Store', ko: '매장에 맞는 요금제 선택', zh: '选择适合您店铺的套餐', ja: 'お店に最適なプランを選択' },
  
  basicPlan: { vi: 'Gói Basic', en: 'Basic Plan', ko: '베이직 플랜', zh: '基础套餐', ja: 'ベーシックプラン' },
  advancePlan: { vi: 'Gói Advance', en: 'Advance Plan', ko: '어드밴스 플랜', zh: '进阶套餐', ja: 'アドバンスプラン' },
  premiumPlan: { vi: 'Gói Premium', en: 'Premium Plan', ko: '프리미엄 플랜', zh: '高级套餐', ja: 'プレミアムプラン' },
  
  perStore: { vi: '/Cửa hàng/Năm', en: '/Store/Year', ko: '/매장/년', zh: '/店铺/年', ja: '/店舗/年' },
  mostPopular: { vi: 'PHỔ BIẾN NHẤT', en: 'MOST POPULAR', ko: '가장 인기있는', zh: '最受欢迎', ja: '最も人気' },
  
  promo12: { vi: 'Thuê 12 tháng tặng 3 tháng', en: 'Subscribe 12 months, get 3 months free', ko: '12개월 구독 시 3개월 무료', zh: '订购12个月送3个月', ja: '12ヶ月契約で3ヶ月無料' },
  promo24: { vi: 'Thuê 24 tháng tặng 6 tháng', en: 'Subscribe 24 months, get 6 months free', ko: '24개월 구독 시 6개월 무료', zh: '订购24个月送6个月', ja: '24ヶ月契約で6ヶ月無料' },
  
  contactHotline: { vi: 'Liên hệ Hotline 19002137 để được hỗ trợ nhanh nhất', en: 'Contact Hotline 19002137 for fastest support', ko: '가장 빠른 지원을 위해 핫라인 19002137로 연락하세요', zh: '联系热线19002137获取最快支持', ja: '最速サポートはホットライン19002137へ' },
  
  // CTA
  ctaBadge: { vi: 'Ưu đãi đặc biệt', en: 'Special Offer', ko: '특별 제안', zh: '特别优惠', ja: '特別オファー' },
  ctaTitle: { vi: 'Sẵn sàng nâng cấp cửa hàng của bạn?', en: 'Ready to upgrade your store?', ko: '매장을 업그레이드할 준비가 되셨나요?', zh: '准备好升级您的店铺了吗？', ja: 'お店をアップグレードする準備はできましたか？' },
  ctaDesc: { vi: 'Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt và trải nghiệm miễn phí 30 ngày', en: 'Register today to receive special offers and 30-day free trial', ko: '오늘 등록하여 특별 혜택과 30일 무료 체험을 받으세요', zh: '今天注册即可获得特别优惠和30天免费试用', ja: '今日登録して特別オファーと30日間無料トライアルを受け取りましょう' },
  startTrial: { vi: 'Bắt đầu dùng thử', en: 'Start Trial', ko: '체험 시작', zh: '开始试用', ja: 'トライアルを開始' },
  noCreditCard: { vi: 'Không cần thẻ tín dụng', en: 'No credit card required', ko: '신용카드 불필요', zh: '无需信用卡', ja: 'クレジットカード不要' },
  
  // Footer
  product: { vi: 'Sản phẩm', en: 'Product', ko: '제품', zh: '产品', ja: '製品' },
  company: { vi: 'Công ty', en: 'Company', ko: '회사', zh: '公司', ja: '会社' },
  about: { vi: 'Về chúng tôi', en: 'About', ko: '회사 소개', zh: '关于我们', ja: '会社概要' },
  careers: { vi: 'Tuyển dụng', en: 'Careers', ko: '채용', zh: '招聘', ja: '採用情報' },
  blog: { vi: 'Blog', en: 'Blog', ko: '블로그', zh: '博客', ja: 'ブログ' },
  helpCenter: { vi: 'Trợ giúp', en: 'Help Center', ko: '도움말 센터', zh: '帮助中心', ja: 'ヘルプセンター' },
  documentation: { vi: 'Tài liệu', en: 'Documentation', ko: '문서', zh: '文档', ja: 'ドキュメント' },
  footerDesc: { vi: 'Giải pháp POS thông minh cho cửa hàng hiện đại', en: 'Smart POS solution for modern stores', ko: '현대적인 매장을 위한 스마트 POS 솔루션', zh: '现代门店的智能POS解决方案', ja: '現代の店舗向けスマートPOSソリューション' },
  copyright: { vi: 'Tất cả các quyền được bảo lưu.', en: 'All rights reserved.', ko: '모든 권리 보유.', zh: '版权所有。', ja: '全著作権所有。' },
};

export default function POSOneLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>('vi');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (langMenuOpen && !target.closest('.language-selector')) {
        setLangMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.8); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-md'
      } border-b border-gray-200`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="https://posone.vn/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-green-500/50 overflow-hidden">
                <Image 
                  src="https://api-kom.kas.asia/api/uploads/avatar/avatar_1750042090886.png" 
                  alt="POS ONE Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-green-500">
                POS ONE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                {t('features')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                {t('pricing')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Language Selector */}
              <div className="relative language-selector">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <Globe size={20} className="text-gray-700" />
                  <span className="text-sm font-medium text-gray-700 uppercase">{language}</span>
                  <ChevronDown size={16} className={`text-gray-700 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slide-up">
                    <button
                      onClick={() => { setLanguage('vi'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${language === 'vi' ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-700'}`}
                    >
                      🇻🇳 Tiếng Việt
                    </button>
                    <button
                      onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${language === 'en' ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-700'}`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => { setLanguage('ko'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${language === 'ko' ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-700'}`}
                    >
                      🇰🇷 한국어
                    </button>
                    <button
                      onClick={() => { setLanguage('zh'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${language === 'zh' ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-700'}`}
                    >
                      🇨🇳 中文
                    </button>
                    <button
                      onClick={() => { setLanguage('ja'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${language === 'ja' ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-700'}`}
                    >
                      🇯🇵 日本語
                    </button>
                  </div>
                )}
              </div>

              <Link 
                href="https://posone.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-gray-700 hover:text-green-600 border border-gray-300 hover:border-green-500 rounded-xl transition-all duration-300 font-medium"
              >
                {t('login')}
              </Link>

              <Link 
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 font-medium"
              >
                {t('demo')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t animate-slide-up">
              <a href="#features" className="block text-gray-700 hover:text-green-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('features')}
              </a>
              <a href="#pricing" className="block text-gray-700 hover:text-green-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('pricing')}
              </a>
              
              {/* Mobile Language Selector */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <p className="text-sm font-semibold text-gray-500 px-2 mb-2">Language / 언어 / 语言 / 言語</p>
                <button
                  onClick={() => { setLanguage('vi'); setMobileMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${language === 'vi' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${language === 'en' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => { setLanguage('ko'); setMobileMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${language === 'ko' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  🇰🇷 한국어
                </button>
                <button
                  onClick={() => { setLanguage('zh'); setMobileMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${language === 'zh' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  🇨🇳 中文
                </button>
                <button
                  onClick={() => { setLanguage('ja'); setMobileMenuOpen(false); }}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${language === 'ja' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  🇯🇵 日本語
                </button>
              </div>
              
              <Link 
                href="https://posone.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl text-center font-medium hover:bg-green-50"
              >
                {t('login')}
              </Link>
              
              <Link 
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center font-medium"
              >
                {t('demo')}
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 -z-10 animate-gradient" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl -z-10 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-300/10 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '2s'}} />

        {/* Floating particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg animate-pulse-glow animate-scale-in">
            <Star size={16} fill="currentColor" className="animate-spin" style={{animationDuration: '3s'}} />
            <span>{t('badge')}</span>
            <Sparkles size={16} className="animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t('heroTitle1')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-gradient">
              {t('heroTitle2')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            {t('heroDesc')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Link
              href="https://contract.posone.vn/posone/regist"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 via-green-600 to-emerald-500 text-white rounded-xl font-bold shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center space-x-3 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Zap size={20} className="relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10">{t('registerNow')}</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="https://posone.vn/"
              className="px-8 py-4 bg-white border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center space-x-3"
            >
              <span>{t('watchDemo')}</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <ShoppingCart size={24} className="text-green-600" />
              <div className="text-left">
                <div className="font-bold text-gray-900">5,000+</div>
                <div className="text-xs text-gray-600">{t('stores')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <TrendingUp size={24} className="text-green-600" />
              <div className="text-left">
                <div className="font-bold text-gray-900">100,000+</div>
                <div className="text-xs text-gray-600">{t('transactions')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <Shield size={24} className="text-green-600" />
              <div className="text-left">
                <div className="font-bold text-gray-900">24/7</div>
                <div className="text-xs text-gray-600">{t('support')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              <Zap size={16} />
              <span>{t('featuresBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('featuresTitle')}
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                {t('featuresHighlight')}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <Smartphone size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                {t('feature1')}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t('feature1Desc')}</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <Package size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {t('feature2')}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t('feature2Desc')}</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <BarChart3 size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                {t('feature3')}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t('feature3Desc')}</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {t('feature4')}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t('feature4Desc')}</p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <CreditCard size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                {t('feature5')}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t('feature5Desc')}</p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <Wifi size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {t('feature6')}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t('feature6Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-300/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              <Star size={16} fill="currentColor" />
              <span>{t('pricingBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('pricingTitle')}
            </h2>
            <p className="text-green-600 font-semibold text-lg">{t('promo12')}</p>
            <p className="text-green-600 font-semibold text-lg">{t('promo24')}</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            {/* Basic Plan */}
            <div className="group bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('basicPlan')}</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">2,640,000 VNĐ</span>
                </div>
                <span className="text-gray-600">{t('perStore')}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Quản lý bán hàng</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Quản lý kho hàng</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Quản lý khuyến mãi</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Dashboard</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Báo cáo bán hàng</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Miễn phí 1500 hóa đơn điện tử</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Miễn phí khởi tạo hóa đơn trị giá 500K</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Miễn phí triển khai online</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Miễn phí hỗ trợ</span>
                </li>
              </ul>
              <Link 
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-center font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Đăng ký ngay!
              </Link>
            </div>

            {/* Advance Plan - Popular */}
            <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-3xl p-8 shadow-2xl shadow-green-500/40 transform md:scale-110">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold">
                {t('mostPopular')}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('advancePlan')}</h3>
              <div className="text-4xl font-bold text-white mb-6">
                3,228,000 VNĐ
                <span className="text-lg text-green-100 font-normal">{t('perStore')}</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Đầy đủ các tính năng và dịch vụ của gói Basic</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Quản lý khách hàng thành viên</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Quản lý thu chi</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Phân tích doanh thu</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Miễn phí 3000 hóa đơn điện tử</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Miễn phí khởi tạo hóa đơn trị giá 500k</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Miễn phí triển khai online</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Miễn phí hỗ trợ</span>
                </li>
              </ul>
              <Link 
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-white text-green-600 rounded-xl text-center font-bold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Đăng ký ngay!
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="group bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('premiumPlan')}</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">4,428,000 VNĐ</span>
                </div>
                <span className="text-gray-600">{t('perStore')}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Đầy đủ các tính năng và dịch vụ của gói Basic và Advance</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Kết nối Grab Food</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Kết nối Shopee Food</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Miễn phí 5000 hóa đơn điện tử</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Miễn phí khởi tạo hóa đơn trị giá 500k</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Miễn phí triển khai nội thành HCM & online</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Miễn phí hỗ trợ</span>
                </li>
              </ul>
              <Link 
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-center font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Đăng ký ngay!
              </Link>
            </div>
          </div>

          {/* Contact Banner */}
          <div className="flex items-center justify-center space-x-3 bg-green-100 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">{t('contactHotline')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-300/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
            <Sparkles size={16} />
            <span>{t('ctaBadge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-green-100 mb-12">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://contract.posone.vn/posone/regist"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              {t('startTrial')}
            </Link>
          </div>
          <p className="text-green-100 mt-6 flex items-center justify-center space-x-2">
            <Check size={20} />
            <span>{t('noCreditCard')}</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link href="https://posone.vn/" className="flex items-center space-x-3 mb-6">
                {/* <Image 
                  src="https://api-kom.kas.asia/api/uploads/avatar/avatar_1750042090886.png" 
                  alt="POS ONE Logo" 
                  width={40}
                  height={40}
                  className="transform group-hover:scale-110 transition-transform duration-300"
                /> */}
                <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  POS ONE
                </span>
              </Link>
              
              <h3 className="text-xl font-bold text-white mb-4">Công ty Cổ Phần Công Nghệ KAS</h3>
              
              <div className="space-y-3 text-gray-400">
                <p className="flex items-start">
                  <span className="font-semibold text-gray-300 mr-2">Địa chỉ:</span>
                  <span>199 Đường Nguyễn Hoàng, Phường Bình Trưng, Thành Phố Hồ Chí Minh</span>
                </p>
                <p className="flex items-start">
                  <span className="font-semibold text-gray-300 mr-2">Hotline:</span>
                  <a href="tel:19002137" className="hover:text-green-400 transition-colors">1900 2137</a>
                </p>
                <p className="flex items-start">
                  <span className="font-semibold text-gray-300 mr-2">Email:</span>
                  <a href="mailto:kas@kas.asia" className="hover:text-green-400 transition-colors">kas@kas.asia</a>
                </p>
                <p className="flex items-start">
                  <span className="font-semibold text-gray-300 mr-2">Website:</span>
                  <a href="https://kas.asia" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">kas.asia</a>
                </p>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
                {t('product')}
              </h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-green-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  {t('features')}
                </a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-green-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  {t('pricing')}
                </a></li>
                <li><Link href="https://posone.vn/" className="text-gray-400 hover:text-green-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Demo
                </Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
                Hỗ trợ
              </h4>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-gray-400 hover:text-green-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  {t('helpCenter')}
                </Link></li>
                <li><Link href="/docs" className="text-gray-400 hover:text-green-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  {t('documentation')}
                </Link></li>
                <li><a href="tel:19002137" className="text-gray-400 hover:text-green-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Liên hệ: 1900 2137
                </a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                Phát triển bởi Công ty Cổ Phần Công Nghệ KAS
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <Link href="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                  Chính sách bảo mật
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                  Điều khoản dịch vụ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
