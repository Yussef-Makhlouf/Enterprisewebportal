import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus, Download, Search, Edit2, Trash2, X,
  ChevronLeft, ChevronRight, Users, UserCheck, UserX,
  Mail, Phone, BadgeCheck, CalendarDays,
} from 'lucide-react';
import { ConfirmationModal } from '../../components/global/ConfirmationModal';
import {
  B, cardBg, cardSdw, cardBdr, innerBg, innerBdr,
  textHero, textBody, textMuted, inputBg, STATUS,
} from '../../utils/darkPalette';

/* ─── Types ─────────────────────────────────────────────── */
interface SubBroker {
  id: number;
  firstNameAr: string; secondNameAr: string; thirdNameAr: string; lastNameAr: string;
  firstNameEn: string; secondNameEn: string; thirdNameEn: string; lastNameEn: string;
  email: string; mobile: string;
  gender: 'Male' | 'Female';
  nationalId: string;
  subBrokerStatus: 'Active' | 'Inactive' | 'Blocked';
  invitationStatus: 'Accepted' | 'Pending' | 'Expired';
  createdBy: string; creationDate: string; modifiedDate: string;
}

type FormData = Pick<SubBroker,
  'firstNameAr' | 'secondNameAr' | 'thirdNameAr' | 'lastNameAr' |
  'firstNameEn' | 'secondNameEn' | 'thirdNameEn' | 'lastNameEn' |
  'email' | 'mobile' | 'gender' | 'nationalId'
>;

const EMPTY_FORM: FormData = {
  firstNameAr: '', secondNameAr: '', thirdNameAr: '', lastNameAr: '',
  firstNameEn: '', secondNameEn: '', thirdNameEn: '', lastNameEn: '',
  email: '', mobile: '', gender: 'Male', nationalId: '',
};

const SEED: SubBroker[] = [
  {
    id: 1, firstNameAr: 'عامر', secondNameAr: 'غانم', thirdNameAr: 'عيسى', lastNameAr: 'حداد',
    firstNameEn: 'Amer', secondNameEn: 'Ghanim', thirdNameEn: 'Issa', lastNameEn: 'Haddad',
    email: 'xidoka5333@gamening.com', mobile: '0797871585', gender: 'Male', nationalId: '9921000955',
    subBrokerStatus: 'Active', invitationStatus: 'Accepted',
    createdBy: 'Admin', creationDate: '01/01/2025', modifiedDate: '10/03/2025',
  },
  {
    id: 2, firstNameAr: 'هبة', secondNameAr: 'سامي', thirdNameAr: 'نور', lastNameAr: 'كريمي',
    firstNameEn: 'Hiba', secondNameEn: 'Sami', thirdNameEn: 'Nour', lastNameEn: 'Karimi',
    email: 'h.karimi@gigjo.com', mobile: '0777456677', gender: 'Female', nationalId: '9812300441',
    subBrokerStatus: 'Active', invitationStatus: 'Pending',
    createdBy: 'Admin', creationDate: '15/01/2025', modifiedDate: '15/01/2025',
  },
  {
    id: 3, firstNameAr: 'بلال', secondNameAr: 'محمد', thirdNameAr: 'سعيد', lastNameAr: 'نور',
    firstNameEn: 'Bilal', secondNameEn: 'Mohammed', thirdNameEn: 'Said', lastNameEn: 'Noor',
    email: 'b.noor@gigjo.com', mobile: '0799887765', gender: 'Male', nationalId: '9900123456',
    subBrokerStatus: 'Inactive', invitationStatus: 'Expired',
    createdBy: 'Admin', creationDate: '20/02/2025', modifiedDate: '20/02/2025',
  },
];

/* ─── Status chip (identical pattern to dashboard) ─────── */
function Chip({ status, isAr }: { status: string; isAr: boolean }) {
  const s = STATUS[status] ?? STATUS['Inactive'];
  return (
    <span
      className="px-2.5 py-0.5 rounded-full uppercase inline-block"
      style={{
        fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em',
        background: s.bg, color: s.color,
      }}
    >
      {isAr ? s.labelAr : s.labelEn}
    </span>
  );
}

