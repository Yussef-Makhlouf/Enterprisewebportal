import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Users, FileText, DollarSign, Clock, AlertTriangle, ArrowRight, Eye, Edit2 } from 'lucide-react';
import { BrokerDetailDrawer } from '../../components/admin/BrokerDetailDrawer';
import { SendInvitationModal } from '../../components/admin/SendInvitationModal';

const monthlyData = [
  { month: 'Jan', premium: 920000, commission: 73600 },
  { month: 'Feb', premium: 1050000, commission: 84000 },
  { month: 'Mar', premium: 880000, commission: 70400 },
  { month: 'Apr', premium: 1120000, commission: 89600 },
  { month: 'May', premium: 1300000, commission: 104000 },
  { month: 'Jun', premium: 1180000, commission: 94400 },
  { month: 'Jul', premium: 1400000, commission: 112000 },
  { month: 'Aug', premium: 1250000, commission: 100000 },
  { month: 'Sep', premium: 1350000, commission: 108000 },
  { month: 'Oct', premium: 1150000, commission: 92000 },
  { month: 'Nov', premium: 1280000, commission: 102400 },
  { month: 'Dec', premium: 1200000, commission: 96000 },
];

const lobData = [
  { name: 'Travel', value: 38, color: '#C8102E' },
  { name: 'Motor', value: 28, color: '#C8962A' },
  { name: 'Medical', value: 20, color: '#00C896' },
  { name: 'Home', value: 8, color: '#0DB4CC' },
  { name: 'Domestic', value: 6, color: '#7B61FF' },
];

const recentBrokers = [
  { id: 1, name: 'Khalid Al-Mansouri', nameAr: 'خالد المنصوري', email: 'k.mansouri@email.com', type: 'Broker', status: 'Active', avatar: 'KM' },
  { id: 2, name: 'Sara Al-Qasim', nameAr: 'سارة القاسم', email: 's.qasim@email.com', type: 'Agent', status: 'Pending', avatar: 'SQ' },
  { id: 3, name: 'Omar Hamdan', nameAr: 'عمر حمدان', email: 'o.hamdan@email.com', type: 'Broker', status: 'Active', avatar: 'OH' },
  { id: 4, name: 'Layla Nasser', nameAr: 'ليلى ناصر', email: 'l.nasser@email.com', type: 'Agent', status: 'Active', avatar: 'LN' },
  { id: 5, name: 'Ahmad Saleh', nameAr: 'أحمد صالح', email: 'a.saleh@email.com', type: 'Broker', status: 'Expired', avatar: 'AS' },
];

const expiryAlerts = [
  { name: 'Faris Al-Khaldi', nameAr: 'فارس الخالدي', days: 8, total: 30 },
  { name: 'Nour Al-Hamad', nameAr: 'نور الحمد', days: 15, total: 30 },
  { name: 'Rami Jamal', nameAr: 'رامي جمال', days: 24, total: 30 },
];

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  Active: { color: '#00C896', bg: 'rgba(0,200,150,0.12)' },
  Pending: { color: '#F0B030', bg: 'rgba(240,176,48,0.12)' },
  Expired: { color: '#FF4060', bg: 'rgba(255,64,96,0.12)' },
  Blocked: { color: '#FF4060', bg: 'rgba(255,64,96,0.15)' },
  Inactive: { color: '#6B7A9B', bg: 'rgba(107,122,155,0.12)' },
};

