import { useApp } from '../../context/AppContext';
import { AlertTriangle, AlertOctagon } from 'lucide-react';
import { B, cardBg, cardBdr, modalSdw, textHero, textMuted } from '../../utils/darkPalette';

interface Props {
  title: string;
  description: string;
  type?: 'warning' | 'destructive';
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({ title, description, type = 'warning', onClose, onConfirm }: Props) {
  const { theme, language } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  /* no red: destructive → roseGold, warning → ocean */
  const color   = type === 'destructive' ? B.roseGold : B.ocean;
  const bgColor = type === 'destructive' ? 'rgba(210,140,100,0.13)' : 'rgba(128,148,230,0.13)';
  const Icon    = type === 'destructive' ? AlertOctagon : AlertTriangle;

  const tH = textHero(isDark);
  const tM = textMuted(isDark);
  const bdr = cardBdr(isDark);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 rounded-2xl overflow-hidden"
        style={{
          maxWidth: '400px',
          background: cardBg(isDark),
          border: `1px solid ${bdr}`,
          boxShadow: modalSdw(isDark),
        }}>
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: bgColor }}>
            <Icon size={26} style={{ color }} />
          </div>
          <h3 className="font-bold mb-2" style={{ fontSize: '16px', color: tH }}>{title}</h3>
          <p style={{ fontSize: '13px', color: tM, lineHeight: '1.7' }}>{description}</p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            className="flex-1 py-2.5 rounded-xl border font-medium text-sm hover:opacity-80 transition-all"
            style={{ borderColor: bdr, color: tM }}
            onClick={onClose}
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90 transition-all"
            style={{ background: color, boxShadow: `0 2px 10px ${color}45` }}
            onClick={onConfirm}
          >
            {isAr ? 'تأكيد' : 'Confirm'}
          </button>
        </div>
      </div>
    </>
  );
}
