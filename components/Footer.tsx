"use client";

import { MapPin, Phone, Mail, Globe } from "lucide-react";

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
  contact: { vi: 'Liên hệ', en: 'Contact', ko: '연락', zh: '联系', ja: '連絡' },
  heroTitle: { vi: 'Công ty Cổ Phần Công Nghệ KAS', en: 'KAS Technology Corporation', ko: 'KAS 기술 주식회사', zh: 'KAS科技股份公司', ja: 'KAS テクノロジー株式会社' },
  businessLicense: { vi: 'Giấy chứng nhận đăng ký kinh doanh số: 0316194224', en: 'Business Registration Certificate: 0316194224', ko: '사업자등록증 번호: 0316194224', zh: '营业执照号码：0316194224', ja: '事業登録証明書番号：0316194224' },
  issuedDate: { vi: 'Cấp ngày 11/03/2020', en: 'Issued on 11/03/2020', ko: '발급일: 2020년 3월 11일', zh: '发证日期：2020年3月11日', ja: '発行日：2020年3月11日' },
  bankAccount: { vi: 'Tài khoản ngân hàng', en: 'Bank Account', ko: '은행 계좌', zh: '银行账户', ja: '銀行口座' },
  bankAccountValue: { vi: '1170205610 - Ngân hàng BIDV - CN Bình Điền Sài Gòn', en: '1170205610 - BIDV Bank - Binh Dien Sai Gon Branch', ko: '1170205610 - BIDV Bank - Binh Dien Sai Gon Branch', zh: '1170205610 - BIDV Bank - Binh Dien Sai Gon Branch', ja: '1170205610 - BIDV Bank - Binh Dien Sai Gon Branch' },
  addressValue: { vi: '199 Đường Nguyễn Hoàng, Phường Bình Trưng, Thành Phố Hồ Chí Minh', en: '199 Nguyen Hoang Street, Binh Trung Ward, Ho Chi Minh City', ko: '199 Nguyen Hoang Street, Binh Trung Ward, Ho Chi Minh City', zh: '199 Nguyen Hoang Street, Binh Trung Ward, Ho Chi Minh City', ja: '199 Nguyen Hoang Street, Binh Trung Ward, Ho Chi Minh City' },
  copyright: { vi: '© 2021 by KAS TECHNOLOGY CORPORATION', en: '© 2021 by KAS TECHNOLOGY CORPORATION', ko: '© 2021 KAS TECHNOLOGY CORPORATION', zh: '© 2021 KAS科技股份公司', ja: '© 2021 KAS TECHNOLOGY CORPORATION' },
  offices: { vi: 'Văn phòng', en: 'Offices', ko: '사무실', zh: '办公室', ja: 'オフィス' },
  hcmOffice: { vi: 'Trụ sở chính tại Tp.HCM', en: 'Head Office in Ho Chi Minh City', ko: 'Head Office in Ho Chi Minh City', zh: 'Head Office in Ho Chi Minh City', ja: 'Head Office in Ho Chi Minh City' },
  danangBranch: { vi: 'Chi nhánh Đà Nẵng', en: 'Da Nang Branch', ko: 'Da Nang Branch', zh: 'Da Nang Branch', ja: 'Da Nang Branch' },
  hanoiOffice: { vi: 'Văn phòng Hà Nội', en: 'Hanoi Office', ko: 'Hanoi Office', zh: 'Hanoi Office', ja: 'Hanoi Office' },
  daklakOffice: { vi: 'Văn phòng Đắk Lắk', en: 'Dak Lak Office', ko: 'Dak Lak Office', zh: 'Dak Lak Office', ja: 'Dak Lak Office' },
  gialaiOffice: { vi: 'Văn phòng Gia Lai', en: 'Gia Lai Office', ko: 'Gia Lai Office', zh: 'Gia Lai Office', ja: 'Gia Lai Office' },
};

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">KAS</h3>
            <p className="text-gray-300 mb-4">{t('heroTitle')}</p>
            <p className="text-sm text-gray-400">{t('businessLicense')}</p>
            <p className="text-sm text-gray-400">{t('issuedDate')}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-300">{t('addressValue')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <a href="tel:19002137" className="text-sm text-gray-300 hover:text-white">1900 2137</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <a href="mailto:kas@kas.asia" className="text-sm text-gray-300 hover:text-white">kas@kas.asia</a>
              </div>
              <div className="flex items-center space-x-2">
                <Globe size={18} />
                <a href="https://kas.asia" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white">kas.asia</a>
              </div>
            </div>
          </div>

          {/* Bank Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('bankAccount')}</h4>
            <p className="text-sm text-gray-300">{t('bankAccountValue')}</p>
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('offices')}</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• {t('hcmOffice')}</p>
              <p>• {t('danangBranch')}</p>
              <p>• {t('hanoiOffice')}</p>
              <p>• {t('daklakOffice')}</p>
              <p>• {t('gialaiOffice')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
