import { Outlet } from 'react-router';
import { useApp } from '../../context/AppContext';
import { useEffect } from 'react';
import { CommandPalette } from '../global/CommandPalette';
import { ToastSystem } from '../global/ToastSystem';

export function RootLayout() {
  const { theme, language } = useApp();

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div
      className={`min-h-screen w-full ${theme === 'dark' ? 'dark' : ''}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{
        fontFamily: language === 'ar' ? "'Tajawal', system-ui, sans-serif" : "'IBM Plex Sans', system-ui, sans-serif"
      }}
    >
      <div className="min-h-screen bg-background text-foreground">
        <Outlet />
        <CommandPalette />
        <ToastSystem />
      </div>
    </div>
  );
}
