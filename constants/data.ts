import { icons } from './icons';

export const tabs: AppTab[] = [
  { name: 'index', title: 'Home', icon: icons.home },
  { name: 'reflect', title: 'Reflect', icon: icons.journal },
  { name: 'stats', title: 'Stats', icon: icons.activity },
  { name: 'settings', title: 'Settings', icon: icons.setting },
];

export const drawer: AppDrawer[] = [
  { name: '(tabs)', title: 'Home Dashboard', icon: icons.dashboard, drawerLabel: 'Dashboard' },
  { name: 'community', title: 'Community', icon: icons.community, drawerLabel: 'Community' },
  { name: 'meditate', title: 'Soul Cleansing', icon: icons.meditate, drawerLabel: 'Meditate' },
  { name: 'donate', title: 'Grow Together', icon: icons.donate, drawerLabel: 'Donate' },
  { name: 'plans', title: 'Plans', icon: icons.plans, drawerLabel: 'Plans' },
];

export const DAILY_INTENTIONS: DailyIntention[] = [
  { icon: icons.meditate, title: 'Prayer', subtitle: 'Connect with your higher self' },
  { icon: icons.workout, title: 'Workout', subtitle: 'Improve your physical health' },
];
