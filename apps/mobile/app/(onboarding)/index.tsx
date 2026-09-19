import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  Check,
  Plus,
  X,
  Activity,
  Target,
  Brain,
  Zap,
  Flame,
  Dna,
  Shield,
  Compass,
  Heart,
  Briefcase,
  BookOpen,
  Sparkles,
} from 'lucide-react-native';
import { Button } from '../../src/components/ui/Button';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// 4 Archetypes data matching NIKA business & technical models
export interface ArchetypeInfo {
  id: 'bio_optimizer' | 'the_cleaner' | 'high_perf_psych' | 'novelty_engine';
  name: string;
  shortName: string;
  subtitle: string;
  tagline: string;
  icon: any;
  traits: string[];
  sampleFeedback: string;
  suggestedPillars: string[];
}

const ARCHETYPES: ArchetypeInfo[] = [
  {
    id: 'the_cleaner',
    name: 'The Cleaner',
    shortName: 'The Cleaner',
    subtitle: 'Disciplina & Ejecución',
    tagline: 'La claridad precede al dominio. Ejecuta sin fricción.',
    icon: Target,
    traits: ['Cero excusas', 'Bloques de foco', 'Ejecución radical'],
    sampleFeedback: '«Identifica tu prioridad #1 hoy y ejecútala sin negociar con tus emociones.»',
    suggestedPillars: ['Rendimiento & Foco', 'Finanzas & Proyectos', 'Salud & Fisiología'],
  },
  {
    id: 'bio_optimizer',
    name: 'Bio-Optimizer',
    shortName: 'Bio-Optimizer',
    subtitle: 'Fisiología & Recuperación',
    tagline: 'Optimiza tu biología antes de exigirle a tu mente.',
    icon: Dna,
    traits: ['Sueño & HRV', 'Energía celular', 'Cero sobreentreno'],
    sampleFeedback: '«Prioriza 8h de descanso hoy: tu recuperación biológica manda sobre tu volumen.»',
    suggestedPillars: ['Salud & Fisiología', 'Rendimiento & Foco', 'Claridad Mental'],
  },
  {
    id: 'high_perf_psych',
    name: 'Psicólogo de Alto Rendimiento',
    shortName: 'Psicólogo',
    subtitle: 'Claridad Mental & Anti-Burnout',
    tagline: 'Entiende tus patrones inconscientes antes de acelerar.',
    icon: Brain,
    traits: ['Anti-burnout', 'Gestión de estrés', 'Autoconocimiento'],
    sampleFeedback: '«Autoexigirte sin autoconocimiento sabotea tu progreso: ajusta tus expectativas hoy.»',
    suggestedPillars: ['Claridad Mental', 'Vínculos & Familia', 'Rendimiento & Foco'],
  },
  {
    id: 'novelty_engine',
    name: 'Novelty Engine',
    shortName: 'Novelty Engine',
    subtitle: 'Agilidad & Creatividad',
    tagline: 'Canaliza tu caos creativo en sistemas de alto impacto.',
    icon: Zap,
    traits: ['Velocidad creativa', 'Iteración rápida', 'Estructura ágil'],
    sampleFeedback: '«Elige una sola idea de tu ráfaga y ejecútala en las próximas 24 horas.»',
    suggestedPillars: ['Finanzas & Proyectos', 'Aprendizaje & Maestría', 'Rendimiento & Foco'],
  },
];

const MAIN_LIFE_PILLARS = [
  { id: 'salud', name: 'Salud & Fisiología', desc: 'Sueño, recuperación, nutrición y actividad física', icon: Activity },
  { id: 'rendimiento', name: 'Rendimiento & Foco', desc: 'Disciplina diaria, trabajo profundo y objetivos clave', icon: Target },
  { id: 'claridad', name: 'Claridad Mental', desc: 'Gestión de estrés, introspección y balance cognitivo', icon: Brain },
  { id: 'finanzas', name: 'Finanzas & Proyectos', desc: 'Emprendimiento, inversiones y metas profesionales', icon: Briefcase },
];

