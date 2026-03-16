import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  FileText, DollarSign, Clock, ArrowRight, CheckCircle,
  Plane, Car, Stethoscope, Sun, Moon, TrendingUp
} from 'lucide-react';

const policyData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  policies: [3, 5, 4, 7, 6, 8, 10, 9, 11, 8, 12, 9][i]
}));

const commissionData = [
  { name: 'Travel', value: 45, color: '#C8102E' },
  { name: 'Motor', value: 30, color: '#C8962A' },
  { name: 'Medical', value: 15, color: '#00C896' },
  { name: 'Home', value: 10, color: '#0DB4CC' },
];

const POLICY_ICONS: Record<string, React.ElementType> = {
  'Travel': Plane,
  'Motor': Car,
  'Medical': Stethoscope,
};

const recentPolicies = [
  { no: 'POL-2025-45182', typeKey: 'Travel', typeLabel: 'Travel', typeLabelAr: 'سفر', name: 'Ahmad Al-Ahmad', nameAr: 'أحمد الأحمد', premium: '214.60', date: '14/03/2025', status: 'Active' },
  { no: 'POL-2025-45103', typeKey: 'Motor', typeLabel: 'Motor', typeLabelAr: 'مركبات', name: 'Sara Hassan', nameAr: 'سارة حسن', premium: '287.00', date: '12/03/2025', status: 'Active' },
  { no: 'POL-2025-44921', typeKey: 'Travel', typeLabel: 'Travel', typeLabelAr: 'سفر', name: 'Faris Noor', nameAr: 'فارس نور', premium: '145.20', date: '10/03/2025', status: 'Active' },
  { no: 'POL-2025-44780', typeKey: 'Medical', typeLabel: 'Medical', typeLabelAr: 'طبي', name: 'Layla Omar', nameAr: 'ليلى عمر', premium: '520.00', date: '08/03/2025', status: 'Expired' },
];

const subBrokers = [
  { name: 'Tarek Al-Ahmad', nameAr: 'طارق الأحمد', policies: 12, commission: '84.00', avatar: 'TA', status: 'Active' },
  { name: 'Hiba Karimi', nameAr: 'هبة كريمي', policies: 8, commission: '56.00', avatar: 'HK', status: 'Active' },
  { name: 'Bilal Noor', nameAr: 'بلال نور', policies: 3, commission: '21.00', avatar: 'BN', status: 'Inactive' },
];

