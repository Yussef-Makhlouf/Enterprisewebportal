import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { B } from '../../utils/darkPalette';

const PERMISSION_GROUPS = [
  {
    group: 'PORTAL MANAGEMENT', groupAr: 'إدارة البوابة',
    perms: ['Dashboard', 'Roles', 'Audit'],
    defaults: ['Dashboard']
  },
  {
    group: 'BROKER MANAGEMENT', groupAr: 'إدارة الوسطاء',
    perms: ['View', 'Edit', 'Invite'],
    defaults: ['View', 'Invite']
  },
  {
    group: 'POLICY ISSUANCE', groupAr: 'إصدار الوثائق',
    perms: ['Travel', 'Motor', 'Medical', 'Home', 'Domestic'],
    defaults: ['Travel', 'Home', 'Domestic']
  },
  {
    group: 'REPORTS', groupAr: 'التقارير',
    perms: ['Statement', 'Export'],
    defaults: ['Statement']
  },
];

const ICONS = ['🛡️', '👑', '🏢', '✈️', '🚗', '🏥', '🏠', '👷', '📊', '⚙️', '🔑', '🌐'];
const COLORS = ['#19058C', '#8094E6', '#D28C64', '#6BCABA', '#A78BF0', '#1F0F4D'];

interface Props { role?: any; onClose: () => void; onSave: () => void; }

