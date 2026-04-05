import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Users, Heart, Shield, CheckCircle, AlertCircle, Upload, DollarSign, Calendar, Plus, X } from 'lucide-react';
import { B, cardBg, cardSdw, cardBdr, inputBg, textPrimary, textBody, textMuted } from '../../utils/darkPalette';

interface Dependent {
  id: string;
  name: string;
  relation: string;
  dateOfBirth: string;
  gender: string;
}

interface FormData {
  // Step 1: Plan Selection
  planType: string;
  coverageLevel: string;
  networkType: string;
  
  // Step 2: Primary Insured
  primaryName: string;
  primaryId: string;
  primaryDob: string;
  primaryGender: string;
  primaryPhone: string;
  primaryEmail: string;
  
  // Step 3: Dependents
  dependents: Dependent[];
  
  // Step 4: Medical History
  preExistingConditions: string;
  chronicDiseases: boolean;
  surgeryHistory: string;
  currentMedications: string;
  
  // Documents
  nationalIdCopy: File | null;
  medicalRecords: File | null;
}

const initialFormData: FormData = {
  planType: '',
  coverageLevel: '',
  networkType: 'nationwide',
  primaryName: '',
  primaryId: '',
  primaryDob: '',
  primaryGender: '',
  primaryPhone: '',
  primaryEmail: '',
  dependents: [],
  preExistingConditions: '',
  chronicDiseases: false,
  surgeryHistory: '',
  currentMedications: '',
  nationalIdCopy: null,
  medicalRecords: null,
};

