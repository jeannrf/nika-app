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

export function WelcomeIllustration() {
  const uid = React.useId().replace(/:/g, '_');
  const chartGlowId = `wChartGlow_${uid}`;

  return (
    <View style={StyleSheet.absoluteFill} className="items-center justify-center overflow-hidden">
      <Svg width="100%" height="100%" viewBox="0 0 380 460" fill="none" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id={chartGlowId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FF6B00" stopOpacity="0.55" />
            <Stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {/* Ambient Top Flow Waves */}
        <Path
          d="M -30 135 Q 90 65 230 125 T 430 105"
          stroke="rgba(255,107,0,0.25)"
          strokeWidth="2.2"
          fill="none"
        />
        <Path
          d="M -20 195 Q 140 105 290 185 T 440 145"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Smooth Subtle Background Circles */}
        <Circle cx="190" cy="300" r="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <Circle cx="190" cy="300" r="85" stroke="rgba(255,107,0,0.15)" strokeWidth="1" />

        {/* Subtle Background Sparkles */}
        <Circle cx="45" cy="155" r="2.5" fill="#FF8C38" opacity="0.8" />
        <Circle cx="35" cy="365" r="2" fill="#FFFFFF" opacity="0.5" />
        <Circle cx="345" cy="375" r="2.5" fill="#FDBA74" opacity="0.8" />

        {/* Main Composition Scaled up and positioned lower */}
        <G transform="translate(10, 145) scale(0.95)">
          {/* Decorative Floating Gear */}
          <G transform="translate(245, 50) scale(0.75)" opacity="0.45">
            <Circle cx="30" cy="30" r="22" stroke="#FF6B00" strokeWidth="4" />
            <Circle cx="30" cy="30" r="10" fill="#FF6B00" />
            <Path d="M28 2h4v8h-4zM28 50h4v8h-4zM2 28h8v4H2zM50 28h8v4h-8z" fill="#FF6B00" />
            <Path d="M9 9l6 6-3 3-6-6zM45 45l6 6-3 3-6-6zM9 51l6-6 3 3-6 6zM45 15l6-6 3 3-6 6z" fill="#FF6B00" />
          </G>

          {/* Main Central Card / Interactive Dashboard - Solid Resilient Fill */}
          <Rect
            x="100"
            y="60"
            width="180"
            height="195"
            rx="24"
            fill="#161622"
            stroke="rgba(255,107,0,0.5)"
            strokeWidth="2"
          />

          {/* Floating Mini Window Top-Left of Card */}
          <G transform="translate(75, 45)">
            <Rect x="0" y="0" width="90" height="56" rx="15" fill="#FF6B00" />
            <Circle cx="26" cy="28" r="14" stroke="rgba(255,255,255,0.35)" strokeWidth="3.5" />
            <Circle cx="26" cy="28" r="14" stroke="#FFFFFF" strokeWidth="3.5" strokeDasharray="34 45" />
            <Circle cx="26" cy="28" r="5.5" fill="#FFFFFF" />
            <Rect x="48" y="20" width="30" height="4.5" rx="2.25" fill="#FFFFFF" />
            <Rect x="48" y="28" width="20" height="3.5" rx="1.75" fill="rgba(255,255,255,0.7)" />
          </G>

          {/* Top-Right Checkboxes List */}
          <G transform="translate(230, 74)">
            {/* Item 1 - Checked */}
            <Rect x="0" y="0" width="16" height="16" rx="4.5" fill="#FF6B00" />
            <Path d="M4.5 8l2.5 2.5 5-5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Item 2 - In progress */}
            <Rect x="0" y="23" width="16" height="16" rx="4.5" stroke="#FF6B00" strokeWidth="1.5" fill="#1C1824" />
            <Circle cx="8" cy="31" r="3" fill="#FF6B00" />

            {/* Item 3 - Pending */}
            <Rect x="0" y="46" width="16" height="16" rx="4.5" stroke="#4B5563" strokeWidth="1.5" fill="#14141E" />
          </G>

          {/* Circular KPI Progress */}
          <G transform="translate(118, 115)">
            <Circle cx="19" cy="19" r="18" stroke="#2D2D3D" strokeWidth="4" />
            <Circle cx="19" cy="19" r="18" stroke="#FF6B00" strokeWidth="4" strokeDasharray="65 30" strokeLinecap="round" />
            <Circle cx="19" cy="19" r="9" fill="#FF6B00" opacity="0.25" />
            <Path d="M15 19l3 3 6-6" stroke="#FF6B00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </G>

          {/* Horizontal Progress Bars */}
          <G transform="translate(162, 120)">
            <Rect x="0" y="0" width="55" height="5" rx="2.5" fill="#2D2D3D" />
            <Rect x="0" y="0" width="40" height="5" rx="2.5" fill="#FF6B00" />
            <Rect x="0" y="11" width="55" height="5" rx="2.5" fill="#2D2D3D" />
            <Rect x="0" y="11" width="26" height="5" rx="2.5" fill="#FB923C" />
          </G>

          {/* Bottom Chart Card Widget */}
          <G transform="translate(120, 165)">
            <Rect x="0" y="0" width="140" height="66" rx="14" fill="#0E0E18" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <Path
              d="M10 46 L32 34 L58 40 L85 20 L112 26 L128 10 L128 55 L10 55 Z"
              fill={`url(#${chartGlowId})`}
            />
            <Path
              d="M10 46 L32 34 L58 40 L85 20 L112 26 L128 10"
              stroke="#FF6B00"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle cx="85" cy="20" r="4" fill="#12121C" stroke="#FF6B00" strokeWidth="2" />
            <Circle cx="128" cy="10" r="4" fill="#12121C" stroke="#FF6B00" strokeWidth="2" />
          </G>

          {/* Left Character Silhouette */}
          <G transform="translate(62, 135)">
            <Circle cx="18" cy="14" r="8" fill="#F8FAFC" />
            <Path d="M9 28c0-3.5 3.5-6 9-6s9 2.5 9 6v30H9V28z" fill="#FF6B00" />
            <Path d="M25 30l14 14-3.5 3.5-13-10.5z" fill="#FB923C" />
            <Rect x="34" y="39" width="16" height="20" rx="2.5" fill="#1E1E2D" stroke="#FF6B00" strokeWidth="1.5" />
            <Rect x="38" y="44" width="9" height="2.5" fill="#FF6B00" />
            <Rect x="11" y="58" width="6" height="48" rx="3" fill="#64748B" />
            <Rect x="19" y="58" width="6" height="48" rx="3" fill="#94A3B8" />
          </G>

          {/* Right Character on Ladder */}
          <G transform="translate(285, 130)">
            <Path d="M12 55L0 110M30 55L42 110M4 72h34M7 90h28" stroke="rgba(255,255,255,0.3)" strokeWidth="2.2" strokeLinecap="round" />
            <Circle cx="21" cy="12" r="8" fill="#F8FAFC" />
            <Path d="M12 26c0-3.5 3.5-6 9-6s9 2.5 9 6v28h-18V26z" fill="#EA580C" />
            <Path d="M12 26L0 14l3.5-3.5 12 12zM30 26l12-12-3.5-3.5-12 12z" fill="#FF6B00" />
            <Rect x="14" y="54" width="6" height="30" rx="3" fill="#64748B" />
            <Rect x="22" y="54" width="6" height="30" rx="3" fill="#94A3B8" />
          </G>
        </G>
      </Svg>
    </View>
  );
}
