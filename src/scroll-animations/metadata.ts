// Auto-generated metadata registry
import type { ScrollAnimationComponent, AnimationCategory, ControlConfig } from './types';
import React from 'react';

const defaultControls: ControlConfig[] = [
  { key: 'markers', label: 'Markers', type: 'checkbox', default: false },
  { key: 'scrub', label: 'Scrub', type: 'checkbox', default: false },
  { key: 'pin', label: 'Pin', type: 'checkbox', default: false },
  { key: 'start', label: 'Start', type: 'text', default: 'top 80%' },
  { key: 'end', label: 'End', type: 'text', default: 'bottom 20%' },
  { key: 'duration', label: 'Duration', type: 'slider', default: 1, min: 0.1, max: 5, step: 0.1 },
  {
    key: 'ease', label: 'Ease', type: 'select', default: 'power2.out',
    options: [
      { label: 'Power 1 Out', value: 'power1.out' },
      { label: 'Power 2 Out', value: 'power2.out' },
      { label: 'Power 3 Out', value: 'power3.out' },
      { label: 'Power 4 Out', value: 'power4.out' },
      { label: 'Back Out', value: 'back.out(1.7)' },
      { label: 'Elastic Out', value: 'elastic.out(1, 0.3)' },
      { label: 'Bounce Out', value: 'bounce.out' },
      { label: 'Slow', value: 'slow()' },
      { label: 'Linear', value: 'none' },
    ],
  },
];

export const components: ScrollAnimationComponent[] = [];

