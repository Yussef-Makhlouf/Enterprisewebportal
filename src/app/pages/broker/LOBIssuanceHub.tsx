import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Lock, Info, Plane, Car, Stethoscope, Home, HardHat, Wrench, type LucideIcon } from 'lucide-react';

interface LOBItem {
  key: string;
  Icon: LucideIcon;
  label: string;
  labelAr: string;
  desc: string;
  descAr: string;
  products: number;
  available: boolean;
  gradient: string;
  borderActive: string;
  iconColor: string;
  path: string;
}

const LOBS: LOBItem[] = [
  {
    key: 'travel',
    Icon: Plane,
    label: 'Travel Insurance',
    labelAr: 'تأمين السفر',
    desc: 'Worldwide coverage for individual and family travel',
    descAr: 'تغطية عالمية للأفراد والعائلات',
    products: 7,
    available: true,
    gradient: 'linear-gradient(135deg, rgba(200,16,46,0.12) 0%, rgba(200,16,46,0.04) 100%)',
    borderActive: '#C8102E',
    iconColor: '#C8102E',
    path: '/broker/issuance/travel'
  },
  {
    key: 'motor',
    Icon: Car,
    label: 'Motor Insurance',
    labelAr: 'تأمين المركبات',
    desc: 'Comprehensive vehicle coverage — new, renewal & corporate',
    descAr: 'تغطية شاملة للمركبات — جديدة وتجديد ومؤسسي',
    products: 3,
    available: true,
    gradient: 'linear-gradient(135deg, rgba(200,150,42,0.12) 0%, rgba(200,150,42,0.04) 100%)',
    borderActive: '#C8962A',
    iconColor: '#C8962A',
    path: '/broker/issuance/motor'
  },
  {
    key: 'medical',
    Icon: Stethoscope,
    label: 'Medical Insurance',
    labelAr: 'التأمين الطبي',
    desc: 'Individual and group medical coverage plans',
    descAr: 'خطط التغطية الطبية الفردية والجماعية',
    products: 3,
    available: false,
    gradient: 'linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(0,200,150,0.02) 100%)',
    borderActive: '#00C896',
    iconColor: '#00C896',
    path: '/broker/issuance'
  },
  {
    key: 'home',
    Icon: Home,
    label: 'Home Insurance',
    labelAr: 'تأمين المنزل',
    desc: 'Complete home and contents protection',
    descAr: 'حماية شاملة للمنزل والمحتويات',
    products: 2,
    available: true,
    gradient: 'linear-gradient(135deg, rgba(13,180,204,0.10) 0%, rgba(13,180,204,0.03) 100%)',
    borderActive: '#0DB4CC',
    iconColor: '#0DB4CC',
    path: '/broker/issuance'
  },
  {
    key: 'domestic',
    Icon: HardHat,
    label: 'Domestic Worker',
    labelAr: 'العمالة المنزلية',
    desc: 'Insurance for domestic workers and household staff',
    descAr: 'تأمين للعمالة المنزلية والموظفين',
    products: 1,
    available: true,
    gradient: 'linear-gradient(135deg, rgba(123,97,255,0.10) 0%, rgba(123,97,255,0.03) 100%)',
    borderActive: '#7B61FF',
    iconColor: '#7B61FF',
    path: '/broker/issuance'
  },
  {
    key: 'assistance',
    Icon: Wrench,
    label: 'Home Assistance',
    labelAr: 'المساعدة المنزلية',
    desc: 'Emergency home services and technical support',
    descAr: 'خدمات المنزل الطارئة والدعم التقني',
    products: 1,
    available: false,
    gradient: 'linear-gradient(135deg, rgba(240,176,48,0.10) 0%, rgba(240,176,48,0.03) 100%)',
    borderActive: '#F0B030',
    iconColor: '#F0B030',
    path: '/broker/issuance'
  },
];

