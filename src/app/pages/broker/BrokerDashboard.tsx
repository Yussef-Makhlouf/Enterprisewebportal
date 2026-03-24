import { useNavigate } from 'react-router';
import type { ElementType } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  FileText, DollarSign, Clock, ArrowRight, CheckCircle,
  Plane, Car, Stethoscope, Sun, Moon, TrendingUp, TrendingDown, Sparkles
} from 'lucide-react';
import {
  B, cardBg, cardSdw, cardBdr, innerBg, innerBdr,
  textHero, textBody, textMuted, gridLine, tooltipStyle, STATUS
} from '../../utils/darkPalette';

/* ── Static data ─────────────────────────────────────────── */
const policyData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  policies: [3,5,4,7,6,8,10,9,11,8,12,9][i],
}));

const commissionData = [
  { name: 'Travel',  value: 45, color: B.indigo   },
  { name: 'Motor',   value: 30, color: B.ocean     },
  { name: 'Medical', value: 15, color: B.seafoam   },
  { name: 'Home',    value: 10, color: B.roseGold  },
];

const POLICY_ICONS: Record<string, ElementType> = {
  Travel: Plane, Motor: Car, Medical: Stethoscope,
};

const recentPolicies = [
  { no: 'POL-2025-45182', typeKey: 'Travel',  name: 'Ahmad Al-Ahmad', nameAr: 'أحمد الأحمد', premium: '214.60', status: 'Active'  },
  { no: 'POL-2025-45103', typeKey: 'Motor',   name: 'Sara Hassan',    nameAr: 'سارة حسن',   premium: '287.00', status: 'Active'  },
  { no: 'POL-2025-44921', typeKey: 'Travel',  name: 'Faris Noor',     nameAr: 'فارس نور',    premium: '145.20', status: 'Active'  },
  { no: 'POL-2025-44780', typeKey: 'Medical', name: 'Layla Omar',     nameAr: 'ليلى عمر',   premium: '520.00', status: 'Expired' },
];

const subBrokers = [
  { name: 'Tarek Al-Ahmad', nameAr: 'طارق الأحمد', policies: 12, commission: '84.00', avatar: 'TA', status: 'Active'   },
  { name: 'Hiba Karimi',    nameAr: 'هبة كريمي',   policies:  8, commission: '56.00', avatar: 'HK', status: 'Active'   },
  { name: 'Bilal Noor',     nameAr: 'بلال نور',    policies:  3, commission: '21.00', avatar: 'BN', status: 'Inactive' },
];

