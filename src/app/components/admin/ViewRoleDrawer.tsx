import { useApp } from '../../context/AppContext';
import { X, Edit2, Users, Shield, Clock } from 'lucide-react';
import { B, drawerBg, cardBdr, cardSdw, innerBg, innerBdr, textHero, textBody, textMuted } from '../../utils/darkPalette';

interface Role {
  id: number;
  name: string;
  nameAr: string;
  permissions: string[];
  users: string[];
  userCount: number;
  active: boolean;
  tag: string;
  color: string;
}

interface Props {
  role: Role;
  onClose: () => void;
  onEdit?: () => void;
}

const PERMISSION_GROUPS: Record<string, { label: string; labelAr: string; perms: string[] }> = {
  Dashboard: { label: 'Dashboard', labelAr: 'لوحة التحكم', perms: ['View Dashboard', 'Export Reports', 'View Charts'] },
  Brokers:   { label: 'Brokers', labelAr: 'الوسطاء', perms: ['View Brokers', 'Edit Brokers', 'Send Invitations', 'Block/Unblock'] },
  Policies:  { label: 'Policies', labelAr: 'الوثائق', perms: ['View Policies', 'Issue Policies', 'Cancel Policies', 'Download'] },
  Audit:     { label: 'Audit', labelAr: 'التدقيق', perms: ['View Audit Trail', 'Export Logs'] },
  Roles:     { label: 'Roles', labelAr: 'الأدوار', perms: ['View Roles', 'Create Roles', 'Edit Roles', 'Delete Roles', 'Assign Users'] },
};

export function ViewRoleDrawer({ role, onClose, onEdit }: Props) {
  const { theme, language, isRTL } = useApp();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';

  const dBg  = drawerBg(isDark);
  const bdr  = cardBdr(isDark);
  const iBg  = innerBg(isDark);
  const iBdr = innerBdr(isDark);
  const tH   = textHero(isDark);
  const tB   = textBody(isDark);
  const tM   = textMuted(isDark);
  const ff   = isAr ? "'Almarai', Tahoma, sans-serif"  : "'Georama', Verdana, sans-serif";
  const ffH  = isAr ? "'Kufam', Tahoma, sans-serif"    : "'Reforma', Verdana, sans-serif";
  const ffM  = "'IBM Plex Mono', monospace";

  const activeGroups = role.permissions;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div
        className="fixed top-0 bottom-0 z-50 flex flex-col overflow-hidden"
        style={{
          [isRTL ? 'left' : 'right']: 0,
          width: '440px',
          background: dBg,
          borderLeft: isRTL ? 'none' : `1px solid ${bdr}`,
          borderRight: isRTL ? `1px solid ${bdr}` : 'none',
          boxShadow: isDark
            ? '-8px 0 40px rgba(0,0,0,0.55), inset 1px 0 0 rgba(128,148,230,0.08)'
            : '-2px 0 24px rgba(25,5,140,0.10)',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: bdr }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${role.color}18`, border: `1.5px solid ${role.color}35` }}>
              <Shield size={16} style={{ color: role.color }} />
            </div>
            <div>
              <h2 style={{ fontFamily: ffH, fontSize: '15px', fontWeight: 700, color: tH }}>
                {isAr ? role.nameAr : role.name}
              </h2>
              <p style={{ fontSize: '11px', color: tM, fontFamily: ff }}>
                {isAr ? 'عرض تفاصيل الدور والصلاحيات' : 'Role details (read-only)'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ color: tM, background: iBg, border: `1px solid ${iBdr}` }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Status + tag row */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full"
              style={{ fontSize: '11px', fontWeight: 700, background: role.active ? 'rgba(107,202,186,0.14)' : 'rgba(128,148,230,0.14)', color: role.active ? B.seafoam : B.ocean }}>
              {role.active ? (isAr ? 'نشط' : 'Active') : (isAr ? 'معطل' : 'Inactive')}
            </span>
            <span className="px-2.5 py-1 rounded-lg"
              style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.07em', background: `${role.color}14`, color: role.color, border: `1px solid ${role.color}25` }}>
              {role.tag}
            </span>
          </div>

          {/* Permissions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={13} style={{ color: tM }} />
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: tM, fontFamily: ff }}>
                {isAr ? 'الصلاحيات الممنوحة' : 'Granted Permissions'}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {Object.entries(PERMISSION_GROUPS).map(([key, group]) => {
                const hasAccess = activeGroups.includes(key);
                return (
                  <div key={key} className="rounded-xl p-3"
                    style={{
                      background: hasAccess ? `${role.color}09` : iBg,
                      border: `1px solid ${hasAccess ? `${role.color}30` : iBdr}`,
                      opacity: hasAccess ? 1 : 0.5,
                    }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontSize: '12px', fontWeight: 700, color: hasAccess ? role.color : tM, fontFamily: ff }}>
                        {isAr ? group.labelAr : group.label}
                      </span>
                      {!hasAccess && (
                        <span style={{ fontSize: '10px', color: tM, fontFamily: ff }}>{isAr ? 'محجوب' : 'No access'}</span>
                      )}
                    </div>
                    {hasAccess && (
                      <div className="flex flex-wrap gap-1.5">
                        {group.perms.map(p => (
                          <span key={p} className="px-2 py-0.5 rounded-md"
                            style={{ fontSize: '10px', fontWeight: 500, background: `${role.color}12`, color: role.color, border: `1px solid ${role.color}20` }}>
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned users */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users size={13} style={{ color: tM }} />
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: tM, fontFamily: ff }}>
                {isAr ? `المستخدمون المعيّنون (${role.userCount})` : `Assigned Users (${role.userCount})`}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {role.users.map(u => (
                <div key={u} className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: `${role.color}DD`, fontSize: '11px', border: `2px solid ${isDark ? '#0F1825' : '#FFFFFF'}`, boxShadow: `0 1px 4px ${role.color}40` }}>
                  {u}
                </div>
              ))}
              {role.userCount > role.users.length && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                  style={{ background: iBg, border: `2px solid ${iBdr}`, color: tM, fontSize: '10px', fontFamily: ffM }}>
                  +{role.userCount - role.users.length}
                </div>
              )}
            </div>
          </div>

          {/* Audit info */}
          <div className="flex items-start gap-2 p-3 rounded-xl"
            style={{ background: iBg, border: `1px solid ${iBdr}` }}>
            <Clock size={14} style={{ color: tM, marginTop: '1px', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '11px', color: tM, fontFamily: ff }}>
                {isAr ? 'آخر تعديل:' : 'Last modified:'} <span style={{ color: tB }}>2025-03-20 by Nasser Ali</span>
              </p>
              <p style={{ fontSize: '11px', color: tM, fontFamily: ff, marginTop: '3px' }}>
                {isAr ? 'تاريخ الإنشاء:' : 'Created:'} <span style={{ color: tB }}>2024-11-01</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t"
          style={{ borderColor: bdr, background: isDark ? 'rgba(0,0,0,0.10)' : 'rgba(25,5,140,0.02)' }}>
          <button onClick={onClose}
            className="px-5 py-2 rounded-lg border text-sm font-medium hover:opacity-80 transition-all"
            style={{ borderColor: bdr, color: tM, fontFamily: ff }}>
            {isAr ? 'إغلاق' : 'Close'}
          </button>
          {onEdit && (
            <button onClick={onEdit}
              className="px-5 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all"
              style={{ background: B.indigo, boxShadow: '0 3px 12px rgba(25,5,140,0.30)', fontFamily: ff }}>
              <Edit2 size={14} />
              {isAr ? 'تعديل الدور' : 'Edit Role'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
