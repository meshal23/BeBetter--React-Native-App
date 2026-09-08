// import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import drawer components directly from 'expo-router/drawer' instead of '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItemList, DrawerItem, Drawer } from 'expo-router/drawer';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import clsx from 'clsx';
import { drawer } from '@/constants/data';
import images from '@/constants/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';

const DrawerIcon = ({ focused, icon }: TabIconProps) => {
  return (
    <View className="tabs-icon">
      <View className="drawer-pill">
        <Image source={icon} resizeMode="contain" className="tabs-glyph" />
      </View>
    </View>
  );
};

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={{
        flex: 1,
        backgroundColor: colors.drawerBg,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <View className="mb-5 flex-row border-b-2 border-black p-5">
        <Image source={images.avatar} className="mb-2.5 h-16 w-16 rounded-full" />
        <View className="ml-4 flex-1 justify-center">
          <Text className="font-sans-bold">Muhammed Meshal</Text>
          <Text className="text-muted-foreground text-sm">meshal@example.com</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      {/* <DrawerItem
        label="Logout"
        labelStyle={{
          color: colors.destructive,
          fontWeight: 'bold',
          fontSize: 20,
          marginLeft: -10,
          textAlign: 'center',
          flex: 0,
          width: 'auto',
        }}
        style={{
          backgroundColor: '#FBE7E2',
          paddingVertical: 5,
          borderRadius: 10,
          marginVertical: insets.bottom, // Add some margin at the bottom to avoid overlap with the safe area
          marginHorizontal: 10, // Add some horizontal margin for better spacing
          flexDirection: 'row',
          justifyContent: 'center', // Centers the combined icon + label row
          alignItems: 'center',
        }}
        icon={({ focused }) => <DrawerIcon focused={focused} icon={icons.logout} />}
        onPress={() => {
          router.replace('/(auth)/login');
        }}
      /> */}

      <Pressable
        onPress={() => {
          router.replace('/(auth)/login');
        }}
        style={({ pressed }) => ({
          backgroundColor: '#FBE7E2',
          paddingVertical: 12,
          borderRadius: 10,
          marginHorizontal: 10,
          marginBottom: insets.bottom || 10, // Safe area handling
          opacity: pressed ? 0.7 : 1, // Native press feedback
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center', // Centers icon and text together in the middle
          gap: 8, // Exact distance between icon and text
        })}>
        <DrawerIcon focused={false} icon={icons.logout} />
        <Text
          style={{
            color: colors.destructive,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor: colors.drawerBg, width: 300 },
          // --- Active Item Styling ---
          drawerActiveTintColor: colors.drawerActiveTint, // Active icon & text color
          drawerActiveBackgroundColor: colors.drawerActiveBg, // Active item background highlight
          // --- Label & Item Container Styling ---
          drawerLabelStyle: {
            fontSize: 20,
            fontWeight: '700',
            marginLeft: -10, // Adjust distance between icon and text
          },
          drawerItemStyle: {
            borderRadius: 10, // Rounded corners for menu options
            paddingHorizontal: 8,
            marginVertical: 7,
          },
        }}>
        {drawer.map((item) => (
          <Drawer.Screen
            key={item.name}
            name={item.name}
            options={{
              drawerLabel: item.drawerLabel,
              title: item.title,
              drawerIcon: ({ focused }) => <DrawerIcon focused={focused} icon={item.icon} />,
            }}
          />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}