export function MedicalIssuance() {
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
    { num: 1, label: isAr ? 'اختيار الخطة' : 'Plan Selection', icon: Shield },
    { num: 2, label: isAr ? 'المؤمن الرئيسي' : 'Primary Insured', icon: Users },
    { num: 3, label: isAr ? 'التابعون' : 'Dependents', icon: Heart },
    { num: 4, label: isAr ? 'المراجعة' : 'Review', icon: CheckCircle },
  ];

  const plans = [
    { value: 'individual', labelEn: 'Individual Plan', labelAr: 'خطة فردية', desc: 'Coverage for one person', descAr: 'تغطية لشخص واحد' },
    { value: 'family', labelEn: 'Family Plan', labelAr: 'خطة عائلية', desc: 'Coverage for you and dependents', descAr: 'تغطية لك وللمعالين' },
    { value: 'group', labelEn: 'Group/Corporate', labelAr: 'مجموعة/مؤسسية', desc: 'For companies (5+ employees)', descAr: 'للشركات (5+ موظف)' },
  ];

  const coverageLevels = [
    { value: 'basic', labelEn: 'Basic', labelAr: 'أساسية', limit: '10,000', price: '280' },
    { value: 'silver', labelEn: 'Silver', labelAr: 'فضية', limit: '25,000', price: '450' },
    { value: 'gold', labelEn: 'Gold', labelAr: 'ذهبية', limit: '50,000', price: '680' },
    { value: 'platinum', labelEn: 'Platinum', labelAr: 'بلاتينية', limit: '100,000', price: '980' },
  ];

  const addDependent = () => {
    const newDependent: Dependent = {
      id: Date.now().toString(),
      name: '',
      relation: '',
      dateOfBirth: '',
      gender: '',
    };
    setFormData({ ...formData, dependents: [...formData.dependents, newDependent] });
  };

  const removeDependent = (id: string) => {
    setFormData({
      ...formData,
      dependents: formData.dependents.filter(d => d.id !== id),
    });
  };

  const updateDependent = (id: string, field: keyof Dependent, value: string) => {
    setFormData({
      ...formData,
      dependents: formData.dependents.map(d =>
        d.id === id ? { ...d, [field]: value } : d
      ),
    });
  };

  const calculatePremium = () => {
    const level = coverageLevels.find(l => l.value === formData.coverageLevel);
    if (!level) return '0.00';
    
    let basePremium = parseFloat(level.price);
    
    // Add dependent costs
    const dependentCost = formData.dependents.length * (basePremium * 0.6);
    basePremium += dependentCost;
    
    // Network multiplier
    if (formData.networkType === 'premium') basePremium *= 1.25;
    
    return basePremium.toFixed(2);
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepNum === 1) {
      if (!formData.planType) newErrors.planType = isAr ? 'نوع الخطة مطلوب' : 'Plan type required';
      if (!formData.coverageLevel) newErrors.coverageLevel = isAr ? 'مستوى التغطية مطلوب' : 'Coverage level required';
    }
    
    if (stepNum === 2) {
      if (!formData.primaryName || formData.primaryName.length < 3) {
        newErrors.primaryName = isAr ? 'الاسم مطلوب (3 أحرف على الأقل)' : 'Name required (min 3 chars)';
      }
      if (!formData.primaryId || !/^\d{10}$/.test(formData.primaryId)) {
        newErrors.primaryId = isAr ? 'رقم الهوية يجب أن يكون 10 أرقام' : 'ID must be 10 digits';
      }
      if (!formData.primaryDob) newErrors.primaryDob = isAr ? 'تاريخ الميلاد مطلوب' : 'Date of birth required';
      if (!formData.primaryGender) newErrors.primaryGender = isAr ? 'الجنس مطلوب' : 'Gender required';
      if (!formData.primaryPhone || !/^07\d{8}$/.test(formData.primaryPhone)) {
        newErrors.primaryPhone = isAr ? 'رقم الهاتف غير صحيح (07xxxxxxxx)' : 'Invalid phone (07xxxxxxxx)';
      }
      if (!formData.primaryEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryEmail)) {
        newErrors.primaryEmail = isAr ? 'البريد الإلكتروني غير صحيح' : 'Invalid email';
      }
    }
    
    if (stepNum === 3) {
      if (formData.planType === 'family' && formData.dependents.length === 0) {
        newErrors.dependents = isAr ? 'يجب إضافة معال واحد على الأقل للخطة العائلية' : 'Family plan requires at least one dependent';
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
              {isAr ? 'التأمين الطبي' : 'Medical Insurance'}
            </h1>
            <p style={{ fontSize: '13px', color: tMute, marginTop: '4px', fontFamily: ff }}>
              {isAr ? 'خطط التغطية الطبية الفردية والجماعية' : 'Individual and group medical coverage plans'}
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
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl p-8" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          
          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label style={labelStyle}>{isAr ? 'نوع الخطة' : 'Plan Type'} *</label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {plans.map(plan => (
                    <div
                      key={plan.value}
                      onClick={() => setFormData({ ...formData, planType: plan.value })}
                      className="p-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: formData.planType === plan.value ? (isDark ? 'rgba(107,202,186,0.12)' : 'rgba(107,202,186,0.08)') : iBg,
                        border: `2px solid ${formData.planType === plan.value ? B.seafoam : bdr}`,
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 700, color: tPrimary, fontFamily: ff, marginBottom: '4px' }}>
                        {isAr ? plan.labelAr : plan.labelEn}
                      </div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>
                        {isAr ? plan.descAr : plan.desc}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.planType && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.planType}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'مستوى التغطية' : 'Coverage Level'} *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coverageLevels.map(level => (
                    <div
                      key={level.value}
                      onClick={() => setFormData({ ...formData, coverageLevel: level.value })}
                      className="p-5 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: formData.coverageLevel === level.value ? (isDark ? 'rgba(107,202,186,0.12)' : 'rgba(107,202,186,0.08)') : iBg,
                        border: `2px solid ${formData.coverageLevel === level.value ? B.seafoam : bdr}`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div style={{ fontSize: '15px', fontWeight: 700, color: tPrimary, fontFamily: ff }}>
                          {isAr ? level.labelAr : level.labelEn}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: B.seafoam, fontFamily: ffM }}>
                          {level.price} JOD
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>
                        {isAr ? 'حد التغطية:' : 'Coverage limit:'} {level.limit} JOD
                      </div>
                    </div>
                  ))}
                </div>
                {errors.coverageLevel && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.coverageLevel}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'شبكة المستشفيات' : 'Hospital Network'}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'nationwide', labelEn: 'Nationwide Network', labelAr: 'شبكة وطنية', desc: '50+ hospitals across Jordan', descAr: '50+ مستشفى في الأردن' },
                    { value: 'premium', labelEn: 'Premium Network', labelAr: 'شبكة متميزة', desc: 'Premium hospitals + international', descAr: 'مستشفيات متميزة + دولية' },
                  ].map(network => (
                    <div
                      key={network.value}
                      onClick={() => setFormData({ ...formData, networkType: network.value })}
                      className="p-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: formData.networkType === network.value ? (isDark ? 'rgba(107,202,186,0.12)' : 'rgba(107,202,186,0.08)') : iBg,
                        border: `2px solid ${formData.networkType === network.value ? B.seafoam : bdr}`,
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 700, color: tPrimary, fontFamily: ff, marginBottom: '4px' }}>
                        {isAr ? network.labelAr : network.labelEn}
                      </div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>
                        {isAr ? network.descAr : network.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Primary Insured */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label style={labelStyle}>{isAr ? 'الاسم الكامل' : 'Full Name'} *</label>
                <input
                  type="text"
                  value={formData.primaryName}
                  onChange={(e) => setFormData({ ...formData, primaryName: e.target.value })}
                  placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                  style={{
                    ...inputStyle,
                    borderColor: errors.primaryName ? B.roseGold : bdr,
                  }}
                />
                {errors.primaryName && (
                  <div style={errorStyle}>
                    <AlertCircle size={12} />
                    {errors.primaryName}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'رقم الهوية الوطنية' : 'National ID'} *</label>
                  <input
                    type="text"
                    value={formData.primaryId}
                    onChange={(e) => setFormData({ ...formData, primaryId: e.target.value })}
                    placeholder="1234567890"
                    maxLength={10}
                    style={{
                      ...inputStyle,
                      fontFamily: ffM,
                      borderColor: errors.primaryId ? B.roseGold : bdr,
                    }}
                  />
                  {errors.primaryId && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.primaryId}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'تاريخ الميلاد' : 'Date of Birth'} *</label>
                  <input
                    type="date"
                    value={formData.primaryDob}
                    onChange={(e) => setFormData({ ...formData, primaryDob: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderColor: errors.primaryDob ? B.roseGold : bdr,
                    }}
                  />
                  {errors.primaryDob && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.primaryDob}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'الجنس' : 'Gender'} *</label>
                  <select
                    value={formData.primaryGender}
                    onChange={(e) => setFormData({ ...formData, primaryGender: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderColor: errors.primaryGender ? B.roseGold : bdr,
                    }}
                  >
                    <option value="">{isAr ? 'اختر' : 'Select'}</option>
                    <option value="male">{isAr ? 'ذكر' : 'Male'}</option>
                    <option value="female">{isAr ? 'أنثى' : 'Female'}</option>
                  </select>
                  {errors.primaryGender && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.primaryGender}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>{isAr ? 'رقم الهاتف' : 'Phone Number'} *</label>
                  <input
                    type="tel"
                    value={formData.primaryPhone}
                    onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                    placeholder="0791234567"
                    maxLength={10}
                    style={{
                      ...inputStyle,
                      fontFamily: ffM,
                      borderColor: errors.primaryPhone ? B.roseGold : bdr,
                    }}
                  />
                  {errors.primaryPhone && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.primaryPhone}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>{isAr ? 'البريد الإلكتروني' : 'Email'} *</label>
                  <input
                    type="email"
                    value={formData.primaryEmail}
                    onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                    placeholder="email@example.com"
                    style={{
                      ...inputStyle,
                      borderColor: errors.primaryEmail ? B.roseGold : bdr,
                    }}
                  />
                  {errors.primaryEmail && (
                    <div style={errorStyle}>
                      <AlertCircle size={12} />
                      {errors.primaryEmail}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>{isAr ? 'التاريخ الطبي (اختياري)' : 'Medical History (Optional)'}</label>
                <textarea
                  value={formData.preExistingConditions}
                  onChange={(e) => setFormData({ ...formData, preExistingConditions: e.target.value })}
                  placeholder={isAr ? 'أي حالات طبية موجودة مسبقاً' : 'Any pre-existing medical conditions'}
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: 'vertical' as const,
                  }}
                />
              </div>

              <label className="flex items-center gap-3 p-4 rounded-lg cursor-pointer" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                <input
                  type="checkbox"
                  checked={formData.chronicDiseases}
                  onChange={(e) => setFormData({ ...formData, chronicDiseases: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '13px', fontWeight: 600, color: tBody, fontFamily: ff }}>
                  {isAr ? 'أعاني من أمراض مزمنة' : 'I have chronic diseases'}
                </span>
              </label>
            </div>
          )}

          {/* Step 3: Dependents */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>
                    {isAr ? 'المعالون' : 'Dependents'}
                  </label>
                  <div style={{ fontSize: '11px', color: tMute, fontFamily: ff, marginTop: '4px' }}>
                    {isAr ? 'أضف أفراد العائلة المعالين' : 'Add family members as dependents'}
                  </div>
                </div>
                <button
                  onClick={addDependent}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    background: B.seafoam,
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: ff,
                  }}
                >
                  <Plus size={16} />
                  {isAr ? 'إضافة معال' : 'Add Dependent'}
                </button>
              </div>

              {errors.dependents && (
                <div style={errorStyle}>
                  <AlertCircle size={12} />
                  {errors.dependents}
                </div>
              )}

              <div className="space-y-4">
                {formData.dependents.map((dep, idx) => (
                  <div
                    key={dep.id}
                    className="p-5 rounded-xl"
                    style={{ background: iBg, border: `1px solid ${bdr}` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div style={{ fontSize: '13px', fontWeight: 700, color: tBody, fontFamily: ff }}>
                        {isAr ? `معال ${idx + 1}` : `Dependent ${idx + 1}`}
                      </div>
                      <button
                        onClick={() => removeDependent(dep.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{
                          background: 'rgba(255,115,102,0.12)',
                          color: B.roseGold,
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label style={{ ...labelStyle, fontSize: '11px' }}>{isAr ? 'الاسم' : 'Name'}</label>
                        <input
                          type="text"
                          value={dep.name}
                          onChange={(e) => updateDependent(dep.id, 'name', e.target.value)}
                          placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                          style={{
                            ...inputStyle,
                            padding: '9px 12px',
                            fontSize: '12px',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ ...labelStyle, fontSize: '11px' }}>{isAr ? 'القرابة' : 'Relation'}</label>
                        <select
                          value={dep.relation}
                          onChange={(e) => updateDependent(dep.id, 'relation', e.target.value)}
                          style={{
                            ...inputStyle,
                            padding: '9px 12px',
                            fontSize: '12px',
                          }}
                        >
                          <option value="">{isAr ? 'اختر' : 'Select'}</option>
                          <option value="spouse">{isAr ? 'الزوج/ة' : 'Spouse'}</option>
                          <option value="son">{isAr ? 'ابن' : 'Son'}</option>
                          <option value="daughter">{isAr ? 'ابنة' : 'Daughter'}</option>
                          <option value="parent">{isAr ? 'أحد الوالدين' : 'Parent'}</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ ...labelStyle, fontSize: '11px' }}>{isAr ? 'تاريخ الميلاد' : 'Date of Birth'}</label>
                        <input
                          type="date"
                          value={dep.dateOfBirth}
                          onChange={(e) => updateDependent(dep.id, 'dateOfBirth', e.target.value)}
                          style={{
                            ...inputStyle,
                            padding: '9px 12px',
                            fontSize: '12px',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ ...labelStyle, fontSize: '11px' }}>{isAr ? 'الجنس' : 'Gender'}</label>
                        <select
                          value={dep.gender}
                          onChange={(e) => updateDependent(dep.id, 'gender', e.target.value)}
                          style={{
                            ...inputStyle,
                            padding: '9px 12px',
                            fontSize: '12px',
                          }}
                        >
                          <option value="">{isAr ? 'اختر' : 'Select'}</option>
                          <option value="male">{isAr ? 'ذكر' : 'Male'}</option>
                          <option value="female">{isAr ? 'أنثى' : 'Female'}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {formData.dependents.length === 0 && (
                  <div
                    className="p-8 rounded-xl text-center"
                    style={{ background: iBg, border: `1px dashed ${bdr}` }}
                  >
                    <Heart size={32} style={{ color: tMute, margin: '0 auto 12px' }} />
                    <div style={{ fontSize: '13px', color: tMute, fontFamily: ff }}>
                      {isAr ? 'لم يتم إضافة معالين بعد' : 'No dependents added yet'}
                    </div>
                  </div>
                )}
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
                    <Heart size={18} style={{ color: B.seafoam }} />
                    <span style={{ fontSize: '2rem', fontWeight: 700, color: B.seafoam, fontFamily: ffH }}>
                      {calculatePremium()}
                    </span>
                    <span style={{ fontSize: '14px', color: tMute, fontFamily: ff }}>JOD</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: tMute, fontFamily: ff }}>
                  {isAr ? 'شامل جميع المعالين والرسوم' : 'Including all dependents and fees'}
                </div>
              </div>

              {/* Review Data */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: tMute, fontFamily: ff, textTransform: 'uppercase', marginBottom: '12px' }}>
                    {isAr ? 'تفاصيل الخطة' : 'Plan Details'}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'نوع الخطة' : 'Plan Type'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.planType}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'مستوى التغطية' : 'Coverage Level'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.coverageLevel}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: tMute, fontFamily: ff, textTransform: 'uppercase', marginBottom: '12px' }}>
                    {isAr ? 'المؤمن الرئيسي' : 'Primary Insured'}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'الاسم' : 'Name'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ff }}>{formData.primaryName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{isAr ? 'الهاتف' : 'Phone'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: tPrimary, fontFamily: ffM }}>{formData.primaryPhone}</div>
                    </div>
                  </div>
                </div>

                {formData.dependents.length > 0 && (
                  <div className="p-4 rounded-xl" style={{ background: iBg, border: `1px solid ${bdr}` }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: tMute, fontFamily: ff, textTransform: 'uppercase', marginBottom: '12px' }}>
                      {isAr ? 'المعالون' : 'Dependents'} ({formData.dependents.length})
                    </div>
                    <div className="space-y-2">
                      {formData.dependents.map((dep, idx) => (
                        <div key={dep.id} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: B.seafoam, fontSize: '10px', fontWeight: 700 }}>
                            {idx + 1}
                          </div>
                          <div style={{ fontSize: '12px', color: tBody, fontFamily: ff }}>
                            {dep.name} ({dep.relation})
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
