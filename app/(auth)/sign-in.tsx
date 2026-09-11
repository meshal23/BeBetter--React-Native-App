import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Link, router } from 'expo-router';
import { useForm } from '@tanstack/react-form';
import { useAuthStore } from '@/store/authStore';

const SafeAreaView = styled(RNSafeAreaView);

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signIn = useAuthStore((state) => state.signIn);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);
        console.log('Sign in with:', value);

        await signIn(value.email, value.password);

        router.replace('/(drawer)/(tabs)');
      } catch (error: any) {
        console.error('Sign in error:', error);

        let errorMessage = 'Invalid email or password';

        if (error?.response?.data) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        Alert.alert('Sign In Error', errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <SafeAreaView className="bg-background flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <View className="px-6 pt-8">
            {/* Header */}
            <View className="mb-8">
              <Text className="font-sans-bold text-text-color mb-2 text-3xl">Welcome Back</Text>
              <Text className="font-sans-medium text-muted-foreground text-base">
                Sign in to continue your journey
              </Text>
            </View>

            {/* Email Input */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) {
                    return 'Email is required';
                  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    return 'Please enter valid email address';
                  }
                },
              }}>
              {(field) => (
                <View className="form-group">
                  <Text className="form-label">Email</Text>
                  <TextInput
                    className={`input-field ${field.state.meta.errors.length > 0 ? 'input-field-error' : ''}`}
                    placeholder="Enter your email"
                    placeholderTextColor="#94a3b8"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {field.state.meta.errors.length > 0 ? (
                    <Text className="error-text">{field.state.meta.errors[0]}</Text>
                  ) : null}
                </View>
              )}
            </form.Field>

            {/* Password Input */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) {
                    return 'Password is required';
                  }
                },
              }}>
              {(field) => (
                <View className="form-group">
                  <Text className="form-label">Password</Text>
                  <View className="relative">
                    <TextInput
                      className={`input-field ${field.state.meta.errors.length > 0 ? 'input-field-error' : ''}`}
                      placeholder="Enter your password"
                      placeholderTextColor="#94a3b8"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute top-3 right-4"
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Text className="font-sans-semibold text-muted-foreground text-xs">
                        {showPassword ? 'Hide' : 'Show'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {field.state.meta.errors.length > 0 ? (
                    <Text className="error-text">{field.state.meta.errors[0]}</Text>
                  ) : null}
                </View>
              )}
            </form.Field>

            {/* Sign In Button */}
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <TouchableOpacity
                  onPress={form.handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className={`control-button-primary mt-6 ${!canSubmit || isSubmitting ? 'opacity-50' : ''}`}
                  activeOpacity={0.8}>
                  <Text className="control-button-text">
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              )}
            </form.Subscribe>

            {/* Sign Up Link */}
            <View className="mt-6 mb-8 flex-row items-center justify-center">
              <Text className="font-sans-medium text-muted-foreground text-sm">
                Don&apos;t have an account?{' '}
              </Text>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="font-sans-semibold text-primary text-sm">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
