import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import {
  Plus, Download, Search, Eye, Printer, Mail,
  ChevronLeft, ChevronRight, Plane, Car, Stethoscope, Home, HardHat, type LucideIcon
} from 'lucide-react';
import { PolicyDetailDrawer } from '../../components/broker/PolicyDetailDrawer';
import { B, tableRowHover, tableRowSelected } from '../../utils/darkPalette';

/* ── LOB config ───────────────────────────────────────── */
const LOB_ICONS: Record<string, LucideIcon> = {
  Travel: Plane, Motor: Car, Medical: Stethoscope, Home, Domestic: HardHat
};
const LOB_COLORS: Record<string, string> = {
  Travel: B.indigo, Motor: B.ocean, Medical: B.seafoam, Home: B.roseGold, Domestic: B.purple,
};

const POLICIES = [
  { id: 1, no: 'POL-2025-45182', typeKey: 'Travel',   typeLabelAr: 'سفر',    name: 'Ahmad Al-Ahmad', nameAr: 'أحمد الأحمد', premium: '214.60', issueDate: '14/03/2025', expiryDate: '28/03/2025', status: 'Active'    },
  { id: 2, no: 'POL-2025-45103', typeKey: 'Motor',    typeLabelAr: 'مركبات', name: 'Sara Hassan',    nameAr: 'سارة حسن',   premium: '287.00', issueDate: '12/03/2025', expiryDate: '12/03/2026', status: 'Active'    },
  { id: 3, no: 'POL-2025-44921', typeKey: 'Travel',   typeLabelAr: 'سفر',    name: 'Faris Noor',     nameAr: 'فارس نور',    premium: '145.20', issueDate: '10/03/2025', expiryDate: '24/03/2025', status: 'Active'    },
  { id: 4, no: 'POL-2025-44780', typeKey: 'Medical',  typeLabelAr: 'طبي',    name: 'Layla Omar',     nameAr: 'ليلى عمر',   premium: '520.00', issueDate: '08/03/2025', expiryDate: '08/03/2024', status: 'Expired'   },
  { id: 5, no: 'POL-2025-44512', typeKey: 'Home',     typeLabelAr: 'منزل',   name: 'Omar Khalil',    nameAr: 'عمر خليل',   premium: '180.00', issueDate: '05/03/2025', expiryDate: '05/03/2026', status: 'Active'    },
  { id: 6, no: 'POL-2025-44310', typeKey: 'Motor',    typeLabelAr: 'مركبات', name: 'Rania Salem',    nameAr: 'رانيا سالم', premium: '342.00', issueDate: '01/03/2025', expiryDate: '01/03/2026', status: 'Active'    },
  { id: 7, no: 'POL-2025-44105', typeKey: 'Travel',   typeLabelAr: 'سفر',    name: 'Hassan Musa',    nameAr: 'حسن موسى',   premium: '98.50',  issueDate: '28/02/2025', expiryDate: '07/03/2025', status: 'Expired'   },
  { id: 8, no: 'POL-2025-43850', typeKey: 'Domestic', typeLabelAr: 'عمالة',  name: 'Dina Fayad',     nameAr: 'دينا فياض',  premium: '210.00', issueDate: '20/02/2025', expiryDate: '20/02/2026', status: 'Cancelled' },
];

/* status → design-system colors only */
const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  Active:    { color: B.seafoam, bg: 'rgba(107,202,186,0.14)' },
  Expired:   { color: B.ocean,   bg: 'rgba(128,148,230,0.14)' },
  Cancelled: { color: B.roseGold,bg: 'rgba(210,140,100,0.14)' },
  Pending:   { color: B.purple,  bg: 'rgba(167,139,240,0.14)' },
};

const LOB_TABS = [
  { key: 'All',      labelAr: 'الكل'   },
  { key: 'Travel',   labelAr: 'سفر'    },
  { key: 'Motor',    labelAr: 'مركبات' },
  { key: 'Medical',  labelAr: 'طبي'    },
  { key: 'Home',     labelAr: 'منزل'   },
  { key: 'Domestic', labelAr: 'عمالة'  },
];

