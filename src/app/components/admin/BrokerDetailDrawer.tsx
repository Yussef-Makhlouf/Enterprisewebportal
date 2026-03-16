import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mail, Phone, FileText, Calendar, Percent, Check, Plane, Car, Stethoscope, Home, HardHat, Wrench, LogIn, CheckCircle, Pencil, type LucideIcon } from 'lucide-react';

interface LOBItem {
  key: string;
  Icon: LucideIcon;
  label: string;
  labelAr: string;
  active: boolean;
  color: string;
}

const LOBS: LOBItem[] = [
  { key: 'travel', Icon: Plane, label: 'Travel', labelAr: 'سفر', active: true, color: '#C8102E' },
  { key: 'motor', Icon: Car, label: 'Motor', labelAr: 'مركبات', active: true, color: '#C8962A' },
  { key: 'medical', Icon: Stethoscope, label: 'Medical', labelAr: 'طبي', active: false, color: '#00C896' },
  { key: 'home', Icon: Home, label: 'Home', labelAr: 'منزل', active: false, color: '#0DB4CC' },
  { key: 'domestic', Icon: HardHat, label: 'Domestic', labelAr: 'عمالة', active: false, color: '#7B61FF' },
  { key: 'assistance', Icon: Wrench, label: 'Assistance', labelAr: 'مساعدة', active: true, color: '#F0B030' },
];

const subBrokers = [
  { name: 'Tarek Al-Ahmad', nameAr: 'طارق الأحمد', status: 'Active', avatar: 'TA' },
  { name: 'Hiba Karimi', nameAr: 'هبة كريمي', status: 'Active', avatar: 'HK' },
];

interface Props {
  broker: any;
  onClose: () => void;
}

