import activity from '@/assets/icons/activity.png';
import add from '@/assets/icons/add.png';
import adobe from '@/assets/icons/adobe.png';
import back from '@/assets/icons/back.png';
import canva from '@/assets/icons/canva.png';
import claude from '@/assets/icons/claude.png';
import dropbox from '@/assets/icons/dropbox.png';
import figma from '@/assets/icons/figma.png';
import github from '@/assets/icons/github.png';
import home from '@/assets/icons/home.png';
import medium from '@/assets/icons/medium.png';
import menu from '@/assets/icons/menu.png';
import notion from '@/assets/icons/notion.png';
import openai from '@/assets/icons/openai.png';
import plus from '@/assets/icons/plus.png';
import setting from '@/assets/icons/setting.png';
import spotify from '@/assets/icons/spotify.png';
import wallet from '@/assets/icons/wallet.png';
import journal from '@/assets/icons/journal.png';
import community from '@/assets/icons/community.png';
import meditate from '@/assets/icons/meditate.png';
import donate from '@/assets/icons/donate.png';
import plans from '@/assets/icons/subscription.png';
import dashboard from '@/assets/icons/dashboard.png';
import logout from '@/assets/icons/logout.png';
import hamburger from '@/assets/icons/hamburger.png';
import workout from '@/assets/icons/workout.png';
import gift from '@/assets/icons/gift.png';
import wallpaper from '@/assets/icons/wallpaper.png';
import leaf from '@/assets/icons/leaf.png';
import learn from '@/assets/icons/learn.png';
import play from '@/assets/icons/play.png';
import user from '@/assets/icons/user.png';
import eyesOpen from '@/assets/icons/eyes-open.png';
import eyesClose from '@/assets/icons/eyes-closed.png';

export const icons = {
  home,
  wallet,
  setting,
  activity,
  add,
  back,
  menu,
  plus,
  notion,
  dropbox,
  openai,
  adobe,
  medium,
  figma,
  spotify,
  github,
  claude,
  canva,
  journal,
  community,
  meditate,
  donate,
  plans,
  dashboard,
  logout,
  hamburger,
  workout,
  gift,
  wallpaper,
  leaf,
  learn,
  play,
  user,
  eyesOpen,
  eyesClose,
} as const;

export type IconKey = keyof typeof icons;
