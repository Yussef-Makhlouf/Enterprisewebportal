import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Mail, Phone, Shield, Building, IdCard, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { B, modalBg, modalSdw, cardBdr, textHero, textMuted, inputBg } from '../../utils/darkPalette';

interface AddUserModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onSuccess }) => {
  const { theme, language, isRTL, addToast } = useApp();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    firstNameAr: '',
    lastNameAr: '',
    firstNameEn: '',
    lastNameEn: '',
    email: '',
    mobile: '',
    role: '',
    department: '',
    nationalId: '',
    employeeId: '',
    gender: 'Male',
  });

  const [loading, setLoading] = useState(false);

  // Resolved Styles
  const bg = modalBg(isDark);
  const shadow = modalSdw(isDark);
  const border = cardBdr(isDark);
  const tHero = textHero(isDark);
  const tMuted = textMuted(isDark);
  const iBg = inputBg(isDark);

  const ff = "'Almarai', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";

  const handleSave = () => {
    // Basic validation
    if (!formData.email || !formData.firstNameEn || !formData.lastNameEn) {
      addToast({
        type: 'error',
        title: isAr ? 'خطأ في التحقق' : 'Validation Error',
        description: isAr ? 'يرجى إكمال الحقول المطلوبة' : 'Please fill all required fields',
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      addToast({
        type: 'success',
        title: isAr ? 'تم إضافة المستخدم بنجاح' : 'User Added Successfully',
        description: isAr ? 'تم إرسال بيانات الدخول إلى البريد الإلكتروني' : 'Login credentials sent to user email',
      });
      if (onSuccess) onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border"
          style={{ 
            background: bg, 
            borderColor: border, 
            boxShadow: shadow, 
            direction: isRTL ? 'rtl' : 'ltr',
            fontFamily: ff
          }}
        >
          {/* Header Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, ${B.ocean}, ${B.seafoam}, ${B.roseGold})` }} />

          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: border }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${B.ocean}20`, border: `1px solid ${B.ocean}40` }}>
                <UserPlus size={24} style={{ color: B.ocean }} />
              </div>
              <div>
                <h2 style={{ fontFamily: ffH, fontSize: '1.5rem', fontWeight: 700, color: tHero }}>
                  {isAr ? 'إضافة مستخدم GIG جديد' : 'Add New GIG User'}
                </h2>
                <p style={{ fontSize: '0.875rem', color: tMuted }}>
                  {isAr ? 'قم بإنشاء مستخدم جديد للنظام وتعيين الأدوار' : 'Create a new system user and assign roles'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
              style={{ color: tMuted }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-8 max-h-[70vh] overflow-y-auto gig-custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Personal Info Section */}
              <div className="space-y-6">
                <SectionHeader icon={<IdCard size={18} />} title={isAr ? 'المعلومات الشخصية' : 'Personal Information'} color={B.ocean} />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField label={isAr ? 'الاسم الأول (عربي)' : 'First Name (AR)'} value={formData.firstNameAr} onChange={(v: string) => setFormData({ ...formData, firstNameAr: v })} placeholder="أحمد" dir="rtl" />
                  <InputField label={isAr ? 'اسم العائلة (عربي)' : 'Last Name (AR)'} value={formData.lastNameAr} onChange={(v: string) => setFormData({ ...formData, lastNameAr: v })} placeholder="علي" dir="rtl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField label={isAr ? 'الاسم الأول (EN)' : 'First Name (EN)'} value={formData.firstNameEn} onChange={(v: string) => setFormData({ ...formData, firstNameEn: v })} placeholder="Ahmed" />
                  <InputField label={isAr ? 'اسم العائلة (EN)' : 'Last Name (EN)'} value={formData.lastNameEn} onChange={(v: string) => setFormData({ ...formData, lastNameEn: v })} placeholder="Ali" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label={isAr ? 'الجنس' : 'Gender'}
                    value={formData.gender}
                    onChange={(v: string) => setFormData({ ...formData, gender: v })}
                    options={[{ label: isAr ? 'ذكر' : 'Male', value: 'Male' }, { label: isAr ? 'أنثى' : 'Female', value: 'Female' }]}
                  />
                  <InputField label={isAr ? 'الرقم الوطني' : 'National ID'} value={formData.nationalId} onChange={(v: string) => setFormData({ ...formData, nationalId: v })} placeholder="990..." />
                </div>
              </div>

              {/* Contact & Professional Section */}
              <div className="space-y-6">
                <SectionHeader icon={<User size={18} />} title={isAr ? 'معلومات التواصل والعمل' : 'Contact & Professional'} color={B.seafoam} />
                
                <div className="space-y-4">
                  <InputField icon={<Mail size={16} />} label={isAr ? 'البريد الإلكتروني' : 'Email Address'} value={formData.email} onChange={(v: string) => setFormData({ ...formData, email: v })} placeholder="user@gig.com" />
                  <InputField icon={<Phone size={16} />} label={isAr ? 'رقم الهاتف' : 'Phone Number'} value={formData.mobile} onChange={(v: string) => setFormData({ ...formData, mobile: v })} placeholder="079..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label={isAr ? 'الدور الوظيفي' : 'System Role'}
                    icon={<Shield size={16} />}
                    value={formData.role}
                    onChange={(v: string) => setFormData({ ...formData, role: v })}
                    options={[
                      { label: isAr ? 'مدير عام' : 'Super Admin', value: 'super-admin' },
                      { label: isAr ? 'مدير مستخدمين' : 'Admin User', value: 'admin' },
                      { label: isAr ? 'مكتتب' : 'Underwriter', value: 'underwriter' },
                    ]}
                  />
                  <SelectField
                    label={isAr ? 'القسم' : 'Department'}
                    icon={<Building size={16} />}
                    value={formData.department}
                    onChange={(v: string) => setFormData({ ...formData, department: v })}
                    options={[
                      { label: isAr ? 'تكنولوجيا المعلومات' : 'IT Department', value: 'it' },
                      { label: isAr ? 'المطالبات' : 'Claims', value: 'claims' },
                      { label: isAr ? 'العمليات' : 'Operations', value: 'ops' },
                    ]}
                  />
                </div>

                <InputField label={isAr ? 'الرقم الوظيفي' : 'Employee ID'} value={formData.employeeId} onChange={(v: string) => setFormData({ ...formData, employeeId: v })} placeholder="EMP-123" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t flex items-center justify-end gap-4" style={{ borderColor: border, background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)' }}>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold transition-all hover:bg-black/5"
              style={{ color: tMuted }}
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="relative px-10 py-2.5 rounded-xl text-white font-bold overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              style={{
                background: `linear-gradient(135deg, ${B.indigo}, ${B.ocean})`,
                boxShadow: `0 8px 24px ${B.indigo}40`,
              }}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isAr ? 'جاري الحفظ...' : 'Saving...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                   <UserPlus size={16} />
                   {isAr ? 'حفظ المستخدم' : 'Save User'}
                </div>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Helper Components
const SectionHeader = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  return (
    <div className="flex items-center gap-2 pb-2 border-b border-dashed" style={{ borderColor: `${color}30` }}>
      <div style={{ color }}>{icon}</div>
      <h3 style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: isDark ? color : B.indigo }}>
        {title}
      </h3>
    </div>
  );
};

