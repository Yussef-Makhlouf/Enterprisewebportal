import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, Camera, FileText, CreditCard, AlertTriangle } from 'lucide-react';

export function ProfilePage() {
  const { theme, language, isRTL, currentUser, addToast } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [showPass, setShowPass] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  const bg          = theme === 'dark' ? '#0C1221' : '#F8F7FC';
  const cardBg      = theme === 'dark' ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(128,148,230,0.16)' : 'rgba(13,31,60,0.10)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const inputBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB';

  const Input = ({ label, locked = false, type = 'text', ...props }: { label: string; locked?: boolean; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{label}</label>
      <input
        type={type}
        {...props}
        readOnly={locked}
        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
        style={{ background: locked ? (theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#F8FAFB') : inputBg, borderColor, color: locked ? textSecondary : textPrimary, opacity: locked ? 0.8 : 1, cursor: locked ? 'not-allowed' : 'text' }}
      />
    </div>
  );

  const Toggle = ({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor }}>
      <span style={{ fontSize: '14px', color: textPrimary }}>{label}</span>
      <button
        className="w-12 h-6 rounded-full transition-all relative"
        style={{ background: value ? '#8094E6' : (theme === 'dark' ? 'rgba(128,148,230,0.20)' : '#C0CBDE') }}
        onClick={() => onChange(!value)}
      >
        <span className="absolute top-1 transition-all rounded-full w-4 h-4 bg-white"
          style={{ left: value ? '26px' : '4px' }} />
      </button>
    </div>
  );

  return (
    <div className="p-5 min-h-full pb-20" style={{ background: bg }}>
      <div className="mb-5">
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>{isAr ? 'ملفي الشخصي' : 'My Profile'}</h1>
        <p style={{ fontSize: '13px', color: textSecondary }}>{isAr ? 'إدارة بياناتك الشخصية وإعدادات الأمان' : 'Manage your personal information and security settings'}</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Avatar Card */}
          <div className="rounded-xl p-5 text-center" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto"
                style={{ background: 'linear-gradient(135deg, #19058C, #8094E6)', fontSize: '1.5rem', fontWeight: 700 }}>
                {currentUser.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white"
                style={{ background: '#D28C64', boxShadow: '0 2px 8px rgba(210,140,100,0.40)' }}>
                <Camera size={14} />
              </button>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary }}>
              {isAr ? currentUser.nameAr : currentUser.name}
            </h3>
            <div className="mt-1 mb-3">
              <span className="px-3 py-1 rounded-full text-white font-medium"
                style={{ fontSize: '12px', background: `linear-gradient(135deg, #19058C, #8094E6)` }}>
                {isAr ? 'وسيط' : 'Broker'}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: textSecondary }}>{currentUser.email}</p>
            <button className="mt-3 w-full py-2 rounded-lg border text-sm font-medium hover:opacity-80"
              style={{ borderColor, color: textSecondary }}>
              {isAr ? 'تغيير الصورة' : 'Change Photo'}
            </button>
          </div>

          {/* License Status */}
          <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginBottom: '12px' }}>
              {isAr ? 'حالة الرخصة' : 'License Status'}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'رقم الرخصة' : 'License No.'}</span>
                <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>LIC-2024-004821</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'الانتهاء' : 'Expiry'}</span>
                <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#00C896' }}>31/12/2025</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'الحالة' : 'Status'}</span>
                <span className="px-2.5 py-0.5 rounded-full" style={{ fontSize: '11px', background: 'rgba(0,200,150,0.12)', color: '#00C896', fontWeight: 500 }}>
                  {isAr ? 'نشطة' : 'Active'}
                </span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '11px', color: textSecondary }}>{isAr ? 'أيام متبقية' : 'Days remaining'}</span>
                  <span className="font-mono" style={{ fontSize: '11px', color: '#00C896', fontWeight: 600 }}>292</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E4EAF3' }}>
                  <div className="h-full rounded-full" style={{ width: '80%', background: '#00C896' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            {[
              { icon: FileText, label: isAr ? 'وثائقي' : 'My Policies', path: '/broker/policies' },
              { icon: CreditCard, label: isAr ? 'كشف الحساب' : 'Statement of Account', path: '/broker/statement' },
            ].map((link, i) => (
              <button key={link.label}
                className="w-full flex items-center gap-3 px-4 py-3 hover:opacity-80 transition-all border-b last:border-0"
                style={{ borderColor, textAlign: isRTL ? 'right' : 'left' }}
                onClick={() => navigate(link.path)}>
                <link.icon size={16} style={{ color: '#C8102E' }} />
                <span style={{ fontSize: '13px', color: textPrimary }}>{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column (2 cols wide) */}
        <div className="col-span-2 space-y-4">
          {/* Personal Information */}
          <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary, marginBottom: '16px' }}>
              {isAr ? 'المعلومات الشخصية' : 'Personal Information'}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Input label={isAr ? 'الاسم الكامل' : 'Full Name'} defaultValue={isAr ? currentUser.nameAr : currentUser.name} />
              <Input label={isAr ? 'البريد الإلكتروني' : 'Email'} defaultValue={currentUser.email} locked />
              <Input label={isAr ? 'رقم الهاتف' : 'Mobile Number'} defaultValue="+962 79 555 4321" />
              <Input label={isAr ? 'المسمى الوظيفي' : 'Job Title'} defaultValue={isAr ? 'وسيط تأمين' : 'Insurance Broker'} locked />
            </div>
          </div>

          {/* Security */}
          <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary, marginBottom: '16px' }}>
              {isAr ? 'الأمان' : 'Security'}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: isAr ? 'كلمة المرور الحالية' : 'Current Password' },
                { label: isAr ? 'كلمة المرور الجديدة' : 'New Password' },
                { label: isAr ? 'تأكيد كلمة المرور' : 'Confirm Password', colSpan: 2 },
              ].map(f => (
                <div key={f.label} className={f.colSpan === 2 ? 'col-span-2' : ''}>
                  <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{f.label}</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
                      style={{ background: inputBg, borderColor, color: textPrimary, paddingRight: '40px' }}
                      placeholder="••••••••"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: textSecondary }}
                      onClick={() => setShowPass(p => !p)}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: textPrimary }}>{isAr ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}</p>
                <p style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'أمان إضافي لحسابك' : 'Extra security for your account'}</p>
              </div>
              <button
                className="w-12 h-6 rounded-full transition-all relative"
                style={{ background: twoFactor ? '#C8102E' : (theme === 'dark' ? '#2A3650' : '#C0CBDE') }}
                onClick={() => setTwoFactor(p => !p)}>
                <span className="absolute top-1 transition-all rounded-full w-4 h-4 bg-white" style={{ left: twoFactor ? '26px' : '4px' }} />
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary, marginBottom: '4px' }}>
              {isAr ? 'تفضيلات الإشعارات' : 'Notification Preferences'}
            </h4>
            <Toggle value={emailNotif} onChange={setEmailNotif} label={isAr ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'} />
            <Toggle value={smsNotif} onChange={setSmsNotif} label={isAr ? 'إشعارات SMS' : 'SMS Notifications'} />
            <Toggle value={pushNotif} onChange={setPushNotif} label={isAr ? 'الإشعارات الفورية' : 'Push Notifications'} />
          </div>
        </div>
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-end p-5 border-t"
        style={{ background: theme === 'dark' ? '#070E1C' : '#F0F4FA', borderColor }}>
        <button
          className="px-8 py-2.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #19058C, #8094E6)', boxShadow: '0 4px 15px rgba(200,16,46,0.3)' }}
          onClick={() => addToast({ type: 'success', title: isAr ? 'تم الحفظ' : 'Profile Updated' })}
        >
          {isAr ? 'حفظ التغييرات' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}