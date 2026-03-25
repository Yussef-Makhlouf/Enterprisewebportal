import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, BarChart2, TrendingUp, FileText, Filter, RefreshCw } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  B, cardBg, cardBdr, cardSdw, textHero, textBody, textMuted,
  gridLine, tooltipStyle, innerBg, innerBdr,
} from '../../utils/darkPalette';

/* ── Seed data ─────────────────────────────────────────── */
const MONTHLY_POLICIES = [
  { month: 'Oct', Travel: 42, Motor: 28, Medical: 18, Home: 9, Domestic: 4 },
  { month: 'Nov', Travel: 51, Motor: 34, Medical: 22, Home: 11, Domestic: 6 },
  { month: 'Dec', Travel: 67, Motor: 38, Medical: 25, Home: 14, Domestic: 8 },
  { month: 'Jan', Travel: 58, Motor: 29, Medical: 20, Home: 10, Domestic: 5 },
  { month: 'Feb', Travel: 73, Motor: 44, Medical: 31, Home: 16, Domestic: 9 },
  { month: 'Mar', Travel: 89, Motor: 52, Medical: 38, Home: 19, Domestic: 11 },
];

const COMMISSION_DATA = [
  { month: 'Oct', commission: 2840, target: 3000 },
  { month: 'Nov', commission: 3450, target: 3000 },
  { month: 'Dec', commission: 4200, target: 4000 },
  { month: 'Jan', commission: 3750, target: 4000 },
  { month: 'Feb', commission: 4900, target: 4500 },
  { month: 'Mar', commission: 5600, target: 5000 },
];

const POLICY_TABLE = [
  { id: 'TRV-2025-00891', type: 'Travel',   status: 'Active',  premium: 180, issued: '2025-03-20', broker: 'Khalid Al-Mansouri' },
  { id: 'MOT-2025-00412', type: 'Motor',    status: 'Active',  premium: 420, issued: '2025-03-19', broker: 'Sara Al-Qasim' },
  { id: 'MED-2025-00234', type: 'Medical',  status: 'Pending', premium: 760, issued: '2025-03-18', broker: 'Omar Hamdan' },
  { id: 'HOM-2025-00115', type: 'Home',     status: 'Active',  premium: 290, issued: '2025-03-17', broker: 'Layla Nasser' },
  { id: 'DOM-2025-00078', type: 'Domestic', status: 'Expired', premium: 140, issued: '2025-02-28', broker: 'Ahmad Saleh' },
  { id: 'TRV-2025-00888', type: 'Travel',   status: 'Active',  premium: 210, issued: '2025-03-15', broker: 'Rania Khalil' },
];

const LOB_COLORS: Record<string, string> = {
  Travel: B.indigo, Motor: B.ocean, Medical: B.seafoam,
  Home: '#FF7366', Domestic: B.roseGold,
};

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  Active:  { color: B.seafoam,  bg: 'rgba(107,202,186,0.13)' },
  Pending: { color: B.roseGold, bg: 'rgba(210,140,100,0.13)' },
  Expired: { color: B.ocean,    bg: 'rgba(128,148,230,0.13)' },
};

type ReportTab = 'policies' | 'brokers' | 'commissions';

