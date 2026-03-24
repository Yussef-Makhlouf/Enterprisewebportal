import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Wrench, Home, Shield, CheckCircle, AlertCircle, Upload, DollarSign, Zap, Settings, Droplet, Lock } from 'lucide-react';
import { B, cardBg, cardSdw, cardBdr, inputBg, textPrimary, textBody, textMuted } from '../../utils/darkPalette';

interface FormData {
  // Step 1: Property & Coverage
  propertyType: string;
  propertySize: string;
  address: string;
  city: string;
  coveragePlan: string;
  
  // Step 2: Service Selection
  plumbingService: boolean;
  electricalService: boolean;
  acService: boolean;
  locksmithService: boolean;
  applianceService: boolean;
  emergencyCalls: string;
  
  // Step 3: Owner Details
  ownerName: string;
  nationalId: string;
  phone: string;
  alternatePhone: string;
  email: string;
  preferredCallTime: string;
  
  // Documents
  utilityBill: File | null;
  propertyId: File | null;
}

const initialFormData: FormData = {
  propertyType: '',
  propertySize: '',
  address: '',
  city: '',
  coveragePlan: 'standard',
  plumbingService: true,
  electricalService: true,
  acService: false,
  locksmithService: true,
  applianceService: false,
  emergencyCalls: '4',
  ownerName: '',
  nationalId: '',
  phone: '',
  alternatePhone: '',
  email: '',
  preferredCallTime: 'anytime',
  utilityBill: null,
  propertyId: null,
};

