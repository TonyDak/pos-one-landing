"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShoppingCart, FileText, Package, CreditCard, FileCheck, Smartphone, Monitor, Tablet, Store, Zap, BarChart3, Building2, Sparkles, TrendingUp, ArrowRight, Leaf } from 'lucide-react';

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
  // Hero Section
  badge: { vi: 'GIẢI PHÁP POSONE', en: 'POSONE SOLUTION', ko: 'POSONE 솔루션', zh: 'POSONE解决方案', ja: 'POSONEソリューション' },
  heroTitle: { vi: 'GIẢI PHÁP BÁN HÀNG, XUẤT HÓA ĐƠN ĐIỆN TỬ VÀ KẾ TOÁN CHO HỘ KINH DOANH', en: 'SALES, E-INVOICE, AND ACCOUNTING SOLUTION FOR SMALL BUSINESSES', ko: '소규모 비즈니스를 위한 판매, 전자 송장 및 회계 솔루션', zh: '面向小型企业的销售、电子发票和会计解决方案', ja: '小規模ビジネス向けの販売、電子請求書、会計ソリューション' },
  heroDesc: { vi: 'Giải pháp được thiết kế dành riêng cho hộ kinh doanh nhỏ, quán ăn, cửa hàng tiện lợi, salon, tiệm cà phê... – nơi chủ kinh doanh vừa là người bán hàng, vừa quản lý vận hành.', en: 'Solutions designed specifically for small businesses, restaurants, convenience stores, salons, coffee shops... – where the owner is both the seller and manager.', ko: '소규모 비즈니스, 레스토랑, 편의점, 살롱, 카페... – 소유자가 판매자이자 관리자인 곳을 위해 특별히 설계된 솔루션.', zh: '专为小型企业、餐厅、便利店、沙龙、咖啡店等设计的解决方案... – 所有者既是销售者又是管理者。', ja: '小規模ビジネス、レストラン、コンビニ、サロン、カフェ向けに特別に設計されたソリューション... – オーナーが販売者であり管理者である場所。' },
  
  // Features Section
  feature1Title: { vi: 'Bán hàng nhanh chóng', en: 'Fast Sales', ko: '빠른 판매', zh: '快速销售', ja: '迅速な販売' },
  feature2Title: { vi: 'Kế toán Hộ kinh doanh', en: 'Small Business Accounting', ko: '소규모 비즈니스 회계', zh: '小型企业会计', ja: '小規模ビジネス会計' },
  feature3Title: { vi: 'Quản lý kho & sản phẩm', en: 'Inventory & Product Management', ko: '재고 및 제품 관리', zh: '库存和产品管理', ja: '在庫・製品管理' },
  feature4Title: { vi: 'Thanh toán Online', en: 'Online Payment', ko: '온라인 결제', zh: '在线支付', ja: 'オンライン決済' },
  feature5Title: { vi: 'Xuất hóa đơn điện tử', en: 'E-Invoice', ko: '전자 송장', zh: '电子发票', ja: '電子請求書' },
  feature6Title: { vi: 'Quản lý trên dụng Mobile', en: 'Mobile Management', ko: '모바일 관리', zh: '移动管理', ja: 'モバイル管理' },
  
  valueTitle: { vi: 'Giá trị mang lại:', en: 'Value Proposition:', ko: '가치 제안:', zh: '价值主张:', ja: '価値提案:' },
  valueDesc: { vi: 'Tối giản vận hành – kiểm soát doanh thu – giảm sai sót ghi chép – dễ dùng ngay cả với người không rành công nghệ.', en: 'Streamlined operations – revenue control – reduced errors – easy to use even for non-tech users.', ko: '간소화된 운영 – 수익 통제 – 오류 감소 – 비기술 사용자도 쉽게 사용.', zh: '简化运营 – 收入控制 – 减少错误 – 非技术用户也易于使用。', ja: '効率的な運営 – 収益管理 – エラー削減 – 非技術ユーザーでも簡単に使用。' },
  
  // Device Section
  deviceBadge: { vi: 'Thiết bị hỗ trợ', en: 'Supported Devices', ko: '지원 장치', zh: '支持的设备', ja: 'サポートデバイス' },
  deviceTitle: { vi: 'POS ONE được xây dựng trên đa nền tảng', en: 'POS ONE built on multi-platform', ko: '다중 플랫폼으로 구축된 POS ONE', zh: 'POS ONE构建于多平台', ja: 'マルチプラットフォームで構築されたPOS ONE' },
  deviceDesc: { vi: 'cho phép ứng dụng hoạt động trên mọi thiết bị mà bạn muốn sử dụng.', en: 'allowing the application to work on any device you want to use.', ko: '원하는 모든 기기에서 애플리케이션을 사용할 수 있습니다.', zh: '允许应用程序在您想要使用的任何设备上运行。', ja: '使用したい任意のデバイスでアプリケーションを動作させることができます。' },
  
  device1: { vi: 'SMARTPHONE VÀ MOBILE PRINTER', en: 'SMARTPHONE & MOBILE PRINTER', ko: '스마트폰 및 모바일 프린터', zh: '智能手机和移动打印机', ja: 'スマートフォンとモバイルプリンター' },
  device1Desc: { vi: 'Bán hàng trên smartphone\nOption: Máy in cầm tay', en: 'Sell on smartphone\nOption: Handheld printer', ko: '스마트폰으로 판매\n옵션: 핸드헬드 프린터', zh: '在智能手机上销售\n选项：手持打印机', ja: 'スマートフォンで販売\nオプション：ハンドヘルドプリンター' },
  
  device2: { vi: 'SMARTPOS', en: 'SMARTPOS', ko: 'SMARTPOS', zh: 'SMARTPOS', ja: 'SMARTPOS' },
  device2Desc: { vi: 'Bán hàng trên thiết bị SmartPOS', en: 'Sell on SmartPOS device', ko: 'SmartPOS 기기로 판매', zh: '在SmartPOS设备上销售', ja: 'SmartPOSデバイスで販売' },
  
  device3: { vi: 'MÁY POS BÁN HÀNG', en: 'POS MACHINE', ko: 'POS 기기', zh: 'POS机', ja: 'POS機' },
  device3Desc: { vi: 'Bán hàng trên máy POS', en: 'Sell on POS machine', ko: 'POS 기기로 판매', zh: '在POS机上销售', ja: 'POS機で販売' },
  
  device4: { vi: 'LAPTOP/PC', en: 'LAPTOP/PC', ko: '노트북/PC', zh: '笔记本电脑/PC', ja: 'ノートPC/PC' },
  device4Desc: { vi: 'Bán hàng trên thiết bị khác\n(phần mềm chạy trên web)', en: 'Sell on other devices\n(web-based software)', ko: '다른 기기로 판매\n(웹 기반 소프트웨어)', zh: '在其他设备上销售\n(基于网络的软件)', ja: '他のデバイスで販売\n(Webベースのソフトウェア)' },
  
  // Chain Section
  chainBadge: { vi: 'GIẢI PHÁP KAS POS', en: 'KAS POS SOLUTION', ko: 'KAS POS 솔루션', zh: 'KAS POS解决方案', ja: 'KAS POSソリューション' },
  chainTitle: { vi: 'GIẢI PHÁP POS CHO FnB, RETAIL, SERVICE', en: 'POS SOLUTION FOR FnB, RETAIL, SERVICE', ko: 'FnB, 소매, 서비스용 POS 솔루션', zh: '面向FnB、零售、服务的POS解决方案', ja: 'FnB、小売、サービス向けのPOSソリューション' },
  chainDesc: { vi: 'Đồng hành cùng sự phát triển của Doanh nghiệp từ Seed - Bloom - Thrive - Legacy', en: 'Accompanying the development of Businesses from Seed - Bloom - Thrive - Legacy', ko: 'Seed - Bloom - Thrive - Legacy에서 비즈니스 개발 동반', zh: '伴随企业从种子-开花-繁荣-传承的发展', ja: 'Seed - Bloom - Thrive - Legacyからビジネスの発展を伴う' },
  
  chainFeature1: { vi: 'Quản lý chuỗi cửa hàng', en: 'Chain Store Management', ko: '체인점 관리', zh: '连锁店管理', ja: 'チェーン店管理' },
  chainFeature2: { vi: 'Tích hợp nhiều nền tảng', en: 'Multi-Platform Integration', ko: '다중 플랫폼 통합', zh: '多平台集成', ja: 'マルチプラットフォーム統合' },
  chainFeature3: { vi: 'Điều hành tập trung', en: 'Centralized Operations', ko: '중앙 집중식 운영', zh: '集中运营', ja: '集中運営' },
  chainFeature4: { vi: 'Báo cáo quản trị sâu sắc', en: 'In-depth Management Reporting', ko: '심층 관리 보고', zh: '深入的管理报告', ja: '詳細な管理レポート' },
  
  chainValue: { vi: 'Quản trị tập trung trong 1 giải pháp toàn diện', en: 'Centralized management in a comprehensive solution', ko: '포괄적인 솔루션의 중앙 집중식 관리', zh: '综合解决方案中的集中管理', ja: '包括的なソリューションでの集中管理' },
  
  // Platform Section
  platformBadge: { vi: 'GIẢI PHÁP KAS ERP', en: 'KAS ERP SOLUTION', ko: 'KAS ERP 솔루션', zh: 'KAS ERP解决方案', ja: 'KAS ERPソリューション' },
  platformTitle: { vi: 'GIẢI PHÁP ERP CHUYÊN CHO NGÀNH FnB, RETAIL, SERVICES', en: 'ERP SOLUTION FOR FnB, RETAIL, SERVICES', ko: 'FnB, 소매, 서비스용 ERP 솔루션', zh: '面向FnB、零售、服务的ERP解决方案', ja: 'FnB、小売、サービス向けのERPソリューション' },
  platformDesc: { vi: 'GIẢI PHÁP ERP CHUYÊN CHO NGÀNH FnB, RETAIL, SERVICES', en: 'ERP SOLUTION FOR FnB, RETAIL, SERVICES', ko: 'FnB, 소매, 서비스용 ERP 솔루션', zh: '面向FnB、零售、服务的ERP解决方案', ja: 'FnB、小売、サービス向けのERPソリューション' },
  
  platformValue: { vi: 'Doanh ngiệp tăng hiệu quả vận hành, ra quyết định nhanh hơn và tạo lợi thế cạnh tranh bền vững trong kỹ nguyên số', en: 'Businesses increase operational efficiency, make faster decisions, and create sustainable competitive advantages in the digital age', ko: '기업은 운영 효율성을 높이고 더 빠른 의사 결정을 내리며 디지털 시대에 지속 가능한 경쟁 우위를 창출합니다', zh: '企业提高运营效率，更快地做出决策，并在数字时代创造可持续的竞争优势', ja: '企業は運用効率を高め、より迅速な意思決定を行い、デジタル時代に持続可能な競争優位性を創出します' },
};

