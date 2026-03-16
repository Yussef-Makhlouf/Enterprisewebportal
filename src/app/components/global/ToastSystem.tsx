import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const TOAST_CONFIG = {
  success: { icon: CheckCircle, color: '#00C896', borderColor: '#00C896', bg: { dark: 'rgba(0,200,150,0.08)', light: 'rgba(0,200,150,0.06)' } },
  warning: { icon: AlertTriangle, color: '#F0B030', borderColor: '#F0B030', bg: { dark: 'rgba(240,176,48,0.08)', light: 'rgba(240,176,48,0.06)' } },
  error: { icon: XCircle, color: '#FF4060', borderColor: '#FF4060', bg: { dark: 'rgba(255,64,96,0.08)', light: 'rgba(255,64,96,0.06)' } },
  info: { icon: Info, color: '#0DB4CC', borderColor: '#0DB4CC', bg: { dark: 'rgba(13,180,204,0.08)', light: 'rgba(13,180,204,0.06)' } },
};

function ToastItem({ toast, onRemove }: { toast: any; onRemove: () => void }) {
  const { theme } = useApp();
  const [progress, setProgress] = useState(100);
  const config = TOAST_CONFIG[toast.type as keyof typeof TOAST_CONFIG] || TOAST_CONFIG.info;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p <= 0) { clearInterval(interval); return 0; }
        return p - 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-2xl"
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderLeft: `3px solid ${config.borderColor}`,
        minWidth: '320px',
        maxWidth: '380px',
      }}
    >
      <div className="flex items-start gap-3 p-4">
        <config.icon size={18} style={{ color: config.color, flexShrink: 0, marginTop: '1px' }} />
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{toast.title}</p>
          {toast.description && (
            <p style={{ fontSize: '12px', color: textSecondary, marginTop: '2px' }}>{toast.description}</p>
          )}
        </div>
        <button onClick={onRemove} className="p-0.5 rounded hover:opacity-70 transition-opacity"
          style={{ color: textSecondary, flexShrink: 0 }}>
          <X size={14} />
        </button>
      </div>
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#E4EAF3' }}>
        <div className="h-full transition-all duration-100"
          style={{ width: `${progress}%`, background: config.color }} />
      </div>
    </div>
  );
}

export function ToastSystem() {
  const { toasts, removeToast, isRTL } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-50 flex flex-col gap-3"
      style={{
        bottom: '24px',
        right: isRTL ? 'auto' : '24px',
        left: isRTL ? '24px' : 'auto',
      }}
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}
