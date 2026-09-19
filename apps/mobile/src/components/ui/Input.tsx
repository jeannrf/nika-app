import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps, TouchableOpacity, Platform } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  leftIcon?: (props: { color: string; size: number }) => React.ReactNode;
}

export function Input({
  label,
  error,
  isPassword,
  leftIcon,
  placeholderTextColor = '#6B7280',
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const iconColor = error ? '#EF4444' : isFocused ? '#FF6B00' : '#6B7280';

  return (
    <View className="w-full mb-3.5">
      {label ? (
        <Text className="font-rethink-medium text-xs mb-1.5 ml-1 tracking-wide text-gray-300">
          {label}
        </Text>
      ) : null}

      <View
        className={`flex-row items-center h-[52px] rounded-2xl px-4 border ${
          error
            ? 'border-red-500 bg-red-950/20'
            : isFocused
            ? 'border-[#FF6B00] bg-[#161622]'
            : 'border-white/10 bg-[#14141E]'
        }`}
        style={{
          borderWidth: isFocused ? 1.5 : 1,
        }}
      >
        {leftIcon && (
          <View className="mr-3 items-center justify-center">
            {leftIcon({ color: iconColor, size: 19 })}
          </View>
        )}

        <TextInput
          className="flex-1 font-rethink text-[15px] text-white p-0"
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isPassword && !showPassword}
          cursorColor="#FF6B00"
          selectionColor="#FF6B00"
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          style={[
            {
              backgroundColor: 'transparent',
              // Disable web browser default focus ring/outline
              ...(Platform.OS === 'web'
                ? ({
                    outline: 'none',
                    outlineWidth: 0,
                    outlineStyle: 'none',
                    boxShadow: 'none',
                  } as any)
                : {}),
            },
            props.style,
          ]}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            activeOpacity={0.7}
            className="ml-2.5 p-1"
          >
            {showPassword ? (
              <EyeOff size={19} color="#6B7280" />
            ) : (
              <Eye size={19} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text className="font-rethink text-xs text-red-400 mt-1.5 ml-1.5">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
