import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Plus, Download, Search, Eye, Printer, Mail, ChevronLeft, ChevronRight, Plane, Car, Stethoscope, Home, HardHat, Trash2, AlertTriangle, type LucideIcon } from 'lucide-react';
import { PolicyDetailDrawer } from '../../components/broker/PolicyDetailDrawer';
import { ConfirmationModal } from '../../components/global/ConfirmationModal';

const LOB_ICONS: Record<string, LucideIcon> = {
  Travel: Plane, Motor: Car, Medical: Stethoscope, Home: Home, Domestic: HardHat
};
const LOB_COLORS_MAP: Record<string, string> = {
  Travel: '#C8102E', Motor: '#C8962A', Medical: '#00C896', Home: '#0DB4CC', Domestic: '#7B61FF'
};

const POLICIES = [
  { id: 1, no: 'POL-2025-45182', typeKey: 'Travel', typeLabelAr: 'سفر', name: 'Ahmad Al-Ahmad', nameAr: 'أحمد الأحمد', premium: '214.60', issueDate: '14/03/2025', expiryDate: '28/03/2025', status: 'Active' },
  { id: 2, no: 'POL-2025-45103', typeKey: 'Motor', typeLabelAr: 'مركبات', name: 'Sara Hassan', nameAr: 'سارة حسن', premium: '287.00', issueDate: '12/03/2025', expiryDate: '12/03/2026', status: 'Active' },
  { id: 3, no: 'POL-2025-44921', typeKey: 'Travel', typeLabelAr: 'سفر', name: 'Faris Noor', nameAr: 'فارس نور', premium: '145.20', issueDate: '10/03/2025', expiryDate: '24/03/2025', status: 'Active' },
  { id: 4, no: 'POL-2025-44780', typeKey: 'Medical', typeLabelAr: 'طبي', name: 'Layla Omar', nameAr: 'ليلى عمر', premium: '520.00', issueDate: '08/03/2025', expiryDate: '08/03/2024', status: 'Expired' },
  { id: 5, no: 'POL-2025-44512', typeKey: 'Home', typeLabelAr: 'منزل', name: 'Omar Khalil', nameAr: 'عمر خليل', premium: '180.00', issueDate: '05/03/2025', expiryDate: '05/03/2026', status: 'Active' },
  { id: 6, no: 'POL-2025-44310', typeKey: 'Motor', typeLabelAr: 'مركبات', name: 'Rania Salem', nameAr: 'رانيا سالم', premium: '342.00', issueDate: '01/03/2025', expiryDate: '01/03/2026', status: 'Active' },
  { id: 7, no: 'POL-2025-44105', typeKey: 'Travel', typeLabelAr: 'سفر', name: 'Hassan Musa', nameAr: 'حسن موسى', premium: '98.50', issueDate: '28/02/2025', expiryDate: '07/03/2025', status: 'Expired' },
  { id: 8, no: 'POL-2025-43850', typeKey: 'Domestic', typeLabelAr: 'عمالة', name: 'Dina Fayad', nameAr: 'دينا فياض', premium: '210.00', issueDate: '20/02/2025', expiryDate: '20/02/2026', status: 'Cancelled' },
];

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  Active: { color: '#00C896', bg: 'rgba(0,200,150,0.12)' },
  Expired: { color: '#FF4060', bg: 'rgba(255,64,96,0.12)' },
  Cancelled: { color: '#6B7A9B', bg: 'rgba(107,122,155,0.12)' },
  Pending: { color: '#F0B030', bg: 'rgba(240,176,48,0.12)' },
};

interface LOBTab {
  key: string;
  Icon: LucideIcon | null;
  labelAr: string;
  iconColor: string;
}

const LOB_TABS: LOBTab[] = [
  { key: 'All', Icon: null, labelAr: 'الكل', iconColor: '' },
  { key: 'Travel', Icon: Plane, labelAr: 'سفر', iconColor: '#C8102E' },
  { key: 'Motor', Icon: Car, labelAr: 'مركبات', iconColor: '#C8962A' },
  { key: 'Medical', Icon: Stethoscope, labelAr: 'طبي', iconColor: '#00C896' },
  { key: 'Home', Icon: Home, labelAr: 'منزل', iconColor: '#0DB4CC' },
  { key: 'Domestic', Icon: HardHat, labelAr: 'عمالة', iconColor: '#7B61FF' },
];

