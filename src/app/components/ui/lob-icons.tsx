import { Plane, Car, Stethoscope, Home, HardHat, Wrench, type LucideIcon } from 'lucide-react';

export const LOB_ICON_MAP: Record<string, LucideIcon> = {
  travel: Plane,
  Travel: Plane,
  motor: Car,
  Motor: Car,
  medical: Stethoscope,
  Medical: Stethoscope,
  home: Home,
  Home: Home,
  domestic: HardHat,
  Domestic: HardHat,
  assistance: Wrench,
  Assistance: Wrench,
};

export const LOB_COLOR_MAP: Record<string, string> = {
  travel: '#19058C', Travel: '#19058C',
  motor: '#8094E6',  Motor: '#8094E6',
  medical: '#6BCABA', Medical: '#6BCABA',
  home: '#D28C64', Home: '#D28C64',
  domestic: '#D28C64', Domestic: '#D28C64',
  assistance: '#8094E6', Assistance: '#8094E6',
};

export const LOB_BG_MAP: Record<string, string> = {
  travel: 'rgba(200,16,46,0.1)', Travel: 'rgba(200,16,46,0.1)',
  motor: 'rgba(200,150,42,0.1)', Motor: 'rgba(200,150,42,0.1)',
  medical: 'rgba(0,200,150,0.1)', Medical: 'rgba(0,200,150,0.1)',
  home: 'rgba(13,180,204,0.1)', Home: 'rgba(13,180,204,0.1)',
  domestic: 'rgba(123,97,255,0.1)', Domestic: 'rgba(123,97,255,0.1)',
  assistance: 'rgba(240,176,48,0.1)', Assistance: 'rgba(240,176,48,0.1)',
};

interface LOBIconProps {
  lob: string;
  size?: number;
  color?: string;
  className?: string;
}

export function LOBIcon({ lob, size = 16, color, className }: LOBIconProps) {
  const IconComponent = LOB_ICON_MAP[lob] || Plane;
  const iconColor = color || LOB_COLOR_MAP[lob] || '#19058C';
  return <IconComponent size={size} className={className} style={{ color: iconColor }} />;
}