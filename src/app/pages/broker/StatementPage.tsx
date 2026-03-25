import { useApp } from '../../context/AppContext';
import { Download, TrendingUp, Wallet, ArrowDownCircle } from 'lucide-react';
import { useState } from 'react';

const TRANSACTIONS = [
  { date: '14/03/2025', desc: 'Travel Policy Commission - POL-2025-45182', descAr: 'عمولة وثيقة سفر - POL-2025-45182', debit: null, credit: '14.80', balance: '1,234.50', type: 'credit' },
  { date: '12/03/2025', desc: 'Motor Policy Commission - POL-2025-45103', descAr: 'عمولة وثيقة مركبة - POL-2025-45103', debit: null, credit: '22.96', balance: '1,219.70', type: 'credit' },
  { date: '10/03/2025', desc: 'Travel Policy Commission - POL-2025-44921', descAr: 'عمولة وثيقة سفر - POL-2025-44921', debit: null, credit: '11.62', balance: '1,196.74', type: 'credit' },
  { date: '05/03/2025', desc: 'Withdrawal - Bank Transfer', descAr: 'سحب - تحويل بنكي', debit: '500.00', credit: null, balance: '1,185.12', type: 'debit' },
  { date: '01/03/2025', desc: 'Home Policy Commission - POL-2025-44512', descAr: 'عمولة وثيقة منزل - POL-2025-44512', debit: null, credit: '14.40', balance: '1,685.12', type: 'credit' },
  { date: '28/02/2025', desc: 'Motor Policy Commission - POL-2025-44310', descAr: 'عمولة وثيقة مركبة - POL-2025-44310', debit: null, credit: '27.36', balance: '1,670.72', type: 'credit' },
  { date: '20/02/2025', desc: 'Withdrawal - Bank Transfer', descAr: 'سحب - تحويل بنكي', debit: '200.00', credit: null, balance: '1,643.36', type: 'debit' },
];

export function StatementPage() {
  const { theme, language, isRTL } = useApp();
  const isAr = language === 'ar';

  const bg          = theme === 'dark' ? '#0C1221' : '#F8F7FC';
  const cardBg      = theme === 'dark' ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(128,148,230,0.16)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  const kpis = [
    { label: isAr ? 'الرصيد الحالي' : 'Current Balance', value: 'JOD 1,234.50', color: '#00C896', icon: Wallet, bg: 'rgba(0,200,150,0.1)' },
    { label: isAr ? 'إجمالي العمولات' : 'Total Commissions', value: 'JOD 174.00', color: '#D28C64', icon: TrendingUp, bg: 'rgba(210,140,100,0.10)' },
    { label: isAr ? 'المسحوبات' : 'Withdrawals', value: 'JOD 500.00', color: '#8094E6', icon: ArrowDownCircle, bg: 'rgba(128,148,230,0.10)' },
  ];

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const allSelected  = TRANSACTIONS.length > 0 && TRANSACTIONS.every((_, i) => selectedIds.includes(i));
  const someSelected = TRANSACTIONS.some((_, i) => selectedIds.includes(i)) && !allSelected;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(TRANSACTIONS.map((_, i) => i));
    }
  };
  const toggleSelect = (i: number) => {
    setSelectedIds(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>{isAr ? 'كشف الحساب' : 'Statement of Account'}</h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>{isAr ? 'سجل المعاملات المالية الكاملة' : 'Complete financial transaction record'}</p>
        </div>
        <div className="flex gap-3">
          <input type="date" className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#FFFFFF', borderColor, color: textPrimary }} defaultValue="2025-01-01" />
          <input type="date" className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#FFFFFF', borderColor, color: textPrimary }} defaultValue="2025-03-31" />
          <button className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:opacity-90"
            style={{ background: `linear-gradient(135deg, #D28C64 0%, #E8B98A 50%, #D28C64 100%)`, boxShadow: '0 2px 10px rgba(210,140,100,0.25)' }}>
            <Download size={15} />{isAr ? 'تصدير PDF' : 'Export PDF'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {kpis.map(kpi => (
          <div key={kpi.label} className="rounded-xl p-5 flex items-center gap-4"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: kpi.bg }}>
              <kpi.icon size={22} style={{ color: kpi.color }} />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: textSecondary }}>{kpi.label}</p>
              <p className="font-mono font-bold mt-1" style={{ fontSize: '1.25rem', color: kpi.color }}>{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
              {[
                '',
                isAr ? 'التاريخ' : 'Date',
                isAr ? 'الوصف' : 'Description',
                isAr ? 'خصم (دينار)' : 'Debit (JOD)',
                isAr ? 'إضافة (دينار)' : 'Credit (JOD)',
                isAr ? 'الرصيد (دينار)' : 'Balance (JOD)',
              ].map((h, i) => (
                <th key={i} className="px-5 py-3"
                  style={{ fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: isRTL ? 'right' : 'left' }}>
                  {i === 0 ? (
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={el => { if (el) el.indeterminate = someSelected; }}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded cursor-pointer accent-[#19058C]"
                    />
                  ) : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx, i) => (
              <tr key={i}
                className="border-b transition-all"
                style={{
                  borderColor,
                  borderLeft: tx.type === 'credit' ? '3px solid rgba(107,202,186,0.55)' : '3px solid rgba(128,148,230,0.55)',
                  background: selectedIds.includes(i) ? (theme === 'dark' ? 'rgba(128,148,230,0.06)' : 'rgba(25,5,140,0.03)') : 'transparent',
                }}>
                <td className="px-5 py-3">
                  <input type="checkbox" checked={selectedIds.includes(i)}
                    onChange={() => toggleSelect(i)}
                    className="w-4 h-4 rounded cursor-pointer accent-[#19058C]" />
                </td>
                <td className="px-5 py-3">
                  <span className="font-mono" style={{ fontSize: '13px', color: textSecondary }}>{tx.date}</span>
                </td>
                <td className="px-5 py-3">
                  <span style={{ fontSize: '13px', color: textPrimary }}>{isAr ? tx.descAr : tx.desc}</span>
                </td>
                <td className="px-5 py-3">
                  {tx.debit && (
                    <span className="font-mono font-medium" style={{ fontSize: '13px', color: '#8094E6' }}>
                      -{tx.debit}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  {tx.credit && (
                    <span className="font-mono font-medium" style={{ fontSize: '13px', color: '#00C896' }}>
                      +{tx.credit}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <span className="font-mono font-medium" style={{ fontSize: '13px', color: textPrimary }}>{tx.balance}</span>
                </td>
              </tr>
            ))}
            {/* Totals Row */}
            <tr style={{ borderTop: `2px solid ${borderColor}`, background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}>
              <td className="px-5 py-3" colSpan={2}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: textPrimary }}>{isAr ? 'الإجمالي' : 'Totals'}</span>
              </td>
              <td className="px-5 py-3">
                <span className="font-mono font-bold" style={{ fontSize: '13px', color: '#8094E6' }}>700.00</span>
              </td>
              <td className="px-5 py-3">
                <span className="font-mono font-bold" style={{ fontSize: '13px', color: '#00C896' }}>1,934.50</span>
              </td>
              <td className="px-5 py-3">
                <span className="font-mono font-bold" style={{ fontSize: '14px', color: textPrimary }}>1,234.50</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}