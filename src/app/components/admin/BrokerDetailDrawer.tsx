import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X, Mail, Phone, FileText, Calendar, Percent, Check,
  Plane, Car, Stethoscope, Home, HardHat, Wrench,
  LogIn, CheckCircle, Pencil, Edit2,
  type LucideIcon
} from 'lucide-react';
import { B, drawerBg, cardBdr, modalSdw, innerBg, textHero, textMuted } from '../../utils/darkPalette';

interface LOBItem {
  key: string;
  Icon: LucideIcon;
  label: string;
  labelAr: string;
  active: boolean;
  color: string;
}

const LOBS: LOBItem[] = [
  { key: 'travel',     Icon: Plane,       label: 'Travel',     labelAr: 'سفر',    active: true,  color: '#8094E6' /* mapped to ocean for dark mode visibility */ },
  { key: 'motor',      Icon: Car,         label: 'Motor',      labelAr: 'مركبات', active: true,  color: '#8094E6' },
  { key: 'medical',    Icon: Stethoscope, label: 'Medical',    labelAr: 'طبي',    active: false, color: '#6BCABA' },
  { key: 'home',       Icon: Home,        label: 'Home',       labelAr: 'منزل',   active: false, color: '#D28C64' },
  { key: 'domestic',   Icon: HardHat,     label: 'Domestic',   labelAr: 'عمالة',  active: false, color: '#A78BF0' },
  { key: 'assistance', Icon: Wrench,      label: 'Assistance', labelAr: 'مساعدة', active: true,  color: '#8094E6' },
];

const subBrokers = [
  { name: 'Tarek Al-Ahmad', nameAr: 'طارق الأحمد', status: 'Active', avatar: 'TA' },
  { name: 'Hiba Karimi',    nameAr: 'هبة كريمي',   status: 'Active', avatar: 'HK' },
];

interface Props {
  broker: any;
  onClose: () => void;
  onEdit?: () => void;
}

