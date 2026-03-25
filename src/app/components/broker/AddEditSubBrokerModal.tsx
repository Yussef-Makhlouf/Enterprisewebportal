import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Edit2, BadgeCheck } from 'lucide-react';
import { B, cardBg, cardBdr, inputBg, textHero, textMuted } from '../../utils/darkPalette';

type Mode = 'add' | 'edit';

interface SubBroker {
  id?: number;
  firstNameAr: string; secondNameAr: string; thirdNameAr: string; lastNameAr: string;
  firstNameEn: string; secondNameEn: string; thirdNameEn: string; lastNameEn: string;
  email: string; mobile: string;
  gender: 'Male' | 'Female';
  nationalId: string;
}

interface Props {
  mode: Mode;
  initial?: Partial<SubBroker>;
  /** Inherited (read-only) fields from parent broker */
  inherited?: { lobs: string[]; licenseExpiry: string; commissionPct: string };
  onClose: () => void;
  onSave: (data: SubBroker) => void;
}

const EMPTY: SubBroker = {
  firstNameAr: '', secondNameAr: '', thirdNameAr: '', lastNameAr: '',
  firstNameEn: '', secondNameEn: '', thirdNameEn: '', lastNameEn: '',
  email: '', mobile: '', gender: 'Male', nationalId: '',
};

const LOB_COLORS: Record<string, string> = {
  Travel: B.indigo, Motor: B.ocean, Medical: B.seafoam, Home: '#FF7366', Domestic: B.roseGold,
};

