import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ChevronRight, Building2, CheckCircle, Loader2 } from 'lucide-react';

export function CorporateRegistration() {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr = language === 'ar';
  const [step, setStep] = useState(1);
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(13,31,60,0.1)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const inputBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB';

  const handleValidate = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setValidated(true);
      setTimeout(() => setOtpSent(true), 500);
    }, 2000);
  };

  const steps = [
    { n: 1, label: isAr ? 'بيانات الشركة' : 'Company Details' },
    { n: 2, label: isAr ? 'جهة الاتصال' : 'Contact Person' },
    { n: 3, label: isAr ? 'التحقق' : 'Verify' },
  ];

  const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
        style={{ background: inputBg, borderColor, color: textPrimary, ...props.style }}
      />
    </div>
  );

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.25)' }}>
          <Building2 size={22} style={{ color: '#C8102E' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>{isAr ? 'تسجيل عميل مؤسسي' : 'Register Corporate Account'}</h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>{isAr ? 'للوثائق المؤسسية (مركبات/طبي)' : 'For motor/medical corporate policies'}</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-6">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                s.n < step ? 'bg-[#00C896] text-white' : s.n === step ? 'bg-[#C8102E] text-white' : 'border-2'
              }`} style={{ borderColor: s.n > step ? borderColor : 'transparent', color: s.n > step ? textSecondary : 'white', fontSize: '12px' }}>
                {s.n < step ? <Check size={14} /> : s.n}
              </div>
              <span className="mt-1" style={{ fontSize: '11px', color: s.n === step ? '#C8102E' : textSecondary }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-24 h-0.5 mb-4 mx-1" style={{ background: s.n < step ? '#00C896' : borderColor }} />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6" style={{ background: cardBg, border: `1px solid ${borderColor}`, maxWidth: '760px' }}>
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary, marginBottom: '12px' }}>
                {isAr ? 'نوع العميل: مؤسسي' : 'Customer Type: Corporate'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Input label={isAr ? 'الرقم الوطني للشركة (9 أرقام)' : 'Company National ID (9 digits)'}
                  placeholder="000000000" style={{ fontFamily: "'IBM Plex Mono', monospace" }} />
                <Input label={isAr ? 'السجل التجاري' : 'Commercial ID'} placeholder="CR-XXXXX" />
              </div>
              <button
                className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all"
                style={{ background: validated ? '#00C896' : '#C8102E', boxShadow: `0 2px 10px ${validated ? 'rgba(0,200,150,0.3)' : 'rgba(200,16,46,0.3)'}` }}
                onClick={handleValidate}
                disabled={validating}
              >
                {validating ? (
                  <><Loader2 size={15} className="animate-spin" />{isAr ? 'جاري التحقق...' : 'Validating...'}</>
                ) : validated ? (
                  <><CheckCircle size={15} />{isAr ? 'تم التحقق' : 'Verified'}</>
                ) : (
                  <>{isAr ? 'التحقق عبر KINZ API' : 'Validate with KINZ API'}</>
                )}
              </button>
            </div>

            {/* OTP After Validation */}
            {otpSent && (
              <div className="p-4 rounded-xl" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB', border: `1px solid ${borderColor}` }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginBottom: '12px' }}>
                  {isAr ? 'اختر رقم الهاتف لاستلام OTP' : 'Select mobile number to receive OTP'}
                </p>
                <div className="space-y-2 mb-4">
                  {['+962 79 *** ***1', '+962 77 *** ***5'].map((num, i) => (
                    <label key={num} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer"
                      style={{ background: i === 0 ? 'rgba(200,16,46,0.08)' : 'transparent', border: `1px solid ${i === 0 ? '#C8102E' : borderColor}` }}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center`}
                        style={{ borderColor: i === 0 ? '#C8102E' : textSecondary }}>
                        {i === 0 && <div className="w-2 h-2 rounded-full bg-[#C8102E]" />}
                      </div>
                      <span className="font-mono" style={{ fontSize: '14px', color: textPrimary }}>{num}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  {otp.map((d, i) => (
                    <input key={i} type="text" maxLength={1} value={d}
                      onChange={e => { const v = [...otp]; v[i] = e.target.value; setOtp(v); }}
                      className="w-11 h-12 text-center rounded-xl border-2 outline-none font-mono font-bold text-xl"
                      style={{ background: inputBg, borderColor: d ? '#C8102E' : borderColor, color: textPrimary }} />
                  ))}
                </div>
              </div>
            )}

            {validated && (
              <div className="grid grid-cols-2 gap-4">
                <Input label={isAr ? 'اسم الشركة (EN)' : 'Company Name (EN)'} defaultValue="Al-Rashidi Trading Co." />
                <Input label={isAr ? 'اسم الشركة (AR)' : 'Company Name (AR)'} defaultValue="شركة الراشدي للتجارة" style={{ fontFamily: "'Tajawal', sans-serif", direction: 'rtl' }} />
                <Input label={isAr ? 'الجنسية' : 'Nationality'} defaultValue="Jordanian" />
                <Input label={isAr ? 'عدد الموظفين' : 'Commercial Employees'} defaultValue="45" style={{ fontFamily: "'IBM Plex Mono', monospace" }} />
                <Input label={isAr ? 'رأس المال' : 'Capital Amount'} defaultValue="JOD 500,000" />
                <Input label={isAr ? 'الاسم التجاري' : 'Commercial Name'} defaultValue="Al-Rashidi Group" />
                <Input label={isAr ? 'البريد الإلكتروني' : 'Company Email'} defaultValue="info@alrashidi.jo" />
                <Input label={isAr ? 'رقم الهاتف الأرضي' : 'Land Phone'} defaultValue="+962 6 555 1234" />
                <div className="col-span-2">
                  <Input label={isAr ? 'العنوان' : 'Address'} defaultValue="Amman, Shmeisani, Business Complex, Floor 5" />
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? 'جهة الاتصال المسؤولة' : 'Contact Person Details'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label={isAr ? 'الاسم الكامل (EN)' : 'Full Name (EN)'} defaultValue="Ahmad Al-Rashidi" />
              <Input label={isAr ? 'الاسم الكامل (AR)' : 'Full Name (AR)'} defaultValue="أحمد الراشدي" style={{ fontFamily: "'Tajawal', sans-serif", direction: 'rtl' }} />
              <Input label={isAr ? 'رقم الهوية' : 'National ID'} defaultValue="9876543210" style={{ fontFamily: "'IBM Plex Mono', monospace" }} />
              <Input label={isAr ? 'رقم الهاتف' : 'Mobile'} defaultValue="+962 79 555 4321" />
              <Input label={isAr ? 'البريد الإلكتروني' : 'Email'} type="email" defaultValue="ahmad@alrashidi.jo" />
              <Input label={isAr ? 'المسمى الوظيفي' : 'Job Title'} defaultValue={isAr ? 'مدير عام' : 'General Manager'} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#00C896]/15 flex items-center justify-center mx-auto mb-4 border-2 border-[#00C896]/30">
              <CheckCircle size={30} style={{ color: '#00C896' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: textPrimary, marginBottom: '8px' }}>
              {isAr ? 'تم التسجيل بنجاح!' : 'Registration Complete!'}
            </h3>
            <p style={{ fontSize: '14px', color: textSecondary }}>
              {isAr ? 'سيتم مراجعة الطلب خلال يوم عمل واحد' : 'The registration will be reviewed within 1 business day'}
            </p>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor }}>
          <button className="px-6 py-2.5 rounded-xl border text-sm font-medium hover:opacity-80"
            style={{ borderColor, color: textSecondary }}
            onClick={() => step > 1 ? setStep(s => s - 1) : null}>
            {step > 1 ? (isAr ? 'رجوع' : 'Back') : (isAr ? 'إلغاء' : 'Cancel')}
          </button>
          <button
            className="px-6 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2 hover:opacity-90"
            style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
            onClick={() => {
              if (step < 3) setStep(s => s + 1);
              else addToast({ type: 'success', title: isAr ? 'تم التسجيل' : 'Registered Successfully' });
            }}
          >
            {step === 3 ? (isAr ? 'إغلاق' : 'Done') : (isAr ? 'التالي' : 'Next')}
            {step < 3 && <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />}
          </button>
        </div>
      </div>
    </div>
  );
}
