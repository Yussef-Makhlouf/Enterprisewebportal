import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Search, UserPlus, CheckCircle2, ChevronDown } from 'lucide-react';
import { B, cardBg, cardBdr, cardSdw, inputBg, textHero, textBody, textMuted } from '../../utils/darkPalette';

/* ── AD user suggestions (simulated autocomplete) ─────── */
const AD_USERS = [
  { ad: 'nasser.ali@gigjo.com',     name: 'Nasser Ali',      nameAr: 'ناصر علي',      dept: 'Operations',  avatar: 'NA' },
  { ad: 'fatima.h@gigjo.com',       name: 'Fatima Hassan',   nameAr: 'فاطمة حسن',     dept: 'Underwriting', avatar: 'FH' },
  { ad: 'mohammed.a@gigjo.com',     name: 'Mohammed Amin',   nameAr: 'محمد أمين',     dept: 'IT',          avatar: 'MA' },
  { ad: 'reem.q@gigjo.com',         name: 'Reem Qasim',      nameAr: 'ريم قاسم',      dept: 'Finance',     avatar: 'RQ' },
  { ad: 'tariq.s@gigjo.com',        name: 'Tariq Salah',     nameAr: 'طارق صلاح',     dept: 'Claims',      avatar: 'TS' },
];

const ROLES = [
  { value: 'super-admin',  label: 'Super Admin',       labelAr: 'مدير عام' },
  { value: 'admin-user',   label: 'Admin User',        labelAr: 'مستخدم مدير' },
  { value: 'viewer',       label: 'Viewer (Read Only)', labelAr: 'مشاهد فقط' },
  { value: 'audit-admin',  label: 'Audit Admin',        labelAr: 'مدير التدقيق' },
];

interface Props {
  onClose: () => void;
  onSave: () => void;
}

