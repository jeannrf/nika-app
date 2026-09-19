import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'google' | 'secondary' | 'dark';
  loading?: boolean;
}

export function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 10 }}>
      <Path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
      />
      <Path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
      />
      <Path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
      />
      <Path
        fill="#34A853"
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
      />
    </Svg>
  );
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isGoogle = variant === 'google';
  const isSecondary = variant === 'secondary';

  const containerClasses = isPrimary
    ? 'bg-[#FF6B00] active:bg-[#EA580C] py-4 px-6 rounded-2xl items-center justify-center flex-row shadow-lg shadow-orange-600/30'
    : isGoogle
    ? 'bg-[#181824] active:bg-[#222232] border border-white/10 py-3.5 px-6 rounded-2xl items-center justify-center flex-row'
    : isSecondary
    ? 'bg-transparent border border-white/20 active:bg-white/5 py-3.5 px-6 rounded-2xl items-center justify-center flex-row'
    : 'bg-[#14141C] border border-white/10 py-3.5 px-6 rounded-2xl items-center justify-center flex-row';

  const textClasses = isPrimary
    ? 'font-rethink-bold text-white text-[15px] tracking-wide'
    : isGoogle
    ? 'font-rethink-semibold text-white text-[15px]'
    : isSecondary
    ? 'font-rethink-semibold text-gray-300 text-[15px]'
    : 'font-rethink-medium text-white text-sm';

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      disabled={disabled || loading}
      className={`${containerClasses} ${disabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" size="small" />
      ) : (
        <>
          {isGoogle && <GoogleIcon />}
          <Text className={textClasses}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
