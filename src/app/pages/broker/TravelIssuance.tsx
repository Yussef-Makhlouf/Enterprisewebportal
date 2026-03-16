import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Check, ChevronRight, Info, Upload, Plus, Trash2, CheckCircle, Printer, Mail, MessageCircle, FileText } from 'lucide-react';

const STEPS = [
  { n: 1, label: 'Travel Details', labelAr: 'تفاصيل السفر' },
  { n: 2, label: 'Traveler Info', labelAr: 'بيانات المسافر' },
  { n: 3, label: 'Pricing', labelAr: 'التسعير' },
  { n: 4, label: 'Issue', labelAr: 'الإصدار' },
];

const COVERAGES = ['Worldwide Gold', 'Schengen Plus', 'Schengen VISA', 'Elite', 'Platinum', 'Silver', 'Middle East'];
const PERIODS = ['Up to 5 Days', '7 Days', '10 Days', '15 Days', '21 Days', '31 Days', '45 Days', '92 Days', '184 Days', '1 Year', '2 Years'];

export function TravelIssuance() {
  const { theme, language, isRTL, addToast } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [step, setStep] = useState(1);
  const [coverage, setCoverage] = useState('Worldwide Gold');
  const [destination, setDestination] = useState('United States');
  const [period, setPeriod] = useState('14 Days');
  const [policyType, setPolicyType] = useState<'Individual' | 'Family'>('Individual');
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit'>('credit');
  const [promoVisible, setPromoVisible] = useState(false);
  const [travelers, setTravelers] = useState([{ id: 1, relation: 'Self', name: 'Ahmad Mohammad Al-Ahmad', nameAr: 'أحمد محمد الأحمد', passport: 'A123456789', dob: '1985-06-15', mobile: '+962791234567', email: 'ahmad@email.com' }]);

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(13,31,60,0.1)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const inputBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB';

  const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all focus:border-[#C8102E]/50"
        style={{ background: inputBg, borderColor, color: textPrimary }}
      />
    </div>
  );

  const Select = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <div>
      <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
        style={{ background: inputBg, borderColor, color: textPrimary }}
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 mb-6">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                s.n < step ? 'bg-[#00C896] text-white' :
                s.n === step ? 'bg-[#C8102E] text-white' :
                'border-2'
              }`}
                style={{
                  borderColor: s.n > step ? borderColor : 'transparent',
                  color: s.n > step ? textSecondary : 'white',
                  fontSize: '12px',
                  fontFamily: "'IBM Plex Mono', monospace"
                }}>
                {s.n < step ? <Check size={14} /> : s.n}
              </div>
              <span className="mt-1" style={{ fontSize: '11px', color: s.n === step ? '#C8102E' : textSecondary, textAlign: 'center', minWidth: '80px' }}>
                {isAr ? s.labelAr : s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-16 h-0.5 mb-4 mx-0.5" style={{ background: s.n < step ? '#00C896' : borderColor }} />
            )}
          </div>
        ))}
      </div>

      {step < 4 && (
        <div className="flex gap-5">
          {/* Main Form */}
          <div className="flex-1 rounded-xl p-5 space-y-4" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>

            {step === 1 && (
              <>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'تفاصيل السفر' : 'Travel Details'}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Select label={isAr ? 'نوع الوثيقة' : 'Policy Type'} options={['Individual', 'Family']} value={policyType} onChange={v => setPolicyType(v as any)} />
                  <Select label={isAr ? 'تغطية السفر' : 'Travel Coverage'} options={COVERAGES} value={coverage} onChange={setCoverage} />
                  <Input label={isAr ? 'وجهة السفر' : 'Destination'} defaultValue={destination} onChange={e => setDestination(e.target.value)} />
                  <Input label={isAr ? 'تاريخ بداية التأمين' : 'Policy Start Date'} type="date" defaultValue="2025-03-20" />
                  <Select label={isAr ? 'مدة السفر' : 'Travel Period'} options={PERIODS} value={period} onChange={setPeriod} />
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{isAr ? 'الكود الترويجي' : 'Promo Code'} ({isAr ? 'اختياري' : 'optional'})</label>
                      <button style={{ fontSize: '11px', color: '#C8102E' }} onClick={() => setPromoVisible(p => !p)}>
                        {promoVisible ? (isAr ? 'إخفاء' : 'Hide') : (isAr ? 'إضافة' : 'Add')}
                      </button>
                    </div>
                    {promoVisible && (
                      <input className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
                        style={{ background: inputBg, borderColor, color: textPrimary }}
                        placeholder={isAr ? 'أدخل الكود...' : 'Enter promo code...'} />
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg mt-2"
                  style={{ background: 'rgba(13,180,204,0.08)', border: '1px solid rgba(13,180,204,0.2)' }}>
                  <Info size={14} style={{ color: '#0DB4CC', marginTop: '1px', flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', color: textSecondary }}>
                    {isAr ? 'لا يمكن أن يكون تاريخ البداية بعد 6 أشهر من اليوم' : 'Start date cannot be more than 6 months from today'}
                  </p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center justify-between">
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'بيانات المسافر' : 'Traveler Information'}</h3>
                  <div className="flex gap-2">
                    {['Enter Manually', 'Upload Passport (OCR)'].map(opt => (
                      <button key={opt} className="px-3 py-1.5 rounded-lg text-xs border font-medium transition-all"
                        style={{
                          background: opt === 'Enter Manually' ? '#C8102E' : 'transparent',
                          borderColor: opt === 'Enter Manually' ? '#C8102E' : borderColor,
                          color: opt === 'Enter Manually' ? '#fff' : textSecondary
                        }}>
                        {isAr ? (opt === 'Enter Manually' ? 'إدخال يدوي' : 'رفع جواز سفر (OCR)') : opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Traveler Card */}
                <div className="rounded-xl border p-4" style={{ borderColor }}>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                      {isAr ? 'المسافر #1' : 'Traveler #1'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: 'rgba(200,16,46,0.12)', color: '#C8102E' }}>
                      {isAr ? 'المقدّم' : 'Self'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label={isAr ? 'الجنسية' : 'Nationality'} defaultValue="Jordanian" />
                    <Input label={isAr ? 'رقم الهوية / الإقامة' : 'National ID / Residence No.'} defaultValue="9876543210" />
                    <Input label={isAr ? 'رقم جواز السفر' : 'Passport Number'} defaultValue="A123456789" />
                    <Input label={isAr ? 'انتهاء الجواز' : 'Passport Expiry'} type="date" defaultValue="2028-06-15" />
                    <Input label={isAr ? 'الاسم الأول (EN)' : 'First Name (EN)'} defaultValue="Ahmad" />
                    <Input label={isAr ? 'اسم الأب (EN)' : 'Second Name (EN)'} defaultValue="Mohammad" />
                    <Input label={isAr ? 'اسم الجد (EN)' : 'Third Name (EN)'} defaultValue="Hassan" />
                    <Input label={isAr ? 'اسم العائلة (EN)' : 'Last Name (EN)'} defaultValue="Al-Ahmad" />
                    <Input label={isAr ? 'تاريخ الميلاد' : 'Date of Birth'} type="date" defaultValue="1985-06-15" />
                    <Input label={isAr ? 'رقم الهاتف' : 'Mobile Number'} defaultValue="+962791234567" />
                    <div className="col-span-2">
                      <Input label={isAr ? 'البريد الإلكتروني' : 'Email Address'} type="email" defaultValue="ahmad@email.com" />
                    </div>
                  </div>
                </div>

                {policyType === 'Family' && (
                  <button
                    className="w-full py-2.5 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 font-medium text-sm hover:opacity-80 transition-all"
                    style={{ borderColor: '#C8102E', color: '#C8102E', background: 'rgba(200,16,46,0.04)' }}
                  >
                    <Plus size={16} />
                    {isAr ? 'إضافة مسافر' : 'Add Traveler'}
                  </button>
                )}
              </>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'مراجعة وتسعير' : 'Review & Pricing'}</h3>

                {/* Collapsible Review Sections */}
                {[
                  {
                    title: isAr ? 'تفاصيل السفر' : 'Travel Details',
                    items: [
                      { label: isAr ? 'التغطية' : 'Coverage', value: coverage },
                      { label: isAr ? 'الوجهة' : 'Destination', value: destination },
                      { label: isAr ? 'المدة' : 'Period', value: period },
                      { label: isAr ? 'النوع' : 'Type', value: policyType },
                    ]
                  },
                  {
                    title: isAr ? 'بيانات المسافر' : 'Traveler Information',
                    items: [
                      { label: isAr ? 'الاسم' : 'Name', value: 'Ahmad Mohammad Al-Ahmad' },
                      { label: isAr ? 'تاريخ الميلاد' : 'DOB', value: '15/06/1985 (Age: 39)' },
                      { label: isAr ? 'جواز السفر' : 'Passport', value: 'A123456789' },
                    ]
                  }
                ].map(section => (
                  <div key={section.title} className="rounded-xl border overflow-hidden" style={{ borderColor }}>
                    <div className="px-4 py-3 font-medium" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB', fontSize: '13px', color: textPrimary }}>
                      ▸ {section.title}
                    </div>
                    <div className="px-4 py-3 space-y-2">
                      {section.items.map(item => (
                        <div key={item.label} className="flex justify-between">
                          <span style={{ fontSize: '12px', color: textSecondary }}>{item.label}</span>
                          <span style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Pricing Breakdown */}
                <div className="rounded-xl border overflow-hidden" style={{ borderColor }}>
                  <div className="px-4 py-3 font-medium" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB', fontSize: '13px', color: textPrimary }}>
                    ▸ {isAr ? 'تفصيل الأسعار' : 'Pricing Breakdown'}
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    {[
                      { label: isAr ? 'القسط الأساسي' : 'Base Premium', value: 'JOD 185.00', mono: true },
                      { label: isAr ? 'الضريبة (16%)' : 'Taxes (16%)', value: 'JOD 29.60', mono: true },
                      { label: isAr ? 'الإجمالي' : 'Total', value: 'JOD 214.60', mono: true, bold: true, red: true },
                      { label: isAr ? 'عمولة الوكيل (8%)' : 'Agent Commission (8%)', value: 'JOD 14.80', mono: true, green: true },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center">
                        <span style={{ fontSize: '12px', color: textSecondary }}>{item.label}</span>
                        <span className={item.mono ? 'font-mono' : ''}
                          style={{ fontSize: item.bold ? '15px' : '13px', fontWeight: item.bold ? 700 : 500, color: item.red ? '#C8102E' : item.green ? '#00C896' : textPrimary }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block mb-2" style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                    {isAr ? 'طريقة الدفع' : 'Payment Method'}
                  </label>
                  {[
                    { key: 'credit', label: isAr ? 'بطاقة ائتمان' : 'Credit Card', desc: isAr ? 'إرسال رابط الدفع لهاتف العميل' : "Send payment link to customer's mobile" },
                    { key: 'debit', label: isAr ? 'خصم مباشر' : 'Direct Debit', desc: isAr ? 'خصم من حساب العميل في البوابة' : "Charge to customer's portal account" },
                  ].map(opt => (
                    <label key={opt.key} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer mb-2 transition-all"
                      style={{ borderColor: paymentMethod === opt.key ? '#C8102E' : borderColor, background: paymentMethod === opt.key ? 'rgba(200,16,46,0.06)' : 'transparent' }}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center`}
                        style={{ borderColor: paymentMethod === opt.key ? '#C8102E' : textSecondary }}>
                        {paymentMethod === opt.key && <div className="w-2 h-2 rounded-full bg-[#C8102E]" />}
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{opt.label}</p>
                        <p style={{ fontSize: '12px', color: textSecondary }}>{opt.desc}</p>
                      </div>
                      <input type="radio" className="hidden" checked={paymentMethod === opt.key} onChange={() => setPaymentMethod(opt.key as any)} />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="w-64 shrink-0">
            <div className="rounded-xl p-4 sticky top-0" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <h4 className="mb-4" style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                {isAr ? 'ملخص' : 'Summary'}
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="px-2.5 py-1 rounded-full text-white font-medium block w-fit mb-2"
                    style={{ fontSize: '11px', background: '#C8102E' }}>
                    {coverage}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'الوجهة' : 'Destination'}</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: textPrimary }}>{destination}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'المدة' : 'Period'}</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: textPrimary }}>{period}</span>
                </div>
                <div className="pt-3 border-t" style={{ borderColor }}>
                  <p style={{ fontSize: '11px', color: textSecondary, marginBottom: '4px' }}>
                    {isAr ? 'النطاق السعري المتوقع' : 'Estimated price range'}
                  </p>
                  <p className="font-mono font-bold" style={{ fontSize: '1.3rem', color: '#C8102E' }}>
                    JOD {step === 3 ? '214.60' : '185 – 225'}
                  </p>
                  {step === 3 && (
                    <p className="mt-1" style={{ fontSize: '11px', color: '#00C896', fontWeight: 500 }}>
                      + {isAr ? 'عمولتك: JOD 14.80' : 'Your commission: JOD 14.80'}
                    </p>
                  )}
                </div>
              </div>
              {step === 1 && (
                <button
                  className="w-full mt-4 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90"
                  style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
                  onClick={() => setStep(2)}
                >
                  {isAr ? 'التالي: بيانات المسافر' : 'Continue to Traveler Details'}
                  <ChevronRight size={14} className="inline ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-[#00C896]/15 flex items-center justify-center mx-auto mb-6 border-4 border-[#00C896]/30">
              <CheckCircle size={40} style={{ color: '#00C896' }} />
            </div>
            <h2 className="font-bold mb-2" style={{ fontSize: '1.75rem', color: textPrimary }}>
              {isAr ? 'تم إصدار الوثيقة بنجاح!' : 'Policy Issued Successfully!'}
            </h2>
            <p className="font-mono font-bold mb-2" style={{ fontSize: '1.3rem', color: '#C8102E' }}>POL-2025-45182</p>
            <p className="mb-6" style={{ fontSize: '13px', color: textSecondary }}>
              {isAr ? 'تم إرسال الوثيقة إلى: +962 79 xxx xxxx & ahmad@email.com' : 'Policy sent to: +962 79 xxx xxxx & ahmad@email.com'}
            </p>
            <div className="flex justify-center gap-3 mb-6">
              {[
                { icon: FileText, label: isAr ? 'عرض' : 'View Policy' },
                { icon: Printer, label: isAr ? 'طباعة' : 'Print' },
                { icon: Mail, label: isAr ? 'إرسال' : 'Email Copy' },
                { icon: MessageCircle, label: isAr ? 'واتساب' : 'WhatsApp' },
              ].map(btn => (
                <button key={btn.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border hover:opacity-80 transition-all"
                  style={{ borderColor, minWidth: '70px' }}>
                  <btn.icon size={18} style={{ color: '#C8102E' }} />
                  <span style={{ fontSize: '10px', color: textSecondary }}>{btn.label}</span>
                </button>
              ))}
            </div>
            <button
              className="w-full py-3 rounded-xl text-white font-semibold mb-3 hover:opacity-90"
              style={{ background: '#C8102E', boxShadow: '0 4px 15px rgba(200,16,46,0.3)' }}
              onClick={() => setStep(1)}
            >
              {isAr ? 'إصدار وثيقة أخرى' : 'Issue Another Policy'}
            </button>
            <button
              className="w-full py-3 rounded-xl font-medium border hover:opacity-80"
              style={{ borderColor, color: textSecondary }}
              onClick={() => navigate('/broker/policies')}
            >
              {isAr ? 'عرض جميع الوثائق' : 'View All Policies'}
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between mt-5">
          <button
            className="px-6 py-2.5 rounded-xl border font-medium text-sm hover:opacity-80"
            style={{ borderColor, color: textSecondary }}
            onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/broker/issuance')}
          >
            {isAr ? 'رجوع' : 'Back'}
          </button>
          {step < 3 && (
            <button
              className="px-6 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90 flex items-center gap-2"
              style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
              onClick={() => setStep(s => s + 1)}
            >
              {isAr ? 'التالي' : 'Next'}
              <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>
          )}
          {step === 3 && (
            <button
              className="px-6 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90"
              style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
              onClick={() => { setStep(4); addToast({ type: 'success', title: isAr ? 'تم الإصدار!' : 'Policy Issued!', description: 'POL-2025-45182' }); }}
            >
              {isAr ? 'إصدار الوثيقة' : 'Issue Policy'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
