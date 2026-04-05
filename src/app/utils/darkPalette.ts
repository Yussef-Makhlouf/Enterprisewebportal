/**
 * GIG Dark Mode Palette — Navy #0C1221 base system
 * Single source of truth for all dark/light component tokens.
 */

export const B = {
  indigo:   '#19058C',
  roseGold: '#D28C64',
  deepBlue: '#1F0F4D',
  ocean:    '#8094E6',
  seafoam:  '#6BCABA',
  purple:   '#A78BF0',
} as const;

/** Page background */
export const pageBackground = (isDark: boolean) =>
  isDark ? '#0C1221' : '#F8F7FC';

/** Card / panel background */
export const cardBg = (isDark: boolean) =>
  isDark
    ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)'
    : '#FFFFFF';

/** Drawer / side-panel background (slightly different angle) */
export const drawerBg = (isDark: boolean) =>
  isDark
    ? 'linear-gradient(165deg, #0F1825 0%, #131D2E 100%)'
    : '#FFFFFF';

/** Modal background */
export const modalBg = (isDark: boolean) =>
  isDark
    ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)'
    : '#FFFFFF';

/** Card drop shadow */
export const cardSdw = (isDark: boolean) =>
  isDark
    ? '0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(128,148,230,0.12), inset 0 -1px 0 rgba(0,0,0,0.20)'
    : '0 2px 20px rgba(25,5,140,0.07)';

/** Modal shadow */
export const modalSdw = (isDark: boolean) =>
  isDark
    ? '0 24px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(128,148,230,0.12)'
    : '0 8px 40px rgba(25,5,140,0.12)';

/** Card border */
export const cardBdr = (isDark: boolean) =>
  isDark ? 'rgba(128,148,230,0.16)' : 'rgba(25,5,140,0.08)';

/** Inner row background */
export const innerBg = (isDark: boolean) =>
  isDark ? 'rgba(128,148,230,0.05)' : '#F8F7FC';

/** Inner row border */
export const innerBdr = (isDark: boolean) =>
  isDark ? 'rgba(128,148,230,0.09)' : 'rgba(25,5,140,0.06)';

/** Input background */
export const inputBg = (isDark: boolean) =>
  isDark ? 'rgba(255,255,255,0.05)' : '#F8F7FC';

/** Primary text — strong legibility in both modes */
export const textPrimary = (isDark: boolean) =>
  isDark ? '#E8F0FF' : '#19058C';

/** Body text */
export const textBody = (isDark: boolean) =>
  isDark ? 'rgba(180,205,255,0.90)' : '#3D3560';

/** Muted text */
export const textMuted = (isDark: boolean) =>
  isDark ? 'rgba(150,175,235,0.68)' : 'rgba(61,53,96,0.60)';

/** Hero value text */
export const textHero = (isDark: boolean) =>
  isDark ? '#F0F5FF' : '#19058C';

/** Secondary text — readable mid-level */
export const textSecondary = (isDark: boolean) =>
  isDark ? 'rgba(180,205,255,0.78)' : '#3D3560';

/** Chart grid lines */
export const gridLine = (isDark: boolean) =>
  isDark ? 'rgba(128,148,230,0.08)' : 'rgba(25,5,140,0.06)';

/** Chart tooltip style — dark-mode aware */
export const tooltipStyle = (ff: string, isDark = false) => ({
  background: isDark ? '#111C2E' : '#1F0F4D',
  border: `1px solid ${isDark ? 'rgba(128,148,230,0.20)' : 'rgba(255,255,255,0.08)'}`,
  borderTop: `2px solid ${B.roseGold}`,
  borderRadius: '8px',
  fontSize: '12px',
  fontFamily: ff,
  color: '#FFFFFF',
  boxShadow: isDark
    ? '0 8px 24px rgba(0,0,0,0.60)'
    : '0 8px 24px rgba(0,0,0,0.45)',
});

/** Status chips (no red) */
export const STATUS: Record<string, { color: string; bg: string; labelEn: string; labelAr: string }> = {
  Active:    { color: '#6BCABA', bg: 'rgba(107,202,186,0.14)', labelEn: 'Active',    labelAr: 'نشط'     },
  Pending:   { color: '#D28C64', bg: 'rgba(210,140,100,0.14)', labelEn: 'Pending',   labelAr: 'معلق'    },
  Expired:   { color: '#8094E6', bg: 'rgba(128,148,230,0.14)', labelEn: 'Expired',   labelAr: 'منتهي'   },
  Blocked:   { color: '#A78BF0', bg: 'rgba(167,139,240,0.14)', labelEn: 'Blocked',   labelAr: 'محظور'   },
  Inactive:  { color: 'rgba(128,148,230,0.70)', bg: 'rgba(128,148,230,0.10)', labelEn: 'Inactive',  labelAr: 'غير نشط' },
  Cancelled: { color: '#D28C64', bg: 'rgba(210,140,100,0.14)', labelEn: 'Cancelled', labelAr: 'ملغي'    },
};