const InputField = ({ label, value, onChange, placeholder, type = "text", icon, dir }: any) => {
  const { theme, isRTL } = useApp();
  const isDark = theme === 'dark';
  return (
    <div className="space-y-1.5 flex-1">
      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: textMuted(isDark), display: 'block' }}>{label}</label>
      <div className="relative">
        {icon && (
          <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 opacity-40`}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className={`w-full py-2.5 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-opacity-20 ${icon ? (isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4') : 'px-4'}`}
          style={{
            background: inputBg(isDark),
            borderColor: cardBdr(isDark),
            color: textHero(isDark),
            fontSize: '0.875rem'
          }}
          onFocus={e => e.currentTarget.style.borderColor = B.ocean}
          onBlur={e => e.currentTarget.style.borderColor = cardBdr(isDark)}
        />
      </div>
    </div>
  );
};

const SelectField = ({ label, value, onChange, options, icon }: any) => {
  const { theme, isRTL } = useApp();
  const isDark = theme === 'dark';
  return (
    <div className="space-y-1.5 flex-1">
      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: textMuted(isDark), display: 'block' }}>{label}</label>
      <div className="relative">
        {icon && (
          <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 opacity-40`}>
            {icon}
          </div>
        )}
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full py-2.5 rounded-xl border outline-none transition-all cursor-pointer appearance-none ${icon ? (isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4') : 'px-4'}`}
          style={{
            background: inputBg(isDark),
            borderColor: cardBdr(isDark),
            color: textHero(isDark),
            fontSize: '0.875rem'
          }}
          onFocus={e => e.currentTarget.style.borderColor = B.ocean}
          onBlur={e => e.currentTarget.style.borderColor = cardBdr(isDark)}
        >
          <option value="">{isRTL ? 'اختر...' : 'Select...'}</option>
          {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 pointer-events-none opacity-40`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
