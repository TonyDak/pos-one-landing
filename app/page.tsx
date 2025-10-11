"use client";

//trang chính kas

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Target,
  Heart,
  Gem,
  TrendingUp,
  Zap,
  Star,
  Shield,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Briefcase
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
  customers: { vi: 'Khách hàng', en: 'Customers', ko: '고객', zh: '客户', ja: '顧客' },
  solutions: { vi: 'Giải pháp', en: 'Solutions', ko: '솔루션', zh: '解决方案', ja: 'ソリューション' },
  aiTransformation: { vi: 'AI Transformation', en: 'AI Transformation', ko: 'AI 트랜스포메이션', zh: 'AI转型', ja: 'AI変革' },
  about: { vi: 'Về chúng tôi', en: 'About Us', ko: '회사 소개', zh: '关于我们', ja: '会社概要' },
  contact: { vi: 'Liên hệ', en: 'Contact', ko: '연락', zh: '联系', ja: '連絡' },
  login: { vi: 'Đăng nhập', en: 'Login', ko: '로그인', zh: '登录', ja: 'ログイン' },
  
  // Hero
  badge: { vi: 'Công nghệ hàng đầu', en: 'Leading Technology', ko: '최고의 기술', zh: '领先技术', ja: '最先端技術' },
  heroTitle: { vi: 'Công ty Cổ Phần Công Nghệ KAS', en: 'KAS Technology Corporation', ko: 'KAS 기술 주식회사', zh: 'KAS科技股份公司', ja: 'KAS テクノロジー株式会社' },
  heroSubtitle: { vi: 'Giải pháp công nghệ toàn diện', en: 'Comprehensive Technology Solutions', ko: '종합 기술 솔루션', zh: '综合技术解决方案', ja: '総合テクノロジーソリューション' },
  heroDesc: { vi: 'Đại diện theo pháp luật của doanh nghiệp: Ông Nguyễn Hữu Đồng. Cung cấp các giải pháp công nghệ tiên tiến cho doanh nghiệp hiện đại.', en: 'Legal representative: Mr. Nguyen Huu Dong. Providing advanced technology solutions for modern businesses.', ko: '법적 대리인: Nguyen Huu Dong. 현대 기업을 위한 첨단 기술 솔루션 제공.', zh: '法定代表人：阮友东先生。为现代企业提供先进的技术解决方案。', ja: '法定代表者：Nguyen Huu Dong氏。現代企業向けの先進的なテクノロジーソリューションを提供。' },
  registerNow: { vi: 'Đăng ký ngay', en: 'Register Now', ko: '지금 등록', zh: '立即注册', ja: '今すぐ登録' },
  contactUs: { vi: 'Liên hệ tư vấn', en: 'Contact Us', ko: '상담 문의', zh: '联系咨询', ja: 'お問い合わせ' },
  
  // Vision Section
  visionBadge: { vi: 'Tầm nhìn', en: 'Vision', ko: '비전', zh: '愿景', ja: 'ビジョン' },
  visionTitle: { vi: 'Tầm nhìn của chúng tôi', en: 'Our Vision', ko: '우리의 비전', zh: '我们的愿景', ja: '私たちのビジョン' },
  visionDesc: { vi: 'Trở thành đối tác công nghệ hàng đầu, đồng hành cùng doanh nghiệp Việt Nam trong hành trình chuyển đổi số, mang đến các giải pháp sáng tạo và hiệu quả nhất.', en: 'To become a leading technology partner, accompanying Vietnamese businesses in their digital transformation journey, delivering the most innovative and effective solutions.', ko: '베트남 기업의 디지털 전환 여정에 동행하는 선도적인 기술 파트너가 되어 가장 혁신적이고 효과적인 솔루션을 제공합니다.', zh: '成为领先的技术合作伙伴，陪伴越南企业数字化转型之旅，提供最具创新性和有效的解决方案。', ja: 'ベトナム企業のデジタルトランスフォーメーションの旅に同行する主要なテクノロジーパートナーとなり、最も革新的で効果的なソリューションを提供します。' },
  
  // Mission Section
  missionBadge: { vi: 'Sứ mệnh', en: 'Mission', ko: '미션', zh: '使命', ja: 'ミッション' },
  missionTitle: { vi: 'Sứ mệnh của chúng tôi', en: 'Our Mission', ko: '우리의 미션', zh: '我们的使命', ja: '私たちのミッション' },
  missionDesc: { vi: 'Phát triển và cung cấp các sản phẩm công nghệ chất lượng cao, giúp tối ưu hóa hoạt động kinh doanh, nâng cao hiệu suất làm việc và tạo ra giá trị bền vững cho khách hàng.', en: 'Develop and provide high-quality technology products that optimize business operations, enhance work efficiency, and create sustainable value for customers.', ko: '비즈니스 운영을 최적화하고 업무 효율성을 향상시키며 고객에게 지속 가능한 가치를 창출하는 고품질 기술 제품을 개발하고 제공합니다.', zh: '开发和提供优质技术产品，优化业务运营，提高工作效率，为客户创造可持续价值。', ja: 'ビジネス運営を最適化し、作業効率を向上させ、顧客に持続可能な価値を創造する高品質なテクノロジー製品を開発・提供します。' },
  
  // Core Values
  valuesBadge: { vi: 'Giá trị cốt lõi', en: 'Core Values', ko: '핵심 가치', zh: '核心价值观', ja: 'コアバリュー' },
  valuesTitle: { vi: 'Giá trị cốt lõi', en: 'Core Values', ko: '핵심 가치', zh: '核心价值观', ja: 'コアバリュー' },
  value1: { vi: 'Sáng tạo', en: 'Innovation', ko: '혁신', zh: '创新', ja: 'イノベーション' },
  value1Desc: { vi: 'Luôn đổi mới và sáng tạo trong từng sản phẩm', en: 'Always innovating and creating in every product', ko: '모든 제품에서 항상 혁신하고 창조합니다', zh: '在每个产品中不断创新和创造', ja: 'すべての製品において常に革新し創造します' },
  value2: { vi: 'Chất lượng', en: 'Quality', ko: '품질', zh: '质量', ja: '品質' },
  value2Desc: { vi: 'Cam kết mang đến chất lượng tốt nhất', en: 'Committed to delivering the best quality', ko: '최고의 품질을 제공하기 위해 최선을 다합니다', zh: '致力于提供最佳质量', ja: '最高品質の提供に尽力します' },
  value3: { vi: 'Tận tâm', en: 'Dedication', ko: '헌신', zh: '奉献', ja: '献身' },
  value3Desc: { vi: 'Tận tâm phục vụ khách hàng với trách nhiệm cao', en: 'Dedicated to serving customers with high responsibility', ko: '높은 책임감으로 고객을 성실히 섬깁니다', zh: '以高度责任心尽心服务客户', ja: '高い責任感を持ってお客様に尽力します' },
  value4: { vi: 'Hợp tác', en: 'Collaboration', ko: '협력', zh: '合作', ja: '協力' },
  value4Desc: { vi: 'Xây dựng mối quan hệ đối tác bền vững', en: 'Building sustainable partnerships', ko: '지속 가능한 파트너십 구축', zh: '建立可持续的合作伙伴关系', ja: '持続可能なパートナーシップを構築' },
  
  // Roadmap
  roadmapBadge: { vi: 'Lộ trình phát triển', en: 'Development Roadmap', ko: '개발 로드맵', zh: '发展路线图', ja: '開発ロードマップ' },
  roadmapTitle: { vi: 'Lộ trình phát triển KAS', en: 'KAS Development Roadmap', ko: 'KAS 개발 로드맵', zh: 'KAS发展路线图', ja: 'KAS開発ロードマップ' },
  roadmap2020: { vi: '2020 - Khởi đầu', en: '2020 - Beginning', ko: '2020 - 시작', zh: '2020 - 开始', ja: '2020 - 始まり' },
  roadmap2020Desc: { vi: 'Thành lập công ty và phát triển sản phẩm đầu tiên', en: 'Company establishment and first product development', ko: '회사 설립 및 첫 제품 개발', zh: '公司成立和首个产品开发', ja: '会社設立と最初の製品開発' },
  roadmap2021: { vi: '2021 - Mở rộng', en: '2021 - Expansion', ko: '2021 - 확장', zh: '2021 - 扩张', ja: '2021 - 拡大' },
  roadmap2021Desc: { vi: 'Ra mắt hệ sinh thái ứng dụng KAS Workplace', en: 'Launch of KAS Workplace application ecosystem', ko: 'KAS Workplace 애플리케이션 생태계 출시', zh: '推出KAS Workplace应用生态系统', ja: 'KAS Workplaceアプリケーションエコシステムのローンチ' },
  roadmap2023: { vi: '2023 - Phát triển', en: '2023 - Development', ko: '2023 - 개발', zh: '2023 - 发展', ja: '2023 - 発展' },
  roadmap2023Desc: { vi: 'Tích hợp AI và mở rộng thị trường quốc tế', en: 'AI integration and international market expansion', ko: 'AI 통합 및 국제 시장 확장', zh: 'AI集成和国际市场扩张', ja: 'AI統合と国際市場の拡大' },
  roadmap2025: { vi: '2025 - Dẫn đầu', en: '2025 - Leading', ko: '2025 - 선도', zh: '2025 - 领先', ja: '2025 - リード' },
  roadmap2025Desc: { vi: 'Trở thành nền tảng công nghệ hàng đầu Việt Nam', en: 'Become Vietnam\'s leading technology platform', ko: '베트남 최고의 기술 플랫폼이 됩니다', zh: '成为越南领先的技术平台', ja: 'ベトナムを代表するテクノロジープラットフォームになる' },
  
  // Pricing
  pricingBadge: { vi: 'Gói dịch vụ', en: 'Service Packages', ko: '서비스 패키지', zh: '服务套餐', ja: 'サービスパッケージ' },
  pricingTitle: { vi: 'Gói dịch vụ KAS POS', en: 'KAS POS Service Packages', ko: 'KAS POS 서비스 패키지', zh: 'KAS POS服务套餐', ja: 'KAS POSサービスパッケージ' },
  basicPlan: { vi: 'Gói Cơ Bản', en: 'Basic Plan', ko: '기본 플랜', zh: '基础套餐', ja: 'ベーシックプラン' },
  advancePlan: { vi: 'Gói Nâng Cao', en: 'Advanced Plan', ko: '고급 플랜', zh: '高级套餐', ja: 'アドバンスプラン' },
  premiumPlan: { vi: 'Gói Cao Cấp', en: 'Premium Plan', ko: '프리미엄 플랜', zh: '高级套餐', ja: 'プレミアムプラン' },
  perMonth: { vi: '/tháng', en: '/month', ko: '/월', zh: '/月', ja: '/月' },
  contactForPrice: { vi: 'Liên hệ báo giá', en: 'Contact for pricing', ko: '가격 문의', zh: '联系报价', ja: '価格についてお問い合わせ' },
  
  // Workplace Section
  workplaceBadge: { vi: 'Bộ Giải Pháp Workplace', en: 'Workplace Solutions Suite', ko: '직장 솔루션 제품군', zh: '工作场所解决方案套件', ja: 'ワークプレイスソリューションスイート' },
  workplaceTitle: { vi: 'Hệ Sinh Thái Ứng Dụng', en: 'Application Ecosystem', ko: '애플리케이션 생태계', zh: '应用生态系统', ja: 'アプリケーションエコシステム' },
  workplaceSubtitle: { vi: 'Toàn Diện Cho Doanh Nghiệp', en: 'Complete For Enterprise', ko: '기업을 위한 완전한', zh: '企业完整解决方案', ja: '企業向け完全ソリューション' },
  workplaceDesc: { vi: 'Bộ công cụ tích hợp giúp doanh nghiệp số hóa mọi quy trình làm việc, từ ký số, quản lý nhân sự đến trí tuệ nhân tạo', en: 'Integrated suite of tools to digitize all business workflows, from digital signatures, HR management to artificial intelligence', ko: '디지털 서명, 인사 관리부터 인공지능까지 모든 비즈니스 워크플로우를 디지털화하는 통합 도구', zh: '集成工具套件，将所有业务工作流程数字化，从数字签名、人力资源管理到人工智能', ja: 'デジタル署名、人事管理から人工知能まで、すべてのビジネスワークフローをデジタル化する統合ツールスイート' },

   // Koffice
  koffice: { vi: 'Koffice', en: 'Koffice', ko: 'Koffice', zh: 'Koffice', ja: 'Koffice' },
  kofficeDesc: { vi: 'Nền tảng quản trị doanh nghiệp cùng AI', en: 'The AI-Powered Business Platform', ko: 'AI 기반 비즈니스 플랫폼', zh: 'AI驱动的商业平台', ja: 'AI搭載ビジネスプラットフォーム' },
  
  // Kos
  kos: { vi: 'Kos', en: 'Kos', ko: 'Kos', zh: 'Kos', ja: 'Kos' },
  kosDesc: { vi: 'Từ chiến lược đến thực thi', en: 'Action by Vision', ko: '비전에서 실행으로', zh: '从战略到执行', ja: 'ビジョンから実行へ' },
  
  // Kops
  kops: { vi: 'Kops', en: 'Kops', ko: 'Kops', zh: 'Kops', ja: 'Kops' },
  kopsDesc: { vi: 'Vận hành xuất sắc', en: 'Operational Excellence', ko: '운영 우수성', zh: '卓越运营', ja: 'オペレーショナルエクセレンス' },
  
  // Kforce
  kforce: { vi: 'Kforce', en: 'Kforce', ko: 'Kforce', zh: 'Kforce', ja: 'Kforce' },
  kforceDesc: { vi: 'Phát triển nhân tài. Kiến tạo tương lai', en: 'Build Talent. Shape the Future.', ko: '인재 육성. 미래 창조', zh: '培养人才·塑造未来', ja: '人材育成·未来を創る' },
  
  // Ksign
  ksign: { vi: 'Ksign', en: 'Ksign', ko: 'Ksign', zh: 'Ksign', ja: 'Ksign' },
  ksignDesc: { vi: 'Ký nhanh, bảo vệ hành tinh xanh', en: 'Sign fast, save green', ko: '빠른 서명, 친환경 보호', zh: '快速签署，保护绿色星球', ja: '迅速署名、地球を守る' },

  //Klinks
  klinks: { vi: 'Klinks', en: 'Klinks', ko: 'Klinks', zh: 'Klinks', ja: 'Klinks' },
  klinksDesc: { vi: 'Kết nối thông minh, Chia sẻ không giới hạn', en: 'Smart Connect, Unlimited Share', ko: '스마트 연결, 무제한 공유', zh: '智能连接，无限分享', ja: 'スマート接続、無制限の共有' },
  
  // Kare
  kare: { vi: 'Kare', en: 'Kare', ko: 'Kare', zh: 'Kare', ja: 'Kare' },
  kareDesc: { vi: 'Thấu hiểu khách hàng, Nâng tầm doanh nghiệp', en: 'Knowing Customers, Growing Business', ko: '고객 이해, 비즈니스 성장', zh: '了解客户，发展业务', ja: '顧客を理解し、ビジネスを成長させる' },
  
  // Kargo
  kargo: { vi: 'Kargo', en: 'Kargo', ko: 'Kargo', zh: 'Kargo', ja: 'Kargo' },
  kargoDesc: { vi: 'Chủ động nguồn cung, cùng phát triển', en: 'Supply Smart, Grow United', ko: '스마트 공급, 함께 성장', zh: '智能供应，共同成长', ja: 'スマートサプライ、共に成長' },
  
  // KPOS
  kpos: { vi: 'KPOS', en: 'KPOS', ko: 'KPOS', zh: 'KPOS', ja: 'KPOS' },
  kposDesc: { vi: 'Vận hành thông minh, phát triển vững mạnh', en: 'Operate smarter, Grow stronger', ko: '스마트 운영, 강력한 성장', zh: '智能运营，强劲增长', ja: 'スマート運営、強力な成長' },
  
  // Kount
  kount: { vi: 'Kount', en: 'Kount', ko: 'Kount', zh: 'Kount', ja: 'Kount' },
  kountDesc: { vi: 'Giải pháp kế toán tin cậy, tối ưu cùng AI', en: 'Trusted Accounting, AI-Enhanced', ko: '신뢰할 수 있는 회계, AI 강화', zh: '可信的会计，AI增强', ja: '信頼できる会計、AI強化' },
  
  // Kvision
  kvision: { vi: 'Kvision', en: 'Kvision', ko: 'Kvision', zh: 'Kvision', ja: 'Kvision' },
  kvisionDesc: { vi: 'Quyết định thông minh với insight từ AI', en: 'Make decisions with AI-powered insights', ko: 'AI 기반 인사이트로 스마트한 의사결정', zh: '基于AI洞察做出明智决策', ja: 'AI駆動のインサイトで賢明な意思決定' },
  
  // Kuru
  kuru: { vi: 'Kuru', en: 'Kuru', ko: 'Kuru', zh: 'Kuru', ja: 'Kuru' },
  kuruDesc: { vi: 'Nơi tri thức hoạt động', en: 'Where Knowledge Works', ko: '지식이 작동하는 곳', zh: '知识运作之地', ja: '知識が機能する場所' },
  
  workplaceCTA: { vi: 'Khám phá Tất cả Ứng dụng', en: 'Explore All Apps', ko: '모든 앱 탐색', zh: '探索所有应用', ja: 'すべてのアプリを探索' },
  workplaceTrusted: { vi: 'Được tin dùng bởi', en: 'Trusted by', ko: '신뢰받는 기업', zh: '受到信赖', ja: '信頼されています' },
  workplaceCompanies: { vi: '500+ doanh nghiệp', en: '500+ companies', ko: '500개 이상의 기업', zh: '500+ 家企业', ja: '500社以上の企業' },
  
  // Footer
  companyInfo: { vi: 'Thông tin công ty', en: 'Company Information', ko: '회사 정보', zh: '公司信息', ja: '会社情報' },
  address: { vi: 'Địa chỉ', en: 'Address', ko: '주소', zh: '地址', ja: '住所' },
  addressValue: { vi: '199 Đường Nguyễn Hoàng, Phường An Phú, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh', en: '199 Nguyen Hoang Street, An Phu Ward, Thu Duc City, Ho Chi Minh City', ko: '호치민시 투득시 안푸구 응우옌호앙거리 199번지', zh: '胡志明市守德市安富坊阮晃路199号', ja: 'ホーチミン市トゥドゥック市アンフー区グエンホアン通り199番地' },
  hotline: { vi: 'Hotline', en: 'Hotline', ko: '핫라인', zh: '热线', ja: 'ホットライン' },
  email: { vi: 'Email', en: 'Email', ko: '이메일', zh: '电子邮件', ja: 'Eメール' },
  website: { vi: 'Website', en: 'Website', ko: '웹사이트', zh: '网站', ja: 'ウェブサイト' },
  businessLicense: { vi: 'Giấy chứng nhận đăng ký kinh doanh số: 0316194224', en: 'Business Registration Certificate: 0316194224', ko: '사업자등록증 번호: 0316194224', zh: '营业执照号码：0316194224', ja: '事業登録証明書番号：0316194224' },
  issuedDate: { vi: 'Cấp ngày 11/03/2020', en: 'Issued on 11/03/2020', ko: '발급일: 2020년 3월 11일', zh: '发证日期：2020年3月11日', ja: '発行日：2020年3月11日' },
  bankAccount: { vi: 'Tài khoản ngân hàng', en: 'Bank Account', ko: '은행 계좌', zh: '银行账户', ja: '銀行口座' },
  bankAccountValue: { vi: '1170205610 - Ngân hàng BIDV - CN Bình Điền Sài Gòn', en: '1170205610 - BIDV Bank - Binh Dien Sai Gon Branch', ko: '1170205610 - BIDV 은행 - 빈디엔사이공 지점', zh: '1170205610 - BIDV银行 - 平田西贡分行', ja: '1170205610 - BIDV銀行 - ビンディエンサイゴン支店' },
  copyright: { vi: '© 2021 by KAS TECHNOLOGY CORPORATION', en: '© 2021 by KAS TECHNOLOGY CORPORATION', ko: '© 2021 KAS TECHNOLOGY CORPORATION', zh: '© 2021 KAS科技股份公司', ja: '© 2021 KAS TECHNOLOGY CORPORATION' },
};

