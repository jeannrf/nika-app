import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Mail, Lock, Check, ArrowLeft } from 'lucide-react-native';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { LoginHeaderIllustration } from '../../src/components/illustrations/LoginHeaderIllustration';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(onboarding)');
    }, 400);
  };

  return (
    <View className="flex-1 bg-[#0A0A0C]">
      <StatusBar style="light" />
      
      {/* Distinct Warm Orange Background Graphic for Login */}
      <LoginHeaderIllustration />

      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Top-Left Back Arrow to Welcome */}
        <View className="px-6 pt-[39px] pb-2 z-20">
          <TouchableOpacity
            onPress={() => router.push('/(auth)/welcome')}
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Top Header Section with English Phrase (3 Lines) */}
            <View className="flex-1 px-6 pt-3 pb-6 justify-center">
              <Text className="font-rethink-bold text-[27px] text-white tracking-tight leading-[35px] max-w-[310px]">
                Log in to stay on top{'\n'}of your daily tasks{'\n'}and projects.
              </Text>
            </View>

            {/* Bottom Card Sheet with Spanish UI (Spacious & Balanced) */}
            <View
              className="w-full bg-[#14141E] rounded-t-[32px] border-t border-white/10 px-6 pt-8 shadow-2xl"
              style={{ paddingBottom: Math.max(insets.bottom, 20) + 24 }}
            >
              {/* Card Title & Link */}
              <View className="items-center mb-6">
                <Text className="font-rethink-bold text-[24px] text-white mb-2">
                  Iniciar Sesión
                </Text>
                
                <View className="flex-row items-center">
                  <Text className="font-rethink text-[13px] text-gray-400">
                    ¿No tienes una cuenta?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.replace('/(auth)/register')}
                    activeOpacity={0.7}
                  >
                    <Text className="font-rethink-bold text-[13px] text-[#FF6B00]">
                      Regístrate
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form Inputs */}
              <View className="mb-2">
                <Input
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon={({ color, size }) => <Mail color={color} size={size} />}
                />

                <Input
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  isPassword
                  leftIcon={({ color, size }) => <Lock color={color} size={size} />}
                />
              </View>

              {/* Remember Me & Forgot Password Row */}
              <View className="flex-row items-center justify-between mb-6 px-0.5">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-[18px] h-[18px] rounded-[5px] border items-center justify-center mr-2.5 ${
                      rememberMe
                        ? 'bg-[#FF6B00] border-[#FF6B00]'
                        : 'border-gray-500 bg-[#1A1A26]'
                    }`}
                  >
                    {rememberMe && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                  <Text className="font-rethink text-[13px] text-gray-300">
                    Recordarme
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => alert('Recuperación de contraseña')}
                >
                  <Text className="font-rethink-medium text-[13px] text-[#FF6B00]">
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              </View>

              {error ? (
                <Text className="font-rethink text-xs text-red-400 mb-4 text-center">
                  {error}
                </Text>
              ) : null}

              {/* Main Submit Button in Spanish */}
              <View className="mb-5">
                <Button
                  title="Iniciar Sesión"
                  variant="primary"
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>

              {/* Divider in Spanish */}
              <View className="flex-row items-center mb-5">
                <View className="flex-1 h-[1px] bg-white/10" />
                <Text className="font-rethink text-[11px] text-gray-400 mx-3 uppercase tracking-wider">
                  O continúa con
                </Text>
                <View className="flex-1 h-[1px] bg-white/10" />
              </View>

              {/* Social Login: GOOGLE ONLY */}
              <View className="mb-2">
                <Button
                  title="Continuar con Google"
                  variant="google"
                  onPress={() => router.push('/(onboarding)')}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
