"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Smartphone, 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Award,
  Check,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Zap,
  Shield,
  Globe,
  Heart,
  Sparkles,
  Briefcase,
  Target,
  BookOpen,
  Trophy,
  Link2,
  Share2,
  Bell,
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
  login: { vi: 'Đăng nhập', en: 'Sign In', ko: '로그인', zh: '登录', ja: 'ログイン' },
  freeTrial: { vi: 'Đăng ký sử dụng', en: 'Get Started', ko: '시작하기', zh: '开始使用', ja: '始める' },
  
  // Hero
  badge: { vi: '#1 Mạng nội bộ Doanh nghiệp tại Việt Nam', en: '#1 Internal Social Network in Vietnam', ko: '베트남 내 1위 내부 소셜 네트워크', zh: '越南第一内部社交网络', ja: 'ベトナムでNo.1の社内ソーシャルネットワーク' },
  heroTitle1: { vi: 'Nền tảng Kết Nối Doanh Nghiệp Hiện Đại', en: 'The Modern Enterprise', ko: '모던 엔터프라이즈', zh: '现代企业', ja: 'モダンエンタープライズ' },
  heroTitle2: { vi: 'Tạo mội trường kết nối, giao tiếp, làm việc hiệu quả giữa Doanh nghiệp với Đối tác, Khách hàng, Nhân viên', en: 'Connection Platform', ko: '연결 플랫폼', zh: '连接平台', ja: 'コネクションプラットフォーム' },
  heroDesc: { vi: 'KOM giúp doanh nghiệp xây dựng mạng nội bộ thông minh để giao tiếp, cộng tác và kết nối giữa nhân viên – đối tác – khách hàng một cách bảo mật và hiệu quả.', en: 'KOM helps enterprises build a smart internal network to communicate, collaborate, and connect employees, partners, and customers securely and efficiently.', ko: 'KOM은 기업이 직원, 파트너 및 고객을 안전하고 효율적으로 소통, 협업 및 연결할 수 있는 스마트 내부 네트워크를 구축하도록 도와줍니다.', zh: 'KOM帮助企业构建智能内部网络，以安全高效地沟通、协作和连接员工、合作伙伴和客户。', ja: 'KOMは、企業が従業員、パートナー、顧客と安全かつ効率的にコミュニケーション、コラボレーション、接続できるスマートな内部ネットワークの構築を支援します。' },
  signUpTrial: { vi: 'Đăng ký trải nghiệm', en: 'Sign Up for Trial', ko: '체험 등록', zh: '注册试用', ja: 'トライアルに登録' },
  rating: { vi: 'Đánh giá', en: 'Rating', ko: '평가', zh: '评分', ja: '評価' },
  users: { vi: 'Người dùng', en: 'Users', ko: '사용자', zh: '用户', ja: 'ユーザー' },
  support: { vi: 'Hỗ trợ', en: 'Support', ko: '지원', zh: '支持', ja: 'サポート' },
  
  // Features
  featuresBadge: { vi: 'Tính năng mạnh mẽ', en: 'Powerful Features', ko: '강력한 기능', zh: '强大功能', ja: '強力な機能' },
  featuresTitle: { vi: 'Mọi thứ bạn cần để', en: 'Everything You Need to', ko: '연결에 필요한 모든 것', zh: '连接所需的一切', ja: '接続に必要なすべて' },
  featuresConnect: { vi: ' Kết nối', en: ' Connect', ko: '', zh: '', ja: '' },
  featuresDesc: { vi: 'Nền tảng hiện đại giúp Tổ chức luôn chuyển động và gắn kết', en: 'Modern platform to keep Organizations moving and connected', ko: '조직을 움직이고 연결 상태로 유지하는 현대적인 플랫폼', zh: '让组织保持运转和连接的现代平台', ja: '組織を動かし、つなぐためのモダンなプラットフォーム' },
  
  feature1Title: { vi: 'Nhắn tin Thời gian thực', en: 'Real-time Messaging', ko: '실시간 메시징', zh: '实时消息', ja: 'リアルタイムメッセージング' },
  feature1Desc: { vi: 'Trò chuyện nhanh như chớp với hỗ trợ đa phương tiện. Gửi tin nhắn, hình ảnh, video và file ngay lập tức với xác nhận đã đọc và đang nhập.', en: 'Lightning-fast chat with multimedia support. Send messages, images, videos and files instantly with read receipts and typing indicators.', ko: '멀티미디어 지원으로 빠른 채팅. 읽음 확인 및 입력 표시기로 메시지, 이미지, 비디오 및 파일을 즉시 전송하세요.', zh: '支持多媒体的超快聊天。即时发送消息、图片、视频和文件，包含已读回执和正在输入指示器。', ja: 'マルチメディア対応の超高速チャット。既読確認と入力インジケーターで、メッセージ、画像、動画、ファイルを瞬時に送信。' },
  
  feature2Title: { vi: 'Quản lý Nhóm', en: 'Group Management', ko: '그룹 관리', zh: '群组管理', ja: 'グループ管理' },
  feature2Desc: { vi: 'Tạo và quản lý nhóm không giới hạn. Phân quyền thành viên nâng cao và công cụ kiểm duyệt để giữ cộng đồng của bạn có tổ chức.', en: 'Create and manage unlimited groups. Advanced member permissions and moderation tools to keep your community organized.', ko: '무제한 그룹 생성 및 관리. 고급 회원 권한 및 중재 도구로 커뮤니티를 조직화하세요.', zh: '创建和管理无限群组。高级成员权限和审核工具，保持社区井然有序。', ja: '無制限にグループを作成・管理。高度なメンバー権限とモデレーションツールで、コミュニティを整理整頓。' },
  
  feature3Title: { vi: 'Lên lịch Sự kiện', en: 'Event Planning', ko: '이벤트 계획', zh: '活动策划', ja: 'イベント企画' },
  feature3Desc: { vi: 'Lập kế hoạch và quản lý sự kiện một cách liền mạch. Tạo sự kiện, gửi lời mời, theo dõi RSVP và gửi nhắc nhở tự động.', en: 'Plan and manage events seamlessly. Create events, send invitations, track RSVPs and send automated reminders.', ko: '이벤트를 원활하게 계획하고 관리하세요. 이벤트 생성, 초대장 발송, RSVP 추적 및 자동 알림 전송.', zh: '无缝策划和管理活动。创建活动、发送邀请、跟踪回复并发送自动提醒。', ja: 'シームレスにイベントを企画・管理。イベントの作成、招待状の送信、出欠確認の追跡、自動リマインダーの送信。' },
  
  feature4Title: { vi: 'Bảng điều khiển Phân tích', en: 'Analytics Dashboard', ko: '분석 대시보드', zh: '分析仪表板', ja: '分析ダッシュボード' },
  feature4Desc: { vi: 'Thống kê toàn diện về cộng đồng của bạn. Theo dõi tương tác, chỉ số tăng trưởng và hành vi người dùng với trực quan hóa đẹp mắt.', en: 'Comprehensive statistics about your community. Track engagement, growth metrics and user behavior with beautiful visualizations.', ko: '커뮤니티에 대한 포괄적인 통계. 아름다운 시각화로 참여도, 성장 지표 및 사용자 행동을 추적하세요.', zh: '关于社区的全面统计。通过精美的可视化追踪参与度、增长指标和用户行为。', ja: 'コミュニティに関する包括的な統計。美しいビジュアライゼーションでエンゲージメント、成長指標、ユーザー行動を追跡。' },
  
  feature5Title: { vi: 'Điểm & Phần thưởng', en: 'Points & Rewards', ko: '포인트 및 보상', zh: '积分和奖励', ja: 'ポイント＆報酬' },
  feature5Desc: { vi: 'Hệ thống gamification tích hợp với điểm, thành tích và phần thưởng để giữ cộng đồng của bạn gắn kết và có động lực.', en: 'Integrated gamification system with points, achievements and rewards to keep your community engaged and motivated.', ko: '포인트, 업적 및 보상이 있는 통합 게임화 시스템으로 커뮤니티의 참여도와 동기를 유지하세요.', zh: '集成游戏化系统，包含积分、成就和奖励，让社区保持参与度和积极性。', ja: 'ポイント、実績、報酬を備えた統合ゲーミフィケーションシステムで、コミュニティの参加意欲を維持。' },
  
  feature6Title: { vi: 'Đa nền tảng', en: 'Multi-Platform', ko: '다중 플랫폼', zh: '多平台', ja: 'マルチプラットフォーム' },
  feature6Desc: { vi: 'Hoạt động liền mạch trên web, mobile và tablet. Cộng đồng của bạn có thể truy cập mọi lúc, mọi nơi, trên mọi thiết bị.', en: 'Works seamlessly on web, mobile and tablet. Your community can access anytime, anywhere, on any device.', ko: '웹, 모바일 및 태블릿에서 원활하게 작동합니다. 커뮤니티는 언제 어디서나 모든 기기에서 액세스할 수 있습니다.', zh: '在网页、手机和平板上无缝运行。社区可以随时随地在任何设备上访问。', ja: 'Web、モバイル、タブレットでシームレスに動作。コミュニティはいつでもどこでも、あらゆるデバイスでアクセス可能。' },
  
  // Pricing
  pricingBadge: { vi: 'Bảng giá linh hoạt', en: 'Flexible Pricing', ko: '유연한 가격', zh: '灵活定价', ja: '柔軟な価格設定' },
  pricingTitle: { vi: 'Chọn gói phù hợp với', en: 'Choose the Right Plan for', ko: '귀하에게 맞는 요금제를 선택하세요', zh: '选择适合您的计划', ja: 'あなたに最適なプランを選択' },
  pricingYou: { vi: ' Bạn', en: ' You', ko: '', zh: '', ja: '' },
  pricingDesc: { vi: 'Bắt đầu miễn phí, mở rộng khi bạn phát triển', en: 'Start free, scale as you grow', ko: '무료로 시작하고 성장하면서 확장하세요', zh: '免费开始，随着发展而扩展', ja: '無料で始めて、成長に合わせて拡張' },
  
  basicPlan: { vi: 'Cơ bản', en: 'Basic', ko: '기본', zh: '基础版', ja: 'ベーシック' },
  proPlan: { vi: 'Chuyên nghiệp', en: 'Professional', ko: '프로페셔널', zh: '专业版', ja: 'プロフェッショナル' },
  enterprisePlan: { vi: 'Theo yêu cầu', en: 'On-Demand', ko: '맞춤형', zh: '定制版', ja: 'カスタム' },
  mostPopular: { vi: 'PHỔ BIẾN NHẤT', en: 'MOST POPULAR', ko: '가장 인기있는', zh: '最受欢迎', ja: '最も人気' },
  perMonth: { vi: '/tháng', en: '/month', ko: '/월', zh: '/月', ja: '/月' },
  custom: { vi: 'Liên hệ', en: 'Contact', ko: '문의', zh: '联系', ja: 'お問い合わせ' },
  
  // Pricing features
  upToMembers: { vi: 'Tới {count} thành viên', en: 'Up to {count} members', ko: '최대 {count}명의 회원', zh: '最多 {count} 名成员', ja: '最大 {count} 名のメンバー' },
  groups: { vi: '{count} nhóm', en: '{count} groups', ko: '{count}개의 그룹', zh: '{count} 个群组', ja: '{count} グループ' },
  unlimitedGroups: { vi: 'Không giới hạn nhóm', en: 'Unlimited groups', ko: '무제한 그룹', zh: '无限群组', ja: '無制限グループ' },
  basicAnalytics: { vi: 'Phân tích cơ bản', en: 'Basic Analytics', ko: '기본 분석', zh: '基础分析', ja: '基本分析' },
  emailSupport: { vi: 'Hỗ trợ qua Email', en: 'Email Support', ko: '이메일 지원', zh: '电子邮件支持', ja: 'メールサポート' },
  eventManagement: { vi: 'Quản lý sự kiện', en: 'Event Management', ko: '이벤트 관리', zh: '活动管理', ja: 'イベント管理' },
  pointsSystem: { vi: 'Hệ thống điểm', en: 'Points System', ko: '포인트 시스템', zh: '积分系统', ja: 'ポイントシステム' },
  advancedAnalytics: { vi: 'Phân tích nâng cao', en: 'Advanced Analytics', ko: '고급 분석', zh: '高级分析', ja: '高度な分析' },
  support247: { vi: 'Hỗ trợ 24/7', en: '24/7 Support', ko: '24/7 지원', zh: '24/7 支持', ja: '24時間365日サポート' },
  unlimitedEverything: { vi: 'Thương hiệu riêng theo yêu cầu', en: 'Your brand', ko: '귀하의 브랜드', zh: '您的品牌', ja: 'あなたのブランド' },
  multiLocation: { vi: 'Hosting riêng', en: 'Private host', ko: '개인 호스팅', zh: '私有托管', ja: 'プライベートホスティング' },
  customAPI: { vi: 'Tất cả tính năng', en: 'All features', ko: '모든 기능', zh: '所有功能', ja: 'すべての機能' },
  onSiteTraining: { vi: 'Cổng kết nối mở', en: 'Developer portal', ko: '개발자 포털', zh: '开发者门户', ja: '開発者ポータル' },
  dedicatedManager: { vi: 'Đào tạo và hỗ trợ', en: 'Training & support', ko: '교육 및 지원', zh: '培训与支持', ja: 'トレーニングとサポート' },
  
  getStarted: { vi: 'Bắt đầu ngay', en: 'Get Started', ko: '시작하기', zh: '立即开始', ja: '今すぐ始める' },
  contactSales: { vi: 'Liên hệ bán hàng', en: 'Contact Sales', ko: '영업 문의', zh: '联系销售', ja: '営業に連絡' },
  
  // CTA
  ctaBadge: { vi: 'Ưu đãi đặc biệt', en: 'Special Offer', ko: '특별 제안', zh: '特别优惠', ja: '特別オファー' },
  ctaTitle1: { vi: 'Sẵn sàng Chuyển đổi', en: 'Ready to Transform', ko: '변화할 준비가 되셨나요', zh: '准备好转型了吗', ja: '変革の準備はできていますか' },
  ctaTitle2: { vi: 'Doanh nghiệp của bạn Kết nối & Làm việc?', en: 'Your Business Connect & Work?', ko: '귀사의 비즈니스 연결 및 작업?', zh: '您的企业连接与工作？', ja: 'あなたのビジネスは接続して働いていますか？' },
  ctaDesc: { vi: 'Cùng hơn', en: 'Join over', ko: '이상에 가입하세요', zh: '加入超过', ja: '以上に参加しましょう' },
  ctaDescUsers: { vi: '50,000+ người dùng', en: '50,000+ users', ko: '50,000명 이상의 사용자', zh: '50,000+ 用户', ja: '50,000+ ユーザー' },
  ctaDescUsing: { vi: 'tin tưởng KOM để nâng cao hiệu suất và kết nối nội bộ thông minh.', en: 'trust KOM to boost productivity and smart internal connections.', ko: 'KOM을 신뢰하여 생산성과 스마트한 내부 연결을 향상시키세요.', zh: '信赖KOM以提升生产力和智能内部连接。', ja: 'KOMを信頼して、生産性とスマートな内部接続を向上させましょう。' },
  startTrial: { vi: 'Đăng ký dùng thử', en: 'Sign Up for Trial', ko: '체험 등록', zh: '注册试用', ja: 'トライアルに登録' },
  noCreditCard: { vi: 'Không cần thẻ tín dụng', en: 'No credit card required', ko: '신용카드 불필요', zh: '无需信用卡', ja: 'クレジットカード不要' },
  cancelAnytime: { vi: 'Hủy bất cứ lúc nào', en: 'Cancel anytime', ko: '언제든지 취소', zh: '随时取消', ja: 'いつでもキャンセル可能' },
  
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
  
  // App Download
  downloadTitle: { vi: 'Tải ứng dụng KOM', en: 'Download KOM App', ko: 'KOM 앱 다운로드', zh: '下载KOM应用', ja: 'KOMアプリをダウンロード' },
  downloadDesc: { vi: 'Trải nghiệm KOM trên điện thoại của bạn', en: 'Experience KOM on your mobile device', ko: '모바일에서 KOM을 경험하세요', zh: '在手机上体验KOM', ja: 'モバイルデバイスでKOMを体験' },
  downloadOn: { vi: 'TẢI TRÊN', en: 'GET IT ON', ko: '다운로드', zh: '下载于', ja: 'ダウンロード' },
  googlePlay: { vi: 'Google Play', en: 'Google Play', ko: 'Google Play', zh: 'Google Play', ja: 'Google Play' },
  appStore: { vi: 'App Store', en: 'App Store', ko: 'App Store', zh: 'App Store', ja: 'App Store' },
  scanQR: { vi: 'Quét mã QR hoặc nhấp vào nút để tải ứng dụng KOM', en: 'Scan QR code or click button to download KOM app', ko: 'QR 코드를 스캔하거나 버튼을 클릭하여 KOM 앱을 다운로드하세요', zh: '扫描二维码或点击按钮下载KOM应用', ja: 'QRコードをスキャンまたはボタンをクリックしてKOMアプリをダウンロード' },
  copyright: { vi: 'Bản quyền đã được bảo lưu', en: 'All rights reserved', ko: '모든 권리 보유', zh: '版权所有', ja: '全著作権所有' },
  
  // Footer
  product: { vi: 'Sản phẩm', en: 'Product', ko: '제품', zh: '产品', ja: '製品' },
  company: { vi: 'Công ty', en: 'Company', ko: '회사', zh: '公司', ja: '会社' },
  about: { vi: 'Về chúng tôi', en: 'About', ko: '회사 소개', zh: '关于我们', ja: '会社について' },
  blog: { vi: 'Blog', en: 'Blog', ko: '블로그', zh: '博客', ja: 'ブログ' },
  careers: { vi: 'Tuyển dụng', en: 'Careers', ko: '채용', zh: '招聘', ja: '採用情報' },
  demo: { vi: 'Demo', en: 'Demo', ko: '데모', zh: '演示', ja: 'デモ' },
  helpCenter: { vi: 'Trung tâm trợ giúp', en: 'Help Center', ko: '도움말 센터', zh: '帮助中心', ja: 'ヘルプセンター' },
  documentation: { vi: 'Tài liệu', en: 'Documentation', ko: '문서', zh: '文档', ja: 'ドキュメント' },
  contact: { vi: 'Liên hệ', en: 'Contact', ko: '문의', zh: '联系', ja: 'お問い合わせ' },
  footerDesc: { vi: 'Nền tảng kết nối doanh nghiệp hiện đại được xây dựng để thành công', en: 'The modern enterprise connection platform built for success', ko: '성공을 위해 구축된 현대적인 엔터프라이즈 연결 플랫폼', zh: '为成功而构建的现代企业连接平台', ja: '成功のために構築されたモダンエンタープライズ接続プラットフォーム' },
  privacy: { vi: 'Chính sách bảo mật', en: 'Privacy Policy', ko: '개인정보 보호정책', zh: '隐私政策', ja: 'プライバシーポリシー' },
  terms: { vi: 'Điều khoản dịch vụ', en: 'Terms of Service', ko: '서비스 약관', zh: '服务条款', ja: '利用規約' },
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>('vi');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentFeaturePage, setCurrentFeaturePage] = useState(0);

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
          animation: scroll 30s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        #workplace-scroll-container {
          scroll-snap-type: x proximity;
        }
        #workplace-scroll-container > div > div {
          scroll-snap-align: start;
        }
      `}</style>
      {/* Header/Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-md'
      } border-b border-gray-200`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-blue-500/50 overflow-hidden">
                <img 
                  src="https://api-kom.kas.asia/api/uploads/chat_image/image_1760004372567.png" 
                  alt="KOM Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-blue-500">
                KOM 
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on Mobile/Tablet */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 flex-shrink-0">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group whitespace-nowrap">
                {t('features')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group whitespace-nowrap">
                {t('pricing')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <Globe size={20} className="text-gray-700 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 uppercase">{language}</span>
                  <ChevronDown size={16} className={`text-gray-700 transition-transform flex-shrink-0 ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-scale-in">
                    <button
                      onClick={() => { setLanguage('vi'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center space-x-3 ${language === 'vi' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    >
                      <span className="text-2xl">🇻🇳</span>
                      <div>
                        <div className="font-semibold">Tiếng Việt</div>
                        <div className="text-xs text-gray-500">Vietnamese</div>
                      </div>
                      {language === 'vi' && <Check size={16} className="ml-auto" />}
                    </button>
                    <button
                      onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center space-x-3 ${language === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    >
                      <span className="text-2xl">🇺🇸</span>
                      <div>
                        <div className="font-semibold">English</div>
                        <div className="text-xs text-gray-500">English</div>
                      </div>
                      {language === 'en' && <Check size={16} className="ml-auto" />}
                    </button>
                    <button
                      onClick={() => { setLanguage('ko'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center space-x-3 ${language === 'ko' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    >
                      <span className="text-2xl">🇰🇷</span>
                      <div>
                        <div className="font-semibold">한국어</div>
                        <div className="text-xs text-gray-500">Korean</div>
                      </div>
                      {language === 'ko' && <Check size={16} className="ml-auto" />}
                    </button>
                    <button
                      onClick={() => { setLanguage('zh'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center space-x-3 ${language === 'zh' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    >
                      <span className="text-2xl">🇨🇳</span>
                      <div>
                        <div className="font-semibold">中文</div>
                        <div className="text-xs text-gray-500">Chinese</div>
                      </div>
                      {language === 'zh' && <Check size={16} className="ml-auto" />}
                    </button>
                    <button
                      onClick={() => { setLanguage('ja'); setLangMenuOpen(false); }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center space-x-3 ${language === 'ja' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    >
                      <span className="text-2xl">🇯🇵</span>
                      <div>
                        <div className="font-semibold">日本語</div>
                        <div className="text-xs text-gray-500">Japanese</div>
                      </div>
                      {language === 'ja' && <Check size={16} className="ml-auto" />}
                    </button>
                  </div>
                )}
              </div>

              <Link 
                href="/auth/register"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 xl:px-5 py-2.5 text-gray-700 hover:text-blue-600 border border-gray-300 hover:border-blue-500 rounded-xl transition-all duration-300 font-medium whitespace-nowrap text-sm"
              >
                {t('freeTrial')}
              </Link>

              <Link 
                href="/auth/login"
                className="px-5 xl:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 font-medium whitespace-nowrap text-sm"
              >
                {t('login')}
              </Link>
            </div>

            {/* Mobile Login Button & Menu Button - Show on Mobile/Tablet */}
            <div className="lg:hidden flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link 
                href="/auth/login"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30 font-medium text-sm whitespace-nowrap"
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

          {/* Mobile Menu - Show on Mobile/Tablet */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-4 border-t animate-slide-up">
              <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-blue-50 px-4 rounded-lg transition-all" onClick={() => setMobileMenuOpen(false)}>
                {t('features')}
              </a>
              <a href="#pricing" className="block text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-blue-50 px-4 rounded-lg transition-all" onClick={() => setMobileMenuOpen(false)}>
                {t('pricing')}
              </a>
              
              {/* Mobile Language Selector */}
              <div className="px-4">
                <div className="text-sm font-semibold text-gray-500 mb-2 flex items-center space-x-2">
                  <Globe size={16} />
                  <span>Language</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setLanguage('vi')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === 'vi' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    🇻🇳 VI
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    🇺🇸 EN
                  </button>
                  <button
                    onClick={() => setLanguage('ko')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === 'ko' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    🇰🇷 KO
                  </button>
                  <button
                    onClick={() => setLanguage('zh')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    🇨🇳 ZH
                  </button>
                  <button
                    onClick={() => setLanguage('ja')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === 'ja' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    🇯🇵 JA
                  </button>
                </div>
              </div>
              
              <Link 
                href="/auth/register"
                className="block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-center font-medium shadow-lg hover:shadow-xl transition-all mx-4"
              >
                {t('freeTrial')}
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 -z-10 animate-gradient" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '2s'}} />

        {/* Floating particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg animate-pulse-glow animate-scale-in">
            <Star size={16} fill="currentColor" className="animate-spin" style={{animationDuration: '3s'}} />
            <span>{t('badge')}</span>
            <Sparkles size={16} className="animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t('heroTitle1')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
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
              href="/auth/register"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white rounded-xl font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center space-x-3 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <Zap size={20} className="relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10">{t('signUpTrial')}</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-sm animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <div className="flex -space-x-1">
                <Star size={20} className="text-yellow-400" fill="currentColor" />
                <Star size={20} className="text-yellow-400" fill="currentColor" />
                <Star size={20} className="text-yellow-400" fill="currentColor" />
                <Star size={20} className="text-yellow-400" fill="currentColor" />
                <Star size={20} className="text-yellow-400" fill="currentColor" />
              </div>
              <span className="font-bold text-gray-900">4.9/5</span>
              <span className="text-gray-600">{t('rating')}</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Users size={24} className="text-blue-600" />
              <div>
                <div className="font-bold text-gray-900">50,000+</div>
                <div className="text-xs text-gray-600">{t('users')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Shield size={24} className="text-green-600" />
              <div>
                <div className="font-bold text-gray-900">24/7</div>
                <div className="text-xs text-gray-600">{t('support')}</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-20 flex justify-center">
            <div className="animate-bounce">
              <ChevronDown className="text-blue-400" size={40} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Static background orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Sparkles size={16} />
              <span>Tính năng toàn diện</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-gradient pb-2">
              16+ Tính Năng Mạnh Mẽ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hệ sinh thái tính năng hoàn chỉnh cho mạng nội bộ doanh nghiệp hiện đại
            </p>
          </div>

          {/* Features Grid with Pagination */}
          <div className="relative">
            {/* Previous Button - Left */}
            <button
              onClick={() => setCurrentFeaturePage(0)}
              disabled={currentFeaturePage === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                currentFeaturePage === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-110 shadow-lg hover:shadow-xl'
              }`}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button - Right */}
            <button
              onClick={() => setCurrentFeaturePage(1)}
              disabled={currentFeaturePage === 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                currentFeaturePage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-110 shadow-lg hover:shadow-xl'
              }`}
            >
              <ChevronRight size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(() => {
                const allFeatures = [
                  { id: 1, color: 'blue', icon: MessageSquare, title: 'New Feed', desc: 'Nắm bắt mọi thông tin chuyển động trong Tổ chức của bạn, giữ cho Tổ chức luôn luôn chuyển động' },
                  { id: 2, color: 'orange', icon: Users, title: 'Group', desc: 'Xây dựng các group theo phòng ban, đội nhóm, dự án giúp truyền thông nhất quán, giao tiếp dễ dàng, lưu giữ mọi công việc, cập nhật mọi khoảnh khắc' },
                  { id: 3, color: 'cyan', icon: BookOpen, title: 'Pages', desc: 'Tổ chức có thể tạo ra các trang công khai, hay trang nội bộ giúp các Thành viên trong Tổ chức các Đối tác khách hàng tham gia kết nối, giao tiếp, làm việc trên từng Dự án, hoặc sản phẩm hoặc Sự kiện' },
                  { id: 4, color: 'green', icon: Target, title: 'Personal Page', desc: 'Trang cá nhân của mỗi Thành viên trong Tổ chức của bạn, nơi họ chủ động chia sẻ các thông tin để kết nối các Thành viên khác, nơi lưu giữ các kinh nghiệm, kiến thức của họ đóng góp cho Tổ chức' },
                  { id: 5, color: 'red', icon: MessageSquare, title: 'Chat Group, Group Call', desc: 'Mọi nội dung chat của các Nhóm nội bộ, các Nhóm với Khách hàng, Đối tác phải được giữ lại trong Tổ chức, đảm bảo được thông tin bí mật và nó là nguồn dữ liệu vô cùng quý giá' },
                  { id: 6, color: 'purple', icon: Smartphone, title: 'Chat, Call', desc: 'Các Thành viên trong Tổ chức dễ dàng giao tiếp với nhau và tách bạch với các ứng dụng giao tiếp cá nhân khác, tạo sự tách bạch công việc và cá nhân, bảo mật thông tin của Tổ chức' },
                  { id: 7, color: 'pink', icon: Award, title: 'Post', desc: 'Đây là một tính năng vô cùng quan trọng và được áp dụng nhiều nhất trong mọi Tổ chức. Post giúp truyền thông, thông báo và tương tác đa chiều' },
                  { id: 8, color: 'indigo', icon: MessageSquare, title: 'Comment và Reply', desc: 'Post là một chủ đề truyền thông, giao tiếp, chia sẻ thì comment và reply là tính năng giữ luồng thông tin giao tiếp' },
                  { id: 9, color: 'yellow', icon: Heart, title: 'Reaction', desc: 'Là cách phản hồi các post, comment một cách nhanh nhất và thể hiện được quan điểm của các Thành viên' },
                  { id: 10, color: 'teal', icon: Share2, title: 'Share', desc: 'Hình thành văn hóa lan truyền, lưu giữ các hoạt động, các thông tin tốt trong Tổ chức. Thể hiện sự ghi nhận đối với Tác giả' },
                  { id: 11, color: 'emerald', icon: TrendingUp, title: 'Poll', desc: 'Để khảo sát được ý muốn, mong đợi, phản hồi của các Thành viên, Đội nhóm trong Tổ chức thì Poll là một tính năng đi theo bài post thực hiện nó rất hiệu quả' },
                  { id: 12, color: 'rose', icon: Bell, title: 'Reminder', desc: 'Toàn tổ chức, hoặc Phòng ban, Đội nhóm dễ dàng được KOM nhắc nhở các lịch sự kiện sắp diễn ra, giúp tránh bỏ lỡ các sự kiện, các việc cần làm' },
                  { id: 13, color: 'amber', icon: Bell, title: 'Notification', desc: 'Tất cả các Thành viên trong Tổ chức dễ dàng nắm bắt được các thông tin từ quan trọng cho đến các công việc, các sự kiện sinh nhật' },
                  { id: 14, color: 'lime', icon: Target, title: 'Daily Goals', desc: 'Các Phòng ban, Đội nhóm, Tổ dự án, từng Thành viên dễ dàng lập các mục tiêu ngày từ đó KOM sẽ nhắc nhở, thống kê và báo cáo hiệu suất, kết quả' },
                  { id: 15, color: 'violet', icon: TrendingUp, title: 'Nhật ký hoạt động', desc: 'KOM cung cấp nhiều hệ thống dashboard phân tích, các hệ thống monitoring giúp từng Thành viên biết biết quá trình hoạt động, giao tiếp, làm việc của mình' },
                  { id: 16, color: 'sky', icon: Globe, title: 'Liên kết ứng dụng', desc: 'KOM cung cấp cổng Developer portal giúp các ứng dụng khác dễ dàng kết nối để kết nối thông tin, nghiệp vụ, giúp Tổ chức tạo ra một nền tảng giao tiếp, làm việc và kinh doanh trên một nền tảng trung tâm là KOM' },
                ];

                const startIndex = currentFeaturePage * 8;
                const endIndex = startIndex + 8;
                const currentFeatures = allFeatures.slice(startIndex, endIndex);

                return currentFeatures.map((feature) => {
                  const Icon = feature.icon;
                  
                  // Color mapping for proper Tailwind class generation
                  const colorClasses = {
                    blue: { 
                      bg: 'bg-blue-500/5', 
                      gradient: 'from-blue-500 to-blue-600',
                      border: 'hover:border-blue-300'
                    },
                    orange: { 
                      bg: 'bg-orange-500/5', 
                      gradient: 'from-orange-500 to-orange-600',
                      border: 'hover:border-orange-300'
                    },
                    cyan: { 
                      bg: 'bg-cyan-500/5', 
                      gradient: 'from-cyan-500 to-cyan-600',
                      border: 'hover:border-cyan-300'
                    },
                    green: { 
                      bg: 'bg-green-500/5', 
                      gradient: 'from-green-500 to-green-600',
                      border: 'hover:border-green-300'
                    },
                    red: { 
                      bg: 'bg-red-500/5', 
                      gradient: 'from-red-500 to-red-600',
                      border: 'hover:border-red-300'
                    },
                    purple: { 
                      bg: 'bg-purple-500/5', 
                      gradient: 'from-purple-500 to-purple-600',
                      border: 'hover:border-purple-300'
                    },
                    pink: { 
                      bg: 'bg-pink-500/5', 
                      gradient: 'from-pink-500 to-pink-600',
                      border: 'hover:border-pink-300'
                    },
                    indigo: { 
                      bg: 'bg-indigo-500/5', 
                      gradient: 'from-indigo-500 to-indigo-600',
                      border: 'hover:border-indigo-300'
                    },
                    yellow: { 
                      bg: 'bg-yellow-500/5', 
                      gradient: 'from-yellow-500 to-yellow-600',
                      border: 'hover:border-yellow-300'
                    },
                    teal: { 
                      bg: 'bg-teal-500/5', 
                      gradient: 'from-teal-500 to-teal-600',
                      border: 'hover:border-teal-300'
                    },
                    emerald: { 
                      bg: 'bg-emerald-500/5', 
                      gradient: 'from-emerald-500 to-emerald-600',
                      border: 'hover:border-emerald-300'
                    },
                    rose: { 
                      bg: 'bg-rose-500/5', 
                      gradient: 'from-rose-500 to-rose-600',
                      border: 'hover:border-rose-300'
                    },
                    amber: { 
                      bg: 'bg-amber-500/5', 
                      gradient: 'from-amber-500 to-amber-600',
                      border: 'hover:border-amber-300'
                    },
                    lime: { 
                      bg: 'bg-lime-500/5', 
                      gradient: 'from-lime-500 to-lime-600',
                      border: 'hover:border-lime-300'
                    },
                    violet: { 
                      bg: 'bg-violet-500/5', 
                      gradient: 'from-violet-500 to-violet-600',
                      border: 'hover:border-violet-300'
                    },
                    sky: { 
                      bg: 'bg-sky-500/5', 
                      gradient: 'from-sky-500 to-sky-600',
                      border: 'hover:border-sky-300'
                    },
                  };
                  
                  const colors = colorClasses[feature.color as keyof typeof colorClasses] || colorClasses.blue;
                  
                  return (
                    <div
                      key={feature.id}
                      className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 ${colors.border} relative overflow-hidden cursor-pointer`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                      <div className="relative z-10">
                        <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                          <Icon size={28} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Page Indicators */}
            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                onClick={() => setCurrentFeaturePage(0)}
                className={`w-3 h-3 rounded-full transition-all ${currentFeaturePage === 0 ? 'bg-blue-500 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
              ></button>
              <button
                onClick={() => setCurrentFeaturePage(1)}
                className={`w-3 h-3 rounded-full transition-all ${currentFeaturePage === 1 ? 'bg-blue-500 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
              ></button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              <Heart size={16} />
              <span>{t('pricingBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('pricingTitle')}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{t('pricingYou')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              {t('pricingDesc')}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="group bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('basicPlan')}</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">$69</span>
                  <span className="text-gray-600 ml-2">{t('perMonth')}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('upToMembers').replace('{count}', '1.000')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('groups').replace('{count}', '100')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('basicAnalytics')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('emailSupport')}</span>
                </li>
              </ul>

              <Link
                href="/auth/register"
                className="block w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-center hover:bg-gray-800 transition-all duration-300 group-hover:shadow-lg"
              >
                {t('getStarted')}
              </Link>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-3xl p-8 shadow-2xl shadow-blue-500/40 transform md:scale-110 hover:scale-115 transition-all duration-300 animate-pulse-glow">
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2 animate-bounce">
                  <Star size={16} fill="currentColor" />
                  <span>{t('mostPopular')}</span>
                  <Star size={16} fill="currentColor" />
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl blur-xl opacity-50 -z-10"></div>

              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">{t('proPlan')}</h3>
                <div className="flex items-baseline">
                  <span className="text-6xl font-bold text-white">$299</span>
                  <span className="text-blue-100 ml-2 text-lg">{t('perMonth')}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Check size={16} className="text-white font-bold" />
                  </div>
                  <span className="text-white font-medium">{t('upToMembers').replace('{count}', '3.000')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Check size={16} className="text-white font-bold" />
                  </div>
                  <span className="text-white font-medium">{t('unlimitedGroups')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Check size={16} className="text-white font-bold" />
                  </div>
                  <span className="text-white font-medium">{t('eventManagement')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Check size={16} className="text-white font-bold" />
                  </div>
                  <span className="text-white font-medium">{t('pointsSystem')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Check size={16} className="text-white font-bold" />
                  </div>
                  <span className="text-white font-medium">{t('advancedAnalytics')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Check size={16} className="text-white font-bold" />
                  </div>
                  <span className="text-white font-medium">{t('support247')}</span>
                </li>
              </ul>

              <Link
                href="/auth/register"
                className="group block w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-center hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Zap size={20} />
                  <span>{t('startTrial')}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="group bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('enterprisePlan')}</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{t('custom')}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('unlimitedEverything')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('multiLocation')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('customAPI')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('onSiteTraining')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{t('dedicatedManager')}</span>
                </li>
              </ul>

                <a
                href="https://klinks.thek.one/uid/KOM"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-bold text-center hover:from-gray-800 hover:to-gray-700 transition-all duration-300 group-hover:shadow-lg"
                >
                {t('contactSales')}
                </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-pulse">
            <Sparkles size={16} />
            <span>{t('ctaBadge')}</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t('ctaTitle1')}
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              {t('ctaTitle2')}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('ctaDesc')} <span className="font-bold text-white">{t('ctaDescUsers')}</span> {t('ctaDescUsing')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/auth/register"
              className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-110 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <Zap size={24} className="relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10 text-lg">{t('startTrial')}</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <Check size={20} className="text-green-300" />
              <span>{t('noCreditCard')}</span>
            </div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Check size={20} className="text-green-300" />
              <span>{t('cancelAnytime')}</span>
            </div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Check size={20} className="text-green-300" />
              <span>{t('support')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
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

                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Link2 size={24} className="text-white" />
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
                      <Smartphone size={24} className="text-white" />
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

                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-300 relative overflow-hidden cursor-pointer flex-shrink-0 w-72">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Link2 size={24} className="text-white" />
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
                      <Smartphone size={24} className="text-white" />
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
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-blue-500/50 overflow-hidden">
                  <img 
                    src="https://api-kom.kas.asia/api/uploads/chat_image/image_1760004239060.png" 
                    alt="KOM Logo" 
                    className="w-full h-full object-contain"
                    />
                </div>
                <span className="text-2xl font-bold text-blue-500">KOM</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {t('footerDesc')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Globe size={20} />
                </a>
                <a href="https://klinks.thek.one/uid/KOM" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Users size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">{t('product')}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('features')}</span>
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('pricing')}</span>
                  </a>
                </li>
                <li>
                  <a href="https://klinks.thek.one/uid/KOM" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('demo')}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">{t('company')}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://klinks.thek.one/uid/KOM" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('about')}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('blog')}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('careers')}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">{t('support')}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('helpCenter')}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('documentation')}</span>
                  </a>
                </li>
                <li>
                  <a href="https://klinks.thek.one/uid/KOM" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('contact')}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* App Download Section */}
          <div className="py-12 border-t border-gray-800">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-500 mb-3">
                {t('downloadTitle')}
              </h3>
              <p className="text-gray-400">
                {t('downloadDesc')}
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Google Play Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.kas.socialmobile&hl=vi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white hover:bg-gray-100 text-black rounded-xl px-6 py-3 flex items-center space-x-3 transition-all hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs font-medium text-gray-600">{t('downloadOn')}</div>
                    <div className="text-lg font-bold">{t('googlePlay')}</div>
                  </div>
                </a>

                {/* App Store Button */}
                <a
                  href="https://apps.apple.com/vn/app/kom/id6748440654?l=vi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white hover:bg-gray-100 text-black rounded-xl px-6 py-3 flex items-center space-x-3 transition-all hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs font-medium text-gray-600">{t('downloadOn')}</div>
                    <div className="text-lg font-bold">{t('appStore')}</div>
                  </div>
                </a>
              </div>

              {/* QR Codes */}
              <div className="flex gap-8">
                {/* Google Play QR */}
                <div className="text-center">
                  <div className="bg-gray-800 p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-700">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.kas.socialmobile%26hl=vi"
                      alt="QR Code Google Play"
                      className="w-32 h-32 md:w-36 md:h-36"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-3 font-medium">{t('googlePlay')}</p>
                </div>

                {/* App Store QR */}
                <div className="text-center">
                  <div className="bg-gray-800 p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-700">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://apps.apple.com/vn/app/kom/id6748440654?l=vi"
                      alt="QR Code App Store"
                      className="w-32 h-32 md:w-36 md:h-36"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-3 font-medium">{t('appStore')}</p>
                </div>
              </div>
            </div>

            {/* Helper Text */}
            <p className="text-gray-500 text-sm mt-8 text-center">
              <Smartphone className="inline-block mr-2" size={16} />
              {t('scanQR')}
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © 2025 <a
                  href="https://klinks.thek.one/uid/KOM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 font-semibold hover:underline"
                >
                  KOM Technology
                </a>. {t('copyright')}
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t('privacy')}
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t('terms')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
