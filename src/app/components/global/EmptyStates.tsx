import { useApp } from '../../context/AppContext';
import { Users, FileText, Bell, Search, Shield, Calendar } from 'lucide-react';

const STATES = [
  { key: 'no-brokers', emoji: '👥', icon: Users, title: 'No Brokers Yet', titleAr: 'لا يوجد وسطاء بعد', desc: 'Start by sending your first invitation to a broker or agent.', descAr: 'ابدأ بإرسال أول دعوة لوسيط أو وكيل.', cta: 'Send Invitation', ctaAr: 'إرسال دعوة', color: '#C8102E' },
  { key: 'no-policies', emoji: '📋', icon: FileText, title: 'No Policies Yet', titleAr: 'لا توجد وثائق بعد', desc: 'Issue your first insurance policy to get started.', descAr: 'أصدر وثيقة تأمينية لأول مرة للبدء.', cta: 'Issue Policy', ctaAr: 'إصدار وثيقة', color: '#C8102E' },
  { key: 'no-notifications', emoji: '🔔', icon: Bell, title: "You're All Caught Up", titleAr: 'أنت على اطلاع تام', desc: 'No new notifications at this time. Check back later.', descAr: 'لا توجد إشعارات جديدة في الوقت الحالي.', cta: 'Go to Dashboard', ctaAr: 'الذهاب للوحة التحكم', color: '#0DB4CC' },
  { key: 'no-results', emoji: '🔍', icon: Search, title: 'No Search Results', titleAr: 'لا توجد نتائج بحث', desc: 'Try different keywords or adjust your filters.', descAr: 'جرّب كلمات مختلفة أو عدّل المرشحات.', cta: 'Clear Search', ctaAr: 'مسح البحث', color: '#6B7A9B' },
  { key: 'license-required', emoji: '🔒', icon: Shield, title: 'License Required', titleAr: 'الرخصة مطلوبة', desc: 'Contact GIG to activate lines of business for your account.', descAr: 'تواصل مع GIG لتفعيل خطوط الأعمال لحسابك.', cta: 'Contact GIG', ctaAr: 'تواصل مع GIG', color: '#F0B030' },
  { key: 'no-data', emoji: '📊', icon: Calendar, title: 'No Data for Period', titleAr: 'لا توجد بيانات للفترة', desc: 'No records found for the selected date range. Try a different period.', descAr: 'لم يتم العثور على سجلات للنطاق الزمني المحدد.', cta: 'Change Date Range', ctaAr: 'تغيير النطاق الزمني', color: '#6B7A9B' },
];

interface Props { variant: string; onAction?: () => void; }

export function EmptyState({ variant, onAction }: Props) {
  const { theme, language } = useApp();
  const isAr = language === 'ar';
  const state = STATES.find(s => s.key === variant) || STATES[3];

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  return (
    <div className="flex items-center justify-center p-12 text-center">
      <div>
        <div className="text-5xl mb-4">{state.emoji}</div>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: state.color + '15', border: `1px solid ${state.color}30` }}>
          <state.icon size={28} style={{ color: state.color }} />
        </div>
        <h3 className="font-bold mb-2" style={{ fontSize: '16px', color: textPrimary }}>
          {isAr ? state.titleAr : state.title}
        </h3>
        <p className="mb-5 max-w-xs mx-auto" style={{ fontSize: '13px', color: textSecondary, lineHeight: '1.6' }}>
          {isAr ? state.descAr : state.desc}
        </p>
        <button
          className="px-6 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90 transition-all"
          style={{ background: state.color, boxShadow: `0 2px 12px ${state.color}40` }}
          onClick={onAction}
        >
          {isAr ? state.ctaAr : state.cta}
        </button>
      </div>
    </div>
  );
}
