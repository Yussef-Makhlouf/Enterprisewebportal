import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Mail, MessageCircle, CheckCircle, CreditCard, Plane, Car, Stethoscope, Home, HardHat, Wrench, type LucideIcon } from 'lucide-react';

interface Props { policy: any; onClose: () => void; }

const LOB_ICONS: Record<string, LucideIcon> = {
  Travel: Plane, Motor: Car, Medical: Stethoscope, Home: Home, Domestic: HardHat, Assistance: Wrench
};
const LOB_COLORS: Record<string, string> = {
  Travel: '#19058C', Motor: '#8094E6', Medical: '#6BCABA', Home: '#D28C64', Domestic: '#D28C64', Assistance: '#8094E6'
};

export function PolicyDetailDrawer({ policy, onClose }: Props) {
  const { theme, language, isRTL } = useApp();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');

  const cardBg        = theme === 'dark' ? 'linear-gradient(165deg, #0F1825 0%, #131D2E 100%)' : '#FFFFFF';
  const textPrimary   = theme === 'dark' ? '#E8F0FF'                   : '#19058C';
  const textSecondary = theme === 'dark' ? 'rgba(180,205,255,0.65)'    : '#3D3560';
  const borderColor   = theme === 'dark' ? 'rgba(128,148,230,0.16)'    : 'rgba(13,31,60,0.10)';
  const rowBg         = theme === 'dark' ? 'rgba(128,148,230,0.05)'    : '#F8F7FC';

  const tabs = [
    { key: 'overview', label: isAr ? 'نظرة عامة' : 'Overview' },
    { key: 'customer', label: isAr ? 'العميل' : 'Customer' },
    { key: 'coverage', label: isAr ? 'التغطية' : 'Coverage' },
    { key: 'payment', label: isAr ? 'الدفع' : 'Payment' },
    { key: 'history', label: isAr ? 'السجل' : 'History' },
  ];

  const statusStyle = {
    Active:    { color: '#6BCABA', bg: 'rgba(107,202,186,0.13)' },
    Expired:   { color: '#8094E6', bg: 'rgba(128,148,230,0.13)' },
    Cancelled: { color: '#D28C64', bg: 'rgba(210,140,100,0.13)' },
  }[policy.status] || { color: '#6BCABA', bg: 'rgba(107,202,186,0.13)' };

  // Support both old (type: '✈️ Travel') and new (typeKey: 'Travel') format
  const typeKey = policy.typeKey || (policy.type ? policy.type.replace(/[^a-zA-Z]/g, '').trim() : 'Travel');
  const PolicyIcon = LOB_ICONS[typeKey] || Plane;
  const lobColor = LOB_COLORS[typeKey] || '#19058C';

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full z-50 flex flex-col shadow-2xl`}
        style={{ width: '480px', background: cardBg, borderLeft: isRTL ? 'none' : `1px solid ${borderColor}` }}>

        {/* Header */}
        <div className="px-5 py-4 border-b shrink-0" style={{ borderColor }}>
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'تفاصيل الوثيقة' : 'Policy Details'}
            </h2>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8" style={{ color: textSecondary }}><X size={18} /></button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${lobColor}18`, border: `1.5px solid ${lobColor}30` }}>
              <PolicyIcon size={26} style={{ color: lobColor }} />
            </div>
            <div>
              <div className="font-mono font-bold" style={{ fontSize: '1.1rem', color: theme === 'dark' ? '#8094E6' : '#19058C' }}>{policy.no}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 rounded-full font-medium"
                  style={{ fontSize: '12px', background: statusStyle.bg, color: statusStyle.color }}>
                  {isAr ? { Active: 'نشطة', Expired: 'منتهية', Cancelled: 'ملغاة' }[policy.status] || policy.status : policy.status}
                </span>
                <span className="font-mono" style={{ fontSize: '12px', color: textSecondary }}>{policy.issueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b shrink-0" style={{ borderColor }}>
          {tabs.map(tab => (
            <button key={tab.key}
              className="flex-1 py-2.5 text-xs font-medium transition-all border-b-2"
              style={{
                borderColor: activeTab === tab.key ? '#D28C64' : 'transparent',
                color: activeTab === tab.key ? '#D28C64' : textSecondary,
              }}
              onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {activeTab === 'overview' && (
            <div className="space-y-2">
              {[
                { label: isAr ? 'نوع الوثيقة' : 'Policy Type', value: typeKey },
                { label: isAr ? 'التغطية' : 'Coverage', value: 'Worldwide Gold' },
                { label: isAr ? 'الوجهة' : 'Destination', value: 'United States' },
                { label: isAr ? 'المدة' : 'Period', value: '14 Days' },
                { label: isAr ? 'مبلغ التأمين' : 'Sum Insured', value: 'JOD 50,000', mono: true },
              ].map(row => (
                <div key={row.label} className="flex justify-between p-3 rounded-lg"
                  style={{ background: rowBg }}>
                  <span style={{ fontSize: '13px', color: textSecondary }}>{row.label}</span>
                  <span className={row.mono ? 'font-mono' : ''} style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{row.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'customer' && (
            <div className="space-y-2">
              {[
                { label: isAr ? 'الاسم (EN)' : 'Name (EN)', value: policy.name },
                { label: isAr ? 'الاسم (AR)' : 'Name (AR)', value: policy.nameAr },
                { label: isAr ? 'رقم الهوية' : 'National ID', value: '9876543210', mono: true },
                { label: isAr ? 'تاريخ الميلاد' : 'Date of Birth', value: '15/06/1985', mono: true },
                { label: isAr ? 'رقم الهاتف' : 'Mobile', value: '+962 79 123 4567' },
                { label: isAr ? 'البريد الإلكتروني' : 'Email', value: 'ahmad@email.com' },
                { label: isAr ? 'رقم جواز السفر' : 'Passport', value: 'A123456789', mono: true },
              ].map(row => (
                <div key={row.label} className="flex justify-between p-3 rounded-lg"
                  style={{ background: rowBg }}>
                  <span style={{ fontSize: '13px', color: textSecondary }}>{row.label}</span>
                  <span className={row.mono ? 'font-mono' : ''} style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{row.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'coverage' && (
            <div className="space-y-2">
              {[
                { label: isAr ? 'نوع التغطية' : 'Coverage Type', value: 'Worldwide Gold' },
                { label: isAr ? 'الطوارئ الطبية' : 'Medical Emergency', value: isAr ? 'مشمول' : 'Included' },
                { label: isAr ? 'تأخر الرحلة' : 'Flight Delay', value: isAr ? 'مشمول' : 'Included' },
                { label: isAr ? 'فقدان الأمتعة' : 'Baggage Loss', value: 'USD 1,000', mono: true },
                { label: isAr ? 'إخلاء طارئ' : 'Emergency Evacuation', value: isAr ? 'مشمول' : 'Included' },
              ].map(row => (
                <div key={row.label} className="flex justify-between p-3 rounded-lg"
                  style={{ background: rowBg }}>
                  <span style={{ fontSize: '13px', color: textSecondary }}>{row.label}</span>
                  <span className={row.mono ? 'font-mono' : ''} style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{row.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'payment' && (
            <div className="space-y-3">
              <div className="rounded-xl border overflow-hidden" style={{ borderColor }}>
                {[
                  { label: isAr ? 'القسط الأساسي' : 'Base Premium', value: 'JOD 185.00' },
                  { label: isAr ? 'الضريبة (16%)' : 'Tax (16%)', value: 'JOD 29.60' },
                  { label: isAr ? 'الإجمالي' : 'Total', value: `JOD ${policy.premium}`, bold: true },
                ].map(row => (
                  <div key={row.label} className="flex justify-between px-4 py-2.5 border-b last:border-0"
                    style={{ borderColor }}>
                    <span style={{ fontSize: '12px', color: textSecondary }}>{row.label}</span>
                    <span className="font-mono" style={{ fontSize: row.bold ? '15px' : '13px', fontWeight: row.bold ? 700 : 500, color: row.bold ? (theme === 'dark' ? '#D28C64' : '#19058C') : textPrimary }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)' }}>
                <div className="flex justify-between">
                  <span style={{ fontSize: '13px', color: textSecondary }}>{isAr ? 'عمولتك المكتسبة' : 'Your Commission Earned'}</span>
                  <span className="font-mono font-bold" style={{ fontSize: '16px', color: '#6BCABA' }}>JOD 14.80</span>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {[
                { event: isAr ? 'تم إصدار الوثيقة'          : 'Policy Issued',             time: policy.issueDate + ' 14:35', Icon: CheckCircle, color: '#6BCABA' },
                { event: isAr ? 'تم إرسال الوثيقة للعميل'    : 'Policy Sent to Customer',   time: policy.issueDate + ' 14:36', Icon: Mail,        color: '#8094E6' },
                { event: isAr ? 'تم تأكيد الدفع'             : 'Payment Confirmed',          time: policy.issueDate + ' 14:30', Icon: CreditCard,  color: '#D28C64' },
              ].map((h, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0" style={{ borderColor }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: h.color + '20' }}>
                    <h.Icon size={14} style={{ color: h.color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{h.event}</p>
                    <p className="font-mono mt-0.5" style={{ fontSize: '11px', color: textSecondary }}>{h.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t shrink-0 flex gap-2" style={{ borderColor }}>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium hover:opacity-80 transition-all"
            style={{ borderColor, color: textSecondary }}>
            <Printer size={15} />
            {isAr ? 'طباعة' : 'Print'}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium hover:opacity-80 transition-all"
            style={{ borderColor, color: textSecondary }}>
            <Mail size={15} />
            {isAr ? 'إرسال' : 'Email'}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium hover:opacity-80 transition-all"
            style={{ borderColor, color: textSecondary }}>
            <MessageCircle size={15} />
            {isAr ? 'واتساب' : 'WhatsApp'}
          </button>
          <button
            className="py-2.5 px-4 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-all"
            style={{ background: `linear-gradient(135deg, #D28C64 0%, #E8B98A 50%, #D28C64 100%)`, boxShadow: '0 2px 10px rgba(210,140,100,0.30)' }}
            onClick={onClose}>
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </>
  );
}