import BasicScrollTrigger from './fundamentals/BasicScrollTrigger';
import BatchAnimations from './fundamentals/BatchAnimations';
import ContainerAnimation from './fundamentals/ContainerAnimation';
import DynamicTriggerCreation from './fundamentals/DynamicTriggerCreation';
import HorizontalContainers from './fundamentals/HorizontalContainers';
import LazyScrollTriggers from './fundamentals/LazyScrollTriggers';
import MatchMediaResponsive from './fundamentals/MatchMediaResponsive';
import NestedScrollTriggers from './fundamentals/NestedScrollTriggers';
import PinSpacing from './fundamentals/PinSpacing';
import PinningElements from './fundamentals/PinningElements';
import ScrollProgress from './fundamentals/ScrollProgress';
import ScrollVelocity from './fundamentals/ScrollVelocity';
import ScrubAnimation from './fundamentals/ScrubAnimation';
import StartEndMarkers from './fundamentals/StartEndMarkers';
import ToggleActions from './fundamentals/ToggleActions';
import BlurReveal from './reveal/BlurReveal';
import CharacterReveal from './reveal/CharacterReveal';
import ClipPathReveal from './reveal/ClipPathReveal';
import FadeDown from './reveal/FadeDown';
import FadeLeft from './reveal/FadeLeft';
import FadeRight from './reveal/FadeRight';
import FadeUp from './reveal/FadeUp';
import GalleryReveal from './reveal/GalleryReveal';
import HeroEntrance from './reveal/HeroEntrance';
import ImageReveal from './reveal/ImageReveal';
import LineReveal from './reveal/LineReveal';
import MaskReveal from './reveal/MaskReveal';
import MasonryReveal from './reveal/MasonryReveal';
import ScaleReveal from './reveal/ScaleReveal';
import SequentialCards from './reveal/SequentialCards';
import SplitTextReveal from './reveal/SplitTextReveal';
import WordReveal from './reveal/WordReveal';
import LayeredPin from './pinning/LayeredPin';
import MultiSectionPin from './pinning/MultiSectionPin';
import PinWithTimeline from './pinning/PinWithTimeline';
import PinnedImage from './pinning/PinnedImage';
import PinnedProductShowcase from './pinning/PinnedProductShowcase';
import PinnedText from './pinning/PinnedText';
import ProgressivePin from './pinning/ProgressivePin';
import ScrollStorytelling from './pinning/ScrollStorytelling';
import SplitScreenPin from './pinning/SplitScreenPin';
import StickyHero from './pinning/StickyHero';
import ColorTransitionScrub from './scrub/ColorTransitionScrub';
import ImageSequenceScrub from './scrub/ImageSequenceScrub';
import NumberCounterScrub from './scrub/NumberCounterScrub';
import RotationScrub from './scrub/RotationScrub';
import SVGMorphScrub from './scrub/SVGMorphScrub';
import SVGPathDrawing from './scrub/SVGPathDrawing';
import ScaleScrub from './scrub/ScaleScrub';
import SmoothScrub from './scrub/SmoothScrub';
import ThreeDPerspectiveScrub from './scrub/ThreeDPerspectiveScrub';
import TimelineScrub from './scrub/TimelineScrub';
import HorizontalCards from './horizontal/HorizontalCards';
import HorizontalGallery from './horizontal/HorizontalGallery';
import HorizontalTimeline from './horizontal/HorizontalTimeline';
import InfiniteHorizontalLoop from './horizontal/InfiniteHorizontalLoop';
import MixedVerticalHorizontal from './horizontal/MixedVerticalHorizontal';
import PortfolioSlider from './horizontal/PortfolioSlider';
import ProductShowcase from './horizontal/ProductShowcase';
import StickyHorizontalScroll from './horizontal/StickyHorizontalScroll';
import BackgroundParallax from './parallax/BackgroundParallax';
import DepthMovement from './parallax/DepthMovement';
import FloatingLayers from './parallax/FloatingLayers';
import ImageParallax from './parallax/ImageParallax';
import MouseScrollHybrid from './parallax/MouseScrollHybrid';
import MultiLayerParallax from './parallax/MultiLayerParallax';
import PerspectiveParallax from './parallax/PerspectiveParallax';
import TextParallax from './parallax/TextParallax';
import AnimatedLogo from './svg/AnimatedLogo';
import ConnectionLines from './svg/ConnectionLines';
import DrawSVG from './svg/DrawSVG';
import DynamicGraphDrawing from './svg/DynamicGraphDrawing';
import FollowMotionPath from './svg/FollowMotionPath';
import MorphSVG from './svg/MorphSVG';
import OrbitAnimation from './svg/OrbitAnimation';
import SVGCircularProgress from './svg/SVGCircularProgress';
import SignatureAnimation from './svg/SignatureAnimation';
import WaveDrawing from './svg/WaveDrawing';
import BeforeAfterTransitions from './timelines/BeforeAfterTransitions';
import InteractiveStorySections from './timelines/InteractiveStorySections';
import MultiSceneStorytelling from './timelines/MultiSceneStorytelling';
import NestedTimelines from './timelines/NestedTimelines';
import ProductFeatureWalkthrough from './timelines/ProductFeatureWalkthrough';
import ScrollControlledSequences from './timelines/ScrollControlledSequences';
import TimelineScrubbing from './timelines/TimelineScrubbing';
import AccordionScroll from './cards/AccordionScroll';
import ExpandingCards from './cards/ExpandingCards';
import FloatingPanels from './cards/FloatingPanels';
import LayeredSections from './cards/LayeredSections';
import ProgressiveReveal from './cards/ProgressiveReveal';
import RotatingCards from './cards/RotatingCards';
import SectionSnap from './cards/SectionSnap';
import StackingCards from './cards/StackingCards';
import TimelineCards from './cards/TimelineCards';
import BeforeAfterSlider from './images/BeforeAfterSlider';
import CrossfadeImages from './images/CrossfadeImages';
import ImageSequencePlayback from './images/ImageSequencePlayback';
import KenBurnsScroll from './images/KenBurnsScroll';
import LightboxEntrance from './images/LightboxEntrance';
import ProgressiveBlur from './images/ProgressiveBlur';
import VideoFrameAnimation from './images/VideoFrameAnimation';
import ZoomReveal from './images/ZoomReveal';
import CharacterCascade from './text/CharacterCascade';
import GradientTextAnimation from './text/GradientTextAnimation';
import HighlightCurrentLine from './text/HighlightCurrentLine';
import MarqueeActivation from './text/MarqueeActivation';
import RollingHeadlines from './text/RollingHeadlines';
import SplitTextScrollReveal from './text/SplitTextScrollReveal';
import StrokeDrawing from './text/StrokeDrawing';
import VariableFontWeight from './text/VariableFontWeight';
import ActiveNavIndicator from './progress/ActiveNavIndicator';
import CircularProgress from './progress/CircularProgress';
import ReadingProgressBar from './progress/ReadingProgressBar';
import ScrollPercentage from './progress/ScrollPercentage';
import ScrollPositionTracker from './progress/ScrollPositionTracker';
import SectionProgress from './progress/SectionProgress';
import TimelineProgress from './progress/TimelineProgress';
import BounceOnEnter from './physics/BounceOnEnter';
import ElasticReveal from './physics/ElasticReveal';
import FloatingObjects from './physics/FloatingObjects';
import InertiaMovement from './physics/InertiaMovement';
import MagneticSections from './physics/MagneticSections';
import MomentumElements from './physics/MomentumElements';
import PhysicsCards from './physics/PhysicsCards';
import SpringScrollMotion from './physics/SpringScrollMotion';
import AnchorNavigation from './smooth-scroll/AnchorNavigation';
import CustomScrollContainer from './smooth-scroll/CustomScrollContainer';
import HorizontalSmoothScroll from './smooth-scroll/HorizontalSmoothScroll';
import InfiniteSmoothScroll from './smooth-scroll/InfiniteSmoothScroll';
import LenisIntegration from './smooth-scroll/LenisIntegration';
import NativeSmoothScroll from './smooth-scroll/NativeSmoothScroll';
import ScrollRestoration from './smooth-scroll/ScrollRestoration';
import ScrollSmoother from './smooth-scroll/ScrollSmoother';
import BatchScrollTrigger from './performance/BatchScrollTrigger';
import GPUAcceleratedTransforms from './performance/GPUAcceleratedTransforms';
import IntersectionObserverFallback from './performance/IntersectionObserverFallback';
import LazyInitialization from './performance/LazyInitialization';
import MemoryCleanup from './performance/MemoryCleanup';
import MobileOptimizations from './performance/MobileOptimizations';
import ReducedMotionSupport from './performance/ReducedMotionSupport';
import ResponsiveTriggerManagement from './performance/ResponsiveTriggerManagement';

