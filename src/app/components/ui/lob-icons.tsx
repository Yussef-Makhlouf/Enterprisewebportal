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
  travel: '#C8102E', Travel: '#C8102E',
  motor: '#C8962A', Motor: '#C8962A',
  medical: '#00C896', Medical: '#00C896',
  home: '#0DB4CC', Home: '#0DB4CC',
  domestic: '#7B61FF', Domestic: '#7B61FF',
  assistance: '#F0B030', Assistance: '#F0B030',
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
  const iconColor = color || LOB_COLOR_MAP[lob] || '#C8102E';
  return <IconComponent size={size} className={className} style={{ color: iconColor }} />;
}
