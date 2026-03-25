import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, FileText, Phone } from 'lucide-react';

/* use design-system amber/ocean, not red */
const WARN = '#D28C64';
const WARN_BG = 'rgba(210,140,100,0.12)';
const WARN_BDR = 'rgba(210,140,100,0.30)';

export function LicenseExpiredPage() {
  const { theme, language } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const bg            = theme === 'dark' ? '#1F0F4D' : '#F8F7FC';
  const cardBg        = theme === 'dark' ? 'linear-gradient(145deg, rgba(31,15,77,0.97) 0%, rgba(25,5,140,0.90) 100%)' : '#FFFFFF';
  const textPrimary   = theme === 'dark' ? '#FFFFFF'  : '#19058C';
  const textSecondary = theme === 'dark' ? 'rgba(255,255,255,0.60)' : '#3D3560';

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${theme === 'dark' ? 'dark' : ''}`}
      style={{ background: bg, fontFamily: "'Georama', Verdana, sans-serif" }}>
      <div className="w-full max-w-lg text-center">
        <div className="rounded-2xl p-10 shadow-2xl"
          style={{
            background: cardBg,
            border: `1px solid ${WARN_BDR}`,
            boxShadow: theme === 'dark' ? '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)' : '0 8px 40px rgba(25,5,140,0.10)',
          }}>

          {/* Warning Illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{ background: WARN_BG, border: `2px solid ${WARN_BDR}` }}>
                <AlertTriangle size={40} style={{ color: WARN }} />
              </div>
              <div className="absolute -top-2 -end-2 px-2 py-0.5 rounded-full text-white font-bold"
                style={{ background: WARN, fontSize: '11px', boxShadow: `0 0 12px ${WARN}80` }}>
                {isAr ? 'منتهي' : 'EXPIRED'}
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: WARN_BG, border: `1px solid ${WARN_BDR}` }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: WARN }} />
            <span className="font-bold tracking-widest" style={{ fontSize: '12px', color: WARN, letterSpacing: '0.15em' }}>
              {isAr ? 'الرخصة منتهية الصلاحية' : 'LICENSE EXPIRED'}
            </span>
          </div>

          {/* Broker Info */}
          <h2 className="font-bold mb-2" style={{ fontSize: '1.5rem', color: textPrimary }}>
            {isAr ? 'محمد عبد الله الزيادين' : 'Mohammad Abdullah Al-Ziyadeen'}
          </h2>
          <div className="font-mono font-medium mb-4" style={{ fontSize: '16px', color: WARN }}>
            LIC-2024-004821
          </div>

          {/* Expiry Date */}
          <div className="rounded-xl p-4 mb-6"
            style={{ background: WARN_BG, border: `1px solid ${WARN_BDR}` }}>
            <p style={{ fontSize: '13px', color: textSecondary }}>
              {isAr ? 'تاريخ انتهاء الصلاحية' : 'License Expiry Date'}
            </p>
            <p className="font-mono font-bold mt-1" style={{ fontSize: '1.5rem', color: WARN }}>
              31/12/2024
            </p>
          </div>

          {/* Message */}
          <p className="mb-8 leading-relaxed" style={{ fontSize: '14px', color: textSecondary }}>
            {isAr
              ? 'انتهت صلاحية رخصتك. يرجى رفع المستندات المطلوبة لاستعادة الوصول إلى البوابة.'
              : 'Your license has expired. Please upload new documents to restore your portal access.'}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              style={{
                background: `linear-gradient(135deg, ${WARN} 0%, #E8B98A 50%, ${WARN} 100%)`,
                boxShadow: `0 4px 20px rgba(210,140,100,0.40)`,
                fontSize: '15px'
              }}
              onClick={() => navigate('/auth/license-renewal')}
            >
              <FileText size={18} />
              {isAr ? 'تجديد الرخصة الآن' : 'Renew License Now'}
            </button>
            <button
              className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all border-2"
              style={{ borderColor: WARN, color: WARN, background: 'transparent', fontSize: '15px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = WARN_BG; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <Phone size={18} />
              {isAr ? 'التواصل مع دعم GIG' : 'Contact GIG Support'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
