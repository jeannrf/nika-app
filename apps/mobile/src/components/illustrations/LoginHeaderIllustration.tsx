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

export function LoginHeaderIllustration() {
  const uid = React.useId().replace(/:/g, '_');
  const bgGradId = `loginBgGrad_${uid}`;
  const glowId = `loginGlow_${uid}`;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" className="overflow-hidden">
      <Svg width="100%" height="100%" viewBox="0 0 390 844" fill="none" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id={bgGradId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#131018" />
            <Stop offset="40%" stopColor="#0E0D12" />
            <Stop offset="100%" stopColor="#0A0A0C" />
          </LinearGradient>
          <RadialGradient id={glowId} cx="78%" cy="14%" r="45%">
            <Stop offset="0%" stopColor="#FF6B00" stopOpacity="0.10" />
            <Stop offset="60%" stopColor="#FF6B00" stopOpacity="0.02" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Deep Dark Clean Background with very soft ambient warmth */}
        <Rect width="100%" height="100%" fill={`url(#${bgGradId})`} />
        <Rect width="100%" height="100%" fill={`url(#${glowId})`} />

        {/* Ambient Subtle Wave Lines */}
        <Path
          d="M -30 200 Q 110 80 270 140 T 430 80"
          stroke="rgba(255,107,0,0.14)"
          strokeWidth="1.5"
          fill="none"
        />
        <Path
          d="M -10 260 Q 140 130 290 190 T 440 130"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Top-Right Refined Decorative Floating Gear */}
        <G transform="translate(270, 75) scale(1.05)" opacity="0.36">
          <Circle cx="40" cy="40" r="28" stroke="#FF6B00" strokeWidth="4" />
          <Circle cx="40" cy="40" r="14" fill="#FF6B00" />
          <Path d="M37 2h6v12h-6zM37 66h6v12h-6zM2 37h12v6H2zM66 37h12v6H66z" fill="#FF6B00" />
          <Path d="M14 14l8 8-4 4-8-8zM58 58l8 8-4 4-8-8zM14 66l8-8 4 4-8 8zM58 22l8-8 4 4-8 8z" fill="#FF6B00" />
        </G>
      </Svg>
    </View>
  );
}
