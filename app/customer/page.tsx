"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Store, Users, Building2, TrendingUp, Coffee, Sparkles, Shield, ArrowRight, Star } from 'lucide-react';

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
  heroSubtitle: { vi: '80% Khách hàng đã đồng hành trên 5 năm', en: '80% of Customers have been with us for over 5 years', ko: '고객의 80%가 5년 이상 함께했습니다', zh: '80%的客户与我们合作超过5年', ja: '顧客の80％が5年以上お付き合いしています' },
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
  targetMarketBadge: { vi: 'QUY MÔ KHÁCH HÀNG MỤC TIÊU', en: 'TARGET MARKET SCALE', ko: '목표 시장 규모', zh: '目标市场规模', ja: 'ターゲット市場規模' },
  targetMarketTitle: { vi: 'KAS POS phù hợp cho nhiều phân khúc Khách hàng', en: 'KAS POS fits various Customer Segments', ko: 'KAS POS는 다양한 고객 세그먼트에 적합합니다', zh: 'KAS POS适合各种客户细分', ja: 'KAS POSはさまざまな顧客セグメントに適しています' },
  targetMarketDesc: { vi: 'Tùy theo quy mô của Khách hàng để chúng tôi tư vấn các gói dịch vụ phù hợp.', en: 'Depending on the scale of the Customer, we recommend suitable service packages.', ko: '고객의 규모에 따라 적합한 서비스 패키지를 추천합니다.', zh: '根据客户的规模，我们推荐合适的服务套餐。', ja: '顧客の規模に応じて、適切なサービスパッケージをお勧めします。' },
  
  // Table Headers
  criteria: { vi: 'Tiêu chí', en: 'Criteria', ko: '기준', zh: '标准', ja: '基準' },
  microMerchant: { vi: 'Micro Merchant', en: 'Micro Merchant', ko: '마이크로 상점', zh: '微型商户', ja: 'マイクロマーチャント' },
  sme: { vi: 'SME', en: 'SME', ko: 'SME', zh: '中小企业', ja: 'SME' },
  smeSubtitle: { vi: '(Doanh nghiệp vừa & nhỏ)', en: '(Small & Medium Enterprise)', ko: '(중소기업)', zh: '(中小型企业)', ja: '(中小企業)' },
  bizProject: { vi: 'Biz Project', en: 'Biz Project', ko: '비즈 프로젝트', zh: '商业项目', ja: 'ビズプロジェクト' },
  bizProjectSubtitle: { vi: '(Doanh nghiệp lớn, dự án đặc thù)', en: '(Large Enterprise, Special Projects)', ko: '(대기업, 특수 프로젝트)', zh: '(大型企业, 特殊项目)', ja: '(大企業、特別プロジェクト)' },
  
  // Segment Labels  
  characteristics: { vi: '🔹 Đặc điểm:', en: '🔹 Characteristics:', ko: '🔹 특징:', zh: '🔹 特点:', ja: '🔹 特徴:' },
  problems: { vi: '🔹 Vấn đề:', en: '🔹 Problems:', ko: '🔹 문제점:', zh: '🔹 问题:', ja: '🔹 問題:' },
  solutions: { vi: '🔹 Giải pháp:', en: '🔹 Solutions:', ko: '🔹 솔루션:', zh: '🔹 解决方案:', ja: '🔹 ソリューション:' },
  
  // SMALL (NHỎ) Segment - Characteristics
  smallChar1: { vi: 'Quán cà phê, nhà hàng nhỏ, tiệm trà sữa, mini mart, hoặc startup mới mở.', en: 'Coffee shops, small restaurants, milk tea shops, mini marts, or new startups.', ko: '카페, 소형 레스토랑, 밀크티 가게, 미니마트 또는 신규 스타트업.', zh: '咖啡店、小餐馆、奶茶店、便利店或新创业公司。', ja: 'カフェ、小規模レストラン、ミルクティーショップ、ミニマート、または新規スタートアップ。' },
  smallChar2: { vi: 'Quy trình vận hành đơn giản, chủ thường tự quản hoặc có 1–2 quản lý.', en: 'Simple operations, owner usually self-manages or has 1-2 managers.', ko: '간단한 운영, 소유주가 직접 관리하거나 1-2명의 관리자 보유.', zh: '运营流程简单，业主通常自己管理或有1-2名经理。', ja: 'シンプルな運営、オーナーが自己管理または1〜2名のマネージャー。' },
  smallChar3: { vi: 'Ngân sách đầu tư phần mềm không cao', en: 'Limited software investment budget', ko: '제한된 소프트웨어 투자 예산', zh: '软件投资预算有限', ja: 'ソフトウェア投資予算が限られている' },
  smallChar4: { vi: 'Dữ liệu chủ yếu nằm ở mức "giao dịch – bán hàng", chưa có hệ thống quản trị sâu.', en: 'Data mainly at "transaction-sales" level, no deep management system yet.', ko: '데이터는 주로 "거래-판매" 수준, 심층 관리 시스템 없음.', zh: '数据主要处于"交易-销售"层面，尚无深度管理系统。', ja: 'データは主に「取引-販売」レベル、深い管理システムはまだない。' },
  
  // SMALL - Problems  
  smallProb1: { vi: 'Khó kiểm soát doanh thu, ca làm, tiền mặt.', en: 'Difficult to control revenue, shifts, cash.', ko: '매출, 교대, 현금 통제가 어려움.', zh: '难以控制收入、班次、现金。', ja: '収益、シフト、現金の管理が困難。' },
  smallProb2: { vi: 'Quản lý tồn kho thủ công, dễ sai lệch.', en: 'Manual inventory management, prone to errors.', ko: '수동 재고 관리, 오류 발생 가능.', zh: '手动库存管理，容易出错。', ja: '手動在庫管理、エラーが発生しやすい。' },
  smallProb3: { vi: 'Không nắm được báo cáo lời lỗ thật.', en: 'No accurate profit/loss reports.', ko: '정확한 손익 보고서 없음.', zh: '没有准确的损益报告。', ja: '正確な損益レポートがない。' },
  
  // SMALL - Solutions
  smallSol1: { vi: 'POS đơn giản, hoạt động được trên mọi thiết bị', en: 'Simple POS, works on all devices', ko: '간단한 POS, 모든 기기에서 작동', zh: '简单的POS，可在所有设备上运行', ja: 'シンプルなPOS、すべてのデバイスで動作' },
  smallSol2: { vi: 'Tích hợp sẵn hóa đơn điện tử, thanh toán điện tử', en: 'Built-in e-invoice, e-payment integration', ko: '전자 인보이스, 전자 결제 통합 내장', zh: '内置电子发票、电子支付集成', ja: '電子請求書、電子決済統合を内蔵' },
  smallSol3: { vi: 'POS triển khai dạng plug & play', en: 'Plug & play POS deployment', ko: '플러그 앤 플레이 POS 배포', zh: '即插即用的POS部署', ja: 'プラグアンドプレイPOS展開' },
  smallSol4: { vi: 'Tập trung quản lý bán hàng tại cửa hàng', en: 'Centralized in-store sales management', ko: '매장 내 판매 중앙 집중 관리', zh: '集中管理店内销售', ja: '店舗内販売の集中管理' },
  smallSol5: { vi: 'Nhận đơn hàng từ kênh online', en: 'Receive orders from online channels', ko: '온라인 채널에서 주문 수신', zh: '接收在线渠道订单', ja: 'オンラインチャネルからの注文受信' },
  smallSol6: { vi: 'Quản lý chấm công, lương đơn giản', en: 'Simple attendance, payroll management', ko: '간단한 출퇴근, 급여 관리', zh: '简单的考勤、工资管理', ja: 'シンプルな勤怠、給与管理' },
  smallSol7: { vi: 'Quản lý tồn kho, tiêu hao nguyên liệu', en: 'Inventory, ingredient consumption management', ko: '재고, 재료 소비 관리', zh: '库存、原料消耗管理', ja: '在庫、材料消費管理' },
  smallSol8: { vi: 'Các báo cáo theo dõi doanh thu', en: 'Revenue tracking reports', ko: '매출 추적 보고서', zh: '收入跟踪报告', ja: '収益追跡レポート' },
  smallSol9: { vi: 'Hệ thống chạy trên cloud của nhà cung cấp', en: 'System runs on provider cloud', ko: '공급자 클라우드에서 실행되는 시스템', zh: '系统运行在供应商云上', ja: 'プロバイダークラウドで実行されるシステム' },
  
  // MEDIUM (VỪA) Segment - Characteristics
  mediumChar1: { vi: 'Là các chuỗi đang tăng trưởng, đã có quản lý vùng, kế toán riêng, vận hành chuyên nghiệp hơn.', en: 'Growing chains with regional management, dedicated accounting, more professional operations.', ko: '지역 관리, 전담 회계, 보다 전문적인 운영을 갖춘 성장하는 체인.', zh: '成长中的连锁店，拥有区域管理、专职会计、更专业的运营。', ja: '地域管理、専任会計、より専門的な運営を持つ成長中のチェーン。' },
  mediumChar2: { vi: 'Cần quản lý tập trung, chuẩn hóa quy trình và phân quyền theo chi nhánh.', en: 'Need centralized management, process standardization, and branch-based permissions.', ko: '중앙 집중식 관리, 프로세스 표준화, 지점별 권한 필요.', zh: '需要集中管理、流程标准化和基于分支的权限。', ja: '集中管理、プロセス標準化、支店ベースの権限が必要。' },
  mediumChar3: { vi: 'Bắt đầu quan tâm đến phân tích dữ liệu và loyalty/CRM.', en: 'Starting to focus on data analytics and loyalty/CRM.', ko: '데이터 분석 및 로열티/CRM에 집중하기 시작.', zh: '开始关注数据分析和忠诚度/CRM。', ja: 'データ分析とロイヤルティ/CRMに注目し始める。' },
  
  // MEDIUM - Problems
  mediumProb1: { vi: 'Mất nhiều thời gian tổng hợp báo cáo doanh thu & kho toàn hệ thống.', en: 'Time-consuming to compile system-wide revenue & inventory reports.', ko: '시스템 전체 수익 및 재고 보고서를 정리하는 데 시간이 많이 소요됨.', zh: '汇总全系统收入和库存报告耗时。', ja: 'システム全体の収益と在庫レポートのコンパイルに時間がかかる。' },
  mediumProb2: { vi: 'Dễ thất thoát hàng hóa khi mở rộng nhanh.', en: 'Easy to lose inventory during rapid expansion.', ko: '급속 확장 중 재고 손실이 쉬움.', zh: '快速扩张时容易丢失库存。', ja: '急速拡大中に在庫が失われやすい。' },
  mediumProb3: { vi: 'Không đồng bộ dữ liệu giữa POS – kế toán – marketing.', en: 'Data not synchronized between POS – accounting – marketing.', ko: 'POS - 회계 - 마케팅 간 데이터 비동기화.', zh: 'POS - 会计 - 营销之间数据不同步。', ja: 'POS - 会計 - マーケティング間のデータが同期されていない。' },
  mediumProb4: { vi: 'Thiếu công cụ quản lý khách hàng và khuyến mãi hiệu quả', en: 'Lack effective customer and promotion management tools', ko: '효과적인 고객 및 프로모션 관리 도구 부족', zh: '缺乏有效的客户和促销管理工具', ja: '効果的な顧客とプロモーション管理ツールの不足' },
  
  // MEDIUM - Solutions
  mediumSol1: { vi: 'Hệ thống tập trung, dữ liệu chuẩn hóa', en: 'Centralized system, standardized data', ko: '중앙 집중식 시스템, 표준화된 데이터', zh: '集中系统，标准化数据', ja: '集中システム、標準化データ' },
  mediumSol2: { vi: 'POS linh hoạt, vận hành mượt', en: 'Flexible POS, smooth operations', ko: '유연한 POS, 원활한 운영', zh: '灵活的POS，流畅运营', ja: '柔軟なPOS、スムーズな運営' },
  mediumSol3: { vi: 'Cài đặt và triển khai theo hướng plug & play', en: 'Plug & play installation and deployment', ko: '플러그 앤 플레이 설치 및 배포', zh: '即插即用安装和部署', ja: 'プラグアンドプレイのインストールと展開' },
  mediumSol4: { vi: 'Triển khai cho NSO nhanh chóng, luôn có phương án backup', en: 'Quick NSO deployment, always has backup plan', ko: '빠른 NSO 배포, 항상 백업 계획 보유', zh: '快速NSO部署，始终有备份方案', ja: '迅速なNSO展開、常にバックアッププランあり' },
  mediumSol5: { vi: 'Tích hợp sẵn hóa đơn điện tử, thanh toán điện tử', en: 'Built-in e-invoice, e-payment integration', ko: '전자 인보이스, 전자 결제 통합 내장', zh: '内置电子发票、电子支付集成', ja: '電子請求書、電子決済統合を内蔵' },
  mediumSol6: { vi: 'Hỗ trợ O2O tốt', en: 'Good O2O support', ko: '우수한 O2O 지원', zh: '良好的O2O支持', ja: '優れたO2Oサポート' },
  mediumSol7: { vi: 'Quản lý nhân viên, chấm công, tiền lương', en: 'Employee, attendance, payroll management', ko: '직원, 출퇴근, 급여 관리', zh: '员工、考勤、工资管理', ja: '従業員、勤怠、給与管理' },
  mediumSol8: { vi: 'Quản lý điều phối kho tốt', en: 'Good warehouse coordination management', ko: '우수한 창고 조정 관리', zh: '良好的仓库协调管理', ja: '優れた倉庫調整管理' },
  mediumSol9: { vi: 'Hệ thống báo cáo phân tích doanh thu nhiều chiều, cung cấp insights tốt.', en: 'Multi-dimensional revenue analytics reporting, provides good insights.', ko: '다차원 수익 분석 보고, 우수한 인사이트 제공.', zh: '多维收入分析报告，提供良好洞察。', ja: '多次元収益分析レポート、優れたインサイトを提供。' },
  mediumSol10: { vi: 'Dễ dàng tùy biến, mở rộng', en: 'Easy to customize and scale', ko: '맞춤화 및 확장 용이', zh: '易于定制和扩展', ja: 'カスタマイズと拡張が容易' },
  mediumSol11: { vi: 'Kết nối được với hệ thống ERP, Kế toán khác', en: 'Connects with other ERP, Accounting systems', ko: '다른 ERP, 회계 시스템과 연결', zh: '与其他ERP、会计系统连接', ja: '他のERP、会計システムと接続' },
  
  // LARGE (LỚN) Segment - Characteristics
  largeChar1: { vi: 'Là các chuỗi lớn, franchise, multi-brand, multi-country, có phòng ban chức năng rõ ràng.', en: 'Large chains, franchises, multi-brand, multi-country, with clear functional departments.', ko: '대형 체인, 프랜차이즈, 멀티 브랜드, 멀티 국가, 명확한 기능 부서 보유.', zh: '大型连锁店、特许经营、多品牌、多国家，拥有明确的职能部门。', ja: '大規模チェーン、フランチャイズ、マルチブランド、マルチカントリー、明確な機能部門を持つ。' },
  largeChar2: { vi: 'Quy trình phức tạp, yêu cầu tích hợp giữa nhiều hệ thống (POS, ERP, CRM, HRM, Loyalty, Payment Hub, v.v.)', en: 'Complex processes, require integration between multiple systems (POS, ERP, CRM, HRM, Loyalty, Payment Hub, etc.)', ko: '복잡한 프로세스, 여러 시스템 간 통합 필요 (POS, ERP, CRM, HRM, Loyalty, Payment Hub 등)', zh: '复杂流程，需要多个系统之间的集成（POS、ERP、CRM、HRM、Loyalty、Payment Hub等）', ja: '複雑なプロセス、複数のシステム間の統合が必要（POS、ERP、CRM、HRM、Loyalty、Payment Hubなど）' },
  largeChar3: { vi: 'Có đội IT hoặc CTO riêng, yêu cầu bảo mật, khả năng mở rộng và tùy chỉnh cao.', en: 'Has dedicated IT team or CTO, requires high security, scalability and customization.', ko: '전담 IT 팀 또는 CTO 보유, 높은 보안, 확장성 및 맞춤화 필요.', zh: '拥有专职IT团队或CTO，需要高安全性、可扩展性和定制化。', ja: '専任ITチームまたはCTOを持ち、高いセキュリティ、拡張性、カスタマイズが必要。' },
  largeChar4: { vi: 'Tập trung vào chuyển đổi số & dữ liệu chiến lược (Data-driven operation).', en: 'Focus on digital transformation & strategic data (Data-driven operation).', ko: '디지털 트랜스포메이션 및 전략적 데이터에 집중 (데이터 기반 운영).', zh: '专注于数字化转型和战略数据（数据驱动运营）。', ja: 'デジタルトランスフォーメーションと戦略的データに焦点（データ駆動運営）。' },
  
  // LARGE - Problems
  largeProb1: { vi: 'Dữ liệu phân tán giữa nhiều hệ thống, khó đồng bộ realtime.', en: 'Data scattered across systems, difficult to sync in realtime.', ko: '여러 시스템에 분산된 데이터, 실시간 동기화 어려움.', zh: '数据分散在多个系统中，难以实时同步。', ja: 'システム間でデータが分散、リアルタイム同期が困難。' },
  largeProb2: { vi: 'Thiếu hệ thống BI tổng hợp từ POS, ERP, CRM.', en: 'Lack integrated BI system from POS, ERP, CRM.', ko: 'POS, ERP, CRM의 통합 BI 시스템 부족.', zh: '缺乏整合POS、ERP、CRM的BI系统。', ja: 'POS、ERP、CRMからの統合BIシステムの不足。' },
  largeProb3: { vi: 'Quản lý nhượng quyền (franchise) phức tạp.', en: 'Complex franchise management.', ko: '복잡한 프랜차이즈 관리.', zh: '复杂的特许经营管理。', ja: '複雑なフランチャイズ管理。' },
  largeProb4: { vi: 'Chi phí vận hành và bảo trì cao khi không có nền tảng thống nhất.', en: 'High operational and maintenance costs without unified platform.', ko: '통합 플랫폼 없이 높은 운영 및 유지 관리 비용.', zh: '没有统一平台时运营和维护成本高。', ja: '統一されたプラットフォームがない場合の高い運用および保守コスト。' },
  
  // LARGE - Solutions
  largeSol1: { vi: 'Hệ thống tập trung, dữ liệu chuẩn hóa', en: 'Centralized system, standardized data', ko: '중앙 집중식 시스템, 표준화된 데이터', zh: '集中系统，标准化数据', ja: '集中システム、標準化データ' },
  largeSol2: { vi: 'POS linh hoạt, vận hành mượt', en: 'Flexible POS, smooth operations', ko: '유연한 POS, 원활한 운영', zh: '灵活的POS，流畅运营', ja: '柔軟なPOS、スムーズな運営' },
  largeSol3: { vi: 'Open API, Data warehouse, AI Insight', en: 'Open API, Data warehouse, AI Insight', ko: 'Open API, 데이터 웨어하우스, AI 인사이트', zh: 'Open API, 数据仓库, AI洞察', ja: 'Open API、データウェアハウス、AIインサイト' },
  largeSol4: { vi: 'Business Intelligence + Predictive Analytics', en: 'Business Intelligence + Predictive Analytics', ko: '비즈니스 인텔리전스 + 예측 분석', zh: '商业智能 + 预测分析', ja: 'ビジネスインテリジェンス + 予測分析' },
  largeSol5: { vi: 'Custom workflow, Role-based Access', en: 'Custom workflow, Role-based Access', ko: '맞춤형 워크플로, 역할 기반 액세스', zh: '定制工作流程，基于角色的访问', ja: 'カスタムワークフロー、ロールベースアクセス' },
  largeSol6: { vi: 'Franchise module, Master Data Management', en: 'Franchise module, Master Data Management', ko: '프랜차이즈 모듈, 마스터 데이터 관리', zh: '特许经营模块，主数据管理', ja: 'フランチャイズモジュール、マスターデータ管理' },
  largeSol7: { vi: 'ERP tích hợp POS toàn hệ thống', en: 'ERP integrated with POS system-wide', ko: 'POS와 시스템 전체 통합 ERP', zh: 'ERP集成POS全系统', ja: 'POSシステム全体と統合されたERP' },
  
  // Old keys (keep for backward compatibility)
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
  targetCustomersBadge: { vi: 'NGÀNH HÀNG MỤC TIÊU', en: 'TARGET INDUSTRIES', ko: '대상 산업', zh: '目标行业', ja: 'ターゲット業界' },
  targetCustomersTitle: { vi: 'KAS POS tập trung vào ngành hàng FnB, Retail và Services', en: 'KAS POS focuses on FnB, Retail, and Services industries', ko: 'KAS POS는 FnB, 소매 및 서비스 산업에 중점', zh: 'KAS POS专注于餐饮、零售和服务行业', ja: 'KAS POSはFnB、小売、サービス業に注力' },
  targetCustomersDesc: { vi: 'Đội ngũ chúng tôi có nhiều kinh nghiệm triển khai các chuỗi FnB, Retail và Services', en: 'Our team has extensive experience in deploying FnB, Retail, and Services chains', ko: '우리 팀은 FnB, 소매 및 서비스 체인 배포에 대한 광범위한 경험을 보유', zh: '我们的团队在部署餐饮、零售和服务连锁方面拥有丰富经验', ja: '私たちのチームは、FnB、小売、サービスチェーンの展開に豊富な経験を持っています' },
  
  // Customer List Section
  customerListBadge: { vi: 'Khách hàng tiêu biểu', en: 'Featured Customers', ko: '주요 고객', zh: '代表客户', ja: '代表顧客' },
  customerListTitle: { vi: 'CHÚNG TÔI LUÔN ĐỒNG HÀNH VÀ PHÁT TRIỂN CÙNG KHÁCH HÀNG', en: 'WE ALWAYS ACCOMPANY AND GROW WITH OUR CUSTOMERS', ko: '우리는 항상 고객과 함께 동행하고 성장합니다', zh: '我们始终与客户同行并共同成长', ja: '私たちは常に顧客と共に歩み、成長します' },
  customerListDesc: { vi: 'Nhiều chuỗi FnB, Retail, Serivces đã đồng hành cùng chúng tôi từ ngày đầu khởi nghiệp đến khi thành chuỗi lớn. Bên cạnh đó cũng có nhiều chuỗi đã chuyển qua KAS POS ở giai đoạn Bloom hoặc Thrive', en: 'Many FnB, Retail, and Services chains have accompanied us from the early days of startup to becoming large chains. Additionally, many chains have switched to KAS POS during the Bloom or Thrive stages.', ko: '많은 FnB, 소매 및 서비스 체인이 스타트업 초기부터 대형 체인이 될 때까지 우리와 함께했습니다. 또한 많은 체인이 Bloom 또는 Thrive 단계에서 KAS POS로 전환했습니다.', zh: '许多餐饮、零售和服务连锁店从创业初期就与我们同行，直到成为大型连锁店。此外，许多连锁店在Bloom或Thrive阶段切换到KAS POS。', ja: '多くのFnB、小売、サービスチェーンが、スタートアップの初期から大規模なチェーンになるまで私たちと共に歩んできました。さらに、多くのチェーンがBloomまたはThrive段階でKAS POSに切り替えています。' },
};