/* ─── Validation ─────────────────────────────────────────── */
function validate(f: FormData) {
  const e: Record<string, string> = {};
  if (!f.firstNameAr.trim()) e.firstNameAr = isAr => isAr ? 'مطلوب' : 'Required';
  if (!f.lastNameAr.trim())  e.lastNameAr  = isAr => isAr ? 'مطلوب' : 'Required';
  if (!f.firstNameEn.trim()) e.firstNameEn = isAr => isAr ? 'مطلوب' : 'Required';
  if (!f.lastNameEn.trim())  e.lastNameEn  = isAr => isAr ? 'مطلوب' : 'Required';
  if (!f.email.trim() || !/\S+@\S+\.\S+/.test(f.email)) e.email = isAr => isAr ? 'بريد غير صحيح' : 'Valid email required';
  if (!f.mobile.trim()) e.mobile = isAr => isAr ? 'مطلوب' : 'Required';
  if (f.nationalId.replace(/\D/g, '').length < 9) e.nationalId = isAr => isAr ? '٩ أرقام على الأقل' : 'Min 9 digits';
  return e;
}

/* ─── Main Page ──────────────────────────────────────────── */
export function SubBrokers() {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  /* ── resolved palette (exact same as BrokerDashboard) ── */
  const bg    = isDark ? '#0C1221' : '#F8F7FC';
  const cBg   = cardBg(isDark);
  const cSdw  = cardSdw(isDark);
  const bdr   = cardBdr(isDark);
  const iBg   = innerBg(isDark);
  const iBdr  = innerBdr(isDark);
  const iInBg = inputBg(isDark);
  const tH    = textHero(isDark);
  const tB    = textBody(isDark);
  const tM    = textMuted(isDark);
  const rowHover = isDark ? 'rgba(128,148,230,0.07)' : 'rgba(25,5,140,0.03)';

  /* ── fonts ── */
  const ff  = isAr ? "'Almarai', Tahoma, sans-serif"  : "'Georama', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Reforma', Verdana, sans-serif";
  const ffM = "'IBM Plex Mono', monospace";

  /* ── state ── */
  const [brokers, setBrokers]       = useState<SubBroker[]>(SEED);
  const [search,  setSearch]        = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page,    setPage]          = useState(1);
  const PER = 10;

  const [addOpen,     setAddOpen]     = useState(false);
  const [editTarget,  setEditTarget]  = useState<SubBroker | null>(null);
  const [deleteId,    setDeleteId]    = useState<number | null>(null);

  const [addForm, setAddForm] = useState<FormData>({ ...EMPTY_FORM });
  const [editForm, setEditForm] = useState<FormData>({ ...EMPTY_FORM });
  const [editSubStatus,  setEditSubStatus]  = useState<SubBroker['subBrokerStatus']>('Active');
  const [editInvStatus,  setEditInvStatus]  = useState<SubBroker['invitationStatus']>('Pending');

  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /* ── derived ── */
  const filtered = brokers.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      `${b.firstNameEn} ${b.lastNameEn}`.toLowerCase().includes(q) ||
      `${b.firstNameAr} ${b.lastNameAr}`.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.nationalId.includes(q) ||
      b.mobile.includes(q);
    const matchStatus = statusFilter === 'All' || b.subBrokerStatus === statusFilter;
    return matchSearch && matchStatus;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const rows = filtered.slice((page - 1) * PER, page * PER);

  const allVisibleIds = rows.map(b => b.id);
  const allSelected   = allVisibleIds.length > 0 && allVisibleIds.every(id => selectedIds.includes(id));
  const someSelected  = allVisibleIds.some(id => selectedIds.includes(id)) && !allSelected;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !allVisibleIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...allVisibleIds])]);
    }
  };
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const kpis = [
    {
      label: isAr ? 'إجمالي الوسطاء' : 'TOTAL SUB-BROKERS',
      value: String(brokers.length),
      icon: Users, stripe: B.indigo, glow: 'rgba(128,148,230,0.22)',
      sub: isAr ? 'مسجّل' : 'registered',
    },
    {
      label: isAr ? 'الوسطاء النشطون' : 'ACTIVE SUB-BROKERS',
      value: String(brokers.filter(b => b.subBrokerStatus === 'Active').length),
      icon: UserCheck, stripe: B.seafoam, glow: 'rgba(107,202,186,0.18)',
      sub: isAr ? 'نشط حالياً' : 'currently active',
    },
    {
      label: isAr ? 'دعوات معلقة' : 'PENDING INVITATIONS',
      value: String(brokers.filter(b => b.invitationStatus === 'Pending').length),
      icon: Mail, stripe: B.roseGold, glow: 'rgba(210,140,100,0.18)',
      sub: isAr ? 'لم تُقبَل بعد' : 'awaiting acceptance',
    },
    {
      label: isAr ? 'غير نشطين / محظورين' : 'INACTIVE / BLOCKED',
      value: String(brokers.filter(b => b.subBrokerStatus !== 'Active').length),
      icon: UserX, stripe: B.ocean, glow: 'rgba(128,148,230,0.18)',
      sub: isAr ? 'يحتاج مراجعة' : 'needs review',
    },
  ];

  /* ── helpers ── */
  const runValidate = (f: FormData) => {
    const raw = validate(f);
    const boolMap: Record<string, boolean> = {};
    Object.keys(raw).forEach(k => { boolMap[k] = true; });
    return boolMap;
  };

  const openAdd = () => {
    setAddForm({ ...EMPTY_FORM });
    setErrs({});
    setAddOpen(true);
  };
  const openEdit = (b: SubBroker) => {
    setEditForm({
      firstNameAr: b.firstNameAr, secondNameAr: b.secondNameAr,
      thirdNameAr: b.thirdNameAr, lastNameAr: b.lastNameAr,
      firstNameEn: b.firstNameEn, secondNameEn: b.secondNameEn,
      thirdNameEn: b.thirdNameEn, lastNameEn: b.lastNameEn,
      email: b.email, mobile: b.mobile, gender: b.gender, nationalId: b.nationalId,
    });
    setEditSubStatus(b.subBrokerStatus);
    setEditInvStatus(b.invitationStatus);
    setErrs({});
    setEditTarget(b);
  };

  const handleAdd = () => {
    const e = runValidate(addForm);
    if (Object.keys(e).length) { setErrs(e); return; }
    const now = new Date().toLocaleDateString('en-GB');
    setBrokers(prev => [...prev, {
      id: Date.now(), ...addForm,
      subBrokerStatus: 'Active', invitationStatus: 'Pending',
      createdBy: 'Broker', creationDate: now, modifiedDate: now,
    }]);
    setAddOpen(false);
    setAddForm({ ...EMPTY_FORM });
    setErrs({});
    addToast({ type: 'success', title: isAr ? 'تم إضافة الوسيط الفرعي بنجاح' : 'Sub-Broker added successfully' });
  };

  const handleEdit = () => {
    if (!editTarget) return;
    const e = runValidate(editForm);
    if (Object.keys(e).length) { setErrs(e); return; }
    const now = new Date().toLocaleDateString('en-GB');
    setBrokers(prev => prev.map(b =>
      b.id === editTarget.id
        ? { ...b, ...editForm, subBrokerStatus: editSubStatus, invitationStatus: editInvStatus, modifiedDate: now }
        : b
    ));
    setEditTarget(null);
    setErrs({});
    addToast({ type: 'success', title: isAr ? 'تم تحديث بيانات الوسيط الفرعي' : 'Sub-Broker updated successfully' });
  };

  const handleDelete = () => {
    setBrokers(prev => prev.filter(b => b.id !== deleteId));
    setDeleteId(null);
    addToast({ type: 'success', title: isAr ? 'تم حذف الوسيط الفرعي' : 'Sub-Broker removed' });
  };

  /* ── avatar initials ── */
  const avatar = (b: SubBroker) =>
    `${b.firstNameEn[0] ?? ''}${b.lastNameEn[0] ?? ''}`.toUpperCase();

  /* ── shared input field ── */
  const Field = ({
    label, value, onChange, placeholder = '', type = 'text',
    mono = false, errKey = '', dir,
  }: {
    label: string; value: string; onChange: (v: string) => void;
    placeholder?: string; type?: string; mono?: boolean; errKey?: string; dir?: string;
  }) => (
    <div>
      <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: tM, fontFamily: ff }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all"
        style={{
          background: iInBg,
          borderColor: errs[errKey] ? B.roseGold : bdr,
          color: tH,
          fontFamily: mono ? ffM : ff,
        }}
        onFocus={e => { e.target.style.borderColor = B.ocean; }}
        onBlur={e => { e.target.style.borderColor = errs[errKey] ? B.roseGold : bdr; }}
      />
      {errs[errKey] && (
        <p style={{ fontSize: '11px', color: B.roseGold, marginTop: '3px', fontFamily: ff }}>
          {isAr ? 'هذا الحقل مطلوب' : 'This field is required'}
        </p>
      )}
    </div>
  );

  /* ── shared select ── */
  const SelectField = ({
    label, value, onChange, options,
  }: {
    label: string; value: string; onChange: (v: string) => void;
    options: { value: string; label: string }[];
  }) => (
    <div>
      <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: tM, fontFamily: ff }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
        style={{ background: iInBg, borderColor: bdr, color: tH, fontFamily: ff }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  /* ── section label inside form ── */
  const FormSection = ({ label }: { label: string }) => (
    <div className="flex items-center gap-3 mt-2 mb-3">
      <div style={{ width: '18px', height: '2px', background: B.roseGold, borderRadius: '2px', flexShrink: 0 }} />
      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: B.ocean, fontFamily: ff }}>
        {label}
      </p>
      <div style={{ flex: 1, height: '1px', background: bdr }} />
    </div>
  );

  /* ── shared form body (Add + Edit) ── */
  const renderForm = (
    f: FormData,
    setF: React.Dispatch<React.SetStateAction<FormData>>
  ) => (
    <div className="space-y-1" style={{ fontFamily: ff }}>
      {/* Arabic Name */}
      <FormSection label={isAr ? 'الاسم بالعربية' : 'Arabic Name'} />
      <div className="grid grid-cols-4 gap-3">
        <Field label={isAr ? 'الاسم الأول *' : 'First Name AR *'}
          value={f.firstNameAr} onChange={v => setF(p => ({ ...p, firstNameAr: v }))}
          placeholder="عامر" dir="rtl" errKey="firstNameAr" />
        <Field label={isAr ? 'الثاني' : 'Second Name AR'}
          value={f.secondNameAr} onChange={v => setF(p => ({ ...p, secondNameAr: v }))}
          placeholder="غانم" dir="rtl" />
        <Field label={isAr ? 'الثالث' : 'Third Name AR'}
          value={f.thirdNameAr} onChange={v => setF(p => ({ ...p, thirdNameAr: v }))}
          placeholder="عيسى" dir="rtl" />
        <Field label={isAr ? 'اسم العائلة *' : 'Last Name AR *'}
          value={f.lastNameAr} onChange={v => setF(p => ({ ...p, lastNameAr: v }))}
          placeholder="حداد" dir="rtl" errKey="lastNameAr" />
      </div>

      {/* English Name */}
      <FormSection label={isAr ? 'الاسم بالإنجليزية' : 'English Name'} />
      <div className="grid grid-cols-4 gap-3">
        <Field label={isAr ? 'الاسم الأول *' : 'First Name EN *'}
          value={f.firstNameEn} onChange={v => setF(p => ({ ...p, firstNameEn: v }))}
          placeholder="Amer" errKey="firstNameEn" />
        <Field label={isAr ? 'الثاني' : 'Second Name EN'}
          value={f.secondNameEn} onChange={v => setF(p => ({ ...p, secondNameEn: v }))}
          placeholder="Ghanim" />
        <Field label={isAr ? 'الثالث' : 'Third Name EN'}
          value={f.thirdNameEn} onChange={v => setF(p => ({ ...p, thirdNameEn: v }))}
          placeholder="Issa" />
        <Field label={isAr ? 'اسم العائلة *' : 'Last Name EN *'}
          value={f.lastNameEn} onChange={v => setF(p => ({ ...p, lastNameEn: v }))}
          placeholder="Haddad" errKey="lastNameEn" />
      </div>

      {/* Contact */}
      <FormSection label={isAr ? 'بيانات الاتصال' : 'Contact Details'} />
      <div className="grid grid-cols-3 gap-3">
        <Field label={isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
          value={f.email} onChange={v => setF(p => ({ ...p, email: v }))}
          placeholder="name@email.com" type="email" errKey="email" />
        <Field label={isAr ? 'رقم الهاتف *' : 'Mobile Number *'}
          value={f.mobile} onChange={v => setF(p => ({ ...p, mobile: v }))}
          placeholder="0797XXXXXXX" errKey="mobile" mono />
        <SelectField
          label={isAr ? 'الجنس' : 'Gender'}
          value={f.gender}
          onChange={v => setF(p => ({ ...p, gender: v as FormData['gender'] }))}
          options={[
            { value: 'Male',   label: isAr ? 'ذكر' : 'Male'   },
            { value: 'Female', label: isAr ? 'أنثى' : 'Female' },
          ]}
        />
      </div>

      {/* Identity */}
      <FormSection label={isAr ? 'الهوية الوطنية' : 'National Identity'} />
      <div className="grid grid-cols-2 gap-3">
        <Field label={isAr ? 'رقم الهوية الوطنية *' : 'National ID Number *'}
          value={f.nationalId} onChange={v => setF(p => ({ ...p, nationalId: v }))}
          placeholder="9921000955" mono errKey="nationalId" />
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────── */
  /* RENDER                                                   */
  /* ──────────────────────────────────────────────────────── */
  return (
    <div
      className="p-5 min-h-full gig-texture-bg"
      style={{ background: bg, direction: isRTL ? 'rtl' : 'ltr', fontFamily: ff }}
    >
      {/* ── Page Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 pb-5"
        style={{ borderBottom: `1px solid ${bdr}` }}>
        <div>
          <h1 style={{ fontFamily: ffH, fontSize: '1.5rem', fontWeight: 700, color: tH }}>
            {isAr ? 'الوسطاء الفرعيون' : 'Sub-Brokers'}
          </h1>
          <p style={{ fontSize: '13px', color: tB, marginTop: '4px' }}>
            {isAr ? 'إدارة وسطائك الفرعيين وصلاحياتهم' : 'Manage your sub-brokers and their permissions'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-all"
            style={{ borderColor: bdr, color: tB, fontFamily: ff }}
          >
            <Download size={14} />
            {isAr ? 'تصدير' : 'Export'}
          </button>
          <button
            onClick={openAdd}
            className="px-5 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-all"
            style={{
              background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`,
              boxShadow: '0 3px 14px rgba(210,140,100,0.35)',
              fontFamily: ff, fontWeight: 700,
            }}
          >
            <Plus size={14} />
            {isAr ? 'إضافة وسيط فرعي' : 'Add Sub-Broker'}
          </button>
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {kpis.map(kpi => (
          <div
            key={kpi.label}
            className="p-5 relative overflow-hidden"
            style={{
              background: cBg,
              borderTop: `3px solid ${kpi.stripe}`,
              borderInlineStart: `1px solid ${bdr}`,
              borderInlineEnd: `1px solid ${bdr}`,
              borderBottom: `1px solid ${bdr}`,
              boxShadow: cSdw,
              borderRadius: '12px',
            }}
          >
            {isDark && (
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top right, ${kpi.glow} 0%, transparent 65%)` }} />
            )}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: '10px', color: tM, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', fontFamily: ff }}>
                  {kpi.label}
                </span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: isDark ? `${kpi.stripe}20` : `${kpi.stripe}10`,
                    border: `1.5px solid ${kpi.stripe}45`,
                    color: kpi.stripe,
                  }}>
                  <kpi.icon size={14} strokeWidth={2} />
                </div>
              </div>
              <div style={{ fontFamily: ffH, fontSize: '2.2rem', fontWeight: 700, color: isDark ? '#FFFFFF' : kpi.stripe, lineHeight: 1, letterSpacing: '-0.02em' }}>
                {kpi.value}
              </div>
              <p style={{ fontSize: '12px', color: tM, marginTop: '8px', fontFamily: ff }}>
                {kpi.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ──────────────────────────────────── */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-4 px-4 py-3 border-b" style={{ borderColor: bdr }}>
          <div className="relative flex-1 max-w-xs">
            <Search
              size={14}
              className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`}
              style={{ color: tM }}
            />
            <input
              className="w-full rounded-lg border py-2 text-sm outline-none transition-all"
              style={{
                background: iInBg, borderColor: bdr, color: tH,
                paddingLeft: isRTL ? '12px' : '36px',
                paddingRight: isRTL ? '36px' : '12px',
                fontFamily: ff,
              }}
              placeholder={isAr ? 'بحث بالاسم، الإيميل، الهوية...' : 'Search by name, email, ID…'}
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              onFocus={e => { e.currentTarget.style.borderColor = B.ocean; }}
              onBlur={e  => { e.currentTarget.style.borderColor = bdr; }}
            />
          </div>
          <select
            className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ background: iInBg, borderColor: bdr, color: tB, fontFamily: ff }}
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="All">{isAr ? 'جميع الحالات' : 'All Status'}</option>
            <option value="Active">{isAr ? 'نشط' : 'Active'}</option>
            <option value="Inactive">{isAr ? 'غير نشط' : 'Inactive'}</option>
            <option value="Blocked">{isAr ? 'محظور' : 'Blocked'}</option>
          </select>
          <span style={{ fontSize: '12px', color: tM, fontFamily: ffM, marginInlineStart: 'auto' }}>
            {filtered.length} {isAr ? 'وسيط' : 'broker(s)'}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '1100px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${bdr}` }}>
                {[
                  { label: '',                                                                  align: 'left'   },
                  { label: isAr ? 'الوسيط الفرعي'   : 'Sub-Broker',        align: 'left'   },
                  { label: isAr ? 'الهوية الوطنية'   : 'National ID',       align: 'left'   },
                  { label: isAr ? 'بيانات الاتصال'   : 'Contact',           align: 'left'   },
                  { label: isAr ? 'الجنس'             : 'Gender',            align: 'center' },
                  { label: isAr ? 'حالة الوسيط'       : 'Status',            align: 'center' },
                  { label: isAr ? 'حالة الدعوة'        : 'Invitation',        align: 'center' },
                  { label: isAr ? 'أنشئ بواسطة'       : 'Created By',        align: 'center' },
                  { label: isAr ? 'تاريخ الإنشاء'     : 'Created',           align: 'center' },
                  { label: isAr ? 'آخر تعديل'          : 'Modified',          align: 'center' },
                  { label: isAr ? 'إجراءات'            : 'Actions',           align: 'center' },
                ].map((col, i) => (
                  <th
                    key={i}
                    className="px-4 py-3"
                    style={{
                      fontSize: '10px', fontWeight: 700, color: tM,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      textAlign: col.align as any, fontFamily: ff,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {i === 0 ? (
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={el => { if (el) el.indeterminate = someSelected; }}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded cursor-pointer accent-[#19058C]"
                      />
                    ) : col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center"
                    style={{ color: tM, fontSize: '13px', fontFamily: ff }}>
                    {isAr ? 'لا توجد نتائج مطابقة' : 'No matching sub-brokers found'}
                  </td>
                </tr>
              ) : rows.map(b => (
                <tr
                  key={b.id}
                  className="border-b last:border-0 transition-colors"
                  style={{ borderColor: bdr }}
                  onMouseEnter={e => (e.currentTarget.style.background = rowHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(b.id)}
                      onChange={() => toggleSelect(b.id)}
                      className="w-4 h-4 rounded cursor-pointer accent-[#19058C]"
                    />
                  </td>
                  {/* Sub-Broker identity */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${B.ocean}, ${B.indigo})`,
                          fontSize: '11px', fontWeight: 700,
                          boxShadow: isDark ? '0 2px 8px rgba(128,148,230,0.30)' : 'none',
                        }}
                      >
                        {avatar(b)}
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: tH, fontFamily: ff }}>
                          {isAr ? `${b.firstNameAr} ${b.lastNameAr}` : `${b.firstNameEn} ${b.lastNameEn}`}
                        </p>
                        <p style={{ fontSize: '11px', color: tM, fontFamily: ff, marginTop: '1px' }}>
                          {isAr ? `${b.firstNameEn} ${b.lastNameEn}` : `${b.firstNameAr} ${b.lastNameAr}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* National ID */}
                  <td className="px-4 py-3">
                    <span style={{ fontFamily: ffM, fontSize: '12px', color: isDark ? B.ocean : B.indigo, fontWeight: 600 }}>
                      {b.nationalId}
                    </span>
                  </td>
                  {/* Contact */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <Mail size={11} style={{ color: tM, flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', color: tB, fontFamily: ff }}>{b.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone size={11} style={{ color: tM, flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', color: tM, fontFamily: ffM }}>{b.mobile}</span>
                      </div>
                    </div>
                  </td>
                  {/* Gender */}
                  <td className="px-4 py-3 text-center">
                    <span style={{ fontSize: '12px', color: tB, fontFamily: ff }}>
                      {b.gender === 'Male' ? (isAr ? 'ذكر' : 'Male') : (isAr ? 'أنثى' : 'Female')}
                    </span>
                  </td>
                  {/* Sub-Broker Status */}
                  <td className="px-4 py-3 text-center">
                    <Chip status={b.subBrokerStatus} isAr={isAr} />
                  </td>
                  {/* Invitation Status */}
                  <td className="px-4 py-3 text-center">
                    <Chip status={b.invitationStatus} isAr={isAr} />
                  </td>
                  {/* Created By */}
                  <td className="px-4 py-3 text-center">
                    <span style={{ fontSize: '12px', color: tB, fontFamily: ff }}>{b.createdBy}</span>
                  </td>
                  {/* Creation Date */}
                  <td className="px-4 py-3 text-center">
                    <span style={{ fontFamily: ffM, fontSize: '11px', color: tM }}>{b.creationDate}</span>
                  </td>
                  {/* Modified Date */}
                  <td className="px-4 py-3 text-center">
                    <span style={{ fontFamily: ffM, fontSize: '11px', color: tM }}>{b.modifiedDate}</span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => openEdit(b)}
                        className="p-1.5 rounded-lg transition-all"
                        style={{ color: tM }}
                        title={isAr ? 'تعديل' : 'Edit'}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(128,148,230,0.12)' : 'rgba(25,5,140,0.07)'; (e.currentTarget as HTMLElement).style.color = isDark ? B.ocean : B.indigo; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = tM; }}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(b.id)}
                        className="p-1.5 rounded-lg transition-all"
                        style={{ color: tM }}
                        title={isAr ? 'حذف' : 'Remove'}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(210,140,100,0.12)'; (e.currentTarget as HTMLElement).style.color = B.roseGold; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = tM; }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: bdr }}>
          <span style={{ fontSize: '12px', color: tM, fontFamily: ff }}>
            {isAr
              ? `عرض ${Math.min((page - 1) * PER + 1, filtered.length)}–${Math.min(page * PER, filtered.length)} من ${filtered.length}`
              : `Showing ${Math.min((page - 1) * PER + 1, filtered.length)}–${Math.min(page * PER, filtered.length)} of ${filtered.length}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: bdr, color: tM }}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="w-8 h-8 rounded-lg border text-sm font-medium transition-all"
                style={{
                  borderColor: n === page ? `${B.ocean}60` : bdr,
                  background: n === page ? `${B.ocean}14` : 'transparent',
                  color: n === page ? B.ocean : tM,
                  fontFamily: ffM,
                }}
              >
                {n}
              </button>
            ))}
            <button
              className="p-1.5 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: bdr, color: tM }}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Add Modal ───────────────────────────────────── */}
      {addOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setAddOpen(false)}
          />
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
            }}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{
                background: `linear-gradient(135deg, ${B.indigo} 0%, #2D1FAA 100%)`,
                borderBottom: `1px solid rgba(128,148,230,0.20)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <Plus size={16} style={{ color: '#FFFFFF' }} />
                </div>
                <div>
                  <h2 style={{ fontFamily: ffH, fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                    {isAr ? 'إضافة وسيط فرعي جديد' : 'Add New Sub-Broker'}
                  </h2>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px', fontFamily: ff }}>
                    {isAr ? 'يرث خطوط الأعمال وصلاحياتك تلقائياً' : 'Inherits your LOBs & permissions automatically'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAddOpen(false)}
                className="p-1.5 rounded-lg transition-all hover:bg-white/15"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <X size={18} />
              </button>
            </div>
            {/* Modal body */}
            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 160px)' }}>
              {renderForm(addForm, setAddForm)}
            </div>
            {/* Modal footer */}
            <div
              className="flex items-center justify-end gap-3 px-6 py-4 border-t"
              style={{ borderColor: bdr, background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(25,5,140,0.02)' }}
            >
              <button
                onClick={() => setAddOpen(false)}
                className="px-5 py-2 rounded-lg border text-sm font-medium hover:opacity-80 transition-all"
                style={{ borderColor: bdr, color: tM, fontFamily: ff }}
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleAdd}
                className="px-7 py-2 rounded-lg text-white text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`,
                  boxShadow: '0 3px 14px rgba(210,140,100,0.35)',
                  fontFamily: ff,
                }}
              >
                <BadgeCheck size={15} />
                {isAr ? 'حفظ الوسيط' : 'Save Sub-Broker'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Edit Modal ──────────────────────────────────── */}
      {editTarget && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setEditTarget(null)}
          />
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
            }}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{
                background: `linear-gradient(135deg, #1A0F60 0%, ${B.indigo} 100%)`,
                borderBottom: `1px solid rgba(128,148,230,0.20)`,
              }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${B.ocean}, ${B.indigo})`, fontSize: '12px', fontWeight: 700 }}
                >
                  {avatar(editTarget)}
                </div>
                <div>
                  <h2 style={{ fontFamily: ffH, fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                    {isAr ? 'تعديل الوسيط الفرعي' : 'Edit Sub-Broker'}
                  </h2>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px', fontFamily: ff }}>
                    {editTarget.firstNameEn} {editTarget.lastNameEn} — <span style={{ fontFamily: ffM }}>{editTarget.nationalId}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditTarget(null)}
                className="p-1.5 rounded-lg transition-all hover:bg-white/15"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 210px)' }}>
              {renderForm(editForm, setEditForm)}

              {/* Account settings */}
              <div className="mt-2">
                <FormSection label={isAr ? 'إعدادات الحساب' : 'Account Settings'} />
                <div className="grid grid-cols-2 gap-3">
                  <SelectField
                    label={isAr ? 'حالة الوسيط الفرعي' : 'Sub-Broker Status'}
                    value={editSubStatus}
                    onChange={v => setEditSubStatus(v as SubBroker['subBrokerStatus'])}
                    options={[
                      { value: 'Active',   label: isAr ? 'نشط' : 'Active'   },
                      { value: 'Inactive', label: isAr ? 'غير نشط' : 'Inactive' },
                      { value: 'Blocked',  label: isAr ? 'محظور' : 'Blocked'  },
                    ]}
                  />
                  <SelectField
                    label={isAr ? 'حالة الدعوة' : 'Invitation Status'}
                    value={editInvStatus}
                    onChange={v => setEditInvStatus(v as SubBroker['invitationStatus'])}
                    options={[
                      { value: 'Accepted', label: isAr ? 'مقبولة' : 'Accepted' },
                      { value: 'Pending',  label: isAr ? 'معلقة'  : 'Pending'  },
                      { value: 'Expired',  label: isAr ? 'منتهية' : 'Expired'  },
                    ]}
                  />
                </div>
              </div>

              {/* Record info */}
              <div className="mt-4">
                <FormSection label={isAr ? 'معلومات السجل' : 'Record Info'} />
                <div
                  className="grid grid-cols-3 gap-4 rounded-xl p-4"
                  style={{ background: iBg, border: `1px solid ${iBdr}` }}
                >
                  {[
                    { icon: Users,       label: isAr ? 'أنشئ بواسطة' : 'Created By',  value: editTarget.createdBy    },
                    { icon: CalendarDays, label: isAr ? 'تاريخ الإنشاء' : 'Created On', value: editTarget.creationDate },
                    { icon: CalendarDays, label: isAr ? 'آخر تعديل'    : 'Last Modified', value: editTarget.modifiedDate },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-2">
                      <item.icon size={13} style={{ color: tM, flexShrink: 0, marginTop: '3px' }} />
                      <div>
                        <p style={{ fontSize: '10px', color: tM, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: ff }}>{item.label}</p>
                        <p style={{ fontSize: '13px', color: tH, fontWeight: 600, fontFamily: item.label.includes('By') ? ff : ffM, marginTop: '2px' }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div
              className="flex items-center justify-between px-6 py-4 border-t"
              style={{ borderColor: bdr, background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(25,5,140,0.02)' }}
            >
              <button
                onClick={() => { setDeleteId(editTarget.id); setEditTarget(null); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                style={{
                  background: 'rgba(210,140,100,0.10)',
                  border: `1px solid rgba(210,140,100,0.30)`,
                  color: B.roseGold, fontFamily: ff,
                }}
              >
                <Trash2 size={14} />
                {isAr ? 'إزالة الوسيط' : 'Remove'}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditTarget(null)}
                  className="px-5 py-2 rounded-lg border text-sm font-medium hover:opacity-80 transition-all"
                  style={{ borderColor: bdr, color: tM, fontFamily: ff }}
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={handleEdit}
                  className="px-7 py-2 rounded-lg text-white text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`,
                    boxShadow: '0 3px 14px rgba(210,140,100,0.35)',
                    fontFamily: ff,
                  }}
                >
                  <BadgeCheck size={15} />
                  {isAr ? 'حفظ التغييرات' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Delete Confirm ──────────────────────────────── */}
      {deleteId !== null && (
        <ConfirmationModal
          type="destructive"
          title={isAr ? 'تأكيد إزالة الوسيط الفرعي' : 'Confirm Sub-Broker Removal'}
          description={
            isAr
              ? 'هل أنت متأكد من إزالة هذا الوسيط الفرعي؟ سيتم إلغاء وصوله الكامل إلى المنصة ولا يمكن التراجع عن هذا الإجراء.'
              : 'Are you sure you want to remove this sub-broker? Their access to the portal will be revoked and this action cannot be undone.'
          }
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* ── GIG brand bar ───────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[3px] z-30"
        style={{ background: 'linear-gradient(90deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)' }}
      />
    </div>
  );
}
