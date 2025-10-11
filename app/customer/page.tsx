"use client";


import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Store, Users, Building2, TrendingUp, Coffee } from 'lucide-react';

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
  badge: { vi: 'Khách hàng', en: 'Customers', ko: '고객', zh: '客户', ja: '顧客' },
  heroTitle: { vi: 'Khách Hàng Của KAS', en: 'KAS Customers', ko: 'KAS 고객', zh: 'KAS客户', ja: 'KAS顧客' },
  heroSubtitle: { vi: '3 Phân Khúc Mục Tiêu', en: '3 Target Segments', ko: '3개의 타겟 세그먼트', zh: '3个目标细分市场', ja: '3つのターゲットセグメント' },
  heroDesc: { vi: 'Từ những cửa hàng nhỏ đến các thương hiệu lớn - hơn 10.000 khách hàng đã chọn KAS', en: 'From small stores to large brands - over 10,000 customers have chosen KAS', ko: '소규모 매장부터 대형 브랜드까지 - 10,000개 이상의 고객이 KAS를 선택했습니다', zh: '从小型商店到大品牌 - 超过10,000家客户选择了KAS', ja: '小規模店舗から大手ブランドまで - 10,000以上の顧客がKASを選択' },
  
  // Segments
  segment1Title: { vi: 'Cửa hàng nhỏ', en: 'Small Stores', ko: '소규모 매장', zh: '小型商店', ja: '小規模店舗' },
  segment1Desc: { vi: 'Các cửa hàng ăn uống, cà phê, thời trang quy mô nhỏ', en: 'Small-scale F&B, coffee shops, fashion stores', ko: '소규모 식음료, 카페, 패션 매장', zh: '小型餐饮、咖啡店、时尚店', ja: '小規模飲食店、カフェ、ファッション店' },
  
  segment2Title: { vi: 'Chuỗi cửa hàng', en: 'Chain Stores', ko: '체인점', zh: '连锁店', ja: 'チェーン店' },
  segment2Desc: { vi: 'Thương hiệu với nhiều chi nhánh, cần quản lý tập trung', en: 'Brands with multiple branches, requiring centralized management', ko: '여러 지점을 가진 브랜드, 중앙 집중식 관리 필요', zh: '拥有多个分店的品牌，需要集中管理', ja: '複数の支店を持つブランド、集中管理が必要' },
  
  segment3Title: { vi: 'Doanh nghiệp lớn', en: 'Large Enterprises', ko: '대기업', zh: '大型企业', ja: '大企業' },
  segment3Desc: { vi: 'Tập đoàn, doanh nghiệp lớn với hệ thống phức tạp', en: 'Corporations, large enterprises with complex systems', ko: '복잡한 시스템을 갖춘 대기업, 기업', zh: '拥有复杂系统的集团、大型企业', ja: '複雑なシステムを持つ企業グループ、大企業' },
  
  trustedBy: { vi: 'Được tin dùng bởi', en: 'Trusted by', ko: '신뢰받는 기업', zh: '受到信赖', ja: '信頼されています' },
  totalCustomers: { vi: '10.000+', en: '10,000+', ko: '10,000+', zh: '10,000+', ja: '10,000+' },
  customersCount: { vi: 'khách hàng', en: 'customers', ko: '고객', zh: '客户', ja: '顧客' },
  
  // Target Market Section
  targetMarketBadge: { vi: 'Thị trường mục tiêu', en: 'Target Market', ko: '목표 시장', zh: '目标市场', ja: 'ターゲット市場' },
  targetMarketTitle: { vi: 'Phân Khúc Thị Trường', en: 'Market Segments', ko: '시장 세그먼트', zh: '市场细分', ja: '市場セグメント' },
  targetMarketDesc: { vi: 'Giải pháp toàn diện cho mọi quy mô doanh nghiệp', en: 'Comprehensive solutions for all business sizes', ko: '모든 규모의 비즈니스를 위한 포괄적인 솔루션', zh: '为各种规模的企业提供全面解决方案', ja: 'あらゆる規模のビジネス向け包括的ソリューション' },
  
  // Table Headers
  criteria: { vi: 'Tiêu chí', en: 'Criteria', ko: '기준', zh: '标准', ja: '基準' },
  microMerchant: { vi: 'Micro Merchant', en: 'Micro Merchant', ko: '마이크로 상점', zh: '微型商户', ja: 'マイクロマーチャント' },
  sme: { vi: 'SME', en: 'SME', ko: 'SME', zh: '中小企业', ja: 'SME' },
  smeSubtitle: { vi: '(Doanh nghiệp vừa & nhỏ)', en: '(Small & Medium Enterprise)', ko: '(중소기업)', zh: '(中小型企业)', ja: '(中小企業)' },
  bizProject: { vi: 'Biz Project', en: 'Biz Project', ko: '비즈 프로젝트', zh: '商业项目', ja: 'ビズプロジェクト' },
  bizProjectSubtitle: { vi: '(Doanh nghiệp lớn, dự án đặc thù)', en: '(Large Enterprise, Special Projects)', ko: '(대기업, 특수 프로젝트)', zh: '(大型企业, 特殊项目)', ja: '(大企業、特別プロジェクト)' },
  
  // Table Rows
  scale: { vi: 'Quy mô', en: 'Scale', ko: '규모', zh: '规模', ja: '規模' },
  scaleM: { vi: 'Hộ kinh doanh, cá nhân, < 5 nhân sự', en: 'Individual businesses, < 5 staff', ko: '개인 사업자, 5명 미만', zh: '个体商户, < 5人', ja: '個人事業主、5名未満' },
  scaleS: { vi: '10 – 200 nhân sự, có bộ phận kế toán – vận hành', en: '10-200 staff, with accounting & operations dept', ko: '10-200명, 회계 및 운영 부서 보유', zh: '10-200人，有财务运营部门', ja: '10-200名、会計・運営部門あり' },
  scaleB: { vi: '>200 nhân sự hoặc mô hình chuỗi, tập đoàn', en: '>200 staff or chain/corporation model', ko: '>200명 또는 체인/그룹 모델', zh: '>200人或连锁/集团模式', ja: '>200名またはチェーン/グループモデル' },
  
  activity: { vi: 'Đặc điểm hoạt động', en: 'Activity Characteristics', ko: '활동 특성', zh: '活动特征', ja: '活動特性' },
  activityM: { vi: 'Linh hoạt, vốn thấp, quản lý thủ công, cần giải pháp đơn giản', en: 'Flexible, low capital, manual management, need simple solutions', ko: '유연함, 낮은 자본, 수동 관리, 간단한 솔루션 필요', zh: '灵活，低资本，手动管理，需要简单解决方案', ja: '柔軟、低資本、手動管理、シンプルなソリューションが必要' },
  activityS: { vi: 'Bắt đầu số hóa, cần quản trị hiệu quả, kết nối dữ liệu', en: 'Starting digitalization, need efficient management, data integration', ko: '디지털화 시작, 효율적인 관리 필요, 데이터 통합', zh: '开始数字化，需要高效管理，数据集成', ja: 'デジタル化開始、効率的な管理、データ統合が必要' },
  activityB: { vi: 'Có quy trình phức tạp, yêu cầu tùy chỉnh và bảo mật cao', en: 'Complex processes, require customization & high security', ko: '복잡한 프로세스, 맞춤화 및 높은 보안 필요', zh: '复杂流程，需要定制和高安全性', ja: '複雑なプロセス、カスタマイズと高セキュリティが必要' },
  
  techGoal: { vi: 'Mục tiêu sử dụng công nghệ', en: 'Technology Usage Goals', ko: '기술 사용 목표', zh: '技术使用目标', ja: '技術利用目標' },
  techGoalM: { vi: 'Dễ dùng – Tiết kiệm chi phí – Tăng tốc bán hàng', en: 'Easy to use – Cost saving – Boost sales', ko: '사용하기 쉬움 – 비용 절감 – 판매 증대', zh: '易用 – 节省成本 – 提升销售', ja: '使いやすい – コスト削減 – 売上向上' },
  techGoalS: { vi: 'Tối ưu vận hành – Kiểm soát chi phí – Báo cáo quản trị', en: 'Optimize operations – Cost control – Management reporting', ko: '운영 최적화 – 비용 통제 – 관리 보고', zh: '优化运营 – 成本控制 – 管理报告', ja: '運営最適化 – コスト管理 – 管理レポート' },
  techGoalB: { vi: 'Tích hợp hệ thống – Tự động hóa – Chuẩn hóa toàn bộ quy trình', en: 'System integration – Automation – Standardize all processes', ko: '시스템 통합 – 자동화 – 모든 프로세스 표준화', zh: '系统集成 – 自动化 – 标准化所有流程', ja: 'システム統合 – 自動化 – 全プロセスの標準化' },
  
  mainSolution: { vi: 'Nhu cầu giải pháp chính', en: 'Main Solution Needs', ko: '주요 솔루션 요구사항', zh: '主要解决方案需求', ja: '主要ソリューション要件' },
  mainSolutionM: { vi: 'Quản lý bán hàng và hệ thống Kế toán', en: 'Sales management & Accounting system', ko: '판매 관리 및 회계 시스템', zh: '销售管理和会计系统', ja: '販売管理と会計システム' },
  mainSolutionS: { vi: 'POS, Kế toán, CRM, Quản lý nhân sự, Báo cáo đa chi nhánh', en: 'POS, Accounting, CRM, HR Management, Multi-branch reporting', ko: 'POS, 회계, CRM, 인사 관리, 다중 지점 보고', zh: 'POS, 会计, CRM, 人力资源管理, 多分支报告', ja: 'POS、会計、CRM、人事管理、マルチブランチレポート' },
  mainSolutionB: { vi: 'ERP, Quản trị tập trung, Tích hợp hệ thống nội bộ & đối tác', en: 'ERP, Centralized management, Internal & partner system integration', ko: 'ERP, 중앙 집중식 관리, 내부 및 파트너 시스템 통합', zh: 'ERP, 集中管理, 内部和合作伙伴系统集成', ja: 'ERP、集中管理、内部・パートナーシステム統合' },
  
  implementation: { vi: 'Hình thức triển khai', en: 'Implementation Format', ko: '구현 형식', zh: '实施形式', ja: '実装形式' },
  implementationM: { vi: 'Đăng ký online, hướng dẫn nhanh, hỗ trợ từ xa', en: 'Online registration, quick guide, remote support', ko: '온라인 등록, 빠른 가이드, 원격 지원', zh: '在线注册, 快速指南, 远程支持', ja: 'オンライン登録、クイックガイド、リモートサポート' },
  implementationS: { vi: 'Triển khai có tư vấn, hỗ trợ định kỳ', en: 'Deployment with consultation, periodic support', ko: '컨설팅을 통한 배포, 정기 지원', zh: '咨询部署, 定期支持', ja: 'コンサルティング付き展開、定期サポート' },
  implementationB: { vi: 'Dự án triển khai chuyên biệt, hợp đồng & SLA rõ ràng', en: 'Specialized deployment project, clear contract & SLA', ko: '전문 배포 프로젝트, 명확한 계약 및 SLA', zh: '专业部署项目, 明确合同和SLA', ja: '専門展開プロジェクト、明確な契約とSLA' },
  
  budget: { vi: 'Ngân sách đầu tư', en: 'Investment Budget', ko: '투자 예산', zh: '投资预算', ja: '投資予算' },
  budgetM: { vi: 'Thấp, trả phí theo tháng hoặc gói cơ bản', en: 'Low, monthly fee or basic package', ko: '낮음, 월별 요금 또는 기본 패키지', zh: '低, 按月付费或基本套餐', ja: '低、月額料金または基本パッケージ' },
  budgetS: { vi: 'Trung bình, sẵn sàng trả phí định kỳ', en: 'Medium, willing to pay periodic fees', ko: '중간, 정기 요금 지불 의향', zh: '中等, 愿意支付定期费用', ja: '中、定期的な料金の支払い意向あり' },
  budgetB: { vi: 'Cao, theo dự án hoặc hợp đồng dịch vụ dài hạn', en: 'High, project-based or long-term service contract', ko: '높음, 프로젝트 기반 또는 장기 서비스 계약', zh: '高, 基于项目或长期服务合同', ja: '高、プロジェクトベースまたは長期サービス契約' },
  
  growth: { vi: 'Cơ hội phát triển', en: 'Growth Opportunities', ko: '성장 기회', zh: '发展机会', ja: '成長機会' },
  growthM: { vi: 'Thị trường rất lớn, số lượng đông', en: 'Very large market, high volume', ko: '매우 큰 시장, 높은 볼륨', zh: '市场非常大, 数量众多', ja: '非常に大きな市場、大量' },
  growthS: { vi: 'Tăng trưởng ổn định, dễ upsell sản phẩm', en: 'Stable growth, easy to upsell products', ko: '안정적인 성장, 제품 업셀 용이', zh: '稳定增长, 易于追加销售', ja: '安定成長、製品のアップセル容易' },
  growthB: { vi: 'Giá trị hợp đồng cao, gắn bó dài hạn', en: 'High contract value, long-term commitment', ko: '높은 계약 가치, 장기 약속', zh: '合同价值高, 长期承诺', ja: '高い契約価値、長期コミットメント' },
  
  // Target Customers Section
  targetCustomersBadge: { vi: 'Khách hàng mục tiêu', en: 'Target Customers', ko: '목표 고객', zh: '目标客户', ja: 'ターゲット顧客' },
  targetCustomersTitle: { vi: 'Đối Tượng Khách Hàng', en: 'Customer Segments', ko: '고객 세그먼트', zh: '客户细分', ja: '顧客セグメント' },
  targetCustomersDesc: { vi: 'Chúng tôi phục vụ đa dạng các ngành nghề và quy mô', en: 'We serve diverse industries and scales', ko: '다양한 산업과 규모에 서비스를 제공합니다', zh: '我们为各行各业和规模提供服务', ja: '多様な業界と規模にサービスを提供' },
  
  // Customer List Section
  customerListBadge: { vi: 'Khách hàng tiêu biểu', en: 'Featured Customers', ko: '주요 고객', zh: '代表客户', ja: '代表顧客' },
  customerListTitle: { vi: 'Danh Sách Khách Hàng Tham Khảo', en: 'Customer Reference List', ko: '고객 참조 목록', zh: '客户参考列表', ja: '顧客参照リスト' },
  customerListDesc: { vi: 'Hơn 10.000 doanh nghiệp đã tin tưởng và sử dụng KAS', en: 'Over 10,000 businesses trust and use KAS', ko: '10,000개 이상의 기업이 KAS를 신뢰하고 사용합니다', zh: '超过10,000家企业信任和使用KAS', ja: '10,000以上の企業がKASを信頼し使用' },
};

