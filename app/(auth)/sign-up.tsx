import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Link, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@/utils/icon';
import { icons } from '@/constants/icons';
import { useForm } from '@tanstack/react-form';
import { useAuthStore } from '@/store/authStore';

const SafeAreaView = styled(RNSafeAreaView);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUp = useAuthStore((state) => state.signUp);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      avatar: null as string | null,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);
        console.log('Sign up with:', value);

        // Prepare avatar data
        let avatar;
        if (value.avatar) {
          const fileName = value.avatar.split('/').pop() || 'avatar.jpg';
          const match = /\.(\w+)$/.exec(fileName);
          const type = match ? `image/${match[1]}` : 'image/jpeg';

          avatar = {
            uri: value.avatar,
            name: fileName,
            type: type,
          };
        }

        await signUp({
          username: value.name,
          email: value.email,
          password: value.password,
          passwordConfirm: value.password_confirm,
          avatar,
        });

        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => router.replace('/(drawer)/(tabs)'),
          },
        ]);
      } catch (error: any) {
        console.error('Signup Error Details:', {
          message: error?.message,
          response: error?.response?.data,
          status: error?.response?.status,
        });

        let errorMessage = 'Something went wrong during signup';

        if (error?.response?.data) {
          const pbError = error.response.data;
          if (pbError.data) {
            errorMessage = Object.entries(pbError.data)
              .map(([field, err]: [string, any]) => `${field}: ${err.message}`)
              .join('\n');
          } else {
            errorMessage = pbError.message || JSON.stringify(pbError);
          }
        } else if (error?.message) {
          errorMessage = error.message;
        }

        Alert.alert('Signup Error', errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to select an avatar.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      form.setFieldValue('avatar', result.assets[0].uri);
    }
  };

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
              <Text className="font-sans-bold text-text-color mb-2 text-3xl">Create Account</Text>
              <Text className="font-sans-medium text-muted-foreground text-base">
                Join us on your journey to be better
              </Text>
            </View>

            {/* Avatar Picker */}
            <form.Field name="avatar">
              {(field) => (
                <View className="form-group items-center">
                  <TouchableOpacity
                    onPress={pickImage}
                    className="border-border bg-muted mb-2 size-28 items-center justify-center overflow-hidden rounded-full border-2"
                    activeOpacity={0.7}>
                    {field.state.value ? (
                      <Image
                        source={{ uri: field.state.value }}
                        className="size-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="items-center">
                        <Icon icon={icons.user} />
                        <Text className="font-sans-medium text-muted-foreground text-xs">
                          Add Photo
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <Text className="text-muted-foreground font-sans text-xs">
                    profile picture (Optional)
                  </Text>
                </View>
              )}
            </form.Field>

            {/* Name Input */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (!value || !value.trim()) {
                    return 'Name is required';
                  }
                },
              }}>
              {(field) => (
                <View className="form-group">
                  <Text className="form-label">Username</Text>
                  <TextInput
                    className={`input-field ${field.state.meta.errors.length > 0 ? 'input-field-error' : ''}`}
                    placeholder="Enter your name"
                    placeholderTextColor="#94a3b8"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    autoCapitalize="words"
                  />
                  {field.state.meta.errors.length > 0 ? (
                    <Text className="error-text">{field.state.meta.errors[0]}</Text>
                  ) : null}
                </View>
              )}
            </form.Field>

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
                  } else if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    )
                  ) {
                    return 'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and at least 8 characters';
                  }
                },
              }}>
              {(field) => (
                <View className="form-group">
                  <Text className="form-label">Password</Text>
                  <View className="relative">
                    <TextInput
                      className={`input-field ${field.state.meta.errors.length > 0 ? 'input-field-error' : ''}`}
                      placeholder="Create a password"
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
                      className="absolute top-3 right-4 bottom-1"
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Text className="font-sans-semibold text-muted-foreground text-xs">
                        {showPassword ? (
                          <Icon icon={icons.eyesClose} />
                        ) : (
                          <Icon icon={icons.eyesOpen} />
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {field.state.meta.errors.length > 0 ? (
                    <Text className="error-text">{field.state.meta.errors[0]}</Text>
                  ) : null}
                </View>
              )}
            </form.Field>

            {/* Confirm Password Input */}
            <form.Field
              name="password_confirm"
              validators={{
                onChangeListenTo: ['password'],
                onChange: ({ value, fieldApi }) => {
                  const password = fieldApi.form.getFieldValue('password');
                  if (!value) {
                    return 'Please confirm your password';
                  } else if (value !== password) {
                    return 'Passwords do not match';
                  }
                },
              }}>
              {(field) => (
                <View className="form-group">
                  <Text className="form-label">Confirm Password</Text>
                  <View className="relative">
                    <TextInput
                      className={`input-field ${field.state.meta.errors.length > 0 ? 'input-field-error' : ''}`}
                      placeholder="Confirm your password"
                      placeholderTextColor="#94a3b8"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-3 right-4 bottom-1"
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Text className="font-sans-semibold text-muted-foreground text-xs">
                        {showConfirmPassword ? (
                          <Icon icon={icons.eyesClose} />
                        ) : (
                          <Icon icon={icons.eyesOpen} />
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {field.state.meta.errors.length > 0 ? (
                    <Text className="error-text">{field.state.meta.errors[0]}</Text>
                  ) : null}
                </View>
              )}
            </form.Field>

            {/* Sign Up Button */}
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <TouchableOpacity
                  onPress={form.handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className={`control-button-primary mt-6 ${!canSubmit || isSubmitting ? 'opacity-50' : ''}`}
                  activeOpacity={0.8}>
                  <Text className="control-button-text">
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </TouchableOpacity>
              )}
            </form.Subscribe>

            {/* Sign In Link */}
            <View className="mt-6 mb-8 flex-row items-center justify-center">
              <Text className="font-sans-medium text-muted-foreground text-sm">
                Already have an account?{' '}
              </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="font-sans-semibold text-primary text-sm">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
