import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Download, Plus, Eye, Edit2, MoreHorizontal, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import { BrokerDetailDrawer } from '../../components/admin/BrokerDetailDrawer';
import { SendInvitationModal } from '../../components/admin/SendInvitationModal';
import { EditBrokerDrawer } from '../../components/admin/EditBrokerDrawer';
import { ConfirmationModal } from '../../components/global/ConfirmationModal';

const BROKERS = [
  { id: 1, name: 'Khalid Al-Mansouri', nameAr: 'خالد المنصوري', email: 'k.mansouri@email.com', type: 'Broker', typeAr: 'وسيط', status: 'Active', lobs: ['Travel', 'Motor', 'Medical'], expiry: '31/12/2025', commission: '8.0', invitation: 'Sent', avatar: 'KM', daysToExpiry: 290 },
  { id: 2, name: 'Sara Al-Qasim', nameAr: 'سارة القاسم', email: 's.qasim@email.com', type: 'Agent', typeAr: 'وكيل', status: 'Pending', lobs: ['Travel'], expiry: '15/01/2026', commission: '6.5', invitation: 'Pending', avatar: 'SQ', daysToExpiry: 305 },
  { id: 3, name: 'Omar Hamdan', nameAr: 'عمر حمدان', email: 'o.hamdan@email.com', type: 'Broker', typeAr: 'وسيط', status: 'Active', lobs: ['Motor', 'Home'], expiry: '28/03/2025', commission: '7.5', invitation: 'Sent', avatar: 'OH', daysToExpiry: 12 },
  { id: 4, name: 'Layla Nasser', nameAr: 'ليلى ناصر', email: 'l.nasser@email.com', type: 'Agent', typeAr: 'وكيل', status: 'Active', lobs: ['Travel', 'Medical', 'Home', 'Domestic'], expiry: '30/06/2025', commission: '6.0', invitation: 'Sent', avatar: 'LN', daysToExpiry: 106 },
  { id: 5, name: 'Ahmad Saleh', nameAr: 'أحمد صالح', email: 'a.saleh@email.com', type: 'Broker', typeAr: 'وسيط', status: 'Expired', lobs: ['Travel'], expiry: '01/01/2024', commission: '8.0', invitation: 'Not Sent', avatar: 'AS', daysToExpiry: -50 },
  { id: 6, name: 'Rania Khalil', nameAr: 'رانيا خليل', email: 'r.khalil@email.com', type: 'Broker', typeAr: 'وسيط', status: 'Blocked', lobs: ['Motor'], expiry: '31/12/2025', commission: '7.0', invitation: 'Sent', avatar: 'RK', daysToExpiry: 290 },
  { id: 7, name: 'Hassan Al-Rawabdeh', nameAr: 'حسن الروابدة', email: 'h.rawabdeh@email.com', type: 'Agent', typeAr: 'وكيل', status: 'Active', lobs: ['Travel', 'Motor'], expiry: '20/02/2025', commission: '6.5', invitation: 'Sent', avatar: 'HR', daysToExpiry: 5 },
  { id: 8, name: 'Dina Fayad', nameAr: 'دينا فياض', email: 'd.fayad@email.com', type: 'Broker', typeAr: 'وسيط', status: 'Inactive', lobs: ['Medical'], expiry: '31/12/2025', commission: '7.0', invitation: 'Not Sent', avatar: 'DF', daysToExpiry: 290 },
];

const LOB_COLORS: Record<string, string> = {
  Travel: '#19058C', Motor: '#8094E6', Medical: '#6BCABA',
  Home: '#FF7366', Domestic: '#D28C64', Assistance: '#8094E6'
};

const STATUS_STYLES: Record<string, { color: string; bg: string; dot: string }> = {
  Active:   { color: '#6BCABA', bg: 'rgba(107,202,186,0.13)', dot: '#6BCABA' },
  Pending:  { color: '#D28C64', bg: 'rgba(210,140,100,0.13)', dot: '#D28C64' },
  Expired:  { color: '#8094E6', bg: 'rgba(128,148,230,0.14)', dot: '#8094E6' },
  Blocked:  { color: '#D28C64', bg: 'rgba(210,140,100,0.15)', dot: '#D28C64' },
  Inactive: { color: '#8094E6', bg: 'rgba(128,148,230,0.10)', dot: '#8094E6' }
};

