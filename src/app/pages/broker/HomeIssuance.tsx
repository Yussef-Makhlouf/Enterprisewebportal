import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Home, MapPin, DollarSign, Upload, CheckCircle, AlertCircle, FileText, Shield, Zap } from 'lucide-react';
import { B, cardBg, cardSdw, cardBdr, inputBg, textPrimary, textBody, textMuted } from '../../utils/darkPalette';

interface FormData {
  // Step 1: Property Details
  propertyType: string;
  propertyUsage: string;
  buildingAge: string;
  buildingArea: string;
  contentValue: string;
  address: string;
  city: string;
  
  // Step 2: Coverage
  coverageType: string;
  fireTheft: boolean;
  naturalDisasters: boolean;
  waterDamage: boolean;
  glassBreakage: boolean;
  
  // Step 3: Owner Details
  ownerName: string;
  nationalId: string;
  phone: string;
  email: string;
  
  // Documents
  titleDeed: File | null;
  propertyValuation: File | null;
}

const initialFormData: FormData = {
  propertyType: '',
  propertyUsage: '',
  buildingAge: '',
  buildingArea: '',
  contentValue: '',
  address: '',
  city: '',
  coverageType: '',
  fireTheft: true,
  naturalDisasters: false,
  waterDamage: true,
  glassBreakage: false,
  ownerName: '',
  nationalId: '',
  phone: '',
  email: '',
  titleDeed: null,
  propertyValuation: null,
};

