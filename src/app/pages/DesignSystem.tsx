import { useApp } from '../context/AppContext';

const COLORS = [
  { name: 'GIG Red', nameAr: 'أحمر GIG', hex: '#C8102E', usage: 'Primary actions, CTAs, brand identity' },
  { name: 'Jordan Navy', nameAr: 'أزرق الأردن', hex: '#0D1F3C', usage: 'Rails, navigation, deep backgrounds' },
  { name: 'Accent Gold', nameAr: 'ذهبي', hex: '#C8962A', usage: 'Commission, warning highlights, secondary' },
  { name: 'Success', nameAr: 'نجاح', hex: '#00C896', usage: 'Active status, success states, valid' },
  { name: 'Warning', nameAr: 'تحذير', hex: '#F0B030', usage: 'Expiry warnings, amber alerts' },
  { name: 'Error', nameAr: 'خطأ', hex: '#FF4060', usage: 'Errors, expired states, blocked' },
  { name: 'Info', nameAr: 'معلومات', hex: '#0DB4CC', usage: 'Informational alerts, audit events' },
  { name: 'Purple', nameAr: 'بنفسجي', hex: '#7B61FF', usage: 'Multi-line broker, special states' },
];

const DARK_SURFACES = [
  { name: 'Surface 0', hex: '#070E1C', usage: 'Page background' },
  { name: 'Surface 1', hex: '#0F1A2E', usage: 'Cards' },
  { name: 'Surface 2', hex: '#0F1E35', usage: 'Floating cards' },
  { name: 'Rail BG', hex: '#060C18', usage: 'Icon rail' },
  { name: 'Nav BG', hex: '#09122A', usage: 'Navigation panel' },
];

const LIGHT_SURFACES = [
  { name: 'Surface 0', hex: '#F0F4FA', usage: 'Page background' },
  { name: 'Surface 1', hex: '#FFFFFF', usage: 'Cards' },
  { name: 'Surface 2', hex: '#F5F7FB', usage: 'Input backgrounds' },
];

const TYPOGRAPHY = [
  { name: 'Display 1', size: '2.8rem', weight: '800', font: 'Tajawal / IBM Plex Sans', usage: 'Hero headings' },
  { name: 'Display 2', size: '2rem', weight: '700', font: 'Tajawal / IBM Plex Sans', usage: 'Page titles' },
  { name: 'H1', size: '1.5rem', weight: '700', font: 'IBM Plex Sans', usage: 'Section headers' },
  { name: 'H2', size: '1.25rem', weight: '600', font: 'IBM Plex Sans', usage: 'Card titles' },
  { name: 'H3', size: '1rem', weight: '600', font: 'IBM Plex Sans', usage: 'Sub-section titles' },
  { name: 'Body', size: '0.875rem', weight: '400', font: 'IBM Plex Sans', usage: 'Main content' },
  { name: 'Small', size: '0.75rem', weight: '400', font: 'IBM Plex Sans', usage: 'Labels, captions' },
  { name: 'Data', size: '0.8125rem', weight: '500', font: 'IBM Plex Mono', usage: 'Numbers, codes, IDs' },
  { name: 'KPI', size: '1.8rem', weight: '700', font: 'IBM Plex Mono', usage: 'Key metrics, large numbers' },
];

const SPACING = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];

const RADIUS = [
  { name: 'Small', value: '4px', usage: 'Badges, tags' },
  { name: 'Medium', value: '6px', usage: 'Buttons, inputs' },
  { name: 'Large', value: '10px', usage: 'Cards, panels' },
  { name: 'XL', value: '16px', usage: 'Modals, large cards' },
  { name: '2XL', value: '24px', usage: 'Feature cards, drawers' },
  { name: 'Full', value: '9999px', usage: 'Chips, pills, avatars' },
];

