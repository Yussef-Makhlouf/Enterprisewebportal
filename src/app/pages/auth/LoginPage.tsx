import gigLogo from '../../../assets/11b114c88a40163eff79fddefd1cfffde1fcfd17.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Globe, Eye, EyeOff, Shield, BarChart3, Languages, Mail, Monitor, Grid3X3, Globe2 } from 'lucide-react';

/* ── Brand ──────────────────────────────────────────── */
const B = {
  indigo: '#19058C',
  roseGold: '#D28C64',
  deepBlue: '#1F0F4D',
  ocean: '#8094E6',
  sunrise: '#FF7366',
  seafoam: '#6BCABA',
  pearl: '#E5E5E5',
} as const;

export function LoginPage() {
  const { theme, toggleTheme, language, toggleLanguage, isRTL, setIsAuthenticated, setUserRole } = useApp();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<'employee' | 'broker'>('broker');
  const [showPass, setShowPass] = useState(false);
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const handleEmployeeLogin = () => { setUserRole('admin'); setIsAuthenticated(true); navigate('/admin'); };
  const handleBrokerOTP = () => { navigate('/auth/otp'); };
  const handleSocialLogin = () => { setUserRole('broker'); setIsAuthenticated(true); navigate('/broker'); };

  const ff = "'Almarai', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";

  const panelBg = isDark ? '#0F1825' : '#FFFFFF';
  const panelText = isDark ? '#E8F0FF' : B.indigo;
  const inputBg = isDark ? 'rgba(128,148,230,0.07)' : '#F8F7FC';
  const inputBdr = isDark ? 'rgba(128,148,230,0.18)' : 'rgba(25,5,140,0.15)';
  const textMuted = isDark ? 'rgba(130,160,220,0.58)' : 'rgba(61,53,96,0.60)';
  const textBody = isDark ? 'rgba(180,205,255,0.78)' : '#3D3560';

  return (
    <div
      className={`min-h-screen flex ${isRTL ? 'flex-row-reverse' : ''}`}
      style={{ fontFamily: ff }}
    >
      {/* ── Brand Panel (60%) ─────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden"
        style={{
          width: '60%',
          background: `linear-gradient(135deg, ${B.deepBlue} 0%, ${B.indigo} 100%)`,
        }}
      >
        {/* Ambient glows */}
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(210,140,100,0.18) 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 start-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(128,148,230,0.18) 0%, transparent 70%)`, transform: 'translate(-30%, 30%)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M0 0h1v1H0zm47 0h1v1h-1zM0 47h1v1H0zm47 47h1v1h-1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Top section */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
              style={{ background: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)', boxShadow: `0 8px 32px rgba(25,5,140,0.5)`, padding: '6px' }}>
              <img src={gigLogo} alt="GIG Jordan" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontFamily: ffH, fontWeight: 700, fontSize: '16px', lineHeight: 1.2 }}>
                {isAr ? 'GIG Jordan team' : 'GIG Jordan'}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: '13px', fontFamily: ff }}>
                {isAr ? 'للتأمين' : 'Insurance Company'}
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="mb-8">
            <div style={{
              display: 'inline-block',
              padding: '5px 14px',
              border: `1px solid rgba(210,140,100,0.45)`,
              borderRadius: '20px',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: B.roseGold,
              fontFamily: ff,
              marginBottom: '20px',
            }}>
              {isAr ? 'بوابة الوسطاء والوكلاء' : 'Agents & Brokers Portal'}
            </div>
            <h1 style={{ fontFamily: ffH, fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '16px' }}>
              {isAr
                ? <><span>بوابة الوسطاء</span><br /><span style={{ color: B.roseGold }}>المعتمدين</span></>
                : <><span>The Authorized</span><br /><span style={{ color: B.roseGold }}>Broker Portal</span></>
              }
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', maxWidth: '440px', lineHeight: 1.7, fontFamily: ff }}>
              {isAr
                ? 'منصة متكاملة لإدارة وثائق التأمين وتتبع العمولات والتواصل مع فريقGIG Jordan teamالأردن'
                : 'A comprehensive platform for managing insurance policies, tracking commissions, and collaborating with the GIG Jordan team.'}
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Shield, label: isAr ? 'أمان عالي المستوى' : 'Enterprise Security', color: B.indigo },
              { icon: BarChart3, label: isAr ? 'تحليلات متقدمة' : 'Advanced Analytics', color: B.ocean },
              { icon: Languages, label: isAr ? 'ثنائي اللغة' : 'Bilingual AR / EN', color: B.seafoam },
            ].map((f) => (
              <div key={f.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ borderColor: `${f.color}55`, background: `${f.color}18`, color: 'rgba(255,255,255,0.85)' }}>
                <f.icon size={13} style={{ color: f.color }} />
                <span style={{ fontSize: '12px', fontFamily: ff }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom meta */}
        <div className="relative z-10">
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.10)', marginBottom: '20px' }} />
          <div className="flex gap-10">
            {[
              { label: isAr ? 'استثمارنا فيك' : 'Invested in You', sub: isAr ? 'الرؤية' : 'Brand Positioning' },
              { label: isAr ? 'العلاقة ثروة' : 'Relationship is Wealth', sub: isAr ? 'الفلسفة' : 'Brand Philosophy' },
              { label: isAr ? 'منطقة الشرق الأوسط' : 'MENA Region', sub: isAr ? 'نطاق العمل' : 'Market Focus' },
            ].map(m => (
              <div key={m.label} style={{ borderInlineStart: `2px solid ${B.roseGold}`, paddingInlineStart: '14px' }}>
                <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '12px', fontFamily: ffH }}>{m.label}</strong>
                <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px', fontFamily: ff }}>{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form Panel (40%) ──────────────────────── */}
      <div className="flex-1 flex flex-col w-full lg:w-[40%]" style={{ background: panelBg }}>
        {/* Controls */}
        <div className="flex items-center justify-end gap-2 p-5">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all"
            style={{ borderColor: inputBdr, color: textMuted, fontFamily: ff }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(210,140,100,0.45)`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = inputBdr; }}
            onClick={toggleLanguage}
          >
            <Globe size={13} />
            <span style={{ fontWeight: 600 }}>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg border transition-all"
            style={{ borderColor: inputBdr, color: textMuted }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(210,140,100,0.45)`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = inputBdr; }}
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-6">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <div className="mb-7">
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: panelText, fontFamily: ffH, marginBottom: '6px' }}>
                {isAr ? 'تسجيل الدخول' : 'Sign In'}
              </h2>
              <p style={{ fontSize: '14px', color: textBody, fontFamily: ff }}>
                {isAr ? 'مرحباً بك في بوابة الوسطاء والوكلاء' : 'Welcome to the Agents & Brokers Portal'}
              </p>
            </div>

            {/* Login type toggle */}
            <div className="flex gap-0 mb-6 p-1 rounded-xl"
              style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(25,5,140,0.06)' }}>
              {[
                { key: 'employee', label: isAr ? 'موظف GIG' : 'GIG Employee' },
                { key: 'broker', label: isAr ? 'وسيط / وكيل' : 'Broker / Agent' }
              ].map((opt) => (
                <button
                  key={opt.key}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: loginType === opt.key ? B.indigo : 'transparent',
                    color: loginType === opt.key ? '#FFFFFF' : textMuted,
                    fontFamily: ff,
                    fontWeight: loginType === opt.key ? 700 : 400,
                  }}
                  onClick={() => setLoginType(opt.key as 'employee' | 'broker')}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {loginType === 'employee' ? (
              <div className="space-y-4">
                {[
                  { id: 'email', label: isAr ? 'البريد الإلكتروني' : 'Work Email', type: 'email', placeholder: 'your.name@gig.com.jo', defaultValue: 'ahmed.rashidi@gig.com.jo' },
                ].map(field => (
                  <div key={field.id}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textBody, marginBottom: '6px', fontFamily: ff }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                      style={{ background: inputBg, borderColor: inputBdr, color: panelText, fontSize: '14px', fontFamily: ff }}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                      onFocus={e => { e.currentTarget.style.borderColor = B.indigo; }}
                      onBlur={e => { e.currentTarget.style.borderColor = inputBdr; }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textBody, marginBottom: '6px', fontFamily: ff }}>
                    {isAr ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                      style={{ background: inputBg, borderColor: inputBdr, color: panelText, fontSize: '14px', paddingRight: '44px', fontFamily: ff }}
                      placeholder="••••••••••"
                      defaultValue="password123"
                      onFocus={e => { e.currentTarget.style.borderColor = B.indigo; }}
                      onBlur={e => { e.currentTarget.style.borderColor = inputBdr; }}
                    />
                    <button
                      className="absolute end-3 top-1/2 -translate-y-1/2"
                      style={{ color: textMuted }}
                      onClick={() => setShowPass(p => !p)}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  className="w-full py-3 rounded-lg text-white font-bold uppercase tracking-wider transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    background: B.indigo,
                    boxShadow: `0 4px 16px rgba(25,5,140,0.35)`,
                    fontSize: '13px', letterSpacing: '0.06em', fontFamily: ff,
                  }}
                  onClick={handleEmployeeLogin}
                >
                  <Shield size={15} />
                  {isAr ? 'الدخول عبر Active Directory' : 'Sign in via Active Directory'}
                </button>
                <p className="text-center" style={{ fontSize: '11px', color: textMuted, fontFamily: ff }}>
                  {isAr ? 'يتطلب VPN الشبكة الداخلية' : 'Requires GIG internal network VPN'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { provider: 'google', label: isAr ? 'الدخول بـ Google' : 'Sign in with Google', Icon: Globe2, filled: false },
                  { provider: 'microsoft', label: isAr ? 'الدخول بـ Microsoft' : 'Sign in with Microsoft', Icon: Grid3X3, filled: false },
                  { provider: 'apple', label: isAr ? 'الدخول بـ Apple' : 'Sign in with Apple', Icon: Monitor, filled: false },
                  { provider: 'otp', label: isAr ? 'الدخول بـ OTP البريد' : 'Sign in with Email OTP', Icon: Mail, filled: true },
                ].map((btn) => (
                  <button
                    key={btn.provider}
                    className="w-full py-3 rounded-lg border font-medium transition-all hover:opacity-90 flex items-center justify-center gap-3"
                    style={{
                      background: btn.filled ? B.roseGold : inputBg,
                      borderColor: btn.filled ? B.roseGold : inputBdr,
                      color: btn.filled ? '#FFFFFF' : panelText,
                      fontSize: '14px',
                      fontFamily: ff,
                      boxShadow: btn.filled ? `0 4px 16px rgba(210,140,100,0.35)` : 'none',
                    }}
                    onClick={() => btn.provider === 'otp' ? handleBrokerOTP() : handleSocialLogin()}
                  >
                    <btn.Icon size={15} />
                    {btn.label}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-7 pt-5 text-center" style={{ borderTop: `1px solid ${inputBdr}` }}>
              <p style={{ fontSize: '12px', color: textMuted, fontFamily: ff }}>
                {isAr ? 'للوسطاء والوكلاء المعتمدين فقط' : 'For authorized brokers and agents only'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}