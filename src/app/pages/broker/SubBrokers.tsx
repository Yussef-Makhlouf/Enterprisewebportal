import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Info, AlertTriangle, X } from 'lucide-react';

const SUBBBROKERS = [
  { id: 1, name: 'Tarek Al-Ahmad', nameAr: 'طارق الأحمد', email: 't.ahmad@email.com', mobile: '+962 79 111 2233', status: true, avatar: 'TA', addedDate: '01/01/2025', lobs: ['Travel', 'Motor'] },
  { id: 2, name: 'Hiba Karimi', nameAr: 'هبة كريمي', email: 'h.karimi@email.com', mobile: '+962 77 455 6677', status: true, avatar: 'HK', addedDate: '15/01/2025', lobs: ['Travel', 'Motor'] },
  { id: 3, name: 'Bilal Noor', nameAr: 'بلال نور', email: 'b.noor@email.com', mobile: '+962 79 988 7765', status: false, avatar: 'BN', addedDate: '20/02/2025', lobs: ['Travel', 'Motor'] },
];

const LOB_COLORS: Record<string, string> = {
  Travel: '#C8102E', Motor: '#C8962A', Medical: '#00C896', Home: '#0DB4CC', Domestic: '#7B61FF',
};

export function SubBrokers() {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr = language === 'ar';
  const [brokers, setBrokers] = useState(SUBBBROKERS);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [form, setForm] = useState({ name: '', id: '', mobile: '', email: '' });

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  const toggleStatus = (id: number) => {
    setBrokers(prev => prev.map(b => b.id === id ? { ...b, status: !b.status } : b));
  };

  const handleAdd = () => {
    if (form.name && form.email && form.mobile) {
      setBrokers(prev => [...prev, {
        id: prev.length + 1,
        name: form.name, nameAr: form.name,
        email: form.email, mobile: form.mobile,
        status: true, avatar: form.name.slice(0, 2).toUpperCase(),
        addedDate: new Date().toLocaleDateString('en-JO'),
        lobs: ['Travel', 'Motor']
      }]);
      setAddDrawerOpen(false);
      setForm({ name: '', id: '', mobile: '', email: '' });
      addToast({ type: 'success', title: isAr ? 'تم الإضافة' : 'Sub-Broker Added' });
    }
  };

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>{isAr ? 'الوسطاء الفرعيون' : 'Sub-Brokers'}</h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>{isAr ? 'إدارة وسطائك الفرعيين' : 'Manage your sub-brokers'}</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:opacity-90"
          style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
          onClick={() => setAddDrawerOpen(true)}>
          <Plus size={15} />{isAr ? 'إضافة وسيط فرعي' : 'Add Sub-Broker'}
        </button>
      </div>

      {/* Info Banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-5"
        style={{ background: 'rgba(13,180,204,0.08)', borderColor: 'rgba(13,180,204,0.25)' }}>
        <Info size={16} style={{ color: '#0DB4CC', flexShrink: 0 }} />
        <p style={{ fontSize: '13px', color: textSecondary }}>
          {isAr
            ? 'يرث الوسطاء الفرعيون تلقائياً خطوط أعمالك وصلاحياتك'
            : 'Sub-brokers automatically inherit your lines of business and permissions'}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {brokers.map(broker => (
          <div key={broker.id} className="rounded-2xl p-5"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: 'linear-gradient(135deg, #0DB4CC, #0D1F3C)', fontSize: '14px' }}>
                  {broker.avatar}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>{isAr ? broker.nameAr : broker.name}</p>
                  <p style={{ fontSize: '12px', color: textSecondary }}>{broker.email}</p>
                </div>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-white/8 transition-all" style={{ color: textSecondary }}>
                <Edit2 size={15} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontSize: '13px', color: textSecondary }}>{broker.mobile}</span>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between mb-4">
              <span style={{ fontSize: '13px', color: textPrimary }}>
                {broker.status ? (isAr ? 'نشط' : 'Active') : (isAr ? 'غير نشط' : 'Inactive')}
              </span>
              <button
                className="w-12 h-6 rounded-full transition-all relative"
                style={{ background: broker.status ? '#C8102E' : (theme === 'dark' ? '#2A3650' : '#C0CBDE') }}
                onClick={() => toggleStatus(broker.id)}
              >
                <span className="absolute top-1 transition-all rounded-full w-4 h-4 bg-white"
                  style={{ left: broker.status ? '26px' : '4px' }} />
              </button>
            </div>

            {/* LOB Badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {broker.lobs.map(lob => (
                <span key={lob} className="px-2 py-0.5 rounded text-xs opacity-60"
                  style={{ background: LOB_COLORS[lob] + '20', color: LOB_COLORS[lob], border: `1px solid ${LOB_COLORS[lob]}30` }}>
                  {lob}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded text-xs" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#E4EAF3', color: textSecondary }}>
                {isAr ? 'موروث' : 'Inherited'}
              </span>
            </div>

            <p style={{ fontSize: '11px', color: textSecondary }}>
              {isAr ? `أضيف في ${broker.addedDate}` : `Added ${broker.addedDate}`}
            </p>
          </div>
        ))}
      </div>

      {/* Add Sub-Broker Drawer */}
      {addDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setAddDrawerOpen(false)} />
          <div className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full z-50 flex flex-col shadow-2xl`}
            style={{ width: '400px', background: cardBg, borderLeft: isRTL ? 'none' : `1px solid ${borderColor}` }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>{isAr ? 'إضافة وسيط فرعي' : 'Add Sub-Broker'}</h2>
              <button onClick={() => setAddDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-white/8" style={{ color: textSecondary }}><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div className="p-3 rounded-xl" style={{ background: 'rgba(13,180,204,0.08)', border: '1px solid rgba(13,180,204,0.2)' }}>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={13} style={{ color: '#F0B030', flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', color: textSecondary }}>
                    {isAr ? 'يرث خطوط أعمالك تلقائياً' : 'LOBs inherited from your account'}
                  </p>
                </div>
              </div>
              {[
                { key: 'name', label: isAr ? 'الاسم الكامل' : 'Full Name', placeholder: isAr ? 'أدخل الاسم الكامل' : 'Enter full name' },
                { key: 'id', label: isAr ? 'رقم الهوية الوطنية' : 'National ID', placeholder: '10 digits', mono: true },
                { key: 'mobile', label: isAr ? 'رقم الهاتف' : 'Mobile Number', placeholder: '+962 XX XXX XXXX' },
                { key: 'email', label: isAr ? 'البريد الإلكتروني' : 'Email Address', placeholder: 'name@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{f.label}</label>
                  <input
                    type={f.key === 'email' ? 'email' : 'text'}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
                    style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB', borderColor, color: textPrimary, fontFamily: f.mono ? "'IBM Plex Mono', monospace" : 'inherit' }}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor }}>
              <button className="flex-1 py-2.5 rounded-xl border text-sm font-medium" style={{ borderColor, color: textSecondary }} onClick={() => setAddDrawerOpen(false)}>
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90" style={{ background: '#C8102E' }} onClick={handleAdd}>
                {isAr ? 'إضافة وسيط' : 'Add Sub-Broker'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}