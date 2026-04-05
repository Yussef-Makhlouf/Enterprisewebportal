import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingUp, TrendingDown, Users, FileText, DollarSign,
  Clock, AlertTriangle, ArrowRight, Edit2, Plus, Activity
} from 'lucide-react';
import { BrokerDetailDrawer } from '../../components/admin/BrokerDetailDrawer';
import { EditBrokerDrawer }   from '../../components/admin/EditBrokerDrawer';
import { SendInvitationModal } from '../../components/admin/SendInvitationModal';
import {
  B, cardBg, cardSdw, cardBdr, innerBg, innerBdr,
  textHero, textBody, textMuted, gridLine, tooltipStyle, STATUS,
  hoverBg, hoverBorder
} from '../../utils/darkPalette';

/* ── Static data ─────────────────────────────────────────── */
const monthlyData = [
  { month: 'Jan', premium: 920000,  commission: 73600  },
  { month: 'Feb', premium: 1050000, commission: 84000  },
  { month: 'Mar', premium: 880000,  commission: 70400  },
  { month: 'Apr', premium: 1120000, commission: 89600  },
  { month: 'May', premium: 1300000, commission: 104000 },
  { month: 'Jun', premium: 1180000, commission: 94400  },
  { month: 'Jul', premium: 1400000, commission: 112000 },
  { month: 'Aug', premium: 1250000, commission: 100000 },
  { month: 'Sep', premium: 1350000, commission: 108000 },
  { month: 'Oct', premium: 1150000, commission: 92000  },
  { month: 'Nov', premium: 1280000, commission: 102400 },
  { month: 'Dec', premium: 1200000, commission: 96000  },
];

const lobData = [
  { name: 'Travel',   value: 38, color: B.purple   },
  { name: 'Motor',    value: 28, color: B.ocean     },
  { name: 'Medical',  value: 20, color: B.seafoam   },
  { name: 'Home',     value:  8, color: B.roseGold  },
  { name: 'Domestic', value:  6, color: B.purple    },
];

const recentBrokers = [
  { id: 1, name: 'Khalid Al-Mansouri', nameAr: 'خالد المنصوري', email: 'k.mansouri@email.com', type: 'Broker', typeAr: 'وسيط', status: 'Active',  avatar: 'KM' },
  { id: 2, name: 'Sara Al-Qasim',      nameAr: 'سارة القاسم',   email: 's.qasim@email.com',    type: 'Agent',  typeAr: 'وكيل', status: 'Pending', avatar: 'SQ' },
  { id: 3, name: 'Omar Hamdan',        nameAr: 'عمر حمدان',     email: 'o.hamdan@email.com',   type: 'Broker', typeAr: 'وسيط', status: 'Active',  avatar: 'OH' },
  { id: 4, name: 'Layla Nasser',       nameAr: 'ليلى ناصر',    email: 'l.nasser@email.com',   type: 'Agent',  typeAr: 'وكيل', status: 'Active',  avatar: 'LN' },
  { id: 5, name: 'Ahmad Saleh',        nameAr: 'أحمد صالح',    email: 'a.saleh@email.com',    type: 'Broker', typeAr: 'وسيط', status: 'Expired', avatar: 'AS' },
];

const expiryAlerts = [
  { name: 'Faris Al-Khaldi', nameAr: 'فارس الخالدي', days: 8,  total: 30 },
  { name: 'Nour Al-Hamad',   nameAr: 'نور الحمد',    days: 15, total: 30 },
  { name: 'Rami Jamal',      nameAr: 'رامي جمال',    days: 24, total: 30 },
];

