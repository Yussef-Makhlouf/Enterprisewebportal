import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play, CheckCircle2, XCircle, Clock, Eye, Download,
  ChevronLeft, ChevronRight, AlertTriangle, Car,
} from 'lucide-react';
import {
  B, cardBg, cardBdr, cardSdw, textHero, textBody, textMuted,
} from '../../utils/darkPalette';

/* ── Seed data ─────────────────────────────────────────── */
const SUBMISSIONS = [
  {
    id: 'MOT-2025-00412', plate: 'A B C 1234', make: 'Toyota', model: 'Camry',
    year: 2021, color: 'Silver', chassis: 'JT1BF3EK3B0291452',
    broker: 'Khalid Al-Mansouri', brokerAr: 'خالد المنصوري',
    submittedAt: '2025-03-24 09:14', videoUrl: null,
    sumInsured: 18500, premium: 420, commission: '8%',
    status: 'Pending' as const,
    coverages: ['TPL', 'Comprehensive', 'Agency Repair'],
  },
  {
    id: 'MOT-2025-00411', plate: 'X Y Z 5678', make: 'Kia', model: 'Sportage',
    year: 2022, color: 'Dark Blue', chassis: 'KNDPB3A28E7571823',
    broker: 'Sara Al-Qasim', brokerAr: 'سارة القاسم',
    submittedAt: '2025-03-24 08:55', videoUrl: null,
    sumInsured: 23000, premium: 560, commission: '6.5%',
    status: 'Approved' as const,
    coverages: ['TPL', 'Comprehensive'],
  },
  {
    id: 'MOT-2025-00410', plate: 'M N O 9012', make: 'Hyundai', model: 'Tucson',
    year: 2020, color: 'White', chassis: 'KM8J3CAL6LU185732',
    broker: 'Omar Hamdan', brokerAr: 'عمر حمدان',
    submittedAt: '2025-03-23 16:30', videoUrl: null,
    sumInsured: 16000, premium: 380, commission: '7.5%',
    status: 'Rejected' as const,
    coverages: ['TPL'],
  },
];

type Status = 'Pending' | 'Approved' | 'Rejected';
type Tab = 'Pending' | 'Approved' | 'Rejected';

const TAB_COLORS: Record<Tab, string> = {
  Pending:  B.roseGold,
  Approved: B.seafoam,
  Rejected: '#FF7366',
};

const STATUS_STYLE: Record<Status, { color: string; bg: string }> = {
  Pending:  { color: B.roseGold, bg: 'rgba(210,140,100,0.14)' },
  Approved: { color: B.seafoam,  bg: 'rgba(107,202,186,0.14)' },
  Rejected: { color: '#FF7366',  bg: 'rgba(255,115,102,0.12)' },
};