export function AddEditSubBrokerModal({ mode, initial, inherited, onClose, onSave }: Props) {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const cBg   = cardBg(isDark);
  const bdr   = cardBdr(isDark);
  const iInBg = inputBg(isDark);
  const tH    = textHero(isDark);
  const tM    = textMuted(isDark);
  const ff    = isAr ? "'Almarai', Tahoma, sans-serif"  : "'Georama', Verdana, sans-serif";
  const ffH   = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Reforma', Verdana, sans-serif";
  const ffM   = "'IBM Plex Mono', monospace";

  const defaultLobs = inherited?.lobs ?? ['Travel', 'Motor'];

  const [form, setForm] = useState<SubBroker>({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (field: keyof SubBroker) => (v: string) =>
    setForm(p => ({ ...p, [field]: v }));

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.firstNameAr.trim()) e.firstNameAr = true;
    if (!form.lastNameAr.trim())  e.lastNameAr  = true;
    if (!form.firstNameEn.trim()) e.firstNameEn = true;
    if (!form.lastNameEn.trim())  e.lastNameEn  = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.mobile.trim()) e.mobile = true;
    if (form.nationalId.replace(/\D/g, '').length < 9) e.nationalId = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    addToast({ type: 'success', title: isAr ? (mode === 'add' ? 'تمت الإضافة بنجاح' : 'تم التحديث بنجاح') : (mode === 'add' ? 'Sub-Broker added' : 'Sub-Broker updated') });
  };

  /* ── Reusable field components ── */
  const Field = ({ label, field, placeholder = '', type = 'text', mono = false, dir }: {
    label: string; field: keyof SubBroker; placeholder?: string; type?: string; mono?: boolean; dir?: string;
  }) => (
    <div>
      <label className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: tM, fontFamily: ff }}>
        {label}
      </label>
      <input
        type={type}
        value={String(form[field])}
        onChange={e => set(field)(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all"
        style={{
          background: iInBg,
          borderColor: errors[field] ? B.roseGold : bdr,
          color: tH,
          fontFamily: mono ? ffM : ff,
        }}
        onFocus={e => { e.target.style.borderColor = B.ocean; }}
        onBlur={e => { e.target.style.borderColor = errors[field] ? B.roseGold : bdr; }}
      />
      {errors[field] && (
        <p style={{ fontSize: '10px', color: B.roseGold, marginTop: '2px', fontFamily: ff }}>
          {isAr ? 'هذا الحقل مطلوب' : 'Required'}
        </p>
      )}
    </div>
  );

  const SectionHeader = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2 mt-3 mb-2">
      <div style={{ width: '16px', height: '2px', background: B.roseGold, borderRadius: '1px', flexShrink: 0 }} />
      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: B.ocean, fontFamily: ff }}>
        {label}
      </p>
      <div style={{ flex: 1, height: '1px', background: bdr }} />
    </div>
  );

  const ReadOnlyField = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
    <div>
      <label className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: tM, fontFamily: ff }}>{label}</label>
      <div className="px-3 py-2 rounded-lg"
        style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F0F0F7', border: `1px solid ${bdr}`, opacity: 0.7 }}>
        <span style={{ fontSize: '12px', color: tH, fontFamily: mono ? ffM : ff }}>{value}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full overflow-hidden"
        style={{
          maxWidth: '860px',
          background: cBg,
          border: `1px solid ${bdr}`,
          boxShadow: isDark
            ? '0 24px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(128,148,230,0.12)'
            : '0 8px 40px rgba(25,5,140,0.12)',
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
              {mode === 'add' ? <Plus size={16} style={{ color: '#FFFFFF' }} /> : <Edit2 size={16} style={{ color: '#FFFFFF' }} />}
            </div>
            <div>
              <h2 style={{ fontFamily: ffH, fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                {mode === 'add'
                  ? (isAr ? 'إضافة وسيط فرعي جديد' : 'Add New Sub-Broker')
                  : (isAr ? 'تعديل بيانات الوسيط الفرعي' : 'Edit Sub-Broker')}
              </h2>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px', fontFamily: ff }}>
                {isAr ? 'يرث خطوط الأعمال وصلاحياتك تلقائياً' : 'Inherits your LOBs & permissions automatically'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-all hover:bg-white/15"
            style={{ color: 'rgba(255,255,255,0.65)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 160px)' }}>
          <div className="flex flex-col gap-1" style={{ fontFamily: ff }}>

            {/* Arabic Name */}
            <SectionHeader label={isAr ? 'الاسم بالعربية' : 'Arabic Name'} />
            <div className="grid grid-cols-4 gap-3">
              <Field label={isAr ? 'الأول *' : 'First *'}         field="firstNameAr"  placeholder="عامر"  dir="rtl" />
              <Field label={isAr ? 'الثاني' : 'Second'}           field="secondNameAr" placeholder="غانم"  dir="rtl" />
              <Field label={isAr ? 'الثالث' : 'Third'}            field="thirdNameAr"  placeholder="عيسى"  dir="rtl" />
              <Field label={isAr ? 'اسم العائلة *' : 'Last *'}    field="lastNameAr"   placeholder="حداد"  dir="rtl" />
            </div>

            {/* English Name */}
            <SectionHeader label={isAr ? 'الاسم بالإنجليزية' : 'English Name'} />
            <div className="grid grid-cols-4 gap-3">
              <Field label={isAr ? 'الأول *' : 'First *'}         field="firstNameEn"  placeholder="Amer" />
              <Field label={isAr ? 'الثاني' : 'Second'}           field="secondNameEn" placeholder="Ghanim" />
              <Field label={isAr ? 'الثالث' : 'Third'}            field="thirdNameEn"  placeholder="Issa" />
              <Field label={isAr ? 'اسم العائلة *' : 'Last *'}    field="lastNameEn"   placeholder="Haddad" />
            </div>

            {/* Contact */}
            <SectionHeader label={isAr ? 'بيانات الاتصال' : 'Contact Details'} />
            <div className="grid grid-cols-3 gap-3">
              <Field label={isAr ? 'البريد الإلكتروني *' : 'Email *'} field="email" type="email" placeholder="name@email.com" />
              <Field label={isAr ? 'رقم الهاتف *' : 'Mobile *'}       field="mobile" placeholder="07XXXXXXXXX" mono />
              <div>
                <label className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: tM, fontFamily: ff }}>
                  {isAr ? 'الجنس' : 'Gender'}
                </label>
                <select
                  value={form.gender}
                  onChange={e => set('gender')(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ background: iInBg, borderColor: bdr, color: tH, fontFamily: ff }}
                >
                  <option value="Male">{isAr ? 'ذكر' : 'Male'}</option>
                  <option value="Female">{isAr ? 'أنثى' : 'Female'}</option>
                </select>
              </div>
            </div>

            {/* Identity */}
            <SectionHeader label={isAr ? 'الهوية الوطنية' : 'National Identity'} />
            <div className="grid grid-cols-2 gap-3">
              <Field label={isAr ? 'رقم الهوية الوطنية *' : 'National ID *'} field="nationalId" placeholder="9921000955" mono />
            </div>

            {/* Inherited read-only section */}
            {inherited && (
              <>
                <SectionHeader label={isAr ? 'الحقول الموروثة (للقراءة فقط)' : 'Inherited Fields (read-only)'} />
                <div className="grid grid-cols-3 gap-3">
                  <ReadOnlyField label={isAr ? 'انتهاء الرخصة' : 'License Expiry'} value={inherited.licenseExpiry} mono />
                  <ReadOnlyField label={isAr ? 'نسبة العمولة' : 'Commission %'} value={`${inherited.commissionPct}%`} mono />
                  <div>
                    <label className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: tM, fontFamily: ff }}>
                      {isAr ? 'خطوط الأعمال الموروثة' : 'Inherited LOBs'}
                    </label>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {inherited.lobs.map(lob => (
                        <span key={lob} className="px-2.5 py-1 rounded-md text-white"
                          style={{ fontSize: '10px', fontWeight: 700, background: LOB_COLORS[lob] ?? B.ocean }}>
                          {lob}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t"
          style={{ borderColor: bdr, background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(25,5,140,0.02)' }}>
          <button onClick={onClose}
            className="px-5 py-2 rounded-lg border text-sm font-medium hover:opacity-80 transition-all"
            style={{ borderColor: bdr, color: tM, fontFamily: ff }}>
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button onClick={handleSave}
            className="px-7 py-2 rounded-lg text-white text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
            style={{
              background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`,
              boxShadow: '0 3px 14px rgba(210,140,100,0.35)',
              fontFamily: ff,
            }}
          >
            <BadgeCheck size={15} />
            {mode === 'add' ? (isAr ? 'إضافة الوسيط' : 'Add Sub-Broker') : (isAr ? 'حفظ التغييرات' : 'Save Changes')}
          </button>
        </div>
      </div>
    </>
  );
}
