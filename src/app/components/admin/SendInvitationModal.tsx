import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  broker: any;
  onClose: () => void;
  onSend: () => void;
}

export function SendInvitationModal({ broker, onClose, onSend }: Props) {
  const { theme, language, isRTL } = useApp();
  const isAr = language === 'ar';
  const [emailLang, setEmailLang] = useState<'en' | 'ar'>('en');
  const [previewOpen, setPreviewOpen] = useState(false);

  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(13,31,60,0.1)';

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: cardBg, border: `1px solid ${borderColor}` }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.25)' }}>
              <Send size={18} style={{ color: '#C8102E' }} />
            </div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'إرسال دعوة البوابة' : 'Send Portal Invitation'}
            </h2>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all" onClick={onClose}
            style={{ color: textSecondary }}>
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Info Card */}
          <div className="rounded-xl p-4 space-y-3"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB', border: `1px solid ${borderColor}` }}>
            {[
              { label: isAr ? 'إلى' : 'To', value: (isAr ? broker.nameAr : broker.name) + ' · ' + broker.email },
              { label: isAr ? 'الصلاحية' : 'Validity', value: isAr ? '72 ساعة' : '72 hours' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center">
                <span style={{ fontSize: '12px', color: textSecondary }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <span style={{ fontSize: '12px', color: textSecondary }}>{isAr ? 'اللغة' : 'Language'}</span>
              <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: borderColor }}>
                {['en', 'ar'].map(lang => (
                  <button
                    key={lang}
                    className="px-3 py-1 rounded-md text-xs font-medium transition-all"
                    style={{
                      background: emailLang === lang ? '#C8102E' : 'transparent',
                      color: emailLang === lang ? '#fff' : textSecondary
                    }}
                    onClick={() => setEmailLang(lang as 'en' | 'ar')}
                  >
                    {lang === 'en' ? 'English' : 'العربية'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl overflow-hidden border" style={{ borderColor }}>
            <button
              className="w-full flex items-center justify-between px-4 py-3 hover:opacity-80 transition-all"
              style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}
              onClick={() => setPreviewOpen(p => !p)}
            >
              <span style={{ fontSize: '13px', color: textSecondary }}>
                {isAr ? 'معاينة البريد الإلكتروني' : 'Preview Invitation Email'}
              </span>
              {previewOpen ? <ChevronUp size={16} style={{ color: textSecondary }} /> : <ChevronDown size={16} style={{ color: textSecondary }} />}
            </button>
            {previewOpen && (
              <div className="p-4 border-t" style={{ borderColor }}>
                <div className="rounded-lg p-4"
                  style={{ background: theme === 'dark' ? '#0A1628' : '#F0F4FA', fontSize: '12px', color: textSecondary, lineHeight: '1.7' }}>
                  <p style={{ color: textPrimary, fontWeight: 600, marginBottom: '8px' }}>
                    {emailLang === 'en' ? 'GIG Jordan Broker Portal — Invitation' : 'بوابة وسطاء جي آي جي الأردن — دعوة'}
                  </p>
                  {emailLang === 'en' ? (
                    <>
                      <p>Dear {broker.name},</p>
                      <p className="mt-2">You have been invited to access the GIG Jordan Agents & Brokers Portal. This invitation is valid for 72 hours.</p>
                      <p className="mt-2 font-mono" style={{ color: '#C8102E' }}>Click here to activate your account →</p>
                    </>
                  ) : (
                    <div dir="rtl">
                      <p>عزيزي {broker.nameAr}،</p>
                      <p className="mt-2">لقد تمت دعوتك للوصول إلى بوابة وسطاء جي آي جي الأردن. هذه الدعوة صالحة لمدة 72 ساعة.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-3 rounded-xl"
            style={{ background: 'rgba(240,176,48,0.08)', border: '1px solid rgba(240,176,48,0.25)' }}>
            <AlertTriangle size={16} style={{ color: '#F0B030', marginTop: '1px', flexShrink: 0 }} />
            <p style={{ fontSize: '12px', color: textSecondary, lineHeight: '1.6' }}>
              {isAr ? 'سيتم إلغاء تفعيل الدعوة السابقة تلقائياً' : 'Previous invitation will be automatically deactivated'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t" style={{ borderColor }}>
          <button
            className="flex-1 py-2.5 rounded-xl border font-medium text-sm transition-all hover:opacity-80"
            style={{ borderColor, color: textSecondary }}
            onClick={onClose}
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #C8102E, #A00D25)', boxShadow: '0 2px 12px rgba(200,16,46,0.3)' }}
            onClick={onSend}
          >
            <Send size={15} />
            {isAr ? 'إرسال الدعوة' : 'Send Invitation Now'}
          </button>
        </div>
      </div>
    </>
  );
}