export function MyPolicies() {
  const { theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const [activeTab,      setActiveTab]      = useState('All');
  const [search,         setSearch]         = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [selectedIds,    setSelectedIds]    = useState<number[]>([]);

  /* palette */
  const bg          = isDark ? '#0C1221' : '#F8F7FC';
  const cardBg      = isDark ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const bdr         = isDark ? 'rgba(128,148,230,0.16)' : 'rgba(13,31,60,0.08)';
  const textPrimary = isDark ? '#E8F0FF' : B.indigo;
  const textSec     = isDark ? 'rgba(180,205,255,0.65)' : '#3D3560';
  const rowHover    = isDark ? 'rgba(128,148,230,0.07)' : 'rgba(25,5,140,0.03)';
  const inputBg     = isDark ? 'rgba(128,148,230,0.06)' : '#F5F7FB';
  const ff  = "'Almarai', Verdana, sans-serif";
  const ffM = "'IBM Plex Mono', monospace";

  const filtered = POLICIES.filter(p => {
    const matchTab    = activeTab === 'All' || p.typeKey === activeTab;
    const matchSearch = !search || p.no.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const allVisibleIds = filtered.map(p => p.id);
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

  return (
    <div className="p-5 min-h-full gig-texture-bg" style={{ background: bg, direction: isRTL ? 'rtl' : 'ltr', fontFamily: ff }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: textPrimary }}>
            {isAr ? 'وثائقي' : 'My Policies'}
          </h1>
          <p style={{ fontSize: '13px', color: textSec, marginTop: '3px' }}>
            {isAr ? 'جميع وثائق التأمين الصادرة' : 'All issued insurance policies'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-all"
            style={{ borderColor: bdr, color: textSec }}>
            <Download size={15} />{isAr ? 'تصدير' : 'Export'}
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-all"
            style={{ background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`, boxShadow: '0 2px 12px rgba(210,140,100,0.30)' }}
            onClick={() => navigate('/broker/issuance')}>
            <Plus size={15} />{isAr ? 'وثيقة جديدة' : 'New Policy'}
          </button>
        </div>
      </div>

      {/* LOB Filter Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {LOB_TABS.map(tab => {
          const rawColor = LOB_COLORS[tab.key] || B.ocean;
          const color  = (isDark && rawColor === B.indigo) ? B.ocean : rawColor;
          const count  = tab.key === 'All' ? POLICIES.length : POLICIES.filter(p => p.typeKey === tab.key).length;
          const active = activeTab === tab.key;
          return (
            <button key={tab.key}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all"
              style={{
                background: active ? `${color}18` : 'transparent',
                borderColor: active ? `${color}60` : bdr,
                color: active ? color : textSec,
              }}
              onClick={() => setActiveTab(tab.key)}>
              {isAr ? tab.labelAr : tab.key}
              <span style={{ fontFamily: ffM, fontSize: '10px', opacity: 0.7 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="rounded-xl overflow-hidden"
        style={{
          background: cardBg,
          border: `1px solid ${bdr}`,
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.50), inset 0 1px 0 rgba(128,148,230,0.12)'
            : '0 2px 20px rgba(25,5,140,0.07)',
        }}>
        {/* Toolbar */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 px-4 py-3 border-b" style={{ borderColor: bdr }}>
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} style={{ color: textSec }} />
            <input
              className="w-full rounded-lg border py-2 text-sm outline-none transition-all"
              style={{
                background: inputBg, borderColor: bdr, color: textPrimary,
                paddingLeft: isRTL ? '12px' : '36px',
                paddingRight: isRTL ? '36px' : '12px',
                fontFamily: ff,
              }}
              placeholder={isAr ? 'بحث برقم الوثيقة أو الاسم...' : 'Search by policy no. or name...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={e => { e.currentTarget.style.borderColor = B.roseGold; }}
              onBlur={e  => { e.currentTarget.style.borderColor = bdr; }}
            />
          </div>
          <select className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ background: inputBg, borderColor: bdr, color: textSec, fontFamily: ff }}>
            <option>{isAr ? 'جميع الحالات' : 'All Status'}</option>
            <option>{isAr ? 'نشط' : 'Active'}</option>
            <option>{isAr ? 'منتهي' : 'Expired'}</option>
            <option>{isAr ? 'ملغي' : 'Cancelled'}</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '950px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${bdr}` }}>
                {[
                  { label: '',                                               align: 'left'   },
                  { label: isAr ? 'رقم الوثيقة'   : 'Policy No.',     align: 'left'   },
                  { label: isAr ? 'النوع'          : 'Type',           align: 'left'   },
                  { label: isAr ? 'المؤمَّن عليه'  : 'Insured Name',   align: 'left'   },
                  { label: isAr ? 'القسط (دينار)'  : 'Premium (JOD)',  align: 'right'  },
                  { label: isAr ? 'تاريخ الإصدار'  : 'Issue Date',     align: 'center' },
                  { label: isAr ? 'تاريخ الانتهاء' : 'Expiry Date',    align: 'center' },
                  { label: isAr ? 'الحالة'         : 'Status',         align: 'center' },
                  { label: isAr ? 'إجراءات'        : 'Actions',        align: 'center' },
                ].map((col, i) => (
                  <th key={i} className="px-4 py-3"
                    style={{ fontSize: '10px', fontWeight: 700, color: textSec, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: col.align as any }}>
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
              {filtered.map((p) => {
                const st         = STATUS_STYLES[p.status] || STATUS_STYLES.Active;
                const PolicyIcon = LOB_ICONS[p.typeKey] || Plane;
                const rawLobColor = LOB_COLORS[p.typeKey] || B.ocean;
                const lobColor   = (isDark && rawLobColor === B.indigo) ? B.ocean : rawLobColor;
                return (
                  <tr key={p.id}
                    className="border-b last:border-0 transition-colors cursor-pointer"
                    style={{ borderColor: bdr, background: selectedIds.includes(p.id) ? tableRowSelected(isDark) : 'transparent' }}
                    onMouseEnter={e => (e.currentTarget.style.background = tableRowHover(isDark))}
                    onMouseLeave={e => (e.currentTarget.style.background = selectedIds.includes(p.id) ? tableRowSelected(isDark) : 'transparent')}
                    onClick={() => setSelectedPolicy(p)}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3" onClick={e => { e.stopPropagation(); toggleSelect(p.id); }}>
                      <input type="checkbox" checked={selectedIds.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        className="w-4 h-4 rounded cursor-pointer accent-[#19058C]" />
                    </td>
                    {/* Policy No. */}
                    <td className="px-4 py-3">
                      <span style={{ fontFamily: ffM, fontSize: '11px', color: isDark ? B.ocean : B.indigo, fontWeight: 700 }}>{p.no}</span>
                    </td>
                    {/* Type */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: `${lobColor}18`, border: `1px solid ${lobColor}30` }}>
                          <PolicyIcon size={13} style={{ color: lobColor }} />
                        </div>
                        <span style={{ fontSize: '12px', color: textPrimary, fontFamily: ff }}>
                          {isAr ? p.typeLabelAr : p.typeKey}
                        </span>
                      </div>
                    </td>
                    {/* Name */}
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '13px', color: textPrimary, fontFamily: ff, fontWeight: 500 }}>
                        {isAr ? p.nameAr : p.name}
                      </span>
                    </td>
                    {/* Premium */}
                    <td className="px-4 py-3 text-right">
                      <span style={{ fontFamily: ffM, fontSize: '12px', fontWeight: 600, color: textPrimary }}>
                        JOD {p.premium}
                      </span>
                    </td>
                    {/* Issue Date */}
                    <td className="px-4 py-3 text-center">
                      <span style={{ fontFamily: ffM, fontSize: '11px', color: textSec }}>{p.issueDate}</span>
                    </td>
                    {/* Expiry Date */}
                    <td className="px-4 py-3 text-center">
                      <span style={{ fontFamily: ffM, fontSize: '11px', color: p.status === 'Expired' ? B.roseGold : textSec }}>
                        {p.expiryDate}
                      </span>
                    </td>
                    {/* Status badge */}
                    <td className="px-4 py-3 text-center">
                      <span className="px-2.5 py-0.5 rounded-full"
                        style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: st.color, background: st.bg, fontFamily: ff }}>
                        {isAr
                          ? ({ Active: 'نشطة', Expired: 'منتهية', Cancelled: 'ملغية', Pending: 'معلقة' } as any)[p.status] || p.status
                          : p.status}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        {[
                          { Icon: Eye,     title: 'View',  fn: (e: any) => { e.stopPropagation(); setSelectedPolicy(p); } },
                          { Icon: Printer, title: 'Print', fn: (e: any) => e.stopPropagation() },
                          { Icon: Mail,    title: 'Email', fn: (e: any) => e.stopPropagation() },
                        ].map(btn => (
                          <button key={btn.title}
                            className="p-1.5 rounded-lg transition-all"
                            style={{ color: textSec }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(128,148,230,0.12)' : 'rgba(25,5,140,0.07)'; (e.currentTarget as HTMLElement).style.color = isDark ? B.ocean : B.indigo; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = textSec; }}
                            onClick={btn.fn}>
                            <btn.Icon size={14} />
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: bdr }}>
          <span style={{ fontSize: '12px', color: textSec, fontFamily: ff }}>
            {isAr ? `عرض 1–${filtered.length} من ${POLICIES.length}` : `Showing 1–${filtered.length} of ${POLICIES.length}`}
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: bdr, color: textSec }}>
              <ChevronLeft size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>
            {[1, 2, 3].map(n => (
              <button key={n}
                className="w-8 h-8 rounded-lg border text-sm font-medium transition-all"
                style={{
                  borderColor: n === 1 ? `${B.ocean}60` : bdr,
                  background: n === 1 ? `${B.ocean}14` : 'transparent',
                  color: n === 1 ? B.ocean : textSec,
                  fontFamily: ffM,
                }}>
                {n}
              </button>
            ))}
            <button className="p-1.5 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: bdr, color: textSec }}>
              <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Policy Detail Drawer */}
      {selectedPolicy && (
        <PolicyDetailDrawer policy={selectedPolicy} onClose={() => setSelectedPolicy(null)} />
      )}
    </div>
  );
}