/* ── Component ───────────────────────────────────────────── */
export function AdminDashboard() {
  const { language, theme, isRTL, currentUser, addToast } = useApp();
  const navigate = useNavigate();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const [drawerOpen,    setDrawerOpen]    = useState(false);
  const [editOpen,      setEditOpen]      = useState(false);
  const [inviteOpen,    setInviteOpen]    = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<any>(null);

  const hour     = new Date().getHours();
  const greeting = hour < 12
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
  const ff  = "'Almarai', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Georama', Verdana, sans-serif";
  const ffM = "'IBM Plex Mono', monospace";
  const tt  = tooltipStyle(ff, isDark);

  /* bar colors adapt to dark */
  const barPrem = isDark ? B.ocean   : B.indigo;
  const barComm = isDark ? B.seafoam : B.ocean;

  /* KPIs */
  const kpis = [
    { label: isAr ? 'إجمالي الوسطاء'         : 'TOTAL BROKERS',   value: '148',   delta: '+12%',  up: true,  sub: isAr ? '124 نشط'       : '124 active',  stripe: isDark ? B.ocean : B.indigo,   glow: 'rgba(128,148,230,0.22)', icon: Users      },
    { label: isAr ? 'الوثائق النشطة'          : 'ACTIVE POLICIES', value: '2,847', delta: '+8.3%', up: true,  sub: isAr ? '47 هذا الأسبوع' : '47 this week', stripe: B.ocean,    glow: 'rgba(128,148,230,0.22)', icon: FileText   },
    { label: isAr ? 'الأقساط الشهرية (دينار)' : 'MONTHLY PREMIUM', value: '1.2M',  delta: '+5.1%', up: true,  sub: isAr ? 'أكتوبر 2025'   : 'October 2025', stripe: B.seafoam,  glow: 'rgba(107,202,186,0.18)', icon: DollarSign },
    { label: isAr ? 'المهام المعلقة'          : 'PENDING TASKS',   value: '23',    delta: '-3',    up: false, sub: isAr ? '5 عاجلة'       : '5 urgent',     stripe: B.roseGold, glow: 'rgba(210,140,100,0.18)', icon: Clock      },
  ];

  const cardStyle = (stripe: string) => ({
    background: bg, border: `1px solid ${bdr}`, boxShadow: sdw,
    borderTop: `3px solid ${stripe}`, borderRadius: '12px',
    overflow: 'hidden' as const, position: 'relative' as const,
  });

  return (
    <div className="p-7 min-h-full gig-texture-bg bg-background text-foreground"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

      {/* ── Alert Banner ─────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 rounded-xl mb-6"
        style={{
          background: isDark ? 'rgba(210,140,100,0.07)' : 'rgba(210,140,100,0.06)',
          border: `1px solid rgba(210,140,100,0.28)`,
          borderTop: `3px solid ${B.roseGold}`,
        }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ border: `2px solid ${B.roseGold}`, background: 'rgba(210,140,100,0.10)' }}>
            <AlertTriangle size={14} style={{ color: B.roseGold }} strokeWidth={2} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: tHero, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: ff }}>
            {isAr ? '3 رخص وسطاء تنتهي خلال 30 يوماً' : '3 broker licenses expiring within 30 days'}
          </span>
        </div>
        <button
          className="flex items-center gap-1.5 uppercase tracking-wider hover:opacity-75 transition-opacity"
          style={{ fontSize: '12px', fontWeight: 700, color: B.roseGold, fontFamily: ff }}
          onClick={() => navigate('/admin/brokers')}
        >
          {isAr ? 'عرض الآن' : 'View Now'}
          <ArrowRight size={13} className={isRTL ? 'rotate-180' : ''} />
        </button>
      </div>

      {/* ── Page Header ──────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-5"
        style={{ borderBottom: `1px solid ${bdr}` }}>
        <div>
          <h1 style={{
            fontFamily: ffH, fontSize: isAr ? '2.1rem' : '2rem', fontWeight: 700, lineHeight: 1.2,
            ...(isDark ? {
              background: `linear-gradient(135deg, #FFFFFF 0%, ${B.ocean} 55%, ${B.seafoam} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            } : { color: B.indigo }),
          }}>
            {greeting}, {isAr ? currentUser.nameAr.split(' ')[0] : currentUser.name.split(' ')[0]}
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
          onClick={() => { setSelectedBroker(recentBrokers[0]); setInviteOpen(true); }}
        >
          <Plus size={15} />
          {isAr ? 'إرسال دعوة' : 'Send Invitation'}
        </button>
      </div>

      {/* ── KPI Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
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
                  style={{ background: `${kpi.stripe}18`, border: `1.5px solid ${kpi.stripe}45`, color: kpi.stripe }}>
                  <kpi.icon size={14} strokeWidth={2} />
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

      {/* ── Activity Strip (dark only) ───────────────── */}
      {isDark && (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-6 px-5 py-3 rounded-xl"
          style={{ background: 'rgba(128,148,230,0.06)', border: '1px solid rgba(128,148,230,0.12)' }}>
          <div className="flex items-center gap-2">
            <Activity size={14} style={{ color: B.ocean }} />
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: B.ocean, fontFamily: ff }}>
              {isAr ? 'النشاط اليوم' : "Today's Activity"}
            </span>
          </div>
          {[
            { label: isAr ? 'وثائق جديدة' : 'New Policies', value: '12', color: B.seafoam },
            { label: isAr ? 'وسطاء جدد'   : 'New Brokers',  value: '3',  color: B.ocean    },
            { label: isAr ? 'طلبات معلقة'  : 'Pending',     value: '5',  color: B.roseGold },
            { label: isAr ? 'الإيرادات'   : 'Revenue',      value: 'JOD 84K', color: B.seafoam },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span style={{ fontSize: '11px', color: tMute, fontFamily: ff }}>{item.label}</span>
              <span style={{ fontFamily: ffM, fontSize: '13px', fontWeight: 700, color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Charts Row ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Bar chart */}
        <div className="col-span-1 lg:col-span-2 p-6 rounded-xl"
          style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: tHero, fontFamily: ff }}>
              {isAr ? 'حجم الأقساط الشهرية' : 'Monthly Premium Volume'}
            </h3>
            <div className="flex items-center gap-4">
              {[{ color: barPrem, label: isAr ? 'الأقساط' : 'Premium' }, { color: barComm, label: isAr ? 'العمولات' : 'Commission' }].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-3 h-2 rounded-sm" style={{ background: item.color }} />
                  <span style={{ fontSize: '10px', color: tMute, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: ff }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barSize={13} barGap={3} >
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: tMute, fontFamily: ff }} axisLine={false} tickLine={false} dy={10} />
              <YAxis
                orientation={isRTL ? 'right' : 'left'}
                tick={{ fontSize: 10, fill: tMute, fontFamily: ffM }}
                axisLine={false} tickLine={false}
                dx={isRTL ? 10 : -10}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip contentStyle={tt} itemStyle={{ color: isDark ? '#E8F0FF' : undefined }} formatter={(val: any) => [`JOD ${(val / 1000).toFixed(0)}K`]} />
              <Bar dataKey="premium"    fill={barPrem} radius={[4,4,0,0]} />
              <Bar dataKey="commission" fill={barComm} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <div className="p-6 rounded-xl flex flex-col"
          style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          <h3 className="mb-4" style={{ fontSize: '15px', fontWeight: 600, color: tHero, fontFamily: ff }}>
            {isAr ? 'توزيع خطوط الأعمال' : 'LOB Distribution'}
          </h3>
          <div className="flex-1 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height={155}>
              <PieChart>
                <Pie data={lobData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} dataKey="value" strokeWidth={0}>
                  {lobData.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={tt} itemStyle={{ color: isDark ? '#E8F0FF' : undefined }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-3">
              {lobData.map((l) => (
                <div key={l.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: l.color }} />
                    <span style={{ fontSize: '11px', color: tMute, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: ff }}>{l.name}</span>
                  </div>
                  <span style={{ fontFamily: ffM, fontSize: '12px', fontWeight: 600, color: tHero }}>{l.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Brokers */}
        <div className="p-6 rounded-xl" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: tHero, fontFamily: ffH }}>
              {isAr ? 'الوسطاء المضافون مؤخراً' : 'Recently Added Brokers'}
            </h3>
            <button
              className="flex items-center gap-1 uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ fontSize: '10px', fontWeight: 700, color: isDark ? B.ocean : B.indigo, fontFamily: ff }}
              onClick={() => navigate('/admin/brokers')}
            >
              {isAr ? 'عرض الكل' : 'View All'}
              <ArrowRight size={13} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
          <div className="space-y-2">
            {recentBrokers.map((broker) => {
              const st = STATUS[broker.status] || STATUS.Inactive;
              return (
                <div
                  key={broker.id}
                  className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                  style={{ background: iBg, border: `1px solid ${iBdr}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = hoverBorder(isDark); (e.currentTarget as HTMLElement).style.background = hoverBg(isDark); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = iBdr; (e.currentTarget as HTMLElement).style.background = iBg; }}
                  onClick={() => { setSelectedBroker(broker); setDrawerOpen(true); }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${B.ocean}, ${B.indigo})`, fontSize: '12px', fontWeight: 700, boxShadow: isDark ? '0 2px 8px rgba(128,148,230,0.25)' : 'none' }}>
                    {broker.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: '13px', fontWeight: 600, color: tHero, fontFamily: ff }} className="truncate">
                      {isAr ? broker.nameAr : broker.name}
                    </p>
                    <p style={{ fontSize: '11px', color: tMute, marginTop: '2px', fontFamily: ff }} className="truncate">{broker.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span style={{ fontSize: '10px', color: tMute, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em', fontFamily: ff }}>
                      {isAr ? broker.typeAr : broker.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full uppercase"
                      style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', fontFamily: ff, background: st.bg, color: st.color }}>
                      {isAr ? st.labelAr : st.labelEn}
                    </span>
                  </div>
                  {/* Edit button on hover */}
                  <button
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0"
                    style={{ background: 'rgba(210,140,100,0.12)', color: B.roseGold, border: '1px solid rgba(210,140,100,0.25)' }}
                    title={isAr ? 'تعديل' : 'Edit'}
                    onClick={(e) => { e.stopPropagation(); setSelectedBroker(broker); setEditOpen(true); }}
                  >
                    <Edit2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* License Expiry */}
        <div className="p-6 rounded-xl flex flex-col" style={{ background: bg, border: `1px solid ${bdr}`, boxShadow: sdw }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ border: `2px solid ${B.roseGold}`, background: 'rgba(210,140,100,0.10)' }}>
              <AlertTriangle size={13} style={{ color: B.roseGold }} />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: tHero, fontFamily: ff }}>
              {isAr ? 'تنبيهات انتهاء الرخص' : 'License Expiry Alerts'}
            </h3>
          </div>
          <div className="space-y-5 flex-1">
            {expiryAlerts.map((a, i) => {
              const pct   = (a.days / a.total) * 100;
              const color = a.days <= 10 ? B.roseGold : a.days <= 20 ? B.ocean : B.seafoam;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: '13px', color: tHero, fontWeight: 600, fontFamily: ff }}>
                      {isAr ? a.nameAr : a.name}
                    </span>
                    <span style={{ fontFamily: ffM, fontSize: '11px', color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {a.days} {isAr ? 'يوم' : 'days'}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(25,5,140,0.08)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="mt-5 w-full py-3 rounded-full uppercase tracking-wider transition-all"
            style={{
              fontSize: '11px', fontWeight: 700, fontFamily: ff, letterSpacing: '0.08em',
              border: `1.5px solid ${isDark ? B.ocean : B.indigo}`,
              color: isDark ? '#E8F0FF' : B.indigo,
              background: 'transparent',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? B.ocean : B.indigo; (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; (e.currentTarget as HTMLElement).style.borderColor = isDark ? B.ocean : B.indigo; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = isDark ? '#E8F0FF' : B.indigo; (e.currentTarget as HTMLElement).style.borderColor = isDark ? B.ocean : B.indigo; }}
            onClick={() => navigate('/admin/brokers')}
          >
            {isAr ? 'إدارة جميع الرخص' : 'Manage All Licenses'}
          </button>
        </div>
      </div>

      {/* ── Modals / Drawers ─────────────────────────── */}
      {drawerOpen && selectedBroker && (
        <BrokerDetailDrawer
          broker={selectedBroker}
          onClose={() => setDrawerOpen(false)}
          onEdit={() => { setDrawerOpen(false); setEditOpen(true); }}
        />
      )}
      {editOpen && selectedBroker && (
        <EditBrokerDrawer broker={selectedBroker} onClose={() => setEditOpen(false)} />
      )}
      {inviteOpen && selectedBroker && (
        <SendInvitationModal
          broker={selectedBroker}
          onClose={() => setInviteOpen(false)}
          onSend={() => {
            setInviteOpen(false);
            addToast({ type: 'success', title: isAr ? 'تم الإرسال' : 'Invitation Sent', description: isAr ? 'تم إرسال الدعوة بنجاح' : 'Sent successfully' });
          }}
        />
      )}
    </div>
  );
}
