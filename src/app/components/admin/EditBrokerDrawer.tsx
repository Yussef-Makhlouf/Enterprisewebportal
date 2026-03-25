import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertCircle, Upload, Check, Plane, Car, Stethoscope, Home, HardHat, type LucideIcon } from 'lucide-react';
import { B, drawerBg, cardBdr, innerBg, textHero, textMuted } from '../../utils/darkPalette';

interface LOBEntry { key: string; Icon: LucideIcon; label: string; labelAr: string; color: string; }

const LOBS: LOBEntry[] = [
  { key: 'travel',   Icon: Plane,       label: 'Travel',   labelAr: 'سفر',    color: '#19058C' },
  { key: 'motor',    Icon: Car,         label: 'Motor',    labelAr: 'مركبات', color: '#8094E6' },
  { key: 'medical',  Icon: Stethoscope, label: 'Medical',  labelAr: 'طبي',    color: '#6BCABA' },
  { key: 'home',     Icon: Home,        label: 'Home',     labelAr: 'منزل',   color: '#D28C64' },
  { key: 'domestic', Icon: HardHat,     label: 'Domestic', labelAr: 'عمالة',  color: '#A78BF0' },
];

const CBJ_TYPES = ['Class A', 'Class B', 'Class C', 'Life', 'Medical', 'General'];

interface Props { broker: any; onClose: () => void; }

