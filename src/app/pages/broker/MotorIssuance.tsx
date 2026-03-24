import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Check, ChevronRight, Upload, AlertTriangle, Lock, Info, Clock, CheckCircle } from 'lucide-react';

const STEPS = [
  { n: 1, label: 'Vehicle', labelAr: 'المركبة' },
  { n: 2, label: 'Customer', labelAr: 'العميل' },
  { n: 3, label: 'Accidents', labelAr: 'الحوادث' },
  { n: 4, label: 'Coverage', labelAr: 'التغطية' },
  { n: 5, label: 'Quote', labelAr: 'عرض السعر' },
  { n: 6, label: 'Issue', labelAr: 'الإصدار' },
];

const OPTIONAL_COVERAGE = [
  { key: 'own_damage', label: 'Own Damage Cover', labelAr: 'تغطية الضرر الذاتي', price: 45 },
  { key: 'glass', label: 'Glass Coverage', labelAr: 'تغطية الزجاج', price: 12 },
  { key: 'personal', label: 'Personal Accident', labelAr: 'حوادث شخصية', price: 15 },
  { key: 'natural', label: 'Natural Perils', labelAr: 'أخطار طبيعية', price: 8 },
  { key: 'fire_theft', label: 'Fire & Theft', labelAr: 'حريق وسرقة', price: 22 },
];