// Customer logos data
const customers = [
  // Row 1
  { name: 'Dookki', logo: '🍲', category: 'chain' },
  { name: 'Spicy Box', logo: '🌶️', category: 'small' },
  { name: 'Tous les Jours', logo: '🥐', category: 'chain' },
  { name: 'Bon Bon', logo: '🍰', category: 'small' },
  { name: 'Cobi Bread', logo: '🍞', category: 'chain' },
  { name: 'Chicken Plus', logo: '🍗', category: 'chain' },
  { name: 'Goobne', logo: '🐓', category: 'chain' },
  { name: 'Butter Bean', logo: '☕', category: 'small' },
  { name: 'Hot & Cold', logo: '🥤', category: 'small' },
  { name: 'Papa\'s Chicken', logo: '🍗', category: 'chain' },
  
  // Row 2
  { name: 'Phở Lộc Thọ', logo: '🍜', category: 'small' },
  { name: 'Cơm Niêu Thiên Lý', logo: '🍚', category: 'chain' },
  { name: 'Papagayo', logo: '🦜', category: 'small' },
  { name: 'Yên Thư', logo: '🍲', category: 'small' },
  { name: 'Bamboo', logo: '🎋', category: 'small' },
  { name: 'Hong Kong', logo: '🥟', category: 'chain' },
  { name: 'Trung Dương', logo: '🍤', category: 'small' },
  { name: 'Thai Market', logo: '🌶️', category: 'small' },
  { name: 'PiThai', logo: '🍛', category: 'chain' },
  { name: 'Mớ Cỏ', logo: '🥗', category: 'small' },
  
  // Row 3
  { name: 'Cargo Club', logo: '🚢', category: 'small' },
  { name: 'Le Panier', logo: '🥖', category: 'small' },
  { name: 'Morning Glory', logo: '☕', category: 'chain' },
  { name: 'Hansang', logo: '🍱', category: 'chain' },
  { name: 'Vin Lợi', logo: '🍽️', category: 'small' },
  { name: 'V\'s Deli', logo: '🥪', category: 'small' },
  { name: 'M Market', logo: '🏪', category: 'small' },
  { name: 'Bún Ân Cookie', logo: '🍜', category: 'small' },
  { name: 'Mộc Mộc', logo: '🥢', category: 'small' },
  { name: 'iMarket', logo: '🛒', category: 'enterprise' },
  
  // Row 4
  { name: 'Heineken', logo: '🍺', category: 'enterprise' },
  { name: 'Viva Star', logo: '⭐', category: 'chain' },
  { name: 'Viva', logo: '✨', category: 'chain' },
  { name: 'Kim Tú Garden', logo: '🌺', category: 'small' },
  { name: 'Best Coffee', logo: '☕', category: 'chain' },
  { name: 'Asian Food Town', logo: '🍜', category: 'chain' },
  { name: 'Karaoke', logo: '🎤', category: 'chain' },
  { name: 'Skydeck', logo: '🏙️', category: 'enterprise' },
  { name: 'Bitexco', logo: '🏢', category: 'enterprise' },
  { name: 'Phở Hồ Chí Minh', logo: '🍜', category: 'chain' },
  
  // Row 5
  { name: 'Mikado Sushi', logo: '🍣', category: 'chain' },
  { name: 'Phở Phượng Trang', logo: '🍜', category: 'small' },
  { name: 'Lotte', logo: '🏬', category: 'enterprise' },
  { name: 'Shinrim Bakery', logo: '🥐', category: 'chain' },
  { name: 'K-Market', logo: '🏪', category: 'chain' },
  { name: 'Werd', logo: '📝', category: 'small' },
  { name: 'Cơm Nhà Home', logo: '🏠', category: 'small' },
  { name: 'Market 54', logo: '🛒', category: 'chain' },
  { name: 'C2000', logo: '💧', category: 'enterprise' },
  { name: 'Vietthy', logo: '🍜', category: 'chain' },
];