components.push({
  id: 'BasicScrollTrigger',
  title: 'Basic Scroll Trigger',
  description: 'Element fades in smoothly when scrolled into viewport using a basic ScrollTrigger setup.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: BasicScrollTrigger,
  controls: defaultControls,
});
components.push({
  id: 'BatchAnimations',
  title: 'Batch Animations',
  description: 'Animate groups of elements efficiently with staggered batch processing.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: BatchAnimations,
  controls: defaultControls,
});
components.push({
  id: 'ContainerAnimation',
  title: 'Container Animation',
  description: 'Animations inside a scrollable container element rather than the window.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ContainerAnimation,
  controls: defaultControls,
});
components.push({
  id: 'DynamicTriggerCreation',
  title: 'Dynamic Trigger Creation',
  description: 'Create and destroy ScrollTriggers on-the-fly with buttons.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: DynamicTriggerCreation,
  controls: defaultControls,
});
components.push({
  id: 'HorizontalContainers',
  title: 'Horizontal Containers',
  description: 'Horizontal section that scrolls sideways as user scrolls vertically.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: HorizontalContainers,
  controls: defaultControls,
});
components.push({
  id: 'LazyScrollTriggers',
  title: 'Lazy Scroll Triggers',
  description: 'ScrollTriggers that only initialize when near viewport using IntersectionObserver.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: LazyScrollTriggers,
  controls: defaultControls,
});
components.push({
  id: 'MatchMediaResponsive',
  title: 'Match Media Responsive',
  description: 'Responsive ScrollTriggers that adapt behavior per viewport breakpoint.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MatchMediaResponsive,
  controls: defaultControls,
});
components.push({
  id: 'NestedScrollTriggers',
  title: 'Nested Scroll Triggers',
  description: 'Parent and child ScrollTriggers that coordinate together.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: NestedScrollTriggers,
  controls: defaultControls,
});
components.push({
  id: 'PinSpacing',
  title: 'Pin Spacing',
  description: 'GSAP auto-calculates pin spacing across multiple pinned sections.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PinSpacing,
  controls: defaultControls,
});
components.push({
  id: 'PinningElements',
  title: 'Pinning Elements',
  description: 'Element stays fixed (pinned) while content scrolls past, then releases.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PinningElements,
  controls: defaultControls,
});
components.push({
  id: 'ScrollProgress',
  title: 'Scroll Progress',
  description: 'Visual progress indicator tracking scroll position through content.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScrollProgress,
  controls: defaultControls,
});
components.push({
  id: 'ScrollVelocity',
  title: 'Scroll Velocity',
  description: 'Animation intensity reacts to how fast the user scrolls.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScrollVelocity,
  controls: defaultControls,
});
components.push({
  id: 'ScrubAnimation',
  title: 'Scrub Animation',
  description: 'Element position directly tied to scroll progress with smooth scrubbing.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScrubAnimation,
  controls: defaultControls,
});
components.push({
  id: 'StartEndMarkers',
  title: 'Start End Markers',
  description: 'Visualizes start and end trigger positions with debugging markers across multiple elements.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: StartEndMarkers,
  controls: defaultControls,
});
components.push({
  id: 'ToggleActions',
  title: 'Toggle Actions',
  description: 'Demonstrates all ScrollTrigger toggle actions: play, pause, resume, reverse, complete, reset, restart.',
  category: 'fundamentals' as AnimationCategory,
  tags: ['fundamentals', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ToggleActions,
  controls: defaultControls,
});
components.push({
  id: 'BlurReveal',
  title: 'Blur Reveal',
  description: 'Elements transition from blurry silhouette to sharp clarity.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: BlurReveal,
  controls: defaultControls,
});
components.push({
  id: 'CharacterReveal',
  title: 'Character Reveal',
  description: 'Individual characters animate in one at a time.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: CharacterReveal,
  controls: defaultControls,
});
components.push({
  id: 'ClipPathReveal',
  title: 'Clip Path Reveal',
  description: 'Content revealed through expanding clip-path shapes like circles and wedges.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ClipPathReveal,
  controls: defaultControls,
});
components.push({
  id: 'FadeDown',
  title: 'Fade Down',
  description: 'Elements fade and slide downward into the viewport.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: FadeDown,
  controls: defaultControls,
});
components.push({
  id: 'FadeLeft',
  title: 'Fade Left',
  description: 'Content slides in from the left side with a fade transition.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: FadeLeft,
  controls: defaultControls,
});
components.push({
  id: 'FadeRight',
  title: 'Fade Right',
  description: 'Content slides in from the right side with a fade transition.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: FadeRight,
  controls: defaultControls,
});
components.push({
  id: 'FadeUp',
  title: 'Fade Up',
  description: 'Elements fade and slide upward with staggered entrance as they scroll into view.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: FadeUp,
  controls: defaultControls,
});
components.push({
  id: 'GalleryReveal',
  title: 'Gallery Reveal',
  description: 'Gallery images progressively reveal with 3D rotation entrance.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: GalleryReveal,
  controls: defaultControls,
});
components.push({
  id: 'HeroEntrance',
  title: 'Hero Entrance',
  description: 'Full hero section animates in layers: background, title, subtitle, CTA.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: HeroEntrance,
  controls: defaultControls,
});
components.push({
  id: 'ImageReveal',
  title: 'Image Reveal',
  description: 'Full-width image revealed with an overlay wipe effect.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ImageReveal,
  controls: defaultControls,
});
components.push({
  id: 'LineReveal',
  title: 'Line Reveal',
  description: 'Lines of text reveal progressively on scroll.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: LineReveal,
  controls: defaultControls,
});
components.push({
  id: 'MaskReveal',
  title: 'Mask Reveal',
  description: 'Content unveiled behind a moving mask overlay.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MaskReveal,
  controls: defaultControls,
});
components.push({
  id: 'MasonryReveal',
  title: 'Masonry Reveal',
  description: 'Masonry grid items reveal with staggered random entrance.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MasonryReveal,
  controls: defaultControls,
});
components.push({
  id: 'ScaleReveal',
  title: 'Scale Reveal',
  description: 'Elements scale from zero to full size with spring-like easing.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScaleReveal,
  controls: defaultControls,
});
components.push({
  id: 'SequentialCards',
  title: 'Sequential Cards',
  description: 'Cards in sequence stagger into view on scroll.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SequentialCards,
  controls: defaultControls,
});
components.push({
  id: 'SplitTextReveal',
  title: 'Split Text Reveal',
  description: 'Text sentences reveal one by one in sequence.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SplitTextReveal,
  controls: defaultControls,
});
components.push({
  id: 'WordReveal',
  title: 'Word Reveal',
  description: 'Words animate into view sequentially with stagger.',
  category: 'reveal' as AnimationCategory,
  tags: ['reveal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: WordReveal,
  controls: defaultControls,
});
components.push({
  id: 'LayeredPin',
  title: 'Layered Pin',
  description: 'Elements reveal layer by layer through pinned stacking.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: LayeredPin,
  controls: defaultControls,
});
components.push({
  id: 'MultiSectionPin',
  title: 'Multi Section Pin',
  description: 'Multiple sections each pin sequentially.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MultiSectionPin,
  controls: defaultControls,
});
components.push({
  id: 'PinWithTimeline',
  title: 'Pin With Timeline',
  description: 'Pinned element animates through a GSAP timeline on scroll.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PinWithTimeline,
  controls: defaultControls,
});
components.push({
  id: 'PinnedImage',
  title: 'Pinned Image',
  description: 'Image pinned at center while surrounding content scrolls past.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PinnedImage,
  controls: defaultControls,
});
components.push({
  id: 'PinnedProductShowcase',
  title: 'Pinned Product Showcase',
  description: 'Product cards pin and stack vertically on scroll.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PinnedProductShowcase,
  controls: defaultControls,
});
components.push({
  id: 'PinnedText',
  title: 'Pinned Text',
  description: 'Text block pinned while colors and background animate behind it.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PinnedText,
  controls: defaultControls,
});
components.push({
  id: 'ProgressivePin',
  title: 'Progressive Pin',
  description: 'Content progressively pins and releases section by section.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ProgressivePin,
  controls: defaultControls,
});
components.push({
  id: 'ScrollStorytelling',
  title: 'Scroll Storytelling',
  description: 'Text phrases change at center while scrolling through story sections.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScrollStorytelling,
  controls: defaultControls,
});
components.push({
  id: 'SplitScreenPin',
  title: 'Split Screen Pin',
  description: 'Left panel pins while right panel scrolls content.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SplitScreenPin,
  controls: defaultControls,
});
components.push({
  id: 'StickyHero',
  title: 'Sticky Hero',
  description: 'Full-screen hero pinned at top while content scrolls over it.',
  category: 'pinning' as AnimationCategory,
  tags: ['pin', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: StickyHero,
  controls: defaultControls,
});
components.push({
  id: 'ColorTransitionScrub',
  title: 'Color Transition Scrub',
  description: 'Background smoothly cycles through colors on scroll.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ColorTransitionScrub,
  controls: defaultControls,
});
components.push({
  id: 'ImageSequenceScrub',
  title: 'Image Sequence Scrub',
  description: 'Color frames sequence like a film strip on scroll.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ImageSequenceScrub,
  controls: defaultControls,
});
components.push({
  id: 'NumberCounterScrub',
  title: 'Number Counter Scrub',
  description: 'Number counter increments from zero to target as you scroll.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: NumberCounterScrub,
  controls: defaultControls,
});
components.push({
  id: 'RotationScrub',
  title: 'Rotation Scrub',
  description: 'Concentric rings rotate at different speeds based on scroll.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: RotationScrub,
  controls: defaultControls,
});
components.push({
  id: 'SVGMorphScrub',
  title: 'S V G Morph Scrub',
  description: 'SVG morphs between star and circle shapes on scroll.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SVGMorphScrub,
  controls: defaultControls,
});
components.push({
  id: 'SVGPathDrawing',
  title: 'S V G Path Drawing',
  description: 'SVG path draws itself from start to finish on scroll.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SVGPathDrawing,
  controls: defaultControls,
});
components.push({
  id: 'ScaleScrub',
  title: 'Scale Scrub',
  description: 'Cards scale up and down with different patterns on scroll.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScaleScrub,
  controls: defaultControls,
});
components.push({
  id: 'SmoothScrub',
  title: 'Smooth Scrub',
  description: 'Box smoothly animates left-to-right with scrub interpolation.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SmoothScrub,
  controls: defaultControls,
});
components.push({
  id: 'ThreeDPerspectiveScrub',
  title: 'Three D Perspective Scrub',
  description: 'Cards rotate in 3D space with perspective transform.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ThreeDPerspectiveScrub,
  controls: defaultControls,
});
components.push({
  id: 'TimelineScrub',
  title: 'Timeline Scrub',
  description: 'Multiple elements animate through a timeline scrubbed by scroll.',
  category: 'scrub' as AnimationCategory,
  tags: ['scrub', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: TimelineScrub,
  controls: defaultControls,
});
components.push({
  id: 'HorizontalCards',
  title: 'Horizontal Cards',
  description: 'Cards move horizontally in a pinned track section.',
  category: 'horizontal' as AnimationCategory,
  tags: ['horizontal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: HorizontalCards,
  controls: defaultControls,
});
components.push({
  id: 'HorizontalGallery',
  title: 'Horizontal Gallery',
  description: 'Gallery of cards that scrolls horizontally when user scrolls down.',
  category: 'horizontal' as AnimationCategory,
  tags: ['horizontal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: HorizontalGallery,
  controls: defaultControls,
});
components.push({
  id: 'HorizontalTimeline',
  title: 'Horizontal Timeline',
  description: 'Horizontal timeline with milestone markers and progress.',
  category: 'horizontal' as AnimationCategory,
  tags: ['horizontal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: HorizontalTimeline,
  controls: defaultControls,
});
components.push({
  id: 'InfiniteHorizontalLoop',
  title: 'Infinite Horizontal Loop',
  description: 'Infinite looping horizontal scroll of items.',
  category: 'horizontal' as AnimationCategory,
  tags: ['horizontal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: InfiniteHorizontalLoop,
  controls: defaultControls,
});
components.push({
  id: 'MixedVerticalHorizontal',
  title: 'Mixed Vertical Horizontal',
  description: 'Mixed layout with vertical and horizontal scroll sections.',
  category: 'horizontal' as AnimationCategory,
  tags: ['horizontal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MixedVerticalHorizontal,
  controls: defaultControls,
});
components.push({
  id: 'PortfolioSlider',
  title: 'Portfolio Slider',
  description: 'Portfolio items sliding horizontally with labels.',
  category: 'horizontal' as AnimationCategory,
  tags: ['horizontal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PortfolioSlider,
  controls: defaultControls,
});
components.push({
  id: 'ProductShowcase',
  title: 'Product Showcase',
  description: 'Products displayed horizontally with descriptions.',
  category: 'horizontal' as AnimationCategory,
  tags: ['horizontal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ProductShowcase,
  controls: defaultControls,
});
components.push({
  id: 'StickyHorizontalScroll',
  title: 'Sticky Horizontal Scroll',
  description: 'Stickied section scrolls its content horizontally.',
  category: 'horizontal' as AnimationCategory,
  tags: ['horizontal', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: StickyHorizontalScroll,
  controls: defaultControls,
});
components.push({
  id: 'BackgroundParallax',
  title: 'Background Parallax',
  description: 'Background moves slower than foreground content.',
  category: 'parallax' as AnimationCategory,
  tags: ['parallax', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: BackgroundParallax,
  controls: defaultControls,
});
components.push({
  id: 'DepthMovement',
  title: 'Depth Movement',
  description: 'Foreground, midground, and background parallax layers.',
  category: 'parallax' as AnimationCategory,
  tags: ['parallax', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: DepthMovement,
  controls: defaultControls,
});
components.push({
  id: 'FloatingLayers',
  title: 'Floating Layers',
  description: 'Floating elements at different depths moving at different rates.',
  category: 'parallax' as AnimationCategory,
  tags: ['parallax', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: FloatingLayers,
  controls: defaultControls,
});
components.push({
  id: 'ImageParallax',
  title: 'Image Parallax',
  description: 'Single image with smooth parallax movement.',
  category: 'parallax' as AnimationCategory,
  tags: ['parallax', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ImageParallax,
  controls: defaultControls,
});
components.push({
  id: 'MouseScrollHybrid',
  title: 'Mouse Scroll Hybrid',
  description: 'Combines mouse position data with scroll parallax.',
  category: 'parallax' as AnimationCategory,
  tags: ['parallax', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MouseScrollHybrid,
  controls: defaultControls,
});
components.push({
  id: 'MultiLayerParallax',
  title: 'Multi Layer Parallax',
  description: 'Multiple layers moving at different speeds on scroll.',
  category: 'parallax' as AnimationCategory,
  tags: ['parallax', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MultiLayerParallax,
  controls: defaultControls,
});
components.push({
  id: 'PerspectiveParallax',
  title: 'Perspective Parallax',
  description: 'Cards shifting in 3D perspective space on scroll.',
  category: 'parallax' as AnimationCategory,
  tags: ['parallax', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PerspectiveParallax,
  controls: defaultControls,
});
components.push({
  id: 'TextParallax',
  title: 'Text Parallax',
  description: 'Text drifts at different speed than page scroll.',
  category: 'parallax' as AnimationCategory,
  tags: ['parallax', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: TextParallax,
  controls: defaultControls,
});
components.push({
  id: 'AnimatedLogo',
  title: 'Animated Logo',
  description: 'Logo-style SVG assembles into view on scroll.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: AnimatedLogo,
  controls: defaultControls,
});
components.push({
  id: 'ConnectionLines',
  title: 'Connection Lines',
  description: 'Lines draw between connected nodes on scroll.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: ConnectionLines,
  controls: defaultControls,
});
components.push({
  id: 'DrawSVG',
  title: 'Draw S V G',
  description: 'SVG path draws itself progressively on scroll.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: DrawSVG,
  controls: defaultControls,
});
components.push({
  id: 'DynamicGraphDrawing',
  title: 'Dynamic Graph Drawing',
  description: 'Bar graph draws its data columns on scroll.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: DynamicGraphDrawing,
  controls: defaultControls,
});
components.push({
  id: 'FollowMotionPath',
  title: 'Follow Motion Path',
  description: 'Dot follows an SVG path trajectory on scroll.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: FollowMotionPath,
  controls: defaultControls,
});
components.push({
  id: 'MorphSVG',
  title: 'Morph S V G',
  description: 'SVG morphs between different shapes on scroll.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: MorphSVG,
  controls: defaultControls,
});
components.push({
  id: 'OrbitAnimation',
  title: 'Orbit Animation',
  description: 'Elements orbit around a center point on scroll.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: OrbitAnimation,
  controls: defaultControls,
});
components.push({
  id: 'SVGCircularProgress',
  title: 'S V G Circular Progress',
  description: 'Circular ring fills around on scroll progress.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: SVGCircularProgress,
  controls: defaultControls,
});
components.push({
  id: 'SignatureAnimation',
  title: 'Signature Animation',
  description: 'Cursive signature draws itself stroke by stroke.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: SignatureAnimation,
  controls: defaultControls,
});
components.push({
  id: 'WaveDrawing',
  title: 'Wave Drawing',
  description: 'Wave pattern draws progressively across the screen.',
  category: 'svg' as AnimationCategory,
  tags: ['svg', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, MotionPathPlugin'],
  component: WaveDrawing,
  controls: defaultControls,
});
components.push({
  id: 'BeforeAfterTransitions',
  title: 'Before After Transitions',
  description: 'Before and after comparison transitions on scroll.',
  category: 'timelines' as AnimationCategory,
  tags: ['timeline', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: BeforeAfterTransitions,
  controls: defaultControls,
});
components.push({
  id: 'InteractiveStorySections',
  title: 'Interactive Story Sections',
  description: 'Story chapters reveal one by one on scroll.',
  category: 'timelines' as AnimationCategory,
  tags: ['timeline', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: InteractiveStorySections,
  controls: defaultControls,
});
components.push({
  id: 'MultiSceneStorytelling',
  title: 'Multi Scene Storytelling',
  description: 'Multiple scenes transition as user scrolls through.',
  category: 'timelines' as AnimationCategory,
  tags: ['timeline', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MultiSceneStorytelling,
  controls: defaultControls,
});
components.push({
  id: 'NestedTimelines',
  title: 'Nested Timelines',
  description: 'Parent timeline coordinates child timeline sequences.',
  category: 'timelines' as AnimationCategory,
  tags: ['timeline', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: NestedTimelines,
  controls: defaultControls,
});
components.push({
  id: 'ProductFeatureWalkthrough',
  title: 'Product Feature Walkthrough',
  description: 'Product features highlight in sequence on scroll.',
  category: 'timelines' as AnimationCategory,
  tags: ['timeline', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ProductFeatureWalkthrough,
  controls: defaultControls,
});
components.push({
  id: 'ScrollControlledSequences',
  title: 'Scroll Controlled Sequences',
  description: 'Multiple sequential steps controlled by scroll.',
  category: 'timelines' as AnimationCategory,
  tags: ['timeline', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScrollControlledSequences,
  controls: defaultControls,
});
components.push({
  id: 'TimelineScrubbing',
  title: 'Timeline Scrubbing',
  description: 'GSAP timeline scrubbed precisely by scroll position.',
  category: 'timelines' as AnimationCategory,
  tags: ['timeline', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: TimelineScrubbing,
  controls: defaultControls,
});
components.push({
  id: 'AccordionScroll',
  title: 'Accordion Scroll',
  description: 'Accordion sections open based on scroll position.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: AccordionScroll,
  controls: defaultControls,
});
components.push({
  id: 'ExpandingCards',
  title: 'Expanding Cards',
  description: 'Cards expand from compact to full size on scroll.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ExpandingCards,
  controls: defaultControls,
});
components.push({
  id: 'FloatingPanels',
  title: 'Floating Panels',
  description: 'Panels float with parallax shift on scroll.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: FloatingPanels,
  controls: defaultControls,
});
components.push({
  id: 'LayeredSections',
  title: 'Layered Sections',
  description: 'Overlapping sections reveal content in layers.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: LayeredSections,
  controls: defaultControls,
});
components.push({
  id: 'ProgressiveReveal',
  title: 'Progressive Reveal',
  description: 'Content progressively reveals section by section.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ProgressiveReveal,
  controls: defaultControls,
});
components.push({
  id: 'RotatingCards',
  title: 'Rotating Cards',
  description: 'Cards rotate and flip as they enter viewport.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: RotatingCards,
  controls: defaultControls,
});
components.push({
  id: 'SectionSnap',
  title: 'Section Snap',
  description: 'Content sections snap precisely into view on scroll.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SectionSnap,
  controls: defaultControls,
});
components.push({
  id: 'StackingCards',
  title: 'Stacking Cards',
  description: 'Cards physically stack on top of each other on scroll.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: StackingCards,
  controls: defaultControls,
});
components.push({
  id: 'TimelineCards',
  title: 'Timeline Cards',
  description: 'Vertical timeline with cards at each milestone.',
  category: 'cards' as AnimationCategory,
  tags: ['card', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: TimelineCards,
  controls: defaultControls,
});
components.push({
  id: 'BeforeAfterSlider',
  title: 'Before After Slider',
  description: 'Scroll-controlled before/after comparison.',
  category: 'images' as AnimationCategory,
  tags: ['image', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: BeforeAfterSlider,
  controls: defaultControls,
});
components.push({
  id: 'CrossfadeImages',
  title: 'Crossfade Images',
  description: 'Two images crossfade based on scroll position.',
  category: 'images' as AnimationCategory,
  tags: ['image', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: CrossfadeImages,
  controls: defaultControls,
});
components.push({
  id: 'ImageSequencePlayback',
  title: 'Image Sequence Playback',
  description: 'Multiple images frame-through on scroll.',
  category: 'images' as AnimationCategory,
  tags: ['image', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ImageSequencePlayback,
  controls: defaultControls,
});
components.push({
  id: 'KenBurnsScroll',
  title: 'Ken Burns Scroll',
  description: 'Slow Ken Burns zoom effect on images while scrolling.',
  category: 'images' as AnimationCategory,
  tags: ['image', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: KenBurnsScroll,
  controls: defaultControls,
});
components.push({
  id: 'LightboxEntrance',
  title: 'Lightbox Entrance',
  description: 'Gallery items with lightbox entrance animation.',
  category: 'images' as AnimationCategory,
  tags: ['image', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: LightboxEntrance,
  controls: defaultControls,
});
components.push({
  id: 'ProgressiveBlur',
  title: 'Progressive Blur',
  description: 'Image transitions from blurry to sharp focus.',
  category: 'images' as AnimationCategory,
  tags: ['image', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ProgressiveBlur,
  controls: defaultControls,
});
components.push({
  id: 'VideoFrameAnimation',
  title: 'Video Frame Animation',
  description: 'Simulated video frame progression on scroll.',
  category: 'images' as AnimationCategory,
  tags: ['image', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: VideoFrameAnimation,
  controls: defaultControls,
});
components.push({
  id: 'ZoomReveal',
  title: 'Zoom Reveal',
  description: 'Image zooms in from distance on scroll.',
  category: 'images' as AnimationCategory,
  tags: ['image', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ZoomReveal,
  controls: defaultControls,
});
components.push({
  id: 'CharacterCascade',
  title: 'Character Cascade',
  description: 'Characters cascade down like waterfall on scroll.',
  category: 'text' as AnimationCategory,
  tags: ['text', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, SplitText'],
  component: CharacterCascade,
  controls: defaultControls,
});
components.push({
  id: 'GradientTextAnimation',
  title: 'Gradient Text Animation',
  description: 'Text gradient animates and shifts on scroll.',
  category: 'text' as AnimationCategory,
  tags: ['text', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, SplitText'],
  component: GradientTextAnimation,
  controls: defaultControls,
});
components.push({
  id: 'HighlightCurrentLine',
  title: 'Highlight Current Line',
  description: 'Text lines highlight one by one on scroll.',
  category: 'text' as AnimationCategory,
  tags: ['text', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, SplitText'],
  component: HighlightCurrentLine,
  controls: defaultControls,
});
components.push({
  id: 'MarqueeActivation',
  title: 'Marquee Activation',
  description: 'Marquee starts scrolling when it enters viewport.',
  category: 'text' as AnimationCategory,
  tags: ['text', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, SplitText'],
  component: MarqueeActivation,
  controls: defaultControls,
});
components.push({
  id: 'RollingHeadlines',
  title: 'Rolling Headlines',
  description: 'Headlines roll into view with rotation on scroll.',
  category: 'text' as AnimationCategory,
  tags: ['text', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, SplitText'],
  component: RollingHeadlines,
  controls: defaultControls,
});
components.push({
  id: 'SplitTextScrollReveal',
  title: 'Split Text Scroll Reveal',
  description: 'Text splits into words that fade in on scroll.',
  category: 'text' as AnimationCategory,
  tags: ['text', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, SplitText'],
  component: SplitTextScrollReveal,
  controls: defaultControls,
});
components.push({
  id: 'StrokeDrawing',
  title: 'Stroke Drawing',
  description: 'Text strokes draw in with dash animation.',
  category: 'text' as AnimationCategory,
  tags: ['text', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, SplitText'],
  component: StrokeDrawing,
  controls: defaultControls,
});
components.push({
  id: 'VariableFontWeight',
  title: 'Variable Font Weight',
  description: 'Font weight transitions from light to bold.',
  category: 'text' as AnimationCategory,
  tags: ['text', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, SplitText'],
  component: VariableFontWeight,
  controls: defaultControls,
});
components.push({
  id: 'ActiveNavIndicator',
  title: 'Active Nav Indicator',
  description: 'Navigation highlights active section on scroll.',
  category: 'progress' as AnimationCategory,
  tags: ['progress', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ActiveNavIndicator,
  controls: defaultControls,
});
components.push({
  id: 'CircularProgress',
  title: 'Circular Progress',
  description: 'Circular progress ring fills on scroll.',
  category: 'progress' as AnimationCategory,
  tags: ['progress', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: CircularProgress,
  controls: defaultControls,
});
components.push({
  id: 'ReadingProgressBar',
  title: 'Reading Progress Bar',
  description: 'Top reading progress bar tracking page scroll.',
  category: 'progress' as AnimationCategory,
  tags: ['progress', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ReadingProgressBar,
  controls: defaultControls,
});
components.push({
  id: 'ScrollPercentage',
  title: 'Scroll Percentage',
  description: 'Displays exact scroll percentage for the page.',
  category: 'progress' as AnimationCategory,
  tags: ['progress', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScrollPercentage,
  controls: defaultControls,
});
components.push({
  id: 'ScrollPositionTracker',
  title: 'Scroll Position Tracker',
  description: 'Tracks and displays exact scroll X/Y position.',
  category: 'progress' as AnimationCategory,
  tags: ['progress', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ScrollPositionTracker,
  controls: defaultControls,
});
components.push({
  id: 'SectionProgress',
  title: 'Section Progress',
  description: 'Progress through named content sections.',
  category: 'progress' as AnimationCategory,
  tags: ['progress', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SectionProgress,
  controls: defaultControls,
});
components.push({
  id: 'TimelineProgress',
  title: 'Timeline Progress',
  description: 'Timeline track fills through milestones.',
  category: 'progress' as AnimationCategory,
  tags: ['progress', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: TimelineProgress,
  controls: defaultControls,
});
components.push({
  id: 'BounceOnEnter',
  title: 'Bounce On Enter',
  description: 'Elements bounce on scroll into viewport.',
  category: 'physics' as AnimationCategory,
  tags: ['physics', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: BounceOnEnter,
  controls: defaultControls,
});
components.push({
  id: 'ElasticReveal',
  title: 'Elastic Reveal',
  description: 'Elements stretch and snap into place.',
  category: 'physics' as AnimationCategory,
  tags: ['physics', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ElasticReveal,
  controls: defaultControls,
});
components.push({
  id: 'FloatingObjects',
  title: 'Floating Objects',
  description: 'Objects float and bob on scroll movement.',
  category: 'physics' as AnimationCategory,
  tags: ['physics', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: FloatingObjects,
  controls: defaultControls,
});
components.push({
  id: 'InertiaMovement',
  title: 'Inertia Movement',
  description: 'Elements with delayed inertia on scroll.',
  category: 'physics' as AnimationCategory,
  tags: ['physics', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: InertiaMovement,
  controls: defaultControls,
});
components.push({
  id: 'MagneticSections',
  title: 'Magnetic Sections',
  description: 'Sections magnetically snap to center.',
  category: 'physics' as AnimationCategory,
  tags: ['physics', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MagneticSections,
  controls: defaultControls,
});
components.push({
  id: 'MomentumElements',
  title: 'Momentum Elements',
  description: 'Elements with continued motion after scroll stops.',
  category: 'physics' as AnimationCategory,
  tags: ['physics', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MomentumElements,
  controls: defaultControls,
});
components.push({
  id: 'PhysicsCards',
  title: 'Physics Cards',
  description: 'Cards with momentum-based physics motion.',
  category: 'physics' as AnimationCategory,
  tags: ['physics', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: PhysicsCards,
  controls: defaultControls,
});
components.push({
  id: 'SpringScrollMotion',
  title: 'Spring Scroll Motion',
  description: 'Elements overshoot with spring physics on scroll.',
  category: 'physics' as AnimationCategory,
  tags: ['physics', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: SpringScrollMotion,
  controls: defaultControls,
});
components.push({
  id: 'AnchorNavigation',
  title: 'Anchor Navigation',
  description: 'Smooth anchor scrolling with nav highlighting.',
  category: 'smooth-scroll' as AnimationCategory,
  tags: ['smooth-scroll', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, ScrollSmoother'],
  component: AnchorNavigation,
  controls: defaultControls,
});
components.push({
  id: 'CustomScrollContainer',
  title: 'Custom Scroll Container',
  description: 'Overflow container with ScrollTrigger scroller option.',
  category: 'smooth-scroll' as AnimationCategory,
  tags: ['smooth-scroll', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, ScrollSmoother'],
  component: CustomScrollContainer,
  controls: defaultControls,
});
components.push({
  id: 'HorizontalSmoothScroll',
  title: 'Horizontal Smooth Scroll',
  description: 'Horizontal smooth scrolling within pinned section.',
  category: 'smooth-scroll' as AnimationCategory,
  tags: ['smooth-scroll', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, ScrollSmoother'],
  component: HorizontalSmoothScroll,
  controls: defaultControls,
});
components.push({
  id: 'InfiniteSmoothScroll',
  title: 'Infinite Smooth Scroll',
  description: 'Endless scroll with pinned content cycling.',
  category: 'smooth-scroll' as AnimationCategory,
  tags: ['smooth-scroll', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, ScrollSmoother'],
  component: InfiniteSmoothScroll,
  controls: defaultControls,
});
components.push({
  id: 'LenisIntegration',
  title: 'Lenis Integration',
  description: 'Smooth scroll via Lenis synced with ScrollTrigger.',
  category: 'smooth-scroll' as AnimationCategory,
  tags: ['smooth-scroll', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, ScrollSmoother'],
  component: LenisIntegration,
  controls: defaultControls,
});
components.push({
  id: 'NativeSmoothScroll',
  title: 'Native Smooth Scroll',
  description: 'CSS smooth scroll behavior with section navigation.',
  category: 'smooth-scroll' as AnimationCategory,
  tags: ['smooth-scroll', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, ScrollSmoother'],
  component: NativeSmoothScroll,
  controls: defaultControls,
});
components.push({
  id: 'ScrollRestoration',
  title: 'Scroll Restoration',
  description: 'Position restore with sessionStorage on navigation.',
  category: 'smooth-scroll' as AnimationCategory,
  tags: ['smooth-scroll', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, ScrollSmoother'],
  component: ScrollRestoration,
  controls: defaultControls,
});
components.push({
  id: 'ScrollSmoother',
  title: 'Scroll Smoother',
  description: 'Parallax layers simulating smooth scroll effect.',
  category: 'smooth-scroll' as AnimationCategory,
  tags: ['smooth-scroll', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger, ScrollSmoother'],
  component: ScrollSmoother,
  controls: defaultControls,
});
components.push({
  id: 'BatchScrollTrigger',
  title: 'Batch Scroll Trigger',
  description: 'Efficient batch processing of 50+ elements.',
  category: 'performance' as AnimationCategory,
  tags: ['performance', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: BatchScrollTrigger,
  controls: defaultControls,
});
components.push({
  id: 'GPUAcceleratedTransforms',
  title: 'G P U Accelerated Transforms',
  description: 'Uses only transform and opacity for GPU speed.',
  category: 'performance' as AnimationCategory,
  tags: ['performance', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: GPUAcceleratedTransforms,
  controls: defaultControls,
});
components.push({
  id: 'IntersectionObserverFallback',
  title: 'Intersection Observer Fallback',
  description: 'IO fallback when ScrollTrigger unavailable.',
  category: 'performance' as AnimationCategory,
  tags: ['performance', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: IntersectionObserverFallback,
  controls: defaultControls,
});
components.push({
  id: 'LazyInitialization',
  title: 'Lazy Initialization',
  description: 'Triggers initialize near viewport only.',
  category: 'performance' as AnimationCategory,
  tags: ['performance', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: LazyInitialization,
  controls: defaultControls,
});
components.push({
  id: 'MemoryCleanup',
  title: 'Memory Cleanup',
  description: 'Shows proper kill, revert, and disable patterns.',
  category: 'performance' as AnimationCategory,
  tags: ['performance', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MemoryCleanup,
  controls: defaultControls,
});
components.push({
  id: 'MobileOptimizations',
  title: 'Mobile Optimizations',
  description: 'Mobile-aware triggers with responsive breakpoints.',
  category: 'performance' as AnimationCategory,
  tags: ['performance', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: MobileOptimizations,
  controls: defaultControls,
});
components.push({
  id: 'ReducedMotionSupport',
  title: 'Reduced Motion Support',
  description: 'Respects prefers-reduced-motion user setting.',
  category: 'performance' as AnimationCategory,
  tags: ['performance', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ReducedMotionSupport,
  controls: defaultControls,
});
components.push({
  id: 'ResponsiveTriggerManagement',
  title: 'Responsive Trigger Management',
  description: 'Triggers enable/disable per breakpoint.',
  category: 'performance' as AnimationCategory,
  tags: ['performance', 'scroll', 'gsap'],
  plugins: ['ScrollTrigger'],
  component: ResponsiveTriggerManagement,
  controls: defaultControls,
});