export function BrokerDetailDrawer({ broker, onClose }: Props) {
  const { theme, language, isRTL } = useApp();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState('details');
  const [lobs, setLobs] = useState(LOBS);

  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(13,31,60,0.1)';
  const rowBg = theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB';

  const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
    Active: { color: '#00C896', bg: 'rgba(0,200,150,0.12)' },
    Pending: { color: '#F0B030', bg: 'rgba(240,176,48,0.12)' },
    Expired: { color: '#FF4060', bg: 'rgba(255,64,96,0.12)' },
  };
  const status = STATUS_COLORS[broker.status] || STATUS_COLORS.Active;

  const tabs = [
    { key: 'details', label: isAr ? 'التفاصيل' : 'Details' },
    { key: 'lobs', label: isAr ? 'خطوط الأعمال' : 'LOBs' },
    { key: 'sub', label: isAr ? 'الوسطاء الفرعيون' : 'Sub-Brokers' },
    { key: 'history', label: isAr ? 'السجل' : 'History' },
  ];

  const details = [
    { label: isAr ? 'النوع' : 'Type', value: broker.type || 'Broker', icon: FileText },
    { label: isAr ? 'البريد الإلكتروني' : 'Email', value: broker.email, icon: Mail },
    { label: isAr ? 'رقم الهاتف' : 'Phone', value: '+962 79 555 8821', icon: Phone },
    { label: isAr ? 'رقم الرخصة' : 'License No.', value: 'LIC-2024-004821', icon: FileText, mono: true },
    { label: isAr ? 'انتهاء الرخصة' : 'License Expiry', value: '31/12/2025', icon: Calendar, mono: true },
    { label: isAr ? 'نسبة العمولة' : 'Commission %', value: '8.0%', icon: Percent, green: true, mono: true },
    { label: isAr ? 'حالة الدعوة' : 'Invitation', value: 'Sent', icon: Mail },
    { label: isAr ? 'تاريخ التسجيل' : 'Registered', value: '14/03/2024', icon: Calendar, mono: true },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div
        className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full z-50 flex flex-col shadow-2xl`}
        style={{ width: '440px', background: cardBg, borderLeft: isRTL ? 'none' : `1px solid ${borderColor}`, borderRight: isRTL ? `1px solid ${borderColor}` : 'none' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>
            {isAr ? 'تفاصيل الوسيط' : 'Broker Details'}
          </h2>
          <button className="hover:bg-white/8 p-1.5 rounded-lg transition-all" onClick={onClose}
            style={{ color: textSecondary }}>
            <X size={18} />
          </button>
        </div>

        {/* Broker Header */}
        <div className="px-5 py-4 border-b" style={{ borderColor }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base"
              style={{ background: 'linear-gradient(135deg, #C8102E, #0D1F3C)' }}>
              {broker.avatar || 'BR'}
            </div>
            <div className="flex-1">
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary }}>
                {isAr ? broker.nameAr : broker.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 rounded-full font-medium"
                  style={{ fontSize: '12px', background: status.bg, color: status.color }}>
                  {isAr ? { Active: 'نشط', Pending: 'معلق', Expired: 'منتهي' }[broker.status] || broker.status : broker.status}
                </span>
                <span style={{ fontSize: '12px', color: textSecondary }}>{broker.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              className="flex-1 py-3 text-sm font-medium transition-all border-b-2"
              style={{
                borderColor: activeTab === tab.key ? '#C8102E' : 'transparent',
                color: activeTab === tab.key ? '#C8102E' : textSecondary,
                fontSize: '13px'
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {activeTab === 'details' && (
            <div className="space-y-2">
              {details.map((d) => (
                <div key={d.label} className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: rowBg }}>
                  <div className="flex items-center gap-2.5">
                    <d.icon size={14} style={{ color: '#C8102E' }} />
                    <span style={{ fontSize: '13px', color: textSecondary }}>{d.label}</span>
                  </div>
                  <span className={d.mono ? 'font-mono' : ''}
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: d.green ? '#00C896' : textPrimary
                    }}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'lobs' && (
            <div className="grid grid-cols-2 gap-3">
              {lobs.map((lob) => (
                <div key={lob.key} className="p-4 rounded-xl border flex items-center justify-between"
                  style={{ borderColor: lob.active ? 'rgba(200,16,46,0.3)' : borderColor, background: lob.active ? 'rgba(200,16,46,0.06)' : 'transparent' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: lob.active ? `${lob.color}18` : (theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F5F7FB'), border: `1px solid ${lob.active ? lob.color + '30' : borderColor}` }}>
                      <lob.Icon size={16} style={{ color: lob.active ? lob.color : textSecondary }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: lob.active ? textPrimary : textSecondary }}>
                      {isAr ? lob.labelAr : lob.label}
                    </span>
                  </div>
                  <button
                    className="w-10 h-5 rounded-full transition-all relative"
                    style={{ background: lob.active ? '#C8102E' : (theme === 'dark' ? '#2A3650' : '#C0CBDE') }}
                    onClick={() => setLobs(prev => prev.map(l => l.key === lob.key ? { ...l, active: !l.active } : l))}
                  >
                    <span className="absolute top-0.5 transition-all rounded-full w-4 h-4 bg-white"
                      style={{ [isRTL ? 'right' : 'left']: lob.active ? '22px' : '2px' }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sub' && (
            <div className="space-y-3">
              {subBrokers.map((sub) => (
                <div key={sub.name} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: rowBg }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: 'linear-gradient(135deg, #0DB4CC, #0D1F3C)', fontSize: '12px' }}>
                    {sub.avatar}
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{isAr ? sub.nameAr : sub.name}</p>
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: 'rgba(0,200,150,0.12)', color: '#00C896' }}>
                      {isAr ? 'نشط' : sub.status}
                    </span>
                  </div>
                  <button className="w-10 h-5 rounded-full" style={{ background: '#00C896' }}>
                    <span className="block w-4 h-4 bg-white rounded-full ml-5 mt-0.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {[
                { action: isAr ? 'تسجيل الدخول' : 'Login', time: '2 hours ago', color: '#0DB4CC', Icon: LogIn },
                { action: isAr ? 'إصدار وثيقة سفر' : 'Travel Policy Issued', time: '5 hours ago', color: '#00C896', Icon: CheckCircle },
                { action: isAr ? 'تحديث معلومات الوسيط' : 'Profile Updated', time: '1 day ago', color: '#C8962A', Icon: Pencil },
                { action: isAr ? 'إرسال دعوة' : 'Invitation Sent', time: '3 days ago', color: '#7B61FF', Icon: Mail },
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

        {/* Footer */}
        <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor }}>
          <button
            className="flex-1 py-2.5 rounded-lg border font-medium text-sm transition-all hover:opacity-80"
            style={{ borderColor, color: textSecondary }}
            onClick={onClose}
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            className="flex-1 py-2.5 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #C8102E, #A00D25)', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
          >
            {isAr ? 'حفظ التغييرات' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
}