export default function SolutionPage() {
  const [language, setLanguage] = useState<Language>('vi');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(1deg); }
          75% { transform: translateY(-15px) rotate(-1deg); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4),
                        0 0 40px rgba(34, 197, 94, 0.2); 
          }
          50% { 
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6),
                        0 0 60px rgba(34, 197, 94, 0.3),
                        0 0 80px rgba(34, 197, 94, 0.1); 
          }
        }
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        .card-3d:hover {
          transform: translateY(-8px) rotateX(2deg);
        }
        .text-shadow-glow {
          text-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Header */}
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Hero Section - POSONE với màu xanh lá */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Background with Green Theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-green-100/30 to-transparent -z-10 animate-gradient" />
        
        {/* Animated Orbs with Parallax Effect - Green Theme */}
        <div 
          className="absolute top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-green-400/30 to-emerald-400/20 rounded-full blur-3xl -z-10 animate-float"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-3xl -z-10 animate-float" 
          style={{animationDelay: '1s', transform: `translateY(${scrollY * 0.2}px)`}} 
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl -z-10 animate-float" 
          style={{animationDelay: '2s', transform: `translateY(${scrollY * 0.25}px)`}} 
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMTk3LCA5NCwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 -z-10" />

        <div className={`max-w-7xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Badge - Green Theme with Glow */}
          <div className="inline-flex items-center gap-3 glass-effect bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-green-500 px-8 py-4 rounded-full text-lg font-bold mb-8 shadow-2xl animate-fade-in-scale border border-white/20">
            <Leaf className="w-6 h-6 animate-bounce-subtle" />
            <span className="uppercase tracking-wide text-xl">{t('badge')}</span>
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          {/* Main Title - Green Gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="inline-block animate-slide-up bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient text-shadow-glow">
              {t('heroTitle')}
            </span>
          </h1>

          {/* Subtitle with Stagger */}
          <p className="text-lg md:text-xl max-w-5xl mx-auto mb-16 text-gray-700 leading-relaxed animate-slide-up stagger-1 font-medium">
            {t('heroDesc')}
          </p>

          {/* Features Grid - Enhanced with 3D Effects and Green Theme */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-16 animate-fade-in-up stagger-2">
            <div className="group relative glass-effect bg-white/90 rounded-3xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 card-3d overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-gray-800 font-bold text-sm leading-tight">{t('feature1Title')}</p>
              </div>
            </div>

            <div className="group relative glass-effect bg-white/90 rounded-3xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 card-3d overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-gray-800 font-bold text-sm leading-tight">{t('feature2Title')}</p>
              </div>
            </div>

            <div className="group relative glass-effect bg-white/90 rounded-3xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 card-3d overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-teal-400/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-gray-800 font-bold text-sm leading-tight">{t('feature3Title')}</p>
              </div>
            </div>

            <div className="group relative glass-effect bg-white/90 rounded-3xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 card-3d overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-gray-800 font-bold text-sm leading-tight">{t('feature4Title')}</p>
              </div>
            </div>

            <div className="group relative glass-effect bg-white/90 rounded-3xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 card-3d overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileCheck className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-gray-800 font-bold text-sm leading-tight">{t('feature5Title')}</p>
              </div>
            </div>

            <div className="group relative glass-effect bg-white/90 rounded-3xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 card-3d overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-teal-400/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-gray-800 font-bold text-sm leading-tight">{t('feature6Title')}</p>
              </div>
            </div>
          </div>

          {/* Value Proposition - Enhanced Card */}
          <div className="glass-effect bg-gradient-to-br from-white/90 to-green-50/30 rounded-3xl p-10 border-2 border-green-200 shadow-2xl max-w-5xl mx-auto animate-fade-in-up stagger-3 hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{t('valueTitle')}</p>
            </div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{t('valueDesc')}</p>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce-subtle opacity-60">
            <div className="w-6 h-10 border-2 border-green-500 rounded-full mx-auto relative">
              <div className="w-1.5 h-3 bg-green-500 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Device Section - Enhanced with Glass Effects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 via-emerald-50/30 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass-effect bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-full text-sm font-bold mb-6 text-green-500 shadow-lg border border-white/20">
              <Monitor className="w-5 h-5 animate-bounce-subtle" />
              <span className="uppercase tracking-wide">{t('deviceBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 pb-1 animate-gradient text-shadow-glow">
              {t('deviceTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('deviceDesc')}
            </p>
          </div>

          {/* Devices Grid - Enhanced with 3D Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Device 1 */}
            <div className="group glass-effect bg-white/90 rounded-3xl p-8 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 card-3d animate-fade-in-up stagger-1">
              <div className="relative">
                <div className="flex items-center justify-center mb-6 h-32">
                  <div className="relative">
                    <Smartphone className="w-24 h-24 text-green-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">{t('device1')}</h3>
              <p className="text-gray-600 text-center whitespace-pre-line text-sm leading-relaxed">{t('device1Desc')}</p>
              <div className="mt-4 flex justify-center">
                <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>

            {/* Device 2 */}
            <div className="group glass-effect bg-white/90 rounded-3xl p-8 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 card-3d animate-fade-in-up stagger-2">
              <div className="relative">
                <div className="flex items-center justify-center mb-6 h-32">
                  <div className="relative">
                    <Tablet className="w-24 h-24 text-emerald-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3 text-center">{t('device2')}</h3>
              <p className="text-gray-600 text-center whitespace-pre-line text-sm leading-relaxed">{t('device2Desc')}</p>
            </div>

            {/* Device 3 */}
            <div className="group glass-effect bg-white/90 rounded-3xl p-8 border-2 border-teal-200 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 card-3d animate-fade-in-up stagger-3">
              <div className="relative">
                <div className="flex items-center justify-center mb-6 h-32">
                  <div className="relative">
                    <Monitor className="w-24 h-24 text-teal-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-3 text-center">{t('device3')}</h3>
              <p className="text-gray-600 text-center whitespace-pre-line text-sm leading-relaxed">{t('device3Desc')}</p>
              <div className="mt-4 flex justify-center">
                <ArrowRight className="w-5 h-5 text-teal-600 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>

            {/* Device 4 */}
            <div className="group glass-effect bg-white/90 rounded-3xl p-8 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 card-3d animate-fade-in-up stagger-4">
              <div className="relative">
                <div className="flex items-center justify-center mb-6 h-32">
                  <div className="relative">
                    <Monitor className="w-20 h-20 text-green-600 mr-2 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    <Tablet className="w-16 h-16 text-emerald-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3 text-center">{t('device4')}</h3>
              <p className="text-gray-600 text-center whitespace-pre-line text-sm leading-relaxed">{t('device4Desc')}</p>
              <div className="mt-4 flex justify-center">
                <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chain Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-xl font-bold mb-6 text-white shadow-lg">
              <Store className="w-7 h7-" />
              <span className="uppercase tracking-wide">{t('chainBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6 pt-2 animate-gradient">
              {t('chainTitle')}
            </h2>
            <p className="text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
              {t('chainDesc')}
            </p>
          </div>

          {/* Chain Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all hover:scale-105">
              <Store className="w-16 h-16 mx-auto mb-4 text-purple-600" strokeWidth={2} />
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">{t('chainFeature1')}</h3>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all hover:scale-105">
              <Zap className="w-16 h-16 mx-auto mb-4 text-pink-600" strokeWidth={2} />
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-center">{t('chainFeature2')}</h3>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all hover:scale-105">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-purple-600" strokeWidth={2} />
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">{t('chainFeature3')}</h3>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all hover:scale-105">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-pink-600" strokeWidth={2} />
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-center">{t('chainFeature4')}</h3>
            </div>
          </div>

          {/* Chain Value */}
          <div className="bg-white rounded-3xl p-8 border border-purple-200 shadow-xl max-w-5xl mx-auto">
            <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t('valueTitle')}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{t('chainValue')}</p>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-full text-sm font-bold mb-6 text-white shadow-lg">
              <Building2 className="w-5 h-5" />
              <span className="uppercase tracking-wide">{t('platformBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 pt-2 animate-gradient">
              {t('platformTitle')}
            </h2>
            <p className="text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed mb-12">
              {t('platformDesc')}
            </p>
          </div>

          {/* Platform Modules - Detailed View */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Loyalty */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 uppercase">LOYALTY</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Acquire new customers</p>
                <p>• Earn & Burn Points</p>
                <p>• Voucher & Rewards</p>
                <p>• Tech Customization</p>
              </div>
            </div>

            {/* Store Operation */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 uppercase">STORE OPERATION</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Booking</p>
                <p>• FDA Order</p>
                <p>• Voucher, Loyalty</p>
                <p>• E-Menu</p>
                <p>• Mobile Order</p>
                <p>• Cashier</p>
                <p>• E-Invoice</p>
                <p>• KDS</p>
                <p>• Inventory</p>
                <p>• Clock In</p>
                <p>• Payment</p>
              </div>
            </div>

            {/* Head Office */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 uppercase">HEAD OFFICE MANAGEMENT</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• System</p>
                <p>• Products</p>
                <p>• Purchase & AP</p>
                <p>• Sales & AR</p>
                <p>• O2O</p>
                <p>• Cashbook</p>
                <p>• E-Invoice</p>
                <p>• Revenue Reports</p>
                <p>• P&L Reports</p>
                <p>• Branches</p>
                <p>• Customer</p>
                <p>• Booking</p>
                <p>• BOM</p>
                <p>• Inventory</p>
                <p>• Survey</p>
                <p>• Check-in</p>
                <p>• Promotion</p>
                <p>• HR</p>
                <p>• Time Sheet</p>
                <p>• Payroll</p>
                <p>• Task/Project</p>
                <p>• Q&A/Checklist</p>
                <p>• Loyalty</p>
              </div>
            </div>

            {/* Accounting */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4 uppercase">ACCOUNTING</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• General Ledger</p>
                <p>• Tax Reports</p>
                <p>• Financial Statement</p>
                <p>• P&L</p>
              </div>
            </div>
          </div>

          {/* 3rd Party Integrations */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Online Sales */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 uppercase">ONLINE SALES</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Web Order</p>
                <p>• GrabFood</p>
                <p>• Facebook</p>
                <p>• Zalo OA</p>
              </div>
            </div>

            {/* API Int */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4 uppercase">API INT</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• SAP</p>
                <p>• ORACLE</p>
                <p>• FAST</p>
                <p>• BRAVO</p>
              </div>
            </div>
          </div>

          {/* 3RD HUB & INFRA */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 uppercase">3RD HUB</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white border border-cyan-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-cyan-400 transition-all">E-INVOICE HUB</span>
                <span className="px-4 py-2 bg-white border border-cyan-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-cyan-400 transition-all">E-PAYMENT HUB</span>
                <span className="px-4 py-2 bg-white border border-cyan-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-cyan-400 transition-all">E-VOUCHER HUB</span>
                <span className="px-4 py-2 bg-white border border-cyan-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-cyan-400 transition-all">E-SMS, CALL</span>
                <span className="px-4 py-2 bg-white border border-cyan-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-cyan-400 transition-all">E-LOGISTIC</span>
                <span className="px-4 py-2 bg-white border border-cyan-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-cyan-400 transition-all">CAMERA AI</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-4 uppercase">INFRA</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-slate-400 transition-all">VM</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-slate-400 transition-all">VPC</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-slate-400 transition-all">Load Balancer</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-slate-400 transition-all">Auto Scaling</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-slate-400 transition-all">VPN</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-slate-400 transition-all">CDN</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-slate-400 transition-all">SWAP</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-gray-700 text-sm font-semibold hover:border-slate-400 transition-all">Sun Backup</span>
              </div>
            </div>
          </div>

          {/* Platform Value */}
          <div className="bg-white rounded-3xl p-8 border border-indigo-200 shadow-xl max-w-5xl mx-auto">
            <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('valueTitle')}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{t('platformValue')}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
