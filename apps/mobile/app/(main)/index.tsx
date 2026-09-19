import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Mic,
  FileText,
  Flame,
  Dna,
  Target,
  Brain,
  Zap,
  Activity,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  User,
  Settings,
} from 'lucide-react-native';

export default function MainDashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'today' | 'pillars' | 'history'>('today');

  return (
    <View className="flex-1 bg-[#0A0A0C]">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Top App Bar */}
        <View className="px-6 pt-3 pb-4 border-b border-white/5 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-[#181824] border border-white/10 items-center justify-center mr-3">
              <User size={18} color="#FF6B00" />
            </View>
            <View>
              <Text className="font-rethink text-xs text-gray-400">
                Bienvenido a NIKA
              </Text>
              <Text className="font-rethink-bold text-base text-white">
                Alexander M.
              </Text>
            </View>
          </View>

          {/* Racha (Streak) & XP */}
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center bg-[#181824] border border-orange-500/20 px-2.5 py-1.5 rounded-full">
              <Flame size={14} color="#FF6B00" fill="#FF6B00" />
              <Text className="font-rethink-bold text-xs text-orange-400 ml-1">
                1 día
              </Text>
            </View>
            <View className="flex-row items-center bg-[#181824] border border-white/10 px-2.5 py-1.5 rounded-full">
              <Award size={14} color="#FBBF24" />
              <Text className="font-rethink-bold text-xs text-yellow-400 ml-1">
                50 XP
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: Math.max(insets.bottom, 20) + 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Active Archetype Banner */}
          <View className="bg-[#14141E] border border-white/10 rounded-3xl p-5 mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 items-center justify-center mr-2.5">
                  <Target size={18} color="#FF6B00" strokeWidth={2.2} />
                </View>
                <View>
                  <Text className="font-rethink-bold text-sm text-white">
                    The Cleaner
                  </Text>
                  <Text className="font-rethink text-[10px] text-[#FF6B00] uppercase tracking-wider">
                    Mentor Activo
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push('/(onboarding)')}
                activeOpacity={0.7}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10"
              >
                <Text className="font-rethink-medium text-[10px] text-gray-300">
                  Cambiar
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="font-rethink text-xs text-gray-300 italic mb-3 leading-4">
              «La claridad precede al dominio. Ejecuta sin negociar con tus emociones.»
            </Text>

            <View className="bg-[#0A0A0E] rounded-xl p-3 border border-white/5 flex-row items-center justify-between">
              <Text className="font-rethink-medium text-xs text-gray-300 flex-1 pr-2">
                Objetivo hoy: 2 bloques de foco profundo sin interrupciones.
              </Text>
              <View className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            </View>
          </View>

          {/* Daily Mirror Check-In (Hero Action Card) */}
          <View className="bg-[#FF6B00] rounded-3xl p-5 mb-6 shadow-xl">
            <Text className="font-rethink-extrabold text-xl text-white tracking-tight mb-1">
              Espejo del Día
            </Text>
            <Text className="font-rethink text-xs text-white/90 mb-4 leading-4">
              Registra tu día en 30 segundos por voz o texto. NIKA detectará patrones ocultos de desgaste y rendimiento.
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => alert('Grabadora de voz lista para transcribir con Whisper')}
                className="flex-1 bg-[#0A0A0C] py-3 px-4 rounded-xl flex-row items-center justify-center border border-white/10"
              >
                <Mic size={16} color="#FF6B00" className="mr-2" />
                <Text className="font-rethink-bold text-xs text-white ml-2">
                  Grabar Audio
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => alert('Editor de reflexión diaria listo')}
                className="flex-1 bg-white/15 py-3 px-4 rounded-xl flex-row items-center justify-center border border-white/20"
              >
                <FileText size={16} color="#FFFFFF" className="mr-2" />
                <Text className="font-rethink-bold text-xs text-white ml-2">
                  Escribir
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section: Balance de Pilares */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-rethink-bold text-base text-white">
                Balance de Pilares
              </Text>
              <Text className="font-rethink text-xs text-gray-400">
                Hoy vs Promedio
              </Text>
            </View>

            <View className="gap-2.5">
              {[
                { name: 'Salud & Fisiología', score: 85, color: '#FF6B00', status: 'Óptimo' },
                { name: 'Rendimiento & Foco', score: 72, color: '#38BDF8', status: 'En progreso' },
                { name: 'Claridad Mental', score: 90, color: '#4ADE80', status: 'Excelente' },
              ].map((pillar) => (
                <View
                  key={pillar.name}
                  className="bg-[#12121A] border border-white/5 rounded-2xl p-4"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="font-rethink-bold text-xs text-white">
                      {pillar.name}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Text className="font-rethink text-[11px] text-gray-400">
                        {pillar.status}
                      </Text>
                      <Text className="font-rethink-bold text-xs text-white">
                        {pillar.score}%
                      </Text>
                    </View>
                  </View>

                  {/* Progress Line */}
                  <View className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${pillar.score}%`,
                        backgroundColor: pillar.color,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Pattern Insight Box */}
          <View className="bg-[#14141E] border border-white/10 rounded-2xl p-4 flex-row items-start">
            <View className="w-8 h-8 rounded-lg bg-emerald-500/15 items-center justify-center mr-3 mt-0.5">
              <TrendingUp size={16} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-rethink-bold text-xs text-emerald-400 mb-1">
                Patrón detectado
              </Text>
              <Text className="font-rethink text-xs text-gray-300 leading-4">
                Tus días con 8h de sueño correlacionan con un 34% mayor tiempo en trabajo profundo.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
