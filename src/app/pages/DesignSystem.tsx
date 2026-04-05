import { useApp } from '../context/AppContext';

/* ── Official GIG Brand Design System ──────────────── */

const COLORS = [
  { name: 'Indigo',    nameAr: 'أزرق إنديجو',  hex: '#19058C', pantone: '2738 C', role: 'Primary',   desc: 'Brand identity, buttons, UI elements' },
  { name: 'Rose-Gold', nameAr: 'ذهبي وردي',    hex: '#D28C64', pantone: '721 C',  role: 'Primary',   desc: 'CTA accents, decorative highlights' },
  { name: 'Deep Blue', nameAr: 'أزرق عميق',    hex: '#1F0F4D', pantone: '274 C',  role: 'Functional', desc: 'Dark backgrounds, rails' },
  { name: 'Pearl',     nameAr: 'بيرل',          hex: '#E5E5E5', pantone: 'CG 1 C', role: 'Functional', desc: 'Light backgrounds, dividers' },
  { name: 'Ocean',     nameAr: 'محيطي',         hex: '#8094E6', pantone: '2752 C', role: 'Secondary',  desc: 'KPI accents, chart lines, info' },
  { name: 'Sunrise',   nameAr: 'شروق',          hex: '#FF7366', pantone: '805 C',  role: 'Secondary',  desc: 'Alerts, errors, urgent states' },
  { name: 'Seafoam',   nameAr: 'بحري',          hex: '#6BCABA', pantone: '570 C',  role: 'Secondary',  desc: 'Success, active status, positive' },
];

const GRADIENTS = [
  { name: 'Deep Indigo', nameAr: 'نيلي عميق',  value: 'linear-gradient(135deg, #1F0F4D 0%, #19058C 100%)',  textColor: '#FFFFFF', desc: 'Dark panels, hero sections, sidebars' },
  { name: 'Pearl White', nameAr: 'أبيض لؤلؤي', value: 'linear-gradient(135deg, #E5E5E5 0%, #FFFFFF 100%)',  textColor: '#19058C', desc: 'Light page backgrounds, cards', border: '1px solid #E5E5E5' },
  { name: 'Ocean Tint',  nameAr: 'مائي',        value: 'linear-gradient(135deg, rgba(25,5,140,0.07) 0%, rgba(128,148,230,0.07) 100%)', textColor: '#19058C', desc: 'Subtle card tints', border: '1px solid rgba(25,5,140,0.10)' },
];

const TYPE_SCALE = [
  { token: 'Display',   font: 'Georama',  size: '2.8rem', weight: '700/900', usage: 'Hero greetings, landing headline' },
  { token: 'H1',        font: 'Georama',  size: '1.75rem', weight: '700',    usage: 'Page titles' },
  { token: 'H2',        font: 'Georama',  size: '1.375rem', weight: '600',   usage: 'Section headings' },
  { token: 'H3',        font: 'Georama',  size: '1.125rem', weight: '600',   usage: 'Card titles, sub-sections' },
  { token: 'Body',      font: 'Almarai',  size: '0.875rem', weight: '400',   usage: 'General body text, table cells' },
  { token: 'Label',     font: 'Almarai',  size: '0.6875rem', weight: '600',  usage: 'Uppercase labels, section tags' },
  { token: 'Caption',   font: 'Almarai',  size: '0.6875rem', weight: '400',  usage: 'Help text, timestamps' },
  { token: 'Mono',      font: 'IBM Plex Mono', size: '0.75rem', weight: '500', usage: 'KPI numbers, policy IDs, codes' },
];

const SPACING = [2,4,8,12,16,20,24,32,40,48,64,80];

const STATUS_TOKENS = [
  { name: 'Active',   nameAr: 'نشط',         color: '#6BCABA', bg: 'rgba(107,202,186,0.13)' },
  { name: 'Pending',  nameAr: 'معلق',         color: '#D28C64', bg: 'rgba(210,140,100,0.13)' },
  { name: 'Expired',  nameAr: 'منتهي',        color: '#FF7366', bg: 'rgba(255,115,102,0.13)' },
  { name: 'Blocked',  nameAr: 'محظور',        color: '#FF7366', bg: 'rgba(255,115,102,0.15)' },
  { name: 'Inactive', nameAr: 'غير نشط',      color: '#8094E6', bg: 'rgba(128,148,230,0.12)' },
];

