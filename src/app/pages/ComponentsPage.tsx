import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/global/EmptyStates';
import { ConfirmationModal } from '../components/global/ConfirmationModal';
import { BrokerDetailDrawer } from '../components/admin/BrokerDetailDrawer';
import { SendInvitationModal } from '../components/admin/SendInvitationModal';
import { CheckCircle, AlertTriangle, XCircle, Info, Bell, Layers, FolderOpen, BarChart3, Plane, Car, Stethoscope, Home, HardHat, Wrench } from 'lucide-react';
import { LOB_COLOR_MAP, LOB_BG_MAP } from '../components/ui/lob-icons';

const MOCK_BROKER = { id: 1, name: 'Khalid Al-Mansouri', nameAr: 'خالد المنصوري', email: 'k.mansouri@email.com', type: 'Broker', typeAr: 'وسيط', status: 'Active', avatar: 'KM' };

export function ComponentsPage() {
  const { theme, language, addToast } = useApp();
  const isAr = language === 'ar';
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'warning' | 'destructive'>('warning');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [emptyVariant, setEmptyVariant] = useState('no-brokers');

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  const ff  = "'Almarai', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-5 rounded-full bg-[#C8102E]" />
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: textPrimary, fontFamily: ffH }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  const Btn = ({ children, onClick, variant = 'primary' }: { children: React.ReactNode; onClick?: () => void; variant?: string }) => (
    <button
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90 border"
      style={{
        background: variant === 'primary' ? '#C8102E' : 'transparent',
        borderColor: variant === 'primary' ? '#C8102E' : borderColor,
        color: variant === 'primary' ? '#fff' : textSecondary,
        boxShadow: variant === 'primary' ? '0 2px 8px rgba(200,16,46,0.3)' : 'none'
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div className="p-6 min-h-full" style={{ background: bg }}>
      <div className="mb-6">
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
          {isAr ? 'مكتبة المكونات' : 'Components Library'}
        </h1>
        <p style={{ fontSize: '13px', color: textSecondary }}>
          {isAr ? 'جميع المكونات المشتركة في البوابة' : 'All shared portal components — interactive demos'}
        </p>
      </div>

      {/* Toast Notifications */}
      <Section title={isAr ? 'إشعارات Toast (4 أنواع)' : 'Toast Notifications (4 types)'}>
        <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex flex-wrap gap-3 mb-5">
            {[
              { type: 'success' as const, icon: CheckCircle, color: '#00C896', label: isAr ? 'نجاح' : 'Success', desc: isAr ? 'تم الإصدار بنجاح' : 'Policy issued successfully' },
              { type: 'warning' as const, icon: AlertTriangle, color: '#F0B030', label: isAr ? 'تحذير' : 'Warning', desc: isAr ? 'الرخصة تنتهي قريباً' : 'License expiring soon' },
              { type: 'error' as const, icon: XCircle, color: '#FF4060', label: isAr ? 'خطأ' : 'Error', desc: isAr ? 'فشل في الإرسال' : 'Failed to send invitation' },
              { type: 'info' as const, icon: Info, color: '#0DB4CC', label: isAr ? 'معلومات' : 'Info', desc: isAr ? 'تحديث النظام' : 'System update available' },
            ].map(t => (
              <button
                key={t.type}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 hover:opacity-90 transition-all"
                style={{
                  background: t.color + '12',
                  borderColor: t.color + '40',
                }}
                onClick={() => addToast({ type: t.type, title: t.label, description: t.desc })}
              >
                <t.icon size={18} style={{ color: t.color }} />
                <div className={`w-1 h-8 rounded-full`} style={{ background: t.color }} />
                <div className={`text-left`}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{t.label}</p>
                  <p style={{ fontSize: '11px', color: textSecondary }}>{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: textSecondary }}>
            {isAr ? '→ انقر على أي زر لمعاينة Toast المقابل (يختفي تلقائياً بعد 5 ثوانٍ)' : '→ Click any button to preview the corresponding Toast (auto-dismiss after 5 seconds)'}
          </p>
        </div>
      </Section>

      {/* Confirmation Modals */}
      <Section title={isAr ? 'نوافذ التأكيد' : 'Confirmation Modals'}>
        <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex gap-3 mb-4">
            <Btn onClick={() => { setConfirmType('warning'); setConfirmOpen(true); }}>
              {isAr ? 'تحذير (أصفر)' : 'Warning Modal (Amber)'}
            </Btn>
            <Btn variant="ghost" onClick={() => { setConfirmType('destructive'); setConfirmOpen(true); }}>
              {isAr ? 'تدميري (أحمر)' : 'Destructive Modal (Red)'}
            </Btn>
          </div>
          <div className="p-4 rounded-xl" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F5F7FB' }}>
            <p style={{ fontSize: '12px', color: textSecondary }}>
              {isAr ? 'يستخدم للإجراءات التي تحتاج تأكيداً من المستخدم — مثل حذف أو حظر أو تعطيل' : 'Used for actions requiring user confirmation — delete, block, deactivate'}
            </p>
          </div>
        </div>
      </Section>

      {/* Drawers */}
      <Section title={isAr ? 'الأدراج الجانبية' : 'Side Drawers'}>
        <div className="rounded-xl p-5" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="flex gap-3 mb-4">
            <Btn onClick={() => setDrawerOpen(true)}>
              {isAr ? 'تفاصيل الوسيط' : 'Broker Detail Drawer (440px)'}
            </Btn>
            <Btn variant="ghost" onClick={() => setInviteOpen(true)}>
              {isAr ? 'إرسال دعوة' : 'Send Invitation Modal'}
            </Btn>
          </div>
          <p style={{ fontSize: '12px', color: textSecondary }}>
            {isAr ? 'الأدراج تنزلق من الجانب الأيمن (LTR) أو الأيسر (RTL) بانتقال 300ms' : 'Drawers slide from right (LTR) or left (RTL) with 300ms transition'}
          </p>
        </div>
      </Section>

      {/* Empty States */}
      <Section title={isAr ? 'الحالات الفارغة (6 أنواع)' : 'Empty States (6 variants)'}>
        <div className="mb-3 flex flex-wrap gap-2">
          {['no-brokers', 'no-policies', 'no-notifications', 'no-results', 'license-required', 'no-data'].map(v => (
            <button key={v}
              className="px-3 py-1.5 rounded-lg text-xs border font-medium transition-all"
              style={{
                background: emptyVariant === v ? '#C8102E' : 'transparent',
                borderColor: emptyVariant === v ? '#C8102E' : borderColor,
                color: emptyVariant === v ? '#fff' : textSecondary,
              }}
              onClick={() => setEmptyVariant(v)}>
              {v}
            </button>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <EmptyState variant={emptyVariant} />
        </div>
      </Section>

      {/* LOB Color Reference */}
      <Section title={isAr ? 'ألوان خطوط الأعمال' : 'LOB Color Reference'}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { lob: 'Travel', Icon: Plane },
            { lob: 'Motor', Icon: Car },
            { lob: 'Medical', Icon: Stethoscope },
            { lob: 'Home', Icon: Home },
            { lob: 'Domestic Worker', Icon: HardHat },
            { lob: 'Home Assistance', Icon: Wrench },
          ].map(l => (
            <div key={l.lob} className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: LOB_BG_MAP[l.lob.split(' ')[0]] || LOB_BG_MAP['Travel'] }}>
                <l.Icon size={22} style={{ color: LOB_COLOR_MAP[l.lob.split(' ')[0]] || '#C8102E' }} />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{l.lob}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-4 h-4 rounded" style={{ background: LOB_COLOR_MAP[l.lob.split(' ')[0]] || '#C8102E' }} />
                  <span className="font-mono" style={{ fontSize: '11px', color: LOB_COLOR_MAP[l.lob.split(' ')[0]] || '#C8102E' }}>
                    {LOB_COLOR_MAP[l.lob.split(' ')[0]] || '#C8102E'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Onboarding Tooltip Preview */}
      <Section title={isAr ? 'دليل الاستخدام الأول (Onboarding)' : 'First-Time Onboarding Tooltip'}>
        <div className="rounded-xl p-5 relative" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          <div className="inline-block relative">
            <div className="w-40 h-10 rounded-lg border-2 border-dashed flex items-center justify-center"
              style={{ borderColor: '#C8962A', background: 'rgba(200,150,42,0.1)' }}>
              <span style={{ fontSize: '12px', color: '#C8962A' }}>Target Element</span>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl p-4 shadow-2xl z-10"
              style={{ background: '#0D1F3C', border: '1px solid rgba(200,16,46,0.3)' }}>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                style={{ background: '#0D1F3C', borderTop: '1px solid rgba(200,16,46,0.3)', borderLeft: '1px solid rgba(200,16,46,0.3)' }} />
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/50" style={{ fontSize: '11px' }}>Step 1 of 3</span>
                <button className="text-white/50 hover:text-white text-xs">{isAr ? 'تخطي' : 'Skip'}</button>
              </div>
              <p className="text-white font-semibold mb-1" style={{ fontSize: '13px' }}>
                {isAr ? 'إصدار وثيقتك الأولى' : 'Issue Your First Policy'}
              </p>
              <p className="text-white/60" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                {isAr ? 'اضغط هنا للوصول إلى مركز إصدار الوثائق التأمينية' : 'Click here to access the policy issuance hub'}
              </p>
              <div className="flex justify-between mt-3">
                <button className="text-white/50 text-xs" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{isAr ? 'السابق' : 'Previous'}</button>
                <button className="px-3 py-1 rounded-lg bg-[#C8102E] text-white text-xs">{isAr ? 'التالي' : 'Next'}</button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Modals */}
      {confirmOpen && (
        <ConfirmationModal
          title={confirmType === 'warning' ? (isAr ? 'تعطيل حساب الوسيط؟' : 'Deactivate Broker Account?') : (isAr ? 'حظر المستخدم بشكل دائم؟' : 'Permanently Block User?')}
          description={isAr ? 'هذا الإجراء سيؤثر على وصول الوسيط للبوابة فوراً.' : "This action will immediately affect the broker's portal access."}
          type={confirmType}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => { setConfirmOpen(false); addToast({ type: 'success', title: isAr ? 'تم التنفيذ' : 'Action Completed' }); }}
        />
      )}
      {drawerOpen && <BrokerDetailDrawer broker={MOCK_BROKER} onClose={() => setDrawerOpen(false)} />}
      {inviteOpen && <SendInvitationModal broker={MOCK_BROKER} onClose={() => setInviteOpen(false)} onSend={() => { setInviteOpen(false); addToast({ type: 'success', title: 'Invitation Sent' }); }} />}
    </div>
  );
}