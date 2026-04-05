import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, User, FileText, Shield, CheckCircle, AlertCircle, Upload, DollarSign, Calendar } from 'lucide-react';
import { B, cardBg, cardSdw, cardBdr, inputBg, textPrimary, textBody, textMuted } from '../../utils/darkPalette';

interface FormData {
  // Step 1: Worker Details
  workerName: string;
  workerNameAr: string;
  nationality: string;
  passportNo: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  
  // Step 2: Employer Details
  employerName: string;
  employerId: string;
  employerPhone: string;
  employerEmail: string;
  employerAddress: string;
  
  // Step 3: Coverage
  coverageStart: string;
  coverageDuration: string;
  coverageType: string;
  medicalLimit: string;
  
  // Documents
  passportCopy: File | null;
  workPermit: File | null;
  employerIdCopy: File | null;
}

const initialFormData: FormData = {
  workerName: '',
  workerNameAr: '',
  nationality: '',
  passportNo: '',
  dateOfBirth: '',
  gender: '',
  occupation: '',
  employerName: '',
  employerId: '',
  employerPhone: '',
  employerEmail: '',
  employerAddress: '',
  coverageStart: '',
  coverageDuration: '12',
  coverageType: 'standard',
  medicalLimit: '5000',
  passportCopy: null,
  workPermit: null,
  employerIdCopy: null,
};

