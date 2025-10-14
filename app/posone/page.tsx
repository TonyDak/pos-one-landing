"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Smartphone, 
  ShoppingCart, 
  TrendingUp, 
  Zap,
  Check,
  Star,
  Shield,
  Globe,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Receipt,
  Wallet,
  Box,
  DollarSign,
  UserCheck,
  Gift,
  Calendar,
  FileText,
  Boxes,
  Briefcase,
  BookOpen,
  Target,
  Users,
  Link2,
  Heart
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
  demo: { vi: 'Đăng ký sử dụng', en: 'Request Demo', ko: '데모 신청', zh: '申请演示', ja: 'デモを申し込む' },
  
  // Hero
  badge: { vi: 'Giải pháp POS #1 tại Việt Nam', en: '#1 POS Solution in Vietnam', ko: '베트남 1위 POS 솔루션', zh: '越南第一POS解决方案', ja: 'ベトナムNo.1 POSソリューション' },
  heroTitle1: { vi: 'POSONE', en: 'POSONE', ko: 'POSONE', zh: 'POSONE', ja: 'POSONE' },
  heroSubtitle: { vi: 'Giải pháp bán hàng và kế toán cho Hộ kinh doanh, SME', en: 'Retail and Accounting Solution for Businesses and SMEs', ko: '비즈니스 및 중소기업을 위한 소매 및 회계 솔루션', zh: '面向企业和中小企业的零售与会计解决方案', ja: 'ビジネスと中小企業のための小売および会計ソリューション' },
  heroTitle2: { vi: 'Triển khai đơn giản, Quản lý toàn diện, Tuân thủ chính sách thuế', en: 'Operate smarter, Grow stronger', ko: '스마트 운영, 강력한 성장', zh: '智能运营，强劲增长', ja: 'スマートに運営、力強く成長' },
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
  
  feature1: { vi: 'Bán hàng linh hoạt, tuân thủ quy định thuế', en: 'Flexible Sales, Tax Compliant', ko: '유연한 판매, 세금 준수', zh: '灵活销售，符合税务规定', ja: '柔軟な販売、税務コンプライアンス' },
  feature1Desc: { vi: 'POSONE giúp hộ kinh doanh bán hàng nhanh chóng và chính xác. Hệ thống hỗ trợ đa ngành nghề như quán ăn, cà phê, tạp hóa, thời trang, phụ kiện, bida, sân thể thao, khu vui chơi, spa, salon tóc. Giao diện được thiết kế theo từng ngành nghề, thân thiện và dễ sử dụng trên mọi thiết bị: điện thoại, tablet, máy POS cầm tay, máy POS để bàn, laptop,... — giúp bán hàng mượt mà ở bất kỳ đâu.', en: 'POSONE helps businesses sell quickly and accurately. The system supports multiple industries such as restaurants, cafes, groceries, fashion, accessories, billiards, sports courts, entertainment areas, spa, hair salons. The interface is designed for each industry, user-friendly and easy to use on all devices: phones, tablets, handheld POS machines, desktop POS machines, laptops,... - helping smooth sales anywhere.', ko: 'POSONE은 기업이 빠르고 정확하게 판매할 수 있도록 지원합니다. 시스템은 레스토랑, 카페, 식료품점, 패션, 액세서리, 당구장, 스포츠 코트, 오락 구역, 스파, 미용실 등 다양한 산업을 지원합니다. 인터페이스는 각 산업에 맞게 설계되었으며, 모든 기기에서 사용자 친화적이고 사용하기 쉽습니다: 휴대폰, 태블릿, 휴대용 POS 기기, 데스크톱 POS 기기, 노트북 등... - 어디서나 원활한 판매를 지원합니다.', zh: 'POSONE帮助企业快速准确地销售。系统支持多个行业，如餐厅、咖啡馆、杂货店、时装、配饰、台球、运动场、娱乐区、水疗、美发沙龙。界面针对每个行业设计，用户友好，易于在所有设备上使用：手机、平板电脑、手持POS机、台式POS机、笔记本电脑等... - 帮助在任何地方顺利销售。', ja: 'POSONEは、ビジネスが迅速かつ正確に販売できるよう支援します。システムは、レストラン、カフェ、食料品店、ファッション、アクセサリー、ビリヤード、スポーツコート、エンターテイメントエリア、スパ、ヘアサロンなど、複数の業界をサポートします。インターフェースは各業界向けに設計されており、すべてのデバイスでユーザーフレンドリーで使いやすいです：携帯電話、タブレット、ハンドヘルドPOSマシン、デスクトップPOSマシン、ノートパソコンなど... - どこでもスムーズな販売をサポートします。' },
  
  feature2: { vi: 'Xuất hóa đơn trực tiếp từ máy tính tiền', en: 'Direct Invoice Issuance from POS', ko: 'POS에서 직접 송장 발행', zh: '从POS机直接开具发票', ja: 'POSから直接請求書発行' },
  feature2Desc: { vi: 'POSONE cho phép xuất hóa đơn điện tử ngay tại quầy, tích hợp trực tiếp trong phần mềm bán hàng. Giải pháp tuân thủ Thông tư 78/2021/TT-BTC của Tổng cục Thuế, đáp ứng đầy đủ quy định về hóa đơn điện tử. Hộ kinh doanh không cần thao tác thủ công hay chuyển dữ liệu sang hệ thống khác, giúp tiết kiệm thời gian và hạn chế sai sót.', en: 'POSONE allows issuing electronic invoices right at the counter, directly integrated into the sales software. The solution complies with Circular 78/2021/TT-BTC of the General Department of Taxation, fully meeting electronic invoice regulations. Businesses do not need manual operations or transfer data to other systems, saving time and minimizing errors.', ko: 'POSONE은 판매 소프트웨어에 직접 통합되어 카운터에서 바로 전자 송장을 발행할 수 있습니다. 이 솔루션은 국세청의 회람 78/2021/TT-BTC를 준수하며 전자 송장 규정을 완전히 충족합니다. 기업은 수동 작업이나 다른 시스템으로 데이터를 전송할 필요가 없어 시간을 절약하고 오류를 최소화합니다.', zh: 'POSONE允许在柜台直接开具电子发票，直接集成到销售软件中。该解决方案符合税务总局第78/2021/TT-BTC号通告，完全符合电子发票规定。企业无需手动操作或将数据传输到其他系统，节省时间并最大限度地减少错误。', ja: 'POSONEは、販売ソフトウェアに直接統合され、カウンターで直接電子請求書を発行できます。このソリューションは、税務総局の通達78/2021/TT-BTCに準拠し、電子請求書規制を完全に満たしています。企業は手動操作や他のシステムへのデータ転送が不要で、時間を節約し、エラーを最小限に抑えます。' },
  
  feature3: { vi: 'Kết nối thanh toán điện tử', en: 'Electronic Payment Integration', ko: '전자 결제 연동', zh: '电子支付集成', ja: '電子決済統合' },
  feature3Desc: { vi: 'POSONE hỗ trợ thanh toán linh hoạt qua QR Code, chuyển khoản ngân hàng hoặc ví điện tử. Mọi giao dịch được ghi nhận tức thì và đồng bộ với hệ thống doanh thu, hóa đơn. Giải pháp giúp tối ưu trải nghiệm thanh toán cho khách hàng, đồng thời giảm thời gian xử lý cho nhân viên bán hàng.', en: 'POSONE supports flexible payment via QR Code, bank transfer or e-wallet. All transactions are recorded instantly and synchronized with the revenue and invoice system. The solution helps optimize payment experience for customers while reducing processing time for sales staff.', ko: 'POSONE은 QR 코드, 은행 송금 또는 전자 지갑을 통한 유연한 결제를 지원합니다. 모든 거래는 즉시 기록되고 매출 및 송장 시스템과 동기화됩니다. 이 솔루션은 고객의 결제 경험을 최적화하면서 판매 직원의 처리 시간을 줄입니다.', zh: 'POSONE支持通过二维码、银行转账或电子钱包灵活支付。所有交易都会立即记录并与收入和发票系统同步。该解决方案有助于优化客户的支付体验，同时减少销售人员的处理时间。', ja: 'POSONEは、QRコード、銀行振込、または電子ウォレットを介した柔軟な支払いをサポートします。すべての取引は即座に記録され、収益および請求書システムと同期されます。このソリューションは、顧客の支払い体験を最適化し、販売スタッフの処理時間を短縮します。' },
  
  feature4: { vi: 'Quản lý kho thông minh', en: 'Smart Inventory Management', ko: '스마트 재고 관리', zh: '智能库存管理', ja: 'スマート在庫管理' },
  feature4Desc: { vi: 'Tính năng quản lý kho của POSONE giúp bạn kiểm soát tồn kho theo thời gian thực, tự động trừ hàng khi bán và cảnh báo khi sắp hết. Hỗ trợ quản lý theo lô, nhóm hàng hoặc chi nhánh, giúp hộ kinh doanh vận hành hiệu quả, linh hoạt và chính xác hơn.', en: 'POSONE\'s inventory management feature helps you control stock in real-time, automatically deducts goods when sold and alerts when running low. Supports management by batch, product group or branch, helping businesses operate more efficiently, flexibly and accurately.', ko: 'POSONE의 재고 관리 기능은 실시간으로 재고를 제어하고, 판매 시 자동으로 상품을 차감하며, 재고가 부족할 때 알림을 제공합니다. 배치, 제품 그룹 또는 지점별 관리를 지원하여 기업이 더 효율적이고 유연하며 정확하게 운영할 수 있도록 돕습니다.', zh: 'POSONE的库存管理功能可帮助您实时控制库存，销售时自动扣除商品，并在库存不足时发出警报。支持按批次、产品组或分支机构进行管理，帮助企业更高效、灵活和准确地运营。', ja: 'POSONEの在庫管理機能は、リアルタイムで在庫を管理し、販売時に自動的に商品を差し引き、在庫が不足すると警告します。バッチ、製品グループ、または支店別の管理をサポートし、企業がより効率的、柔軟、正確に運営できるよう支援します。' },
  
  feature5: { vi: 'Quản lý thu chi & chi phí hiệu quả', en: 'Effective Revenue & Expense Management', ko: '효과적인 수익 및 비용 관리', zh: '有效的收支与费用管理', ja: '効果的な収支・経費管理' },
  feature5Desc: { vi: 'POSONE giúp theo dõi dòng tiền vào – ra rõ ràng, ghi nhận mọi khoản thu, chi và chi phí vận hành. Báo cáo lợi nhuận, lãi lỗ được tổng hợp tự động, giúp chủ hộ kinh doanh dễ dàng nắm bắt tình hình tài chính mà không cần chuyên môn kế toán.', en: 'POSONE helps track cash flow clearly, recording all income, expenses and operating costs. Profit and loss reports are automatically compiled, helping business owners easily grasp the financial situation without accounting expertise.', ko: 'POSONE은 현금 흐름을 명확하게 추적하고 모든 수익, 지출 및 운영 비용을 기록합니다. 손익 보고서는 자동으로 컴파일되어 회계 전문 지식 없이도 사업주가 재무 상황을 쉽게 파악할 수 있도록 돕습니다.', zh: 'POSONE帮助清楚地跟踪现金流，记录所有收入、支出和运营成本。利润和亏损报告会自动编制，帮助企业主在没有会计专业知识的情况下轻松掌握财务状况。', ja: 'POSONEは、すべての収入、支出、運営コストを記録し、キャッシュフローを明確に追跡します。損益レポートは自動的にコンパイルされ、会計の専門知識がなくても事業主が財務状況を簡単に把握できるよう支援します。' },
  
  feature6: { vi: 'Chăm sóc khách hàng & Thẻ thành viên', en: 'Customer Care & Membership Card', ko: '고객 관리 및 회원 카드', zh: '客户关怀与会员卡', ja: '顧客ケア＆会員カード' },
  feature6Desc: { vi: 'POSONE tích hợp hệ thống CRM mini lưu trữ thông tin khách hàng, lịch sử mua hàng, sinh nhật, sở thích... Hỗ trợ thẻ thành viên, tích điểm và hạng mức ưu đãi, giúp hộ kinh doanh chăm sóc khách hàng cá nhân hóa, tăng độ trung thành và tần suất quay lại mua hàng.', en: 'POSONE integrates a mini CRM system that stores customer information, purchase history, birthdays, preferences... Supports membership cards, loyalty points and reward tiers, helping businesses provide personalized customer care, increase loyalty and return frequency.', ko: 'POSONE은 고객 정보, 구매 이력, 생일, 선호도를 저장하는 미니 CRM 시스템을 통합합니다... 회원 카드, 로열티 포인트 및 보상 등급을 지원하여 기업이 개인화된 고객 관리를 제공하고 충성도와 재방문 빈도를 높일 수 있도록 돕습니다.', zh: 'POSONE集成了一个小型CRM系统，存储客户信息、购买历史、生日、偏好... 支持会员卡、积分和奖励等级，帮助企业提供个性化客户关怀，提高忠诚度和回购频率。', ja: 'POSONEは、顧客情報、購入履歴、誕生日、好みを保存するミニCRMシステムを統合します... 会員カード、ロイヤルティポイント、報酬ティアをサポートし、企業がパーソナライズされた顧客ケアを提供し、ロイヤルティとリピート頻度を高めるのを支援します。' },
  
  feature7: { vi: 'Khuyến mãi & Marketing tự động', en: 'Promotions & Auto Marketing', ko: '프로모션 및 자동 마케팅', zh: '促销与自动营销', ja: 'プロモーション＆自動マーケティング' },
  feature7Desc: { vi: 'POSONE hỗ trợ đa dạng chương trình khuyến mãi: voucher, combo, flash sale, giảm giá theo sản phẩm hoặc khung giờ. Hệ thống tự động áp dụng khuyến mãi khi bán hàng, giúp thu hút khách hàng hiệu quả mà vẫn đảm bảo kiểm soát chi phí.', en: 'POSONE supports diverse promotion programs: vouchers, combos, flash sales, product or time-based discounts. The system automatically applies promotions during sales, helping attract customers effectively while ensuring cost control.', ko: 'POSONE은 다양한 프로모션 프로그램을 지원합니다: 바우처, 콤보, 플래시 세일, 제품 또는 시간대별 할인. 시스템은 판매 중 자동으로 프로모션을 적용하여 비용을 통제하면서 효과적으로 고객을 유치하는 데 도움이 됩니다.', zh: 'POSONE支持多样化的促销计划：优惠券、套餐、闪购、产品或时间段折扣。系统在销售期间自动应用促销，在确保成本控制的同时有效吸引客户。', ja: 'POSONEは、多様なプロモーションプログラムをサポートします：バウチャー、コンボ、フラッシュセール、製品または時間帯別割引。システムは販売中に自動的にプロモーションを適用し、コスト管理を確保しながら効果的に顧客を引き付けるのに役立ちます。' },
  
  feature8: { vi: 'Quản lý dịch vụ Booking & Tính tiền giờ', en: 'Booking Service & Hourly Billing', ko: '예약 서비스 및 시간제 요금', zh: '预订服务与按小时计费', ja: '予約サービス＆時間課金' },
  feature8Desc: { vi: 'Phù hợp cho các mô hình như karaoke, bida, sân tennis, pickleball, spa, salon tóc... POSONE cho phép đặt lịch, tính tiền theo giờ hoặc gói dịch vụ. Giao diện trực quan giúp nhân viên thao tác nhanh, giảm nhầm lẫn và nâng cao trải nghiệm khách hàng.', en: 'Suitable for models like karaoke, billiards, tennis courts, pickleball, spa, hair salons... POSONE allows booking, hourly billing or service packages. Intuitive interface helps staff operate quickly, reduce confusion and enhance customer experience.', ko: '카라오케, 당구장, 테니스 코트, 피클볼, 스파, 미용실 등의 모델에 적합합니다... POSONE은 예약, 시간당 청구 또는 서비스 패키지를 허용합니다. 직관적인 인터페이스는 직원이 빠르게 작업하고 혼란을 줄이며 고객 경험을 향상시키는 데 도움이 됩니다.', zh: '适用于卡拉OK、台球、网球场、匹克球、水疗、美发沙龙等模型... POSONE允许预订、按小时计费或服务套餐。直观的界面帮助员工快速操作，减少混淆并增强客户体验。', ja: 'カラオケ、ビリヤード、テニスコート、ピックルボール、スパ、ヘアサロンなどのモデルに適しています... POSONEは、予約、時間課金、またはサービスパッケージを許可します。直感的なインターフェースは、スタッフが迅速に操作し、混乱を減らし、顧客体験を向上させるのに役立ちます。' },
  
  feature9: { vi: 'Kế toán dành cho Hộ kinh doanh', en: 'Accounting for Businesses', ko: '사업자를 위한 회계', zh: '企业会计', ja: '事業者向け会計' },
  feature9Desc: { vi: 'POSONE cung cấp đầy đủ sổ sách kế toán theo Thông tư 88/2021/TT-BTC, đảm bảo tuân thủ quy định của Cơ quan Thuế. Hệ thống tự động tổng hợp doanh thu, chi phí, lợi nhuận và báo cáo thuế, giúp hộ kinh doanh quản lý minh bạch và dễ dàng hơn.', en: 'POSONE provides complete accounting books according to Circular 88/2021/TT-BTC, ensuring compliance with Tax Authority regulations. The system automatically aggregates revenue, expenses, profits and tax reports, helping businesses manage transparently and more easily.', ko: 'POSONE은 회람 88/2021/TT-BTC에 따른 완전한 회계 장부를 제공하여 세무 당국 규정을 준수합니다. 시스템은 수익, 비용, 이익 및 세금 보고서를 자동으로 집계하여 기업이 투명하고 더 쉽게 관리할 수 있도록 돕습니다.', zh: 'POSONE根据第88/2021/TT-BTC号通告提供完整的会计账簿，确保符合税务机关规定。系统自动汇总收入、支出、利润和税务报告，帮助企业更透明、更轻松地管理。', ja: 'POSONEは、通達88/2021/TT-BTCに従った完全な会計帳簿を提供し、税務当局の規制に準拠することを保証します。システムは、収益、経費、利益、税務報告を自動的に集計し、企業がより透明で簡単に管理できるよう支援します。' },
  
  feature10: { vi: 'Tích hợp & mở rộng thông minh', en: 'Smart Integration & Expansion', ko: '스마트 통합 및 확장', zh: '智能集成与扩展', ja: 'スマート統合＆拡張' },
  feature10Desc: { vi: 'POSONE tích hợp linh hoạt với Zalo, Facebook, Website, GrabFood, ShopeeFood để mở rộng kênh bán hàng và chăm sóc khách hàng giúp đồng bộ đơn hàng online tự động và quản lý tập trung. Hệ thống hỗ trợ AI Agents giúp tự động tư vấn, gợi ý sản phẩm, chăm sóc khách hàng 24/7 và cung cấp báo cáo trực quan, giúp chủ kinh doanh ra quyết định nhanh, chính xác và tăng doanh thu hiệu quả.', en: 'POSONE flexibly integrates with Zalo, Facebook, Website, GrabFood, ShopeeFood to expand sales channels and customer care, helping automatically synchronize online orders and centralized management. The system supports AI Agents to automatically consult, suggest products, provide 24/7 customer care and provide visual reports, helping business owners make quick, accurate decisions and increase revenue effectively.', ko: 'POSONE은 Zalo, Facebook, 웹사이트, GrabFood, ShopeeFood와 유연하게 통합되어 판매 채널과 고객 관리를 확장하고 온라인 주문을 자동으로 동기화하며 중앙 집중식 관리를 지원합니다. 시스템은 AI 에이전트를 지원하여 자동으로 상담하고 제품을 제안하며 24/7 고객 관리를 제공하고 시각적 보고서를 제공하여 사업주가 빠르고 정확한 결정을 내리고 수익을 효과적으로 증가시킬 수 있도록 돕습니다.', zh: 'POSONE与Zalo、Facebook、网站、GrabFood、ShopeeFood灵活集成，扩展销售渠道和客户关怀，帮助自动同步在线订单和集中管理。系统支持AI代理自动咨询、建议产品、提供24/7客户关怀和可视化报告，帮助企业主快速准确地做出决策并有效增加收入。', ja: 'POSONEは、Zalo、Facebook、ウェブサイト、GrabFood、ShopeeFoodと柔軟に統合され、販売チャネルと顧客ケアを拡大し、オンライン注文の自動同期と一元管理を支援します。システムは、AIエージェントをサポートして自動的に相談し、製品を提案し、24時間365日の顧客ケアを提供し、視覚的なレポートを提供して、事業主が迅速かつ正確な決定を下し、効果的に収益を増やすのを支援します。' },
  
  // Pricing
  pricingBadge: { vi: 'Bảng giá ưu đãi tháng 8', en: 'August Special Pricing', ko: '8월 특별 가격', zh: '8月特惠价格', ja: '8月特別価格' },
  pricingTitle: { vi: 'Chọn gói phù hợp với quy mô cửa hàng', en: 'Choose the Right Plan for Your Store', ko: '매장에 맞는 요금제 선택', zh: '选择适合您店铺的套餐', ja: 'お店に最適なプランを選択' },
  
  basicPlan: { vi: 'Gói Basic', en: 'Basic Plan', ko: '베이직 플랜', zh: '基础套餐', ja: 'ベーシックプラン' },
  advancePlan: { vi: 'Gói Advance', en: 'Advance Plan', ko: '어드밴스 플랜', zh: '进阶套餐', ja: 'アドバンスプラン' },
  premiumPlan: { vi: 'Gói Premium', en: 'Premium Plan', ko: '프리미엄 플랜', zh: '高级套餐', ja: 'プレミアムプラン' },
  
  // Pricing values
  basicPrice: { vi: '2.640.000', en: '$105', ko: '$105', zh: '$105', ja: '$105' },
  advancePrice: { vi: '3.228.000', en: '$129', ko: '$129', zh: '$129', ja: '$129' },
  premiumPrice: { vi: '4.428.000', en: '$179', ko: '$179', zh: '$179', ja: '$179' },
  currencySymbol: { vi: 'đ', en: '', ko: '', zh: '', ja: '' },
  
  perStore: { vi: '/Cửa hàng/Năm', en: '/Store/Year', ko: '/매장/년', zh: '/店铺/年', ja: '/店舗/年' },
  perMonth: { vi: '/tháng', en: '/month', ko: '/월', zh: '/月', ja: '/月' },
  mostPopular: { vi: 'PHỔ BIẾN NHẤT', en: 'MOST POPULAR', ko: '가장 인기있는', zh: '最受欢迎', ja: '最も人気' },
  forSmallBusiness: { vi: 'Cho cửa hàng nhỏ', en: 'For Small Business', ko: '소규모 비즈니스용', zh: '适合小型企业', ja: '小規模店舗向け' },
  forGrowingBusiness: { vi: 'Cho cửa hàng đang phát triển', en: 'For Growing Business', ko: '성장하는 비즈니스용', zh: '适合成长型企业', ja: '成長中の店舗向け' },
  forEnterprise: { vi: 'Cho chuỗi cửa hàng', en: 'For Enterprise', ko: '대기업용', zh: '适合连锁企业', ja: 'チェーン店向け' },
  
  promo12: { vi: 'Thuê 12 tháng tặng 3 tháng', en: 'Subscribe 12 months, get 3 months free', ko: '12개월 구독 시 3개월 무료', zh: '订购12个月送3个月', ja: '12ヶ月契約で3ヶ月無料' },
  promo24: { vi: 'Thuê 24 tháng tặng 6 tháng', en: 'Subscribe 24 months, get 6 months free', ko: '24개월 구독 시 6개월 무료', zh: '订购24个月送6个月', ja: '24ヶ月契約で6ヶ月無料' },
  
  // Plan Features
  salesManagement: { vi: 'Quản lý bán hàng', en: 'Sales Management', ko: '판매 관리', zh: '销售管理', ja: '販売管理' },
  inventoryManagement: { vi: 'Quản lý kho hàng', en: 'Inventory Management', ko: '재고 관리', zh: '库存管理', ja: '在庫管理' },
  promotionManagement: { vi: 'Quản lý khuyến mãi', en: 'Promotion Management', ko: '프로모션 관리', zh: '促销管理', ja: 'プロモーション管理' },
  dashboard: { vi: 'Dashboard', en: 'Dashboard', ko: '대시보드', zh: '仪表板', ja: 'ダッシュボード' },
  salesReports: { vi: 'Báo cáo bán hàng', en: 'Sales Reports', ko: '판매 보고서', zh: '销售报告', ja: '販売レポート' },
  freeInvoices1500: { vi: 'Miễn phí 1500 hóa đơn điện tử', en: 'Free 1500 e-invoices', ko: '무료 1500 전자 송장', zh: '免费1500张电子发票', ja: '無料1500電子インボイス' },
  freeInvoices3000: { vi: 'Miễn phí 3000 hóa đơn điện tử', en: 'Free 3000 e-invoices', ko: '무료 3000 전자 송장', zh: '免费3000张电子发票', ja: '無料3000電子インボイス' },
  freeInvoices5000: { vi: 'Miễn phí 5000 hóa đơn điện tử', en: 'Free 5000 e-invoices', ko: '무료 5000 전자 송장', zh: '免费5000张电子发票', ja: '無料5000電子インボイス' },
  freeInvoiceSetup: { vi: 'Miễn phí khởi tạo hóa đơn trị giá 500K', en: 'Free invoice setup (worth $20)', ko: '무료 송장 설정 ($20 상당)', zh: '免费发票设置（价值$20）', ja: '無料インボイス設定（$20相当）' },
  freeOnlineDeployment: { vi: 'Miễn phí triển khai online', en: 'Free online deployment', ko: '무료 온라인 배포', zh: '免费在线部署', ja: '無料オンライン展開' },
  freeSupport: { vi: 'Miễn phí hỗ trợ', en: 'Free support', ko: '무료 지원', zh: '免费支持', ja: '無料サポート' },
  allBasicFeatures: { vi: 'Đầy đủ các tính năng và dịch vụ của gói Basic', en: 'All Basic plan features and services', ko: '모든 베이직 플랜 기능 및 서비스', zh: '所有基础套餐功能和服务', ja: 'すべてのベーシックプラン機能とサービス' },
  allBasicAdvanceFeatures: { vi: 'Đầy đủ các tính năng và dịch vụ của gói Basic và Advance', en: 'All Basic and Advance plan features', ko: '모든 베이직 및 어드밴스 플랜 기능', zh: '所有基础和进阶套餐功能', ja: 'すべてのベーシックとアドバンスプラン機能' },
  customerManagement: { vi: 'Quản lý khách hàng thành viên', en: 'Member customer management', ko: '회원 고객 관리', zh: '会员客户管理', ja: '会員顧客管理' },
  expenseManagement: { vi: 'Quản lý thu chi', en: 'Revenue & expense management', ko: '수익 및 비용 관리', zh: '收支管理', ja: '収支管理' },
  revenueAnalysis: { vi: 'Phân tích doanh thu', en: 'Revenue analysis', ko: '수익 분석', zh: '收入分析', ja: '収益分析' },
  grabFoodIntegration: { vi: 'Kết nối Grab Food', en: 'Grab Food integration', ko: 'Grab Food 연동', zh: '集成Grab Food', ja: 'Grab Food連携' },
  shopeeFoodIntegration: { vi: 'Kết nối Shopee Food', en: 'Shopee Food integration', ko: 'Shopee Food 연동', zh: '集成Shopee Food', ja: 'Shopee Food連携' },
  freeDeploymentHCM: { vi: 'Miễn phí triển khai nội thành HCM & online', en: 'Free deployment in HCM & online', ko: '호치민 및 온라인 무료 배포', zh: '胡志明市及在线免费部署', ja: 'ホーチミン及びオンライン無料展開' },
  registerNowBtn: { vi: 'Đăng ký ngay!', en: 'Register Now!', ko: '지금 등록!', zh: '立即注册！', ja: '今すぐ登録！' },
  
  contactHotline: { vi: 'Liên hệ Hotline 19002137 để được hỗ trợ nhanh nhất', en: 'Contact Hotline 19002137 for fastest support', ko: '가장 빠른 지원을 위해 핫라인 19002137로 연락하세요', zh: '联系热线19002137获取最快支持', ja: '最速サポートはホットライン19002137へ' },

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
  
  // Footer specific
  companyFullName: { vi: 'Công ty Cổ Phần Công Nghệ KAS', en: 'KAS Technology Corporation', ko: 'KAS 기술 주식회사', zh: 'KAS科技股份公司', ja: 'KAS テクノロジー株式会社' },
  address: { vi: 'Địa chỉ', en: 'Address', ko: '주소', zh: '地址', ja: '住所' },
  addressDetail: { vi: '199 Đường Nguyễn Hoàng, Phường Bình Trưng, Thành Phố Hồ Chí Minh', en: '199 Nguyen Hoang Street, Binh Trung Ward, Ho Chi Minh City', ko: '199 Nguyen Hoang Street, Binh Trung Ward, Ho Chi Minh City', zh: '199 Nguyen Hoang Street, Binh Trung Ward, Ho Chi Minh City', ja: '199 Nguyen Hoang Street, Binh Trung Ward, Ho Chi Minh City' },
  hotline: { vi: 'Hotline', en: 'Hotline', ko: '핫라인', zh: '热线', ja: 'ホットライン' },
  email: { vi: 'Email', en: 'Email', ko: '이메일', zh: '邮箱', ja: 'メール' },
  website: { vi: 'Website', en: 'Website', ko: '웹사이트', zh: '网站', ja: 'ウェブサイト' },
  supportSection: { vi: 'Hỗ trợ', en: 'Support', ko: '지원', zh: '支持', ja: 'サポート' },
  contactPhone: { vi: 'Liên hệ: 1900 2137', en: 'Contact: 1900 2137', ko: '문의: 1900 2137', zh: '联系: 1900 2137', ja: 'お問い合わせ: 1900 2137' },
  developedBy: { vi: 'Phát triển bởi Công ty Cổ Phần Công Nghệ KAS', en: 'Developed by KAS Technology Corporation', ko: 'KAS 기술 주식회사에서 개발', zh: '由KAS科技股份公司开发', ja: 'KAS テクノロジー株式会社が開発' },
  privacyPolicy: { vi: 'Chính sách bảo mật', en: 'Privacy Policy', ko: '개인정보 처리방침', zh: '隐私政策', ja: 'プライバシーポリシー' },
  downloadApp: { vi: 'Tải ứng dụng', en: 'Download App', ko: '앱 다운로드', zh: '下载应用', ja: 'アプリをダウンロード' },
  scanQR: { vi: 'Quét mã QR để tải ứng dụng', en: 'Scan QR code to download', ko: 'QR 코드를 스캔하여 다운로드', zh: '扫描二维码下载', ja: 'QRコードをスキャンしてダウンロード' },
  termsOfService: { vi: 'Điều khoản dịch vụ', en: 'Terms of Service', ko: '서비스 약관', zh: '服务条款', ja: '利用規約' },
};

