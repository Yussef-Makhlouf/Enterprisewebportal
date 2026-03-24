import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Check, ChevronRight, Info, Plus, CheckCircle, Printer, Mail, MessageCircle, FileText } from 'lucide-react';

const B = { indigo: '#19058C', roseGold: '#D28C64', ocean: '#8094E6', seafoam: '#6BCABA' } as const;

const STEPS = [
  { n: 1, label: 'Travel Details',  labelAr: 'تفاصيل السفر'  },
  { n: 2, label: 'Traveler Info',   labelAr: 'بيانات المسافر' },
  { n: 3, label: 'Pricing',         labelAr: 'التسعير'        },
  { n: 4, label: 'Issue',           labelAr: 'الإصدار'        },
];

const COVERAGES = ['Worldwide Gold', 'Schengen Plus', 'Schengen VISA', 'Elite', 'Platinum', 'Silver', 'Middle East'];
const PERIODS   = ['Up to 5 Days', '7 Days', '10 Days', '15 Days', '21 Days', '31 Days', '45 Days', '92 Days', '184 Days', '1 Year'];

export function TravelIssuance() {
  const { theme, language, isRTL, addToast } = useApp();
  const navigate = useNavigate();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const [step,          setStep]          = useState(1);
  const [coverage,      setCoverage]      = useState('Worldwide Gold');
  const [destination,   setDestination]   = useState('United States');
  const [period,        setPeriod]        = useState('14 Days');
  const [policyType,    setPolicyType]    = useState<'Individual'|'Family'>('Individual');
  const [paymentMethod, setPaymentMethod] = useState<'credit'|'debit'>('credit');

  const bg          = isDark ? '#0C1221' : '#F8F7FC';
  const cardBg      = isDark ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const bdr         = isDark ? 'rgba(128,148,230,0.16)' : 'rgba(25,5,140,0.09)';
  const textPrimary = isDark ? '#E8F0FF' : B.indigo;
  const textMuted   = isDark ? 'rgba(255,255,255,0.50)' : 'rgba(61,53,96,0.60)';
  const inputBg     = isDark ? 'rgba(128,148,230,0.07)' : '#F8F7FC';
  const ff          = "'Georama', Verdana, sans-serif";

  const Input = ({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: textMuted }}>{label}</label>
      <input {...p} className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
        style={{ background: inputBg, borderColor: bdr, color: textPrimary, fontFamily: ff }}
        onFocus={e => { e.currentTarget.style.borderColor = B.roseGold; }}
        onBlur={e  => { e.currentTarget.style.borderColor = bdr; }}
      />
    </div>
  );

  const Sel = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <div>
      <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: textMuted }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
        style={{ background: inputBg, borderColor: bdr, color: textPrimary, fontFamily: ff }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="p-6 min-h-full" style={{ background: bg, fontFamily: ff }}>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 mb-6">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all"
                style={{
                  background: s.n < step ? B.seafoam : s.n === step ? B.indigo : 'transparent',
                  color: s.n <= step ? '#FFFFFF' : textMuted,
                  border: s.n > step ? `2px solid ${bdr}` : 'none',
                  fontSize: '12px',
                }}>
                {s.n < step ? <Check size={14} /> : s.n}
              </div>
              <span style={{ fontSize: '11px', color: s.n === step ? B.indigo : textMuted, textAlign: 'center', minWidth: '80px', marginTop: '4px' }}>
                {isAr ? s.labelAr : s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-16 h-0.5 mb-4 mx-0.5" style={{ background: s.n < step ? B.seafoam : bdr }} />
            )}
          </div>
        ))}
      </div>

      {step < 4 && (
        <div className="flex gap-5">
          {/* Main Form */}
          <div className="flex-1 rounded-xl p-5 space-y-4" style={{ background: cardBg, border: `1px solid ${bdr}`, boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.30)' : '0 2px 16px rgba(25,5,140,0.06)' }}>

            {step === 1 && (
              <>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'تفاصيل السفر' : 'Travel Details'}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Sel label={isAr ? 'نوع الوثيقة' : 'Policy Type'} options={['Individual','Family']} value={policyType} onChange={v => setPolicyType(v as any)} />
                  <Sel label={isAr ? 'تغطية السفر' : 'Coverage'}    options={COVERAGES} value={coverage} onChange={setCoverage} />
                  <Input label={isAr ? 'وجهة السفر' : 'Destination'} defaultValue={destination} onChange={e => setDestination((e.target as any).value)} />
                  <Input label={isAr ? 'تاريخ البداية' : 'Policy Start Date'} type="date" defaultValue="2025-03-20" />
                  <Sel label={isAr ? 'مدة السفر' : 'Travel Period'} options={PERIODS} value={period} onChange={setPeriod} />
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(128,148,230,0.10)', border: `1px solid rgba(128,148,230,0.22)` }}>
                  <Info size={14} style={{ color: B.ocean, marginTop: '1px', flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', color: textMuted }}>
                    {isAr ? 'لا يمكن أن يكون تاريخ البداية بعد 6 أشهر من اليوم' : 'Start date cannot be more than 6 months from today'}
                  </p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'بيانات المسافر' : 'Traveler Information'}</h3>
                <div className="rounded-xl border p-4" style={{ borderColor: bdr }}>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{isAr ? 'المسافر #1' : 'Traveler #1'}</span>
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: `${B.roseGold}18`, color: B.roseGold }}>{isAr ? 'المقدّم' : 'Self'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label={isAr ? 'الجنسية' : 'Nationality'} defaultValue="Jordanian" />
                    <Input label={isAr ? 'رقم الهوية' : 'National ID'} defaultValue="9876543210" />
                    <Input label={isAr ? 'رقم الجواز' : 'Passport No.'} defaultValue="A123456789" />
                    <Input label={isAr ? 'انتهاء الجواز' : 'Passport Expiry'} type="date" defaultValue="2028-06-15" />
                    <Input label={isAr ? 'الاسم الأول' : 'First Name'} defaultValue="Ahmad" />
                    <Input label={isAr ? 'اسم العائلة' : 'Last Name'} defaultValue="Al-Ahmad" />
                    <Input label={isAr ? 'تاريخ الميلاد' : 'Date of Birth'} type="date" defaultValue="1985-06-15" />
                    <Input label={isAr ? 'رقم الهاتف' : 'Mobile'} defaultValue="+962791234567" />
                    <div className="col-span-2">
                      <Input label={isAr ? 'البريد الإلكتروني' : 'Email'} type="email" defaultValue="ahmad@email.com" />
                    </div>
                  </div>
                </div>
                {policyType === 'Family' && (
                  <button className="w-full py-2.5 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 font-medium text-sm hover:opacity-80 transition-all"
                    style={{ borderColor: B.roseGold, color: B.roseGold, background: `${B.roseGold}08` }}>
                    <Plus size={16} />
                    {isAr ? 'إضافة مسافر' : 'Add Traveler'}
                  </button>
                )}
              </>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'مراجعة وتسعير' : 'Review & Pricing'}</h3>
                {/* Review rows */}
                {[
                  { title: isAr ? 'تفاصيل السفر' : 'Travel Details', items: [
                    { label: isAr ? 'التغطية' : 'Coverage', value: coverage },
                    { label: isAr ? 'الوجهة' : 'Destination', value: destination },
                    { label: isAr ? 'المدة' : 'Period', value: period },
                  ]},
                  { title: isAr ? 'التسعير' : 'Pricing', items: [
                    { label: isAr ? 'القسط الأساسي' : 'Base Premium', value: 'JOD 185.00' },
                    { label: isAr ? 'الضريبة (16%)' : 'Tax (16%)', value: 'JOD 29.60' },
                    { label: isAr ? 'الإجمالي' : 'Total', value: 'JOD 214.60', accent: true },
                    { label: isAr ? 'عمولتك (8%)' : 'Your Commission (8%)', value: 'JOD 14.80', green: true },
                  ]},
                ].map(section => (
                  <div key={section.title} className="rounded-xl border overflow-hidden" style={{ borderColor: bdr }}>
                    <div className="px-4 py-3" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F5F7FB', fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                      {section.title}
                    </div>
                    <div className="px-4 py-3 space-y-2">
                      {section.items.map(item => (
                        <div key={item.label} className="flex justify-between">
                          <span style={{ fontSize: '12px', color: textMuted }}>{item.label}</span>
                          <span className="font-mono" style={{ fontSize: (item as any).accent ? '15px' : '13px', fontWeight: (item as any).accent ? 700 : 500, color: (item as any).accent ? B.roseGold : (item as any).green ? B.seafoam : textPrimary }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Payment */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                    {isAr ? 'طريقة الدفع' : 'Payment Method'}
                  </label>
                  {[
                    { key: 'credit', label: isAr ? 'بطاقة ائتمان' : 'Credit Card',   desc: isAr ? 'إرسال رابط الدفع للعميل' : "Send payment link to customer" },
                    { key: 'debit',  label: isAr ? 'خصم مباشر'   : 'Direct Debit',   desc: isAr ? 'خصم من حساب العميل'       : "Charge to customer's account"  },
                  ].map(opt => (
                    <label key={opt.key} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer mb-2 transition-all"
                      style={{ borderColor: paymentMethod === opt.key ? B.roseGold : bdr, background: paymentMethod === opt.key ? `${B.roseGold}08` : 'transparent' }}>
                      <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                        style={{ borderColor: paymentMethod === opt.key ? B.roseGold : textMuted }}>
                        {paymentMethod === opt.key && <div className="w-2 h-2 rounded-full" style={{ background: B.roseGold }} />}
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{opt.label}</p>
                        <p style={{ fontSize: '12px', color: textMuted }}>{opt.desc}</p>
                      </div>
                      <input type="radio" className="hidden" checked={paymentMethod === opt.key} onChange={() => setPaymentMethod(opt.key as any)} />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="w-60 shrink-0">
            <div className="rounded-xl p-4 sticky top-5" style={{ background: cardBg, border: `1px solid ${bdr}`, boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.25)' : '0 2px 16px rgba(25,5,140,0.06)' }}>
              <h4 className="mb-4" style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{isAr ? 'ملخص' : 'Summary'}</h4>
              <div className="space-y-3">
                <div className="px-3 py-2 rounded-lg" style={{ background: `${B.indigo}14`, border: `1px solid ${B.indigo}30` }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: B.ocean }}>{coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '12px', color: textMuted }}>{isAr ? 'الوجهة' : 'Destination'}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{destination}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '12px', color: textMuted }}>{isAr ? 'المدة' : 'Period'}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{period}</span>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: bdr }}>
                  <p style={{ fontSize: '11px', color: textMuted, marginBottom: '4px' }}>{isAr ? 'التسعير المتوقع' : 'Estimated Price'}</p>
                  <p className="font-mono font-bold" style={{ fontSize: '1.3rem', color: B.roseGold }}>
                    JOD {step === 3 ? '214.60' : '185 – 225'}
                  </p>
                  {step === 3 && (
                    <p className="mt-1" style={{ fontSize: '11px', color: B.seafoam, fontWeight: 600 }}>
                      + {isAr ? 'عمولتك: JOD 14.80' : 'Commission: JOD 14.80'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4"
              style={{ background: `${B.seafoam}18`, borderColor: `${B.seafoam}40` }}>
              <CheckCircle size={40} style={{ color: B.seafoam }} />
            </div>
            <h2 className="font-bold mb-2" style={{ fontSize: '1.75rem', color: textPrimary }}>
              {isAr ? 'تم إصدار الوثيقة بنجاح!' : 'Policy Issued Successfully!'}
            </h2>
            <p className="font-mono font-bold mb-2" style={{ fontSize: '1.3rem', color: B.roseGold }}>POL-2025-45182</p>
            <p className="mb-6" style={{ fontSize: '13px', color: textMuted }}>
              {isAr ? 'تم إرسال الوثيقة إلى: ahmad@email.com' : 'Policy sent to: ahmad@email.com'}
            </p>
            <div className="flex justify-center gap-3 mb-6">
              {[
                { icon: FileText, label: isAr ? 'عرض' : 'View' },
                { icon: Printer,  label: isAr ? 'طباعة' : 'Print' },
                { icon: Mail,     label: isAr ? 'إرسال' : 'Email' },
                { icon: MessageCircle, label: isAr ? 'واتساب' : 'WhatsApp' },
              ].map(btn => (
                <button key={btn.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border hover:opacity-80 transition-all"
                  style={{ borderColor: bdr, minWidth: '70px' }}>
                  <btn.icon size={18} style={{ color: B.roseGold }} />
                  <span style={{ fontSize: '10px', color: textMuted }}>{btn.label}</span>
                </button>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl text-white font-semibold mb-3 hover:opacity-90 transition-all"
              style={{ background: `linear-gradient(135deg, ${B.indigo}, ${B.ocean})`, boxShadow: '0 4px 15px rgba(25,5,140,0.30)' }}
              onClick={() => setStep(1)}>
              {isAr ? 'إصدار وثيقة أخرى' : 'Issue Another Policy'}
            </button>
            <button className="w-full py-3 rounded-xl font-medium border hover:opacity-80 transition-all"
              style={{ borderColor: bdr, color: textMuted }}
              onClick={() => navigate('/broker/policies')}>
              {isAr ? 'عرض جميع الوثائق' : 'View All Policies'}
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between mt-5">
          <button className="px-6 py-2.5 rounded-xl border font-medium text-sm hover:opacity-80 transition-all"
            style={{ borderColor: bdr, color: textMuted }}
            onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/broker/issuance')}>
            {isAr ? 'رجوع' : 'Back'}
          </button>
          <button
            className="px-6 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90 flex items-center gap-2 transition-all"
            style={{ background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`, boxShadow: `0 2px 12px rgba(210,140,100,0.30)` }}
            onClick={() => step < 3 ? setStep(s => s + 1) : (setStep(4), addToast({ type: 'success', title: isAr ? 'تم الإصدار!' : 'Policy Issued!', description: 'POL-2025-45182' }))}>
            {step === 3 ? (isAr ? 'إصدار الوثيقة' : 'Issue Policy') : (isAr ? 'التالي' : 'Next')}
            <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
          </button>
        </div>
      )}
    </div>
  );
}