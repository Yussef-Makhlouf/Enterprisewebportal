import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ChevronDown, UserCog, AlertTriangle } from 'lucide-react';
import { B, cardBg, cardBdr, inputBg, textHero, textBody, textMuted } from '../../utils/darkPalette';

const ROLES = [
  { value: 'broker',       label: 'Broker',           labelAr: 'وسيط' },
  { value: 'agent',        label: 'Agent',             labelAr: 'وكيل' },
  { value: 'multi-line',   label: 'Multi-Line Broker', labelAr: 'وسيط متعدد الخطوط' },
  { value: 'sub-broker',   label: 'Sub-Broker',        labelAr: 'وسيط فرعي' },
];

interface Broker {
  id: number;
  name: string;
  nameAr: string;
  email: string;
  type: string;
  typeAr: string;
  avatar: string;
  status: string;
}

interface Props {
  broker: Broker;
  onClose: () => void;
  onSave: () => void;
}

export function ChangeBrokerRoleModal({ broker, onClose, onSave }: Props) {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const cBg   = cardBg(isDark);
  const bdr   = cardBdr(isDark);
  const iInBg = inputBg(isDark);
  const tH    = textHero(isDark);
  const tB    = textBody(isDark);
  const tM    = textMuted(isDark);
  const ff    = isAr ? "'Almarai', Tahoma, sans-serif"  : "'Georama', Verdana, sans-serif";
  const ffH   = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Reforma', Verdana, sans-serif";
  const ffM   = "'IBM Plex Mono', monospace";

  const currentRole = ROLES.find(r => r.label === broker.type || r.labelAr === broker.typeAr) ?? ROLES[0];
  const [newRole, setNewRole] = useState(currentRole.value);
  const [notes, setNotes] = useState('');
  const hasChanged = newRole !== currentRole.value;

  const handleSave = () => {
    addToast({ type: 'success', title: isAr ? 'تم تغيير دور الوسيط بنجاح' : `Role changed to ${ROLES.find(r => r.value === newRole)?.label}` });
    onSave();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full overflow-hidden"
        style={{
          maxWidth: '460px',
          background: cBg,
          border: `1px solid ${bdr}`,
          boxShadow: isDark
            ? '0 24px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(128,148,230,0.12)'
            : '0 8px 40px rgba(25,5,140,0.14)',
          borderRadius: '0px 16px 0px 16px',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4"
          style={{ background: `linear-gradient(135deg, ${B.indigo} 0%, #2D1FAA 100%)` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.12)' }}>
              <UserCog size={16} style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: ffH, fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                {isAr ? 'تغيير دور الوسيط' : 'Change Broker Role'}
              </h2>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px', fontFamily: ff }}>
                {isAr ? 'يسري التغيير فوراً' : 'Change takes effect immediately'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-all hover:bg-white/15"
            style={{ color: 'rgba(255,255,255,0.65)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">

          {/* Broker mini-card */}
          <div className="flex items-center gap-3 p-4 rounded-xl"
            style={{ background: isDark ? 'rgba(128,148,230,0.07)' : 'rgba(25,5,140,0.04)', border: `1px solid ${B.ocean}20` }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
              style={{ background: `linear-gradient(135deg, ${B.indigo}, ${B.ocean})`, fontSize: '13px' }}>
              {broker.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: '13px', fontWeight: 700, color: tH, fontFamily: ff }}>{isAr ? broker.nameAr : broker.name}</p>
              <p style={{ fontSize: '11px', color: tM, fontFamily: ff, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{broker.email}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full shrink-0"
              style={{ fontSize: '10px', fontWeight: 700, background: 'rgba(107,202,186,0.14)', color: B.seafoam }}>
              {isAr ? 'نشط' : 'Active'}
            </span>
          </div>

          {/* Current vs new role */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F8F7FC', border: `1px solid ${bdr}` }}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: tM, letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: ff, marginBottom: '6px' }}>
                {isAr ? 'الدور الحالي' : 'Current Role'}
              </p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: tB, fontFamily: ff }}>
                {isAr ? currentRole.labelAr : currentRole.label}
              </p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: hasChanged ? `${B.ocean}08` : isDark ? 'rgba(255,255,255,0.03)' : '#F8F7FC', border: `1px solid ${hasChanged ? `${B.ocean}30` : bdr}` }}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: tM, letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: ff, marginBottom: '6px' }}>
                {isAr ? 'الدور الجديد' : 'New Role'}
              </p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: hasChanged ? (isDark ? B.ocean : B.indigo) : tB, fontFamily: ff }}>
                {isAr ? ROLES.find(r => r.value === newRole)?.labelAr : ROLES.find(r => r.value === newRole)?.label}
              </p>
            </div>
          </div>

          {/* Role select */}
          <div>
            <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 600, color: tM, fontFamily: ff }}>
              {isAr ? 'اختر الدور الجديد' : 'Select New Role'}
            </label>
            <div className="relative">
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                className="w-full appearance-none rounded-lg border py-2.5 px-3 text-sm outline-none"
                style={{ background: iInBg, borderColor: bdr, color: tH, fontFamily: ff }}
              >
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>{isAr ? r.labelAr : r.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 pointer-events-none`} style={{ color: tM }} />
            </div>
          </div>

          {/* Optional notes */}
          <div>
            <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 600, color: tM, fontFamily: ff }}>
              {isAr ? 'ملاحظات (اختياري)' : 'Notes (optional)'}
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              className="w-full rounded-lg border p-3 text-sm outline-none resize-none transition-all"
              style={{ background: iInBg, borderColor: bdr, color: tH, fontFamily: ff }}
              placeholder={isAr ? 'سبب التغيير...' : 'Reason for role change...'}
              onFocus={e => { e.target.style.borderColor = `${B.ocean}60`; }}
              onBlur={e => { e.target.style.borderColor = bdr; }}
            />
          </div>

          {/* Warning note */}
          <div className="flex items-start gap-2 p-3 rounded-xl"
            style={{ background: 'rgba(210,140,100,0.08)', border: '1px solid rgba(210,140,100,0.22)' }}>
            <AlertTriangle size={14} style={{ color: B.roseGold, marginTop: '1px', flexShrink: 0 }} />
            <p style={{ fontSize: '11px', color: tM, fontFamily: ff, lineHeight: '1.5' }}>
              {isAr
                ? 'سيُطبَّق هذا التغيير فوراً على حساب الوسيط ويؤثر على صلاحيات الوصول الخاصة به.'
                : 'This change will apply immediately and affect the broker\'s portal access permissions.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t"
          style={{ borderColor: bdr, background: isDark ? 'rgba(0,0,0,0.10)' : 'rgba(25,5,140,0.02)' }}>
          <button onClick={onClose}
            className="px-5 py-2 rounded-lg border text-sm font-medium hover:opacity-80 transition-all"
            style={{ borderColor: bdr, color: tM, fontFamily: ff }}>
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanged}
            className="px-6 py-2 rounded-lg text-white text-sm font-bold flex items-center gap-2 transition-all"
            style={{
              background: hasChanged ? B.indigo : (isDark ? 'rgba(128,148,230,0.20)' : '#D1D9E6'),
              boxShadow: hasChanged ? '0 3px 14px rgba(25,5,140,0.30)' : 'none',
              cursor: hasChanged ? 'pointer' : 'not-allowed',
              fontFamily: ff,
            }}
          >
            <UserCog size={14} />
            {isAr ? 'تطبيق التغيير' : 'Apply Change'}
          </button>
        </div>
      </div>
    </>
  );
}