export function HomeIssuance() {
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
  
  const ff = isAr ? "'Almarai', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif" : "'Reforma', Verdana, sans-serif";
  const ffM = "'IBM Plex Mono', monospace";

  const steps = [
    { num: 1, label: isAr ? 'تفاصيل العقار' : 'Property Details', icon: Home },
    { num: 2, label: isAr ? 'التغطية' : 'Coverage', icon: Shield },
    { num: 3, label: isAr ? 'بيانات المالك' : 'Owner Details', icon: FileText },
    { num: 4, label: isAr ? 'المراجعة' : 'Review', icon: CheckCircle },
  ];

  const propertyTypes = [
    { value: 'villa', labelEn: 'Villa', labelAr: 'فيلا' },
    { value: 'apartment', labelEn: 'Apartment', labelAr: 'شقة' },
    { value: 'townhouse', labelEn: 'Townhouse', labelAr: 'منزل مستقل' },
    { value: 'commercial', labelEn: 'Commercial', labelAr: 'تجاري' },
  ];

  const cities = [
    { value: 'amman', labelEn: 'Amman', labelAr: 'عمان' },
    { value: 'zarqa', labelEn: 'Zarqa', labelAr: 'الزرقاء' },
    { value: 'irbid', labelEn: 'Irbid', labelAr: 'إربد' },
    { value: 'aqaba', labelEn: 'Aqaba', labelAr: 'العقبة' },
  ];

  const calculatePremium = () => {
    let basePremium = 0;
    const area = parseInt(formData.buildingArea) || 0;
    const contentVal = parseFloat(formData.contentValue) || 0;
    
    // Base calculation
    basePremium = (area * 0.5) + (contentVal * 0.02);
    
    // Property type multiplier
    if (formData.propertyType === 'villa') basePremium *= 1.2;
    else if (formData.propertyType === 'commercial') basePremium *= 1.5;
    
    // Coverage add-ons
    if (formData.naturalDisasters) basePremium += 150;
    if (formData.glassBreakage) basePremium += 80;
    
    return basePremium.toFixed(2);
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepNum === 1) {
      if (!formData.propertyType) newErrors.propertyType = isAr ? 'نوع العقار مطلوب' : 'Property type required';
      if (!formData.propertyUsage) newErrors.propertyUsage = isAr ? 'الاستخدام مطلوب' : 'Usage required';
      if (!formData.buildingArea || parseInt(formData.buildingArea) < 50) {
        newErrors.buildingArea = isAr ? 'المساحة يجب أن تكون 50 متر مربع على الأقل' : 'Area must be at least 50 sqm';
      }
      if (!formData.address) newErrors.address = isAr ? 'العنوان مطلوب' : 'Address required';
      if (!formData.city) newErrors.city = isAr ? 'المدينة مطلوبة' : 'City required';
    }
    
    if (stepNum === 2) {
      if (!formData.coverageType) newErrors.coverageType = isAr ? 'نوع التغطية مطلوب' : 'Coverage type required';
    }
    
    if (stepNum === 3) {
      if (!formData.ownerName || formData.ownerName.length < 3) {
        newErrors.ownerName = isAr ? 'اسم المالك مطلوب (3 أحرف على الأقل)' : 'Owner name required (min 3 chars)';
      }
      if (!formData.nationalId || !/^\d{10}$/.test(formData.nationalId)) {
        newErrors.nationalId = isAr ? 'رقم الهوية يجب أن يكون 10 أرقام' : 'National ID must be 10 digits';
      }
      if (!formData.phone || !/^07\d{8}$/.test(formData.phone)) {
        newErrors.phone = isAr ? 'رقم الهاتف غير صحيح (07xxxxxxxx)' : 'Invalid phone (07xxxxxxxx)';
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = isAr ? 'البريد الإلكتروني غير صحيح' : 'Invalid email';
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
              background: isDark ? 'rgba(128,148,230,0.10)' : 'rgba(25,5,140,0.08)',
              border: `1px solid ${bdr}`,
              color: isDark ? B.ocean : B.indigo,
            }}
          >
            <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 700, color: tPrimary, fontFamily: ffH }}>
              {isAr ? 'تأمين المنزل' : 'Home Insurance'}
            </h1>
            <p style={{ fontSize: '13px', color: tMute, marginTop: '4px', fontFamily: ff }}>
              {isAr ? 'حماية شاملة للمنزل والمحتويات' : 'Complete home and contents protection'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
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
                      background: isComplete ? B.seafoam : isActive ? B.ocean : iBg,
                      border: `2px solid ${isComplete ? B.seafoam : isActive ? B.ocean : bdr}`,
                      color: isComplete || isActive ? '#FFFFFF' : tMute,
                    }}
                  >
                    {isComplete ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? (isDark ? B.ocean : B.indigo) : tMute,
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

      {/* Form Content */}
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl p-8" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          
          {/* Step 1: Property Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'نوع العقار' : 'Property Type'} *</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderColor: errors.propertyType ? B.roseGold : bdr,
                    }}
                  >
                    <option value="">{isAr ? 'اختر النوع' : 'Select type'}</option>
                    {propertyTypes.map(pt => (
                      <option key={pt.value} value={pt.value}>
                        {isAr ? pt.labelAr : pt.labelEn}
                      </option>
                    ))}
                  </select>
                  {errors.propertyType && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.propertyType}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'الاستخدام' : 'Usage'} *</label>
                  <select
                    value={formData.propertyUsage}
                    onChange={(e) => setFormData({ ...formData, propertyUsage: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderColor: errors.propertyUsage ? B.roseGold : bdr,
                    }}
                  >
                    <option value="">{isAr ? 'اختر الاستخدام' : 'Select usage'}</option>
                    <option value="residential">{isAr ? 'سكني' : 'Residential'}</option>
                    <option value="commercial">{isAr ? 'تجاري' : 'Commercial'}</option>
                    <option value="mixed">{isAr ? 'مختلط' : 'Mixed'}</option>
                  </select>
                  {errors.propertyUsage && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.propertyUsage}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'عمر البناء (سنوات)' : 'Building Age (years)'}</label>
                  <input
                    type="number"
                    value={formData.buildingAge}
                    onChange={(e) => setFormData({ ...formData, buildingAge: e.target.value })}
                    placeholder="0"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'المساحة (م²)' : 'Area (sqm)'} *</label>
                  <input
                    type="number"
                    value={formData.buildingArea}
                    onChange={(e) => setFormData({ ...formData, buildingArea: e.target.value })}
                    placeholder="150"
                    style={{
                      ...inputStyle,
                      borderColor: errors.buildingArea ? B.roseGold : bdr,
                    }}
                  />
                  {errors.buildingArea && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.buildingArea}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'قيمة المحتويات (دينار)' : 'Content Value (JOD)'}</label>
                  <input
                    type="number"
                    value={formData.contentValue}
                    onChange={(e) => setFormData({ ...formData, contentValue: e.target.value })}
                    placeholder="5000"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'العنوان' : 'Address'} *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={isAr ? 'شارع، حي، رقم البناء' : 'Street, District, Building No'}
                  style={{
                    ...inputStyle,
                    borderColor: errors.address ? B.roseGold : bdr,
                  }}
                />
                {errors.address && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.address}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'المدينة' : 'City'} *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    ...inputStyle,
                    borderColor: errors.city ? B.roseGold : bdr,
                  }}
                >
                  <option value="">{isAr ? 'اختر المدينة' : 'Select city'}</option>
                  {cities.map(c => (
                    <option key={c.value} value={c.value}>
                      {isAr ? c.labelAr : c.labelEn}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.city}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Coverage */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label style={labelStyle}>{isAr ? 'نوع التغطية' : 'Coverage Type'} *</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'basic', labelEn: 'Basic Coverage', labelAr: 'تغطية أساسية', desc: 'Fire & Theft only', descAr: 'الحريق والسرقة فقط' },
                    { value: 'comprehensive', labelEn: 'Comprehensive', labelAr: 'شاملة', desc: 'All risks covered', descAr: 'جميع المخاطر مغطاة' },
                  ].map(ct => (
                    <div
                      key={ct.value}
                      onClick={() => setFormData({ ...formData, coverageType: ct.value })}
                      className="p-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: formData.coverageType === ct.value ? (isDark ? 'rgba(128,148,230,0.12)' : 'rgba(25,5,140,0.06)') : iBg,
                        border: `2px solid ${formData.coverageType === ct.value ? B.ocean : bdr}`,
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
                {errors.coverageType && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.coverageType}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'تغطيات إضافية' : 'Additional Coverage'}</label>
                <div className="space-y-3">
                  {[
                    { key: 'fireTheft', labelEn: 'Fire & Theft Protection', labelAr: 'حماية من الحريق والسرقة', included: true },
                    { key: 'naturalDisasters', labelEn: 'Natural Disasters', labelAr: 'الكوارث الطبيعية', included: false },
                    { key: 'waterDamage', labelEn: 'Water Damage', labelAr: 'أضرار المياه', included: true },
                    { key: 'glassBreakage', labelEn: 'Glass Breakage', labelAr: 'كسر الزجاج', included: false },
                  ].map(cov => (
                    <label
                      key={cov.key}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                      style={{
                        background: iBg,
                        border: `1px solid ${bdr}`,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData[cov.key as keyof FormData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [cov.key]: e.target.checked })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <div className="flex-1">
                        <div style={{ fontSize: '13px', fontWeight: 600, color: tBody, fontFamily: ff }}>
                          {isAr ? cov.labelAr : cov.labelEn}
                        </div>
                      </div>
                      {cov.included && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: '9px',
                            fontWeight: 700,
                            color: B.seafoam,
                            background: 'rgba(107,202,186,0.14)',
                            textTransform: 'uppercase',
                            fontFamily: ff,
                          }}
                        >
                          {isAr ? 'مضمنة' : 'Included'}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Owner Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label style={labelStyle}>{isAr ? 'اسم المالك' : 'Owner Name'} *</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                  style={{
                    ...inputStyle,
                    borderColor: errors.ownerName ? B.roseGold : bdr,
                  }}
                />
                {errors.ownerName && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.ownerName}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'رقم الهوية الوطنية' : 'National ID'} *</label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    placeholder="1234567890"
                    maxLength={10}
                    style={{
                      ...inputStyle,
                      fontFamily: ffM,
                      borderColor: errors.nationalId ? B.roseGold : bdr,
                    }}
                  />
                  {errors.nationalId && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.nationalId}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'رقم الهاتف' : 'Phone Number'} *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0791234567"
                    maxLength={10}
                    style={{
                      ...inputStyle,
                      fontFamily: ffM,
                      borderColor: errors.phone ? B.roseGold : bdr,
                    }}
                  />
                  {errors.phone && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'البريد الإلكتروني' : 'Email'} *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="owner@example.com"
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? B.roseGold : bdr,
                  }}
                />
                {errors.email && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'المستندات المطلوبة' : 'Required Documents'}</label>
                <div className="space-y-3">
                  <div
                    className="p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all"
                    style={{ borderColor: bdr, background: iBg }}
                  >
                    <div className="flex items-center gap-3">
                      <Upload size={20} style={{ color: tMute }} />
                      <div className="flex-1">
                        <div style={{ fontSize: '13px', fontWeight: 600, color: tBody, fontFamily: ff }}>
                          {isAr ? 'سند الملكية' : 'Title Deed'}
                        </div>
                        <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>
                          {isAr ? 'PDF أو صورة (حد أقصى 5 ميجابايت)' : 'PDF or Image (max 5MB)'}
                        </div>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFormData({ ...formData, titleDeed: e.target.files?.[0] || null })}
                        style={{ display: 'none' }}
                        id="titleDeed"
                      />
                      <label
                        htmlFor="titleDeed"
                        className="px-4 py-2 rounded-lg cursor-pointer"
                        style={{
                          background: isDark ? B.ocean : B.indigo,
                          color: '#FFFFFF',
                          fontSize: '12px',
                          fontWeight: 600,
                          fontFamily: ff,
                        }}
                      >
                        {isAr ? 'رفع' : 'Upload'}
                      </label>
                    </div>
                    {formData.titleDeed && (
                      <div className="mt-2 flex items-center gap-2" style={{ fontSize: '11px', color: B.seafoam, fontFamily: ff }}>
                        <CheckCircle size={12} />
                        {formData.titleDeed.name}
                      </div>
                    )}
                  </div>
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
                    {isAr ? 'القسط السنوي' : 'Annual Premium'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={18} style={{ color: B.seafoam }} />
                    <span style={{ fontSize: '2rem', fontWeight: 700, color: B.seafoam, fontFamily: ffH }}>
                      {calculatePremium()}
                    </span>
                    <span style={{ fontSize: '14px', color: tMute, fontFamily: ff }}>JOD</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: tMute, fontFamily: ff }}>
                  {isAr ? 'شامل جميع الرسوم والضرائب' : 'Including all fees and taxes'}
                </div>
              </div>

              {/* Review Data */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: tMute, fontFamily: ff, textTransform: 'uppercase', marginBottom: '12px' }}>
                    {isAr ? 'تفاصيل العقار' : 'Property Details'}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'النوع' : 'Type'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.propertyType}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'المساحة' : 'Area'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.buildingArea} sqm</div>
                    </div>
                    <div className="col-span-2">
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'العنوان' : 'Address'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.address}, {formData.city}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: tMute, fontFamily: ff, textTransform: 'uppercase', marginBottom: '12px' }}>
                    {isAr ? 'المالك' : 'Owner'}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'الاسم' : 'Name'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.ownerName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'الهاتف' : 'Phone'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ffM }}>{formData.phone}</div>
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
                background: step === 1 ? 'transparent' : (isDark ? 'rgba(128,148,230,0.10)' : 'rgba(25,5,140,0.08)'),
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
                  background: `linear-gradient(135deg, ${B.ocean} 0%, ${B.indigo} 100%)`,
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
