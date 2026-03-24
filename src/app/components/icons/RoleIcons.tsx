/** Custom SVG role icons — detailed, two-tone, stroke-based */
interface IconProps { color: string; size?: number; }

export function IconSuperAdmin({ color, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3.5 6V12C3.5 16.5 7.2 20.7 12 22C16.8 20.7 20.5 16.5 20.5 12V6L12 2Z"
        fill={`${color}22`} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 2L3.5 6V12C3.5 16.5 7.2 20.7 12 22C16.8 20.7 20.5 16.5 20.5 12V6L12 2Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12L11 14L15.5 9.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" fill={`${color}33`} />
      <path d="M12 7V9M12 15V17" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function IconAdminUser({ color, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="7" r="3.5" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      <path d="M2 20C2 17.2386 5.13401 15 9 15C9.68 15 10.34 15.08 10.96 15.23"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="17" r="4" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      <path d="M17 15.5V17L18.2 18.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 17H14M19.5 17H20M17 14.5V14M17 20V20.5M15.4 15.4L15L15" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function IconTravelBroker({ color, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 14.5L14.5 12L13 4.5C12.8 3.7 12 3.3 11.3 3.6L10.5 4C9.9 4.3 9.7 5 10 5.6L12.5 10L8 9L6.5 7C6.2 6.6 5.6 6.5 5.2 6.8L4.7 7.2C4.2 7.6 4.2 8.3 4.6 8.7L7 11L7 13L4.6 15.3C4.2 15.7 4.2 16.4 4.7 16.8L5.2 17.2C5.6 17.5 6.2 17.4 6.5 17L8 15L12.5 14L10 18.4C9.7 19 9.9 19.7 10.5 20L11.3 20.4C12 20.7 12.8 20.3 13 19.5L14.5 12L21 9.5C21.8 9.2 22 8.2 21.5 7.6C21 7 20 7.1 19.5 7.7L16 12L14.5 12"
        fill={`${color}18`} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="19" r="2" fill={`${color}30`} stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

export function IconMotorBroker({ color, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13L7 7H17L19 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="13" width="18" height="5" rx="2" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      <circle cx="7.5" cy="18.5" r="2" fill={`${color}30`} stroke={color} strokeWidth="1.5" />
      <circle cx="16.5" cy="18.5" r="2" fill={`${color}30`} stroke={color} strokeWidth="1.5" />
      <path d="M9 10H15" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M3 15H21" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M10 7L9 10M14 7L15 10" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function IconMedicalBroker({ color, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C12 21 4 16.5 4 10.5C4 7.46 6.46 5 9.5 5C10.76 5 11.92 5.44 12.83 6.18"
        fill={`${color}15`} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 21C12 21 20 16.5 20 10.5C20 7.46 17.54 5 14.5 5C13.24 5 12.08 5.44 11.17 6.18"
        fill={`${color}15`} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="9.5" y="8.5" width="5" height="5" rx="1" fill={`${color}25`} stroke={color} strokeWidth="1.3" />
      <path d="M12 9.5V12.5M10.5 11H13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMultiLine({ color, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill={`${color}22`} stroke={color} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill={`${color}16`} stroke={color} strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill={`${color}16`} stroke={color} strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill={`${color}22`} stroke={color} strokeWidth="1.5" />
      <path d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <circle cx="12" cy="12" r="2" fill={`${color}30`} stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

/* ── Button-level icons ─────────────────────────────── */
export function IconUserPlus({ color, size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="7" r="4" stroke={color} strokeWidth="1.8" fill={`${color}20`} />
      <path d="M2 21C2 17.686 5.582 15 10 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 15V21M16 18H22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlus({ color, size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconMore({ color, size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="12" r="1.5" fill={color} />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <circle cx="19" cy="12" r="1.5" fill={color} />
    </svg>
  );
}
