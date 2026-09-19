import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Rect,
  Circle,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

export function AuthHeaderIllustration() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" className="overflow-hidden">
      <Svg width="100%" height="100%" viewBox="0 0 390 280" fill="none" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="authNikaGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#181824" />
            <Stop offset="100%" stopColor="#0A0A0C" />
          </LinearGradient>
          <LinearGradient id="phoneScreenGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#222230" />
            <Stop offset="100%" stopColor="#14141E" />
          </LinearGradient>
          <LinearGradient id="orangeGlow" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FF6B00" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {/* Base dark fill */}
        <Rect width="100%" height="100%" fill="url(#authNikaGrad)" />

        {/* Subtle orange ambient glow in upper left and right */}
        <Circle cx="80" cy="40" r="140" fill="url(#orangeGlow)" />
        <Circle cx="320" cy="60" r="120" fill="url(#orangeGlow)" />

        {/* Dynamic curved flow lines */}
        <Path
          d="M-50 90 Q 60 -30 180 60 T 360 40 Q 420 80 450 30"
          stroke="rgba(255,107,0,0.18)"
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M-20 180 Q 90 40 240 160 T 430 120"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Floating Gears */}
        <G transform="translate(155, 60) scale(0.65)" opacity="0.25">
          <Circle cx="30" cy="30" r="20" stroke="#FF6B00" strokeWidth="4" />
          <Circle cx="30" cy="30" r="9" fill="#FF6B00" />
          <Path d="M28 2h4v8h-4zM28 50h4v8h-4zM2 28h8v4H2zM50 28h8v4h-8z" fill="#FF6B00" />
          <Path d="M9 9l6 6-3 3-6-6zM45 45l6 6-3 3-6-6zM9 51l6-6 3 3-6 6zM45 15l6-6 3 3-6 6z" fill="#FF6B00" />
        </G>

        <G transform="translate(165, 110) scale(0.8)" opacity="0.2">
          <Circle cx="30" cy="30" r="22" stroke="#FF6B00" strokeWidth="4" />
          <Circle cx="30" cy="30" r="10" fill="#FF6B00" />
          <Path d="M28 2h4v8h-4zM28 50h4v8h-4zM2 28h8v4H2zM50 28h8v4h-8z" fill="#FF6B00" />
          <Path d="M9 9l6 6-3 3-6-6zM45 45l6 6-3 3-6-6zM9 51l6-6 3 3-6 6zM45 15l6-6 3 3-6 6z" fill="#FF6B00" />
        </G>

        {/* Right Smartphone Silhouette */}
        <G transform="translate(245, 60)">
          {/* Phone Body */}
          <Rect
            x="0"
            y="0"
            width="160"
            height="230"
            rx="32"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="4"
          />
          {/* Phone Inner Screen */}
          <Rect
            x="3"
            y="3"
            width="154"
            height="224"
            rx="29"
            fill="url(#phoneScreenGrad)"
          />
          {/* Notch */}
          <Rect
            x="48"
            y="9"
            width="38"
            height="10"
            rx="5"
            fill="#0A0A0C"
          />

          {/* Mini chart card on phone screen */}
          <G transform="translate(20, 50)">
            <Rect x="0" y="0" width="70" height="22" rx="6" fill="#FF6B00" />
            <Circle cx="12" cy="11" r="5" fill="#FFFFFF" opacity="0.9" />
            <Rect x="24" y="8" width="34" height="3" rx="1.5" fill="#FFFFFF" />
            <Rect x="24" y="13" width="22" height="2.5" rx="1.25" fill="rgba(255,255,255,0.7)" />
          </G>
        </G>
      </Svg>
    </View>
  );
}