/* ─────────────────────────────────────────────────────── */
export function ApprovalEngine() {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const bg    = isDark ? '#0C1221' : '#F3F4F8';
  const cBg   = cardBg(isDark);
  const bdr   = cardBdr(isDark);
  const cSdw  = cardSdw(isDark);
  const tH    = textHero(isDark);
  const tB    = textBody(isDark);
  const tM    = textMuted(isDark);
  const ff    = isAr ? "'Almarai', Tahoma, sans-serif"  : "'Georama', Verdana, sans-serif";
  const ffH   = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Reforma', Verdana, sans-serif";
  const ffM   = "'IBM Plex Mono', monospace";

  const [activeTab, setActiveTab] = useState<Tab>('Pending');
  const [selected, setSelected] = useState(SUBMISSIONS[0]);
  const [rejReason, setRejReason] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [subs, setSubs] = useState(SUBMISSIONS);

  const filtered = subs.filter(s => s.status === activeTab);

  const handleApprove = () => {
    setSubs(prev => prev.map(s => s.id === selected.id ? { ...s, status: 'Approved' } : s));
    addToast({ type: 'success', title: isAr ? 'تمت الموافقة على الطلب' : 'Policy Approved — email sent to broker' });
    const next = subs.find(s => s.status === 'Pending' && s.id !== selected.id);
    if (next) setSelected(next);
  };

  const handleReject = () => {
    if (!rejReason.trim()) {
      addToast({ type: 'error', title: isAr ? 'يرجى إدخال سبب الرفض' : 'Please enter a rejection reason' });
      return;
    }
    setSubs(prev => prev.map(s => s.id === selected.id ? { ...s, status: 'Rejected' } : s));
    setRejReason('');
    addToast({ type: 'error', title: isAr ? 'تم رفض الطلب' : 'Submission Rejected' });
  };

  const counts = {
    Pending:  subs.filter(s => s.status === 'Pending').length,
    Approved: subs.filter(s => s.status === 'Approved').length,
    Rejected: subs.filter(s => s.status === 'Rejected').length,
  };

  return (
    <div className="p-5 min-h-full" style={{ background: bg, direction: isRTL ? 'rtl' : 'ltr', fontFamily: ff }}>

      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-1 h-6 rounded-full" style={{ background: B.indigo }} />
            <h1 style={{ fontFamily: ffH, fontSize: '1.45rem', fontWeight: 700, color: tH }}>
              {isAr ? 'محرك الموافقة على المركبات' : 'Motor Video Approval Engine'}
            </h1>
          </div>
          <p style={{ fontSize: '13px', color: tM, marginInlineStart: '16px' }}>
            {isAr ? 'مراجعة مقاطع فيديو المركبات وإصدار وثائق التأمين' : 'Review vehicle videos and approve or reject motor policy submissions'}
          </p>
        </div>

        {/* KPI pills */}
        <div className="flex gap-2">
          {(['Pending', 'Approved', 'Rejected'] as Tab[]).map(t => (
            <div key={t} className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: `${TAB_COLORS[t]}12`, border: `1px solid ${TAB_COLORS[t]}30` }}>
              <span style={{ fontFamily: ffM, fontSize: '1.1rem', fontWeight: 700, color: TAB_COLORS[t], lineHeight: 1 }}>
                {counts[t]}
              </span>
              <span style={{ fontSize: '11px', color: tM }}>
                {isAr ? { Pending: 'معلق', Approved: 'موافق', Rejected: 'مرفوض' }[t] : t}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 rounded-xl p-1" style={{ background: isDark ? 'rgba(128,148,230,0.07)' : '#E8EBF5', width: 'fit-content' }}>
        {(['Pending', 'Approved', 'Rejected'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => { setActiveTab(t); if (filtered.length > 0) setSelected(filtered[0]); }}
            className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              fontFamily: ff,
              background: activeTab === t ? (isDark ? '#1E2D47' : '#FFFFFF') : 'transparent',
              color: activeTab === t ? TAB_COLORS[t] : tM,
              boxShadow: activeTab === t ? '0 1px 6px rgba(0,0,0,0.12)' : 'none',
            }}
          >
            {isAr ? { Pending: 'معلق', Approved: 'موافق عليه', Rejected: 'مرفوض' }[t] : t}
            <span className="ms-1.5 text-xs opacity-70">({counts[t]})</span>
          </button>
        ))}
      </div>

      {/* Main split layout */}
      <div className="flex gap-5" style={{ minHeight: '600px' }}>

        {/* Left — submission list */}
        <div className="flex flex-col gap-2" style={{ width: '280px', flexShrink: 0 }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 rounded-2xl"
              style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
              <CheckCircle2 size={32} style={{ color: B.seafoam, marginBottom: '8px' }} />
              <p style={{ fontSize: '13px', color: tM, fontFamily: ff }}>
                {isAr ? 'لا توجد طلبات' : 'No submissions here'}
              </p>
            </div>
          ) : filtered.map(s => {
            const ss = STATUS_STYLE[s.status];
            const isActive = selected.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="w-full text-left p-4 rounded-xl transition-all"
                style={{
                  background: isActive ? (isDark ? '#1A2D4A' : '#EEF2FF') : cBg,
                  border: `1.5px solid ${isActive ? B.ocean + '60' : bdr}`,
                  boxShadow: isActive ? `0 0 0 1px ${B.ocean}40` : cSdw,
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontFamily: ffM, fontSize: '11px', color: isDark ? B.ocean : B.indigo, fontWeight: 600 }}>
                    {s.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', fontWeight: 700, color: ss.color, background: ss.bg }}>
                    {isAr ? { Pending: 'معلق', Approved: 'موافق', Rejected: 'مرفوض' }[s.status] : s.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Car size={13} style={{ color: tM, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: tH, fontFamily: ff }}>
                    {s.year} {s.make} {s.model}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: tM, fontFamily: ff }}>
                  {isAr ? s.brokerAr : s.broker}
                </p>
                <p style={{ fontFamily: ffM, fontSize: '10px', color: tM, marginTop: '4px' }}>
                  {s.submittedAt}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right — detail panel */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Video Player */}
          <div className="rounded-2xl overflow-hidden flex-1 relative flex items-center justify-center"
            style={{
              background: isDark ? '#050B16' : '#1A1D2E',
              minHeight: '340px',
              border: `1px solid ${bdr}`,
              boxShadow: cSdw,
            }}
          >
            {/* Placeholder video area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Play size={28} style={{ color: '#FFFFFF', marginLeft: '4px' }} />
              </div>
              <div className="text-center">
                <p style={{ fontFamily: ffM, fontSize: '13px', color: 'rgba(255,255,255,0.70)', marginBottom: '4px' }}>
                  {selected.id}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.40)', fontFamily: ff }}>
                  {isAr ? 'مقطع الفيديو جاهز للمراجعة' : 'Vehicle inspection video ready for review'}
                </p>
              </div>

              {/* Plate overlay */}
              <div className="px-4 py-2 rounded-lg" style={{ background: '#FFDC00', marginTop: '8px' }}>
                <span style={{ fontFamily: ffM, fontSize: '16px', fontWeight: 700, color: '#1A1D2E', letterSpacing: '0.12em' }}>
                  {selected.plate}
                </span>
              </div>
            </div>

            {/* Controls bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70), transparent)' }}>
              <button onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg transition-all hover:bg-white/10"
                style={{ color: '#FFFFFF' }}>
                <Play size={16} />
              </button>
              {/* Progress bar */}
              <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.20)' }}>
                <div style={{ width: isPlaying ? '35%' : '0%', height: '100%', background: B.seafoam, borderRadius: '2px', transition: 'width 0.3s' }} />
              </div>
              <button className="p-2 rounded-lg transition-all hover:bg-white/10" style={{ color: '#FFFFFF' }}>
                <Download size={14} />
              </button>
            </div>
          </div>

          {/* Policy details + actions */}
          <div className="grid grid-cols-2 gap-4">

            {/* Policy info */}
            <div className="rounded-2xl p-5" style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
              <h3 style={{ fontFamily: ffH, fontSize: '13px', fontWeight: 700, color: tH, marginBottom: '14px' }}>
                {isAr ? 'تفاصيل الوثيقة' : 'Policy Details'}
              </h3>
              {[
                { label: isAr ? 'رقم الطلب' : 'Submission ID', value: selected.id, mono: true },
                { label: isAr ? 'الوسيط' : 'Broker', value: isAr ? selected.brokerAr : selected.broker },
                { label: isAr ? 'المركبة' : 'Vehicle', value: `${selected.year} ${selected.make} ${selected.model}` },
                { label: isAr ? 'اللون' : 'Color', value: selected.color },
                { label: isAr ? 'رقم الهيكل' : 'Chassis No', value: selected.chassis, mono: true },
                { label: isAr ? 'مبلغ التأمين' : 'Sum Insured', value: `JD ${selected.sumInsured.toLocaleString()}`, mono: true },
                { label: isAr ? 'القسط' : 'Premium', value: `JD ${selected.premium}`, mono: true },
                { label: isAr ? 'العمولة' : 'Commission', value: selected.commission, mono: true },
              ].map(row => (
                <div key={row.label} className="flex items-start justify-between mb-2 pb-2"
                  style={{ borderBottom: `1px solid ${bdr}` }}>
                  <span style={{ fontSize: '12px', color: tM, fontFamily: ff }}>{row.label}</span>
                  <span style={{ fontSize: '12px', color: tH, fontFamily: row.mono ? ffM : ff, fontWeight: 600 }}>
                    {row.value}
                  </span>
                </div>
              ))}
              {/* Coverages */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selected.coverages.map(c => (
                  <span key={c} className="px-2 py-0.5 rounded-md"
                    style={{ fontSize: '10px', fontWeight: 600, background: `${B.ocean}12`, color: isDark ? B.ocean : B.indigo, border: `1px solid ${B.ocean}25` }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Action panel */}
            <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
              <h3 style={{ fontFamily: ffH, fontSize: '13px', fontWeight: 700, color: tH }}>
                {isAr ? 'قرار المراجعة' : 'Review Decision'}
              </h3>

              {selected.status === 'Pending' ? (
                <>
                  {/* Approve */}
                  <button
                    onClick={handleApprove}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold transition-all hover:opacity-90"
                    style={{
                      background: `linear-gradient(135deg, ${B.seafoam} 0%, #4DB8A8 100%)`,
                      boxShadow: '0 4px 16px rgba(107,202,186,0.35)',
                      fontFamily: ff, fontSize: '14px',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    {isAr ? 'الموافقة وإصدار الوثيقة' : 'Approve & Issue Policy'}
                  </button>

                  {/* Reject section */}
                  <div>
                    <label className="block mb-2" style={{ fontSize: '12px', fontWeight: 600, color: tM, fontFamily: ff }}>
                      {isAr ? 'سبب الرفض' : 'Rejection Reason'}
                    </label>
                    <textarea
                      value={rejReason}
                      onChange={e => setRejReason(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border p-3 text-sm outline-none resize-none transition-all"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.05)' : '#F8F7FC',
                        borderColor: bdr,
                        color: tH,
                        fontFamily: ff,
                      }}
                      placeholder={isAr ? 'أدخل سبب الرفض...' : 'Enter rejection reason...'}
                      onFocus={e => { e.target.style.borderColor = '#FF736660'; }}
                      onBlur={e => { e.target.style.borderColor = bdr; }}
                    />
                    <button
                      onClick={handleReject}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all hover:opacity-90 mt-2"
                      style={{
                        background: 'rgba(255,115,102,0.10)',
                        border: '1.5px solid rgba(255,115,102,0.35)',
                        color: '#FF7366',
                        fontFamily: ff, fontSize: '13px',
                      }}
                    >
                      <XCircle size={16} />
                      {isAr ? 'رفض الطلب' : 'Reject Submission'}
                    </button>
                  </div>

                  {/* Warning note */}
                  <div className="flex items-start gap-2 p-3 rounded-xl"
                    style={{ background: 'rgba(210,140,100,0.08)', border: '1px solid rgba(210,140,100,0.20)' }}>
                    <AlertTriangle size={14} style={{ color: B.roseGold, marginTop: '1px', flexShrink: 0 }} />
                    <p style={{ fontSize: '11px', color: tM, fontFamily: ff, lineHeight: '1.5' }}>
                      {isAr
                        ? 'الموافقة ترسل بريداً إلكترونياً تلقائياً للوسيط وتُصدر الوثيقة فوراً.'
                        : 'Approval automatically emails the broker and issues the policy immediately.'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 gap-3 py-8">
                  {selected.status === 'Approved' ? (
                    <CheckCircle2 size={40} style={{ color: B.seafoam }} />
                  ) : (
                    <XCircle size={40} style={{ color: '#FF7366' }} />
                  )}
                  <p style={{ fontFamily: ffH, fontSize: '14px', fontWeight: 700, color: selected.status === 'Approved' ? B.seafoam : '#FF7366' }}>
                    {isAr
                      ? selected.status === 'Approved' ? 'تمت الموافقة' : 'تم الرفض'
                      : selected.status}
                  </p>
                  <p style={{ fontSize: '12px', color: tM, fontFamily: ff, textAlign: 'center' }}>
                    {isAr ? 'يمكنك عرض مرفقات الوثيقة أدناه' : 'You can view the policy documents below'}
                  </p>
                  <button className="px-5 py-2 rounded-xl border text-sm flex items-center gap-2 transition-all hover:opacity-80"
                    style={{ borderColor: bdr, color: tM, fontFamily: ff }}>
                    <Eye size={14} />
                    {isAr ? 'عرض الوثيقة' : 'View Policy'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