/* ── Component ───────────────────────────────────────────── */
export function BrokerDashboard() {
  const { theme, language, isRTL, currentUser } = useApp();
  const navigate = useNavigate();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const hour      = new Date().getHours();
  const isMorning = hour < 12;
  const greeting  = isMorning
    ? (isAr ? 'صباح الخير' : 'Good morning')
    : (isAr ? 'مساء الخير' : 'Good evening');

  /* resolved tokens */
  const bg    = cardBg(isDark);
  const sdw   = cardSdw(isDark);
  const bdr   = cardBdr(isDark);
  const iBg   = innerBg(isDark);
  const iBdr  = innerBdr(isDark);
  const tHero = textHero(isDark);
  const tBody = textBody(isDark);
  const tMute = textMuted(isDark);
  const grid  = gridLine(isDark);

  /* fonts */
  const ff  = isAr ? "'Almarai', Tahoma, sans-serif"  : "'Georama', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Reforma', Verdana, sans-serif";
  const ffM = "'IBM Plex Mono', monospace";

  const tt = tooltipStyle(ff);

  /* KPIs */
  const kpis = [
    { label: isAr ? 'وثائقي النشطة'          : 'MY ACTIVE POLICIES', value: '47',     delta: '+5',      up: true,  sub: isAr ? 'هذا الشهر' : 'this month',  stripe: B.indigo,   glow: 'rgba(128,148,230,0.22)', Icon: FileText   },
    { label: isAr ? 'الأقساط الشهرية (دينار)' : 'THIS MONTH PREMIUM', value: '12,450', delta: '+12.3%',  up: true,  sub: isAr ? 'مارس 2025' : 'March 2025',   stripe: B.ocean,    glow: 'rgba(128,148,230,0.22)', Icon: DollarSign },
    { label: isAr ? 'عمولاتي (دينار)'         : 'MY COMMISSIONS',     value: '996',    delta: '+8.1%',   up: true,  sub: isAr ? 'هذا الشهر' : 'this month',  stripe: B.seafoam,  glow: 'rgba(107,202,186,0.18)', Icon: TrendingUp },
    { label: isAr ? 'التجديدات المعلقة'        : 'PENDING RENEWALS',   value: '3',      delta: '2 urgent',up: false, sub: isAr ? 'هذا الشهر' : 'this month',  stripe: B.roseGold, glow: 'rgba(210,140,100,0.18)', Icon: Clock      },
  ];

  const cardStyle = (stripe: string) => ({
    background: bg,
    borderTop: `3px solid ${stripe}`,
    borderInlineStart: `1px solid ${bdr}`,
    borderInlineEnd: `1px solid ${bdr}`,
    borderBottom: `1px solid ${bdr}`,
    boxShadow: sdw,
    borderRadius: '12px',
    overflow: 'hidden' as const, position: 'relative' as const,
  });

  return (
    <div className="p-7 min-h-full gig-texture-bg bg-background text-foreground"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

      {/* ── License Banner ────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 rounded-xl mb-6"
        style={{
          background: isDark ? 'rgba(107,202,186,0.06)' : 'rgba(107,202,186,0.07)',
          borderTop: `3px solid ${B.seafoam}`,
          borderInlineStart: `1px solid rgba(107,202,186,0.25)`,
          borderInlineEnd: `1px solid rgba(107,202,186,0.25)`,
          borderBottom: `1px solid rgba(107,202,186,0.25)`,
        }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ border: `2px solid ${B.seafoam}`, background: 'rgba(107,202,186,0.10)' }}>
            <CheckCircle size={14} style={{ color: B.seafoam }} strokeWidth={2} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: tHero, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: ff }}>
            {isAr ? 'الرخصة سارية حتى 31 ديسمبر 2025' : 'License valid until Dec 31, 2025'}
          </span>
        </div>
        <span style={{ fontSize: '12px', color: B.seafoam, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: ff }}>
          {isAr ? '292 يوم متبقٍ' : '292 days remaining'}
        </span>
      </div>

      {/* ── Hero Header ───────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 pb-5"
        style={{ borderBottom: `1px solid ${bdr}` }}>
        <div>
          <h1 className="flex items-center gap-3"
            style={{
              fontFamily: ffH,
              fontSize: isAr ? '2.1rem' : '2rem',
              fontWeight: 700, lineHeight: 1.2,
              ...(isDark ? {
                background: `linear-gradient(135deg, #FFFFFF 0%, ${B.ocean} 55%, ${B.seafoam} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              } : { color: B.indigo }),
            }}>
            {greeting}, {isAr ? currentUser.nameAr.split(' ')[0] : currentUser.name.split(' ')[0]}
            {isMorning
              ? <Sun  size={22} style={{ color: B.roseGold, WebkitTextFillColor: B.roseGold }} />
              : <Moon size={22} style={{ color: B.ocean,   WebkitTextFillColor: B.ocean   }} />
            }
          </h1>
          <p style={{ fontSize: '14px', color: tBody, letterSpacing: '0.02em', marginTop: '6px', fontFamily: ff }}>
            {new Date().toLocaleDateString(isAr ? 'ar-JO' : 'en-JO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            <span className="mx-3" style={{ opacity: 0.30 }}>|</span>
            <span style={{ fontStyle: isAr ? 'normal' : 'italic', fontWeight: 600, color: B.roseGold, fontFamily: ffH }}>
              {isAr ? 'استثمارنا فيك' : 'Invested in You.'}
            </span>
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-full text-white uppercase tracking-wider hover:opacity-90 transition-all"
          style={{
            background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`,
            boxShadow: `0 4px 20px rgba(210,140,100,0.40)`,
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', fontFamily: ff,
          }}
          onClick={() => navigate('/broker/issuance')}
        >
          <FileText size={15} />
          {isAr ? 'إصدار وثيقة جديدة' : 'Issue New Policy'}
        </button>
      </div>

      {/* ── KPI Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="p-5 relative overflow-hidden" style={cardStyle(kpi.stripe)}>
            {isDark && (
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `radial-gradient(ellipse at top right, ${kpi.glow} 0%, transparent 65%)`
              }} />
            )}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: '10px', color: tMute, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', fontFamily: ff }}>
                  {kpi.label}
                </span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: isDark ? `${kpi.stripe}20` : `${kpi.stripe}10`,
                    border: `1.5px solid ${kpi.stripe}45`,
                    color: kpi.stripe,
                  }}>
                  <kpi.Icon size={14} strokeWidth={2} />
                </div>
              </div>
              <div style={{ fontFamily: ffH, fontSize: '2.1rem', fontWeight: 700, color: isDark ? '#FFFFFF' : kpi.stripe, lineHeight: 1, letterSpacing: '-0.02em' }}>
                {kpi.value}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div style={{ fontSize: '12px', color: tMute, fontFamily: ff }}>{kpi.sub}</div>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', fontFamily: ff,
                    background: kpi.up ? 'rgba(107,202,186,0.14)' : 'rgba(210,140,100,0.14)',
                    color: kpi.up ? B.seafoam : B.roseGold,
                  }}>
                  {kpi.up ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
                  {kpi.delta}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dark mode commission strip ───────────────── */}
      {isDark && (
        <div className="flex gap-2 mb-6">
          {commissionData.map(item => (
            <div key={item.name} className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                <span style={{ fontFamily: ff, fontSize: '11px', color: tMute, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{item.name}</span>
              </div>
              <span style={{ fontFamily: ffM, fontSize: '13px', fontWeight: 700, color: item.color }}>{item.value}%</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Charts Row ────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {/* Line chart */}
        <div className="col-span-2 p-6 rounded-xl" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: tHero, fontFamily: ffH }}>
              {isAr ? 'وثائقي حسب الشهر' : 'My Policies by Month'}
            </h3>
            {isDark && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(107,202,186,0.10)', border: '1px solid rgba(107,202,186,0.20)' }}>
                <Sparkles size={11} style={{ color: B.seafoam }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: B.seafoam, fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {isAr ? 'أداء جيد' : 'On Track'}
                </span>
              </div>
            )}
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={policyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: tMute, fontFamily: ff }} axisLine={false} tickLine={false} dy={10} />
              <YAxis
                orientation={isRTL ? 'right' : 'left'}
                tick={{ fontSize: 10, fill: tMute, fontFamily: ffM }}
                axisLine={false} tickLine={false}
                dx={isRTL ? 10 : -10}
              />
              <Tooltip contentStyle={tt} />
              <Line
                type="monotone"
                dataKey="policies"
                stroke={isDark ? B.ocean : B.indigo}
                strokeWidth={isDark ? 2.5 : 2.5}
                dot={{ fill: B.roseGold, r: 4, strokeWidth: 2, stroke: isDark ? '#111C2E' : '#FFFFFF' }}
                activeDot={{ r: 6, fill: B.roseGold, stroke: isDark ? '#111C2E' : '#FFFFFF', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <div className="p-6 rounded-xl flex flex-col" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          <h3 className="mb-4" style={{ fontSize: '15px', fontWeight: 600, color: tHero, fontFamily: ffH }}>
            {isAr ? 'توزيع العمولات' : 'Commission Breakdown'}
          </h3>
          <div className="flex-1 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={commissionData} cx="50%" cy="50%" innerRadius={44} outerRadius={62} dataKey="value" strokeWidth={0}>
                  {commissionData.map((e) => <Cell key={`cell-${e.name}`} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={tt} />
              </PieChart>
            </ResponsiveContainer>
            {!isDark && (
              <div className="space-y-1.5 mt-3">
                {commissionData.map(l => (
                  <div key={l.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: l.color }} />
                      <span style={{ fontSize: '11px', color: tMute, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: ff }}>{l.name}</span>
                    </div>
                    <span style={{ fontFamily: ffM, fontSize: '12px', fontWeight: 600, color: tHero }}>{l.value}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Row ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-5">
        {/* Recent Policies */}
        <div className="p-6 rounded-xl" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: tHero, fontFamily: ffH }}>
              {isAr ? 'الوثائق الأخيرة' : 'Recent Policies'}
            </h3>
            <button
              className="flex items-center gap-1 uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ fontSize: '10px', fontWeight: 700, color: isDark ? B.ocean : B.indigo, fontFamily: ff }}
              onClick={() => navigate('/broker/policies')}
            >
              {isAr ? 'عرض الكل' : 'View All'}
              <ArrowRight size={13} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
          <div className="space-y-2">
            {recentPolicies.map((p) => {
              const PolicyIcon = POLICY_ICONS[p.typeKey] || FileText;
              const st = STATUS[p.status] || STATUS.Active;
              return (
                <div key={p.no}
                  className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all"
                  style={{ background: iBg, border: `1px solid ${iBdr}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(128,148,230,0.35)'; (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(128,148,230,0.08)' : 'rgba(25,5,140,0.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = iBdr; (e.currentTarget as HTMLElement).style.background = iBg; }}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        border: `1.5px solid ${isDark ? 'rgba(128,148,230,0.30)' : 'rgba(25,5,140,0.18)'}`,
                        color: isDark ? B.ocean : B.indigo,
                        background: isDark ? 'rgba(128,148,230,0.08)' : 'rgba(25,5,140,0.05)',
                      }}>
                      <PolicyIcon size={15} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span style={{ fontFamily: ffM, fontSize: '11px', color: isDark ? B.ocean : B.indigo, fontWeight: 700, display: 'block' }}>{p.no}</span>
                      <p style={{ fontSize: '12px', color: tMute, marginTop: '2px', fontFamily: ff }}>
                        {isAr ? p.nameAr : p.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p style={{ fontFamily: ffM, fontSize: '13px', fontWeight: 700, color: tHero }}>JOD {p.premium}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full uppercase"
                      style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', fontFamily: ff, background: st.bg, color: st.color }}>
                      {isAr ? st.labelAr : st.labelEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-Brokers */}
        <div className="p-6 rounded-xl" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: tHero, fontFamily: ffH }}>
              {isAr ? 'وسطائي الفرعيون' : 'My Sub-Brokers'}
            </h3>
            <button
              className="flex items-center gap-1 uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ fontSize: '10px', fontWeight: 700, color: isDark ? B.ocean : B.indigo, fontFamily: ff }}
              onClick={() => navigate('/broker/sub-brokers')}
            >
              {isAr ? 'إدارة' : 'Manage'}
              <ArrowRight size={13} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
          <div className="space-y-2">
            {subBrokers.map((sb) => {
              const st = STATUS[sb.status] || STATUS.Inactive;
              return (
                <div key={sb.name}
                  className="flex items-center gap-4 p-3.5 rounded-xl cursor-pointer transition-all"
                  style={{ background: iBg, border: `1px solid ${iBdr}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(128,148,230,0.35)'; (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(128,148,230,0.08)' : 'rgba(25,5,140,0.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = iBdr; (e.currentTarget as HTMLElement).style.background = iBg; }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${B.ocean}, ${B.indigo})`, fontSize: '12px', fontWeight: 700, boxShadow: isDark ? '0 2px 8px rgba(128,148,230,0.30)' : 'none' }}>
                    {sb.avatar}
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: '13px', fontWeight: 600, color: tHero, fontFamily: ff }}>
                      {isAr ? sb.nameAr : sb.name}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span style={{ fontSize: '11px', color: tMute, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: ff }}>
                        {sb.policies} {isAr ? 'وثيقة' : 'policies'}
                      </span>
                      <span style={{ fontFamily: ffM, fontSize: '12px', color: B.seafoam, fontWeight: 700 }}>
                        JOD {sb.commission}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full uppercase shrink-0"
                    style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', fontFamily: ff, background: st.bg, color: st.color }}>
                    {isAr ? st.labelAr : st.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}