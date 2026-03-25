import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreateRoleDrawer } from '../../components/admin/CreateRoleDrawer';
import {
  IconSuperAdmin, IconAdminUser, IconTravelBroker,
  IconMotorBroker, IconMedicalBroker, IconMultiLine,
  IconUserPlus, IconPlus, IconMore,
} from '../../components/icons/RoleIcons';

/* ── Role data ───────────────────────────────────────────── */
const ROLES = [
  {
    id: 1, name: 'Super Admin', nameAr: 'مدير عام',
    desc: 'Full system access with all permissions enabled across every module.',
    descAr: 'وصول كامل للنظام مع جميع الصلاحيات عبر كل وحدة.',
    SvgIcon: IconSuperAdmin,
    color: '#8094E6', accentDark: '#A8B8FF', accentLight: '#19058C',
    permissions: ['Dashboard', 'Brokers', 'Policies', 'Audit', 'Roles'],
    users: ['AR', 'KM', 'SQ'], userCount: 3, active: true,
    tag: 'System',
  },
  {
    id: 2, name: 'Admin User', nameAr: 'مستخدم مدير',
    desc: 'Administrative access excluding system configuration and role management.',
    descAr: 'وصول إداري مع استثناء إعدادات النظام وإدارة الأدوار.',
    SvgIcon: IconAdminUser,
    color: '#6BCABA', accentDark: '#82D9C9', accentLight: '#3AAFA0',
    permissions: ['Dashboard', 'Brokers', 'Policies', 'Audit'],
    users: ['OH', 'LN'], userCount: 8, active: true,
    tag: 'Admin',
  },
  {
    id: 3, name: 'Travel Broker', nameAr: 'وسيط سفر',
    desc: 'Issue and manage travel insurance policies for individuals and groups.',
    descAr: 'إصدار وإدارة وثائق تأمين السفر للأفراد والمجموعات.',
    SvgIcon: IconTravelBroker,
    color: '#D28C64', accentDark: '#E8A87C', accentLight: '#B5693E',
    permissions: ['Dashboard', 'Policies'],
    users: ['AS', 'DF', 'RK'], userCount: 24, active: true,
    tag: 'Broker',
  },
  {
    id: 4, name: 'Motor Broker', nameAr: 'وسيط مركبات',
    desc: 'Issue and manage motor insurance policies including TPL and comprehensive.',
    descAr: 'إصدار وإدارة وثائق تأمين المركبات شاملاً المسؤولية والشامل.',
    SvgIcon: IconMotorBroker,
    color: '#C9A84C', accentDark: '#E8C96A', accentLight: '#A07E2A',
    permissions: ['Dashboard', 'Policies'],
    users: ['KM', 'OH'], userCount: 18, active: true,
    tag: 'Broker',
  },
  {
    id: 5, name: 'Medical Broker', nameAr: 'وسيط طبي',
    desc: 'Issue and manage group and individual medical insurance policies.',
    descAr: 'إصدار وإدارة وثائق التأمين الطبي الجماعي والفردي.',
    SvgIcon: IconMedicalBroker,
    color: '#FF7366', accentDark: '#FF9088', accentLight: '#D94F40',
    permissions: ['Dashboard', 'Policies'],
    users: ['LN', 'SQ'], userCount: 12, active: false,
    tag: 'Broker',
  },
  {
    id: 6, name: 'Multi-Line Broker', nameAr: 'وسيط متعدد الخطوط',
    desc: 'Full access to multiple lines of business across travel, motor, and medical.',
    descAr: 'وصول كامل لخطوط أعمال متعددة عبر السفر والمركبات والطبي.',
    SvgIcon: IconMultiLine,
    color: '#A78BF0', accentDark: '#C4AEFF', accentLight: '#7B5ED4',
    permissions: ['Dashboard', 'Brokers', 'Policies'],
    users: ['HR', 'TA'], userCount: 6, active: true,
    tag: 'Broker',
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  System: { bg: 'rgba(128,148,230,0.18)', text: '#8094E6' },
  Admin:  { bg: 'rgba(107,202,186,0.18)', text: '#6BCABA' },
  Broker: { bg: 'rgba(201,168,76,0.18)',  text: '#C9A84C' },
};

/* ── Component ───────────────────────────────────────────── */
export function RolesPermissions() {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr = language === 'ar';
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [editRole, setEditRole] = useState<any>(null);
  const [roles, setRoles] = useState(ROLES);

  const isDark = theme === 'dark';

  /* palette */
  const pageBg     = isDark ? '#0C1221' : '#F3F4F8';
  const textH      = isDark ? '#E8F0FF' : '#19058C';
  const textSub    = isDark ? 'rgba(180,205,255,0.55)' : '#5A6A8A';
  const borderCol  = isDark ? 'rgba(128,148,230,0.14)' : 'rgba(25,5,140,0.09)';
  const ff         = isAr ? "'Almarai', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";
  const ffH        = isAr ? "'Kufam', Tahoma, sans-serif"  : "'Reforma', Verdana, sans-serif";

  const toggleRole = (id: number) => {
    setRoles(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="p-6 min-h-full" style={{ background: pageBg, direction: isRTL ? 'rtl' : 'ltr' }}>

      {/* ── Page Header ──────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            {/* tiny decorative bar */}
            <span className="w-1 h-5 rounded-full" style={{ background: '#8094E6' }} />
            <h1 style={{ fontFamily: ffH, fontSize: '1.45rem', fontWeight: 700, color: textH, letterSpacing: '-0.01em' }}>
              {isAr ? 'الأدوار والصلاحيات' : 'Roles & Permissions'}
            </h1>
          </div>
          <p style={{ fontFamily: ff, fontSize: '13px', color: textSub, marginInlineStart: '16px' }}>
            {isAr
              ? `${roles.length} أدوار — ${roles.filter(r => r.active).length} نشطة`
              : `${roles.length} roles — ${roles.filter(r => r.active).length} active`}
          </p>
        </div>

        <div className="flex gap-2.5">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
            style={{
              fontFamily: ff, fontSize: '13px', fontWeight: 600,
              border: `1.5px solid ${borderCol}`,
              color: isDark ? 'rgba(180,205,255,0.70)' : '#5A6A8A',
              background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
            }}
          >
            <IconUserPlus color={isDark ? '#8094E6' : '#19058C'} size={15} />
            {isAr ? 'إضافة مستخدم GIG' : 'Add GIG User'}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              fontFamily: ff, fontSize: '13px', fontWeight: 700,
              background: '#19058C',
              boxShadow: '0 4px 16px rgba(25,5,140,0.35)',
            }}
            onClick={() => setCreateDrawerOpen(true)}
          >
            <IconPlus color="#FFFFFF" size={15} />
            {isAr ? 'إنشاء دور' : 'Create Role'}
          </button>
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────── */}
      <div className="flex gap-3 mb-7">
        {[
          { label: isAr ? 'إجمالي الأدوار' : 'Total Roles',    value: roles.length,                                  color: '#8094E6' },
          { label: isAr ? 'أدوار نشطة'    : 'Active Roles',    value: roles.filter(r => r.active).length,            color: '#6BCABA' },
          { label: isAr ? 'إجمالي المستخدمين' : 'Total Users', value: roles.reduce((s, r) => s + r.userCount, 0),   color: '#C9A84C' },
        ].map(stat => (
          <div key={stat.label} className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: isDark ? `${stat.color}10` : `${stat.color}0C`,
              border: `1px solid ${stat.color}${isDark ? '28' : '20'}`,
            }}>
            <span style={{ fontFamily: ffH, fontSize: '1.5rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </span>
            <span style={{ fontFamily: ff, fontSize: '11px', color: isDark ? 'rgba(180,205,255,0.50)' : '#6B7A99', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Roles Grid ──────────────────────────────── */}
      <div className="grid grid-cols-3 gap-5">
        {roles.map((role) => {
          const accent = isDark ? role.accentDark : role.accentLight;
          const tagStyle = TAG_COLORS[role.tag] || TAG_COLORS.Broker;

          return (
            <div
              key={role.id}
              className="rounded-2xl overflow-hidden transition-all duration-200 flex flex-col"
              style={{
                background: isDark ? '#111C2E' : '#FFFFFF',
                border: `1px solid ${isDark ? `${role.color}25` : `${role.color}1E`}`,
                boxShadow: isDark
                  ? `0 4px 28px rgba(0,0,0,0.40), inset 0 1px 0 ${role.color}15`
                  : `0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px ${role.color}10`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = isDark ? `${role.color}50` : `${role.color}50`;
                el.style.boxShadow = isDark
                  ? `0 10px 36px rgba(0,0,0,0.50), inset 0 1px 0 ${role.color}25`
                  : `0 8px 28px ${role.color}1E, 0 0 0 1px ${role.color}35`;
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = isDark ? `${role.color}25` : `${role.color}1E`;
                el.style.boxShadow = isDark
                  ? `0 4px 28px rgba(0,0,0,0.40), inset 0 1px 0 ${role.color}15`
                  : `0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px ${role.color}10`;
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* ── Top accent bar ── */}
              <div style={{ height: '3px', background: role.color }} />

              <div className="p-5 flex flex-col flex-1">

                {/* ── Card Header ── */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Icon badge */}
                    <div className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        width: 52, height: 52,
                        background: isDark ? `${role.color}18` : `${role.color}0F`,
                        border: `1.5px solid ${role.color}${isDark ? '38' : '2A'}`,
                        boxShadow: isDark ? `0 0 16px ${role.color}18` : 'none',
                      }}>
                      <role.SvgIcon color={accent} size={24} />
                    </div>

                    <div>
                      <h3 style={{ fontFamily: ffH, fontSize: '14px', fontWeight: 700, color: isDark ? '#E8F0FF' : '#19058C', lineHeight: 1.2 }}>
                        {isAr ? role.nameAr : role.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {/* role category tag */}
                        <span className="px-2 py-0.5 rounded-md"
                          style={{
                            fontFamily: ff, fontSize: '9px', fontWeight: 700,
                            letterSpacing: '0.09em', textTransform: 'uppercase',
                            background: tagStyle.bg, color: tagStyle.text,
                          }}>
                          {role.tag}
                        </span>
                        {/* active pill */}
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md"
                          style={{
                            fontFamily: ff, fontSize: '9px', fontWeight: 700,
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            background: role.active
                              ? (isDark ? 'rgba(107,202,186,0.14)' : 'rgba(107,202,186,0.10)')
                              : (isDark ? 'rgba(255,115,102,0.12)' : 'rgba(255,115,102,0.09)'),
                            color: role.active ? '#6BCABA' : '#FF7366',
                          }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: role.active ? '#6BCABA' : '#FF7366' }} />
                          {role.active ? (isAr ? 'نشط' : 'Active') : (isAr ? 'معطل' : 'Inactive')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle switch */}
                  <button
                    className="w-10 h-5 rounded-full transition-all relative shrink-0 mt-0.5 cursor-pointer"
                    style={{
                      background: role.active ? role.color : (isDark ? '#253045' : '#D1D9E6'),
                      boxShadow: role.active ? `0 0 8px ${role.color}60` : 'none',
                    }}
                    onClick={() => toggleRole(role.id)}
                  >
                    <span
                      className="absolute top-0.5 rounded-full bg-white transition-all"
                      style={{
                        width: 16, height: 16,
                        left: role.active ? '22px' : '2px',
                        boxShadow: '0 1px 5px rgba(0,0,0,0.28)',
                      }}
                    />
                  </button>
                </div>

                {/* ── Description ── */}
                <p style={{
                  fontFamily: ff,
                  fontSize: '12px',
                  color: isDark ? 'rgba(180,205,255,0.50)' : '#6B7A99',
                  lineHeight: '1.7',
                  minHeight: '40px',
                  marginBottom: '14px',
                }}>
                  {isAr ? role.descAr : role.desc}
                </p>

                {/* ── Permission Tags ── */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {role.permissions.map(perm => (
                    <span key={perm}
                      className="px-2.5 py-1 rounded-lg"
                      style={{
                        fontFamily: ff,
                        fontSize: '10px', fontWeight: 600,
                        letterSpacing: '0.04em',
                        background: isDark ? `${role.color}14` : `${role.color}0C`,
                        color: accent,
                        border: `1px solid ${role.color}${isDark ? '2E' : '22'}`,
                      }}>
                      {perm}
                    </span>
                  ))}
                </div>

                {/* ── Divider ── */}
                <div style={{
                  height: '1px',
                  background: isDark
                    ? `linear-gradient(to right, transparent, ${role.color}22, transparent)`
                    : `linear-gradient(to right, transparent, ${role.color}18, transparent)`,
                  marginBottom: '12px',
                }} />

                {/* ── Footer: Avatars + Users + Menu ── */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    {/* stacked avatars */}
                    <div className="flex items-center">
                      {role.users.slice(0, 3).map((u, i) => (
                        <div key={u}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                          style={{
                            fontFamily: ff,
                            fontSize: '9px', fontWeight: 700,
                            background: isDark
                              ? `${role.color}CC`
                              : `${role.color}EE`,
                            border: `2px solid ${isDark ? '#111C2E' : '#FFFFFF'}`,
                            marginLeft: i > 0 ? '-9px' : '0',
                            zIndex: 10 - i,
                            position: 'relative',
                            boxShadow: `0 1px 4px ${role.color}40`,
                          }}>
                          {u}
                        </div>
                      ))}
                      {role.userCount > 3 && (
                        <div className="w-7 h-7 rounded-full flex items-center justify-center relative shrink-0"
                          style={{
                            fontFamily: ff,
                            fontSize: '9px', fontWeight: 700,
                            background: isDark ? '#1E2D47' : '#EEF1FA',
                            border: `2px solid ${isDark ? '#111C2E' : '#FFFFFF'}`,
                            color: isDark ? 'rgba(180,205,255,0.60)' : '#7A8AAA',
                            marginLeft: '-9px', zIndex: 0,
                          }}>
                          +{role.userCount - 3}
                        </div>
                      )}
                    </div>
                    <span style={{
                      fontFamily: ff, fontSize: '11px', fontWeight: 500,
                      color: isDark ? 'rgba(180,205,255,0.40)' : '#9BA8BE',
                    }}>
                      {role.userCount} {isAr ? 'مستخدم' : 'users'}
                    </span>
                  </div>

                  {/* Menu button */}
                  <button
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      background: 'transparent',
                      color: isDark ? 'rgba(180,205,255,0.35)' : '#B0BECC',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = isDark ? `${role.color}18` : `${role.color}0F`;
                      el.style.color = accent;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'transparent';
                      el.style.color = isDark ? 'rgba(180,205,255,0.35)' : '#B0BECC';
                    }}
                    onClick={() => setEditRole(role)}
                  >
                    <IconMore color="currentColor" size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Drawers ─────────────────────────────────── */}
      {(createDrawerOpen || editRole) && (
        <CreateRoleDrawer
          role={editRole}
          onClose={() => { setCreateDrawerOpen(false); setEditRole(null); }}
          onSave={() => {
            setCreateDrawerOpen(false);
            setEditRole(null);
            addToast({ type: 'success', title: isAr ? 'تم الحفظ' : 'Role Saved' });
          }}
        />
      )}
    </div>
  );
}