export function HomeAssistanceIssuance() {
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
    { num: 1, label: isAr ? 'العقار والتغطية' : 'Property & Coverage', icon: Home },
    { num: 2, label: isAr ? 'الخدمات' : 'Services', icon: Wrench },
    { num: 3, label: isAr ? 'بيانات المالك' : 'Owner Details', icon: Shield },
    { num: 4, label: isAr ? 'المراجعة' : 'Review', icon: CheckCircle },
  ];

  const propertyTypes = [
    { value: 'apartment', labelEn: 'Apartment', labelAr: 'شقة' },
    { value: 'villa', labelEn: 'Villa', labelAr: 'فيلا' },
    { value: 'townhouse', labelEn: 'Townhouse', labelAr: 'منزل مستقل' },
  ];

  const cities = [
    { value: 'amman', labelEn: 'Amman', labelAr: 'عمان' },
    { value: 'zarqa', labelEn: 'Zarqa', labelAr: 'الزرقاء' },
    { value: 'irbid', labelEn: 'Irbid', labelAr: 'إربد' },
    { value: 'aqaba', labelEn: 'Aqaba', labelAr: 'العقبة' },
  ];

  const coveragePlans = [
    { 
      value: 'standard', 
      labelEn: 'Standard Plan', 
      labelAr: 'خطة قياسية',
      desc: '4 emergency calls/year',
      descAr: '4 طلبات طوارئ/سنوياً',
      price: '120'
    },
    { 
      value: 'premium', 
      labelEn: 'Premium Plan', 
      labelAr: 'خطة متميزة',
      desc: '8 emergency calls/year',
      descAr: '8 طلبات طوارئ/سنوياً',
      price: '195'
    },
    { 
      value: 'unlimited', 
      labelEn: 'Unlimited Plan', 
      labelAr: 'خطة غير محدودة',
      desc: 'Unlimited emergency calls',
      descAr: 'طلبات طوارئ غير محدودة',
      price: '280'
    },
  ];

  const services = [
    { 
      key: 'plumbingService', 
      labelEn: 'Plumbing Services', 
      labelAr: 'خدمات السباكة',
      desc: 'Leaks, pipe repairs, installations',
      descAr: 'التسريبات، إصلاح الأنابيب، التركيبات',
      Icon: Droplet,
      color: B.ocean
    },
    { 
      key: 'electricalService', 
      labelEn: 'Electrical Services', 
      labelAr: 'خدمات الكهرباء',
      desc: 'Wiring, switches, circuit breakers',
      descAr: 'الأسلاك، المفاتيح، القواطع الكهربائية',
      Icon: Zap,
      color: B.roseGold
    },
    { 
      key: 'acService', 
      labelEn: 'AC & Cooling', 
      labelAr: 'التكييف والتبريد',
      desc: 'AC repair, maintenance, cleaning',
      descAr: 'إصلاح المكيفات، الصيانة، التنظيف',
      Icon: Settings,
      color: B.seafoam
    },
    { 
      key: 'locksmithService', 
      labelEn: 'Locksmith Services', 
      labelAr: 'خدمات الأقفال',
      desc: 'Lock repairs, key replacement',
      descAr: 'إصلاح الأقفال، استبدال المفاتيح',
      Icon: Lock,
      color: B.purple
    },
    { 
      key: 'applianceService', 
      labelEn: 'Appliance Repair', 
      labelAr: 'إصلاح الأجهزة',
      desc: 'Washing machines, refrigerators',
      descAr: 'الغسالات، الثلاجات',
      Icon: Wrench,
      color: B.indigo
    },
  ];

  const calculatePremium = () => {
    const plan = coveragePlans.find(p => p.value === formData.coveragePlan);
    if (!plan) return '0.00';
    
    let basePremium = parseFloat(plan.price);
    
    // Property size multiplier
    const size = parseInt(formData.propertySize) || 0;
    if (size > 200) basePremium *= 1.15;
    else if (size > 300) basePremium *= 1.25;
    
    // Count selected services (basic services included, extra cost for others)
    const extraServices = [formData.acService, formData.applianceService].filter(Boolean).length;
    basePremium += extraServices * 35;
    
    return basePremium.toFixed(2);
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepNum === 1) {
      if (!formData.propertyType) newErrors.propertyType = isAr ? 'نوع العقار مطلوب' : 'Property type required';
      if (!formData.propertySize || parseInt(formData.propertySize) < 30) {
        newErrors.propertySize = isAr ? 'المساحة يجب أن تكون 30 متر مربع على الأقل' : 'Size must be at least 30 sqm';
      }
      if (!formData.address) newErrors.address = isAr ? 'العنوان مطلوب' : 'Address required';
      if (!formData.city) newErrors.city = isAr ? 'المدينة مطلوبة' : 'City required';
    }
    
    if (stepNum === 2) {
      const selectedServices = [
        formData.plumbingService,
        formData.electricalService,
        formData.acService,
        formData.locksmithService,
        formData.applianceService
      ].filter(Boolean).length;
      
      if (selectedServices === 0) {
        newErrors.services = isAr ? 'يجب اختيار خدمة واحدة على الأقل' : 'At least one service must be selected';
      }
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
              background: isDark ? 'rgba(107,202,186,0.10)' : 'rgba(107,202,186,0.08)',
              border: `1px solid ${bdr}`,
              color: B.seafoam,
            }}
          >
            <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 700, color: tPrimary, fontFamily: ffH }}>
              {isAr ? 'المساعدة المنزلية' : 'Home Assistance'}
            </h1>
            <p style={{ fontSize: '13px', color: tMute, marginTop: '4px', fontFamily: ff }}>
              {isAr ? 'خدمات المنزل الطارئة والدعم التقني' : 'Emergency home services and technical support'}
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
                      background: isComplete ? B.seafoam : isActive ? B.seafoam : iBg,
                      border: `2px solid ${isComplete ? B.seafoam : isActive ? B.seafoam : bdr}`,
                      color: isComplete || isActive ? '#FFFFFF' : tMute,
                    }}
                  >
                    {isComplete ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? B.seafoam : tMute,
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
          
          {/* Step 1: Property & Coverage */}
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
                  <label style={labelStyle}>{isAr ? 'المساحة (م²)' : 'Property Size (sqm)'} *</label>
                  <input
                    type="number"
                    value={formData.propertySize}
                    onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                    placeholder="120"
                    style={{
                      ...inputStyle,
                      borderColor: errors.propertySize ? B.roseGold : bdr,
                    }}
                  />
                  {errors.propertySize && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.propertySize}
                    </div>
                  )}
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

              <div>
                <label style={labelStyle}>{isAr ? 'خطة التغطية' : 'Coverage Plan'}</label>
                <div className="grid grid-cols-3 gap-4">
                  {coveragePlans.map(plan => (
                    <div
                      key={plan.value}
                      onClick={() => {
                        setFormData({ 
                          ...formData, 
                          coveragePlan: plan.value,
                          emergencyCalls: plan.value === 'standard' ? '4' : plan.value === 'premium' ? '8' : 'unlimited'
                        });
                      }}
                      className="p-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: formData.coveragePlan === plan.value ? (isDark ? 'rgba(107,202,186,0.12)' : 'rgba(107,202,186,0.08)') : iBg,
                        border: `2px solid ${formData.coveragePlan === plan.value ? B.seafoam : bdr}`,
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 700, color: tPrimary, fontFamily: ff, marginBottom: '4px' }}>
                        {isAr ? plan.labelAr : plan.labelEn}
                      </div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff, marginBottom: '8px' }}>
                        {isAr ? plan.descAr : plan.desc}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: B.seafoam, fontFamily: ffM }}>
                        {plan.price} JOD/year
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label style={labelStyle}>{isAr ? 'الخدمات المطلوبة' : 'Required Services'}</label>
                {errors.services && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.services}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {services.map(service => {
                    const ServiceIcon = service.Icon;
                    const isSelected = formData[service.key as keyof FormData] as boolean;
                    
                    return (
                      <label
                        key={service.key}
                        className="p-4 rounded-xl cursor-pointer transition-all"
                        style={{
                          background: isSelected ? (isDark ? `${service.color}15` : `${service.color}08`) : iBg,
                          border: `2px solid ${isSelected ? service.color : bdr}`,
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => setFormData({ ...formData, [service.key]: e.target.checked })}
                            style={{ width: '18px', height: '18px', cursor: 'pointer', marginTop: '2px' }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <ServiceIcon size={18} style={{ color: service.color }} />
                              <div style={{ fontSize: '14px', fontWeight: 700, color: tPrimary, fontFamily: ff }}>
                                {isAr ? service.labelAr : service.labelEn}
                              </div>
                            </div>
                            <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>
                              {isAr ? service.descAr : service.desc}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div
                className="p-5 rounded-xl"
                style={{
                  background: isDark ? 'rgba(107,202,186,0.08)' : 'rgba(107,202,186,0.06)',
                  border: `1px solid ${B.seafoam}40`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={16} style={{ color: B.seafoam }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, color: tBody, fontFamily: ff, textTransform: 'uppercase' }}>
                    {isAr ? 'مضمن في جميع الخطط' : 'Included in All Plans'}
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { labelEn: '24/7 Emergency Hotline', labelAr: 'خط ساخن للطوارئ 24/7' },
                    { labelEn: 'Priority Response Time', labelAr: 'وقت استجابة أولوي' },
                    { labelEn: 'Licensed Technicians', labelAr: 'فنيون مرخصون' },
                    { labelEn: 'Parts & Materials Included', labelAr: 'قطع الغيار والمواد مضمنة' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: B.seafoam }} />
                      <span style={{ fontSize: '12px', color: tBody, fontFamily: ff }}>
                        {isAr ? item.labelAr : item.labelEn}
                      </span>
                    </div>
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

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'رقم هاتف بديل' : 'Alternate Phone'}</label>
                  <input
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                    placeholder="0791234567"
                    maxLength={10}
                    style={{
                      ...inputStyle,
                      fontFamily: ffM,
                    }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'وقت الاتصال المفضل' : 'Preferred Call Time'}</label>
                  <select
                    value={formData.preferredCallTime}
                    onChange={(e) => setFormData({ ...formData, preferredCallTime: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="anytime">{isAr ? 'في أي وقت' : 'Anytime'}</option>
                    <option value="morning">{isAr ? 'صباحاً (8-12)' : 'Morning (8-12)'}</option>
                    <option value="afternoon">{isAr ? 'ظهراً (12-5)' : 'Afternoon (12-5)'}</option>
                    <option value="evening">{isAr ? 'مساءً (5-9)' : 'Evening (5-9)'}</option>
                  </select>
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
                <label style={labelStyle}>{isAr ? 'المستندات (اختيارية)' : 'Documents (Optional)'}</label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-xl border-2 border-dashed cursor-pointer"
                    style={{ borderColor: bdr, background: iBg }}
                  >
                    <div className="flex items-center gap-3">
                      <Upload size={20} style={{ color: tMute }} />
                      <div className="flex-1">
                        <div style={{ fontSize: '13px', fontWeight: 600, color: tBody, fontFamily: ff }}>
                          {isAr ? 'فاتورة الخدمات' : 'Utility Bill'}
                        </div>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFormData({ ...formData, utilityBill: e.target.files?.[0] || null })}
                        style={{ display: 'none' }}
                        id="utilityBill"
                      />
                      <label
                        htmlFor="utilityBill"
                        className="px-3 py-1.5 rounded-lg cursor-pointer"
                        style={{
                          background: B.seafoam,
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 600,
                          fontFamily: ff,
                        }}
                      >
                        {isAr ? 'رفع' : 'Upload'}
                      </label>
                    </div>
                    {formData.utilityBill && (
                      <div className="mt-2 flex items-center gap-2" style={{ fontSize: '11px', color: B.seafoam, fontFamily: ff }}>
                        <CheckCircle size={12} />
                        {formData.utilityBill.name}
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
                    <Wrench size={18} style={{ color: B.seafoam }} />
                    <span style={{ fontSize: '2rem', fontWeight: 700, color: B.seafoam, fontFamily: ffH }}>
                      {calculatePremium()}
                    </span>
                    <span style={{ fontSize: '14px', color: tMute, fontFamily: ff }}>JOD</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: tMute, fontFamily: ff }}>
                  {formData.emergencyCalls === 'unlimited' 
                    ? (isAr ? 'طلبات طوارئ غير محدودة' : 'Unlimited emergency calls')
                    : (isAr ? `${formData.emergencyCalls} طلبات طوارئ سنوياً` : `${formData.emergencyCalls} emergency calls per year`)}
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
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'المساحة' : 'Size'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.propertySize} sqm</div>
                    </div>
                    <div className="col-span-2">
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'العنوان' : 'Address'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.address}, {formData.city}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: tMute, fontFamily: ff, textTransform: 'uppercase', marginBottom: '12px' }}>
                    {isAr ? 'الخدمات المختارة' : 'Selected Services'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {services.filter(s => formData[s.key as keyof FormData]).map(service => (
                      <span
                        key={service.key}
                        className="px-3 py-1.5 rounded-full"
                        style={{
                          background: `${service.color}15`,
                          color: service.color,
                          fontSize: '11px',
                          fontWeight: 600,
                          fontFamily: ff,
                        }}
                      >
                        {isAr ? service.labelAr : service.labelEn}
                      </span>
                    ))}
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
                background: step === 1 ? 'transparent' : (isDark ? 'rgba(107,202,186,0.10)' : 'rgba(107,202,186,0.08)'),
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
                  background: `linear-gradient(135deg, ${B.seafoam} 0%, #4FB4A8 100%)`,
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
