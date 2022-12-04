import onboarding1 from '@/assets/images/onboarding-1.png';
import onboarding2 from '@/assets/images/onboarding-2.png';
import onboarding3 from '@/assets/images/onboarding-3.png';
import onboarding4 from '@/assets/images/onboarding-4.png';
import { strings } from '../constants/localization';

export const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
export const data = [
  {
    key: '3571572',
    title: strings.onboarding1Title,
    description:
      strings.onboarding1Text,
    image: onboarding1,
  },
  {
    key: '3571747',
    title: strings.onboarding2Title,
    description:
      strings.onboarding2Text,
    image: onboarding2,
  },
  {
    key: '3571680',
    title: strings.onboarding3Title,
    description:
      strings.onboarding3Text,
    image: onboarding4,
  },
  {
    key: '3571603',
    title: strings.onboarding4Title,
    description: strings.onboarding4Text,
    image: onboarding3,
  },
];