export function BrokerDetailDrawer({ broker, onClose, onEdit }: Props) {
  const { theme, language, isRTL } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('details');
  const [lobs, setLobs] = useState(LOBS);

  const bg            = drawerBg(isDark);
  const textPrimary   = textHero(isDark);
  const textSecondary = isDark ? 'rgba(180,205,255,0.78)' : '#3D3560';
  const borderColor   = cardBdr(isDark);
  const rowBg         = innerBg(isDark);

  const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
    Active:  { color: '#6BCABA', bg: 'rgba(107,202,186,0.13)' },
    Pending: { color: '#D28C64', bg: 'rgba(210,140,100,0.13)' },
    Expired: { color: '#8094E6', bg: 'rgba(128,148,230,0.13)' },
    Blocked: { color: '#8094E6', bg: 'rgba(128,148,230,0.13)' },
  };
  const status = STATUS_COLORS[broker.status] || STATUS_COLORS.Active;

  const tabs = [
    { key: 'details', label: isAr ? 'التفاصيل'          : 'Details'     },
    { key: 'lobs',    label: isAr ? 'خطوط الأعمال'     : 'LOBs'        },
    { key: 'sub',     label: isAr ? 'الوسطاء الفرعيون' : 'Sub-Brokers' },
    { key: 'history', label: isAr ? 'السجل'             : 'History'     },
  ];

  const details = [
    { label: isAr ? 'النوع'              : 'Type',            value: broker.type || 'Broker', icon: FileText                                    },
    { label: isAr ? 'البريد الإلكتروني' : 'Email',           value: broker.email,             icon: Mail                                        },
    { label: isAr ? 'رقم الهاتف'        : 'Phone',           value: '+962 79 555 8821',       icon: Phone                                       },
    { label: isAr ? 'رقم الرخصة'        : 'License No.',      value: 'LIC-2024-004821',        icon: FileText, mono: true                        },
    { label: isAr ? 'انتهاء الرخصة'    : 'License Expiry',   value: '31/12/2025',             icon: Calendar, mono: true                        },
    { label: isAr ? 'نسبة العمولة'      : 'Commission %',    value: '8.0%',                   icon: Percent,  green: true, mono: true            },
    { label: isAr ? 'حالة الدعوة'       : 'Invitation',       value: 'Sent',                   icon: Mail                                        },
    { label: isAr ? 'تاريخ التسجيل'    : 'Registered',       value: '14/03/2024',             icon: Calendar, mono: true                        },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div
        className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full z-50 flex flex-col shadow-2xl`}
        style={{
          width: '440px',
          background: bg,
          borderInlineStart: `1px solid ${borderColor}`,
          boxShadow: isDark
            ? '0 0 60px rgba(0,0,0,0.5), inset 1px 0 0 rgba(128,148,230,0.12)'
            : '-4px 0 32px rgba(25,5,140,0.08)',
        }}
      >
        {/* ── Header ──────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>
            {isAr ? 'تفاصيل الوسيط' : 'Broker Details'}
          </h2>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{ fontSize: '12px', background: 'rgba(210,140,100,0.12)', color: '#D28C64', border: '1px solid rgba(210,140,100,0.25)' }}
                onClick={onEdit}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(210,140,100,0.22)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(210,140,100,0.12)'; }}
              >
                <Edit2 size={13} />
                {isAr ? 'تعديل' : 'Edit'}
              </button>
            )}
            <button
              className="p-1.5 rounded-lg transition-all"
              style={{ color: textSecondary }}
              onClick={onClose}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(25,5,140,0.06)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Broker Header ────────────────────────── */}
        <div className="px-5 py-4 border-b shrink-0" style={{ borderColor }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
              style={{ background: 'linear-gradient(135deg, #19058C, #8094E6)', boxShadow: isDark ? '0 4px 16px rgba(25,5,140,0.4)' : 'none' }}>
              {broker.avatar || 'BR'}
            </div>
            <div className="flex-1">
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary }}>
                {isAr ? broker.nameAr : broker.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 rounded-full font-medium"
                  style={{ fontSize: '12px', background: status.bg, color: status.color }}>
                  {isAr ? ({ Active: 'نشط', Pending: 'معلق', Expired: 'منتهي', Blocked: 'محظور' } as any)[broker.status] || broker.status : broker.status}
                </span>
                <span style={{ fontSize: '12px', color: textSecondary }}>{broker.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────── */}
        <div className="flex border-b shrink-0" style={{ borderColor }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              className="flex-1 py-3 font-medium transition-all border-b-2"
              style={{
                borderColor: activeTab === tab.key ? '#D28C64' : 'transparent',
                color: activeTab === tab.key ? '#D28C64' : textSecondary,
                fontSize: '13px',
                background: 'transparent',
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Content ──────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-2">
              {details.map((d) => (
                <div key={d.label} className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: rowBg }}>
                  <div className="flex items-center gap-2.5">
                    <d.icon size={14} style={{ color: '#D28C64' }} />
                    <span style={{ fontSize: '13px', color: textSecondary }}>{d.label}</span>
                  </div>
                  <span className={d.mono ? 'font-mono' : ''}
                    style={{ fontSize: '13px', fontWeight: 500, color: d.green ? '#6BCABA' : textPrimary }}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* LOBs Tab */}
          {activeTab === 'lobs' && (
            <div className="grid grid-cols-2 gap-3">
              {lobs.map((lob) => (
                <div key={lob.key} className="p-4 rounded-xl border flex items-center justify-between"
                  style={{
                    borderColor: lob.active ? `${lob.color}40` : borderColor,
                    background: lob.active ? `${lob.color}10` : 'transparent',
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: lob.active ? `${lob.color}18` : (isDark ? 'rgba(255,255,255,0.04)' : '#F5F7FB'),
                        border: `1px solid ${lob.active ? lob.color + '30' : borderColor}`,
                      }}>
                      <lob.Icon size={16} style={{ color: lob.active ? lob.color : textSecondary }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: lob.active ? textPrimary : textSecondary }}>
                      {isAr ? lob.labelAr : lob.label}
                    </span>
                  </div>
                  {/* Toggle — uses the LOB's own accent so it's always visible */}
                  <button
                    className="w-10 h-5 rounded-full transition-all relative shrink-0"
                    style={{
                      background: lob.active ? lob.color : (isDark ? 'rgba(128,148,230,0.20)' : '#C0CBDE'),
                      boxShadow: lob.active ? `0 0 8px ${lob.color}60` : 'none',
                    }}
                    onClick={() => setLobs(prev => prev.map(l => l.key === lob.key ? { ...l, active: !l.active } : l))}
                  >
                    <span className="absolute top-0.5 transition-all rounded-full w-4 h-4 bg-white"
                      style={{ [isRTL ? 'right' : 'left']: lob.active ? '22px' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sub-Brokers Tab */}
          {activeTab === 'sub' && (
            <div className="space-y-3">
              {subBrokers.map((sub) => (
                <div key={sub.name} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: rowBg }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #8094E6, #19058C)', fontSize: '12px' }}>
                    {sub.avatar}
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{isAr ? sub.nameAr : sub.name}</p>
                    <span className="px-2 py-0.5 rounded-full"
                      style={{ fontSize: '10px', background: 'rgba(107,202,186,0.13)', color: '#6BCABA' }}>
                      {isAr ? 'نشط' : sub.status}
                    </span>
                  </div>
                  {/* Toggle */}
                  <button className="w-10 h-5 rounded-full relative shrink-0" style={{ background: '#6BCABA' }}>
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {[
                { action: isAr ? 'تسجيل الدخول'        : 'Login',               time: '2 hours ago', color: '#8094E6', Icon: LogIn       },
                { action: isAr ? 'إصدار وثيقة سفر'      : 'Travel Policy Issued',time: '5 hours ago', color: '#6BCABA', Icon: CheckCircle },
                { action: isAr ? 'تحديث معلومات الوسيط' : 'Profile Updated',     time: '1 day ago',   color: '#D28C64', Icon: Pencil      },
                { action: isAr ? 'إرسال دعوة'           : 'Invitation Sent',     time: '3 days ago',  color: '#D28C64', Icon: Mail        },
              ].map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: h.color + '20' }}>
                    <h.Icon size={14} style={{ color: h.color }} />
                  </div>
                  <div className="flex-1 pb-3 border-b" style={{ borderColor }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{h.action}</p>
                    <p className="font-mono" style={{ fontSize: '11px', color: textSecondary, marginTop: '2px' }}>{h.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ───────────────────────────────── */}
        <div className="px-5 py-4 border-t flex gap-3 shrink-0" style={{ borderColor }}>
          <button
            className="flex-1 py-2.5 rounded-lg border font-medium text-sm transition-all"
            style={{ borderColor, color: textSecondary }}
            onClick={onClose}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
          {onEdit ? (
            <button
              className="flex-1 py-2.5 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #D28C64 0%, #E8B98A 100%)', boxShadow: '0 2px 12px rgba(210,140,100,0.30)' }}
              onClick={onEdit}
            >
              <Edit2 size={14} />
              {isAr ? 'تعديل البيانات' : 'Edit Details'}
            </button>
          ) : (
          <button
              className="flex-1 py-2.5 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90"
              style={{
                background: isDark
                  ? `linear-gradient(135deg, ${B.ocean} 0%, #6B7FD4 100%)`
                  : `linear-gradient(135deg, ${B.indigo} 0%, #2D1A9E 100%)`,
                boxShadow: isDark ? '0 2px 10px rgba(128,148,230,0.30)' : '0 2px 10px rgba(25,5,140,0.30)',
              }}
            >
              {isAr ? 'حفظ التغييرات' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}