export default function POSOneLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>('vi');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
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
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .workplace-card {
          transition: all 0.3s ease;
        }
        .workplace-card:hover {
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
                  alt="POSONE Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-green-500">
                POSONE
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
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-gray-700 hover:text-green-600 border border-gray-300 hover:border-green-500 rounded-xl transition-all duration-300 font-medium"
              >
                {t('demo')}
              </Link>

              <Link 
                href="https://posone.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 font-medium"
              >
              {t('login')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
           <div className="lg:hidden flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link 
                href="https://posone.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 font-medium"
              >
              {t('login')}
              </Link>
              
              <button 
                className="p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl text-center font-medium hover:bg-green-50"
              >
                {t('demo')}
              </Link>
              
              {/* <Link 
                href="https://posone.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center font-medium"
              >              
                {t('login')}
              </Link> */}
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
            <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-gradient">
              {t('heroTitle1')}
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-semibold block my-4">
              {t('heroSubtitle')}
            </span>
            <span className=" text-6xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
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
            <button
              onClick={() => setVideoModalOpen(true)}
              className="px-8 py-4 bg-white border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center space-x-3"
            >
              <span>{t('watchDemo')}</span>
            </button>
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



      {/* Product Image Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center">
        <div className="relative w-full max-w-4xl mx-auto animate-scale-in z-10">
          <Image
            src="https://info.posone.ai/wp-content/uploads/2025/07/POSONE-ALLINDEVICE-768x768.png"
            alt="POSONE All-in-One Device"
            width={768}
            height={768}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-[1400px] mx-auto relative">
          <div className="text-center mb-16">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Feature 1 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <Smartphone size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight min-h-[40px]">
                {t('feature1')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature1Desc')}</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <Receipt size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight min-h-[40px]">
                {t('feature2')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature2Desc')}</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <Wallet size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight min-h-[40px]">
                {t('feature3')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature3Desc')}</p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <Box size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight min-h-[40px]">
                {t('feature4')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature4Desc')}</p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <DollarSign size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight min-h-[40px]">
                {t('feature5')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature5Desc')}</p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <UserCheck size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight min-h-[40px]">
                {t('feature6')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature6Desc')}</p>
            </div>

            {/* Feature 7 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <Gift size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight min-h-[40px]">
                {t('feature7')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature7Desc')}</p>
            </div>

            {/* Feature 8 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <Calendar size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight min-h-[40px]">
                {t('feature8')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature8Desc')}</p>
            </div>

            {/* Feature 9 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <FileText size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight min-h-[40px]">
                {t('feature9')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature9Desc')}</p>
            </div>

            {/* Feature 10 */}
            <div className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all min-h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform shadow-lg">
                <Boxes size={24} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight min-h-[40px]">
                {t('feature10')}
              </h3>
              <p className="text-gray-600 leading-relaxed text-xs flex-grow">{t('feature10Desc')}</p>
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
                <p className="text-sm text-gray-500 mb-3">{t('forSmallBusiness')}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gray-900">{t('basicPrice')}</span>
                  {language === 'vi' && <span className="text-2xl font-bold text-gray-900">{t('currencySymbol')}</span>}
                </div>
                <span className="text-gray-600">{t('perStore')}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('salesManagement')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('inventoryManagement')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('promotionManagement')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('dashboard')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('salesReports')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('freeInvoices1500')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('freeInvoiceSetup')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('freeOnlineDeployment')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('freeSupport')}</span>
                </li>
              </ul>
              <Link 
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-center font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('registerNowBtn')}
              </Link>
            </div>

            {/* Advance Plan - Popular */}
            <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-3xl p-8 shadow-2xl shadow-green-500/40 transform md:scale-110">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold">
                {t('mostPopular')}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('advancePlan')}</h3>
              <p className="text-sm text-green-100 mb-3">{t('forGrowingBusiness')}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{t('advancePrice')}</span>
                {language === 'vi' && <span className="text-2xl font-bold text-white">{t('currencySymbol')}</span>}
                <span className="text-lg text-green-100 font-normal ml-2">{t('perStore')}</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('allBasicFeatures')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('customerManagement')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('expenseManagement')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('revenueAnalysis')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('freeInvoices3000')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('freeInvoiceSetup')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('freeOnlineDeployment')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check size={20} className="text-green-100 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{t('freeSupport')}</span>
                </li>
              </ul>
              <Link 
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-white text-green-600 rounded-xl text-center font-bold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('registerNowBtn')}
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="group bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('premiumPlan')}</h3>
                <p className="text-sm text-gray-500 mb-3">{t('forEnterprise')}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gray-900">{t('premiumPrice')}</span>
                  {language === 'vi' && <span className="text-2xl font-bold text-gray-900">{t('currencySymbol')}</span>}
                </div>
                <span className="text-gray-600">{t('perStore')}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('allBasicAdvanceFeatures')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('grabFoodIntegration')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('shopeeFoodIntegration')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('freeInvoices5000')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('freeInvoiceSetup')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('freeDeploymentHCM')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('freeSupport')}</span>
                </li>
              </ul>
              <Link 
                href="https://contract.posone.vn/posone/regist"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-center font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('registerNowBtn')}
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

      {/* Workplace Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-float -z-10"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float-delayed -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6 animate-pulse-glow">
              <Briefcase size={16} />
              <span>{t('workplaceBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent animate-gradient">
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
            <div className="flex gap-6 animate-scroll">
                {/* Koffice */}
                {/* Koffice */}
                <div className="workplace-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72 animate-slide-up">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('koffice')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kofficeDesc')}
                    </p>
                  </div>
                </div>

                {/* Kos */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72 workplace-card animate-slide-up">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Target size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kos')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kosDesc')}
                    </p>
                  </div>
                </div>

                {/* Kops */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kops')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kopsDesc')}
                    </p>
                  </div>
                </div>

                {/* Kforce */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Users size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kforce')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kforceDesc')}
                    </p>
                  </div>
                </div>

                {/* Ksign */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Briefcase size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('ksign')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('ksignDesc')}
                    </p>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Link2 size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('klinks')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('klinksDesc')}
                    </p>
                  </div>
                </div>

                {/* Kare */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Heart size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kare')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kareDesc')}
                    </p>
                  </div>
                </div>

                {/* Kargo */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kargo')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kargoDesc')}
                    </p>
                  </div>
                </div>

                {/* KPOS */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Smartphone size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
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
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
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
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72 workplace-card animate-slide-up">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kvision')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kvisionDesc')}
                    </p>
                  </div>
                </div>

                {/* Kuru */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72 workplace-card animate-slide-up">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kuru')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kuruDesc')}
                    </p>
                  </div>
                </div>

                {/* Duplicate set for seamless loop */}
                {/* Koffice */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('koffice')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kofficeDesc')}
                    </p>
                  </div>
                </div>

                {/* Kos */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72 workplace-card animate-slide-up">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Target size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kos')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kosDesc')}
                    </p>
                  </div>
                </div>

                {/* Kops */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kops')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kopsDesc')}
                    </p>
                  </div>
                </div>

                {/* Kforce */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Users size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kforce')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kforceDesc')}
                    </p>
                  </div>
                </div>

                {/* Ksign */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Briefcase size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('ksign')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('ksignDesc')}
                    </p>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Link2 size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('klinks')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('klinksDesc')}
                    </p>
                  </div>
                </div>

                {/* Kare */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Heart size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kare')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kareDesc')}
                    </p>
                  </div>
                </div>

                {/* Kargo */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kargo')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kargoDesc')}
                    </p>
                  </div>
                </div>

                {/* KPOS */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Smartphone size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
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
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
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
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72 workplace-card animate-slide-up">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {t('kvision')}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('kvisionDesc')}
                    </p>
                  </div>
                </div>

                {/* Kuru */}
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72 workplace-card animate-slide-up">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
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
              className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 mb-12"
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
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                {t('workplaceCompanies')}
              </span>
            </div>
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
                  alt="POSONE Logo" 
                  width={40}
                  height={40}
                  className="transform group-hover:scale-110 transition-transform duration-300"
                /> */}
                <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  POSONE
                </span>
              </Link>
              
              <h3 className="text-xl font-bold text-white mb-4">{t('companyFullName')}</h3>
              
              <div className="space-y-3 text-gray-400">
                <p className="flex items-start">
                  <span className="font-semibold text-gray-300 mr-2">{t('address')}:</span>
                  <span>{t('addressDetail')}</span>
                </p>
                <p className="flex items-start">
                  <span className="font-semibold text-gray-300 mr-2">{t('hotline')}:</span>
                  <a href="tel:19002137" className="hover:text-green-400 transition-colors">1900 2137</a>
                </p>
                <p className="flex items-start">
                  <span className="font-semibold text-gray-300 mr-2">{t('email')}:</span>
                  <a href="mailto:kas@kas.asia" className="hover:text-green-400 transition-colors">kas@kas.asia</a>
                </p>
                <p className="flex items-start">
                  <span className="font-semibold text-gray-300 mr-2">{t('website')}:</span>
                  <a href="https://kas.asia" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">kas.asia</a>
                </p>
              </div>
            </div>

            {/* Download App - QR Code */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
                {t('downloadApp')}
              </h4>
              <div className="bg-white p-4 rounded-2xl shadow-xl inline-block hover:shadow-2xl transition-shadow duration-300">
                <img
                  src="https://ftp-staging.posone.vn/Files/qrcode_20250908115408.jpg"
                  alt="QR Code Download POSONE App"
                  width={150}
                  height={150}
                  className="w-[150px] h-[150px] object-contain"
                />
              </div>
              <p className="text-sm text-gray-400 mt-3">{t('scanQR')}</p>
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
                {t('supportSection')}
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
                  {t('contactPhone')}
                </a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                {t('developedBy')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <Link href="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                  {t('privacyPolicy')}
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                  {t('termsOfService')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/aBQEO2xvnZw?autoplay=1"
              title="POSONE Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}












