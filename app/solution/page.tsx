"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShoppingCart, FileText, Package, CreditCard, FileCheck, Smartphone, Monitor, Tablet, Store, Zap, BarChart3, Building2 } from 'lucide-react';

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
  badge: { vi: 'Giải pháp POS', en: 'POS Solutions', ko: 'POS 솔루션', zh: 'POS解决方案', ja: 'POSソリューション' },
  heroTitle: { vi: 'GIẢI PHÁP POS VÀ KẾ TOÁN CHO HỘ KINH DOANH', en: 'POS AND ACCOUNTING SOLUTIONS FOR SMALL BUSINESSES', ko: '소규모 비즈니스를 위한 POS 및 회계 솔루션', zh: '小型企业POS和会计解决方案', ja: '小規模ビジネス向けPOS・会計ソリューション' },
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
  chainBadge: { vi: 'Mô hình chuỗi', en: 'Chain Model', ko: '체인 모델', zh: '连锁模式', ja: 'チェーンモデル' },
  chainTitle: { vi: 'GIẢI PHÁP POS CHO MÔ HÌNH CHUỖI FnB & RETAIL', en: 'POS SOLUTION FOR FnB & RETAIL CHAIN MODEL', ko: 'F&B 및 소매 체인 모델을 위한 POS 솔루션', zh: 'F&B和零售连锁模式的POS解决方案', ja: 'F&B・小売チェーンモデル向けPOSソリューション' },
  chainDesc: { vi: 'Dành cho các doanh nghiệp vừa và nhỏ đang vận hành nhiều chi nhánh, cần quản lý đồng nhất dữ liệu bán hàng, khách hàng, và tồn kho trên toàn hệ thống.', en: 'For small and medium enterprises operating multiple branches, needing unified management of sales data, customers, and inventory across the entire system.', ko: '여러 지점을 운영하는 중소기업을 위해 전체 시스템에서 판매 데이터, 고객 및 재고를 통합 관리해야 합니다.', zh: '适用于运营多个分支机构的中小型企业，需要在整个系统中统一管理销售数据、客户和库存。', ja: '複数の支店を運営する中小企業向けで、システム全体で販売データ、顧客、在庫の統一管理が必要です。' },
  
  chainFeature1: { vi: 'Quản lý chuỗi cửa hàng', en: 'Chain Store Management', ko: '체인점 관리', zh: '连锁店管理', ja: 'チェーン店管理' },
  chainFeature2: { vi: 'Tích hợp sàn sàng', en: 'Marketplace Integration', ko: '마켓플레이스 통합', zh: '市场集成', ja: 'マーケットプレイス統合' },
  chainFeature3: { vi: 'Bán hàng và CSKH', en: 'Sales & Customer Service', ko: '판매 및 고객 서비스', zh: '销售和客户服务', ja: '販売・カスタマーサービス' },
  chainFeature4: { vi: 'Báo cáo quản trị', en: 'Management Reports', ko: '관리 보고서', zh: '管理报告', ja: '管理レポート' },
  
  chainValue: { vi: 'Giúp doanh nghiệp quản trị thông nhất – kiểm soát toàn bộ chuỗi – nâng cao hiệu suất và trải nghiệm khách hàng.', en: 'Help businesses manage uniformly – control the entire chain – enhance performance and customer experience.', ko: '기업이 통일적으로 관리하고 전체 체인을 제어하며 성능과 고객 경험을 향상시킵니다.', zh: '帮助企业统一管理 – 控制整个链条 – 提高性能和客户体验。', ja: '企業が統一的に管理し、チェーン全体を制御し、パフォーマンスと顧客体験を向上させるのを支援します。' },
  
  // Platform Section
  platformBadge: { vi: 'Nền tảng tổng hợp', en: 'Integrated Platform', ko: '통합 플랫폼', zh: '集成平台', ja: '統合プラットフォーム' },
  platformTitle: { vi: 'NỀN TẢNG QUẢN TRỊ DOANH NGHIỆP TOÀN DIỆN', en: 'COMPREHENSIVE BUSINESS MANAGEMENT PLATFORM', ko: '종합 비즈니스 관리 플랫폼', zh: '全面的业务管理平台', ja: '総合ビジネス管理プラットフォーム' },
  platformDesc: { vi: 'Hệ thống nền tảng tích hợp toàn diện cho doanh nghiệp quy mô lớn hoặc tổ chức có nhu cầu quản trị tập trung, kết nối nhiều bộ phận và hệ thống khác nhau trong cùng một hạ tầng số.', en: 'Comprehensive integrated platform system for large enterprises or organizations requiring centralized management, connecting multiple departments and different systems within the same digital infrastructure.', ko: '중앙 집중식 관리가 필요한 대기업 또는 조직을 위한 포괄적인 통합 플랫폼 시스템으로 동일한 디지털 인프라 내에서 여러 부서와 다른 시스템을 연결합니다.', zh: '面向大型企业或需要集中管理的组织的综合集成平台系统，在同一数字基础设施内连接多个部门和不同系统。', ja: '大企業または集中管理を必要とする組織向けの包括的な統合プラットフォームシステムで、同じデジタルインフラストラクチャ内で複数の部門と異なるシステムを接続します。' },
  
  platformValue: { vi: 'Chuẩn hóa quy trình – tối ưu nguồn lực – tăng hiệu quả vận hành – tạo nền tảng chuyển đổi số bền vững.', en: 'Standardize processes – optimize resources – increase operational efficiency – create a sustainable digital transformation foundation.', ko: '프로세스 표준화 – 리소스 최적화 – 운영 효율성 증대 – 지속 가능한 디지털 전환 기반 구축.', zh: '标准化流程 – 优化资源 – 提高运营效率 – 创建可持续的数字化转型基础。', ja: 'プロセスの標準化 – リソースの最適化 – 運営効率の向上 – 持続可能なデジタルトランスフォーメーション基盤の構築。' },
};