export function LOBIssuanceHub() {
  const { theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [hoveredLOB, setHoveredLOB] = useState<string | null>(null);

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(13,31,60,0.1)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      <div className="mb-6">
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
          {isAr ? 'إصدار وثيقة جديدة' : 'Issue New Policy'}
        </h1>
        <p style={{ fontSize: '13px', color: textSecondary }}>
          {isAr ? 'اختر نوع التغطية التأمينية التي تريد إصدارها' : 'Select the type of insurance coverage you want to issue'}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {LOBS.map((lob) => {
          const isHovered = hoveredLOB === lob.key;
          return (
            <div
              key={lob.key}
              className="rounded-2xl p-5 relative overflow-hidden cursor-pointer group transition-all duration-200"
              style={{
                background: lob.available ? (isHovered ? lob.gradient : (theme === 'dark' ? '#0F1A2E' : '#FFFFFF')) : (theme === 'dark' ? '#0A1525' : '#F8FAFB'),
                border: `1.5px solid ${isHovered && lob.available ? lob.borderActive : borderColor}`,
                transform: isHovered && lob.available ? 'translateY(-3px)' : 'none',
                boxShadow: isHovered && lob.available ? `0 12px 40px ${lob.borderActive}20` : 'none',
                opacity: !lob.available ? 0.65 : 1,
              }}
              onMouseEnter={() => setHoveredLOB(lob.key)}
              onMouseLeave={() => setHoveredLOB(null)}
              onClick={() => lob.available && navigate(lob.path)}
            >
              {/* Background gradient on hover */}
              {isHovered && lob.available && (
                <div className="absolute inset-0 opacity-100 transition-opacity"
                  style={{ background: lob.gradient }} />
              )}

              <div className="relative z-10">
                {/* Icon + Status */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      background: isHovered && lob.available
                        ? `${lob.borderActive}22`
                        : (theme === 'dark' ? 'rgba(255,255,255,0.06)' : `${lob.borderActive}12`),
                      border: `1px solid ${lob.borderActive}30`,
                    }}
                  >
                    <lob.Icon
                      size={26}
                      style={{ color: lob.available ? lob.iconColor : textSecondary }}
                    />
                  </div>
                  {lob.available ? (
                    <span className="px-2.5 py-1 rounded-full text-white font-medium"
                      style={{ fontSize: '11px', background: '#00C896', letterSpacing: '0.02em' }}>
                      {isAr ? 'متاح' : 'Available'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium"
                      style={{ fontSize: '11px', background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E4EAF3', color: textSecondary }}>
                      <Lock size={11} />
                      {isAr ? 'غير مرخص' : 'Not Licensed'}
                    </span>
                  )}
                </div>

                <h3 className="mb-1.5" style={{ fontSize: '15px', fontWeight: 700, color: textPrimary }}>
                  {isAr ? lob.labelAr : lob.label}
                </h3>
                <p className="mb-4" style={{ fontSize: '12px', color: textSecondary, lineHeight: '1.6' }}>
                  {isAr ? lob.descAr : lob.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '12px', color: textSecondary }}>
                    {lob.products} {isAr ? 'منتجات' : 'products'}
                  </span>
                  {lob.available && (
                    <div className={`flex items-center gap-1 font-medium transition-all ${isHovered ? (isRTL ? '-translate-x-1' : 'translate-x-1') : ''}`}
                      style={{ fontSize: '12px', color: lob.borderActive }}>
                      {isAr ? 'ابدأ الإصدار' : 'Start Issuance'}
                      <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-xl border"
        style={{ background: theme === 'dark' ? 'rgba(13,180,204,0.08)' : 'rgba(13,180,204,0.06)', borderColor: 'rgba(13,180,204,0.25)' }}>
        <Info size={16} style={{ color: '#0DB4CC', flexShrink: 0 }} />
        <p style={{ fontSize: '13px', color: textSecondary }}>
          {isAr
            ? 'خطوط الأعمال غير المرخصة تتطلب تصريحاً إضافياً من جي آي جي الأردن. تواصل مع فريق الدعم لتفعيلها.'
            : 'Locked tiles require additional authorization from GIG Jordan. Contact support to activate them.'}
        </p>
      </div>
    </div>
  );
}