export function MotorIssuance() {
  const { theme, language, isRTL, addToast } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [step, setStep] = useState(1);
  const [ocrState, setOcrState] = useState<'idle' | 'processing' | 'done'>('done');
  const [isOwner, setIsOwner] = useState<'yes' | 'no'>('yes');
  const [selectedCoverage, setSelectedCoverage] = useState<string[]>(['own_damage', 'glass']);
  const [sliderValue, setSliderValue] = useState(10000);
  const [accidentState, setAccidentState] = useState<'loading' | 'done'>('done');
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const bg          = theme === 'dark' ? '#0C1221' : '#F8F7FC';
  const cardBg      = theme === 'dark' ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(128,148,230,0.16)' : 'rgba(13,31,60,0.10)';
  const textPrimary = theme === 'dark' ? '#E8F0FF' : '#19058C';
  const textSecondary = theme === 'dark' ? 'rgba(180,205,255,0.65)' : '#3D3560';
  const inputBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB';

  const optionalTotal = OPTIONAL_COVERAGE.filter(c => selectedCoverage.includes(c.key)).reduce((s, c) => s + c.price, 0);
  const total = 180 + optionalTotal;

  const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
        style={{ background: inputBg, borderColor, color: textPrimary, fontFamily: props.readOnly ? "'IBM Plex Mono', monospace" : 'inherit' }}
      />
    </div>
  );

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 mb-6 overflow-x-auto">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                s.n < step ? 'bg-[#6BCABA] text-white' : s.n === step ? 'bg-[#19058C] text-white' : 'border-2'
              }`} style={{ borderColor: s.n > step ? borderColor : 'transparent', color: s.n > step ? textSecondary : 'white', fontSize: '12px' }}>
                {s.n < step ? <Check size={13} /> : s.n}
              </div>
              <span className="mt-1" style={{ fontSize: '10px', color: s.n === step ? '#19058C' : textSecondary, textAlign: 'center', minWidth: '60px' }}>
                {isAr ? s.labelAr : s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-10 h-0.5 mb-4 mx-0.5" style={{ background: s.n < step ? '#00C896' : borderColor }} />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-5">
        <div className="flex-1 rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>

          {/* STEP 1: Vehicle */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'معلومات المركبة' : 'Vehicle Information'}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: isAr ? 'الجهة الأمامية للرخصة' : 'Front of Vehicle License' },
                  { label: isAr ? 'الجهة الخلفية للرخصة' : 'Back of Vehicle License' },
                ].map(zone => (
                  <div key={zone.label} className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-[#D28C64]/50 transition-all"
                    style={{ borderColor }}>
                    <Upload size={24} style={{ color: '#6B7A9B', margin: '0 auto 8px' }} />
                    <p style={{ fontSize: '12px', fontWeight: 500, color: textPrimary }}>{zone.label}</p>
                    <p style={{ fontSize: '11px', color: textSecondary, marginTop: '4px' }}>JPG, PNG, PDF</p>
                  </div>
                ))}
              </div>

              {ocrState === 'done' && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg"
                  style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)' }}>
                  <CheckCircle size={14} style={{ color: '#00C896' }} />
                  <span style={{ fontSize: '12px', color: '#00C896', fontWeight: 500 }}>
                    {isAr ? 'تم استخراج البيانات بنجاح' : 'Vehicle data extracted successfully'}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input label={isAr ? 'رقم اللوحة' : 'Plate Number'} readOnly defaultValue="12-JO-4521" />
                <Input label={isAr ? 'رقم الشاصي' : 'Chassis Number'} readOnly defaultValue="1HGCM82633A123456" />
                <Input label={isAr ? 'الصانع' : 'Car Make'} defaultValue="Toyota" />
                <Input label={isAr ? 'الموديل' : 'Car Model'} defaultValue="Camry" />
                <Input label={isAr ? 'سنة الصنع' : 'Production Year'} defaultValue="2020" />
                <Input label={isAr ? 'نوع المركبة' : 'Car Type'} defaultValue="Sedan" />
              </div>

              {/* Market Value Slider */}
              <div className="rounded-xl p-4" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB', border: `1px solid ${borderColor}` }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                  {isAr ? 'القيمة السوقية المقدرة' : 'Estimated Market Value Range'}
                </label>
                <div className="flex justify-between mt-3 mb-2">
                  <span className="font-mono" style={{ fontSize: '12px', color: textSecondary }}>JOD 8,500</span>
                  <span className="font-mono font-bold" style={{ fontSize: '14px', color: '#D28C64' }}>JOD {sliderValue.toLocaleString()}</span>
                  <span className="font-mono" style={{ fontSize: '12px', color: textSecondary }}>JOD 11,200</span>
                </div>
                <input
                  type="range"
                  min={8500}
                  max={11200}
                  value={sliderValue}
                  onChange={e => setSliderValue(Number(e.target.value))}
                  className="w-full accent-[#19058C]"
                />
              </div>

              {/* Ownership */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: textPrimary, marginBottom: '12px', display: 'block' }}>
                  {isAr ? 'هل أنت مالك هذه المركبة؟' : 'Are you the owner of this vehicle?'}
                </label>
                <div className="flex gap-3">
                  {[{ k: 'yes', l: isAr ? 'نعم' : 'Yes' }, { k: 'no', l: isAr ? 'لا' : 'No' }].map(opt => (
                    <label key={opt.k} className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border flex-1 justify-center"
                      style={{ borderColor: isOwner === opt.k ? '#D28C64' : borderColor, background: isOwner === opt.k ? 'rgba(210,140,100,0.08)' : 'transparent' }}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center`}
                        style={{ borderColor: isOwner === opt.k ? '#D28C64' : textSecondary }}>
                        {isOwner === opt.k && <div className="w-2 h-2 rounded-full" style={{ background: '#D28C64' }} />}
                      </div>
                      <input type="radio" className="hidden" checked={isOwner === opt.k} onChange={() => setIsOwner(opt.k as 'yes' | 'no')} />
                      <span style={{ fontSize: '13px', color: textPrimary, fontWeight: 500 }}>{opt.l}</span>
                    </label>
                  ))}
                </div>
                {isOwner === 'no' && (
                  <div className="mt-2 flex items-center gap-2 p-2.5 rounded-lg"
                    style={{ background: 'rgba(240,176,48,0.08)', border: '1px solid rgba(240,176,48,0.2)' }}>
                    <AlertTriangle size={14} style={{ color: '#F0B030' }} />
                    <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'تحذير: الهوية الوطنية لن تُطابق سجلات JOIF' : 'Warning: National ID won\'t match JOIF records'}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Customer */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'بيانات العميل' : 'Customer Details'}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: isAr ? 'الجهة الأمامية لرخصة القيادة' : 'Front of Driving License' },
                  { label: isAr ? 'الجهة الخلفية لرخصة القيادة' : 'Back of Driving License' },
                ].map(zone => (
                  <div key={zone.label} className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer hover:border-[#D28C64]/50"
                    style={{ borderColor }}>
                    <Upload size={20} style={{ color: '#6B7A9B', margin: '0 auto 6px' }} />
                    <p style={{ fontSize: '12px', color: textPrimary, fontWeight: 500 }}>{zone.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label={isAr ? 'الهوية الوطنية / الإقامة' : 'National/Residence ID'} defaultValue="9876543210" />
                <Input label={isAr ? 'الاسم الكامل (عربي)' : 'Full Name (Arabic)'} defaultValue="أحمد محمد الأحمد" />
                <Input label={isAr ? 'الاسم الكامل (إنجليزي)' : 'Full Name (English)'} defaultValue="Ahmad Mohammad Al-Ahmad" />
                <Input label={isAr ? 'تاريخ الميلاد' : 'Date of Birth'} type="date" defaultValue="1985-06-15" />
                <Input label={isAr ? 'رقم رخصة القيادة' : 'Driving License Number'} defaultValue="DL-2020-44521" />
                <Input label={isAr ? 'انتهاء رخصة القيادة' : 'License Expiry'} type="date" defaultValue="2027-06-15" />
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg"
                style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)' }}>
                <CheckCircle size={14} style={{ color: '#00C896' }} />
                <span style={{ fontSize: '12px', color: '#00C896', fontWeight: 500 }}>
                  {isAr ? 'تم التحقق من الهوية مع نظام ESKA' : '✓ ID verified with ESKA system'}
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Accidents */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'تاريخ الحوادث' : 'Accident History'}</h3>

              <div className="space-y-3">
                {[
                  { title: isAr ? 'تاريخ حوادث المركبة' : 'Vehicle Accident History', accidents: [
                    { date: '12/2023', type: 'Collision', damage: 'Front bumper', atFault: true, impact: '+15%' },
                    { date: '03/2022', type: 'Scratch', damage: 'Right door', atFault: false, impact: '+5%' },
                  ]},
                  { title: isAr ? 'تاريخ حوادث العميل' : 'Customer Accident History', accidents: [] },
                ].map(section => (
                  <div key={section.title} className="rounded-xl border overflow-hidden" style={{ borderColor }}>
                    <div className="px-4 py-3" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{section.title}</span>
                    </div>
                    <div className="p-4">
                      {section.accidents.length === 0 ? (
                        <div className="flex items-center gap-2 p-3 rounded-lg"
                          style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)' }}>
                          <CheckCircle size={16} style={{ color: '#00C896' }} />
                          <span style={{ fontSize: '13px', color: '#00C896', fontWeight: 500 }}>{isAr ? 'لا توجد حوادث مسجلة' : 'No accidents found'}</span>
                        </div>
                      ) : (
                        <table className="w-full">
                          <thead>
                            <tr>
                              {[isAr ? 'التاريخ' : 'Date', isAr ? 'النوع' : 'Type', isAr ? 'المناطق' : 'Damage Areas', isAr ? 'المسبب' : 'At-Fault', isAr ? 'التأثير' : 'Impact'].map(h => (
                                <th key={h} style={{ fontSize: '11px', fontWeight: 600, color: textSecondary, textAlign: 'left', paddingBottom: '8px' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.accidents.map((a, i) => (
                              <tr key={i} className="border-t" style={{ borderColor }}>
                                <td className="py-2 font-mono" style={{ fontSize: '12px', color: textPrimary }}>{a.date}</td>
                                <td className="py-2" style={{ fontSize: '12px', color: textPrimary }}>{a.type}</td>
                                <td className="py-2" style={{ fontSize: '12px', color: textSecondary }}>{a.damage}</td>
                                <td className="py-2">
                                  <span style={{ fontSize: '11px', fontWeight: 600, color: a.atFault ? '#D28C64' : '#6BCABA' }}>
                                    {a.atFault ? (isAr ? 'نعم' : 'Yes') : (isAr ? 'لا' : 'No')}
                                  </span>
                                </td>
                                <td className="py-2 font-mono font-bold" style={{ fontSize: '12px', color: '#F0B030' }}>{a.impact}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(240,176,48,0.08)', border: '1px solid rgba(240,176,48,0.25)' }}>
                <AlertTriangle size={18} style={{ color: '#F0B030', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                    {isAr ? 'تعديل القسط المقدر: +15%' : 'Estimated premium adjustment: +15%'}
                  </p>
                  <p style={{ fontSize: '12px', color: textSecondary }}>
                    {isAr ? 'بناءً على تاريخ الحوادث' : 'Based on accident history'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Coverage */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'اختيار التغطية' : 'Coverage Selection'}</h3>

              {/* Mandatory */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lock size={14} style={{ color: '#6B7A9B' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {isAr ? 'التغطية الإلزامية' : 'Mandatory Coverage'}
                  </span>
                </div>
                {['Third Party Liability', 'Road Assistance'].map(cov => (
                  <div key={cov} className="flex items-center justify-between p-3 rounded-xl mb-2 border"
                    style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFB', borderColor, opacity: 0.7 }}>
                    <div className="flex items-center gap-3">
                      <Lock size={14} style={{ color: textSecondary }} />
                      <span style={{ fontSize: '13px', color: textPrimary }}>{isAr ? (cov === 'Third Party Liability' ? 'المسؤولية تجاه الغير' : 'مساعدة على الطريق') : cov}</span>
                    </div>
                    <span className="font-mono" style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'مشمول' : 'Included'}</span>
                  </div>
                ))}
              </div>

              {/* Optional */}
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {isAr ? 'التغطية الاختيارية' : 'Optional Coverage'}
                </span>
                <div className="mt-2 space-y-2">
                  {OPTIONAL_COVERAGE.map(cov => {
                    const checked = selectedCoverage.includes(cov.key);
                    return (
                      <div
                        key={cov.key}
                        className="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all"
                        style={{ borderColor: checked ? '#8094E6' : borderColor, background: checked ? 'rgba(128,148,230,0.08)' : 'transparent' }}
                        onClick={() => setSelectedCoverage(prev => prev.includes(cov.key) ? prev.filter(k => k !== cov.key) : [...prev, cov.key])}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center`}
                            style={{ borderColor: checked ? '#8094E6' : borderColor, background: checked ? '#8094E6' : 'transparent' }}>
                            {checked && <Check size={10} className="text-white" />}
                          </div>
                          <div>
                            <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{isAr ? cov.labelAr : cov.label}</p>
                          </div>
                        </div>
                        <span className="font-mono font-medium" style={{ fontSize: '13px', color: checked ? '#8094E6' : textSecondary }}>
                          +JOD {cov.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Quote */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'عرض السعر' : 'Quote Summary'}</h3>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor }}>
                <div className="p-4 space-y-2">
                  {[
                    { label: isAr ? 'المركبة' : 'Vehicle', value: 'Toyota Camry 2020' },
                    { label: isAr ? 'رقم الشاصي' : 'Chassis', value: '1HGCM82633A123456', mono: true },
                    { label: isAr ? 'القيمة المؤمنة' : 'Sum Insured', value: `JOD ${sliderValue.toLocaleString()}`, mono: true },
                    { label: isAr ? 'مدة الوثيقة' : 'Duration', value: isAr ? 'سنة واحدة' : '1 Year' },
                    { label: isAr ? 'تحميل الحوادث' : 'Accident Loading', value: '+15%', orange: true, mono: true },
                    { label: isAr ? 'المجموع الفرعي' : 'Subtotal', value: `JOD ${total}` },
                    { label: isAr ? 'الضريبة (16%)' : 'Tax (16%)', value: `JOD ${(total * 0.16).toFixed(2)}` },
                    { label: isAr ? 'الإجمالي' : 'Total', value: `JOD ${(total * 1.16).toFixed(2)}`, bold: true, red: true, mono: true },
                    { label: isAr ? 'عمولة الوكيل' : 'Agent Commission', value: `JOD ${(total * 1.16 * 0.08).toFixed(2)}`, green: true, mono: true },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-1 border-b last:border-0" style={{ borderColor }}>
                      <span style={{ fontSize: '12px', color: textSecondary }}>{item.label}</span>
                      <span className={item.mono ? 'font-mono' : ''}
                        style={{
                          fontSize: item.bold ? '15px' : '13px',
                          fontWeight: item.bold ? 700 : 500,
                          color: item.red ? '#D28C64' : item.green ? '#6BCABA' : item.orange ? '#D28C64' : textPrimary
                        }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Receipt */}
              <div>
                <label className="block mb-2" style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>
                  {isAr ? 'رفع إيصال الدفع (اختياري)' : 'Upload Payment Receipt (optional)'}
                </label>
                <div className="border-2 border-dashed rounded-xl p-5 text-center"
                  style={{ borderColor }}>
                  <Upload size={20} style={{ color: '#6B7A9B', margin: '0 auto 6px' }} />
                  <p style={{ fontSize: '12px', color: textSecondary }}>
                    {isAr ? 'اسحب أو انقر · 5MB الحد الأقصى' : 'Drag or click · Max 5MB'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Video Upload */}
          {step === 6 && (
            <div className="space-y-4">
              {/* Instructions */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(13,180,204,0.08)', border: '1px solid rgba(13,180,204,0.25)' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginBottom: '8px' }}>
                  {isAr ? '🎥 يرجى تسجيل مقطع فيديو قصير للمركبة يظهر:' : '🎥 Please record a short video of the vehicle showing:'}
                </p>
                <ul className="space-y-1.5">
                  {[
                    isAr ? 'جميع الجوانب الأربعة' : 'All 4 sides',
                    isAr ? 'الألواح الأمامية والخلفية مرئية' : 'Front/rear plates visible',
                    isAr ? 'الأضرار الموجودة إن وجدت' : 'Existing damage if any',
                    isAr ? 'قراءة عداد المسافات' : 'Odometer reading',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0DB4CC]" />
                      <span style={{ fontSize: '12px', color: textSecondary }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {!videoUploaded ? (
                <div className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer hover:border-[#D28C64]/50 transition-all"
                  style={{ borderColor }}
                  onClick={() => setVideoUploaded(true)}>
                  <div className="text-4xl mb-3">🎬</div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
                    {isAr ? 'انقر للتسجيل أو رفع فيديو' : 'Tap to record or upload existing video'}
                  </p>
                  <p style={{ fontSize: '12px', color: textSecondary, marginTop: '4px' }}>MP4, MOV · Max 5MB</p>
                </div>
              ) : (
                <div className="rounded-xl border p-5" style={{ borderColor, background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 rounded-lg bg-black flex items-center justify-center shrink-0">
                      <span className="text-2xl">🎬</span>
                    </div>
                    <div className="flex-1">
                      <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>vehicle_inspection.mp4</p>
                      <p style={{ fontSize: '12px', color: textSecondary }}>4.2 MB</p>
                    </div>
                    <CheckCircle size={20} style={{ color: '#00C896' }} />
                  </div>
                  <button style={{ fontSize: '12px', color: '#D28C64', marginTop: '8px' }} onClick={() => setVideoUploaded(false)}>
                    {isAr ? 'استبدال' : 'Replace'}
                  </button>
                </div>
              )}

              <div className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(240,176,48,0.08)', border: '1px solid rgba(240,176,48,0.25)' }}>
                <AlertTriangle size={16} style={{ color: '#F0B030', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '12px', color: textSecondary, lineHeight: '1.6' }}>
                  {isAr
                    ? 'بعد التقديم، سيراجع فريق GIG الفيديو خلال 24 ساعة قبل إصدار الوثيقة.'
                    : 'After submission, GIG team will review your video within 24 hours before the policy is issued.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Running Total Sidebar */}
        {(step === 4 || step === 5) && (
          <div className="w-60 shrink-0">
            <div className="rounded-xl p-4 sticky top-0" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <h4 className="mb-4" style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                {isAr ? 'الإجمالي الجاري' : 'Running Total'}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'إلزامي' : 'Mandatory'}</span>
                  <span className="font-mono" style={{ fontSize: '13px', color: textPrimary }}>JOD 180</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'الخيارات المحددة' : 'Selected options'}</span>
                  <span className="font-mono" style={{ fontSize: '13px', color: textPrimary }}>+JOD {optionalTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'تحميل حوادث' : 'Accident loading'}</span>
                  <span className="font-mono" style={{ fontSize: '13px', color: '#F0B030' }}>+15%</span>
                </div>
                <div className="pt-2 mt-2 border-t flex justify-between" style={{ borderColor }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{isAr ? 'الإجمالي' : 'Total'}</span>
                  <span className="font-mono font-bold" style={{ fontSize: '1.25rem', color: '#D28C64' }}>JOD {total}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-5">
        <button
          className="px-6 py-2.5 rounded-xl border font-medium text-sm hover:opacity-80"
          style={{ borderColor, color: textSecondary }}
          onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/broker/issuance')}
        >
          {isAr ? 'رجوع' : 'Back'}
        </button>
        <div className="flex gap-3">
          {step === 5 && (
            <button className="px-6 py-2.5 rounded-xl border font-medium text-sm hover:opacity-80"
              style={{ borderColor, color: textSecondary }}>
              {isAr ? 'حفظ ومتابعة لاحقاً' : 'Save Quote & Continue Later'}
            </button>
          )}
          <button
            className="px-6 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90 flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #D28C64 0%, #E8B98A 50%, #D28C64 100%)', boxShadow: '0 2px 10px rgba(210,140,100,0.30)' }}
            onClick={() => {
              if (step < 6) setStep(s => s + 1);
              else { navigate('/broker/issuance/motor?stage=approval'); addToast({ type: 'info', title: isAr ? 'تم التقديم' : 'Submitted for Review', description: 'CASE-2025-4421' }); navigate('/broker/issuance'); }
            }}
          >
            {step === 6 ? (isAr ? 'تقديم للموافقة' : 'Submit for GIG Approval') : (step === 5 ? (isAr ? 'المتابعة لرفع الفيديو' : 'Proceed to Video Upload') : (isAr ? 'التالي' : 'Next'))}
            <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}