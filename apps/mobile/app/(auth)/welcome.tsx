import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../../src/components/ui/Button';
import { WelcomeIllustration } from '../../src/components/illustrations/WelcomeIllustration';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#0A0A0C]">
      <StatusBar style="light" />
      
      {/* Top Section (~60% height): Seamless Ambient Illustration + Floating Title */}
      <View className="flex-1 relative overflow-hidden">
        {/* Background Ambient Illustration filling the whole section */}
        <WelcomeIllustration />

        {/* Welcome Title floating in front of the background lowered down */}
        <View
          className="w-full items-center z-10"
          style={{ paddingTop: Math.max(insets.top, 20) + 52 }}
        >
          <Text className="font-poppins-bold italic text-[48px] text-white tracking-tight text-center leading-[52px]">
            Welcome to
          </Text>
          <Text className="font-rethink-extrabold text-[58px] text-[#FF6B00] tracking-wider uppercase text-center leading-[62px] -mt-2">
            NIKA
          </Text>
        </View>
      </View>

      {/* Bottom Card Sheet (~40% height) */}
      <View
        className="w-full bg-[#14141E] rounded-t-[32px] border-t border-white/10 px-7 pt-10 shadow-2xl items-center"
        style={{
          minHeight: '38%',
          paddingBottom: Math.max(insets.bottom, 20) + 16,
        }}
      >
        {/* Main Title Phrase (in English, 2 lines - larger) */}
        <Text className="font-rethink-bold text-[26px] text-white text-center leading-[33px] mb-3 max-w-[310px]">
          Let’s Get You{'\n'}Set Up for Success
        </Text>

        {/* Subtitle (in Spanish - punchy, human & philosophical) */}
        <Text className="font-rethink text-xs text-gray-400 text-center leading-relaxed mb-6 max-w-[310px]">
          El espejo de tus hábitos y tu día a día. Conócete, enfoca tu energía y alcanza tu mayor potencial.
        </Text>

        {/* Main Button */}
        <View className="w-full">
          <Button
            title="Empezar"
            variant="primary"
            onPress={() => router.push('/(auth)/login')}
          />
        </View>
      </View>
    </View>
  );
}
