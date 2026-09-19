import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Rect,
  Circle,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';

export function RegisterHeaderIllustration() {
  const uid = React.useId().replace(/:/g, '_');
  const bgGradId = `regBgGrad_${uid}`;
  const auraId = `regAura_${uid}`;
  const badgeGradId = `regBadgeGrad_${uid}`;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" className="overflow-hidden">
      <Svg width="100%" height="100%" viewBox="0 0 390 844" fill="none" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id={bgGradId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#131018" />
            <Stop offset="40%" stopColor="#0E0D12" />
            <Stop offset="100%" stopColor="#0A0A0C" />
          </LinearGradient>
          <RadialGradient id={auraId} cx="78%" cy="14%" r="45%">
            <Stop offset="0%" stopColor="#FF6B00" stopOpacity="0.10" />
            <Stop offset="60%" stopColor="#FF6B00" stopOpacity="0.02" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Deep Dark Clean Background with very soft ambient warmth */}
        <Rect width="100%" height="100%" fill={`url(#${bgGradId})`} />
        <Rect width="100%" height="100%" fill={`url(#${auraId})`} />

        {/* Ambient Elegant Wave Curves */}
        <Path
          d="M -30 180 Q 120 60 280 120 T 440 60"
          stroke="rgba(255,107,0,0.18)"
          strokeWidth="1.8"
          fill="none"
        />
        <Path
          d="M -10 240 Q 150 110 300 170 T 450 110"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1.2"
          fill="none"
        />
      </Svg>
    </View>
  );
}