export default function CustomersPage() {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const getCustomersByCategory = (category: string) => {
    return customers.filter(c => c.category === category);
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
        @keyframes fade-in-up {
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
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(0.95); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
        .shimmer {
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Header */}
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Hero Section - Đồng bộ với KAS Landing */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        {/* Background gradient - Light theme như trang chính */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10 animate-gradient" />
        
        {/* Floating orbs decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '2s'}} />

        <div className="max-w-7xl mx-auto text-center">
          {/* Badge - Đồng bộ style với trang chính */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <Users className="w-5 h-5" />
            <span className="uppercase tracking-wide">{t('badge')}</span>
            <TrendingUp className="w-5 h-5" />
          </div>

          {/* Main title - Gradient text như trang chính */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent animate-gradient">
              {t('heroTitle')}
            </span>
          </h1>
          
          {/* Subtitle - Text màu tối */}
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-bold">
            {t('heroSubtitle')}
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl max-w-4xl mx-auto mb-12 text-gray-600 leading-relaxed">
            {t('heroDesc')}
          </p>

          {/* Stats Cards - Đồng bộ với trang chính */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 - Total Customers */}
            <div className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:-translate-y-2">
              <div className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t('totalCustomers')}
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-3 group-hover:w-24 transition-all duration-300" />
              <div className="text-base md:text-lg font-bold text-gray-700 uppercase tracking-wider">
                {t('customersCount')}
              </div>
            </div>
            
            {/* Card 2 - Brands */}
            <div className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-300 hover:-translate-y-2">
              <div className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                50+
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-3 group-hover:w-24 transition-all duration-300" />
              <div className="text-base md:text-lg font-bold text-gray-700 uppercase tracking-wider">
                {language === 'vi' ? 'Thương hiệu' : 
                 language === 'en' ? 'Brands' :
                 language === 'ko' ? '브랜드' :
                 language === 'zh' ? '品牌' : 'ブランド'}
              </div>
            </div>

            {/* Card 3 - Satisfaction */}
            <div className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 hover:-translate-y-2">
              <div className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                99%
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 group-hover:w-24 transition-all duration-300" />
              <div className="text-base md:text-lg font-bold text-gray-700 uppercase tracking-wider">
                {language === 'vi' ? 'Hài lòng' :
                 language === 'en' ? 'Satisfaction' :
                 language === 'ko' ? '만족도' :
                 language === 'zh' ? '满意度' : '満足度'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Market Section - Enhanced with Cards */}
      <section id="target-market" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 mb-8 shadow-lg">
              <Store className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{t('targetMarketBadge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                {t('targetMarketTitle')}
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
              {t('targetMarketDesc')}
            </p>
          </div>

          {/* Segment Comparison Cards - Responsive Design */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Micro Merchant Card */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-blue-400">
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <Coffee className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-black mb-2">{t('microMerchant')}</h3>
                <p className="text-blue-100 text-sm font-medium">
                  {language === 'vi' ? 'Cửa hàng nhỏ' : 'Small Business'}
                </p>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {t('scale')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('scaleM')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {t('activity')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('activityM')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {t('techGoal')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('techGoalM')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {t('mainSolution')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('mainSolutionM')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {t('implementation')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('implementationM')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {t('budget')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('budgetM')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {t('growth')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('growthM')}</p>
                </div>
              </div>
            </div>

            {/* SME Card - Featured */}
            <div className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border-4 border-purple-500 transform lg:scale-105">
              {/* Header */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 text-white/10 text-8xl font-black">★</div>
                <Store className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-black mb-2">{t('sme')}</h3>
                <p className="text-purple-100 text-sm font-medium">{t('smeSubtitle')}</p>
                <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold">
                  {language === 'vi' ? 'PHỔ BIẾN' : 'POPULAR'}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-6 bg-gradient-to-b from-purple-50/50 to-white">
                <div>
                  <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    {t('scale')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('scaleS')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    {t('activity')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('activityS')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    {t('techGoal')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('techGoalS')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    {t('mainSolution')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('mainSolutionS')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    {t('implementation')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('implementationS')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    {t('budget')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('budgetS')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    {t('growth')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('growthS')}</p>
                </div>
              </div>
            </div>

            {/* Biz Project Card */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-orange-400">
              {/* Header */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
                <Building2 className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-black mb-2">{t('bizProject')}</h3>
                <p className="text-orange-100 text-sm font-medium">{t('bizProjectSubtitle')}</p>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    {t('scale')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('scaleB')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    {t('activity')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('activityB')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    {t('techGoal')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('techGoalB')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    {t('mainSolution')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('mainSolutionB')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    {t('implementation')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('implementationB')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    {t('budget')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('budgetB')}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    {t('growth')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('growthB')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Customers Section - Enhanced */}
      <section id="target-customers" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-purple-50/30 to-white relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 mb-8 shadow-lg">
              <Users className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{t('targetCustomersBadge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                {t('targetCustomersTitle')}
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
              {t('targetCustomersDesc')}
            </p>
          </div>

          {/* Industry Cards - 3D Hover Effect */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* F&B */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu border-2 border-orange-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">🍽️</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                {language === 'vi' ? 'Nhà hàng & Cà phê' : 
                 language === 'en' ? 'Restaurant & Cafe' :
                 language === 'ko' ? '레스토랑 & 카페' :
                 language === 'zh' ? '餐厅和咖啡馆' : 'レストラン＆カフェ'}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {language === 'vi' ? 'Quản lý bán hàng, kho, nhân viên cho F&B' :
                 language === 'en' ? 'Sales, inventory, staff management for F&B' :
                 language === 'ko' ? 'F&B용 판매, 재고, 직원 관리' :
                 language === 'zh' ? 'F&B销售、库存、员工管理' : 'F&B向け販売、在庫、スタッフ管理'}
              </p>
              <div className="mt-6 text-orange-600 font-bold text-sm uppercase tracking-wider">
                {language === 'vi' ? '1,500+ Khách hàng' : '1,500+ Customers'}
              </div>
            </div>

            {/* Retail */}
            <div className="group relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu border-2 border-pink-200">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-400/10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">🛍️</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                {language === 'vi' ? 'Bán lẻ & Thời trang' :
                 language === 'en' ? 'Retail & Fashion' :
                 language === 'ko' ? '소매 및 패션' :
                 language === 'zh' ? '零售和时尚' : '小売＆ファッション'}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {language === 'vi' ? 'Giải pháp cho cửa hàng thời trang, phụ kiện' :
                 language === 'en' ? 'Solutions for fashion & accessory stores' :
                 language === 'ko' ? '패션 및 액세서리 매장 솔루션' :
                 language === 'zh' ? '时尚和配饰店解决方案' : 'ファッション＆アクセサリー店舗ソリューション'}
              </p>
              <div className="mt-6 text-pink-600 font-bold text-sm uppercase tracking-wider">
                {language === 'vi' ? '800+ Khách hàng' : '800+ Customers'}
              </div>
            </div>

            {/* Beauty & Spa */}
            <div className="group relative bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu border-2 border-cyan-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">💅</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                {language === 'vi' ? 'Làm đẹp & Spa' :
                 language === 'en' ? 'Beauty & Spa' :
                 language === 'ko' ? '뷰티 & 스파' :
                 language === 'zh' ? '美容和水疗' : 'ビューティー＆スパ'}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {language === 'vi' ? 'Quản lý lịch hẹn, dịch vụ, khách hàng' :
                 language === 'en' ? 'Appointment, service, customer management' :
                 language === 'ko' ? '예약, 서비스, 고객 관리' :
                 language === 'zh' ? '预约、服务、客户管理' : '予約、サービス、顧客管理'}
              </p>
              <div className="mt-6 text-cyan-600 font-bold text-sm uppercase tracking-wider">
                {language === 'vi' ? '500+ Khách hàng' : '500+ Customers'}
              </div>
            </div>

            {/* Services */}
            <div className="group relative bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu border-2 border-green-200">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400/10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">🏢</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                {language === 'vi' ? 'Dịch vụ & Văn phòng' :
                 language === 'en' ? 'Services & Office' :
                 language === 'ko' ? '서비스 및 사무실' :
                 language === 'zh' ? '服务和办公室' : 'サービス＆オフィス'}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {language === 'vi' ? 'Giải pháp cho doanh nghiệp dịch vụ' :
                 language === 'en' ? 'Solutions for service businesses' :
                 language === 'ko' ? '서비스 비즈니스 솔루션' :
                 language === 'zh' ? '服务企业解决方案' : 'サービスビジネスソリューション'}
              </p>
              <div className="mt-6 text-green-600 font-bold text-sm uppercase tracking-wider">
                {language === 'vi' ? '600+ Khách hàng' : '600+ Customers'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer List Section - Marquee Animation */}
      <section id="customer-list" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-50/20 to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 mb-8 shadow-lg">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{t('customerListBadge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t('customerListTitle')}
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-8 font-medium">
              {t('customerListDesc')}
            </p>
            <p className="text-gray-500 text-xl font-semibold">{t('trustedBy')}</p>
          </div>

          {/* Customer Logos Marquee */}
          <div className="mb-20 overflow-hidden">
            <div className="flex gap-6 animate-marquee">
              {/* First set */}
              {customers.map((customer, index) => (
                <div
                  key={`first-${index}`}
                  className="group flex-shrink-0 w-28 h-28 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 hover:border-green-400"
                >
                  <div className="text-5xl transform group-hover:scale-125 transition-transform duration-300">
                    {customer.logo}
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {customers.map((customer, index) => (
                <div
                  key={`second-${index}`}
                  className="group flex-shrink-0 w-28 h-28 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 hover:border-green-400"
                >
                  <div className="text-5xl transform group-hover:scale-125 transition-transform duration-300">
                    {customer.logo}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Customers Grid - Featured only */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {language === 'vi' ? 'Khách hàng nổi bật' : 
               language === 'en' ? 'Featured Customers' :
               language === 'ko' ? '주요 고객' :
               language === 'zh' ? '主要客户' : '主要顧客'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
              {customers.slice(0, 20).map((customer, index) => (
                <div
                  key={index}
                  className="group relative aspect-square bg-white rounded-2xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 hover:border-green-400 transform hover:scale-110"
                  style={{animationDelay: `${index * 0.02}s`}}
                >
                  <div className="text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {customer.logo}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 shadow-xl">
                    {customer.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Segments Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Small Stores */}
            <div className="group relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-10 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Coffee className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-3">{t('segment1Title')}</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">{t('segment1Desc')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{getCustomersByCategory('small').length}+</span>
                  <span className="text-lg font-semibold text-blue-100">{t('customersCount')}</span>
                </div>
              </div>
            </div>

            {/* Chain Stores */}
            <div className="group relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-10 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Store className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-3">{t('segment2Title')}</h3>
                <p className="text-purple-100 mb-6 leading-relaxed">{t('segment2Desc')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{getCustomersByCategory('chain').length}+</span>
                  <span className="text-lg font-semibold text-purple-100">{t('customersCount')}</span>
                </div>
              </div>
            </div>

            {/* Large Enterprises */}
            <div className="group relative bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-10 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-3">{t('segment3Title')}</h3>
                <p className="text-orange-100 mb-6 leading-relaxed">{t('segment3Desc')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{getCustomersByCategory('enterprise').length}+</span>
                  <span className="text-lg font-semibold text-orange-100">{t('customersCount')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-300 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mb-8 animate-pulse-ring">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 drop-shadow-2xl">
            {language === 'vi' ? 'Sẵn sàng bắt đầu?' : 
             language === 'en' ? 'Ready to Get Started?' :
             language === 'ko' ? '시작할 준비가 되셨나요?' :
             language === 'zh' ? '准备好开始了吗？' : '始める準備はできましたか？'}
          </h2>
          
          <p className="text-2xl md:text-3xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
            {language === 'vi' ? 'Hơn 10.000 doanh nghiệp đã tin tưởng KAS. Hãy là người tiếp theo!' :
             language === 'en' ? 'Over 10,000 businesses trust KAS. Be the next one!' :
             language === 'ko' ? '10,000개 이상의 기업이 KAS를 신뢰합니다. 다음 주인공이 되세요!' :
             language === 'zh' ? '超过10,000家企业信任KAS。成为下一个！' : '10,000以上の企業がKASを信頼。次はあなたの番です！'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group px-10 py-5 bg-white text-purple-600 rounded-full font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-3">
              <span>{language === 'vi' ? 'Dùng thử miễn phí' : 'Start Free Trial'}</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
            
            <button className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white text-white rounded-full font-black text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center gap-3">
              <span>{language === 'vi' ? 'Liên hệ tư vấn' : 'Contact Sales'}</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
              <span>{language === 'vi' ? 'Không cần thẻ tín dụng' : 'No credit card required'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
              <span>{language === 'vi' ? 'Hủy bất cứ lúc nào' : 'Cancel anytime'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
              <span>{language === 'vi' ? 'Hỗ trợ 24/7' : '24/7 Support'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
