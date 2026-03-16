import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Globe, Eye, EyeOff, Shield, BarChart3, Languages, ArrowRight, Globe2, Monitor, Smartphone, Mail, Grid3X3 } from 'lucide-react';

export function LoginPage() {
  const { theme, toggleTheme, language, toggleLanguage, isRTL, setIsAuthenticated, setUserRole } = useApp();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<'employee' | 'broker'>('broker');
  const [showPass, setShowPass] = useState(false);

  const isAr = language === 'ar';

  const handleEmployeeLogin = () => {
    setUserRole('admin');
    setIsAuthenticated(true);
    navigate('/admin');
  };

  const handleBrokerOTP = () => {
    navigate('/auth/otp');
  };

  const handleSocialLogin = (provider: string) => {
    setUserRole('broker');
    setIsAuthenticated(true);
    navigate('/broker');
  };

  return (
    <div className={`min-h-screen flex ${isRTL ? 'flex-row-reverse' : ''} ${theme === 'dark' ? 'dark' : ''}`}
      style={{ fontFamily: isAr ? "'Tajawal', sans-serif" : "'IBM Plex Sans', sans-serif" }}>

      {/* Left Brand Panel (60%) */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{
          width: '60%',
          background: 'linear-gradient(135deg, #0D1F3C 0%, #070E1C 60%, #0D1F3C 100%)'
        }}
      >
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

        {/* Radial Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C8102E, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #C8962A, transparent)', transform: 'translate(-30%, 30%)' }} />

        {/* Top section */}
        <div className="relative z-10">
          {/* GIG Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(135deg, #C8102E, #A00D25)',
                boxShadow: '0 8px 32px rgba(200,16,46,0.5)'
              }}>
              <span className="text-white font-black text-xl">G</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">
                {isAr ? 'جي آي جي الأردن' : 'GIG Jordan'}
              </div>
              <div className="text-white/50 text-sm">
                {isAr ? 'للتأمين' : 'Insurance Company'}
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="mb-6">
            <h1 className="mb-4"
              style={{
                fontSize: isAr ? '2.8rem' : '2.4rem',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.2,
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'IBM Plex Sans', sans-serif"
              }}>
              {isAr ? 'بوابة الوسطاء\nالمعتمدين' : 'The Authorized\nBroker Portal'}
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-md">
              {isAr
                ? 'منصة متكاملة لإدارة وثائق التأمين وتتبع العمولات والتواصل مع فري�� جي آي جي الأردن'
                : 'A comprehensive platform for managing insurance policies, tracking commissions, and collaborating with the GIG Jordan team'}
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Shield, label: isAr ? 'أمان عالي المستوى' : 'Enterprise Security', color: '#C8102E' },
              { icon: BarChart3, label: isAr ? 'تحليلات متقدمة' : 'Advanced Analytics', color: '#C8962A' },
              { icon: Languages, label: isAr ? 'ثنائي اللغة' : 'Bilingual AR/EN', color: '#0DB4CC' },
            ].map((f) => (
              <div key={f.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{
                  borderColor: f.color + '40',
                  background: f.color + '15',
                  color: '#E8EDF5'
                }}>
                <f.icon size={14} style={{ color: f.color }} />
                <span style={{ fontSize: '13px' }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 pt-8 border-t border-white/10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(200,16,46,0.2)', border: '1px solid rgba(200,16,46,0.3)' }}>
              <span className="text-[#C8102E] font-bold text-xs">G</span>
            </div>
            <span className="text-white/30 text-sm">
              {isAr ? 'مدعوم من مجموعة جي آي جي للتأمين' : 'Powered by GIG Insurance Group'}
            </span>
          </div>
        </div>
      </div>

      {/* Right Form Panel (40%) */}
      <div
        className="flex-1 flex flex-col"
        style={{
          background: theme === 'dark' ? '#0A1628' : '#FFFFFF',
          minWidth: '380px'
        }}
      >
        {/* Top Controls */}
        <div className="flex items-center justify-end gap-2 p-6">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all hover:border-[#C8102E]/50"
            style={{
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(13,31,60,0.1)',
              color: theme === 'dark' ? '#8A96B0' : '#4A5878'
            }}
            onClick={toggleLanguage}
          >
            <Globe size={14} />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg border transition-all hover:border-[#C8102E]/50"
            style={{
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(13,31,60,0.1)',
              color: theme === 'dark' ? '#8A96B0' : '#4A5878'
            }}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center px-8 py-6">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <div className="mb-8">
              <h2 className="mb-2"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: theme === 'dark' ? '#E8EDF5' : '#0D1F3C'
                }}>
                {isAr ? 'تسجيل الدخول' : 'Sign In'}
              </h2>
              <p style={{ fontSize: '14px', color: theme === 'dark' ? '#6B7A9B' : '#6B7A9B' }}>
                {isAr ? 'مرحباً بك في بوابة الوسطاء والوكلاء' : 'Welcome to the Agents & Brokers Portal'}
              </p>
            </div>

            {/* Login Type Toggle */}
            <div className="flex gap-0 mb-6 p-1 rounded-lg"
              style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F0F4FA' }}>
              {[
                { key: 'employee', label: isAr ? 'موظف GIG' : 'GIG Employee' },
                { key: 'broker', label: isAr ? 'وسيط / وكيل' : 'Broker / Agent' }
              ].map((opt) => (
                <button
                  key={opt.key}
                  className="flex-1 py-2 rounded-md text-sm font-medium transition-all"
                  style={{
                    background: loginType === opt.key ? '#C8102E' : 'transparent',
                    color: loginType === opt.key ? '#FFFFFF' : (theme === 'dark' ? '#6B7A9B' : '#6B7A9B'),
                  }}
                  onClick={() => setLoginType(opt.key as 'employee' | 'broker')}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {loginType === 'employee' ? (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1.5" style={{ fontSize: '13px', color: theme === 'dark' ? '#8A96B0' : '#4A5878', fontWeight: 500 }}>
                    {isAr ? 'البريد الإلكتروني' : 'Work Email'}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(13,31,60,0.1)',
                      color: theme === 'dark' ? '#E8EDF5' : '#0D1F3C',
                      fontSize: '14px'
                    }}
                    placeholder={isAr ? 'your.name@gig.com.jo' : 'your.name@gig.com.jo'}
                    defaultValue="ahmed.rashidi@gig.com.jo"
                  />
                </div>
                <div>
                  <label className="block mb-1.5" style={{ fontSize: '13px', color: theme === 'dark' ? '#8A96B0' : '#4A5878', fontWeight: 500 }}>
                    {isAr ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                      style={{
                        background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(13,31,60,0.1)',
                        color: theme === 'dark' ? '#E8EDF5' : '#0D1F3C',
                        fontSize: '14px',
                        paddingRight: '44px'
                      }}
                      placeholder="••••••••••"
                      defaultValue="password123"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: theme === 'dark' ? '#4A5878' : '#8A96B0' }}
                      onClick={() => setShowPass(p => !p)}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  className="w-full py-3 rounded-lg text-white font-medium transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #C8102E, #A00D25)',
                    boxShadow: '0 4px 15px rgba(200,16,46,0.3)',
                    fontSize: '14px'
                  }}
                  onClick={handleEmployeeLogin}
                >
                  <Shield size={16} />
                  {isAr ? 'تسجيل الدخول عبر Active Directory' : 'Sign in via Active Directory'}
                </button>
                <p className="text-center" style={{ fontSize: '11px', color: '#4A5878' }}>
                  {isAr ? 'يتطلب VPN الشبكة الداخلية' : 'Requires GIG internal network VPN'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { provider: 'google', label: isAr ? 'تسجيل الدخول بـ Google' : 'Sign in with Google', filled: false, Icon: Globe2 },
                  { provider: 'microsoft', label: isAr ? 'تسجيل الدخول بـ Microsoft' : 'Sign in with Microsoft', filled: false, Icon: Grid3X3 },
                  { provider: 'apple', label: isAr ? 'تسجيل الدخول بـ Apple' : 'Sign in with Apple', filled: false, Icon: Monitor },
                  { provider: 'otp', label: isAr ? 'تسجيل الدخول بـ OTP البريد الإلكتروني' : 'Sign in with Email OTP', filled: true, Icon: Mail },
                ].map((btn) => (
                  <button
                    key={btn.provider}
                    className="w-full py-3 rounded-lg border font-medium transition-all hover:opacity-90 flex items-center justify-center gap-3"
                    style={{
                      background: btn.filled
                        ? 'linear-gradient(135deg, #C8102E, #A00D25)'
                        : (theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#FFFFFF'),
                      borderColor: btn.filled
                        ? '#C8102E'
                        : (theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(13,31,60,0.15)'),
                      color: btn.filled ? '#FFFFFF' : (theme === 'dark' ? '#E8EDF5' : '#0D1F3C'),
                      fontSize: '14px',
                      boxShadow: btn.filled ? '0 4px 15px rgba(200,16,46,0.3)' : 'none'
                    }}
                    onClick={() => btn.provider === 'otp' ? handleBrokerOTP() : handleSocialLogin(btn.provider)}
                  >
                    <btn.Icon size={16} style={{ color: btn.filled ? '#FFFFFF' : (theme === 'dark' ? '#E8EDF5' : '#0D1F3C') }} />
                    {btn.label}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t text-center"
              style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)' }}>
              <p style={{ fontSize: '12px', color: '#4A5878' }}>
                {isAr ? 'للوسطاء والوكلاء المعتمدين فقط' : 'For authorized brokers and agents only'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}