const FILTER_CHIPS = ['All', 'Broker', 'Agent', 'Active', 'Pending', 'Blocked', 'Expired'];

export function ManageBrokers() {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr = language === 'ar';
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState<number[]>([]);
  const [drawerBroker, setDrawerBroker] = useState<any>(null);
  const [editBroker, setEditBroker] = useState<any>(null);
  const [inviteBroker, setInviteBroker] = useState<any>(null);
  const [confirmModal, setConfirmModal] = useState<any>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const isDark = theme === 'dark';
  const bg          = isDark ? '#070E1C' : '#F0F4FA';
  const cardBg        = isDark ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const textPrimary   = isDark ? '#E8F0FF'                   : '#19058C';
  const textSecondary = isDark ? 'rgba(180,205,255,0.65)'   : '#3D3560';
  const borderColor   = isDark ? 'rgba(128,148,230,0.16)'   : 'rgba(13,31,60,0.10)';
  const rowBg         = isDark ? 'rgba(128,148,230,0.05)'   : '#FFFFFF';
  const rowHover      = isDark ? 'rgba(128,148,230,0.09)'   : '#F5F8FF';

  const filteredBrokers = BROKERS.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' ||
      b.type === activeFilter ||
      b.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: isAr ? 'الإجمالي' : 'Total',   value: 148, color: textPrimary },
    { label: isAr ? 'نشط'      : 'Active',  value: 124, color: '#6BCABA' },
    { label: isAr ? 'منتهي'    : 'Expired', value: 11,  color: '#D28C64' },
  ];

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const allVisibleIds = filteredBrokers.map(b => b.id);
  const allSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => selected.includes(id));
  const someSelected = allVisibleIds.some(id => selected.includes(id)) && !allSelected;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(prev => prev.filter(id => !allVisibleIds.includes(id)));
    } else {
      setSelected(prev => [...new Set([...prev, ...allVisibleIds])]);
    }
  };

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
            {isAr ? 'إدارة الوسطاء والوكلاء' : 'Manage Brokers & Agents'}
          </h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>
            {isAr ? 'إدارة جميع الوسطاء والوكلاء المسجلين' : 'Manage all registered brokers and agents'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg border font-medium text-sm flex items-center gap-2 hover:opacity-80 transition-all"
            style={{ borderColor, color: textSecondary }}
          >
            <Download size={15} />
            {isAr ? 'تصدير' : 'Export'}
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-all"
            style={{ background: '#19058C', boxShadow: '0 2px 10px rgba(25,5,140,0.30)' }}
            onClick={() => setInviteBroker(BROKERS[0])}
          >
            <Plus size={15} />
            {isAr ? 'إرسال دعوة' : 'Send Invitation'}
          </button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="flex gap-4 mb-5">
        {stats.map(s => (
          <div key={s.label} className="px-5 py-3 rounded-xl flex items-center gap-3"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <span className="font-mono font-bold text-xl" style={{ color: s.color }}>{s.value}</span>
            <span style={{ fontSize: '13px', color: textSecondary }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTER_CHIPS.map(chip => {
          const count = chip === 'All' ? BROKERS.length : BROKERS.filter(b => b.type === chip || b.status === chip).length;
          return (
            <button
              key={chip}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
              style={{
                background: activeFilter === chip ? '#19058C' : 'transparent',
                borderColor: activeFilter === chip ? '#19058C' : borderColor,
                color: activeFilter === chip ? '#fff' : textSecondary,
              }}
              onClick={() => setActiveFilter(chip)}
            >
              {isAr ? { All: 'الكل', Broker: 'وسيط', Agent: 'وكيل', Active: 'نشط', Pending: 'معلق', Blocked: 'محظور', Expired: 'منتهي' }[chip] || chip : chip}
              {count > 0 && (
                <span className={`ml-1.5 text-xs ${activeFilter === chip ? 'opacity-80' : ''}`}>({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
        {/* Table Toolbar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor }}>
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} style={{ color: textSecondary }} />
            <input
              className="w-full rounded-lg border py-2 text-sm outline-none"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F5F7FB',
                borderColor,
                color: textPrimary,
                paddingLeft: isRTL ? '12px' : '36px',
                paddingRight: isRTL ? '36px' : '12px',
              }}
              placeholder={isAr ? 'بحث بالاسم أو البريد الإلكتروني...' : 'Search by name or email...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F5F7FB', borderColor, color: textPrimary }}
          >
            <option>{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Expired</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm"
            style={{ borderColor, color: textSecondary }}>
            <Filter size={14} />
            {isAr ? 'الأعمدة' : 'Columns'}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '900px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                {[
                  { key: 'check', label: '' },
                  { key: 'broker', label: isAr ? 'الوسيط / الوكيل' : 'Broker / Agent' },
                  { key: 'type', label: isAr ? 'النوع' : 'Type' },
                  { key: 'status', label: isAr ? 'الحالة' : 'Status' },
                  { key: 'lobs', label: isAr ? 'خطوط الأعمال' : 'LOBs' },
                  { key: 'expiry', label: isAr ? 'انتهاء الرخصة' : 'License Expiry' },
                  { key: 'commission', label: isAr ? 'العمولة %' : 'Commission %' },
                  { key: 'invitation', label: isAr ? 'الدعوة' : 'Invitation' },
                  { key: 'actions', label: isAr ? 'الإجراءات' : 'Actions' },
                ].map(col => (
                  <th key={col.key} className={`px-4 py-3 text-left`}
                    style={{ fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: isRTL ? 'right' : 'left' }}>
                    {col.key === 'check' ? (
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
              {filteredBrokers.map((broker) => {
                const statusStyle = STATUS_STYLES[broker.status] || STATUS_STYLES.Inactive;
                const expiryColor = broker.daysToExpiry < 0 ? '#D28C64' : broker.daysToExpiry < 30 ? '#8094E6' : textPrimary;
                return (
                  <tr key={broker.id}
                    className="transition-all cursor-pointer border-b"
                    style={{ borderColor, background: selected.includes(broker.id) ? 'rgba(128,148,230,0.06)' : 'transparent' }}
                    onMouseEnter={e => (e.currentTarget.style.background = rowHover)}
                    onMouseLeave={e => (e.currentTarget.style.background = selected.includes(broker.id) ? 'rgba(128,148,230,0.06)' : 'transparent')}
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(broker.id)}
                        onChange={() => toggleSelect(broker.id)}
                        className="w-4 h-4 rounded cursor-pointer accent-[#19058C]" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3" onClick={() => setDrawerBroker(broker)}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                          style={{ background: 'linear-gradient(135deg, #19058C, #8094E6)', fontSize: '11px' }}>
                          {broker.avatar}
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{isAr ? broker.nameAr : broker.name}</p>
                          <p style={{ fontSize: '11px', color: textSecondary }}>{broker.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '13px', color: textSecondary }}>{isAr ? broker.typeAr : broker.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit"
                        style={{ fontSize: '12px', fontWeight: 500, background: statusStyle.bg, color: statusStyle.color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusStyle.dot }} />
                        {isAr ? { Active: 'نشط', Pending: 'معلق', Expired: 'منتهي', Blocked: 'محظور', Inactive: 'غير نشط' }[broker.status] || broker.status : broker.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {broker.lobs.slice(0, 2).map(lob => (
                          <span key={lob} className="px-2 py-0.5 rounded text-white"
                            style={{ fontSize: '10px', fontWeight: 600, background: LOB_COLORS[lob] + 'CC' }}>
                            {lob}
                          </span>
                        ))}
                        {broker.lobs.length > 2 && (
                          <span className="px-2 py-0.5 rounded font-medium"
                            style={{ fontSize: '10px', background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E4EAF3', color: textSecondary }}>
                            +{broker.lobs.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono" style={{ fontSize: '13px', fontWeight: 500, color: expiryColor }}>
                        {broker.expiry}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono font-medium" style={{ fontSize: '13px', color: '#6BCABA' }}>
                        {broker.commission}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {broker.invitation === 'Sent' ? (
                        <span className="px-2.5 py-1 rounded-full"
                          style={{ fontSize: '11px', background: 'rgba(0,200,150,0.12)', color: '#00C896', fontWeight: 500 }}>
                          {isAr ? 'مرسل' : 'Sent'}
                        </span>
                      ) : (
                        <button
                          className="px-2.5 py-1 rounded-full border text-xs font-medium hover:opacity-80 transition-all"
                          style={{ borderColor: '#D28C64', color: '#D28C64' }}
                          onClick={() => setInviteBroker(broker)}
                        >
                          {isAr ? 'إرسال' : 'Send'}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all"
                          style={{ color: textSecondary }}
                          onClick={() => setDrawerBroker(broker)}
                          title={isAr ? 'عرض' : 'View'}>
                          <Eye size={15} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all"
                          style={{ color: textSecondary }}
                          onClick={() => setEditBroker(broker)}
                          title={isAr ? 'تعديل' : 'Edit'}>
                          <Edit2 size={15} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all"
                          style={{ color: textSecondary }}
                          onClick={() => setConfirmModal({ broker, action: broker.status === 'Blocked' ? 'unblock' : 'block' })}
                          title={isAr ? 'المزيد' : 'More'}>
                          <MoreHorizontal size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor }}>
          <span style={{ fontSize: '13px', color: textSecondary }}>
            {isAr ? `عرض 1-${Math.min(perPage, filteredBrokers.length)} من ${filteredBrokers.length}` : `Showing 1-${Math.min(perPage, filteredBrokers.length)} of ${filteredBrokers.length}`}
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all"
              style={{ color: textSecondary }} onClick={() => setPage(p => Math.max(1, p - 1))}>
              <ChevronLeft size={16} className={isRTL ? 'rotate-180' : ''} />
            </button>
            {[1, 2, 3, '...', 15].map((p, i) => (
              <button key={i}
                className="w-7 h-7 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: p === page ? '#19058C' : 'transparent',
                  color: p === page ? '#fff' : textSecondary,
                }}>
                {p}
              </button>
            ))}
            <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all"
              style={{ color: textSecondary }} onClick={() => setPage(p => p + 1)}>
              <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Drawers & Modals */}
      {drawerBroker && <BrokerDetailDrawer broker={drawerBroker} onClose={() => setDrawerBroker(null)} />}
      {editBroker && <EditBrokerDrawer broker={editBroker} onClose={() => setEditBroker(null)} />}
      {inviteBroker && (
        <SendInvitationModal broker={inviteBroker} onClose={() => setInviteBroker(null)} onSend={() => {
          setInviteBroker(null);
          addToast({ type: 'success', title: isAr ? 'تم الإرسال' : 'Invitation Sent' });
        }} />
      )}
      {confirmModal && (
        <ConfirmationModal
          title={isAr ? `${confirmModal.action === 'block' ? 'حظر' : 'إلغاء حظر'} حساب الوسيط؟` : `${confirmModal.action === 'block' ? 'Block' : 'Unblock'} Broker Account?`}
          description={isAr ? 'هذا الإجراء سيؤثر على وصول الوسيط فوراً.' : 'This action will immediately affect the broker\'s portal access.'}
          type={confirmModal.action === 'block' ? 'destructive' : 'warning'}
          onClose={() => setConfirmModal(null)}
          onConfirm={() => {
            setConfirmModal(null);
            addToast({ type: 'success', title: isAr ? 'تم التحديث' : 'Updated Successfully' });
          }}
        />
      )}
    </div>
  );
}