const ADDITIONAL_LIFE_PILLARS = [
  { id: 'vinculos', name: 'Vínculos & Familia' },
  { id: 'aprendizaje', name: 'Aprendizaje & Maestría' },
  { id: 'espiritualidad', name: 'Espiritualidad & Calma' },
  { id: 'creatividad', name: 'Creatividad & Ocio' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // User Selections
  const [challenge, setChallenge] = useState<string>('discipline');
  const [feedbackStyle, setFeedbackStyle] = useState<string>('direct');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('the_cleaner');
  const [selectedPillars, setSelectedPillars] = useState<string[]>([
    'Salud & Fisiología',
    'Rendimiento & Foco',
    'Finanzas & Proyectos',
  ]);

  const [customPillars, setCustomPillars] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState<string>('');
  const [isAddingCustom, setIsAddingCustom] = useState<boolean>(false);

  // Determine smart recommended archetype based on Step 1 and Step 2
  const recommendedArchetypeId = useMemo(() => {
    if (challenge === 'energy' || feedbackStyle === 'data') return 'bio_optimizer';
    if (challenge === 'burnout' || feedbackStyle === 'reflective') return 'high_perf_psych';
    if (challenge === 'creative' || feedbackStyle === 'dynamic') return 'novelty_engine';
    return 'the_cleaner';
  }, [challenge, feedbackStyle]);

  // When step 3 opens, pre-select recommended archetype if not manually changed
  const handleProceedFromStep2 = () => {
    setSelectedArchetype(recommendedArchetypeId);
    setStep(3);
  };

  const togglePillar = (pillarName: string) => {
    if (selectedPillars.includes(pillarName)) {
      if (selectedPillars.length > 1) {
        setSelectedPillars(selectedPillars.filter((p) => p !== pillarName));
      }
    } else {
      if (selectedPillars.length < 7) {
        setSelectedPillars([...selectedPillars, pillarName]);
      }
    }
  };

  const handleAddCustomPillar = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;

    // Capitalize first letter of each word for clean presentation
    const formattedName = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

    const allStandardNames = [
      ...MAIN_LIFE_PILLARS.map((p) => p.name.toLowerCase()),
      ...ADDITIONAL_LIFE_PILLARS.map((p) => p.name.toLowerCase()),
    ];

    const alreadyCustom = customPillars.some((p) => p.toLowerCase() === formattedName.toLowerCase());

    if (!allStandardNames.includes(formattedName.toLowerCase()) && !alreadyCustom) {
      setCustomPillars((prev) => [...prev, formattedName]);
      if (selectedPillars.length < 7 && !selectedPillars.includes(formattedName)) {
        setSelectedPillars((prev) => [...prev, formattedName]);
      }
    } else {
      // Find standard or existing name casing
      const foundMatch = [...MAIN_LIFE_PILLARS, ...ADDITIONAL_LIFE_PILLARS].find(
        (p) => p.name.toLowerCase() === formattedName.toLowerCase()
      );
      const targetName = foundMatch ? foundMatch.name : formattedName;
      if (!selectedPillars.includes(targetName) && selectedPillars.length < 7) {
        setSelectedPillars((prev) => [...prev, targetName]);
      }
    }

    setCustomInput('');
    setIsAddingCustom(false);
  };

  const handleRemoveCustomPillar = (pillarName: string) => {
    setCustomPillars((prev) => prev.filter((p) => p !== pillarName));
    setSelectedPillars((prev) => prev.filter((p) => p !== pillarName));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      handleProceedFromStep2();
    } else if (step === 3) {
      // Sync archetype's suggested pillars if user hasn't customized
      const currentArch = ARCHETYPES.find((a) => a.id === selectedArchetype);
      if (currentArch) {
        setSelectedPillars(currentArch.suggestedPillars);
      }
      setStep(4);
    } else if (step === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.replace('/(main)');
      }, 700);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-1 bg-[#0A0A0C]">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Top Header & Progress Bar */}
        <View className="px-6 pt-9 pb-4 border-b border-white/5">
          <View className="flex-row items-center justify-between mb-3.5">
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={0.7}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ArrowLeft size={18} color="#FFFFFF" strokeWidth={2.2} />
            </TouchableOpacity>

            <View className="items-center">
              <Text className="font-rethink-bold text-[13px] uppercase tracking-widest text-gray-300">
                Configuración Inicial
              </Text>
              <Text className="font-rethink text-xs text-[#FF6B00] mt-0.5">
                Paso {step} de 4
              </Text>
            </View>

            <View className="w-10 items-end">
              <Text className="font-rethink-bold text-xs text-gray-500">
                {Math.round((step / 4) * 100)}%
              </Text>
            </View>
          </View>

          {/* Segmented Progress Bar */}
          <View className="flex-row gap-1.5 h-1.5 w-full">
            {[1, 2, 3, 4].map((s) => (
              <View
                key={s}
                className={`flex-1 rounded-full ${
                  s <= step ? 'bg-[#FF6B00]' : 'bg-white/10'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: Math.max(insets.bottom, 20) + 90,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* ================= STEP 1: DESAFÍO PRINCIPAL ================= */}
          {step === 1 && (
            <View>
              <Text className="font-rethink-extrabold text-[26px] text-white tracking-tight leading-8 mb-2">
                ¿Cuál es tu mayor{'\n'}desafío actual?
              </Text>
              <Text className="font-rethink text-sm text-gray-400 mb-6 leading-5">
                NIKA adapta tu lectura diaria según el obstáculo que más frena tu rendimiento hoy.
              </Text>

              <View className="gap-3.5">
                {[
                  {
                    id: 'discipline',
                    title: 'Disciplina y Ejecución Diaria',
                    desc: 'Me cuesta sostener el ritmo constante y erradicar la postergación.',
                    icon: Target,
                  },
                  {
                    id: 'energy',
                    title: 'Energía Física y Recuperación',
                    desc: 'Siento fatiga acumulada, sobreentrenamiento o mala calidad de sueño.',
                    icon: Activity,
                  },
                  {
                    id: 'burnout',
                    title: 'Claridad Mental y Anti-Burnout',
                    desc: 'Tengo sobrecarga de autoexigencia, estrés constante y saturación mental.',
                    icon: Brain,
                  },
                  {
                    id: 'creative',
                    title: 'Estructurar Ideas y Agilidad',
                    desc: 'Múltiples proyectos y pensamientos sin un sistema claro de prioridades.',
                    icon: Zap,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = challenge === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.8}
                      onPress={() => setChallenge(item.id)}
                      className={`p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-[#181824] border-[#FF6B00]'
                          : 'bg-[#12121A] border-white/5'
                      }`}
                    >
                      <View className="flex-row items-start">
                        <View
                          className={`w-10 h-10 rounded-xl items-center justify-center mr-3.5 ${
                            isSelected ? 'bg-[#FF6B00]/15' : 'bg-white/5'
                          }`}
                        >
                          <Icon
                            size={20}
                            color={isSelected ? '#FF6B00' : '#9CA3AF'}
                            strokeWidth={2}
                          />
                        </View>
                        <View className="flex-1 pr-2">
                          <Text
                            className={`font-rethink-bold text-base mb-1 ${
                              isSelected ? 'text-white' : 'text-gray-200'
                            }`}
                          >
                            {item.title}
                          </Text>
                          <Text className="font-rethink text-xs text-gray-400 leading-4">
                            {item.desc}
                          </Text>
                        </View>
                        <View
                          className={`w-5 h-5 rounded-full border items-center justify-center mt-0.5 ${
                            isSelected
                              ? 'bg-[#FF6B00] border-[#FF6B00]'
                              : 'border-gray-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* ================= STEP 2: ESTILO DE FEEDBACK ================= */}
          {step === 2 && (
            <View>
              <Text className="font-rethink-extrabold text-[26px] text-white tracking-tight leading-8 mb-2">
                ¿Qué estilo de feedback{'\n'}prefieres recibir?
              </Text>
              <Text className="font-rethink text-sm text-gray-400 mb-6 leading-5">
                Define cómo tu mentor interpretará tus hábitos y te hablará en el espejo diario.
              </Text>

              <View className="gap-3.5">
                {[
                  {
                    id: 'direct',
                    title: 'Directo y Riguroso',
                    desc: 'Exigencia clara, foco en cumplimiento y cero excusas ante el autoengaño.',
                    badge: 'The Cleaner',
                  },
                  {
                    id: 'data',
                    title: 'Basado en Datos y Fisiología',
                    desc: 'Métricas de sueño, carga física, HRV y optimización biológica.',
                    badge: 'Bio-Optimizer',
                  },
                  {
                    id: 'reflective',
                    title: 'Reflexivo y Psicológico',
                    desc: 'Desarticula patrones inconscientes, gestión emocional y foco sin estrés.',
                    badge: 'Psicólogo de Alto Rendimiento',
                  },
                  {
                    id: 'dynamic',
                    title: 'Dinámico y Estratégico',
                    desc: 'Adaptabilidad rápida, retos creativos y pivotes de alto impacto.',
                    badge: 'Novelty Engine',
                  },
                ].map((item) => {
                  const isSelected = feedbackStyle === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.8}
                      onPress={() => setFeedbackStyle(item.id)}
                      className={`p-4 rounded-2xl border ${
                        isSelected
                          ? 'bg-[#181824] border-[#FF6B00]'
                          : 'bg-[#12121A] border-white/5'
                      }`}
                    >
                      <View className="flex-row items-center justify-between mb-1.5">
                        <Text
                          className={`font-rethink-bold text-base ${
                            isSelected ? 'text-white' : 'text-gray-200'
                          }`}
                        >
                          {item.title}
                        </Text>
                        <View
                          className={`w-5 h-5 rounded-full border items-center justify-center ${
                            isSelected
                              ? 'bg-[#FF6B00] border-[#FF6B00]'
                              : 'border-gray-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                        </View>
                      </View>
                      <Text className="font-rethink text-xs text-gray-400 leading-4">
                        {item.desc}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* ================= STEP 3: SELECCIÓN DE ARQUETIPO ================= */}
          {step === 3 && (
            <View>
              <Text className="font-rethink-extrabold text-[26px] text-white tracking-tight leading-8 mb-1.5">
                Elige tu Mentor NIKA
              </Text>
              <Text className="font-rethink text-sm text-gray-400 mb-4 leading-5">
                Tu acompañante diario para detectar patrones y maximizar tu enfoque.
              </Text>

              {/* 4 Archetype Cards */}
              <View className="gap-3">
                {ARCHETYPES.map((arch) => {
                  const isSelected = selectedArchetype === arch.id;
                  const isRecommended = recommendedArchetypeId === arch.id;
                  const ArchIcon = arch.icon;
                  return (
                    <TouchableOpacity
                      key={arch.id}
                      activeOpacity={0.85}
                      onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setSelectedArchetype(arch.id);
                      }}
                      className={`px-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'py-4 bg-[#181824] border-[#FF6B00]'
                          : 'py-3 bg-[#12121A] border-white/5'
                      }`}
                    >
                      {/* Top Header Row */}
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1 pr-2">
                          <View
                            className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${
                              isSelected ? 'bg-[#FF6B00]/15' : 'bg-white/5'
                            }`}
                          >
                            <ArchIcon
                              size={20}
                              color={isSelected ? '#FF6B00' : '#9CA3AF'}
                              strokeWidth={2.2}
                            />
                          </View>
                          <View className="flex-1">
                            <Text
                              className={`font-rethink-bold text-base ${
                                isSelected ? 'text-white' : 'text-gray-200'
                              }`}
                            >
                              {arch.name}
                            </Text>
                            <Text
                              className={`font-rethink text-xs mt-0.5 ${
                                isSelected ? 'text-[#FF6B00]' : 'text-gray-400'
                              }`}
                            >
                              {arch.subtitle}
                            </Text>
                          </View>
                        </View>

                        {/* Radio / Check Circle */}
                        <View
                          className={`w-5 h-5 rounded-full border items-center justify-center ${
                            isSelected
                              ? 'bg-[#FF6B00] border-[#FF6B00]'
                              : 'border-gray-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                        </View>
                      </View>

                      {/* Tagline */}
                      <Text
                        className={`font-rethink text-xs leading-4.5 mt-2 ${
                          isSelected ? 'text-gray-200' : 'text-gray-400'
                        }`}
                      >
                        «{arch.tagline}»
                      </Text>

                      {/* Expanded Voice Preview when selected */}
                      {isSelected && (
                        <View className="mt-3 pt-3 border-t border-white/10">
                          <View className="bg-[#0A0A0F] rounded-xl p-3.5 border border-white/5">
                            <Text className="font-rethink-bold text-[10px] text-[#FF6B00] uppercase tracking-wider mb-1">
                              Ejemplo de feedback diario
                            </Text>
                            <Text className="font-rethink text-xs text-gray-300 leading-4.5">
                              {arch.sampleFeedback}
                            </Text>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* ================= STEP 4: PILARES DE VIDA ================= */}
          {step === 4 && (
            <View>
              <Text className="font-rethink-extrabold text-[24px] text-white tracking-tight leading-7 mb-1.5">
                Tus Pilares de Vida
              </Text>
              <Text className="font-rethink text-xs text-gray-400 mb-4 leading-4.5">
                NIKA evaluará diariamente el equilibrio de estas áreas. Elige entre 3 y 7 dimensiones:
              </Text>

              <View className="flex-row items-center justify-between mb-3 px-1">
                <Text className="font-rethink-bold text-[11px] uppercase tracking-wider text-gray-400">
                  Pilares seleccionados
                </Text>
                <View className="flex-row items-center gap-1.5">
                  <Text
                    className={`font-rethink-bold text-xs ${
                      selectedPillars.length === 7 ? 'text-[#FF6B00]' : 'text-gray-300'
                    }`}
                  >
                    {selectedPillars.length} de 7
                  </Text>
                  {selectedPillars.length === 7 && (
                    <View className="bg-[#FF6B00]/15 px-1.5 py-0.5 rounded-md border border-[#FF6B00]/30">
                      <Text className="font-rethink-bold text-[9px] text-[#FF6B00] uppercase">
                        Máx.
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* 4 Opciones Principales */}
              <View className="gap-2.5">
                {MAIN_LIFE_PILLARS.map((pillar) => {
                  const isSelected = selectedPillars.includes(pillar.name);
                  const PillarIcon = pillar.icon;
                  return (
                    <TouchableOpacity
                      key={pillar.id}
                      activeOpacity={0.8}
                      onPress={() => togglePillar(pillar.name)}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-[#181824] border-[#FF6B00]'
                          : 'bg-[#12121A] border-white/5'
                      }`}
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1 pr-3">
                          <View
                            className={`w-9 h-9 rounded-xl items-center justify-center mr-3 ${
                              isSelected ? 'bg-[#FF6B00]/15' : 'bg-white/5'
                            }`}
                          >
                            <PillarIcon
                              size={18}
                              color={isSelected ? '#FF6B00' : '#9CA3AF'}
                              strokeWidth={2}
                            />
                          </View>
                          <View className="flex-1">
                            <Text
                              className={`font-rethink-bold text-[14px] leading-5 mb-0.5 ${
                                isSelected ? 'text-white' : 'text-gray-300'
                              }`}
                            >
                              {pillar.name}
                            </Text>
                            <Text className="font-rethink text-[11px] text-gray-400 leading-4" numberOfLines={1}>
                              {pillar.desc}
                            </Text>
                          </View>
                        </View>

                        <View
                          className={`w-5 h-5 rounded-full border items-center justify-center ${
                            isSelected
                              ? 'bg-[#FF6B00] border-[#FF6B00]'
                              : 'border-gray-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Otras Dimensiones & Personalizados */}
              <View className="mt-4">
                <Text className="font-rethink-bold text-[11px] uppercase tracking-wider text-gray-400 mb-2 px-1">
                  Otras dimensiones
                </Text>
                <View className="flex-row flex-wrap items-center gap-2">
                  {ADDITIONAL_LIFE_PILLARS.map((pillar) => {
                    const isSelected = selectedPillars.includes(pillar.name);
                    return (
                      <TouchableOpacity
                        key={pillar.id}
                        activeOpacity={0.7}
                        onPress={() => togglePillar(pillar.name)}
                        className={`px-3.5 py-2 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#FF6B00]/15 border-[#FF6B00]'
                            : 'bg-[#12121A] border-white/10'
                        }`}
                      >
                        <Text
                          className={`font-rethink-medium text-xs ${
                            isSelected ? 'text-[#FF6B00] font-rethink-bold' : 'text-gray-300'
                          }`}
                        >
                          {pillar.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}

                  {/* Pilares personalizados agregados por el usuario */}
                  {customPillars.map((pillarName) => {
                    const isSelected = selectedPillars.includes(pillarName);
                    return (
                      <View
                        key={pillarName}
                        className={`flex-row items-center pl-3.5 pr-2 py-1.5 rounded-xl border ${
                          isSelected
                            ? 'bg-[#FF6B00]/15 border-[#FF6B00]'
                            : 'bg-[#12121A] border-white/10'
                        }`}
                      >
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => togglePillar(pillarName)}
                        >
                          <Text
                            className={`font-rethink-medium text-xs mr-1.5 ${
                              isSelected ? 'text-[#FF6B00] font-rethink-bold' : 'text-gray-300'
                            }`}
                          >
                            {pillarName}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleRemoveCustomPillar(pillarName)}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          className="p-1 rounded-full bg-white/5"
                        >
                          <X size={11} color={isSelected ? '#FF6B00' : '#9CA3AF'} strokeWidth={2.5} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                  {/* Botón para abrir input inline */}
                  {!isAddingCustom && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        if (Platform.OS === 'ios' || Platform.OS === 'android') {
                          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        }
                        setIsAddingCustom(true);
                      }}
                      className="flex-row items-center px-3 py-2 rounded-xl border border-dashed border-white/20 bg-white/[0.02]"
                    >
                      <Plus size={13} color="#9CA3AF" />
                      <Text className="font-rethink-medium text-xs text-gray-400 ml-1">
                        Escribir otro
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Input inline para escribir pilar personalizado */}
                {isAddingCustom && (
                  <View className="mt-3 flex-row items-center gap-2">
                    <TextInput
                      value={customInput}
                      onChangeText={setCustomInput}
                      placeholder="Ej. Espiritualidad, Lectura, Finanzas..."
                      placeholderTextColor="#6B7280"
                      maxLength={32}
                      autoFocus
                      returnKeyType="done"
                      onSubmitEditing={handleAddCustomPillar}
                      className="flex-1 bg-[#12121A] border border-[#FF6B00]/60 rounded-xl px-3.5 py-2 text-white font-rethink text-xs"
                    />
                    <TouchableOpacity
                      onPress={handleAddCustomPillar}
                      disabled={!customInput.trim()}
                      className={`px-3.5 py-2 rounded-xl items-center justify-center ${
                        customInput.trim() ? 'bg-[#FF6B00]' : 'bg-gray-800 opacity-50'
                      }`}
                    >
                      <Text className="font-rethink-bold text-xs text-white">Añadir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (Platform.OS === 'ios' || Platform.OS === 'android') {
                          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        }
                        setIsAddingCustom(false);
                        setCustomInput('');
                      }}
                      className="p-2"
                    >
                      <X size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Floating Action Bar */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-[#0A0A0C]/95 border-t border-white/10 px-6 pt-4"
          style={{ paddingBottom: Math.max(insets.bottom, 20) + 8 }}
        >
          <Button
            title={step === 4 ? 'Finalizar y Entrar al Espejo' : 'Continuar'}
            variant="primary"
            disabled={step === 4 && (selectedPillars.length < 3 || selectedPillars.length > 7)}
            onPress={handleNext}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