const LOB_TOKENS = [
  { name: 'Travel',   nameAr: 'سفر',   color: '#19058C', bg: 'rgba(25,5,140,0.10)'    },
  { name: 'Motor',    nameAr: 'مركبات', color: '#8094E6', bg: 'rgba(128,148,230,0.12)' },
  { name: 'Medical',  nameAr: 'طبي',   color: '#6BCABA', bg: 'rgba(107,202,186,0.12)' },
  { name: 'Home',     nameAr: 'منزل',  color: '#FF7366', bg: 'rgba(255,115,102,0.12)' },
  { name: 'Domestic', nameAr: 'عمالة', color: '#D28C64', bg: 'rgba(210,140,100,0.12)' },
];

export function DesignSystem() {
  const { theme, language } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const pageBg    = isDark ? '#1F0F4D' : '#F8F7FC';
  const cardBg    = isDark ? 'rgba(25,5,140,0.45)' : '#FFFFFF';
  const cardBdr   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(25,5,140,0.08)';
  const cardSdw   = isDark ? 'none' : '0 2px 12px rgba(25,5,140,0.06)';
  const textHero  = isDark ? '#FFFFFF' : '#19058C';
  const textBody  = isDark ? 'rgba(255,255,255,0.75)' : '#3D3560';
  const textMuted = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(61,53,96,0.55)';
  const sectionBdr = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(25,5,140,0.07)';

  const ff  = "'Almarai', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif"   : "'Georama', Verdana, sans-serif";
  const ffM = "'IBM Plex Mono', monospace";

  const Section = ({ n, title, titleAr, children }: { n: string; title: string; titleAr: string; children: React.ReactNode }) => (
    <div style={{ paddingTop: '56px', paddingBottom: '56px', borderBottom: `1px solid ${sectionBdr}` }}>
      <div className="flex items-center gap-2.5 mb-2">
        <div style={{ width: '24px', height: '2px', background: '#D28C64', borderRadius: '2px' }} />
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#D28C64', fontFamily: ff }}>{n} · Foundation</span>
      </div>
      <h2 style={{ fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 700, color: textHero, fontFamily: ffH, marginBottom: '8px' }}>
        {isAr ? titleAr : title}
      </h2>
      {children}
    </div>
  );

  return (
    <div style={{ background: pageBg, minHeight: '100vh', direction: isAr ? 'rtl' : 'ltr' }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, #1F0F4D 0%, #19058C 100%)`, padding: '72px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '440px', height: '440px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(210,140,100,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '32%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(128,148,230,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '5px 14px', border: '1px solid rgba(210,140,100,0.45)', borderRadius: '20px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#D28C64', fontFamily: ff, marginBottom: '24px' }}>
            {isAr ? 'نظام التصميم · الإصدار 9 · 2022' : 'Brand Design System · Version 9 · 2022'}
          </div>
          <h1 style={{ fontFamily: ffH, fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '14px' }}>
            {isAr ? <>GIG <span style={{ color: '#D28C64' }}>التصميم</span></> : <>GIG <span style={{ color: '#D28C64' }}>Design</span></>}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', maxWidth: '480px', lineHeight: 1.7, fontFamily: ff }}>
            {isAr
              ? 'أصول الهوية البصرية لمجموعة الخليج للتأمين — نظام الألوان، الطباعة، المكونات والمبادئ التوجيهية.'
              : 'Gulf Insurance Group — Visual identity assets, colour system, typography, components, and brand guidelines.'}
          </p>
          <div className="flex gap-10 mt-9">
            {[
              { v: isAr ? 'استثمارنا فيك' : 'Invested in You',        s: isAr ? 'توضع العلامة' : 'Brand Positioning' },
              { v: isAr ? 'العلاقة ثروة'  : 'Relationship is Wealth',  s: isAr ? 'فلسفة العلامة' : 'Brand Philosophy' },
              { v: isAr ? 'منطقة الشرق الأوسط' : 'MENA Region',       s: isAr ? 'نطاق السوق' : 'Market Focus' },
            ].map(m => (
              <div key={m.v} style={{ borderInlineStart: '2px solid #D28C64', paddingInlineStart: '14px' }}>
                <strong style={{ display: 'block', color: '#fff', fontSize: '12px', fontFamily: ffH }}>{m.v}</strong>
                <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px', fontFamily: ff }}>{m.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── 01 Colors ──────────────────────────── */}
        <Section n="01" title="Colour System" titleAr="نظام الألوان">
          <p style={{ fontSize: '14px', color: textBody, lineHeight: 1.7, maxWidth: '560px', marginBottom: '36px', fontFamily: ff }}>
            {isAr
              ? 'تستوحي لوحة GIG من إرث الخليج — بحار النيلي العميق وشروق الذهب الوردي وشواطئ اللؤلؤ.'
              : 'The GIG palette draws from the Gulf heritage — deep indigo seas, rose-gold sunrise, and pearl shores.'}
          </p>

          {/* Primary */}
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: textMuted, marginBottom: '14px', fontFamily: ff }}>
            ─── {isAr ? 'الألوان الأساسية' : 'Primary Colours'}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8" style={{ maxWidth: '520px' }}>
            {COLORS.filter(c => c.role === 'Primary').map(c => (
              <div key={c.name} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(25,5,140,0.08)' }}>
                <div style={{ height: '100px', background: c.hex, position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '10px', insetInlineStart: '10px', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '20px', background: 'rgba(255,255,255,0.22)', color: '#fff', fontFamily: ff }}>{c.role}</span>
                </div>
                <div style={{ padding: '14px', background: cardBg, border: `1px solid ${cardBdr}`, borderTop: 'none' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: textHero, marginBottom: '6px', fontFamily: ffH }}>{isAr ? c.nameAr : c.name}</div>
                  <div style={{ fontSize: '11px', color: textMuted, fontFamily: ffM }}>{c.hex}</div>
                  <div style={{ fontSize: '11px', color: textMuted, fontFamily: ff }}>PANTONE {c.pantone}</div>
                  <div style={{ fontSize: '11px', color: textMuted, marginTop: '4px', fontFamily: ff }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary */}
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: textMuted, marginBottom: '14px', fontFamily: ff }}>
            ─── {isAr ? 'الألوان الثانوية' : 'Secondary / Functional Colours'}
          </div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {COLORS.filter(c => c.role !== 'Primary').map(c => (
              <div key={c.name} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(25,5,140,0.07)' }}>
                <div style={{ height: '80px', background: c.hex, border: c.name === 'Pearl' ? '1px solid #ddd' : undefined }} />
                <div style={{ padding: '12px', background: cardBg, border: `1px solid ${cardBdr}`, borderTop: 'none' }}>
                  <div style={{ fontWeight: 600, fontSize: '12px', color: textHero, marginBottom: '4px', fontFamily: ffH }}>{isAr ? c.nameAr : c.name}</div>
                  <div style={{ fontSize: '10px', color: textMuted, fontFamily: ffM }}>{c.hex}</div>
                  <div style={{ fontSize: '10px', color: textMuted, marginTop: '3px', fontFamily: ff }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradients */}
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: textMuted, marginBottom: '14px', fontFamily: ff }}>
            ─── {isAr ? 'التدرجات' : 'Background Gradients'}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {GRADIENTS.map(g => (
              <div key={g.name} style={{ borderRadius: '12px', height: '130px', padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: g.value, border: g.border, boxShadow: '0 4px 20px rgba(0,0,0,0.10)' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: g.textColor, fontFamily: ffH }}>{isAr ? g.nameAr : g.name}</div>
                <div style={{ fontSize: '11px', color: g.textColor, opacity: 0.65, marginTop: '2px', fontFamily: ff }}>{g.desc}</div>
              </div>
            ))}
          </div>

          {/* Tint scale */}
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: textMuted, marginBottom: '14px', fontFamily: ff }}>
            ─── {isAr ? 'مقياس التدرجات - إنديجو وذهبي وردي' : 'Indigo & Rose-Gold Tint Scale'}
          </div>
          <div className="flex gap-3 flex-wrap mb-2">
            {[1,0.75,0.60,0.40,0.20,0.10].map(a => (
              <div key={a} style={{ textAlign: 'center' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '8px', background: `rgba(25,5,140,${a})`, border: a < 0.15 ? `1px solid rgba(25,5,140,0.20)` : undefined }} />
                <div style={{ fontSize: '10px', color: textMuted, marginTop: '4px', fontFamily: ffM }}>{Math.round(a*100)}%</div>
              </div>
            ))}
            <div style={{ width: '1px', background: sectionBdr, margin: '0 8px', alignSelf: 'stretch' }} />
            {[1,0.60,0.20].map(a => (
              <div key={a} style={{ textAlign: 'center' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '8px', background: `rgba(210,140,100,${a})`, border: a < 0.25 ? `1px solid rgba(210,140,100,0.25)` : undefined }} />
                <div style={{ fontSize: '10px', color: textMuted, marginTop: '4px', fontFamily: ffM }}>RG {Math.round(a*100)}%</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 02 Typography ─────────────────────── */}
        <Section n="02" title="Typography System" titleAr="نظام الطباعة">
          <p style={{ fontSize: '14px', color: textBody, lineHeight: 1.7, maxWidth: '560px', marginBottom: '36px', fontFamily: ff }}>
            {isAr
              ? 'يستخدم GIG مجموعتين من الخطوط — الأولى للتعبير عن الهوية، والثانية للقراءة الوظيفية. تشترك خطوط اللاتينية والعربية في التنسيق الطباعي نفسه.'
              : 'GIG uses two typeface pairings — Primary for expressive brand moments, Secondary for functional readability. Latin and Arabic share the same typographic DNA.'}
          </p>

          <div className="grid grid-cols-2 gap-5 mb-8">
            {[
              {
                role: isAr ? 'رئيسي · لاتيني' : 'Master · Latin',
                name: 'Georama',
                desc: isAr ? 'خط عصري متعدد الاستخدامات للعناوين والهوية. يجمع بين الحداثة والوضوح.' : 'A versatile modern typeface for headlines and brand identity. Combines modernity with clarity.',
                weights: isAr ? ['خفيف','عادي','متوسط','عريض'] : ['Light','Regular','Medium','Bold'],
                specimen: { display: 'Invested in You', h1: 'Gulf Insurance Group', body: 'Relationship is wealth.', caption: 'INSURANCE MADE FOR YOU' },
                specimenFont: "'Georama', Verdana, serif",
              },
              {
                role: isAr ? 'ثانوي · عربي/لاتيني' : 'Secondary · Arabic/Latin',
                name: 'Almarai',
                desc: isAr ? 'خط عربي حديث وواضح للنصوص والأجسام. مثالي للقراءة على الشاشات.' : 'A modern, clear Arabic typeface for body text and supporting content. Ideal for screen readability.',
                weights: isAr ? ['خفيف','عادي','عريض','عريض جداً'] : ['Light','Regular','Bold','ExtraBold'],
                specimen: { display: 'مرحباً بالعالم', h1: 'التأمين الصحي', body: 'نحن هنا لجعل التأمين أكثر إنسانية.', caption: 'بوابة الوسطاء · الإصدار 9' },
                specimenFont: "'Almarai', Verdana, sans-serif",
              },
            ].map(card => (
              <div key={card.name} style={{ background: cardBg, borderRadius: '12px', padding: '28px', border: `1px solid ${cardBdr}`, boxShadow: cardSdw }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#D28C64', fontWeight: 600, marginBottom: '10px', fontFamily: ff }}>{card.role}</div>
                <div style={{ fontSize: '30px', fontWeight: 700, color: textHero, lineHeight: 1.1, marginBottom: '8px', fontFamily: card.specimenFont }}>{card.name}</div>
                <div style={{ fontSize: '13px', color: textBody, lineHeight: 1.6, marginBottom: '16px', fontFamily: ff }}>{card.desc}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.weights.map(w => (
                    <span key={w} style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', background: 'rgba(25,5,140,0.10)', color: '#19058C', fontFamily: ff }}>{w}</span>
                  ))}
                </div>
                <div style={{ paddingTop: '14px', borderTop: `1px solid ${sectionBdr}` }}>
                  {[
                    { label: 'Display', cls: { fontFamily: card.specimenFont, fontSize: '26px', fontWeight: 800 }, text: card.specimen.display },
                    { label: 'H1',      cls: { fontFamily: card.specimenFont, fontSize: '18px', fontWeight: 700 }, text: card.specimen.h1 },
                    { label: 'Body',    cls: { fontSize: '14px', fontWeight: 400, lineHeight: '1.6', fontFamily: ff }, text: card.specimen.body },
                    { label: 'Caption', cls: { fontSize: '11px', letterSpacing: '0.5px', color: textMuted, fontFamily: ff }, text: card.specimen.caption },
                  ].map(s => (
                    <div key={s.label} className="flex items-baseline gap-3 mb-2">
                      <span style={{ fontSize: '10px', color: textMuted, minWidth: '56px', fontFamily: ff }}>{s.label}</span>
                      <span style={{ color: textHero, ...s.cls }}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Typescale table */}
          <div style={{ background: cardBg, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${cardBdr}`, boxShadow: cardSdw }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${sectionBdr}` }}>
                  {[isAr?'الرمز':'Token', isAr?'الخط':'Font', isAr?'الحجم':'Size', isAr?'الوزن':'Weight', isAr?'الاستخدام':'Usage'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'start', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: textMuted, fontWeight: 600, fontFamily: ff }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TYPE_SCALE.map((row, i) => (
                  <tr key={row.token}
                    style={{ borderTop: i > 0 ? `1px solid ${sectionBdr}` : undefined }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(25,5,140,0.03)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px', color: '#19058C', fontFamily: ff }}>{row.token}</td>
                    <td style={{ padding: '12px 16px', fontFamily: ffM, fontSize: '12px', color: textMuted }}>{row.font}</td>
                    <td style={{ padding: '12px 16px', fontFamily: ffM, fontSize: '12px', color: textMuted }}>{row.size}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: textBody, fontFamily: ff }}>{row.weight}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: textBody, fontFamily: ff }}>{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── 03 Spacing ────────────────────────── */}
        <Section n="03" title="Spacing Scale" titleAr="نظام المسافات">
          <p style={{ fontSize: '14px', color: textBody, lineHeight: 1.7, maxWidth: '520px', marginBottom: '32px', fontFamily: ff }}>
            {isAr ? 'يعتمد النظام على مضاعفات 4px لتحقيق الاتساق البصري.' : 'The spacing system is built on multiples of 4px for visual consistency.'}
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            {SPACING.map(s => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: `${Math.max(16, s * 0.8)}px`, height: `${s}px`, background: '#19058C', borderRadius: '2px', opacity: 0.7 + s/200 }} />
                <span style={{ fontSize: '10px', color: textMuted, fontFamily: ffM }}>{s}px</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 04 Status & LOB tokens ────────────── */}
        <Section n="04" title="Status & LOB Tokens" titleAr="رموز الحالة وخطوط الأعمال">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: textMuted, marginBottom: '14px', fontFamily: ff }}>
                {isAr ? 'حالات السجل' : 'Status Tokens'}
              </div>
              <div className="space-y-2.5">
                {STATUS_TOKENS.map(s => (
                  <div key={s.name} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: cardBg, border: `1px solid ${cardBdr}` }}>
                    <div className="flex items-center gap-3">
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: textHero, fontFamily: ff }}>{isAr ? s.nameAr : s.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-full uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', color: s.color, background: s.bg, fontFamily: ff }}>
                        {isAr ? s.nameAr : s.name}
                      </span>
                      <span style={{ fontFamily: ffM, fontSize: '11px', color: textMuted }}>{s.color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: textMuted, marginBottom: '14px', fontFamily: ff }}>
                {isAr ? 'خطوط الأعمال' : 'Line of Business (LOB)'}
              </div>
              <div className="space-y-2.5">
                {LOB_TOKENS.map(l => (
                  <div key={l.name} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: cardBg, border: `1px solid ${cardBdr}` }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: textHero, fontFamily: ff }}>{isAr ? l.nameAr : l.name}</span>
                    <div className="flex items-center gap-3">
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: l.bg, border: `1px solid ${l.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }} />
                      </div>
                      <span style={{ fontFamily: ffM, fontSize: '11px', color: textMuted }}>{l.color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── 05 Components ─────────────────────── */}
        <Section n="05" title="Component Library" titleAr="مكتبة المكونات">
          <div className="space-y-5">
            {/* Buttons */}
            <div style={{ background: cardBg, borderRadius: '12px', padding: '24px', border: `1px solid ${cardBdr}`, boxShadow: cardSdw }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: textMuted, marginBottom: '18px', fontFamily: ff }}>
                {isAr ? 'الأزرار' : 'Buttons'}
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                {[
                  { label: isAr ? 'رئيسي'  : 'Primary',   bg: '#19058C', color: '#fff', bdr: 'none', shadow: '0 4px 12px rgba(25,5,140,0.30)' },
                  { label: isAr ? 'ذهبي'   : 'Rose-Gold', bg: '#D28C64', color: '#fff', bdr: 'none', shadow: '0 4px 12px rgba(210,140,100,0.30)' },
                  { label: isAr ? 'محيطي'  : 'Outline',   bg: 'transparent', color: '#19058C', bdr: `1.5px solid #19058C`, shadow: 'none' },
                  { label: isAr ? 'شبح'    : 'Ghost',     bg: 'transparent', color: textBody, bdr: `1.5px solid ${cardBdr}`, shadow: 'none' },
                  { label: isAr ? 'خطر'    : 'Danger',    bg: 'rgba(255,115,102,0.10)', color: '#FF7366', bdr: `1.5px solid rgba(255,115,102,0.30)`, shadow: 'none' },
                ].map(b => (
                  <button key={b.label}
                    className="transition-all hover:opacity-85 hover:-translate-y-0.5"
                    style={{ padding: '10px 22px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', background: b.bg, color: b.color, border: b.bdr, boxShadow: b.shadow, letterSpacing: '0.3px', fontFamily: ff }}>
                    {b.label}
                  </button>
                ))}
                <button style={{ padding: '7px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: '#19058C', color: '#fff', border: 'none', fontFamily: ff }}>SM</button>
                <button style={{ padding: '13px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', background: '#19058C', color: '#fff', border: 'none', fontFamily: ff }}>LG</button>
              </div>
            </div>

            {/* Inputs */}
            <div style={{ background: cardBg, borderRadius: '12px', padding: '24px', border: `1px solid ${cardBdr}`, boxShadow: cardSdw }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: textMuted, marginBottom: '18px', fontFamily: ff }}>
                {isAr ? 'حقول الإدخال' : 'Input Fields'}
              </div>
              <div className="grid grid-cols-3 gap-4" style={{ maxWidth: '680px' }}>
                {[
                  { label: isAr ? 'حقل عادي' : 'Default', placeholder: isAr ? 'أدخل قيمة...' : 'Enter a value...', bdr: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(25,5,140,0.14)', hint: isAr ? 'نص مساعد' : 'Helper text' },
                  { label: isAr ? 'تركيز' : 'Focus',     placeholder: isAr ? 'قيد التعبئة...' : 'Filling in...', bdr: '#19058C', hint: isAr ? 'نشط' : 'Active' },
                  { label: isAr ? 'خطأ' : 'Error',       placeholder: isAr ? 'خطأ في البريد' : 'Invalid email', bdr: '#FF7366', hint: isAr ? 'البريد غير صحيح' : 'Invalid email address', error: true },
                ].map(inp => (
                  <div key={inp.label}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: textBody, marginBottom: '5px', fontFamily: ff }}>{inp.label}</label>
                    <input
                      readOnly
                      className="w-full px-4 py-2.5 rounded-lg outline-none"
                      style={{ background: isDark ? 'rgba(255,255,255,0.07)' : '#F8F7FC', border: `1.5px solid ${inp.bdr}`, fontSize: '14px', color: textHero, fontFamily: ff }}
                      placeholder={inp.placeholder}
                    />
                    <span style={{ fontSize: '11px', color: inp.error ? '#FF7366' : textMuted, marginTop: '4px', display: 'block', fontFamily: ff }}>{inp.hint}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav demo */}
            <div style={{ background: cardBg, borderRadius: '12px', padding: '24px', border: `1px solid ${cardBdr}`, boxShadow: cardSdw }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: textMuted, marginBottom: '18px', fontFamily: ff }}>
                {isAr ? 'شريط التنقل' : 'Navigation Bar'}
              </div>
              <div style={{ background: 'linear-gradient(135deg, #1F0F4D 0%, #19058C 100%)', padding: '14px 22px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: ffH, fontWeight: 900, color: '#fff', fontSize: '20px', letterSpacing: '-0.5px' }}>
                  GIG <span style={{ color: '#D28C64' }}>{isAr ? 'الأردن' : 'Jordan'}</span>
                </span>
                <div className="flex gap-6">
                  {[isAr?'الرئيسية':'Home', isAr?'الوثائق':'Policies', isAr?'التقارير':'Reports'].map((l, i) => (
                    <a key={l} style={{ fontSize: '13px', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.55)', textDecoration: 'none', fontWeight: i === 0 ? 600 : 400, fontFamily: ff }}>{l}</a>
                  ))}
                </div>
                <button style={{ background: '#D28C64', color: '#fff', padding: '8px 18px', borderRadius: '4px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: ff }}>
                  {isAr ? 'دخول' : 'Sign In'}
                </button>
              </div>
            </div>

            {/* Cards */}
            <div style={{ background: cardBg, borderRadius: '12px', padding: '24px', border: `1px solid ${cardBdr}`, boxShadow: cardSdw }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: textMuted, marginBottom: '18px', fontFamily: ff }}>
                {isAr ? 'بطاقات المعلومات' : 'Information Cards'}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { hdr: 'linear-gradient(135deg, #19058C, #8094E6)', tag: isAr?'سفر':'Travel',   title: isAr?'تأمين السفر':'Travel Insurance',   body: isAr?'حماية شاملة لرحلاتك.':'Comprehensive travel protection for every journey.', linkColor: '#19058C' },
                  { hdr: 'linear-gradient(135deg, #1F0F4D, #D28C64)', tag: isAr?'مركبات':'Motor', title: isAr?'تأمين المركبات':'Motor Insurance',  body: isAr?'حماية مركبتك على الطريق.':'Full coverage for your vehicle on the road.',        linkColor: '#D28C64' },
                  { hdr: 'linear-gradient(135deg, #19058C, #6BCABA)', tag: isAr?'طبي':'Medical',  title: isAr?'التأمين الطبي':'Medical Insurance', body: isAr?'رعاية صحية شاملة.':'Comprehensive healthcare for you and your family.',   linkColor: '#6BCABA' },
                ].map(c => (
                  <div key={c.title} style={{ background: isDark ? 'rgba(25,5,140,0.35)' : '#FFFFFF', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${cardBdr}`, boxShadow: '0 2px 12px rgba(25,5,140,0.06)' }}>
                    <div style={{ height: '76px', background: c.hdr, padding: '18px', display: 'flex', alignItems: 'flex-end' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#fff', background: 'rgba(255,255,255,0.20)', padding: '2px 8px', borderRadius: '20px', fontFamily: ff }}>{c.tag}</span>
                    </div>
                    <div style={{ padding: '16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: textHero, marginBottom: '5px', fontFamily: ffH }}>{c.title}</div>
                      <div style={{ fontSize: '12px', color: textBody, lineHeight: 1.6, marginBottom: '12px', fontFamily: ff }}>{c.body}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a style={{ fontSize: '12px', fontWeight: 600, color: c.linkColor, textDecoration: 'none', fontFamily: ff }}>{isAr?'اعرف المزيد':'Learn more →'}</a>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${c.linkColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: c.linkColor }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── 06 Brand Values ───────────────────── */}
        <Section n="06" title="Brand Values" titleAr="قيم العلامة التجارية">
          <div className="grid grid-cols-3 gap-5">
            {[
              { n: '01', title: isAr?'الثقة':'Trust',        desc: isAr?'نبني علاقات طويلة الأمد مبنية على الموثوقية والشفافية.':'We build long-term relationships founded on reliability and transparency.' },
              { n: '02', title: isAr?'الابتكار':'Innovation', desc: isAr?'نسعى دائماً لتقديم حلول تأمينية مبتكرة تلبي احتياجات المستقبل.':'We continuously innovate insurance solutions that meet tomorrow\'s needs.' },
              { n: '03', title: isAr?'الرعاية':'Care',        desc: isAr?'نضع عملاءنا ووسطاءنا في قلب كل قرار نتخذه.':'We place our clients and brokers at the heart of every decision we make.' },
            ].map(v => (
              <div key={v.n} style={{ background: 'linear-gradient(135deg, #1F0F4D 0%, #19058C 100%)', borderRadius: '12px', padding: '28px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(210,140,100,0.15)', pointerEvents: 'none' }} />
                <div style={{ fontSize: '11px', color: '#D28C64', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px', fontFamily: ff }}>{v.n}</div>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', fontFamily: ffH }}>{v.title}</div>
                <div style={{ fontSize: '13px', opacity: 0.70, lineHeight: 1.6, fontFamily: ff }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ height: '64px' }} />
      </div>
    </div>
  );
}