export function AdminDashboard() {
  const { language, theme, isRTL, currentUser, addToast } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<any>(null);

  const hour = new Date().getHours();
  const greeting = hour < 12
    ? (isAr ? 'صباح الخير' : 'Good morning')
    : (isAr ? 'مساء الخير' : 'Good evening');

  const kpis = [
    {
      label: isAr ? 'إجمالي الوسطاء' : 'Total Brokers',
      value: '148', delta: '+12%', up: true,
      sub: isAr ? '124 نشط' : '124 active',
      stripe: '#C8102E', icon: Users
    },
    {
      label: isAr ? 'الوثائق النشطة' : 'Active Policies',
      value: '2,847', delta: '+8.3%', up: true,
      sub: isAr ? '47 هذا الأسبوع' : '47 this week',
      stripe: '#C8962A', icon: FileText
    },
    {
      label: isAr ? 'الأقساط الشهرية (دينار)' : 'Monthly Premium (JOD)',
      value: '1.2M', delta: '+5.1%', up: true,
      sub: isAr ? 'أكتوبر 2025' : 'October 2025',
      stripe: '#00C896', icon: DollarSign
    },
    {
      label: isAr ? 'المهام المعلقة' : 'Pending Tasks',
      value: '23', delta: '-3', up: false,
      sub: isAr ? '5 عاجلة' : '5 urgent',
      stripe: '#0DB4CC', icon: Clock
    },
  ];

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      {/* Alert Banner */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-5 border"
        style={{ background: 'rgba(240,176,48,0.1)', borderColor: 'rgba(240,176,48,0.3)' }}>
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} style={{ color: '#F0B030' }} />
          <span style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>
            {isAr ? '3 رخص وسطاء تنتهي خلال 30 يوماً' : '3 broker licenses expiring within 30 days'}
          </span>
        </div>
        <button
          className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
          style={{ color: '#F0B030' }}
          onClick={() => navigate('/admin/brokers')}
        >
          {isAr ? 'عرض الآن' : 'View Now'}
          <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
        </button>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: textPrimary }}>
            {greeting}, {isAr ? currentUser.nameAr.split(' ')[0] : currentUser.name.split(' ')[0]}
          </h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>
            {new Date().toLocaleDateString(isAr ? 'ar-JO' : 'en-JO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg text-white font-medium text-sm hover:opacity-90 transition-all flex items-center gap-2"
          style={{ background: '#C8102E', boxShadow: '0 2px 12px rgba(200,16,46,0.3)' }}
          onClick={() => { setSelectedBroker(recentBrokers[0]); setInviteOpen(true); }}
        >
          {isAr ? 'إرسال دعوة' : 'Send Invitation'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl p-4 relative overflow-hidden"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl" style={{ background: kpi.stripe }} />
            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: '12px', color: textSecondary }}>{kpi.label}</span>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full`}
                  style={{
                    background: kpi.up ? 'rgba(0,200,150,0.12)' : 'rgba(255,64,96,0.12)',
                    fontSize: '11px',
                    color: kpi.up ? '#00C896' : '#FF4060',
                    fontWeight: 600
                  }}>
                  {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {kpi.delta}
                </div>
              </div>
              <div className="font-mono font-bold mb-1" style={{ fontSize: '1.6rem', color: textPrimary }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: '11px', color: textSecondary }}>{kpi.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* Bar Chart - 2/3 width */}
        <div className="col-span-2 rounded-xl p-5"
          style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'حجم الأقساط الشهرية' : 'Monthly Premium Volume'}
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#C8102E]" /><span style={{ fontSize: '11px', color: textSecondary }}>{isAr ? 'الأقساط' : 'Premium'}</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#C8962A]" /><span style={{ fontSize: '11px', color: textSecondary }}>{isAr ? 'العمولات' : 'Commission'}</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barSize={14} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(13,31,60,0.06)'} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: textSecondary, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: textSecondary, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: theme === 'dark' ? '#0F1A2E' : '#fff', border: `1px solid ${borderColor}`, borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any) => [`JOD ${(val / 1000).toFixed(0)}K`]}
              />
              <Bar dataKey="premium" fill="#C8102E" radius={[3, 3, 0, 0]} />
              <Bar dataKey="commission" fill="#C8962A" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart - 1/3 width */}
        <div className="rounded-xl p-5"
          style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <h3 className="mb-4" style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
            {isAr ? 'توزيع خطوط الأعمال' : 'LOB Distribution'}
          </h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={lobData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={0}>
                {lobData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: theme === 'dark' ? '#0F1A2E' : '#fff', border: `1px solid ${borderColor}`, borderRadius: '8px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {lobData.map((l) => (
              <div key={l.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span style={{ fontSize: '11px', color: textSecondary }}>{l.name}</span>
                </div>
                <span className="font-mono" style={{ fontSize: '11px', fontWeight: 600, color: textPrimary }}>{l.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Brokers */}
        <div className="rounded-xl p-5"
          style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'الوسطاء المضافون مؤخراً' : 'Recently Added Brokers'}
            </h3>
            <button className="text-[#C8102E] text-xs font-medium hover:underline flex items-center gap-1"
              onClick={() => navigate('/admin/brokers')}>
              {isAr ? 'عرض الكل' : 'View All'}
              <ArrowRight size={12} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
          <div className="space-y-2">
            {recentBrokers.map((broker) => (
              <div key={broker.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/3 cursor-pointer transition-all group"
                onClick={() => { setSelectedBroker(broker); setDrawerOpen(true); }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C8102E, #0D1F3C)', fontSize: '11px', fontWeight: 700 }}>
                  {broker.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }} className="truncate">
                    {isAr ? broker.nameAr : broker.name}
                  </p>
                  <p style={{ fontSize: '11px', color: textSecondary }} className="truncate">{broker.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '11px', color: textSecondary }}>{broker.type}</span>
                  <span className="px-2 py-0.5 rounded-full font-medium"
                    style={{
                      fontSize: '11px',
                      background: STATUS_STYLES[broker.status]?.bg || STATUS_STYLES.Inactive.bg,
                      color: STATUS_STYLES[broker.status]?.color || STATUS_STYLES.Inactive.color
                    }}>
                    {isAr ? { Active: 'نشط', Pending: 'معلق', Expired: 'منتهي' }[broker.status] || broker.status : broker.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* License Expiry Alerts */}
        <div className="rounded-xl p-5"
          style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} style={{ color: '#F0B030' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'تنبيهات انتهاء الرخص' : 'License Expiry Alerts'}
            </h3>
          </div>
          <div className="space-y-4">
            {expiryAlerts.map((a, i) => {
              const pct = (a.days / a.total) * 100;
              const color = a.days <= 10 ? '#FF4060' : a.days <= 20 ? '#F0B030' : '#00C896';
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontSize: '13px', color: textPrimary, fontWeight: 500 }}>
                      {isAr ? a.nameAr : a.name}
                    </span>
                    <span className="font-mono" style={{ fontSize: '11px', color, fontWeight: 600 }}>
                      {a.days} {isAr ? 'يوم' : 'days'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden"
                    style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E4EAF3' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="mt-4 w-full py-2 rounded-lg text-sm font-medium border hover:opacity-80 transition-opacity"
            style={{ borderColor, color: textSecondary }}
            onClick={() => navigate('/admin/brokers')}
          >
            {isAr ? 'إدارة جميع الرخص' : 'Manage All Licenses'}
          </button>
        </div>
      </div>

      {/* Drawers/Modals */}
      {drawerOpen && selectedBroker && (
        <BrokerDetailDrawer broker={selectedBroker} onClose={() => setDrawerOpen(false)} />
      )}
      {inviteOpen && selectedBroker && (
        <SendInvitationModal broker={selectedBroker} onClose={() => setInviteOpen(false)} onSend={() => {
          setInviteOpen(false);
          addToast({ type: 'success', title: isAr ? 'تم الإرسال' : 'Invitation Sent', description: isAr ? 'تم إرسال الدعوة بنجاح' : 'Invitation sent successfully' });
        }} />
      )}
    </div>
  );
}