export function EditBrokerDrawer({ broker, onClose }: Props) {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';
  const [activeLOBs, setActiveLOBs] = useState(['travel', 'motor']);
  const [cbjTypes, setCbjTypes]     = useState(['Class A', 'Class B']);

  const bg            = drawerBg(isDark);
  const textPrimary   = textHero(isDark);
  const textSecondary = isDark ? 'rgba(180,205,255,0.65)' : '#3D3560';
  const borderColor   = cardBdr(isDark);
  const inputBg       = isDark ? 'rgba(128,148,230,0.05)' : '#F5F7FB';

  const toggleLOB = (k: string) => setActiveLOBs(prev => prev.includes(k) ? prev.filter(l => l !== k) : [...prev, k]);
  const toggleCBJ = (k: string) => setCbjTypes(prev => prev.includes(k) ? prev.filter(l => l !== k) : [...prev, k]);

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>{children}</label>
  );

  const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className="w-full px-3 py-2.5 rounded-lg border outline-none transition-all text-sm"
      style={{ background: inputBg, borderColor, color: textPrimary, fontFamily: props.readOnly ? "'IBM Plex Mono', monospace" : 'inherit', ...props.style }}
    />
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full z-50 flex flex-col shadow-2xl overflow-hidden`}
        style={{ width: '460px', background: bg, borderLeft: isRTL ? 'none' : `1px solid ${borderColor}` }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>
            {isAr ? 'تعديل بيانات الوسيط' : 'Edit Broker Details'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8" style={{ color: textSecondary }}><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Alert */}
          <div className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: 'rgba(240,176,48,0.08)', border: '1px solid rgba(240,176,48,0.25)' }}>
            <AlertCircle size={16} style={{ color: '#F0B030', flexShrink: 0 }} />
            <p style={{ fontSize: '12px', color: textSecondary }}>
              {isAr ? 'التغييرات تسري فوراً' : 'Changes take effect immediately'}
            </p>
          </div>

          {/* License Section */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginBottom: '12px' }}>
              {isAr ? 'معلومات الرخصة' : 'License Information'}
            </h3>
            <div className="space-y-3">
              <div>
                <Label>{isAr ? 'رقم الرخصة' : 'License Number'}</Label>
                <Input readOnly defaultValue="LIC-2024-004821" style={{ opacity: 0.7 }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{isAr ? 'تاريخ البداية' : 'Valid From'}</Label>
                  <Input type="date" defaultValue="2024-01-01" />
                </div>
                <div>
                  <Label>{isAr ? 'تاريخ الانتهاء' : 'Expiry Date'}</Label>
                  <Input type="date" defaultValue="2025-12-31" />
                </div>
              </div>
              <div>
                <Label>{isAr ? 'رفع وثيقة الرخصة' : 'Upload License Document'}</Label>
                <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-[#D28C64]/50 transition-all"
                  style={{ borderColor, background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#FAFBFD' }}>
                  <div className="flex items-center justify-center gap-2">
                    <Upload size={16} style={{ color: '#6B7A9B' }} />
                    <span style={{ fontSize: '12px', color: textSecondary }}>
                      {isAr ? 'اسحب أو انقر للرفع · PDF, JPG · Max 10MB' : 'Drag or click to upload · PDF, JPG · Max 10MB'}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#6BCABA' }} />
                    <span style={{ fontSize: '11px', color: '#6BCABA' }}>license_current.pdf</span>
                  </div>
                </div>
              </div>
              <div>
                <Label>{isAr ? 'نسبة العمولة (من ESKA)' : 'Commission Rate (from ESKA)'}</Label>
                <Input readOnly defaultValue="8.0%" style={{ opacity: 0.7 }} />
              </div>
            </div>
          </div>

          {/* CBJ License Types */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginBottom: '12px' }}>
              {isAr ? 'أنواع رخصة CBJ' : 'CBJ License Types'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {CBJ_TYPES.map(type => {
                const sel = cbjTypes.includes(type);
                const accent = isDark ? B.ocean : B.indigo;
                return (
                  <button
                    key={type}
                    className="p-2.5 rounded-lg border-2 text-center transition-all flex items-center gap-2"
                    style={{
                      borderColor: sel ? accent : borderColor,
                      background: sel ? `${accent}12` : 'transparent',
                    }}
                    onClick={() => toggleCBJ(type)}
                  >
                    <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0"
                      style={{
                        background: sel ? accent : 'transparent',
                        borderColor: sel ? accent : (isDark ? 'rgba(128,148,230,0.30)' : '#C0CBDE'),
                      }}>
                      {sel && <Check size={10} className="text-white" />}
                    </div>
                    <span style={{ fontSize: '12px', color: textPrimary }}>{type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* LOBs Section */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginBottom: '12px' }}>
              {isAr ? 'خطوط الأعمال' : 'Lines of Business'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {LOBS.map(lob => {
                const active = activeLOBs.includes(lob.key);
                return (
                  <button
                    key={lob.key}
                    className="p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all"
                    style={{
                      borderColor: active ? lob.color : borderColor,
                      background: active ? `${lob.color}12` : 'transparent',
                    }}
                    onClick={() => toggleLOB(lob.key)}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: active ? `${lob.color}18` : (theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F5F7FB') }}>
                      <lob.Icon size={18} style={{ color: active ? lob.color : textSecondary }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: active ? textPrimary : textSecondary }}>
                      {isAr ? lob.labelAr : lob.label}
                    </span>
                    <div className={`w-8 h-4 rounded-full transition-all relative`}
                      style={{ background: active ? lob.color : (theme === 'dark' ? '#2A3650' : '#C0CBDE') }}>
                      <span className="absolute top-0.5 transition-all rounded-full w-3 h-3 bg-white"
                        style={{ left: active ? '18px' : '2px' }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t flex gap-3 shrink-0" style={{ borderColor }}>
          <button className="flex-1 py-2.5 rounded-xl border font-medium text-sm transition-all hover:opacity-80"
            style={{ borderColor, color: textSecondary }} onClick={onClose}>
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${B.roseGold} 0%, #E8B98A 50%, ${B.roseGold} 100%)`, boxShadow: '0 2px 12px rgba(210,140,100,0.30)' }}
            onClick={() => { onClose(); addToast({ type: 'success', title: isAr ? 'تم الحفظ' : 'Changes Saved' }); }}
          >
            {isAr ? 'حفظ التغييرات' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
}