/* ─────────────────────────────────────────────────────── */
export function ReportsPage() {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const bg   = isDark ? '#0C1221' : '#F8F7FC';
  const cBg  = cardBg(isDark);
  const bdr  = cardBdr(isDark);
  const cSdw = cardSdw(isDark);
  const iBg  = innerBg(isDark);
  const iBdr = innerBdr(isDark);
  const tH   = textHero(isDark);
  const tB   = textBody(isDark);
  const tM   = textMuted(isDark);
  const gl   = gridLine(isDark);
  const ff   = isAr ? "'Almarai', Tahoma, sans-serif"  : "'Georama', Verdana, sans-serif";
  const ffH  = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Reforma', Verdana, sans-serif";
  const ffM  = "'IBM Plex Mono', monospace";

  const [tab, setTab] = useState<ReportTab>('policies');
  const [dateRange, setDateRange] = useState('last6months');

  const kpis = [
    { label: isAr ? 'إجمالي الوثائق' : 'Total Policies', value: '324', trend: '+12%', color: B.indigo },
    { label: isAr ? 'إجمالي الأقساط' : 'Total Premium', value: 'JD 94,200', trend: '+18%', color: B.roseGold },
    { label: isAr ? 'إجمالي العمولة' : 'Total Commission', value: 'JD 5,600', trend: '+14%', color: B.seafoam },
    { label: isAr ? 'معدل التجديد' : 'Renewal Rate', value: '78%', trend: '+5%', color: B.ocean },
  ];

  const tabs: { key: ReportTab; label: string; labelAr: string; Icon: any }[] = [
    { key: 'policies',    label: 'Policy Report',     labelAr: 'تقرير الوثائق', Icon: FileText },
    { key: 'brokers',     label: 'Broker Performance', labelAr: 'أداء الوسطاء',  Icon: BarChart2 },
    { key: 'commissions', label: 'Commission Report',  labelAr: 'تقرير العمولات', Icon: TrendingUp },
  ];

  return (
    <div className="p-5 min-h-full" style={{ background: bg, direction: isRTL ? 'rtl' : 'ltr', fontFamily: ff }}>

      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-1 h-6 rounded-full" style={{ background: B.roseGold }} />
            <h1 style={{ fontFamily: ffH, fontSize: '1.45rem', fontWeight: 700, color: tH }}>
              {isAr ? 'التقارير والإحصاءات' : 'Reports & Analytics'}
            </h1>
          </div>
          <p style={{ fontSize: '13px', color: tM, marginInlineStart: '16px' }}>
            {isAr ? 'رؤى شاملة عن وثائقك وعمولاتك وأداء الوسطاء' : 'Comprehensive insights on your policies, commissions, and broker performance'}
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF', borderColor: bdr, color: tB, fontFamily: ff }}
          >
            <option value="last30days">{isAr ? 'آخر 30 يوم' : 'Last 30 days'}</option>
            <option value="last3months">{isAr ? 'آخر 3 أشهر' : 'Last 3 months'}</option>
            <option value="last6months">{isAr ? 'آخر 6 أشهر' : 'Last 6 months'}</option>
            <option value="thisyear">{isAr ? 'هذا العام' : 'This year'}</option>
          </select>
          <button
            onClick={() => addToast({ type: 'success', title: isAr ? 'جاري تحديث البيانات...' : 'Refreshing data...' })}
            className="p-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: bdr, color: tM }}
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={() => addToast({ type: 'success', title: isAr ? 'جاري التصدير...' : 'Exporting to Excel...' })}
            className="px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2 transition-all hover:opacity-90"
            style={{ background: B.indigo, boxShadow: '0 2px 10px rgba(25,5,140,0.30)', fontFamily: ff }}
          >
            <Download size={15} />
            {isAr ? 'تصدير Excel' : 'Export Excel'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(k => (
          <div key={k.label} className="p-5 rounded-2xl"
            style={{ background: cBg, borderTop: `3px solid ${k.color}`, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: tM, fontFamily: ff, marginBottom: '10px' }}>
              {k.label}
            </p>
            <div style={{ fontFamily: ffM, fontSize: '1.6rem', fontWeight: 700, color: isDark ? '#FFFFFF' : k.color, lineHeight: 1 }}>
              {k.value}
            </div>
            <p style={{ fontSize: '12px', marginTop: '6px', fontFamily: ff }}>
              <span style={{ color: B.seafoam, fontWeight: 600 }}>{k.trend}</span>
              <span style={{ color: tM }}> {isAr ? 'مقارنة بالفترة السابقة' : 'vs prev period'}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 rounded-xl p-1" style={{ background: iBg, border: `1px solid ${iBdr}`, width: 'fit-content' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              fontFamily: ff,
              background: tab === t.key ? (isDark ? '#1E2D47' : '#FFFFFF') : 'transparent',
              color: tab === t.key ? (isDark ? B.ocean : B.indigo) : tM,
              boxShadow: tab === t.key ? '0 1px 6px rgba(0,0,0,0.10)' : 'none',
            }}
          >
            <t.Icon size={14} />
            {isAr ? t.labelAr : t.label}
          </button>
        ))}
      </div>

      {/* Policy Report tab */}
      {tab === 'policies' && (
        <div className="grid grid-cols-3 gap-4">
          {/* LOB bar chart */}
          <div className="col-span-2 rounded-2xl p-5" style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontFamily: ffH, fontSize: '14px', fontWeight: 700, color: tH }}>
                {isAr ? 'الوثائق حسب خط الأعمال (شهرياً)' : 'Policies by LOB (Monthly)'}
              </h3>
              <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
                style={{ borderColor: bdr, color: tM, fontFamily: ff }}>
                <Filter size={12} />
                {isAr ? 'تصفية' : 'Filter'}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={MONTHLY_POLICIES} barSize={8} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke={gl} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: tM, fontFamily: ffM }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: tM, fontFamily: ffM }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle(ff)} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontFamily: ff }} />
                {Object.entries(LOB_COLORS).map(([lob, color]) => (
                  <Bar key={lob} dataKey={lob} fill={color} radius={[3, 3, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* LOB summary */}
          <div className="rounded-2xl p-5" style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
            <h3 style={{ fontFamily: ffH, fontSize: '14px', fontWeight: 700, color: tH, marginBottom: '16px' }}>
              {isAr ? 'ملخص خطوط الأعمال' : 'LOB Summary'}
            </h3>
            {[
              { lob: 'Travel', count: 324, pct: 40 },
              { lob: 'Motor', count: 225, pct: 28 },
              { lob: 'Medical', count: 154, pct: 19 },
              { lob: 'Home', count: 79, pct: 10 },
              { lob: 'Domestic', count: 43, pct: 5 },
            ].map(row => (
              <div key={row.lob} className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: LOB_COLORS[row.lob] }} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: tB, fontFamily: ff }}>{row.lob}</span>
                  </span>
                  <span style={{ fontFamily: ffM, fontSize: '12px', fontWeight: 600, color: tH }}>{row.count}</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: '4px', background: isDark ? 'rgba(255,255,255,0.08)' : '#EEF0F8' }}>
                  <div style={{ width: `${row.pct}%`, height: '100%', background: LOB_COLORS[row.lob], borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="col-span-3 rounded-2xl overflow-hidden" style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
            <div className="px-5 py-3 border-b" style={{ borderColor: bdr }}>
              <h3 style={{ fontFamily: ffH, fontSize: '13px', fontWeight: 700, color: tH }}>
                {isAr ? 'أحدث الوثائق' : 'Recent Policies'}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${bdr}` }}>
                    {[isAr ? 'رقم الوثيقة' : 'Policy ID', isAr ? 'النوع' : 'Type', isAr ? 'الحالة' : 'Status',
                      isAr ? 'القسط' : 'Premium', isAr ? 'تاريخ الإصدار' : 'Issued', isAr ? 'الوسيط' : 'Broker'].map(h => (
                      <th key={h} className="px-5 py-3"
                        style={{ fontSize: '10px', fontWeight: 700, color: tM, textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: isRTL ? 'right' : 'left', fontFamily: ff }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {POLICY_TABLE.map(row => {
                    const ss = STATUS_STYLE[row.status] || STATUS_STYLE.Active;
                    return (
                      <tr key={row.id} className="border-b last:border-0 transition-colors"
                        style={{ borderColor: bdr }}
                        onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(128,148,230,0.05)' : 'rgba(25,5,140,0.02)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td className="px-5 py-3">
                          <span style={{ fontFamily: ffM, fontSize: '12px', color: isDark ? B.ocean : B.indigo, fontWeight: 600 }}>{row.id}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-0.5 rounded-md text-white"
                            style={{ fontSize: '10px', fontWeight: 700, background: LOB_COLORS[row.type] }}>
                            {row.type}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-1 rounded-full"
                            style={{ fontSize: '11px', fontWeight: 600, color: ss.color, background: ss.bg }}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span style={{ fontFamily: ffM, fontSize: '13px', fontWeight: 600, color: tH }}>JD {row.premium}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span style={{ fontFamily: ffM, fontSize: '12px', color: tM }}>{row.issued}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span style={{ fontSize: '12px', color: tB, fontFamily: ff }}>{row.broker}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Commission Report tab */}
      {tab === 'commissions' && (
        <div className="grid grid-cols-3 gap-4">
          {/* Commission line chart */}
          <div className="col-span-2 rounded-2xl p-5" style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
            <h3 style={{ fontFamily: ffH, fontSize: '14px', fontWeight: 700, color: tH, marginBottom: '20px' }}>
              {isAr ? 'العمولة الشهرية مقابل الهدف' : 'Monthly Commission vs. Target'}
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={COMMISSION_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke={gl} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: tM, fontFamily: ffM }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: tM, fontFamily: ffM }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                <Tooltip contentStyle={tooltipStyle(ff)} formatter={(v: any) => [`JD ${v}`, '']} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontFamily: ff }} />
                <Line type="monotone" dataKey="commission" stroke={B.roseGold} strokeWidth={2.5} dot={{ r: 4, fill: B.roseGold }} name={isAr ? 'العمولة' : 'Commission'} />
                <Line type="monotone" dataKey="target" stroke={isDark ? 'rgba(128,148,230,0.50)' : 'rgba(25,5,140,0.30)'} strokeWidth={1.5} strokeDasharray="5 3" dot={false} name={isAr ? 'الهدف' : 'Target'} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Commission summary */}
          <div className="rounded-2xl p-5" style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
            <h3 style={{ fontFamily: ffH, fontSize: '14px', fontWeight: 700, color: tH, marginBottom: '16px' }}>
              {isAr ? 'ملخص العمولة' : 'Commission Summary'}
            </h3>
            {[
              { label: isAr ? 'العمولة الكلية' : 'Total Commission', value: 'JD 24,740', color: B.roseGold },
              { label: isAr ? 'أعلى شهر' : 'Best Month', value: 'March (JD 5,600)', color: B.seafoam },
              { label: isAr ? 'متوسط شهري' : 'Monthly Average', value: 'JD 4,123', color: B.ocean },
              { label: isAr ? 'تحقيق الهدف' : 'Target Achievement', value: '112%', color: B.seafoam },
            ].map(row => (
              <div key={row.label} className="flex items-start justify-between mb-4 pb-4"
                style={{ borderBottom: `1px solid ${bdr}` }}>
                <span style={{ fontSize: '12px', color: tM, fontFamily: ff }}>{row.label}</span>
                <span style={{ fontFamily: ffM, fontSize: '13px', fontWeight: 700, color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Broker Performance tab */}
      {tab === 'brokers' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: cBg, border: `1px solid ${bdr}`, boxShadow: cSdw }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: bdr }}>
            <h3 style={{ fontFamily: ffH, fontSize: '14px', fontWeight: 700, color: tH }}>
              {isAr ? 'أداء الوسطاء' : 'Broker Performance Leaderboard'}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${bdr}` }}>
                  {[isAr ? 'الترتيب' : 'Rank', isAr ? 'الوسيط' : 'Broker',
                    isAr ? 'الوثائق' : 'Policies', isAr ? 'الأقساط' : 'Premium',
                    isAr ? 'العمولة' : 'Commission', isAr ? 'معدل التجديد' : 'Renewal Rate', isAr ? 'الأداء' : 'Score'].map(h => (
                    <th key={h} className="px-5 py-3"
                      style={{ fontSize: '10px', fontWeight: 700, color: tM, textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: isRTL ? 'right' : 'left', fontFamily: ff }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: 'Khalid Al-Mansouri', policies: 89, premium: 24500, commission: 1960, renewal: '84%', score: 96 },
                  { rank: 2, name: 'Sara Al-Qasim', policies: 62, premium: 18200, commission: 1183, renewal: '79%', score: 88 },
                  { rank: 3, name: 'Layla Nasser', policies: 58, premium: 14800, commission: 888, renewal: '76%', score: 82 },
                  { rank: 4, name: 'Omar Hamdan', policies: 45, premium: 13100, commission: 983, renewal: '70%', score: 74 },
                  { rank: 5, name: 'Rania Khalil', policies: 38, premium: 10400, commission: 728, renewal: '65%', score: 68 },
                ].map(row => (
                  <tr key={row.rank} className="border-b last:border-0 transition-colors"
                    style={{ borderColor: bdr }}
                    onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(128,148,230,0.05)' : 'rgba(25,5,140,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-3.5">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm"
                        style={{
                          background: row.rank === 1 ? `${B.roseGold}20` : row.rank === 2 ? `${B.ocean}15` : iBg,
                          color: row.rank === 1 ? B.roseGold : row.rank === 2 ? B.ocean : tM,
                          fontFamily: ffM,
                        }}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: `linear-gradient(135deg, ${B.indigo}, ${B.ocean})` }}>
                          {row.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: tH, fontFamily: ff }}>{row.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span style={{ fontFamily: ffM, fontSize: '13px', fontWeight: 600, color: isDark ? B.ocean : B.indigo }}>{row.policies}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span style={{ fontFamily: ffM, fontSize: '13px', color: tH }}>JD {row.premium.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span style={{ fontFamily: ffM, fontSize: '13px', fontWeight: 600, color: B.roseGold }}>JD {row.commission.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span style={{ fontFamily: ffM, fontSize: '13px', color: tB }}>{row.renewal}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-full overflow-hidden" style={{ height: '5px', background: isDark ? 'rgba(255,255,255,0.08)' : '#EEF0F8', maxWidth: '80px' }}>
                          <div style={{ width: `${row.score}%`, height: '100%', background: row.score >= 90 ? B.seafoam : row.score >= 80 ? B.roseGold : B.ocean, borderRadius: '2px' }} />
                        </div>
                        <span style={{ fontFamily: ffM, fontSize: '11px', color: tM }}>{row.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
