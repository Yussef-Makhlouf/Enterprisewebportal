import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Lock, Info, Plane, Car, Stethoscope, Home, HardHat, Wrench, type LucideIcon } from 'lucide-react';

/* Design-system colors only */
const B = {
  indigo: '#19058C',
  roseGold: '#D28C64',
  ocean: '#8094E6',
  seafoam: '#6BCABA',
  purple: '#A78BF0',
  deepBlue: '#1F0F4D',
} as const;

interface LOBItem {
  key: string;
  Icon: LucideIcon;
  label: string; labelAr: string;
  desc: string; descAr: string;
  products: number;
  available: boolean;
  color: string;
  path: string;
}

const LOBS: LOBItem[] = [
  { key: 'travel', Icon: Plane, label: 'Travel Insurance', labelAr: 'تأمين السفر', desc: 'Worldwide coverage for individual and family travel', descAr: 'تغطية عالمية للأفراد والعائلات', products: 7, available: true, color: B.indigo, path: '/broker/issuance/travel' },
  { key: 'motor', Icon: Car, label: 'Motor Insurance', labelAr: 'تأمين المركبات', desc: 'Comprehensive vehicle coverage — new, renewal & corporate', descAr: 'تغطية شاملة للمركبات — جديدة وتجديد', products: 3, available: true, color: B.roseGold, path: '/broker/issuance/motor' },
  { key: 'medical', Icon: Stethoscope, label: 'Medical Insurance', labelAr: 'التأمين الطبي', desc: 'Individual and group medical coverage plans', descAr: 'خطط التغطية الطبية الفردية والجماعية', products: 3, available: true, color: B.seafoam, path: '/broker/issuance/medical' },
  { key: 'home', Icon: Home, label: 'Home Insurance', labelAr: 'تأمين المنزل', desc: 'Complete home and contents protection', descAr: 'حماية شاملة للمنزل والمحتويات', products: 2, available: true, color: B.ocean, path: '/broker/issuance/home' },
  { key: 'domestic', Icon: HardHat, label: 'Domestic Worker', labelAr: 'العمالة المنزلية', desc: 'Insurance for domestic workers and household staff', descAr: 'تأمين للعمالة المنزلية والموظفين', products: 1, available: true, color: B.purple, path: '/broker/issuance/domestic-worker' },
  { key: 'assist', Icon: Wrench, label: 'Home Assistance', labelAr: 'المساعدة المنزلية', desc: 'Emergency home services and technical support', descAr: 'خدمات المنزل الطارئة والدعم التقني', products: 1, available: true, color: B.seafoam, path: '/broker/issuance/home-assistance' },
];

export function LOBIssuanceHub() {
  const { theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';
  const [hovered, setHovered] = useState<string | null>(null);

  const textPrimary = isDark ? '#FFFFFF' : B.indigo;
  const textSecondary = isDark ? 'rgba(180,205,255,0.65)' : '#3D3560';
  const borderColor = isDark ? 'rgba(128,148,230,0.16)' : 'rgba(25,5,140,0.09)';
  const cardBase = isDark ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';

  const ff = "'Almarai', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";

  return (
    <div className="p-7 min-h-full gig-texture-bg bg-background" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div className="mb-7">
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, color: textPrimary, fontFamily: ffH }}>
          {isAr ? 'إصدار وثيقة جديدة' : 'Issue New Policy'}
        </h1>
        <p style={{ fontSize: '13px', color: textSecondary, marginTop: '4px', fontFamily: ff }}>
          {isAr ? 'اختر نوع التغطية التأمينية التي تريد إصدارها' : 'Select the type of insurance coverage you want to issue'}
        </p>
      </div>

      {/* LOB Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LOBS.map((lob) => {
          const isHov = hovered === lob.key && lob.available;
          return (
            <div
              key={lob.key}
              className="rounded-xl p-5 relative overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                background: cardBase,
                border: `1.5px solid ${isHov ? `${lob.color}60` : borderColor}`,
                boxShadow: isHov
                  ? `0 12px 40px ${lob.color}28, ${isDark ? 'inset 0 1px 0 rgba(255,255,255,0.07)' : ''}`
                  : isDark ? '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)' : '0 2px 16px rgba(25,5,140,0.06)',
                transform: isHov ? 'translateY(-3px)' : 'none',
                opacity: lob.available ? 1 : 0.60,
              }}
              onMouseEnter={() => setHovered(lob.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => lob.available && navigate(lob.path)}
            >
              {/* Ambient glow */}
              {isHov && (
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `radial-gradient(ellipse at top left, ${lob.color}18 0%, transparent 60%)`
                }} />
              )}

              <div className="relative z-10">
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform"
                    style={{
                      background: isDark
                        ? (isHov ? lob.color : `${lob.color}40`)
                        : (isHov ? `${lob.color}18` : '#FFFFFF'),
                      border: isDark
                        ? `1.5px solid ${lob.color}${isHov ? 'CC' : '70'}`
                        : `1.5px solid ${lob.color}${isHov ? '80' : '40'}`,
                      boxShadow: isDark && isHov ? `0 0 16px ${lob.color}55` : 'none',
                      transform: isHov ? 'scale(1.08)' : 'scale(1)',
                    }}>
                    <lob.Icon size={26} style={{ color: lob.available ? (isDark ? '#FFFFFF' : lob.color) : textSecondary }} />
                  </div>
                  {lob.available ? (
                    <span className="px-2.5 py-1 rounded-full text-white font-bold"
                      style={{ fontSize: '10px', background: B.seafoam, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: ff }}>
                      {isAr ? 'متاح' : 'Available'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium"
                      style={{ fontSize: '10px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(25,5,140,0.06)', color: textSecondary, fontFamily: ff }}>
                      <Lock size={10} />
                      {isAr ? 'غير مرخص' : 'Not Licensed'}
                    </span>
                  )}
                </div>

                <h3 className="mb-1.5" style={{ fontSize: '15px', fontWeight: 700, color: isHov ? lob.color : textPrimary, fontFamily: ffH }}>
                  {isAr ? lob.labelAr : lob.label}
                </h3>
                <p className="mb-4" style={{ fontSize: '12px', color: textSecondary, lineHeight: '1.6', fontFamily: ff }}>
                  {isAr ? lob.descAr : lob.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '11px', color: textSecondary, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {lob.products} {isAr ? 'منتجات' : 'products'}
                  </span>
                  {lob.available && (
                    <div className={`flex items-center gap-1 font-bold transition-all ${isHov ? (isRTL ? '-translate-x-1' : 'translate-x-1') : ''}`}
                      style={{ fontSize: '11px', color: lob.color, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: ff }}>
                      {isAr ? 'ابدأ' : 'Issue'}
                      <ArrowRight size={13} className={isRTL ? 'rotate-180' : ''} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="mt-6 flex items-center gap-3 px-5 py-3.5 rounded-xl"
        style={{ background: isDark ? 'rgba(128,148,230,0.07)' : 'rgba(25,5,140,0.05)', border: `1px solid rgba(128,148,230,0.20)` }}>
        <Info size={15} style={{ color: B.ocean, flexShrink: 0 }} />
        <p style={{ fontSize: '12px', color: textSecondary, fontFamily: ff }}>
          {isAr
            ? 'خطوط الأعمال غير المرخصة تتطلب تصريحاً إضافياً منGIG Jordan teamالأردن. تواصل مع فريق الدعم لتفعيلها.'
            : 'Locked tiles require additional authorization from GIG Jordan. Contact support to activate them.'}
        </p>
      </div>
    </div>
  );
}