export function MyPolicies() {
  const { theme, language, isRTL, addToast } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [policies, setPolicies] = useState(POLICIES);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const rowHover = theme === 'dark' ? 'rgba(255,255,255,0.025)' : 'rgba(13,31,60,0.025)';

  const filtered = policies.filter(p => {
    const matchTab = activeTab === 'All' || p.typeKey === activeTab;
    const matchSearch = !search || p.no.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleDeleteClick = (policy: any, e: any) => {
    e.stopPropagation();
    setDeleteConfirm(policy);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      setPolicies(prev => prev.filter(p => p.id !== deleteConfirm.id));
      setDeleteConfirm(null);
      addToast({ type: 'success', title: isAr ? 'تم حذف الوثيقة' : 'Policy deleted successfully' });
    }
  };

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>{isAr ? 'وثائقي' : 'My Policies'}</h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>{isAr ? 'جميع وثائق التأمين الصادرة' : 'All issued insurance policies'}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 hover:opacity-80"
            style={{ borderColor, color: textSecondary }}>
            <Download size={15} />{isAr ? 'تصدير' : 'Export'}
          </button>
          <button className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:opacity-90"
            style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
            onClick={() => navigate('/broker/issuance')}>
            <Plus size={15} />{isAr ? 'وثيقة جديدة' : 'New Policy'}
          </button>
        </div>
      </div>

      {/* LOB Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {LOB_TABS.map(tab => {
          const count = tab.key === 'All' ? policies.length : policies.filter(p => p.typeKey === tab.key).length;
          return (
            <button key={tab.key}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all"
              style={{
                background: activeTab === tab.key ? '#C8102E' : 'transparent',
                borderColor: activeTab === tab.key ? '#C8102E' : borderColor,
                color: activeTab === tab.key ? '#fff' : textSecondary,
              }}
              onClick={() => setActiveTab(tab.key)}>
              {tab.Icon && <tab.Icon size={13} style={{ color: activeTab === tab.key ? '#fff' : tab.iconColor }} />}
              {isAr ? tab.labelAr : tab.key}
              <span className="font-mono text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
        {/* Toolbar */}
        <div className="flex items-center gap-4 px-4 py-3 border-b" style={{ borderColor }}>
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} style={{ color: textSecondary }} />
            <input
              className="w-full rounded-lg border py-2 text-sm outline-none"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB',
                borderColor, color: textPrimary,
                paddingLeft: isRTL ? '12px' : '36px',
                paddingRight: isRTL ? '36px' : '12px',
              }}
              placeholder={isAr ? 'بحث برقم الوثيقة أو الاسم...' : 'Search by policy no. or name...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB', borderColor, color: textPrimary }}>
            <option>{isAr ? 'جميع الحالات' : 'All Status'}</option>
            <option>{isAr ? 'نشط' : 'Active'}</option>
            <option>{isAr ? 'منتهي' : 'Expired'}</option>
            <option>{isAr ? 'ملغي' : 'Cancelled'}</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
              {[
                { label: isAr ? 'رقم الوثيقة' : 'Policy No.', align: 'left' },
                { label: isAr ? 'النوع' : 'Type', align: 'left' },
                { label: isAr ? 'المؤمَّن عليه' : 'Insured Name', align: 'left' },
                { label: isAr ? 'القسط (دينار)' : 'Premium (JOD)', align: 'right' },
                { label: isAr ? 'تاريخ الإصدار' : 'Issue Date', align: 'center' },
                { label: isAr ? 'تاريخ الانتهاء' : 'Expiry Date', align: 'center' },
                { label: isAr ? 'الحالة' : 'Status', align: 'center' },
                { label: isAr ? 'إجراءات' : 'Actions', align: 'center' },
              ].map(col => (
                <th key={col.label} className="px-4 py-3"
                  style={{ fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: col.align as any }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const status = STATUS_STYLES[p.status] || STATUS_STYLES.Active;
              const PolicyIcon = LOB_ICONS[p.typeKey] || Plane;
              const lobColor = LOB_COLORS_MAP[p.typeKey] || '#C8102E';
              return (
                <tr key={p.id}
                  className="border-b last:border-0 transition-colors cursor-pointer"
                  style={{ borderColor, background: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.background = rowHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => setSelectedPolicy(p)}>
                  <td className="px-4 py-3">
                    <span className="font-mono" style={{ fontSize: '12px', color: '#C8102E', fontWeight: 600 }}>{p.no}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${lobColor}18` }}>
                        <PolicyIcon size={13} style={{ color: lobColor }} />
                      </div>
                      <span style={{ fontSize: '12px', color: textPrimary }}>
                        {isAr ? p.typeLabelAr : p.typeKey}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontSize: '13px', color: textPrimary }}>{isAr ? p.nameAr : p.name}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{p.premium}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono" style={{ fontSize: '11px', color: textSecondary }}>{p.issueDate}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono" style={{ fontSize: '11px', color: p.status === 'Expired' ? '#FF4060' : textSecondary }}>{p.expiryDate}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2.5 py-1 rounded-full font-medium"
                      style={{ fontSize: '11px', color: status.color, background: status.bg }}>
                      {isAr ? (p.status === 'Active' ? 'نشطة' : p.status === 'Expired' ? 'منتهية' : p.status === 'Cancelled' ? 'ملغية' : 'معلقة') : p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-[#C8102E]/10 transition-all" style={{ color: textSecondary }}
                        onClick={e => { e.stopPropagation(); setSelectedPolicy(p); }}>
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all" style={{ color: textSecondary }}>
                        <Printer size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all" style={{ color: textSecondary }}>
                        <Mail size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all"
                        style={{ color: '#FF4060' }}
                        onClick={e => handleDeleteClick(p, e)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor }}>
          <span style={{ fontSize: '12px', color: textSecondary }}>
            {isAr ? `عرض 1-${filtered.length} من ${POLICIES.length}` : `Showing 1-${filtered.length} of ${POLICIES.length}`}
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border hover:bg-white/8" style={{ borderColor, color: textSecondary }}>
              <ChevronLeft size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>
            {[1, 2, 3].map(n => (
              <button key={n} className="w-8 h-8 rounded-lg border text-sm font-medium transition-all"
                style={{
                  borderColor: n === 1 ? '#C8102E' : borderColor,
                  background: n === 1 ? 'rgba(200,16,46,0.1)' : 'transparent',
                  color: n === 1 ? '#C8102E' : textSecondary
                }}>
                {n}
              </button>
            ))}
            <button className="p-1.5 rounded-lg border hover:bg-white/8" style={{ borderColor, color: textSecondary }}>
              <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Policy Detail Drawer */}
      {selectedPolicy && (
        <PolicyDetailDrawer
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </div>
  );
}