// Customer logos data - with image URLs
const customers = [
  // Row 1 - Korean Chain Restaurants
  { name: 'Dookki', logo: 'https://cnvloyalty.com/storage/app/dookki/a.webp', category: 'chain' },
  { name: 'Spicy Box', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760596957077.png', category: 'small' },
  { name: 'Tous les Jours', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760596991306.png', category: 'chain' },
  { name: 'Bon Bon', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597691670.png', category: 'small' },
  { name: 'Cobi Bread', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597035842.png', category: 'chain' },
  { name: 'Chicken Plus', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7JEBL-vLgRTOzm2ZHJENAw8eX1FJ_1rqv2w&s', category: 'chain' },
  { name: 'Goobne', logo: 'https://employer.jobsgo.vn/uploads/media/img/201912/pictures_library_38047_20191219110036_4091.png', category: 'chain' },
  { name: 'Butter Bean', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760596830623.png', category: 'small' },
  { name: 'Hot & Cold', logo: 'https://gigamall.com.vn/data/2022/06/06/22432212_logohotandcold900x900.jpg', category: 'small' },
  { name: 'Papa\'s Chicken', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrHTkIuJs2LKZg-Fx66_IklPHV07LSKDyRiJoY6V0NmZzU4wWLdS9oCwOkOsSkS_jGAhE&usqp=CAU', category: 'chain' },

  // Row 2 - Vietnamese Restaurants
  { name: 'Phúc Lộc Thọ', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597346351.png', category: 'small' },
  { name: 'Cơm Niêu Thiên Lý', logo: 'https://1900.com.vn/storage/uploads/companies/logo/69/6-1697809216.png', category: 'chain' },
  { name: 'Papa Xốt', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597312181.png', category: 'small' },
  { name: 'Việt Phố', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597385132.png', category: 'small' },
  { name: 'Làng nướng Nam Bộ', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597438139.png', category: 'small' },
  { name: 'Hong Kong Hotpot', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597510673.png', category: 'chain' },
  { name: 'Trùng Dương', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597554463.png', category: 'small' },
  { name: 'Thai Market', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597603460.png', category: 'small' },
  { name: 'PiThai', logo: 'https://images.urbox.vn/_img_server/2025/01/16/320/1737002004_67888c14ad55d.png', category: 'chain' },
  { name: 'MorFai', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760597759253.png', category: 'small' },

  // Row 3 - Cafes & Bakeries
  { name: 'Cargo Club', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1760598202481.png', category: 'small' },
  { name: 'Le Panier', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/Screenshot_2025-10-16_140343_1760598359099.png', category: 'small' },
  { name: 'Morning Glory', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/Screenshot_2025-10-16_140401_1760598359134.png', category: 'chain' },
  { name: 'Hansang', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/Screenshot_2025-10-16_140413_1760598359179.png', category: 'chain' },
  { name: 'Vin Lợi', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761101683100.png', category: 'small' },
  { name: 'V\'s Deli', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/Screenshot_2025-10-16_140439_1760598359266.png', category: 'small' },
  { name: 'Vy\'s Market', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761101743082.png', category: 'small' },
  { name: 'Hội An Combo', logo: 'https://tastevietnam.asia/sites/default/files/HoiAnCombo.png', category: 'small' },
  { name: 'Monsoon', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102101776.png', category: 'small' },
  { name: 'Market Roast & Grill', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0uuAIrMDhMz9qliAu4werrM_ALbL03V0fmQ&s', category: 'enterprise' },

  // Row 4 - Large Enterprises
  { name: 'Hankki Deli', logo: 'https://mms.img.susercontent.com/vn-11134513-7ra0g-m6f8h1o9t2n59b@resize_ss1242x600!@crop_w1242_h600_cT', category: 'enterprise' },
  { name: 'Viva Star', logo: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/J5oSM8AL2WN1rMmtk6vRudRjzRWneEEQ_1667381918____65c84286660189544364f4cf4a35955c.jpg', category: 'chain' },
  { name: 'Viva', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102360099.png', category: 'chain' },
  { name: 'Kem Tràng Tiền', logo: 'https://media.loveitopcdn.com/3807/logo-kem-trang-tien-1.jpg', category: 'small' },
  { name: 'Nest Coffee', logo: 'https://thodia.mservice.io/display?url=https://img.mservice.com.vn/common/u/05e07d15ed1a84ee51cdfe60756960e55412b5dcd748a2e496a53522eb6597fa/17d38466-a75c-4d30-a4ab-54bef790a563vvj_9jwr.jpg&fmt=jpg&w=300&op=resize', category: 'chain' },
  { name: 'Asiana Food Town', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102520654.png', category: 'chain' },
  { name: 'Queen Place Karaoke', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102578808.png', category: 'chain' },
  { name: 'Saigon Skydeck', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102629679.png', category: 'enterprise' },
  { name: 'Bitexco', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102670861.png', category: 'enterprise' },
  { name: 'Phở Hồ Chí Minh', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102728217.png', category: 'chain' },

  // Row 5
  { name: 'Mikado Sushi', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102779823.png', category: 'chain' },
  { name: 'Phở Phượng Trang', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102810381.png', category: 'small' },
  { name: 'Lotte', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761102835937.png', category: 'enterprise' },
  { name: 'Shinrim Bakery', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761103192529.png', category: 'chain' },
  { name: 'K-Market', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761103236337.png', category: 'chain' },
  { name: 'Werd', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761103264499.png', category: 'small' },
  { name: 'Cơm Nhà Home', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761103310837.png', category: 'small' },
  { name: 'Market SH', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761103361864.png', category: 'chain' },
  { name: 'C2000', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761103401829.png', category: 'enterprise' },
  { name: 'Vietthy', logo: 'https://api-kom.kas.asia/api/uploads/chat_image/image_1761103441021.png', category: 'chain' },
];

export default function CustomersPage() {
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

  const getCustomersByCategory = (category: string) => {
    return customers.filter(c => c.category === category);
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
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.7; }
          100% { transform: scale(0.95); opacity: 1; }
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
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
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
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .shimmer {
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
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

      {/* Hero Section - Enhanced with Parallax */}
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
          className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10 animate-float" 
          style={{animationDelay: '1s', transform: `translateY(${scrollY * 0.2}px)`}} 
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl -z-10 animate-float" 
          style={{animationDelay: '2s', transform: `translateY(${scrollY * 0.25}px)`}} 
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 -z-10" />

        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Badge - Enhanced with Glow Effect */}
          <div className="inline-flex items-center gap-3 glass-effect bg-gradient-to-r from-blue-500/90 to-indigo-500/90 text-blue-500 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-2xl animate-fade-in-scale border border-white/20">
            <Users className="w-5 h-5 animate-bounce-subtle" />
            <span className="uppercase tracking-wide">{t('badge')}</span>
            <TrendingUp className="w-5 h-5 animate-pulse" />
          </div>

          {/* Main title - Enhanced Gradient with Animation */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-slide-up bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient text-shadow-glow">
              {t('heroTitle')}
            </span>
          </h1>
          
          {/* Subtitle - Enhanced with Stagger */}
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-bold animate-slide-up stagger-1">
            {t('heroSubtitle')}
          </p>

          {/* Description - Enhanced with Stagger */}
          <p className="text-lg md:text-xl max-w-4xl mx-auto mb-12 text-gray-600 leading-relaxed animate-slide-up stagger-2">
            {t('heroDesc')}
          </p>

          {/* Stats Cards - Enhanced with 3D Effects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-up stagger-3">
            {/* Card 1 - Total Customers */}
            <div className="group relative glass-effect bg-white/80 rounded-3xl p-10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border-2 border-gray-100 hover:border-blue-400 card-3d overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {t('totalCustomers')}
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 mx-auto group-hover:w-full transition-all duration-500" />
                <div className="text-lg font-bold text-gray-700 uppercase tracking-wider">
                  {t('customersCount')}
                </div>
              </div>
            </div>
            
            {/* Card 2 - Brands */}
            <div className="group relative glass-effect bg-white/80 rounded-3xl p-10 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 border-2 border-gray-100 hover:border-indigo-400 card-3d overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Store className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  80+
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4 mx-auto group-hover:w-full transition-all duration-500" />
                <div className="text-lg font-bold text-gray-700 uppercase tracking-wider">
                  {language === 'vi' ? 'Thương hiệu' : 
                   language === 'en' ? 'Brands' :
                   language === 'ko' ? '브랜드' :
                   language === 'zh' ? '品牌' : 'ブランド'}
                </div>
              </div>
            </div>

            {/* Card 3 - Satisfaction */}
            <div className="group relative glass-effect bg-white/80 rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border-2 border-gray-100 hover:border-purple-400 card-3d overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  80%
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 mx-auto group-hover:w-full transition-all duration-500" />
                <div className="text-lg font-bold text-gray-700 uppercase tracking-wider">
                  {language === 'vi' ? 'Khách chuỗi' :
                   language === 'en' ? 'Satisfied Clients' :
                   language === 'ko' ? '만족한 고객' :
                   language === 'zh' ? '满意的客户' : '満足したクライアント'}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce-subtle opacity-60">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative">
              <div className="w-1.5 h-3 bg-gray-400 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Target Market Section - Enhanced with Glass Effects */}
      <section id="target-market" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        {/* Enhanced Background decoration with Parallax */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-3 glass-effect bg-blue-50/80 text-blue-600 px-6 py-3 rounded-full text-lg font-bold uppercase tracking-wide mb-8 shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-300">
              <Store className="w-6 h-6 animate-pulse" />
              <span>{t('targetMarketBadge')}</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>

            {/* Enhanced Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                {t('targetMarketTitle')}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              {t('targetMarketDesc')}
            </p>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce-subtle" />
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce-subtle" style={{animationDelay: '0.1s'}} />
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce-subtle" style={{animationDelay: '0.2s'}} />
            </div>
          </div>

          {/* Segment Comparison Cards - Responsive Design */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Micro Merchant Card */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-blue-400">
              {/* Header */}
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <Coffee className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">
                  {language === 'vi' ? 'NHỎ' : language === 'en' ? 'SMALL' : language === 'ko' ? '소규모' : language === 'zh' ? '小型' : '小規模'}
                </h3>
                <p className="text-green-100 text-sm font-medium">
                  {language === 'vi' ? 'Cửa hàng nhỏ' : 'Small Business'}
                </p>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Characteristics Section */}
                <div>
                  <h4 className="font-bold text-green-600 mb-3 text-base">{t('characteristics')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('smallChar1')}</li>
                    <li>• {t('smallChar2')}</li>
                    <li>• {t('smallChar3')}</li>
                    <li>• {t('smallChar4')}</li>
                  </ul>
                </div>

                {/* Problems Section */}
                <div>
                  <h4 className="font-bold text-green-600 mb-3 text-base">{t('problems')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('smallProb1')}</li>
                    <li>• {t('smallProb2')}</li>
                    <li>• {t('smallProb3')}</li>
                  </ul>
                </div>

                {/* Solutions Section */}
                <div>
                  <h4 className="font-bold text-green-600 mb-3 text-base">{t('solutions')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('smallSol1')}</li>
                    <li>• {t('smallSol2')}</li>
                    <li>• {t('smallSol3')}</li>
                    <li>• {t('smallSol4')}</li>
                    <li>• {t('smallSol5')}</li>
                    <li>• {t('smallSol6')}</li>
                    <li>• {t('smallSol7')}</li>
                    <li>• {t('smallSol8')}</li>
                    <li>• {t('smallSol9')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SME Card - Featured */}
            <div className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border-4 border-purple-500 transform lg:scale-105">
              {/* Header */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 text-white/10 text-8xl font-bold">★</div>
                <Store className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">
                  {language === 'vi' ? 'VỪA' : language === 'en' ? 'MEDIUM' : language === 'ko' ? '중간' : language === 'zh' ? '中型' : '中規模'}
                </h3>
                <p className="text-purple-100 text-sm font-medium">
                  {language === 'vi' ? 'Chuỗi đang phát triển' : 'Growing Chains'}
                </p>
                {/* <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold">
                  {language === 'vi' ? 'PHỔ BIẾN' : 'POPULAR'}
                </div> */}
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-6 bg-gradient-to-b from-purple-50/50 to-white">
                {/* Characteristics Section */}
                <div>
                  <h4 className="font-bold text-purple-600 mb-3 text-base">{t('characteristics')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('mediumChar1')}</li>
                    <li>• {t('mediumChar2')}</li>
                    <li>• {t('mediumChar3')}</li>
                  </ul>
                </div>

                {/* Problems Section */}
                <div>
                  <h4 className="font-bold text-purple-600 mb-3 text-base">{t('problems')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('mediumProb1')}</li>
                    <li>• {t('mediumProb2')}</li>
                    <li>• {t('mediumProb3')}</li>
                    <li>• {t('mediumProb4')}</li>
                  </ul>
                </div>

                {/* Solutions Section */}
                <div>
                  <h4 className="font-bold text-purple-600 mb-3 text-base">{t('solutions')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('mediumSol1')}</li>
                    <li>• {t('mediumSol2')}</li>
                    <li>• {t('mediumSol3')}</li>
                    <li>• {t('mediumSol4')}</li>
                    <li>• {t('mediumSol5')}</li>
                    <li>• {t('mediumSol6')}</li>
                    <li>• {t('mediumSol7')}</li>
                    <li>• {t('mediumSol8')}</li>
                    <li>• {t('mediumSol9')}</li>
                    <li>• {t('mediumSol10')}</li>
                    <li>• {t('mediumSol11')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Biz Project Card */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-orange-400">
              {/* Header */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
                <Building2 className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">
                  {language === 'vi' ? 'LỚN' : language === 'en' ? 'LARGE' : language === 'ko' ? '대규모' : language === 'zh' ? '大型' : '大規模'}
                </h3>
                <p className="text-orange-100 text-sm font-medium">
                  {language === 'vi' ? 'Chuỗi lớn & Franchise' : 'Large Chains & Franchise'}
                </p>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Characteristics Section */}
                <div>
                  <h4 className="font-bold text-orange-600 mb-3 text-base">{t('characteristics')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('largeChar1')}</li>
                    <li>• {t('largeChar2')}</li>
                    <li>• {t('largeChar3')}</li>
                    <li>• {t('largeChar4')}</li>
                  </ul>
                </div>

                {/* Problems Section */}
                <div>
                  <h4 className="font-bold text-orange-600 mb-3 text-base">{t('problems')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('largeProb1')}</li>
                    <li>• {t('largeProb2')}</li>
                    <li>• {t('largeProb3')}</li>
                    <li>• {t('largeProb4')}</li>
                  </ul>
                </div>

                {/* Solutions Section */}
                <div>
                  <h4 className="font-bold text-orange-600 mb-3 text-base">{t('solutions')}</h4>
                  <ul className="text-gray-700 text-sm space-y-2 leading-relaxed">
                    <li>• {t('largeSol1')}</li>
                    <li>• {t('largeSol2')}</li>
                    <li>• {t('largeSol3')}</li>
                    <li>• {t('largeSol4')}</li>
                    <li>• {t('largeSol5')}</li>
                    <li>• {t('largeSol6')}</li>
                    <li>• {t('largeSol7')}</li>
                  </ul>
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
              <Users className="w-7 h-7" />
              <span className="text-xl font-bold uppercase tracking-wider">{t('targetCustomersBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
            {/* Restaurant & Cafe */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu border-2 border-orange-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {language === 'vi' ? 'Nhà hàng & Cafe' : 
                 language === 'en' ? 'Restaurant & Cafe' :
                 language === 'ko' ? '레스토랑 & 카페' :
                 language === 'zh' ? '餐厅和咖啡馆' : 'レストラン＆カフェ'}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {language === 'vi' ? 'Nhà hàng, cafe và các mô hình ăn uống khác, đa dạng các concepts' :
                 language === 'en' ? 'Restaurants, cafes and other dining models, diverse concepts' :
                 language === 'ko' ? '레스토랑, 카페 및 기타 다양한 컨셉의 다이닝 모델' :
                 language === 'zh' ? '餐厅、咖啡馆和其他餐饮模式，多样化概念' : 'レストラン、カフェ、その他多様なコンセプトの飲食モデル'}
              </p>
            </div>

            {/* Fastfood */}
            <div className="group relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu border-2 border-pink-200">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-400/10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">🍔</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {language === 'vi' ? 'Fastfood' :
                 language === 'en' ? 'Fast Food' :
                 language === 'ko' ? '패스트푸드' :
                 language === 'zh' ? '快餐' : 'ファストフード'}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {language === 'vi' ? 'Các mô hình fastfood từ quy mô một điểm bán cho tới chuỗi hàng ngàn điểm bán' :
                 language === 'en' ? 'Fast food models from single outlet to chains of thousands of locations' :
                 language === 'ko' ? '단일 매장부터 수천 개의 체인까지 패스트푸드 모델' :
                 language === 'zh' ? '从单店到数千家连锁店的快餐模式' : '単店舗から数千店舗チェーンまでのファストフードモデル'}
              </p>
            </div>

            {/* Supermarket & CVS */}
            <div className="group relative bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu border-2 border-cyan-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">🏪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {language === 'vi' ? 'Siêu thị, cửa hàng tiện lợi' :
                 language === 'en' ? 'Supermarket & CVS' :
                 language === 'ko' ? '슈퍼마켓 & 편의점' :
                 language === 'zh' ? '超市和便利店' : 'スーパーマーケット＆コンビニ'}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {language === 'vi' ? 'Chuỗi siêu thị tiện lợi (CVS), các cửa hàng tạp hóa cho đến Trung tâm thương mại' :
                 language === 'en' ? 'CVS chains, grocery stores to shopping malls' :
                 language === 'ko' ? 'CVS 체인, 식료품점에서 쇼핑몰까지' :
                 language === 'zh' ? 'CVS连锁、杂货店到购物中心' : 'CVSチェーン、食料品店からショッピングモールまで'}
              </p>
            </div>

            {/* Other Services */}
            <div className="group relative bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu border-2 border-green-200">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400/10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">🛎️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {language === 'vi' ? 'Các dịch vụ khác' :
                 language === 'en' ? 'Other Services' :
                 language === 'ko' ? '기타 서비스' :
                 language === 'zh' ? '其他服务' : 'その他サービス'}
              </h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                {language === 'vi' ? 'Khách sạn, resort, foodcourt, nightlife,...' :
                 language === 'en' ? 'Hotels, resorts, food courts, nightlife, etc.' :
                 language === 'ko' ? '호텔, 리조트, 푸드코트, 나이트라이프 등' :
                 language === 'zh' ? '酒店、度假村、美食广场、夜生活等' : 'ホテル、リゾート、フードコート、ナイトライフなど'}
              </p>
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
              <Building2 className="w-7 h-7" />
              <span className="text-xl font-bold uppercase tracking-wider">{t('customerListBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
                  className="group flex-shrink-0 w-32 h-32 bg-white rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 hover:border-green-400"
                >
                  <img 
                    src={customer.logo} 
                    alt={customer.name}
                    className="w-full h-full object-contain rounded-xl transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {customers.map((customer, index) => (
                <div
                  key={`second-${index}`}
                  className="group flex-shrink-0 w-32 h-32 bg-white rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 hover:border-green-400"
                >
                  <img 
                    src={customer.logo} 
                    alt={customer.name}
                    className="w-full h-full object-contain rounded-xl transform group-hover:scale-110 transition-transform duration-300"
                  />
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
              {customers.slice(10, 50).map((customer, index) => (
                <div
                  key={index}
                  className="group relative aspect-square bg-white rounded-2xl p-3 shadow-md hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 hover:border-green-400 transform hover:scale-110"
                  style={{animationDelay: `${index * 0.02}s`}}
                >
                  <img 
                    src={customer.logo} 
                    alt={customer.name}
                    className="w-full h-full object-contain rounded-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  />
                  
                  {/* Tooltip */}
                  {/* <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 shadow-xl">
                    {customer.name}
                  </div> */}
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
                <h3 className="text-3xl font-bold mb-3">{t('segment1Title')}</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">{t('segment1Desc')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{getCustomersByCategory('small').length}+</span>
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
                <h3 className="text-3xl font-bold mb-3">{t('segment2Title')}</h3>
                <p className="text-purple-100 mb-6 leading-relaxed">{t('segment2Desc')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{getCustomersByCategory('chain').length}+</span>
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
                <h3 className="text-3xl font-bold mb-3">{t('segment3Title')}</h3>
                <p className="text-orange-100 mb-6 leading-relaxed">{t('segment3Desc')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{getCustomersByCategory('enterprise').length}+</span>
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
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-2xl">
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
            <button className="group px-10 py-5 bg-white text-purple-600 rounded-full font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-3 font-bold">
              <span>{language === 'vi' ? 'Dùng thử miễn phí' : 'Start Free Trial'}</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
            
            <button className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white text-white rounded-full font-black text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center gap-3 font-bold">
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
