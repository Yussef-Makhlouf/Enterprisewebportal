import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Mail } from 'lucide-react';

export function OTPPage() {
  const { theme, language, isRTL, setIsAuthenticated, setUserRole } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(167); // 2:47
  const [verified, setVerified] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(p => p > 0 ? p - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleInput = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val.slice(-1);
    setOtp(newOtp);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setUserRole('broker');
    setIsAuthenticated(true);
    navigate('/broker');
  };

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(13,31,60,0.12)';

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''}`}
      style={{ background: bg, fontFamily: isAr ? "'Tajawal', sans-serif" : "'IBM Plex Sans', sans-serif" }}>

      {/* Left Brand Panel */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 relative overflow-hidden"
        style={{ width: '60%', background: 'linear-gradient(135deg, #0D1F3C 0%, #070E1C 100%)' }}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M0 0h4v4H0V0zm8 0h4v4H8V0zm8 0h4v4h-4V0zm8 0h4v4h-4V0zm8 0h4v4h-4V0zM0 8h4v4H0V8zm32 0h4v4h-4V8zM0 16h4v4H0v-4zm32 0h4v4h-4v-4zM0 24h4v4H0v-4zm32 0h4v4h-4v-4zM0 32h4v4H0v-4zm8 0h4v4H8v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C8102E, transparent)' }} />

        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ background: 'linear-gradient(135deg, #C8102E, #A00D25)', boxShadow: '0 12px 40px rgba(200,16,46,0.5)' }}>
            <Mail size={36} className="text-white" />
          </div>
          <h2 className="text-white font-bold text-2xl mb-4">
            {isAr ? 'التحقق من الهوية' : 'Identity Verification'}
          </h2>
          <p className="text-white/50 max-w-sm leading-relaxed">
            {isAr ? 'نحن نتحقق من هويتك لضمان أمان حسابك' : 'We are verifying your identity to ensure your account security'}
          </p>
        </div>
      </div>

      {/* Right OTP Panel */}
      <div className="flex-1 flex items-center justify-center p-8"
        style={{ background: theme === 'dark' ? '#0A1628' : '#FFFFFF' }}>
        <div className="w-full max-w-sm">
          <button
            className="flex items-center gap-2 mb-8 transition-colors hover:text-[#C8102E]"
            style={{ color: textSecondary, fontSize: '14px' }}
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
            {isAr ? 'العودة' : 'Back to Login'}
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(200,16,46,0.15)', border: '2px solid rgba(200,16,46,0.3)' }}>
              <Mail size={28} style={{ color: '#C8102E' }} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-bold mb-2" style={{ fontSize: '1.5rem', color: textPrimary }}>
              {isAr ? 'التحقق من الهوية' : 'Identity Verification'}
            </h2>
            <p style={{ fontSize: '14px', color: textSecondary }}>
              {isAr ? 'أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك' : 'Enter the 6-digit code sent to your email'}
            </p>
            <p className="mt-2 font-mono font-medium"
              style={{ fontSize: '14px', color: '#C8102E' }}>
              ah****@gig.com.jo
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleInput(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-12 h-14 text-center rounded-xl border-2 outline-none transition-all"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB',
                  borderColor: digit ? '#C8102E' : (theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(13,31,60,0.15)'),
                  color: textPrimary,
                  boxShadow: digit ? '0 0 0 3px rgba(200,16,46,0.15)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Countdown */}
          <div className="text-center mb-6">
            {countdown > 0 ? (
              <p style={{ fontSize: '14px', color: textSecondary }}>
                {isAr ? `إعادة الإرسال خلال ` : 'Resend in '}
                <span className="font-mono font-medium" style={{ color: '#C8102E' }}>
                  {formatTime(countdown)}
                </span>
              </p>
            ) : (
              <button
                className="text-[#C8102E] font-medium underline"
                style={{ fontSize: '14px' }}
                onClick={() => setCountdown(167)}
              >
                {isAr ? 'إعادة إرسال الرمز' : 'Resend Code'}
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            className="w-full py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #C8102E, #A00D25)',
              boxShadow: '0 4px 20px rgba(200,16,46,0.35)',
              fontSize: '15px'
            }}
            onClick={handleVerify}
          >
            {isAr ? 'تحقق والمتابعة' : 'Verify & Continue'}
          </button>

          <p className="text-center mt-4" style={{ fontSize: '12px', color: textSecondary }}>
            {isAr ? 'هل تحتاج مساعدة؟ ' : 'Need help? '}
            <span className="text-[#C8102E] cursor-pointer hover:underline">
              {isAr ? 'تواصل مع الدعم' : 'Contact Support'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