export default function KASLanding() {
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
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 -z-10 animate-gradient" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}} />

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg animate-pulse-glow">
            <Star size={16} fill="currentColor" />
            <span>{t('badge')}</span>
            <Sparkles size={16} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent animate-gradient">
              {t('heroTitle')}
            </span>
          </h1>

          <p className="text-2xl text-gray-600 mb-4 font-semibold">{t('heroSubtitle')}</p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">{t('heroDesc')}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="https://kas.asia/register"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white rounded-xl font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center space-x-3 hover:scale-105"
            >
              <Zap size={20} />
              <span>{t('registerNow')}</span>
              <ArrowRight size={20} />
            </Link>
            <a
              href="#contact"
              className="px-8 py-4 bg-white border-2 border-blue-500 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center space-x-3"
            >
              <span>{t('contactUs')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <Target size={16} />
            <span>{t('visionBadge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              {t('visionTitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('visionDesc')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            <Heart size={16} />
            <span>{t('missionBadge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              {t('missionTitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('missionDesc')}
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="values" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              <Gem size={16} />
              <span>{t('valuesBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t('valuesTitle')}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Sparkles size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('value1')}</h3>
              <p className="text-gray-600">{t('value1Desc')}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-indigo-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('value2')}</h3>
              <p className="text-gray-600">{t('value2Desc')}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-purple-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('value3')}</h3>
              <p className="text-gray-600">{t('value3Desc')}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('value4')}</h3>
              <p className="text-gray-600">{t('value4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              <TrendingUp size={16} />
              <span>{t('roadmapBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
                {t('roadmapTitle')}
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
            
            <div className="space-y-12">
              {[
                { year: t('roadmap2020'), desc: t('roadmap2020Desc'), color: 'blue' },
                { year: t('roadmap2021'), desc: t('roadmap2021Desc'), color: 'indigo' },
                { year: t('roadmap2023'), desc: t('roadmap2023Desc'), color: 'purple' },
                { year: t('roadmap2025'), desc: t('roadmap2025Desc'), color: 'green' },
              ].map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full"></div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.year}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              <Star size={16} />
              <span>{t('pricingBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-blue-500 bg-clip-text text-transparent">
                {t('pricingTitle')}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('basicPlan')}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{t('contactForPrice')}</span>
              </div>
              <Link href="#contact" className="block w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-center font-bold hover:from-blue-700 hover:to-blue-800 transition-all">
                {t('contactUs')}
              </Link>
            </div>

            {/* Advanced */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl transform md:scale-110">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('advancePlan')}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{t('contactForPrice')}</span>
              </div>
              <Link href="#contact" className="block w-full px-6 py-4 bg-white text-blue-600 rounded-xl text-center font-bold hover:bg-blue-50 transition-all">
                {t('contactUs')}
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-indigo-300 transition-all hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('premiumPlan')}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{t('contactForPrice')}</span>
              </div>
              <Link href="#contact" className="block w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl text-center font-bold hover:from-indigo-700 hover:to-purple-800 transition-all">
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              <Briefcase size={16} />
              <span>{t('workplaceBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t('workplaceTitle')}
              </span>
              <br />
              {t('workplaceSubtitle')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {t('workplaceDesc')}
            </p>
          </div>

          {/* Products Carousel */}
          <div className="relative mb-16 overflow-hidden">
            <div className="flex gap-6 animate-scroll hover:pause-animation">
                {/* Koffice */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {t('koffice')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kofficeDesc')}
                    </p>
                  </div>
                </div>

                {/* Kos */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Target size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {t('kos')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kosDesc')}
                    </p>
                  </div>
                </div>

                {/* Kops */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-cyan-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                      {t('kops')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kopsDesc')}
                    </p>
                  </div>
                </div>

                {/* Kforce */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Users size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {t('kforce')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kforceDesc')}
                    </p>
                  </div>
                </div>

                {/* Ksign */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Briefcase size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {t('ksign')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('ksignDesc')}
                    </p>
                  </div>
                </div>

                {/* Klinks */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {t('klinks')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('klinksDesc')}
                    </p>
                  </div>
                </div>

                {/* Kare */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-pink-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Heart size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                      {t('kare')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kareDesc')}
                    </p>
                  </div>
                </div>

                {/* Kargo */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {t('kargo')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kargoDesc')}
                    </p>
                  </div>
                </div>

                {/* KPOS */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-yellow-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Star size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {t('kpos')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kposDesc')}
                    </p>
                  </div>
                </div>

                {/* Kount */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kount')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kountDesc')}
                    </p>
                  </div>
                </div>

                {/* Kvision */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {t('kvision')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kvisionDesc')}
                    </p>
                  </div>
                </div>

                {/* Kuru */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                      {t('kuru')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kuruDesc')}
                    </p>
                  </div>
                </div>

                {/* Duplicate set for seamless loop */}
                {/* Koffice */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {t('koffice')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kofficeDesc')}
                    </p>
                  </div>
                </div>

                {/* Kos */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Target size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {t('kos')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kosDesc')}
                    </p>
                  </div>
                </div>

                {/* Kops */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-cyan-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                      {t('kops')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kopsDesc')}
                    </p>
                  </div>
                </div>

                {/* Kforce */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Users size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {t('kforce')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kforceDesc')}
                    </p>
                  </div>
                </div>

                {/* Ksign */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Briefcase size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {t('ksign')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('ksignDesc')}
                    </p>
                  </div>
                </div>

                {/* Klinks */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {t('klinks')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('klinksDesc')}
                    </p>
                  </div>
                </div>

                {/* Kare */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-pink-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Heart size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                      {t('kare')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kareDesc')}
                    </p>
                  </div>
                </div>

                {/* Kargo */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {t('kargo')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kargoDesc')}
                    </p>
                  </div>
                </div>

                {/* KPOS */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-yellow-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Star size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {t('kpos')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kposDesc')}
                    </p>
                  </div>
                </div>

                {/* Kount */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kount')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kountDesc')}
                    </p>
                  </div>
                </div>

                {/* Kvision */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {t('kvision')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kvisionDesc')}
                    </p>
                  </div>
                </div>

                {/* Kuru */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                      {t('kuru')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kuruDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          {/* CTA and Stats */}
          <div className="text-center">
            <Link
              href="https://kas.asia"
              className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 mb-12"
            >
              <Briefcase size={24} />
              <span className="text-lg">{t('workplaceCTA')}</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>

            {/* Trust Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield size={20} className="text-blue-600" />
                <span className="font-medium">{t('workplaceTrusted')}</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t('workplaceCompanies')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