export function AddGIGUserModal({ onClose, onSave }: Props) {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const cBg  = cardBg(isDark);
  const bdr  = cardBdr(isDark);
  const iInBg = inputBg(isDark);
  const tH   = textHero(isDark);
  const tM   = textMuted(isDark);
  const ff   = isAr ? "'Almarai', Tahoma, sans-serif"  : "'Georama', Verdana, sans-serif";
  const ffH  = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Reforma', Verdana, sans-serif";

  const [query, setQuery] = useState('');
  const [showSug, setShowSug] = useState(false);
  const [selected, setSelected] = useState<typeof AD_USERS[0] | null>(null);
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const suggestions = AD_USERS.filter(u =>
    query.length >= 2 && (
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.ad.toLowerCase().includes(query.toLowerCase()) ||
      (isAr && u.nameAr.includes(query))
    )
  );

  const selectUser = (u: typeof AD_USERS[0]) => {
    setSelected(u);
    setQuery(u.ad);
    setShowSug(false);
    setErrors(e => ({ ...e, user: false }));
  };

  const handleSave = () => {
    const e: Record<string, boolean> = {};
    if (!selected) e.user = true;
    if (!role) e.role = true;
    if (Object.keys(e).length) { setErrors(e); return; }
    addToast({ type: 'success', title: isAr ? 'تمت إضافة المستخدم بنجاح' : 'GIG User added successfully' });
    onSave();
  };

  const inputStyle = (errKey: string) => ({
    background: iInBg,
    borderColor: errors[errKey] ? B.roseGold : bdr,
    color: tH,
    fontFamily: ff,
  });

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full overflow-hidden"
        style={{
          maxWidth: '520px',
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
              <UserPlus size={16} style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: ffH, fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                {isAr ? 'إضافة مستخدم GIG' : 'Add GIG User'}
              </h2>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px', fontFamily: ff }}>
                {isAr ? 'البحث في Active Directory وتعيين دور' : 'Search Active Directory and assign a role'}
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

          {/* AD Search */}
          <div>
            <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 600, color: tM, fontFamily: ff }}>
              {isAr ? 'البحث في Active Directory *' : 'Search Active Directory *'}
            </label>
            <div className="relative">
              <Search size={14} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} style={{ color: tM }} />
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSug(true); if (!e.target.value) setSelected(null); }}
                onFocus={() => setShowSug(true)}
                className="w-full rounded-lg border py-2.5 text-sm outline-none transition-all"
                style={{
                  ...inputStyle('user'),
                  paddingLeft: isRTL ? '12px' : '36px',
                  paddingRight: isRTL ? '36px' : '12px',
                }}
                placeholder={isAr ? 'ابحث بالاسم أو البريد...' : 'Search by name or email...'}
              />
              {/* Suggestions dropdown */}
              {showSug && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-10"
                  style={{ background: isDark ? '#1A2D4A' : '#FFFFFF', border: `1px solid ${bdr}`, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                  {suggestions.map(u => (
                    <button key={u.ad} onMouseDown={() => selectUser(u)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all hover:opacity-80"
                      style={{ background: 'transparent', textAlign: isRTL ? 'right' : 'left' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: `linear-gradient(135deg, ${B.indigo}, ${B.ocean})` }}>
                        {u.avatar}
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: tH, fontFamily: ff }}>
                          {isAr ? u.nameAr : u.name}
                        </p>
                        <p style={{ fontSize: '11px', color: tM, fontFamily: ff }}>{u.ad} · {u.dept}</p>
                      </div>
                      {selected?.ad === u.ad && (
                        <CheckCircle2 size={14} style={{ color: B.seafoam, marginLeft: 'auto' }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.user && <p style={{ fontSize: '11px', color: B.roseGold, marginTop: '3px', fontFamily: ff }}>
              {isAr ? 'يرجى البحث عن مستخدم وتحديده' : 'Please search and select a user'}
            </p>}
          </div>

          {/* Auto-filled info (shown once user selected) */}
          {selected && (
            <div className="rounded-xl p-4 flex items-center gap-4"
              style={{ background: isDark ? 'rgba(128,148,230,0.08)' : 'rgba(25,5,140,0.04)', border: `1px solid ${B.ocean}25` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                style={{ background: `linear-gradient(135deg, ${B.indigo}, ${B.ocean})`, fontSize: '13px' }}>
                {selected.avatar}
              </div>
              <div className="flex-1">
                <p style={{ fontSize: '13px', fontWeight: 700, color: tH, fontFamily: ff }}>{isAr ? selected.nameAr : selected.name}</p>
                <p style={{ fontSize: '11px', color: tM, fontFamily: ff }}>{selected.ad}</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg"
                style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', background: `${B.ocean}14`, color: isDark ? B.ocean : B.indigo, border: `1px solid ${B.ocean}25` }}>
                {selected.dept}
              </span>
            </div>
          )}

          {/* Role Assignment */}
          <div>
            <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 600, color: tM, fontFamily: ff }}>
              {isAr ? 'تعيين الدور *' : 'Assign Role *'}
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={e => { setRole(e.target.value); setErrors(prev => ({ ...prev, role: false })); }}
                className="w-full appearance-none rounded-lg border py-2.5 px-3 text-sm outline-none"
                style={inputStyle('role')}
              >
                <option value="">{isAr ? '— اختر دوراً —' : '— Select a role —'}</option>
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>{isAr ? r.labelAr : r.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 pointer-events-none`} style={{ color: tM }} />
            </div>
            {errors.role && <p style={{ fontSize: '11px', color: B.roseGold, marginTop: '3px', fontFamily: ff }}>
              {isAr ? 'يرجى اختيار دور' : 'Please select a role'}
            </p>}
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
          <button onClick={handleSave}
            className="px-6 py-2 rounded-lg text-white text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
            style={{ background: B.indigo, boxShadow: '0 3px 14px rgba(25,5,140,0.30)', fontFamily: ff }}>
            <UserPlus size={14} />
            {isAr ? 'إضافة المستخدم' : 'Add User'}
          </button>
        </div>
      </div>
    </>
  );
}
