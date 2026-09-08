import type { ImageSourcePropType } from 'react-native';

declare global {
  interface AppTab {
    name: string;
    title: string;
    icon: ImageSourcePropType;
  }

  interface AppDrawer {
    name: string;
    title: string;
    drawerLabel: string;
    icon: ImageSourcePropType;
  }

  interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
  }

  interface CustomIconProps {
    focused?: boolean;
    icon: ImageSourcePropType;
  }

  interface Subscription {
    id: string;
    icon: ImageSourcePropType | string;
    name: string;
    plan?: string;
    category?: string;
    paymentMethod?: string;
    status?: string;
    startDate?: string;
    price: number;
    currency?: string;
    billing: string;
    frequency?: string;
    renewalDate?: string;
    color?: string;
  }

  interface SubscriptionCardProps extends Omit<Subscription, 'id'> {
    expanded: boolean;
    onPress: () => void;
    onCancelPress?: () => void;
    isCancelling?: boolean;
  }

  interface UpcomingSubscription {
    id: string;
    icon: ImageSourcePropType;
    name: string;
    price: number;
    currency?: string;
    daysLeft: number;
  }

  interface UpcomingSubscriptionCardProps extends Omit<UpcomingSubscription, 'id'> {}

  interface ListHeadingProps {
    title: string;
  }

  interface SobrietyTrackerProps {
    nextMilestoneDays: number;
  }

  interface DailyIntention {
    icon: ImageSourcePropType | string;
    title: string;
    subtitle: string;
  }
}

export {};
