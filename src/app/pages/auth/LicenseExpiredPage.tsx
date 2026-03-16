import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, FileText, Phone } from 'lucide-react';

export function LicenseExpiredPage() {
  const { theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${theme === 'dark' ? 'dark' : ''}`}
      style={{ background: bg, fontFamily: isAr ? "'Tajawal', sans-serif" : "'IBM Plex Sans', sans-serif" }}>
      <div className="w-full max-w-lg text-center">
        <div className="rounded-2xl p-10 shadow-2xl"
          style={{ background: cardBg, border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)'}` }}>

          {/* Warning Illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 64, 96, 0.1)',
                  border: '2px solid rgba(255, 64, 96, 0.3)',
                  animation: 'pulse 2s infinite'
                }}>
                <AlertTriangle size={40} style={{ color: '#FF4060' }} />
              </div>
              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-white font-bold"
                style={{
                  background: '#FF4060',
                  fontSize: '11px',
                  animation: 'pulse 1.5s infinite',
                  boxShadow: '0 0 12px rgba(255,64,96,0.6)'
                }}>
                {isAr ? 'منتهي' : 'EXPIRED'}
              </div>
            </div>
          </div>

          {/* Red Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(200,16,46,0.15)',
              border: '1px solid rgba(200,16,46,0.4)',
              animation: 'pulse 2s infinite'
            }}>
            <div className="w-2 h-2 rounded-full" style={{ background: '#C8102E', animation: 'pulse 1s infinite' }} />
            <span className="font-bold tracking-widest" style={{ fontSize: '12px', color: '#C8102E', letterSpacing: '0.15em' }}>
              {isAr ? 'الرخصة منتهية الصلاحية' : 'LICENSE EXPIRED'}
            </span>
          </div>

          {/* Broker Info */}
          <h2 className="font-bold mb-2" style={{ fontSize: '1.5rem', color: textPrimary }}>
            {isAr ? 'محمد عبد الله الزيادين' : 'Mohammad Abdullah Al-Ziyadeen'}
          </h2>
          <div className="font-mono font-medium mb-4" style={{ fontSize: '16px', color: '#C8102E' }}>
            LIC-2024-004821
          </div>

          {/* Expiry Date */}
          <div className="rounded-xl p-4 mb-6"
            style={{ background: theme === 'dark' ? 'rgba(200,16,46,0.08)' : 'rgba(200,16,46,0.04)', border: '1px solid rgba(200,16,46,0.2)' }}>
            <p style={{ fontSize: '13px', color: textSecondary }}>
              {isAr ? 'تاريخ انتهاء الصلاحية' : 'License Expiry Date'}
            </p>
            <p className="font-mono font-bold mt-1" style={{ fontSize: '1.5rem', color: '#FF4060' }}>
              31/12/2024
            </p>
          </div>

          {/* Message */}
          <p className="mb-8 leading-relaxed" style={{ fontSize: '14px', color: textSecondary }}>
            {isAr
              ? 'انتهت صلاحية رخصتك. يرجى رفع المستندات المطلوبة لاستعادة الوصول إلى البوابة.'
              : 'Your license has expired. Please upload new documents to restore your portal access.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              style={{
                background: 'linear-gradient(135deg, #C8102E, #A00D25)',
                boxShadow: '0 4px 20px rgba(200,16,46,0.35)',
                fontSize: '15px'
              }}
              onClick={() => navigate('/auth/license-renewal')}
            >
              <FileText size={18} />
              {isAr ? 'تجديد الرخصة الآن' : 'Renew License Now'}
            </button>
            <button
              className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all border-2"
              style={{
                borderColor: '#C8102E',
                color: '#C8102E',
                background: 'transparent',
                fontSize: '15px'
              }}
            >
              <Phone size={18} />
              {isAr ? 'التواصل مع دعم GIG' : 'Contact GIG Support'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