export function DomesticWorkerIssuance() {
  const { theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const isAr = language === 'ar';
  const isDark = theme === 'dark';
  
  const bg = cardBg(isDark);
  const sdw = cardSdw(isDark);
  const bdr = cardBdr(isDark);
  const iBg = inputBg(isDark);
  const tPrimary = textPrimary(isDark);
  const tBody = textBody(isDark);
  const tMute = textMuted(isDark);
  
  const ff = "'Almarai', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";
  const ffM = "'IBM Plex Mono', monospace";

  const steps = [
    { num: 1, label: isAr ? 'بيانات العامل' : 'Worker Details', icon: User },
    { num: 2, label: isAr ? 'بيانات صاحب العمل' : 'Employer Details', icon: FileText },
    { num: 3, label: isAr ? 'التغطية' : 'Coverage', icon: Shield },
    { num: 4, label: isAr ? 'المراجعة' : 'Review', icon: CheckCircle },
  ];

  const nationalities = [
    { value: 'PH', labelEn: 'Philippines', labelAr: 'الفلبين' },
    { value: 'ID', labelEn: 'Indonesia', labelAr: 'إندونيسيا' },
    { value: 'LK', labelEn: 'Sri Lanka', labelAr: 'سريلانكا' },
    { value: 'BD', labelEn: 'Bangladesh', labelAr: 'بنغلاديش' },
    { value: 'NP', labelEn: 'Nepal', labelAr: 'نيبال' },
    { value: 'ET', labelEn: 'Ethiopia', labelAr: 'إثيوبيا' },
  ];

  const occupations = [
    { value: 'housemaid', labelEn: 'Housemaid', labelAr: 'خادمة منزلية' },
    { value: 'cook', labelEn: 'Cook', labelAr: 'طباخ/ة' },
    { value: 'nanny', labelEn: 'Nanny', labelAr: 'مربية أطفال' },
    { value: 'driver', labelEn: 'Driver', labelAr: 'سائق' },
    { value: 'gardener', labelEn: 'Gardener', labelAr: 'بستاني' },
  ];

  const calculatePremium = () => {
    let basePremium = 180; // Base annual premium for domestic worker
    
    const duration = parseInt(formData.coverageDuration) || 12;
    basePremium = (basePremium / 12) * duration;
    
    if (formData.coverageType === 'premium') {
      basePremium *= 1.35;
    }
    
    const medicalLimit = parseInt(formData.medicalLimit) || 5000;
    if (medicalLimit > 5000) {
      basePremium += (medicalLimit - 5000) * 0.02;
    }
    
    return basePremium.toFixed(2);
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepNum === 1) {
      if (!formData.workerName || formData.workerName.length < 3) {
        newErrors.workerName = isAr ? 'اسم العامل مطلوب (3 أحرف على الأقل)' : 'Worker name required (min 3 chars)';
      }
      if (!formData.nationality) newErrors.nationality = isAr ? 'الجنسية مطلوبة' : 'Nationality required';
      if (!formData.passportNo || formData.passportNo.length < 6) {
        newErrors.passportNo = isAr ? 'رقم الجواز غير صحيح' : 'Invalid passport number';
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = isAr ? 'تاريخ الميلاد مطلوب' : 'Date of birth required';
      if (!formData.gender) newErrors.gender = isAr ? 'الجنس مطلوب' : 'Gender required';
      if (!formData.occupation) newErrors.occupation = isAr ? 'المهنة مطلوبة' : 'Occupation required';
    }
    
    if (stepNum === 2) {
      if (!formData.employerName || formData.employerName.length < 3) {
        newErrors.employerName = isAr ? 'اسم صاحب العمل مطلوب' : 'Employer name required';
      }
      if (!formData.employerId || !/^\d{10}$/.test(formData.employerId)) {
        newErrors.employerId = isAr ? 'رقم الهوية يجب أن يكون 10 أرقام' : 'Employer ID must be 10 digits';
      }
      if (!formData.employerPhone || !/^07\d{8}$/.test(formData.employerPhone)) {
        newErrors.employerPhone = isAr ? 'رقم الهاتف غير صحيح (07xxxxxxxx)' : 'Invalid phone (07xxxxxxxx)';
      }
      if (!formData.employerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.employerEmail)) {
        newErrors.employerEmail = isAr ? 'البريد الإلكتروني غير صحيح' : 'Invalid email';
      }
      if (!formData.employerAddress) newErrors.employerAddress = isAr ? 'العنوان مطلوب' : 'Address required';
    }
    
    if (stepNum === 3) {
      if (!formData.coverageStart) newErrors.coverageStart = isAr ? 'تاريخ البدء مطلوب' : 'Start date required';
      const startDate = new Date(formData.coverageStart);
      const today = new Date();
      if (startDate < today) {
        newErrors.coverageStart = isAr ? 'تاريخ البدء لا يمكن أن يكون في الماضي' : 'Start date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    alert(isAr ? 'تم إرسال الطلب بنجاح!' : 'Application submitted successfully!');
    navigate('/broker/policies');
  };

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    background: iBg,
    border: `1.5px solid ${bdr}`,
    borderRadius: '10px',
    color: tPrimary,
    fontSize: '13px',
    fontFamily: ff,
    transition: 'all 0.2s',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '12px',
    fontWeight: 600,
    color: tBody,
    fontFamily: ff,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  };

  const errorStyle = {
    marginTop: '6px',
    fontSize: '11px',
    color: B.roseGold,
    fontFamily: ff,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  return (
    <div className="p-7 min-h-full gig-texture-bg bg-background" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/broker/issuance')}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: isDark ? 'rgba(167,139,240,0.10)' : 'rgba(167,139,240,0.08)',
              border: `1px solid ${bdr}`,
              color: B.purple,
            }}
          >
            <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 700, color: tPrimary, fontFamily: ffH }}>
              {isAr ? 'تأمين العمالة المنزلية' : 'Domestic Worker Insurance'}
            </h1>
            <p style={{ fontSize: '13px', color: tMute, marginTop: '4px', fontFamily: ff }}>
              {isAr ? 'تأمين شامل للعمالة المنزلية' : 'Comprehensive insurance for domestic workers'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between max-w-3xl mx-auto min-w-[480px]">
          {steps.map((s, idx) => {
            const isActive = step === s.num;
            const isComplete = step > s.num;
            const StepIcon = s.icon;
            
            return (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all"
                    style={{
                      background: isComplete ? B.seafoam : isActive ? B.purple : iBg,
                      border: `2px solid ${isComplete ? B.seafoam : isActive ? B.purple : bdr}`,
                      color: isComplete || isActive ? '#FFFFFF' : tMute,
                    }}
                  >
                    {isComplete ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? B.purple : tMute,
                      fontFamily: ff,
                      textAlign: 'center',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className="h-0.5 flex-1 mx-2"
                    style={{
                      background: step > s.num ? B.seafoam : bdr,
                      marginBottom: '32px',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl p-8" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          
          {/* Step 1: Worker Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'اسم العامل (English)' : 'Worker Name (English)'} *</label>
                  <input
                    type="text"
                    value={formData.workerName}
                    onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
                    placeholder="John Doe"
                    style={{
                      ...inputStyle,
                      borderColor: errors.workerName ? B.roseGold : bdr,
                    }}
                  />
                  {errors.workerName && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.workerName}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'اسم العامل (عربي)' : 'Worker Name (Arabic)'}</label>
                  <input
                    type="text"
                    value={formData.workerNameAr}
                    onChange={(e) => setFormData({ ...formData, workerNameAr: e.target.value })}
                    placeholder={isAr ? 'الاسم بالعربية' : 'Name in Arabic'}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'الجنسية' : 'Nationality'} *</label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderColor: errors.nationality ? B.roseGold : bdr,
                    }}
                  >
                    <option value="">{isAr ? 'اختر الجنسية' : 'Select nationality'}</option>
                    {nationalities.map(n => (
                      <option key={n.value} value={n.value}>
                        {isAr ? n.labelAr : n.labelEn}
                      </option>
                    ))}
                  </select>
                  {errors.nationality && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.nationality}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'رقم الجواز' : 'Passport Number'} *</label>
                  <input
                    type="text"
                    value={formData.passportNo}
                    onChange={(e) => setFormData({ ...formData, passportNo: e.target.value.toUpperCase() })}
                    placeholder="AB1234567"
                    style={{
                      ...inputStyle,
                      fontFamily: ffM,
                      borderColor: errors.passportNo ? B.roseGold : bdr,
                    }}
                  />
                  {errors.passportNo && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.passportNo}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'تاريخ الميلاد' : 'Date of Birth'} *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderColor: errors.dateOfBirth ? B.roseGold : bdr,
                    }}
                  />
                  {errors.dateOfBirth && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.dateOfBirth}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'الجنس' : 'Gender'} *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderColor: errors.gender ? B.roseGold : bdr,
                    }}
                  >
                    <option value="">{isAr ? 'اختر' : 'Select'}</option>
                    <option value="male">{isAr ? 'ذكر' : 'Male'}</option>
                    <option value="female">{isAr ? 'أنثى' : 'Female'}</option>
                  </select>
                  {errors.gender && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.gender}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'المهنة' : 'Occupation'} *</label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderColor: errors.occupation ? B.roseGold : bdr,
                    }}
                  >
                    <option value="">{isAr ? 'اختر المهنة' : 'Select occupation'}</option>
                    {occupations.map(o => (
                      <option key={o.value} value={o.value}>
                        {isAr ? o.labelAr : o.labelEn}
                      </option>
                    ))}
                  </select>
                  {errors.occupation && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.occupation}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'المستندات المطلوبة' : 'Required Documents'}</label>
                <div className="space-y-3">
                  <div
                    className="p-4 rounded-xl border-2 border-dashed"
                    style={{ borderColor: bdr, background: iBg }}
                  >
                    <div className="flex items-center gap-3">
                      <Upload size={20} style={{ color: tMute }} />
                      <div className="flex-1">
                        <div style={{ fontSize: '13px', fontWeight: 600, color: tBody, fontFamily: ff }}>
                          {isAr ? 'نسخة من الجواز' : 'Passport Copy'}
                        </div>
                        <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>
                          {isAr ? 'PDF أو صورة (حد أقصى 5 ميجابايت)' : 'PDF or Image (max 5MB)'}
                        </div>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFormData({ ...formData, passportCopy: e.target.files?.[0] || null })}
                        style={{ display: 'none' }}
                        id="passportCopy"
                      />
                      <label
                        htmlFor="passportCopy"
                        className="px-4 py-2 rounded-lg cursor-pointer"
                        style={{
                          background: B.purple,
                          color: '#FFFFFF',
                          fontSize: '12px',
                          fontWeight: 600,
                          fontFamily: ff,
                        }}
                      >
                        {isAr ? 'رفع' : 'Upload'}
                      </label>
                    </div>
                    {formData.passportCopy && (
                      <div className="mt-2 flex items-center gap-2" style={{ fontSize: '11px', color: B.seafoam, fontFamily: ff }}>
                        <CheckCircle size={12} />
                        {formData.passportCopy.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Employer Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label style={labelStyle}>{isAr ? 'اسم صاحب العمل' : 'Employer Name'} *</label>
                <input
                  type="text"
                  value={formData.employerName}
                  onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                  placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                  style={{
                    ...inputStyle,
                    borderColor: errors.employerName ? B.roseGold : bdr,
                  }}
                />
                {errors.employerName && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.employerName}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'رقم الهوية الوطنية' : 'National ID'} *</label>
                  <input
                    type="text"
                    value={formData.employerId}
                    onChange={(e) => setFormData({ ...formData, employerId: e.target.value })}
                    placeholder="1234567890"
                    maxLength={10}
                    style={{
                      ...inputStyle,
                      fontFamily: ffM,
                      borderColor: errors.employerId ? B.roseGold : bdr,
                    }}
                  />
                  {errors.employerId && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.employerId}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'رقم الهاتف' : 'Phone Number'} *</label>
                  <input
                    type="tel"
                    value={formData.employerPhone}
                    onChange={(e) => setFormData({ ...formData, employerPhone: e.target.value })}
                    placeholder="0791234567"
                    maxLength={10}
                    style={{
                      ...inputStyle,
                      fontFamily: ffM,
                      borderColor: errors.employerPhone ? B.roseGold : bdr,
                    }}
                  />
                  {errors.employerPhone && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.employerPhone}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'البريد الإلكتروني' : 'Email'} *</label>
                <input
                  type="email"
                  value={formData.employerEmail}
                  onChange={(e) => setFormData({ ...formData, employerEmail: e.target.value })}
                  placeholder="employer@example.com"
                  style={{
                    ...inputStyle,
                    borderColor: errors.employerEmail ? B.roseGold : bdr,
                  }}
                />
                {errors.employerEmail && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.employerEmail}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'عنوان السكن' : 'Residential Address'} *</label>
                <input
                  type="text"
                  value={formData.employerAddress}
                  onChange={(e) => setFormData({ ...formData, employerAddress: e.target.value })}
                  placeholder={isAr ? 'الشارع، الحي، المدينة' : 'Street, District, City'}
                  style={{
                    ...inputStyle,
                    borderColor: errors.employerAddress ? B.roseGold : bdr,
                  }}
                />
                {errors.employerAddress && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.employerAddress}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'مستندات إضافية' : 'Additional Documents'}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl border-2 border-dashed"
                    style={{ borderColor: bdr, background: iBg }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Upload size={18} style={{ color: tMute }} />
                        <div className="flex-1">
                          <div style={{ fontSize: '12px', fontWeight: 600, color: tBody, fontFamily: ff }}>
                            {isAr ? 'تصريح العمل' : 'Work Permit'}
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFormData({ ...formData, workPermit: e.target.files?.[0] || null })}
                        style={{ display: 'none' }}
                        id="workPermit"
                      />
                      <label
                        htmlFor="workPermit"
                        className="px-3 py-2 rounded-lg cursor-pointer text-center"
                        style={{
                          background: B.purple,
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 600,
                          fontFamily: ff,
                        }}
                      >
                        {formData.workPermit ? formData.workPermit.name : (isAr ? 'رفع' : 'Upload')}
                      </label>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl border-2 border-dashed"
                    style={{ borderColor: bdr, background: iBg }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Upload size={18} style={{ color: tMute }} />
                        <div className="flex-1">
                          <div style={{ fontSize: '12px', fontWeight: 600, color: tBody, fontFamily: ff }}>
                            {isAr ? 'هوية صاحب العمل' : 'Employer ID'}
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFormData({ ...formData, employerIdCopy: e.target.files?.[0] || null })}
                        style={{ display: 'none' }}
                        id="employerIdCopy"
                      />
                      <label
                        htmlFor="employerIdCopy"
                        className="px-3 py-2 rounded-lg cursor-pointer text-center"
                        style={{
                          background: B.purple,
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 600,
                          fontFamily: ff,
                        }}
                      >
                        {formData.employerIdCopy ? formData.employerIdCopy.name : (isAr ? 'رفع' : 'Upload')}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Coverage */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'تاريخ البدء' : 'Coverage Start Date'} *</label>
                  <input
                    type="date"
                    value={formData.coverageStart}
                    onChange={(e) => setFormData({ ...formData, coverageStart: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      ...inputStyle,
                      borderColor: errors.coverageStart ? B.roseGold : bdr,
                    }}
                  />
                  {errors.coverageStart && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.coverageStart}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'المدة (أشهر)' : 'Duration (months)'}</label>
                  <select
                    value={formData.coverageDuration}
                    onChange={(e) => setFormData({ ...formData, coverageDuration: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="6">{isAr ? '6 أشهر' : '6 months'}</option>
                    <option value="12">{isAr ? '12 شهر' : '12 months'}</option>
                    <option value="24">{isAr ? '24 شهر' : '24 months'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'نوع التغطية' : 'Coverage Type'}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'standard', labelEn: 'Standard Coverage', labelAr: 'تغطية قياسية', desc: 'Medical up to 5,000 JOD', descAr: 'طبي حتى 5,000 دينار' },
                    { value: 'premium', labelEn: 'Premium Coverage', labelAr: 'تغطية متميزة', desc: 'Medical up to 10,000 JOD', descAr: 'طبي حتى 10,000 دينار' },
                  ].map(ct => (
                    <div
                      key={ct.value}
                      onClick={() => {
                        setFormData({ 
                          ...formData, 
                          coverageType: ct.value,
                          medicalLimit: ct.value === 'premium' ? '10000' : '5000'
                        });
                      }}
                      className="p-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: formData.coverageType === ct.value ? (isDark ? 'rgba(167,139,240,0.12)' : 'rgba(167,139,240,0.08)') : iBg,
                        border: `2px solid ${formData.coverageType === ct.value ? B.purple : bdr}`,
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 700, color: tPrimary, fontFamily: ff, marginBottom: '4px' }}>
                        {isAr ? ct.labelAr : ct.labelEn}
                      </div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>
                        {isAr ? ct.descAr : ct.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-5 rounded-xl"
                style={{
                  background: isDark ? 'rgba(167,139,240,0.08)' : 'rgba(167,139,240,0.06)',
                  border: `1px solid ${B.purple}40`,
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 700, color: tBody, fontFamily: ff, textTransform: 'uppercase', marginBottom: '10px' }}>
                  {isAr ? 'التغطيات المشمولة' : 'Included Coverage'}
                </div>
                <div className="space-y-2">
                  {[
                    { labelEn: 'Medical Treatment & Hospitalization', labelAr: 'العلاج الطبي والإقامة في المستشفى' },
                    { labelEn: 'Emergency Repatriation', labelAr: 'الإعادة الطارئة للوطن' },
                    { labelEn: 'Personal Liability', labelAr: 'المسؤولية الشخصية' },
                    { labelEn: 'Salary Protection', labelAr: 'حماية الراتب' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle size={14} style={{ color: B.seafoam }} />
                      <span style={{ fontSize: '12px', color: tBody, fontFamily: ff }}>
                        {isAr ? item.labelAr : item.labelEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Premium Summary */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: isDark ? 'rgba(107,202,186,0.08)' : 'rgba(107,202,186,0.06)',
                  border: `2px solid ${B.seafoam}`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div style={{ fontSize: '13px', fontWeight: 700, color: tBody, fontFamily: ff, textTransform: 'uppercase' }}>
                    {isAr ? 'القسط السنوي' : 'Total Premium'}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} style={{ color: B.seafoam }} />
                    <span style={{ fontSize: '2rem', fontWeight: 700, color: B.seafoam, fontFamily: ffH }}>
                      {calculatePremium()}
                    </span>
                    <span style={{ fontSize: '14px', color: tMute, fontFamily: ff }}>JOD</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: tMute, fontFamily: ff }}>
                  {isAr ? `للمدة: ${formData.coverageDuration} شهر` : `Duration: ${formData.coverageDuration} months`}
                </div>
              </div>

              {/* Review Data */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: tMute, fontFamily: ff, textTransform: 'uppercase', marginBottom: '12px' }}>
                    {isAr ? 'بيانات العامل' : 'Worker Details'}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'الاسم' : 'Name'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.workerName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'الجنسية' : 'Nationality'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.nationality}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'رقم الجواز' : 'Passport'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ffM }}>{formData.passportNo}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'المهنة' : 'Occupation'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.occupation}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: tMute, fontFamily: ff, textTransform: 'uppercase', marginBottom: '12px' }}>
                    {isAr ? 'صاحب العمل' : 'Employer'}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'الاسم' : 'Name'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.employerName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'الهاتف' : 'Phone'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ffM }}>{formData.employerPhone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: `1px solid ${bdr}` }}>
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all"
              style={{
                background: step === 1 ? 'transparent' : (isDark ? 'rgba(167,139,240,0.10)' : 'rgba(167,139,240,0.08)'),
                border: `1px solid ${bdr}`,
                color: step === 1 ? tMute : tPrimary,
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: ff,
                opacity: step === 1 ? 0.5 : 1,
                cursor: step === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
              {isAr ? 'السابق' : 'Back'}
            </button>

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${B.purple} 0%, #8B6FC7 100%)`,
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: ff,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {isAr ? 'التالي' : 'Next'}
                <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`,
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: ff,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  boxShadow: `0 4px 20px rgba(210,140,100,0.40)`,
                }}
              >
                <CheckCircle size={16} />
                {isAr ? 'إرسال الطلب' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
