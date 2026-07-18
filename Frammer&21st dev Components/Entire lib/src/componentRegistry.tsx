import ColorRandomizer from '../components/color-randomizer.tsx';
import Confetti from '../components/confetti.tsx';
import Countdown from '../components/countdown.tsx';
import CursorFollower from '../components/cursor-follower.tsx';
import DataCharts from '../components/data-charts.tsx';
import Draggable from '../components/draggable.tsx';
import IcalLink from '../components/ical-link.tsx';
import ImageEffect from '../components/image-effect.tsx';
import ImageMagnifier from '../components/image-magnifier.tsx';
import InfiniteScroll from '../components/infinite-scroll.tsx';
import PerlinDistortion from '../components/perlin-distortion.tsx';
import PerlinTexture from '../components/perlin-texture.tsx';
import QrScan from '../components/qr-scan.tsx';
import ScrollProgress from '../components/scroll-progress.tsx';
import SimpleTooltip from '../components/simple-tooltip.tsx';
import Strapi from '../components/strapi.tsx';
import TransformationRandomize from '../components/transformation-randomize.tsx';
import Weather from '../components/weather.tsx';

export const ComponentRegistry: Record<string, any> = {
  'color-randomizer': ColorRandomizer,
  'confetti': Confetti,
  'countdown': Countdown,
  'cursor-follower': CursorFollower,
  'data-charts': DataCharts,
  'draggable': Draggable,
  'ical-link': IcalLink,
  'image-effect': ImageEffect,
  'image-magnifier': ImageMagnifier,
  'infinite-scroll': InfiniteScroll,
  'perlin-distortion': PerlinDistortion,
  'perlin-texture': PerlinTexture,
  'qr-scan': QrScan,
  'scroll-progress': ScrollProgress,
  'simple-tooltip': SimpleTooltip,
  'strapi': Strapi,
  'transformation-randomize': TransformationRandomize,
  'weather': Weather,
};