export function BrokerDashboard() {
  const { theme, language, isRTL, currentUser } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const hour = new Date().getHours();
  const isMorning = hour < 12;
  const greeting = isMorning ? (isAr ? 'صباح الخير' : 'Good morning') : (isAr ? 'مساء الخير' : 'Good evening');

  const kpis = [
    { label: isAr ? 'وثائقي النشطة' : 'My Active Policies', value: '47', delta: '+5', up: true, sub: isAr ? 'هذا الشهر' : 'this month', stripe: '#C8102E', Icon: FileText },
    { label: isAr ? 'الأقساط الشهرية (دينار)' : 'This Month Premium (JOD)', value: '12,450', delta: '+12.3%', up: true, sub: isAr ? 'مارس 2025' : 'March 2025', stripe: '#C8962A', Icon: DollarSign },
    { label: isAr ? 'عمولاتي (دينار)' : 'My Commissions (JOD)', value: '996', delta: '+8.1%', up: true, sub: isAr ? 'هذا الشهر' : 'this month', stripe: '#00C896', Icon: TrendingUp },
    { label: isAr ? 'التجديدات المعلقة' : 'Pending Renewals', value: '3', delta: '2 urgent', up: false, sub: isAr ? 'هذا الشهر' : 'this month', stripe: '#F0B030', Icon: Clock },
  ];

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      {/* License Status Card */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-5 border"
        style={{ background: 'rgba(0,200,150,0.08)', borderColor: 'rgba(0,200,150,0.3)' }}>
        <div className="flex items-center gap-3">
          <CheckCircle size={16} style={{ color: '#00C896' }} />
          <span style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>
            {isAr ? 'الرخصة سارية حتى 31 ديسمبر 2025' : 'License valid until Dec 31, 2025'}
          </span>
        </div>
        <span style={{ fontSize: '12px', color: '#00C896', fontWeight: 500 }}>
          {isAr ? '292 يوم متبقٍ' : '292 days remaining'}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="flex items-center gap-2" style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
            {greeting}, {isAr ? currentUser.nameAr.split(' ')[0] : currentUser.name.split(' ')[0]}
            {isMorning
              ? <Sun size={18} style={{ color: '#C8962A' }} />
              : <Moon size={18} style={{ color: '#0DB4CC' }} />
            }
          </h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>
            {new Date().toLocaleDateString(isAr ? 'ar-JO' : 'en-JO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          className="px-5 py-2 rounded-lg text-white font-medium text-sm hover:opacity-90 flex items-center gap-2"
          style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
          onClick={() => navigate('/broker/issuance')}
        >
          <FileText size={15} />
          {isAr ? 'إصدار وثيقة جديدة' : 'Issue New Policy'}
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
                <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: kpi.up ? 'rgba(0,200,150,0.12)' : 'rgba(240,176,48,0.12)',
                    color: kpi.up ? '#00C896' : '#F0B030'
                  }}>
                  {kpi.up ? '↑' : '!'} {kpi.delta}
                </span>
              </div>
              <div className="font-mono font-bold mb-1" style={{ fontSize: '1.5rem', color: textPrimary }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: '11px', color: textSecondary }}>{kpi.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="col-span-2 rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <h3 className="mb-4" style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
            {isAr ? 'وثائقي حسب الشهر' : 'My Policies by Month'}
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={policyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(13,31,60,0.06)'} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: textSecondary, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: textSecondary, fontFamily: "'IBM Plex Mono', monospace" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: theme === 'dark' ? '#0F1A2E' : '#fff', border: `1px solid ${borderColor}`, borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="policies" stroke="#C8102E" strokeWidth={2.5} dot={{ fill: '#C8102E', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <h3 className="mb-4" style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
            {isAr ? 'توزيع العمولات' : 'Commission Breakdown'}
          </h3>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={commissionData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                {commissionData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {commissionData.map(l => (
              <div key={l.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span style={{ fontSize: '11px', color: textSecondary }}>{l.name}</span></div>
                <span className="font-mono" style={{ fontSize: '11px', fontWeight: 600, color: textPrimary }}>{l.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Policies */}
        <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'الوثائق الأخيرة' : 'Recent Policies'}
            </h3>
            <button className="text-[#C8102E] text-xs font-medium hover:underline flex items-center gap-1"
              onClick={() => navigate('/broker/policies')}>
              {isAr ? 'عرض الكل' : 'View All'} <ArrowRight size={12} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
          <div className="space-y-2">
            {recentPolicies.map((p) => {
              const PolicyIcon = POLICY_ICONS[p.typeKey] || FileText;
              return (
                <div key={p.no} className="flex items-center justify-between p-2.5 rounded-lg"
                  style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(200,16,46,0.1)' }}>
                      <PolicyIcon size={14} style={{ color: '#C8102E' }} />
                    </div>
                    <div>
                      <span className="font-mono" style={{ fontSize: '11px', color: '#C8102E', fontWeight: 600 }}>{p.no}</span>
                      <p style={{ fontSize: '12px', color: textSecondary }}>{isAr ? p.nameAr : p.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>JOD {p.premium}</p>
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: p.status === 'Active' ? 'rgba(0,200,150,0.12)' : 'rgba(255,64,96,0.12)', color: p.status === 'Active' ? '#00C896' : '#FF4060' }}>
                      {isAr ? (p.status === 'Active' ? 'نشطة' : 'منتهية') : p.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-Brokers Performance */}
        <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'وسطائي الفرعيون' : 'My Sub-Brokers'}
            </h3>
            <button className="text-[#C8102E] text-xs font-medium hover:underline flex items-center gap-1"
              onClick={() => navigate('/broker/sub-brokers')}>
              {isAr ? 'إدارة' : 'Manage'} <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {subBrokers.map((sb) => (
              <div key={sb.name} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0DB4CC, #0D1F3C)', fontSize: '11px' }}>
                  {sb.avatar}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{isAr ? sb.nameAr : sb.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span style={{ fontSize: '11px', color: textSecondary }}>{sb.policies} {isAr ? 'وثيقة' : 'policies'}</span>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#00C896', fontWeight: 600 }}>JOD {sb.commission}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full"
                  style={{ fontSize: '10px', background: sb.status === 'Active' ? 'rgba(0,200,150,0.12)' : 'rgba(107,122,155,0.12)', color: sb.status === 'Active' ? '#00C896' : '#6B7A9B' }}>
                  {isAr ? (sb.status === 'Active' ? 'نشط' : 'غير نشط') : sb.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