const SHADOW_LEVELS = [
  { name: 'Level 1 (Card)', shadow: '0 1px 4px rgba(7,14,28,0.08)', usage: 'Cards on page' },
  { name: 'Level 2 (Float)', shadow: '0 4px 16px rgba(7,14,28,0.16)', usage: 'Floating elements' },
  { name: 'Level 3 (Modal)', shadow: '0 8px 32px rgba(7,14,28,0.28)', usage: 'Modals, drawers' },
  { name: 'Level 4 (Toast)', shadow: '0 12px 48px rgba(7,14,28,0.4)', usage: 'Toasts, tooltips' },
  { name: 'Brand Glow', shadow: '0 4px 20px rgba(200,16,46,0.35)', usage: 'Primary CTA buttons' },
];

export function DesignSystem() {
  const { theme, language } = useApp();
  const isAr = language === 'ar';

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-5 rounded-full bg-[#C8102E]" />
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: textPrimary }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-6 min-h-full" style={{ background: bg }}>
      {/* Header */}
      <div className="mb-8 p-6 rounded-2xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D1F3C, #070E1C)', border: '1px solid rgba(200,16,46,0.2)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C8102E, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #C8962A, transparent)', transform: 'translate(-20%, 30%)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center"
              style={{ boxShadow: '0 4px 16px rgba(200,16,46,0.4)' }}>
              <span className="text-white font-black text-base">G</span>
            </div>
            <div>
              <p className="text-white font-bold text-base">GIG Jordan — Design System</p>
              <p className="text-white/50" style={{ fontSize: '12px' }}>Precision Authority · v2.0 · 2025</p>
            </div>
          </div>
          <p className="text-white/60" style={{ fontSize: '13px', maxWidth: '480px' }}>
            {isAr
              ? 'نظام تصميم متكامل لبوابة الوسطاء والوكلاء - مستوحى من Bloomberg Terminal وبوابات الحكومة الخليجية'
              : 'Complete design system for the Agents & Brokers Portal — Inspired by Bloomberg Terminal and Gulf government portals'}
          </p>
        </div>
      </div>

      {/* Brand Colors */}
      <Section title={isAr ? '🎨 ألوان العلامة التجارية' : '🎨 Brand Colors'}>
        <div className="grid grid-cols-4 gap-3">
          {COLORS.map(color => (
            <div key={color.hex} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${borderColor}` }}>
              <div className="h-16 w-full" style={{ background: color.hex }} />
              <div className="p-3" style={{ background: cardBg }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{isAr ? color.nameAr : color.name}</p>
                <p className="font-mono" style={{ fontSize: '12px', color: '#C8102E' }}>{color.hex}</p>
                <p style={{ fontSize: '11px', color: textSecondary, marginTop: '2px' }}>{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Surface Colors */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        <Section title={isAr ? '🌑 الأسطح الداكنة' : '🌑 Dark Mode Surfaces'}>
          <div className="space-y-2">
            {DARK_SURFACES.map(s => (
              <div key={s.hex} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: `1px solid ${borderColor}`, background: cardBg }}>
                <div className="w-10 h-10 rounded-lg border border-white/10 shrink-0" style={{ background: s.hex }} />
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{s.name}</span>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#C8962A' }}>{s.hex}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: textSecondary }}>{s.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section title={isAr ? '☀️ الأسطح الفاتحة' : '☀️ Light Mode Surfaces'}>
          <div className="space-y-2">
            {LIGHT_SURFACES.map(s => (
              <div key={s.hex} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: `1px solid ${borderColor}`, background: cardBg }}>
                <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: s.hex, border: '1px solid rgba(13,31,60,0.12)' }} />
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{s.name}</span>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#C8962A' }}>{s.hex}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: textSecondary }}>{s.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Typography */}
      <Section title={isAr ? '✍️ نظام الطباعة' : '✍️ Typography Scale'}>
        <div className="rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}>
                {['Name', 'Size', 'Weight', 'Font', 'Usage', 'Preview'].map(h => (
                  <th key={h} className="px-4 py-3 text-left" style={{ fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TYPOGRAPHY.map((t, i) => (
                <tr key={t.name} className="border-b" style={{ borderColor }}>
                  <td className="px-4 py-3" style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{t.name}</td>
                  <td className="px-4 py-3 font-mono" style={{ fontSize: '12px', color: '#C8962A' }}>{t.size}</td>
                  <td className="px-4 py-3 font-mono" style={{ fontSize: '12px', color: textSecondary }}>{t.weight}</td>
                  <td className="px-4 py-3" style={{ fontSize: '11px', color: textSecondary }}>{t.font}</td>
                  <td className="px-4 py-3" style={{ fontSize: '11px', color: textSecondary }}>{t.usage}</td>
                  <td className="px-4 py-3" style={{ fontSize: t.size, fontWeight: parseInt(t.weight), color: textPrimary, fontFamily: t.font.includes('Mono') ? "'IBM Plex Mono', monospace" : "'IBM Plex Sans', sans-serif' " }}>
                    {t.font.includes('Mono') ? '12,847' : 'GIG Jordan'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Spacing */}
      <Section title={isAr ? '📐 نظام التباعد (8px Grid)' : '📐 Spacing System (8px Grid)'}>
        <div className="rounded-xl p-5 flex flex-wrap gap-4" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          {SPACING.map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className="bg-[#C8102E]/30 border border-[#C8102E]/50" style={{ width: `${Math.min(s * 2, 80)}px`, height: '20px' }} />
              <div className="text-center">
                <span className="font-mono block" style={{ fontSize: '11px', color: '#C8102E' }}>{s}px</span>
                <span style={{ fontSize: '10px', color: textSecondary }}>t-{s / 4}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Border Radius */}
      <Section title={isAr ? '⭕ نصف القطر' : '⭕ Border Radius'}>
        <div className="flex flex-wrap gap-4">
          {RADIUS.map(r => (
            <div key={r.name} className="flex flex-col items-center gap-3 p-4 rounded-xl min-w-28"
              style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="w-14 h-14 bg-[#C8102E]/20 border-2 border-[#C8102E]/40"
                style={{ borderRadius: r.value }} />
              <div className="text-center">
                <p style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{r.name}</p>
                <p className="font-mono" style={{ fontSize: '11px', color: '#C8962A' }}>{r.value}</p>
                <p style={{ fontSize: '10px', color: textSecondary, marginTop: '2px' }}>{r.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section title={isAr ? '🌫️ الظلال والارتفاع' : '🌫️ Shadows & Elevation'}>
        <div className="grid grid-cols-5 gap-4">
          {SHADOW_LEVELS.map(s => (
            <div key={s.name} className="p-4 rounded-xl text-center"
              style={{ background: cardBg, boxShadow: s.shadow }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: textPrimary, marginBottom: '4px' }}>{s.name}</p>
              <p style={{ fontSize: '10px', color: textSecondary }}>{s.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Status Chips */}
      <Section title={isAr ? '🏷️ حالات الوسطاء' : '🏷️ Broker Status Chips'}>
        <div className="flex flex-wrap gap-3 p-5 rounded-xl" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          {[
            { label: 'Active', labelAr: 'نشط', color: '#00C896', bg: 'rgba(0,200,150,0.12)' },
            { label: 'Pending', labelAr: 'معلق', color: '#F0B030', bg: 'rgba(240,176,48,0.12)' },
            { label: 'Expired', labelAr: 'منتهي', color: '#FF4060', bg: 'rgba(255,64,96,0.12)' },
            { label: 'Blocked', labelAr: 'محظور', color: '#FF4060', bg: 'rgba(255,64,96,0.15)' },
            { label: 'Inactive', labelAr: 'غير نشط', color: '#6B7A9B', bg: 'rgba(107,122,155,0.12)' },
          ].map(chip => (
            <div key={chip.label} className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full font-medium"
                style={{ fontSize: '13px', background: chip.bg, color: chip.color }}>
                <span className="w-2 h-2 rounded-full" style={{ background: chip.color }} />
                {chip.label}
              </span>
              {isAr && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full font-medium"
                  style={{ fontSize: '13px', background: chip.bg, color: chip.color, fontFamily: "'Tajawal', sans-serif" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: chip.color }} />
                  {chip.labelAr}
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
