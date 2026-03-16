import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell, Check, ArrowRight, AlertTriangle, FileText,
  CheckCircle, Settings2, XCircle, type LucideIcon
} from 'lucide-react';

interface Notification {
  id: number;
  Icon: LucideIcon;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  time: string;
  type: string;
  color: string;
  bg: string;
  unread: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 1, Icon: AlertTriangle,
    title: 'License Expiring Soon', titleAr: 'الرخصة تنتهي قريباً',
    desc: 'Your broker license expires in 28 days. Please renew to maintain access.',
    descAr: 'رخصتك تنتهي خلال 28 يوماً. يرجى التجديد للحفاظ على الوصول.',
    time: '2 hours ago', type: 'warning', color: '#F0B030', bg: 'rgba(240,176,48,0.12)', unread: true
  },
  {
    id: 2, Icon: FileText,
    title: 'Policy Approval Required', titleAr: 'الموافقة على الوثيقة مطلوبة',
    desc: 'Motor policy CASE-2025-4421 requires GIG review. Expected 24h.',
    descAr: 'وثيقة المركبة CASE-2025-4421 تتطلب مراجعة GIG. متوقع خلال 24 ساعة.',
    time: '4 hours ago', type: 'approval', color: '#C8102E', bg: 'rgba(200,16,46,0.12)', unread: true
  },
  {
    id: 3, Icon: CheckCircle,
    title: 'Travel Policy Issued', titleAr: 'تم إصدار وثيقة السفر',
    desc: 'Policy POL-2025-45182 has been issued and sent to the customer.',
    descAr: 'تم إصدار الوثيقة POL-2025-45182 وإرسالها للعميل.',
    time: 'Yesterday', type: 'success', color: '#00C896', bg: 'rgba(0,200,150,0.12)', unread: false
  },
  {
    id: 4, Icon: Settings2,
    title: 'System Maintenance', titleAr: 'صيانة النظام',
    desc: 'Scheduled maintenance on March 20, 2025 from 02:00-04:00 AM.',
    descAr: 'صيانة مجدولة في 20 مارس 2025 من الساعة 02:00 إلى 04:00 صباحاً.',
    time: '2 days ago', type: 'system', color: '#0DB4CC', bg: 'rgba(13,180,204,0.12)', unread: false
  },
  {
    id: 5, Icon: XCircle,
    title: 'Account Access Restricted', titleAr: 'تقييد الوصول للحساب',
    desc: 'Sub-broker Bilal Noor has been deactivated due to license expiry.',
    descAr: 'تم تعطيل الوسيط الفرعي بلال نور بسبب انتهاء الرخصة.',
    time: '3 days ago', type: 'blocked', color: '#FF4060', bg: 'rgba(255,64,96,0.12)', unread: false
  },
];

const TABS = [
  { key: 'all', label: 'All', labelAr: 'الكل', count: 5 },
  { key: 'unread', label: 'Unread', labelAr: 'غير مقروء', count: 2 },
  { key: 'licenses', label: 'Licenses', labelAr: 'الرخص', count: 1 },
  { key: 'approvals', label: 'Approvals', labelAr: 'الموافقات', count: 1 },
  { key: 'system', label: 'System', labelAr: 'النظام', count: 1 },
];

export function NotificationsPage() {
  const { theme, language, isRTL } = useApp();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));

  const filtered = notifications.filter(n => {
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'licenses') return n.type === 'warning';
    if (activeTab === 'approvals') return n.type === 'approval';
    if (activeTab === 'system') return n.type === 'system';
    return true;
  });

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>{isAr ? 'مركز الإشعارات' : 'Notification Center'}</h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>{isAr ? 'جميع إشعارات حسابك' : 'All your account notifications'}</p>
        </div>
        <button
          className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 hover:opacity-80"
          style={{ borderColor, color: textSecondary }}
          onClick={markAllRead}
        >
          <Check size={15} />{isAr ? 'تعليم الكل كمقروء' : 'Mark All Read'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {TABS.map(tab => (
          <button key={tab.key}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all"
            style={{
              background: activeTab === tab.key ? '#C8102E' : 'transparent',
              borderColor: activeTab === tab.key ? '#C8102E' : borderColor,
              color: activeTab === tab.key ? '#fff' : textSecondary,
            }}
            onClick={() => setActiveTab(tab.key)}>
            {isAr ? tab.labelAr : tab.label}
            <span className={`text-xs ${activeTab === tab.key ? 'opacity-80' : ''}`}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Bell size={32} style={{ color: textSecondary, margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>{isAr ? 'لا توجد إشعارات' : 'No Notifications'}</h3>
            <p style={{ fontSize: '13px', color: textSecondary }}>{isAr ? 'أنت على اطلاع تام!' : "You're all caught up!"}</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className="relative flex items-start gap-4 px-5 py-4 border-b last:border-0 transition-all cursor-pointer"
              style={{
                borderColor,
                background: hoveredId === n.id ? (theme === 'dark' ? 'rgba(255,255,255,0.025)' : 'rgba(13,31,60,0.025)') : 'transparent',
              }}
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Unread Dot */}
              {n.unread && (
                <div className="absolute top-4 w-2 h-2 rounded-full bg-[#C8102E]"
                  style={{ left: isRTL ? 'auto' : '10px', right: isRTL ? '10px' : 'auto' }} />
              )}

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: n.bg }}>
                <n.Icon size={18} style={{ color: n.color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: n.unread ? 700 : 500, color: textPrimary }}>
                      {isAr ? n.titleAr : n.title}
                    </p>
                    <p className="mt-1" style={{ fontSize: '13px', color: textSecondary, lineHeight: '1.5' }}>
                      {isAr ? n.descAr : n.desc}
                    </p>
                  </div>
                  <span className="font-mono shrink-0" style={{ fontSize: '11px', color: textSecondary }}>{n.time}</span>
                </div>

                {/* Hover Actions */}
                {hoveredId === n.id && (
                  <div className="flex items-center gap-3 mt-2">
                    {n.unread && (
                      <button
                        className="flex items-center gap-1 text-xs font-medium hover:underline"
                        style={{ color: '#C8102E' }}
                        onClick={() => markRead(n.id)}
                      >
                        <Check size={12} />
                        {isAr ? 'تعليم كمقروء' : 'Mark read'}
                      </button>
                    )}
                    <button className="flex items-center gap-1 text-xs font-medium hover:underline"
                      style={{ color: textSecondary }}>
                      {isAr ? 'الانتقال للصفحة ذات الصلة' : 'Go to related page'}
                      <ArrowRight size={12} className={isRTL ? 'rotate-180' : ''} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
