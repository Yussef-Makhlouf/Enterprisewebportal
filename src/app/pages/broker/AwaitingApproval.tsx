import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Timer, Clock, CheckCircle, Circle, FileText } from 'lucide-react';

export function AwaitingApproval() {
  const { theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const bg = theme === 'dark' ? '#070E1C' : '#F0F4FA';
  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.08)';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';

  const timeline = [
    { label: isAr ? 'تم إنشاء العرض' : 'Quote Created', time: '14:30', done: true },
    { label: isAr ? 'تم رفع الفيديو' : 'Video Uploaded', time: '14:34', done: true },
    { label: isAr ? 'مراجعة GIG (جارية)' : 'GIG Review (current)', time: isAr ? 'بدأت 14:35' : 'Started 14:35', done: false, current: true },
    { label: isAr ? 'إصدار الوثيقة' : 'Policy Issuance', time: isAr ? 'معلق' : 'Pending', done: false },
    { label: isAr ? 'تسليم الوثيقة' : 'Policy Delivered', time: isAr ? 'معلق' : 'Pending', done: false },
  ];

  return (
    <div className="p-5 min-h-full flex items-center justify-center" style={{ background: bg }}>
      <div className="text-center max-w-lg w-full">
        <div className="rounded-2xl p-8" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          {/* Hourglass Animation */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(240,176,48,0.12)', border: '2px solid rgba(240,176,48,0.3)' }}>
              <Timer size={36} style={{ color: '#F0B030' }} />
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{
              background: 'rgba(240,176,48,0.12)',
              border: '1px solid rgba(240,176,48,0.35)',
              animation: 'pulse 2s infinite'
            }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#F0B030' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#F0B030' }}>
              {isAr ? 'قيد المراجعة' : 'Under Review'}
            </span>
          </div>

          <div className="mb-6">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: textPrimary, marginBottom: '8px' }}>
              {isAr ? 'في انتظار موافقة GIG' : 'Awaiting GIG Approval'}
            </h2>
            <div className="font-mono font-bold mb-2" style={{ fontSize: '1.1rem', color: '#C8102E' }}>
              CASE-2025-4421
            </div>
            <p style={{ fontSize: '13px', color: textSecondary }}>
              {isAr ? 'التقديم: اليوم في 14:35' : 'Submitted: Today at 14:35'}
            </p>
          </div>

          {/* Timeline */}
          <div className="text-left mb-6 space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                {i < timeline.length - 1 && (
                  <div className="absolute left-[15px] top-7 bottom-0 w-0.5"
                    style={{ background: item.done ? '#00C896' : borderColor }} />
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 mt-0.5`}
                  style={{
                    background: item.done ? '#00C896' : item.current ? 'rgba(240,176,48,0.2)' : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F0F4FA'),
                    border: `2px solid ${item.done ? '#00C896' : item.current ? '#F0B030' : borderColor}`
                  }}>
                  {item.done ? (
                    <CheckCircle size={16} style={{ color: '#00C896' }} />
                  ) : item.current ? (
                    <Clock size={14} style={{ color: '#F0B030' }} />
                  ) : (
                    <Circle size={14} style={{ color: textSecondary, opacity: 0.4 }} />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <p style={{ fontSize: '13px', fontWeight: item.current || item.done ? 600 : 400, color: item.done ? '#00C896' : item.current ? '#F0B030' : textSecondary }}>
                      {item.label}
                    </p>
                    <span className="font-mono" style={{ fontSize: '11px', color: textSecondary }}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mb-5" style={{ fontSize: '13px', color: textSecondary }}>
            {isAr ? 'ستتلقى إشعاراً بالبريد الإلكتروني/SMS عند الموافقة' : 'You will receive an email/SMS notification when approved'}
          </p>

          <div className="space-y-2">
            <button
              className="w-full py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90"
              style={{ background: '#C8102E', boxShadow: '0 2px 10px rgba(200,16,46,0.3)' }}
              onClick={() => navigate('/broker/issuance')}
            >
              {isAr ? 'إصدار وثيقة أخرى' : 'Issue Another Policy'}
            </button>
            <button
              className="w-full py-2.5 rounded-xl text-sm border hover:opacity-80"
              style={{ borderColor, color: textSecondary }}
              onClick={() => navigate('/broker/policies')}
            >
              {isAr ? 'عرض الحالات المعلقة' : 'View All Pending Cases'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}