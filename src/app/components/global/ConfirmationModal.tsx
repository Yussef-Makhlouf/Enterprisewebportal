import { useApp } from '../../context/AppContext';
import { AlertTriangle, AlertOctagon } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  type?: 'warning' | 'destructive';
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({ title, description, type = 'warning', onClose, onConfirm }: Props) {
  const { theme, language } = useApp();
  const isAr = language === 'ar';

  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(13,31,60,0.1)';

  const color = type === 'destructive' ? '#FF4060' : '#F0B030';
  const bgColor = type === 'destructive' ? 'rgba(255,64,96,0.12)' : 'rgba(240,176,48,0.12)';
  const Icon = type === 'destructive' ? AlertOctagon : AlertTriangle;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxWidth: '400px', background: cardBg, border: `1px solid ${borderColor}` }}>
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: bgColor }}>
            <Icon size={26} style={{ color }} />
          </div>
          <h3 className="font-bold mb-2" style={{ fontSize: '16px', color: textPrimary }}>{title}</h3>
          <p style={{ fontSize: '13px', color: textSecondary, lineHeight: '1.6' }}>{description}</p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button className="flex-1 py-2.5 rounded-xl border font-medium text-sm hover:opacity-80"
            style={{ borderColor, color: textSecondary }} onClick={onClose}>
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90"
            style={{ background: color, boxShadow: `0 2px 10px ${color}50` }} onClick={onConfirm}>
            {isAr ? 'تأكيد' : 'Confirm'}
          </button>
        </div>
      </div>
    </>
  );
}
