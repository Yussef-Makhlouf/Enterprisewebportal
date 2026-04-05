import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Shield, Eye, EyeOff, Check } from 'lucide-react';

export function SetPasswordPage() {
  const { theme, language, isRTL, setIsAuthenticated, setUserRole } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const criteria = [
    { key: 'length', label: isAr ? 'الحد الأدنى 8 أحرف' : 'Minimum 8 characters', met: pass.length >= 8 },
    { key: 'upper', label: isAr ? 'حرف كبير' : 'Uppercase letter', met: /[A-Z]/.test(pass) },
    { key: 'number', label: isAr ? 'رقم' : 'Number', met: /\d/.test(pass) },
    { key: 'special', label: isAr ? 'رمز خاص' : 'Special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(pass) },
  ];

  const strength = criteria.filter(c => c.met).length;
  const strengthColor = strength < 2 ? '#D28C64' : strength < 4 ? '#8094E6' : '#6BCABA';
  const strengthLabel = strength < 2
    ? (isAr ? 'ضعيفة' : 'Weak')
    : strength < 4
      ? (isAr ? 'متوسطة' : 'Fair')
      : (isAr ? 'قوية' : 'Strong');

  const handleSubmit = () => {
    if (strength === 4 && pass === confirm) {
      setUserRole('broker');
      setIsAuthenticated(true);
      navigate('/broker');
    }
  };

  const bg          = theme === 'dark' ? '#0C1221' : '#F8F7FC';
  const cardBg      = theme === 'dark' ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8F0FF' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? 'rgba(180,205,255,0.65)' : '#6B7A9B';
  const borderColor   = theme === 'dark' ? 'rgba(128,148,230,0.16)' : 'rgba(13,31,60,0.12)';

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${theme === 'dark' ? 'dark' : ''}`}
      style={{ background: bg, fontFamily: "'Almarai', Verdana, sans-serif" }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 shadow-2xl"
          style={{ background: cardBg, border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)'}` }}>

          {/* Shield Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(25,5,140,0.10)', border: '1px solid rgba(25,5,140,0.22)' }}>
              <Shield size={28} style={{ color: '#19058C' }} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-bold mb-2" style={{ fontSize: '1.5rem', color: textPrimary }}>
              {isAr ? 'تعيين كلمة المرور' : 'Set Your Password'}
            </h2>
            <p style={{ fontSize: '14px', color: textSecondary }}>
              {isAr ? 'أنشئ كلمة مرور قوية لحماية حسابك' : 'Create a strong password to protect your account'}
            </p>
          </div>

          {/* Password Policy Checklist */}
          <div className="rounded-xl p-4 mb-6 space-y-2"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}>
            {criteria.map((c) => (
              <div key={c.key} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${c.met ? 'bg-[#00C896]' : 'bg-transparent border-2 border-current'}`}
                  style={{ borderColor: c.met ? '#00C896' : (theme === 'dark' ? '#4A5878' : '#C0CBDE') }}>
                  {c.met && <Check size={12} className="text-white" />}
                </div>
                <span style={{
                  fontSize: '13px',
                  color: c.met ? '#00C896' : textSecondary,
                  fontWeight: c.met ? 500 : 400
                }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block mb-1.5" style={{ fontSize: '13px', color: textSecondary, fontWeight: 500 }}>
              {isAr ? 'كلمة المرور الجديدة' : 'New Password'}
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={pass}
                onChange={e => setPass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB',
                  borderColor: pass ? (strength >= 4 ? '#00C896' : '#F0B030') : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(13,31,60,0.12)'),
                  color: textPrimary,
                  fontSize: '14px'
                }}
                placeholder="••••••••••"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: textSecondary }}
                onClick={() => setShowPass(p => !p)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Strength Meter */}
          {pass && (
            <div className="mb-4">
              <div className="flex justify-between mb-1.5">
                <span style={{ fontSize: '12px', color: textSecondary }}>
                  {isAr ? 'قوة كلمة المرور' : 'Password Strength'}
                </span>
                <span style={{ fontSize: '12px', color: strengthColor, fontWeight: 600 }}>
                  {strengthLabel}
                </span>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-all"
                    style={{ background: i < strength ? strengthColor : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E4EAF3') }} />
                ))}
              </div>
            </div>
          )}

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block mb-1.5" style={{ fontSize: '13px', color: textSecondary, fontWeight: 500 }}>
              {isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB',
                  borderColor: confirm ? (confirm === pass ? '#6BCABA' : '#D28C64') : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(13,31,60,0.12)'),
                  color: textPrimary,
                  fontSize: '14px'
                }}
                placeholder="••••••••••"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: textSecondary }}
                onClick={() => setShowConfirm(p => !p)}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {confirm && confirm !== pass && (
              <p className="mt-1.5" style={{ fontSize: '12px', color: '#D28C64' }}>
                {isAr ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'}
              </p>
            )}
          </div>

          <button
            className={`w-full py-3.5 rounded-xl text-white font-semibold transition-all ${strength === 4 && pass === confirm ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'}`}
            style={{
              background: strength === 4 && pass === confirm
                ? 'linear-gradient(135deg, #D28C64 0%, #E8B98A 50%, #D28C64 100%)'
                : 'rgba(25,5,140,0.25)',
              boxShadow: strength === 4 && pass === confirm ? '0 4px 20px rgba(210,140,100,0.35)' : 'none',
              fontSize: '15px'
            }}
            onClick={handleSubmit}
            disabled={strength < 4 || pass !== confirm}
          >
            {isAr ? 'المتابعة' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}