import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Upload, Check, ChevronRight, FileText, Clock, Plane, Car, Stethoscope, Home, HardHat, Wrench, type LucideIcon } from 'lucide-react';

interface LOBEntry {
  key: string;
  Icon: LucideIcon;
  label: string;
  labelAr: string;
}

const LOBS: LOBEntry[] = [
  { key: 'travel', Icon: Plane, label: 'Travel', labelAr: 'سفر' },
  { key: 'motor', Icon: Car, label: 'Motor', labelAr: 'مركبات' },
  { key: 'medical', Icon: Stethoscope, label: 'Medical', labelAr: 'طبي' },
  { key: 'home', Icon: Home, label: 'Home', labelAr: 'منزل' },
  { key: 'domestic', Icon: HardHat, label: 'Domestic Worker', labelAr: 'عمالة منزلية' },
  { key: 'assistance', Icon: Wrench, label: 'Home Assistance', labelAr: 'مساعدة منزلية' },
];

export function LicenseRenewalPage() {
  const { theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [step, setStep] = useState(1);
  const [selectedLOBs, setSelectedLOBs] = useState<string[]>(['travel', 'motor']);
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const bg          = theme === 'dark' ? '#0C1221' : '#F8F7FC';
  const cardBg      = theme === 'dark' ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8F0FF' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? 'rgba(180,205,255,0.65)' : '#6B7A9B';
  const borderColor   = theme === 'dark' ? 'rgba(128,148,230,0.16)' : 'rgba(13,31,60,0.12)';

  const steps = [
    { n: 1, label: isAr ? 'رفع المستندات' : 'Upload Documents' },
    { n: 2, label: isAr ? 'إدخال التفاصيل' : 'Enter Details' },
    { n: 3, label: isAr ? 'في انتظار الموافقة' : 'Awaiting Approval' },
  ];

  const toggleLOB = (key: string) => {
    setSelectedLOBs(prev => prev.includes(key) ? prev.filter(l => l !== key) : [...prev, key]);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}
      style={{ background: bg, fontFamily: isAr ? "'Tajawal', sans-serif" : "'IBM Plex Sans', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-bold mb-2" style={{ fontSize: '1.75rem', color: textPrimary }}>
            {isAr ? 'تجديد الرخصة' : 'License Renewal'}
          </h1>
          <p style={{ fontSize: '14px', color: textSecondary }}>
            {isAr ? 'أكمل الخطوات التالية لتجديد رخصتك وإعادة الوصول' : 'Complete the following steps to renew your license and restore access'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all ${
                  s.n < step ? 'bg-[#6BCABA] text-white' :
                  s.n === step ? 'bg-[#19058C] text-white' :
                  'border-2 text-[#4A5878]'
                }`}
                  style={{
                    borderColor: s.n > step ? borderColor : 'transparent',
                    fontSize: '14px'
                  }}>
                  {s.n < step ? <Check size={16} /> : s.n}
                </div>
                <span className="mt-1 text-center" style={{ fontSize: '11px', color: s.n === step ? '#19058C' : textSecondary, width: '100px' }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-20 h-0.5 mb-4 mx-1"
                  style={{ background: s.n < step ? '#00C896' : borderColor }} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="rounded-2xl p-6"
          style={{ background: cardBg, border: `1px solid ${borderColor}` }}>

          {step === 1 && (
            <div className="space-y-6">
              {/* Current License Info */}
              <div className="rounded-xl p-4"
                style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB', border: `1px solid ${borderColor}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={16} style={{ color: '#D28C64' }} />
                  <span className="font-semibold" style={{ fontSize: '13px', color: textPrimary }}>
                    {isAr ? 'معلومات الرخصة الحالية' : 'Current License Info'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: isAr ? 'رقم الرخصة' : 'License No.', value: 'LIC-2024-004821', mono: true },
                    { label: isAr ? 'تاريخ الانتهاء' : 'Expired', value: '31/12/2024', mono: true, warn: true },
                    { label: isAr ? 'خطوط الأعمال' : 'LOBs', value: '2 active', mono: false },
                  ].map(item => (
                    <div key={item.label}>
                      <p style={{ fontSize: '11px', color: textSecondary }}>{item.label}</p>
                      <p className={item.mono ? 'font-mono' : ''} style={{ fontSize: '13px', fontWeight: 600, color: (item as any).warn ? '#D28C64' : textPrimary }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Expiry Date */}
              <div>
                <label className="block mb-1.5 font-medium" style={{ fontSize: '13px', color: textSecondary }}>
                  {isAr ? 'تاريخ انتهاء الرخصة الجديدة' : 'New License Expiry Date'}
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-lg border outline-none"
                  style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB',
                    borderColor,
                    color: textPrimary,
                    fontSize: '14px',
                    fontFamily: "'IBM Plex Mono', monospace"
                  }}
                  defaultValue="2025-12-31"
                />
              </div>

              {/* LOB Checkboxes */}
              <div>
                <label className="block mb-3 font-medium" style={{ fontSize: '13px', color: textPrimary }}>
                  {isAr ? 'خطوط الأعمال المرخصة' : 'Licensed Lines of Business'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {LOBS.map((lob) => (
                    <button
                      key={lob.key}
                      className="flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left"
                      style={{
                        borderColor: selectedLOBs.includes(lob.key) ? '#19058C' : borderColor,
                        background: selectedLOBs.includes(lob.key) ? 'rgba(25,5,140,0.08)' : 'transparent',
                      }}
                      onClick={() => toggleLOB(lob.key)}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${selectedLOBs.includes(lob.key) ? 'bg-[#19058C] border-[#19058C]' : ''}`}
                        style={{ borderColor: selectedLOBs.includes(lob.key) ? '#19058C' : (theme === 'dark' ? '#4A5878' : '#C0CBDE') }}>
                        {selectedLOBs.includes(lob.key) && <Check size={10} className="text-white" />}
                      </div>
                      <lob.Icon size={12} style={{ color: selectedLOBs.includes(lob.key) ? '#19058C' : textPrimary }} />
                      <span style={{ fontSize: '12px', color: textPrimary, fontWeight: selectedLOBs.includes(lob.key) ? 600 : 400 }}>
                        {isAr ? lob.labelAr : lob.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <label className="block mb-2 font-medium" style={{ fontSize: '13px', color: textPrimary }}>
                  {isAr ? 'رفع وثيقة الرخصة' : 'Upload License Document'}
                </label>
                <div
                  className="rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer"
                  style={{
                    borderColor: dragging ? '#D28C64' : (uploaded ? '#6BCABA' : borderColor),
                    background: dragging ? 'rgba(210,140,100,0.05)' : (uploaded ? 'rgba(107,202,186,0.05)' : (theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#FAFBFD')),
                  }}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); setUploaded(true); }}
                  onClick={() => setUploaded(true)}
                >
                  {uploaded ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-[#00C896]/20 flex items-center justify-center mx-auto mb-3">
                        <Check size={24} style={{ color: '#00C896' }} />
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#00C896' }}>
                        {isAr ? 'تم الرفع بنجاح' : 'Uploaded Successfully'}
                      </p>
                      <p style={{ fontSize: '12px', color: textSecondary, marginTop: '4px' }}>
                        license_renewal_2025.pdf
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F0F4FA' }}>
                        <Upload size={22} style={{ color: '#6B7A9B' }} />
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
                        {isAr ? 'اسحب وأفلت أو انقر للرفع' : 'Drag & drop or click to upload'}
                      </p>
                      <p className="mt-1" style={{ fontSize: '12px', color: textSecondary }}>
                        PDF, JPG, PNG · {isAr ? 'الحد الأقصى 10 ميجابايت' : 'Max 10MB'}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="py-8 text-center">
              <p style={{ color: textSecondary }}>
                {isAr ? 'إدخال التفاصيل' : 'Enter Details - Step 2 Content'}
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F0B030]/20 flex items-center justify-center mx-auto mb-4">
                <Clock size={30} style={{ color: '#F0B030' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: textPrimary }}>
                {isAr ? 'في انتظار الموافقة' : 'Awaiting Approval'}
              </h3>
              <p style={{ fontSize: '14px', color: textSecondary }}>
                {isAr ? 'سيتم مراجعة طلبك خلال يوم عمل واحد' : 'Your request will be reviewed within 1 business day'}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor }}>
            {step > 1 ? (
              <button
                className="px-6 py-2.5 rounded-lg border font-medium text-sm transition-all hover:opacity-80"
                style={{ borderColor, color: textSecondary }}
                onClick={() => setStep(s => s - 1)}
              >
                {isAr ? 'رجوع' : 'Back'}
              </button>
            ) : (
              <button
                className="px-6 py-2.5 rounded-lg border font-medium text-sm transition-all hover:opacity-80"
                style={{ borderColor, color: textSecondary }}
                onClick={() => navigate('/')}
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            )}
            <button
              className="px-6 py-2.5 rounded-lg text-white font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-all"
              style={{ background: 'linear-gradient(135deg, #19058C, #8094E6)', boxShadow: '0 2px 12px rgba(25,5,140,0.30)' }}
              onClick={() => step < 3 ? setStep(s => s + 1) : navigate('/')}
            >
              {step === 3 ? (isAr ? 'إغلاق' : 'Close') : (isAr ? 'التالي' : 'Next Step')}
              {step < 3 && <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}