"use client";

//trang chính kas

import { useState, useEffect } from "react";
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
  heroTitle: { vi: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ KAS', en: 'KAS Technology Corporation', ko: 'KAS 기술 주식회사', zh: 'KAS科技股份公司', ja: 'KAS テクノロジー株式会社' },
  heroSubtitle: { vi: 'Nhà cung cấp giải pháp POS và ERP hàng đầu tại Việt Nam', en: 'Leading POS and ERP Solution Provider in Vietnam', ko: '베트남 최고의 POS 및 ERP 솔루션 제공업체', zh: '越南领先的POS和ERP解决方案提供商', ja: 'ベトナムの主要なPOSおよびERPソリューションプロバイダー' },
  heroDesc: { vi: 'Giải pháp chuyên sâu cho ngành F&B, Retail, Hospitality', en: 'Specialized solutions for F&B, Retail, and Hospitality industries', ko: 'F&B, 소매 및 환대 산업을 위한 전문 솔루션', zh: '专为餐饮、零售和酒店行业提供的专业解决方案', ja: 'F＆B、小売、ホスピタリティ業界向けの専門ソリューション' },
  registerNow: { vi: 'Đăng ký ngay', en: 'Register Now', ko: '지금 등록', zh: '立即注册', ja: '今すぐ登録' },
  contactUs: { vi: 'Liên hệ tư vấn', en: 'Contact Us', ko: '상담 문의', zh: '联系咨询', ja: 'お問い合わせ' },
  
  // Vision Section
  visionBadge: { vi: 'Tầm nhìn', en: 'Vision', ko: '비전', zh: '愿景', ja: 'ビジョン' },
  visionTitle: { vi: 'Trở thành công ty công nghệ AI-First hàng đầu Việt Nam trong lĩnh vực POS và giải pháp quản trị doanh nghiệp, kiến tạo thế hệ sản phẩm thông minh tự động hóa cho mọi mô hình kinh doanh.', en: 'To become Vietnam\'s leading AI-First technology company in the field of POS and enterprise management solutions, creating a generation of intelligent products that automate all business models.', ko: 'POS 및 엔터프라이즈 관리 솔루션 분야에서 베트남 최고의 AI-First 기술 회사가 되어 모든 비즈니스 모델을 자동화하는 지능형 제품 세대를 만듭니다.', zh: '成为越南领先的AI优先技术公司，专注于POS和企业管理解决方案，打造智能产品世代，实现所有商业模式的自动化。', ja: 'POSおよびエンタープライズ管理ソリューションの分野でベトナムを代表するAIファーストテクノロジー企業となり、すべてのビジネスモデルを自動化するインテリジェント製品の世代を創造します。' },
  visionDesc: { vi: 'Trở thành đối tác công nghệ hàng đầu, đồng hành cùng doanh nghiệp Việt Nam trong hành trình chuyển đổi số, mang đến các giải pháp sáng tạo và hiệu quả nhất.', en: 'To become a leading technology partner, accompanying Vietnamese businesses in their digital transformation journey, delivering the most innovative and effective solutions.', ko: '베트남 기업의 디지털 전환 여정에 동행하는 선도적인 기술 파트너가 되어 가장 혁신적이고 효과적인 솔루션을 제공합니다.', zh: '成为领先的技术合作伙伴，陪伴越南企业数字化转型之旅，提供最具创新性和有效的解决方案。', ja: 'ベトナム企業のデジタルトランスフォーメーションの旅に同行する主要なテクノロジーパートナーとなり、最も革新的で効果的なソリューションを提供します。' },
  
  // Mission Section
  missionBadge: { vi: 'Sứ mệnh', en: 'Mission', ko: '미션', zh: '使命', ja: 'ミッション' },
  missionTitle: { vi: 'KAS mang đến hệ sinh thái giải pháp AI-Driven toàn diện, giúp doanh nghiệp tối ưu vận hành, minh bạch quản trị và tăng trưởng bền vững thông qua tự động hóa và dữ liệu thông minh', en: 'KAS provides a comprehensive AI-Driven solution ecosystem that helps businesses optimize operations, ensure transparent management, and achieve sustainable growth through automation and intelligent data.', ko: 'KAS는 자동화 및 지능형 데이터를 통해 비즈니스가 운영을 최적화하고 투명한 관리를 보장하며 지속 가능한 성장을 달성할 수 있도록 포괄적인 AI 기반 솔루션 생태계를 제공합니다.', zh: 'KAS提供全面的AI驱动解决方案生态系统，帮助企业通过自动化和智能数据优化运营、确保透明管理，实现可持续增长。', ja: 'KASは、ビジネスが運用を最適化し、透明な管理を確保し、自動化とインテリジェントデータを通じて持続可能な成長を達成できるようにする包括的なAI駆動ソリューションエコシステムを提供します。' },
  missionDesc: { vi: 'Phát triển và cung cấp các sản phẩm công nghệ chất lượng cao, giúp tối ưu hóa hoạt động kinh doanh, nâng cao hiệu suất làm việc và tạo ra giá trị bền vững cho khách hàng.', en: 'Develop and provide high-quality technology products that optimize business operations, enhance work efficiency, and create sustainable value for customers.', ko: '비즈니스 운영을 최적화하고 업무 효율성을 향상시키며 고객에게 지속 가능한 가치를 창출하는 고품질 기술 제품을 개발하고 제공합니다.', zh: '开发和提供优质技术产品，优化业务运营，提高工作效率，为客户创造可持续价值。', ja: 'ビジネス運営を最適化し、作業効率を向上させ、顧客に持続可能な価値を創造する高品質なテクノロジー製品を開発・提供します。' },
  
  // Core Values
  valuesBadge: { vi: 'Giá trị cốt lõi', en: 'Core Values', ko: '핵심 가치', zh: '核心价值观', ja: 'コアバリュー' },
  valuesTitle: { vi: 'Giá trị cốt lõi', en: 'Core Values', ko: '핵심 가치', zh: '核心价值观', ja: 'コアバリュー' },
  value1: { vi: 'Sáng tạo', en: 'Innovation', ko: '혁신', zh: '创新', ja: 'イノベーション' },
  value1Desc: { vi: 'Luôn tiên phong ứng dụng AI & công nghệ mới để tạo ra giải pháp đột phá', en: 'Always pioneering in applying AI & new technologies to create breakthrough solutions', ko: '항상 AI 및 새로운 기술을 적용하여 획기적인 솔루션을 창출하는 데 앞장서고 있습니다', zh: '始终在应用AI和新技术方面处于领先地位，创造突破性解决方案', ja: '常にAIと新技術の適用において先駆者であり、画期的なソリューションを創造しています' },
  value2: { vi: 'Chính trực', en: 'Integrity', ko: '진실성', zh: '诚信', ja: '誠実' },
  value2Desc: { vi: 'Minh bạch, trung thực và giữ trọn uy tín trong mọi cam kết', en: 'Transparency, honesty, and maintaining credibility in all commitments', ko: '모든 약속에서 투명성, 정직성 및 신뢰성 유지', zh: '在所有承诺中保持透明、诚实和信誉', ja: 'すべてのコミットメントにおいて透明性、誠実さ、信頼性を維持する' },
  value3: { vi: 'Hiệu quả', en: 'Efficiency', ko: '탁월함', zh: '卓越', ja: '卓越' },
  value3Desc: { vi: 'Tối ưu quy trình và giải pháp để mang lại hiệu quả vượt trội', en: 'Optimizing processes and solutions to deliver exceptional efficiency', ko: '탁월한 효율성을 제공하기 위해 프로세스 및 솔루션 최적화', zh: '优化流程和解决方案以提供卓越的效率', ja: '卓越した効率を提供するためにプロセスとソリューションを最適化する' },
  value4: { vi: 'Khách hàng', en: 'Customer', ko: '고객 중심', zh: '以客户为中心', ja: '顧客中心' },
  value4Desc: { vi: 'Lấy khách hàng làm trung tâm, thấu hiểu và đồng hành phát triển', en: 'Customer-centric, understanding and accompanying development', ko: '고객 중심, 이해 및 동반 개발', zh: '以客户为中心，理解并伴随发展', ja: '顧客中心、理解と伴走開発' },
  value5: { vi: 'Tăng trưởng', en: 'Growth', ko: '성장', zh: '成长', ja: '成長' },
  value5Desc: { vi: 'Tăng trưởng nhanh, bền vững và dài hạn cho cả KAS và khách hàng', en: 'Rapid, sustainable, and long-term growth for both KAS and customers', ko: 'KAS와 고객 모두를 위한 빠르고 지속 가능하며 장기적인 성장', zh: 'KAS和客户的快速、可持续和长期增长', ja: 'KASと顧客のための迅速で持続可能かつ長期的な成長' },

  // Roadmap
  roadmapBadge: { vi: 'Lộ trình phát triển', en: 'Development Roadmap', ko: '개발 로드맵', zh: '发展路线图', ja: '開発ロードマップ' },
  roadmapTitle: { vi: 'Lộ trình phát triển KAS', en: 'KAS Development Roadmap', ko: 'KAS 개발 로드맵', zh: 'KAS发展路线图', ja: 'KAS開発ロードマップ' },
  roadmap2015: { vi: '2015 - Thành lập', en: '2015 - Establishment', ko: '2015 - 설립', zh: '2015 - 成立', ja: '2015 - 設立' },
  roadmap2015Desc: { vi: 'Tập trung phát triển giải pháp POS cho mô hình chuỗi FnB, Retail', en: 'Focused on developing POS solutions for FnB and Retail chain models', ko: 'FnB 및 소매 체인 모델을 위한 POS 솔루션 개발에 집중', zh: '专注于为餐饮和零售连锁模式开发POS解决方案', ja: 'FnBおよび小売チェーンモデル向けのPOSソリューション開発に注力' },
  roadmap2018: { vi: '2018 - Mở rộng thị trường, Đối tác', en: '2018 - Market Expansion, Partnership', ko: '2018 - 시장 확장, 파트너십', zh: '2018 - 市场扩张，合作伙伴', ja: '2018 - 市場拡大、パートナーシップ' },
  roadmap2018Desc: { vi: 'Được nhiều chuỗi FnB, Retail đang mở rộng chuỗi và tăng trưởng chọn lựa là Đối tác công nghệ đồng hành. Tích hợp giải pháp với hầu hết các nền tảng bán hàng, thanh toán, chăm sóc khách hàng tại Việt Nam.', en: 'Chosen as technology partner by many expanding FnB and Retail chains. Integrated solutions with most sales, payment, and customer care platforms in Vietnam.', ko: '확장 중인 많은 FnB 및 소매 체인의 기술 파트너로 선정. 베트남의 대부분의 판매, 결제 및 고객 관리 플랫폼과 솔루션 통합.', zh: '被许多扩张中的餐饮和零售连锁店选为技术合作伙伴。与越南大多数销售、支付和客户服务平台集成解决方案。', ja: '拡大中の多くのFnBおよび小売チェーンの技術パートナーとして選ばれる。ベトナムのほとんどの販売、決済、顧客ケアプラットフォームとソリューションを統合。' },
  roadmap2020: { vi: '2020 - Mở rộng giải pháp theo hướng ERP', en: '2020 - ERP Solution Expansion', ko: '2020 - ERP 솔루션 확장', zh: '2020 - ERP解决方案扩展', ja: '2020 - ERPソリューション拡張' },
  roadmap2020Desc: { vi: 'Phát triển nền tảng quản trị tập trung, triển khai giải pháp theo hướng chuyển đổi số, đồng thời tích hợp với các hệ thống Kế toán, ERP trong và ngoài nước.', en: 'Developed centralized management platform, implemented digital transformation solutions, and integrated with domestic and international Accounting and ERP systems.', ko: '중앙 집중식 관리 플랫폼 개발, 디지털 전환 솔루션 구현, 국내외 회계 및 ERP 시스템과 통합.', zh: '开发集中管理平台，实施数字化转型解决方案，并与国内外会计和ERP系统集成。', ja: '集中管理プラットフォームを開発し、デジタルトランスフォーメーションソリューションを実装し、国内外の会計およびERPシステムと統合。' },
  roadmap2025: { vi: '2025 - Go SaaS, Go Mass', en: '2025 - Go SaaS, Go Mass', ko: '2025 - Go SaaS, Go Mass', zh: '2025 - Go SaaS, Go Mass', ja: '2025 - Go SaaS, Go Mass' },
  roadmap2025Desc: { vi: 'Triển khai mô hình kinh doanh giải pháp POS và ERP theo mô hình kinh doanh SaaS bên cạnh mô hình thực hiện theo dự án cho các Khách hàng lớn. Năm 2025 cũng là thời điểm KAS tham gia mở rộng xuống thị trường mass với giải pháp POSONE được phân phối qua nhiều Đối tác chiến lược.', en: 'Implemented SaaS business model for POS and ERP solutions alongside project-based model for large clients. 2025 marks KAS\'s expansion into mass market with POSONE solution distributed through strategic partners.', ko: 'SaaS 비즈니스 모델로 POS 및 ERP 솔루션 구현과 함께 대형 고객을 위한 프로젝트 기반 모델 운영. 2025년은 KAS가 전략적 파트너를 통해 배포되는 POSONE 솔루션으로 대중 시장으로 확장하는 해입니다.', zh: '实施POS和ERP解决方案的SaaS业务模式，同时为大客户提供基于项目的模式。2025年标志着KAS通过战略合作伙伴分销POSONE解决方案，向大众市场扩张。', ja: 'POSおよびERPソリューションのSaaSビジネスモデルを実装し、大規模クライアント向けのプロジェクトベースモデルと並行運用。2025年は、戦略的パートナーを通じて配信されるPOSONEソリューションで大衆市場に拡大する年です。' },
  roadmap2026: { vi: '2026 - From SaaS to Platform', en: '2026 - From SaaS to Platform', ko: '2026 - From SaaS to Platform', zh: '2026 - From SaaS to Platform', ja: '2026 - From SaaS to Platform' },
  roadmap2026Desc: { vi: 'Từ năm 2026, KAS triển khai chiến lược SUITE-FIRST và AI-FIRST, cung cấp cho thị trường các giải pháp AI-Driven Platform toàn diện.', en: 'From 2026, KAS implements SUITE-FIRST and AI-FIRST strategies, providing comprehensive AI-Driven Platform solutions to the market.', ko: '2026년부터 KAS는 SUITE-FIRST 및 AI-FIRST 전략을 구현하여 시장에 포괄적인 AI 기반 플랫폼 솔루션을 제공합니다.', zh: '从2026年开始，KAS实施SUITE-FIRST和AI-FIRST战略，为市场提供全面的AI驱动平台解决方案。', ja: '2026年から、KASはSUITE-FIRSTおよびAI-FIRST戦略を実施し、市場に包括的なAI駆動プラットフォームソリューションを提供します。' },
  
  // Pricing
  pricingBadge: { vi: 'Gói dịch vụ', en: 'Service Packages', ko: '서비스 패키지', zh: '服务套餐', ja: 'サービスパッケージ' },
  pricingTitle: { vi: 'Grow with KAS — From Seed to Legacy', en: 'Grow with KAS — From Seed to Legacy', ko: 'KAS와 함께 성장 — 씨앗에서 유산까지', zh: '与KAS一起成长——从种子到传承', ja: 'KASと共に成長—種から遺産へ' },
  pricingTitle2: { vi: 'Từ hạt mầm đến di sản, KAS POS đồng hành cùng hành trình phát triển của bạn', en: 'From Seed to Legacy, KAS POS accompanies your growth journey', ko: '씨앗에서 유산까지, KAS POS는 귀하의 성장 여정을 동반합니다', zh: '从种子到传承，KAS POS伴随您的成长之旅', ja: '種から遺産へ、KAS POSはあなたの成長の旅に同行します' },
  
  // Seed Plan
  seedPlan: { vi: 'Seed', en: 'Seed', ko: 'Seed', zh: 'Seed', ja: 'Seed' },
  seedTarget: { vi: 'Khách hàng', en: 'Target Customer', ko: '대상 고객', zh: '目标客户', ja: 'ターゲット顧客' },
  seedDesc1: { vi: 'Dành cho cửa hàng mới mở hoặc startup trong lĩnh vực FnB, Retail, Spa, Mini mart', en: 'For newly opened stores or startups in FnB, Retail, Spa, Mini mart', ko: 'FnB, 소매, 스파, 미니마트 분야의 신규 매장이나 스타트업을 위한', zh: '适用于餐饮、零售、水疗、便利店领域的新开店铺或创业公司', ja: 'FnB、小売、スパ、ミニマート分野の新規開業店舗やスタートアップ向け' },
  seedDesc2: { vi: 'Cần số hóa quy trình bán hàng ngay từ đầu', en: 'Need to digitize sales process from the start', ko: '처음부터 판매 프로세스를 디지털화해야 합니다', zh: '需要从一开始就数字化销售流程', ja: '最初から販売プロセスをデジタル化する必要があります' },
  seedDesc3: { vi: 'Cần phần mềm dễ dùng, giá hợp lý, triển khai nhanh, không cần nhân viên IT', en: 'Need easy-to-use, affordable software with quick deployment, no IT staff required', ko: '사용하기 쉽고 합리적인 가격의 소프트웨어가 필요하며 빠른 배포가 가능하고 IT 직원이 필요하지 않습니다', zh: '需要易用、价格合理、快速部署、无需IT人员的软件', ja: '使いやすく、手頃な価格で、迅速な展開が可能で、IT スタッフ不要のソフトウェアが必要' },
  seedFeatures: { vi: 'Đặc điểm:', en: 'Features:', ko: '특징:', zh: '特点:', ja: '特徴:' },
  seedFeature1: { vi: 'Thiết lập điểm bán trong vài phút, sẵn sàng hoạt động ngay', en: 'Set up POS in minutes, ready to operate immediately', ko: '몇 분 안에 POS 설정, 즉시 운영 가능', zh: '几分钟内设置POS，立即准备运营', ja: '数分でPOSをセットアップし、すぐに運用可能' },
  seedFeature2: { vi: 'Giao diện thân thiện, thao tác nhanh – phù hợp nhân viên mới', en: 'User-friendly interface, quick operation – suitable for new staff', ko: '사용자 친화적 인터페이스, 빠른 작동 - 신입 직원에게 적합', zh: '友好的界面，快速操作 - 适合新员工', ja: 'ユーザーフレンドリーなインターフェース、迅速な操作 - 新しいスタッフに最適' },
  seedFeature3: { vi: 'Quản lý đơn hàng, doanh thu, tồn kho cơ bản trên 1 màn hình', en: 'Manage orders, revenue, basic inventory on one screen', ko: '하나의 화면에서 주문, 수익, 기본 재고 관리', zh: '在一个屏幕上管理订单、收入、基本库存', ja: '1つの画面で注文、収益、基本在庫を管理' },
  seedFeature4: { vi: 'Báo cáo ngày – ca – doanh số – top món bán chạy', en: 'Daily – shift – sales – top selling items reports', ko: '일일 - 교대 - 판매 - 베스트셀러 보고서', zh: '日报 - 班次 - 销售 - 畅销商品报告', ja: '日次 - シフト - 売上 - ベストセラーアイテムレポート' },
  seedFeature5: { vi: 'Hỗ trợ đa thiết bị (POS, tablet, điện thoại)', en: 'Multi-device support (POS, tablet, phone)', ko: '다중 장치 지원 (POS, 태블릿, 전화)', zh: '多设备支持（POS、平板电脑、手机）', ja: 'マルチデバイスサポート（POS、タブレット、電話）' },
  seedFeature6: { vi: 'Tích hợp ví điện tử & máy in hóa đơn', en: 'E-wallet & invoice printer integration', ko: '전자 지갑 및 송장 프린터 통합', zh: '电子钱包和发票打印机集成', ja: '電子ウォレットと請求書プリンターの統合' },
  seedQuote: { vi: 'Giúp bạn bắt đầu hành trình kinh doanh chuyên nghiệp, nhanh chóng và tiết kiệm.', en: 'Help you start your professional business journey quickly and cost-effectively.', ko: '전문적인 비즈니스 여정을 빠르고 비용 효율적으로 시작할 수 있도록 도와드립니다.', zh: '帮助您快速且经济高效地开始专业的商业之旅。', ja: 'プロフェッショナルなビジネスの旅を迅速かつ費用対効果的に開始できるようサポートします。' },
  
  // Bloom Plan
  bloomPlan: { vi: 'Bloom', en: 'Bloom', ko: 'Bloom', zh: 'Bloom', ja: 'Bloom' },
  bloomTarget: { vi: 'Dành cho doanh nghiệp đang tăng trưởng', en: 'For growing businesses', ko: '성장하는 기업을 위한', zh: '适用于成长中的企业', ja: '成長中の企業向け' },
  bloomDesc1: { vi: 'Quy mô từ 2–10 chi nhánh, muốn quản lý tập trung dữ liệu và nhân sự', en: '2-10 branches, centralized data and HR management', ko: '2-10개 지점, 중앙 집중식 데이터 및 인사 관리', zh: '2-10个分支机构，集中数据和人力资源管理', ja: '2〜10支店、集中データおよび人事管理' },
  bloomDesc2: { vi: 'Đang mở rộng, bắt đầu thấy khó kiểm soát tồn kho, doanh thu, nhân viên giữa các chi nhánh', en: 'Expanding, difficulty controlling inventory, revenue, staff across branches', ko: '확장 중, 지점 간 재고, 수익, 직원 통제의 어려움', zh: '扩张中，难以控制分支机构之间的库存、收入、员工', ja: '拡大中、支店間の在庫、収益、スタッフの管理が困難' },
  bloomFeature1: { vi: 'Quản lý tập trung nhiều chi nhánh trong 1 hệ thống', en: 'Centralized multi-branch management in one system', ko: '하나의 시스템에서 여러 지점 중앙 관리', zh: '在一个系统中集中管理多个分支机构', ja: '1つのシステムで複数支店の集中管理' },
  bloomFeature2: { vi: 'Theo dõi doanh số từng cửa hàng, ca làm, nhân viên', en: 'Track sales by store, shift, employee', ko: '매장, 교대, 직원별 판매 추적', zh: '按商店、班次、员工跟踪销售', ja: '店舗、シフト、従業員別の売上追跡' },
  bloomFeature3: { vi: 'Quản lý kho liên chi nhánh, chuyển hàng nội bộ dễ dàng', en: 'Inter-branch inventory management, easy internal transfers', ko: '지점 간 재고 관리, 쉬운 내부 이동', zh: '分支机构间库存管理，轻松内部转移', ja: '支店間在庫管理、簡単な内部転送' },
  bloomFeature4: { vi: 'Báo cáo phân tích theo khu vực, sản phẩm, thời gian', en: 'Analytical reports by region, product, time', ko: '지역, 제품, 시간별 분석 보고서', zh: '按地区、产品、时间的分析报告', ja: '地域、製品、時間別の分析レポート' },
  bloomFeature5: { vi: 'Tích hợp CRM cơ bản – quản lý khách hàng & khuyến mãi', en: 'Basic CRM integration – customer & promotion management', ko: '기본 CRM 통합 – 고객 및 프로모션 관리', zh: '基本CRM集成 – 客户和促销管理', ja: '基本的なCRM統合 – 顧客とプロモーション管理' },
  bloomFeature6: { vi: 'Hỗ trợ team vận hành và kế toán xuất báo cáo nhanh', en: 'Support operations & accounting teams with quick reports', ko: '빠른 보고서로 운영 및 회계팀 지원', zh: '通过快速报告支持运营和会计团队', ja: '迅速なレポートで運営および会計チームをサポート' },
  bloomQuote: { vi: 'Tăng trưởng vững chắc, kiểm soát tập trung – KAS POS đồng hành cùng bạn trên hành trình mở rộng.', en: 'Solid growth, centralized control – KAS POS accompanies you on your expansion journey.', ko: '견고한 성장, 중앙 집중식 제어 – KAS POS는 확장 여정에서 귀하와 함께합니다.', zh: '稳健增长，集中控制 – KAS POS伴随您的扩张之旅。', ja: '確実な成長、集中管理 – KAS POSはあなたの拡張の旅に同行します。' },
  
  // Thrive Plan
  thrivePlan: { vi: 'Thrive', en: 'Thrive', ko: 'Thrive', zh: 'Thrive', ja: 'Thrive' },
  thriveTarget: { vi: 'Dành cho doanh nghiệp quy mô vừa đến lớn', en: 'For medium to large enterprises', ko: '중대형 기업을 위한', zh: '适用于中大型企业', ja: '中堅から大企業向け' },
  thriveDesc1: { vi: 'Từ 10–100 cửa hàng, cần tối ưu vận hành, phân tích dữ liệu, và tự động hóa quy trình', en: '10-100 stores, optimize operations, data analysis, process automation', ko: '10-100개 매장, 운영 최적화, 데이터 분석, 프로세스 자동화', zh: '10-100家店铺，优化运营、数据分析、流程自动化', ja: '10〜100店舗、運営最適化、データ分析、プロセス自動化' },
  thriveDesc2: { vi: 'Cần hệ thống mạnh, dữ liệu thời gian thực, kết nối các bộ phận để ra quyết định nhanh', en: 'Need powerful system, real-time data, department connectivity for quick decisions', ko: '강력한 시스템, 실시간 데이터, 빠른 의사 결정을 위한 부서 연결 필요', zh: '需要强大的系统、实时数据、部门连接以快速决策', ja: '強力なシステム、リアルタイムデータ、迅速な意思決定のための部門接続が必要' },
  thriveFeature1: { vi: 'Quản lý chuỗi cửa hàng trên toàn quốc, dữ liệu realtime', en: 'Nationwide chain management with real-time data', ko: '실시간 데이터로 전국 체인 관리', zh: '实时数据的全国连锁管理', ja: 'リアルタイムデータによる全国チェーン管理' },
  thriveFeature2: { vi: 'Phân quyền đa cấp cho chi nhánh, khu vực, quản lý vùng', en: 'Multi-level permissions for branches, regions, area management', ko: '지점, 지역, 구역 관리를 위한 다단계 권한', zh: '分支机构、地区、区域管理的多级权限', ja: '支店、地域、エリア管理のための多段階権限' },
  thriveFeature3: { vi: 'Tự động đồng bộ dữ liệu giữa POS – kho – kế toán', en: 'Auto-sync data between POS – inventory – accounting', ko: 'POS – 재고 – 회계 간 자동 데이터 동기화', zh: 'POS – 库存 – 会计之间的自动数据同步', ja: 'POS – 在庫 – 会計間の自動データ同期' },
  thriveFeature4: { vi: 'Dashboard phân tích doanh thu, chi phí, lợi nhuận theo KPI', en: 'KPI dashboard analyzing revenue, costs, profit', ko: 'KPI 대시보드로 수익, 비용, 이익 분석', zh: 'KPI仪表板分析收入、成本、利润', ja: 'KPIダッシュボードによる収益、コスト、利益の分析' },
  thriveFeature5: { vi: 'API kết nối ERP, CRM, Loyalty, E-invoice, Payment Gateway', en: 'API connects ERP, CRM, Loyalty, E-invoice, Payment Gateway', ko: 'ERP, CRM, Loyalty, E-invoice, Payment Gateway 연결 API', zh: 'API连接ERP、CRM、Loyalty、电子发票、支付网关', ja: 'ERP、CRM、Loyalty、電子請求書、決済ゲートウェイを接続するAPI' },
  thriveFeature6: { vi: 'Tích hợp AI gợi ý hàng tồn, dự báo doanh số, tối ưu thực đơn', en: 'AI integration for inventory suggestions, sales forecasting, menu optimization', ko: '재고 제안, 판매 예측, 메뉴 최적화를 위한 AI 통합', zh: 'AI集成用于库存建议、销售预测、菜单优化', ja: '在庫提案、売上予測、メニュー最適化のためのAI統合' },
  thriveQuote: { vi: 'Tăng tốc chuỗi của bạn với sức mạnh dữ liệu và tự động hóa thông minh từ KAS.', en: 'Accelerate your chain with data power and smart automation from KAS.', ko: 'KAS의 데이터 파워와 스마트 자동화로 체인을 가속화하세요.', zh: '使用KAS的数据力量和智能自动化加速您的连锁店。', ja: 'KASのデータパワーとスマート自動化でチェーンを加速。' },
  
  // Legacy Plan
  legacyPlan: { vi: 'Legacy', en: 'Legacy', ko: 'Legacy', zh: 'Legacy', ja: 'Legacy' },
  legacyTarget: { vi: 'Giải pháp dành cho tập đoàn, thương hiệu chuỗi lớn', en: 'Solution for corporations, large chain brands', ko: '기업, 대형 체인 브랜드를 위한 솔루션', zh: '适用于集团、大型连锁品牌的解决方案', ja: '企業、大規模チェーンブランド向けソリューション' },
  legacyDesc1: { vi: '100+ cửa hàng, multi-brand, multi-country', en: '100+ stores, multi-brand, multi-country', ko: '100개 이상의 매장, 멀티 브랜드, 멀티 국가', zh: '100+家店铺，多品牌，多国家', ja: '100店舗以上、マルチブランド、マルチカントリー' },
  legacyDesc2: { vi: 'Cần hệ thống POS mạnh mẽ, tùy chỉnh linh hoạt, kết nối toàn bộ hệ sinh thái vận hành', en: 'Need powerful POS system, flexible customization, full ecosystem connectivity', ko: '강력한 POS 시스템, 유연한 맞춤화, 전체 생태계 연결 필요', zh: '需要强大的POS系统、灵活的定制、全生态系统连接', ja: '強力なPOSシステム、柔軟なカスタマイズ、フルエコシステム接続が必要' },
  legacyDesc3: { vi: 'Cần giải pháp riêng biệt', en: 'Need dedicated solution', ko: '전용 솔루션 필요', zh: '需要专用解决方案', ja: '専用ソリューションが必要' },
  legacyFeature1: { vi: 'Quản lý tập trung nhiều thương hiệu, quốc gia, ngôn ngữ, tiền tệ', en: 'Centralized multi-brand, country, language, currency management', ko: '다중 브랜드, 국가, 언어, 통화 중앙 관리', zh: '集中管理多品牌、国家、语言、货币', ja: 'マルチブランド、国、言語、通貨の集中管理' },
  legacyFeature2: { vi: 'Hệ thống tùy chỉnh workflow, báo cáo BI, AI Insight chuyên sâu', en: 'Customizable workflow, BI reporting, deep AI Insights', ko: '사용자 정의 워크플로, BI 보고, 심층 AI 인사이트', zh: '可定制工作流程、BI报告、深度AI洞察', ja: 'カスタマイズ可能なワークフロー、BIレポート、深いAIインサイト' },
  legacyFeature3: { vi: 'Tích hợp ERP, HRM, CRM, Loyalty, Voucher Hub, Payment Hub', en: 'Integration with ERP, HRM, CRM, Loyalty, Voucher Hub, Payment Hub', ko: 'ERP, HRM, CRM, Loyalty, Voucher Hub, Payment Hub 통합', zh: '集成ERP、HRM、CRM、Loyalty、Voucher Hub、Payment Hub', ja: 'ERP、HRM、CRM、Loyalty、Voucher Hub、Payment Hubとの統合' },
  legacyFeature4: { vi: 'Bảo mật cấp doanh nghiệp, phân quyền phức hợp', en: 'Enterprise-grade security, complex permissions', ko: '엔터프라이즈급 보안, 복잡한 권한', zh: '企业级安全、复杂权限', ja: 'エンタープライズグレードのセキュリティ、複雑な権限' },
  legacyFeature5: { vi: 'Hạ tầng Cloud riêng, hiệu năng cao, uptime 99.99%', en: 'Private cloud infrastructure, high performance, 99.99% uptime', ko: '프라이빗 클라우드 인프라, 고성능, 99.99% 가동 시간', zh: '私有云基础设施、高性能、99.99%正常运行时间', ja: 'プライベートクラウドインフラ、高性能、99.99%稼働時間' },
  legacyFeature6: { vi: 'Đội ngũ triển khai & hỗ trợ riêng (Dedicated Account Team)', en: 'Dedicated deployment & support team', ko: '전담 배포 및 지원팀', zh: '专门的部署和支持团队', ja: '専任の展開およびサポートチーム' },
  legacyQuote: { vi: 'Từ hệ thống chuỗi đến tập đoàn – KAS POS là nền tảng vận hành trung tâm cho doanh nghiệp của bạn.', en: 'From chain system to corporation – KAS POS is the central operating platform for your business.', ko: '체인 시스템에서 기업까지 – KAS POS는 귀하의 비즈니스를 위한 중앙 운영 플랫폼입니다.', zh: '从连锁系统到集团 – KAS POS是您业务的中央运营平台。', ja: 'チェーンシステムから企業まで – KAS POSはあなたのビジネスの中心的な運営プラットフォームです。' },
  
  // Pricing
  seedPrice: { vi: '299,000₫', en: '$12', ko: '$12', zh: '$12', ja: '$12' },
  bloomPrice: { vi: '399,000₫', en: '$16', ko: '$16', zh: '$16', ja: '$16' },
  thrivePrice: { vi: '599,000₫', en: '$24', ko: '$24', zh: '$24', ja: '$24' },
  legacyPrice: { vi: '999,000₫', en: '$40', ko: '$40', zh: '$40', ja: '$40' },
  perStorePerMonth: { vi: '/cửa hàng/tháng', en: '/store/month', ko: '/매장/월', zh: '/店铺/月', ja: '/店舗/月' },
  
  contactForPrice: { vi: 'Liên hệ báo giá', en: 'Contact for pricing', ko: '가격 문의', zh: '联系报价', ja: '価格についてお問い合わせ' },
  
  // Workplace Section
  workplaceBadge: { vi: 'SUITE-FIRST, AI-FIRST', en: 'SUITE-FIRST, AI-FIRST', ko: 'SUITE-FIRST, AI-FIRST', zh: 'SUITE-FIRST, AI-FIRST', ja: 'SUITE-FIRST, AI-FIRST' },
  workplaceTitle: { vi: 'Hệ Sinh Thái Ứng Dụng', en: 'Application Ecosystem', ko: '애플리케이션 생태계', zh: '应用生态系统', ja: 'アプリケーションエコシステム' },
  workplaceSubtitle: { vi: 'Mang lại giải pháp AI-Driven toàn diện cho Doanh nghiệp', en: 'Delivering comprehensive AI-Driven solutions for Enterprises', ko: '기업을 위한 포괄적인 AI 기반 솔루션 제공', zh: '为企业提供全面的AI驱动解决方案', ja: '企業向けに包括的なAI駆動ソリューションを提供' },
  workplaceDesc: { vi: 'Tài chính - Khách hàng - Quản trị nội bộ - Đào tạo và phát triển', en: 'Finance - Customers - Internal Management - Training and Development', ko: '재무 - 고객 - 내부 관리 - 교육 및 개발', zh: '财务 - 客户 - 内部管理 - 培训与发展', ja: '財務 - 顧客 - 内部管理 - トレーニングと開発' },

   // Koffice
  koffice: { vi: 'KOFFICE', en: 'KOFFICE', ko: 'KOFFICE', zh: 'KOFFICE', ja: 'KOFFICE' },
  kofficeDesc: { vi: 'Nền tảng quản trị doanh nghiệp cùng AI', en: 'The AI-Powered Business Platform', ko: 'AI 기반 비즈니스 플랫폼', zh: 'AI驱动的商业平台', ja: 'AI搭載ビジネスプラットフォーム' },
  
  // Kos
  kos: { vi: 'KOS', en: 'KOS', ko: 'KOS', zh: 'KOS', ja: 'KOS' },
  kosDesc: { vi: 'Từ chiến lược đến thực thi', en: 'Action by Vision', ko: '비전에서 실행으로', zh: '从战略到执行', ja: 'ビジョンから実行へ' },
  
  // Kops
  kops: { vi: 'KOPS', en: 'KOPS', ko: 'KOPS', zh: 'KOPS', ja: 'KOPS' },
  kopsDesc: { vi: 'Vận hành xuất sắc', en: 'Operational Excellence', ko: '운영 우수성', zh: '卓越运营', ja: 'オペレーショナルエクセレンス' },
  
  // Kforce
  kforce: { vi: 'KFORCE', en: 'KFORCE', ko: 'KFORCE', zh: 'KFORCE', ja: 'KFORCE' },
  kforceDesc: { vi: 'Phát triển nhân tài. Kiến tạo tương lai', en: 'Build Talent. Shape the Future.', ko: '인재 육성. 미래 창조', zh: '培养人才·塑造未来', ja: '人材育成·未来を創る' },
  
  // Ksign
  ksign: { vi: 'KSIGN', en: 'KSIGN', ko: 'KSIGN', zh: 'KSIGN', ja: 'KSIGN' },
  ksignDesc: { vi: 'Ký nhanh, bảo vệ hành tinh xanh', en: 'Sign fast, save green', ko: '빠른 서명, 친환경 보호', zh: '快速签署，保护绿色星球', ja: '迅速署名、地球を守る' },

  //Klinks
  klinks: { vi: 'KLINKS', en: 'KLINKS', ko: 'KLINKS', zh: 'KLINKS', ja: 'KLINKS' },
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
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4),
                        0 0 40px rgba(59, 130, 246, 0.2); 
          }
          50% { 
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6),
                        0 0 60px rgba(59, 130, 246, 0.3),
                        0 0 80px rgba(59, 130, 246, 0.1); 
          }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
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
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        .stagger-1 {
          animation-delay: 0.1s;
        }
        .stagger-2 {
          animation-delay: 0.2s;
        }
        .stagger-3 {
          animation-delay: 0.3s;
        }
        .stagger-4 {
          animation-delay: 0.4s;
        }
        .stagger-5 {
          animation-delay: 0.5s;
        }
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        .card-3d:hover {
          transform: translateY(-8px) rotateX(2deg);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .text-shadow-glow {
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Background with Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/30 to-transparent -z-10 animate-gradient" />
        
        {/* Animated Orbs with Parallax Effect */}
        <div 
          className="absolute top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-indigo-400/20 rounded-full blur-3xl -z-10 animate-float"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute top-40 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10 animate-float" 
          style={{animationDelay: '1s', transform: `translateY(${scrollY * 0.2}px)`}} 
        />
        <div 
          className="absolute bottom-20 left-1/4 w-[350px] h-[350px] bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl -z-10 animate-float" 
          style={{animationDelay: '2s', transform: `translateY(${scrollY * 0.25}px)`}} 
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 -z-10" />

        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Badge with Enhanced Animation */}
          <div className="inline-flex items-center space-x-2 glass-effect bg-gradient-to-r from-blue-500/90 to-indigo-500/90 text-blue-500 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-2xl animate-fade-in-scale border border-white/20">
            <Star size={18} fill="currentColor" className="animate-bounce-subtle" />
            <span className="tracking-wide">{t('badge')}</span>
            <Sparkles size={18} className="animate-pulse" />
          </div>

          {/* Main Title with Stagger Animation */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-slide-up bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient text-shadow-glow">
              {t('heroTitle')}
            </span>
          </h1>

          {/* Subtitle with Stagger */}
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-bold animate-slide-up stagger-1">
            {t('heroSubtitle')}
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-2">
            {t('heroDesc')}
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up stagger-3">
            <Link
              href="https://kas.asia/register"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 flex items-center space-x-3 hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Zap size={22} className="relative z-10 group-hover:animate-bounce-subtle" />
              <span className="relative z-10 text-lg">{t('registerNow')}</span>
              <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#contact"
              className="group px-10 py-5 glass-effect bg-white/80 border-2 border-blue-500 text-blue-700 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 flex items-center space-x-3 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span className="text-lg">{t('contactUs')}</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce-subtle opacity-60">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative">
              <div className="w-1.5 h-3 bg-gray-400 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center space-x-3 glass-effect bg-blue-50/80 text-blue-600 px-6 py-3 rounded-full text-lg font-bold uppercase tracking-wide mb-8 shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-300">
            <Target size={24} className="animate-pulse" />
            <span>{t('visionBadge')}</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>

          {/* Enhanced Title with Card Effect */}
          <div className="glass-effect bg-gradient-to-br from-white/80 to-blue-50/30 rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-100/50 hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent animate-gradient inline-block">
                {t('visionTitle')}
              </span>
            </h2>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce-subtle" />
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce-subtle" style={{animationDelay: '0.1s'}} />
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce-subtle" style={{animationDelay: '0.2s'}} />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-purple-50/30 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center space-x-3 glass-effect bg-purple-50/80 text-purple-600 px-6 py-3 rounded-full text-lg font-bold uppercase tracking-wide mb-8 shadow-lg border border-purple-100 hover:scale-105 transition-transform duration-300">
            <Heart size={24} className="animate-pulse" fill="currentColor" />
            <span>{t('missionBadge')}</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          </div>

          {/* Enhanced Title with Card Effect */}
          <div className="glass-effect bg-gradient-to-br from-white/80 to-purple-50/30 rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-100/50 hover:shadow-purple-200/50 transition-all duration-500 hover:-translate-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 bg-clip-text text-transparent animate-gradient inline-block">
                {t('missionTitle')}
              </span>
            </h2>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce-subtle" />
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce-subtle" style={{animationDelay: '0.1s'}} />
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce-subtle" style={{animationDelay: '0.2s'}} />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="values" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-xl font-bold uppercase tracking-wide mb-6">
              <Gem size={20} />
              <span>{t('valuesBadge')}</span>
            </div>
            {/* <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t('valuesTitle')}
              </span>
            </h2> */}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
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

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('value5')}</h3>
              <p className="text-gray-600">{t('value5Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SectionbSectionboor */}
      <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-xl font-bold uppercase tracking-wide">
              <TrendingUp size={20} />
              <span>{t('roadmapBadge')}</span>
            </div>
          </div>

          <div className="relative">
            {/* Vertical timeline line for mobile */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 md:hidden"></div>
            
            {/* Horizontal timeline line for desktop */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hidden md:block"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
              {[
                { year: t('roadmap2015'), desc: t('roadmap2015Desc'), color: 'blue' },
                { year: t('roadmap2018'), desc: t('roadmap2018Desc'), color: 'indigo' },
                { year: t('roadmap2020'), desc: t('roadmap2020Desc'), color: 'purple' },
                { year: t('roadmap2025'), desc: t('roadmap2025Desc'), color: 'green' },
                { year: t('roadmap2026'), desc: t('roadmap2026Desc'), color: 'teal' },
              ].map((item, index) => (
                <div key={index} className="relative pl-12 md:pl-0">
                  {/* Timeline dot for mobile (left side) */}
                  <div className="absolute left-0 top-6 w-8 h-8 bg-white border-4 border-blue-500 rounded-full z-10 md:hidden"></div>
                  
                  {/* Timeline dot for desktop (top center) */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full z-10 hidden md:block"></div>
                  
                  {/* Content card */}
                  <div className="md:mt-20">
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 h-full">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{item.year}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
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
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xl font-bold uppercase tracking-wide mb-6">
              <Star size={20} />
              <span>{t('pricingBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
                {t('pricingTitle')}
              </span>
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                {t('pricingTitle2')}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Seed */}
            <div className="bg-white rounded-3xl p-6 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-2xl flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">{t('seedPlan')}</h3>
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">{t('seedPrice')}</p>
                <p className="text-sm text-gray-500">{t('perStorePerMonth')}</p>
              </div>
              
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('seedTarget')}</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• {t('seedDesc1')}</li>
                <li>• {t('seedDesc2')}</li>
                <li>• {t('seedDesc3')}</li>
              </ul>
              
              <p className="text-xs font-bold text-gray-900 mb-2">{t('seedFeatures')}</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>✓ {t('seedFeature1')}</li>
                <li>✓ {t('seedFeature2')}</li>
                <li>✓ {t('seedFeature3')}</li>
                <li>✓ {t('seedFeature4')}</li>
                <li>✓ {t('seedFeature5')}</li>
                <li>✓ {t('seedFeature6')}</li>
              </ul>
              
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <p className="text-xs italic text-green-800"> {t('seedQuote')}</p>
              </div>
              
              <Link href="#contact" className="block w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-center font-bold hover:from-green-700 hover:to-green-800 transition-all text-sm mt-auto">
                {t('contactUs')}
              </Link>
            </div>

            {/* Bloom */}
            <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-2xl relative flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{t('bloomPlan')}</h3>
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">{t('bloomPrice')}</p>
                <p className="text-sm text-gray-500">{t('perStorePerMonth')}</p>
              </div>
              
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('bloomTarget')}</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• {t('bloomDesc1')}</li>
                <li>• {t('bloomDesc2')}</li>
              </ul>
              
              <p className="text-xs font-bold text-gray-900 mb-2">{t('seedFeatures')}</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>✓ {t('bloomFeature1')}</li>
                <li>✓ {t('bloomFeature2')}</li>
                <li>✓ {t('bloomFeature3')}</li>
                <li>✓ {t('bloomFeature4')}</li>
                <li>✓ {t('bloomFeature5')}</li>
                <li>✓ {t('bloomFeature6')}</li>
              </ul>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-xs italic text-blue-800"> {t('bloomQuote')}</p>
              </div>
              
              <Link href="#contact" className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-center font-bold hover:from-blue-700 hover:to-blue-800 transition-all text-sm mt-auto">
                {t('contactUs')}
              </Link>
            </div>

            {/* Thrive */}
            <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-2xl flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">{t('thrivePlan')}</h3>
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">{t('thrivePrice')}</p>
                <p className="text-sm text-gray-500">{t('perStorePerMonth')}</p>
              </div>
              
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('thriveTarget')}</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• {t('thriveDesc1')}</li>
                <li>• {t('thriveDesc2')}</li>
              </ul>
              
              <p className="text-xs font-bold text-gray-900 mb-2">{t('seedFeatures')}</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>✓ {t('thriveFeature1')}</li>
                <li>✓ {t('thriveFeature2')}</li>
                <li>✓ {t('thriveFeature3')}</li>
                <li>✓ {t('thriveFeature4')}</li>
                <li>✓ {t('thriveFeature5')}</li>
                <li>✓ {t('thriveFeature6')}</li>
              </ul>
              
              <div className="bg-purple-50 p-3 rounded-lg mb-4">
                <p className="text-xs italic text-purple-800"> {t('thriveQuote')}</p>
              </div>
              
              <Link href="#contact" className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl text-center font-bold hover:from-purple-700 hover:to-purple-800 transition-all text-sm mt-auto">
                {t('contactUs')}
              </Link>
            </div>

            {/* Legacy */}
            <div className="bg-white rounded-3xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-2xl flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">{t('legacyPlan')}</h3>
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">{t('legacyPrice')}</p>
                <p className="text-sm text-gray-500">{t('perStorePerMonth')}</p>
              </div>
              
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('legacyTarget')}</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• {t('legacyDesc1')}</li>
                <li>• {t('legacyDesc2')}</li>
                <li>• {t('legacyDesc3')}</li>
              </ul>
              
              <p className="text-xs font-bold text-gray-900 mb-2">{t('seedFeatures')}</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>✓ {t('legacyFeature1')}</li>
                <li>✓ {t('legacyFeature2')}</li>
                <li>✓ {t('legacyFeature3')}</li>
                <li>✓ {t('legacyFeature4')}</li>
                <li>✓ {t('legacyFeature5')}</li>
                <li>✓ {t('legacyFeature6')}</li>
              </ul>
              
              <div className="bg-orange-50 p-3 rounded-lg mb-4">
                <p className="text-xs italic text-orange-800"> {t('legacyQuote')}</p>
              </div>
              
              <Link href="#contact" className="block w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl text-center font-bold hover:from-orange-700 hover:to-orange-800 transition-all text-sm mt-auto">
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
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 px-4 py-2 rounded-full text-xl font-bold uppercase tracking-wide mb-6">
              <Briefcase size={20} />
              <span>{t('workplaceBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
              href="https://koffice.ai/"
              target="_blank"
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
