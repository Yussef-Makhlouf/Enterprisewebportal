import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const TOAST_CONFIG = {
  success: { icon: CheckCircle, color: '#6BCABA', borderColor: '#6BCABA', bg: { dark: 'rgba(107,202,186,0.08)', light: 'rgba(107,202,186,0.06)' } },
  warning: { icon: AlertTriangle, color: '#D28C64', borderColor: '#D28C64', bg: { dark: 'rgba(210,140,100,0.08)', light: 'rgba(210,140,100,0.06)' } },
  error:   { icon: XCircle,      color: '#D28C64', borderColor: '#D28C64', bg: { dark: 'rgba(210,140,100,0.08)', light: 'rgba(210,140,100,0.06)' } },
  info:    { icon: Info,         color: '#8094E6', borderColor: '#8094E6', bg: { dark: 'rgba(128,148,230,0.08)', light: 'rgba(128,148,230,0.06)' } },
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

  const cardBg       = theme === 'dark' ? 'rgba(25,5,140,0.75)' : '#FFFFFF';
  const textPrimary  = theme === 'dark' ? '#FFFFFF'              : '#19058C';
  const textSecondary = theme === 'dark' ? 'rgba(255,255,255,0.60)' : '#3D3560';
  const borderColor  = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(25,5,140,0.10)';

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