export default function SolutionPage() {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>

      {/* Header */}
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Hero Section - Small Business POS */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 rounded-full text-sm font-bold mb-8 text-white shadow-lg hover:shadow-xl transition-all">
            <ShoppingCart className="w-5 h-5" />
            <span className="uppercase tracking-wide">{t('badge')}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent leading-tight animate-gradient">
            {t('heroTitle')}
          </h1>

          <p className="text-lg md:text-xl max-w-5xl mx-auto mb-16 text-gray-700 leading-relaxed">
            {t('heroDesc')}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-16">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:scale-105">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-blue-600" strokeWidth={2.5} />
              <p className="text-gray-800 font-bold text-sm">{t('feature1Title')}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:scale-105">
              <FileText className="w-12 h-12 mx-auto mb-4 text-indigo-600" strokeWidth={2.5} />
              <p className="text-gray-800 font-bold text-sm">{t('feature2Title')}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:scale-105">
              <Package className="w-12 h-12 mx-auto mb-4 text-purple-600" strokeWidth={2.5} />
              <p className="text-gray-800 font-bold text-sm">{t('feature3Title')}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:scale-105">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-blue-600" strokeWidth={2.5} />
              <p className="text-gray-800 font-bold text-sm">{t('feature4Title')}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:scale-105">
              <FileCheck className="w-12 h-12 mx-auto mb-4 text-indigo-600" strokeWidth={2.5} />
              <p className="text-gray-800 font-bold text-sm">{t('feature5Title')}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:scale-105">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-purple-600" strokeWidth={2.5} />
              <p className="text-gray-800 font-bold text-sm">{t('feature6Title')}</p>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-blue-200 shadow-xl max-w-5xl mx-auto">
            <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t('valueTitle')}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{t('valueDesc')}</p>
          </div>
        </div>
      </section>

      {/* Device Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 rounded-full text-sm font-bold mb-6 text-white shadow-lg">
              <Monitor className="w-5 h-5" />
              <span className="uppercase tracking-wide">{t('deviceBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-6 animate-gradient">
              {t('deviceTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('deviceDesc')}
            </p>
          </div>

          {/* Devices Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Device 1 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center justify-center mb-6 h-32">
                <Smartphone className="w-24 h-24 text-blue-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 text-center">{t('device1')}</h3>
              <p className="text-gray-600 text-center whitespace-pre-line text-sm leading-relaxed">{t('device1Desc')}</p>
            </div>

            {/* Device 2 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center justify-center mb-6 h-32">
                <Tablet className="w-24 h-24 text-indigo-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 text-center">{t('device2')}</h3>
              <p className="text-gray-600 text-center whitespace-pre-line text-sm leading-relaxed">{t('device2Desc')}</p>
            </div>

            {/* Device 3 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center justify-center mb-6 h-32">
                <Monitor className="w-24 h-24 text-purple-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 text-center">{t('device3')}</h3>
              <p className="text-gray-600 text-center whitespace-pre-line text-sm leading-relaxed">{t('device3Desc')}</p>
            </div>

            {/* Device 4 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center justify-center mb-6 h-32">
                <Monitor className="w-20 h-20 text-blue-600 mr-2" strokeWidth={1.5} />
                <Tablet className="w-16 h-16 text-indigo-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 text-center">{t('device4')}</h3>
              <p className="text-gray-600 text-center whitespace-pre-line text-sm leading-relaxed">{t('device4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chain Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-sm font-bold mb-6 text-white shadow-lg">
              <Store className="w-5 h-5" />
              <span className="uppercase tracking-wide">{t('chainBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6 animate-gradient">
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
              <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">{t('chainFeature1')}</h3>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all hover:scale-105">
              <Zap className="w-16 h-16 mx-auto mb-4 text-pink-600" strokeWidth={2} />
              <h3 className="text-xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-center">{t('chainFeature2')}</h3>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all hover:scale-105">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-purple-600" strokeWidth={2} />
              <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">{t('chainFeature3')}</h3>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all hover:scale-105">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-pink-600" strokeWidth={2} />
              <h3 className="text-xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-center">{t('chainFeature4')}</h3>
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
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-gradient">
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
              <h3 className="text-lg font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 uppercase">LOYALTY</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Acquire new customers</p>
                <p>• Earn & Burn Points</p>
                <p>• Voucher & Rewards</p>
                <p>• Tech Customization</p>
              </div>
            </div>

            {/* Store Operation */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 uppercase">STORE OPERATION</h3>
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
              <h3 className="text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 uppercase">HEAD OFFICE MANAGEMENT</h3>
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
              <h3 className="text-lg font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4 uppercase">ACCOUNTING</h3>
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
              <h3 className="text-lg font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 uppercase">ONLINE SALES</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Web Order</p>
                <p>• GrabFood</p>
                <p>• Facebook</p>
                <p>• Zalo OA</p>
              </div>
            </div>

            {/* API Int */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all">
              <h3 className="text-lg font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4 uppercase">API INT</h3>
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
              <h3 className="text-lg font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 uppercase">3RD HUB</h3>
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
              <h3 className="text-lg font-black bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-4 uppercase">INFRA</h3>
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