export function CreateRoleDrawer({ role, onClose, onSave }: Props) {
  const { theme, language, isRTL } = useApp();
  const isAr = language === 'ar';
  const [nameEn, setNameEn] = useState(role?.name || '');
  const [nameAr, setNameArState] = useState(role?.nameAr || '');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [openGroups, setOpenGroups] = useState<string[]>(['PORTAL MANAGEMENT', 'POLICY ISSUANCE']);
  const [permissions, setPermissions] = useState<string[]>(PERMISSION_GROUPS.flatMap(g => g.defaults));
  const [assignedUsers, setAssignedUsers] = useState<string[]>(['AR']);
  const [userInput, setUserInput] = useState('');

  const cardBg        = theme === 'dark' ? 'linear-gradient(165deg, #0F1825 0%, #131D2E 100%)' : '#FFFFFF';
  const textPrimary   = theme === 'dark' ? '#E8F0FF'                   : '#19058C';
  const textSecondary = theme === 'dark' ? 'rgba(180,205,255,0.65)'   : '#3D3560';
  const borderColor   = theme === 'dark' ? 'rgba(128,148,230,0.16)'   : 'rgba(13,31,60,0.10)';
  const inputBg       = theme === 'dark' ? 'rgba(128,148,230,0.05)'   : '#F5F7FB';

  const togglePerm = (p: string) => setPermissions(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  const toggleGroup = (g: string) => setOpenGroups(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full z-50 flex flex-col shadow-2xl`}
        style={{ width: '460px', background: cardBg, borderLeft: isRTL ? 'none' : `1px solid ${borderColor}` }}>

        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>
            {role ? (isAr ? 'تعديل الدور' : 'Edit Role') : (isAr ? 'إنشاء دور جديد' : 'Create New Role')}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8" style={{ color: textSecondary }}><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Role Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>
                {isAr ? 'اسم الدور (EN)' : 'Role Name (EN)'}
              </label>
              <input
                value={nameEn}
                onChange={e => setNameEn(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
                style={{ background: inputBg, borderColor, color: textPrimary }}
                placeholder="e.g. Travel Broker"
              />
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>
                {isAr ? 'اسم الدور (AR)' : 'Role Name (AR)'}
              </label>
              <input
                value={nameAr}
                onChange={e => setNameArState(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
                style={{ background: inputBg, borderColor, color: textPrimary, fontFamily: "'Tajawal', sans-serif", direction: 'rtl' }}
                placeholder="مثال: وسيط سفر"
              />
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block mb-2" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>
              {isAr ? 'الأيقونة' : 'Icon'}
            </label>
            <div className="flex flex-wrap gap-2">
              {ICONS.map(icon => (
                <button key={icon} className="w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all"
                  style={{
                    fontSize: '20px',
                    borderColor: selectedIcon === icon ? selectedColor : borderColor,
                    background: selectedIcon === icon ? selectedColor + '15' : 'transparent'
                  }}
                  onClick={() => setSelectedIcon(icon)}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <label className="block mb-2" style={{ fontSize: '12px', fontWeight: 500, color: textSecondary }}>
              {isAr ? 'اللون' : 'Color'}
            </label>
            <div className="flex gap-3">
              {COLORS.map(color => (
                <button key={color}
                  className="w-8 h-8 rounded-full transition-all flex items-center justify-center"
                  style={{ background: color, boxShadow: selectedColor === color ? `0 0 0 3px ${color}50` : 'none', outline: selectedColor === color ? `2px solid ${color}` : 'none', outlineOffset: '2px' }}
                  onClick={() => setSelectedColor(color)}>
                  {selectedColor === color && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="block mb-2" style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'الصلاحيات' : 'Permissions'}
            </label>
            <div className="rounded-xl overflow-hidden border" style={{ borderColor }}>
              {PERMISSION_GROUPS.map((group, gi) => (
                <div key={group.group}>
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 hover:opacity-80 transition-all"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB',
                      borderBottom: `1px solid ${borderColor}`
                    }}
                    onClick={() => toggleGroup(group.group)}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 600, color: textPrimary, letterSpacing: '0.06em' }}>
                      {isAr ? group.groupAr : group.group}
                    </span>
                    {openGroups.includes(group.group) ? <ChevronDown size={14} style={{ color: textSecondary }} /> : <ChevronRight size={14} style={{ color: textSecondary }} />}
                  </button>
                  {openGroups.includes(group.group) && (
                    <div className="px-4 py-3 grid grid-cols-3 gap-2">
                      {group.perms.map(perm => {
                        const isChecked = permissions.includes(perm);
                        return (
                          <button key={perm}
                            className="flex items-center gap-2 p-2 rounded-lg border transition-all"
                            style={{
                              borderColor: isChecked ? selectedColor + '50' : borderColor,
                              background: isChecked ? selectedColor + '10' : 'transparent',
                            }}
                            onClick={() => togglePerm(perm)}
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0`}
                              style={{ borderColor: isChecked ? selectedColor : (theme === 'dark' ? '#4A5878' : '#C0CBDE'), background: isChecked ? selectedColor : 'transparent' }}>
                              {isChecked && <Check size={10} className="text-white" />}
                            </div>
                            <span style={{ fontSize: '12px', color: textPrimary }}>{perm}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Assign Users */}
          <div>
            <label className="block mb-2" style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>
              {isAr ? 'تعيين مستخدمين' : 'Assign Users'}
            </label>
            <div className="relative mb-2">
              <input
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
                style={{ background: inputBg, borderColor, color: textPrimary }}
                placeholder={isAr ? 'بحث وإضافة مستخدمين...' : 'Search and add users...'}
                onKeyDown={e => {
                  if (e.key === 'Enter' && userInput) {
                    setAssignedUsers(prev => [...prev, userInput.slice(0, 2).toUpperCase()]);
                    setUserInput('');
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {assignedUsers.map((u, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                  style={{ borderColor, background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                    style={{ background: `linear-gradient(135deg, ${B.indigo}, ${B.ocean})`, fontSize: '9px', fontWeight: 700 }}>{u}</div>
                  <span style={{ fontSize: '12px', color: textPrimary }}>{u}</span>
                  <button onClick={() => setAssignedUsers(prev => prev.filter((_, idx) => idx !== i))}
                    style={{ color: textSecondary }}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t flex gap-3 shrink-0" style={{ borderColor }}>
          <button className="flex-1 py-2.5 rounded-xl border font-medium text-sm" style={{ borderColor, color: textSecondary }} onClick={onClose}>
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90"
            style={{ background: selectedColor, boxShadow: `0 2px 10px ${selectedColor}50` }}
            onClick={onSave}
          >
            {isAr ? 'حفظ الدور' : 'Save Role'}
          </button>
        </div>
      </div>
    </>
  );
}