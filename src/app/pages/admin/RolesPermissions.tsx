import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, UserPlus, MoreHorizontal, Shield, Users, Briefcase, Car, Heart, Home } from 'lucide-react';
import { CreateRoleDrawer } from '../../components/admin/CreateRoleDrawer';

const ROLES = [
  {
    id: 1, name: 'Super Admin', nameAr: 'مدير عام',
    desc: 'Full system access with all permissions', descAr: 'وصول كامل للنظام مع جميع الصلاحيات',
    icon: Shield, color: '#C8102E', bgColor: 'rgba(200,16,46,0.12)',
    permissions: ['Dashboard', 'Brokers', 'Policies', 'Audit', 'Roles'],
    users: ['AR', 'KM', 'SQ'],
    userCount: 3,
    active: true,
  },
  {
    id: 2, name: 'Admin User', nameAr: 'مستخدم مدير',
    desc: 'Administrative access excluding system settings', descAr: 'وصول إداري مع استثناء إعدادات النظام',
    icon: Users, color: '#0DB4CC', bgColor: 'rgba(13,180,204,0.12)',
    permissions: ['Dashboard', 'Brokers', 'Policies', 'Audit'],
    users: ['OH', 'LN'],
    userCount: 8,
    active: true,
  },
  {
    id: 3, name: 'Travel Broker', nameAr: 'وسيط سفر',
    desc: 'Issue and manage travel insurance policies', descAr: 'إصدار وإدارة وثائق تأمين السفر',
    icon: Briefcase, color: '#C8962A', bgColor: 'rgba(200,150,42,0.12)',
    permissions: ['Dashboard', 'Policies'],
    users: ['AS', 'DF', 'RK'],
    userCount: 24,
    active: true,
  },
  {
    id: 4, name: 'Motor Broker', nameAr: 'وسيط مركبات',
    desc: 'Issue and manage motor insurance policies', descAr: 'إصدار وإدارة وثائق تأمين المركبات',
    icon: Car, color: '#6B7A9B', bgColor: 'rgba(107,122,155,0.12)',
    permissions: ['Dashboard', 'Policies'],
    users: ['KM', 'OH'],
    userCount: 18,
    active: true,
  },
  {
    id: 5, name: 'Medical Broker', nameAr: 'وسيط طبي',
    desc: 'Issue and manage medical insurance policies', descAr: 'إصدار وإدارة وثائق التأمين الطبي',
    icon: Heart, color: '#00C896', bgColor: 'rgba(0,200,150,0.12)',
    permissions: ['Dashboard', 'Policies'],
    users: ['LN', 'SQ'],
    userCount: 12,
    active: false,
  },
  {
    id: 6, name: 'Multi-Line Broker', nameAr: 'وسيط متعدد الخطوط',
    desc: 'Access to multiple lines of business', descAr: 'وصول لخطوط أعمال متعددة',
    icon: Home, color: '#7B61FF', bgColor: 'rgba(123,97,255,0.12)',
    permissions: ['Dashboard', 'Brokers', 'Policies'],
    users: ['HR', 'TA'],
    userCount: 6,
    active: true,
  },
];

export function RolesPermissions() {
  const { theme, language, isRTL, addToast } = useApp();
  const isAr = language === 'ar';
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [editRole, setEditRole] = useState<any>(null);
  const [roles, setRoles] = useState(ROLES);

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  const toggleRole = (id: number) => {
    setRoles(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
            {isAr ? 'الأدوار والصلاحيات' : 'Roles & Permissions'}
          </h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>
            {isAr ? 'إدارة أدوار المستخدمين وصلاحيات الوصول' : 'Manage user roles and access permissions'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 hover:opacity-80"
            style={{ borderColor, color: textSecondary }}
          >
            <UserPlus size={15} />
            {isAr ? 'إضافة مستخدم GIG' : 'Add GIG User'}
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:opacity-90"
            style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
            onClick={() => setCreateDrawerOpen(true)}
          >
            <Plus size={15} />
            {isAr ? 'إنشاء دور' : 'Create Role'}
          </button>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-3 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="rounded-xl p-5 relative"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
            {/* Active Toggle Top Right */}
            <button
              className="absolute top-4 right-4 w-10 h-5 rounded-full transition-all relative"
              style={{ background: role.active ? role.color : (theme === 'dark' ? '#2A3650' : '#C0CBDE') }}
              onClick={() => toggleRole(role.id)}
            >
              <span className="absolute top-0.5 transition-all rounded-full w-4 h-4 bg-white"
                style={{ left: role.active ? '22px' : '2px' }} />
            </button>

            {/* Role Icon */}
            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: role.bgColor, border: `1px solid ${role.color}30` }}>
                <role.icon size={20} style={{ color: role.color }} />
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: textPrimary }}>
                  {isAr ? role.nameAr : role.name}
                </h3>
              </div>
            </div>

            <p className="mb-4" style={{ fontSize: '12px', color: textSecondary, lineHeight: '1.6' }}>
              {isAr ? role.descAr : role.desc}
            </p>

            {/* Permission Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {role.permissions.map(perm => (
                <span key={perm}
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    background: role.bgColor,
                    color: role.color,
                    border: `1px solid ${role.color}30`
                  }}>
                  {perm}
                </span>
              ))}
            </div>

            {/* User Avatars + Count */}
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor }}>
              <div className="flex items-center">
                {role.users.slice(0, 3).map((u, i) => (
                  <div key={u}
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-white font-bold"
                    style={{
                      fontSize: '9px',
                      background: 'linear-gradient(135deg, #C8102E, #0D1F3C)',
                      borderColor: cardBg,
                      marginLeft: i > 0 ? '-8px' : '0'
                    }}>
                    {u}
                  </div>
                ))}
                {role.userCount > 3 && (
                  <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center -ml-2"
                    style={{
                      fontSize: '9px',
                      background: theme === 'dark' ? '#2A3650' : '#E4EAF3',
                      borderColor: cardBg,
                      color: textSecondary
                    }}>
                    +{role.userCount - 3}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '12px', color: textSecondary }}>
                  {role.userCount} {isAr ? 'مستخدم' : 'users'}
                </span>
                <button
                  className="p-1 rounded hover:bg-white/8 transition-all"
                  style={{ color: textSecondary }}
                  onClick={() => setEditRole(role)}
                >
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
