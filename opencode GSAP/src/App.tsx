import React, { lazy, Suspense } from 'react';
import { ComponentPreview } from './components/playground/preview/ComponentPreview'
import CardNav from './components/ui/CardNav'
import { ThemeToggle } from './components/ui/ThemeToggle'
import heroVideo from '../ascii-magic-optimized.mp4'

// UI Demos
const ButtonDemo = lazy(() => import('./components/playground/demos/ButtonDemo'));
const ButtonDemoCode = lazy(() => import('./components/playground/demos/ButtonDemo?raw'));
const BadgeDemo = lazy(() => import('./components/playground/demos/BadgeDemo'));
const BadgeDemoCode = lazy(() => import('./components/playground/demos/BadgeDemo?raw'));
const InputDemo = lazy(() => import('./components/playground/demos/InputDemo'));
const InputDemoCode = lazy(() => import('./components/playground/demos/InputDemo?raw'));
const SelectDemo = lazy(() => import('./components/playground/demos/SelectDemo'));
const SelectDemoCode = lazy(() => import('./components/playground/demos/SelectDemo?raw'));
const SliderDemo = lazy(() => import('./components/playground/demos/SliderDemo'));
const SliderDemoCode = lazy(() => import('./components/playground/demos/SliderDemo?raw'));
const TabsDemo = lazy(() => import('./components/playground/demos/TabsDemo'));
const TabsDemoCode = lazy(() => import('./components/playground/demos/TabsDemo?raw'));
const DifficultyDemo = lazy(() => import('./components/playground/demos/DifficultyDemo'));
const DifficultyDemoCode = lazy(() => import('./components/playground/demos/DifficultyDemo?raw'));
const PluginBadgeDemo = lazy(() => import('./components/playground/demos/PluginBadgeDemo'));
const PluginBadgeDemoCode = lazy(() => import('./components/playground/demos/PluginBadgeDemo?raw'));

// Hooks Demos
const ThemeHookDemo = lazy(() => import('./components/playground/demos/ThemeHookDemo'));
const ThemeHookDemoCode = lazy(() => import('./components/playground/demos/ThemeHookDemo?raw'));
const MediaQueryHookDemo = lazy(() => import('./components/playground/demos/MediaQueryHookDemo'));
const MediaQueryHookDemoCode = lazy(() => import('./components/playground/demos/MediaQueryHookDemo?raw'));

// Utils Demos
const UtilsDemo = lazy(() => import('./components/playground/demos/UtilsDemo'));
const UtilsDemoCode = lazy(() => import('./components/playground/demos/UtilsDemo?raw'));

// Animation Components
const BasicTimeline = lazy(() => import('./animations/basics/BasicTimeline'));
const BasicTimelineCode = lazy(() => import('./animations/basics/BasicTimeline?raw'));
const BlinkEffect = lazy(() => import('./animations/basics/BlinkEffect'));
const BlinkEffectCode = lazy(() => import('./animations/basics/BlinkEffect?raw'));
const BounceBall = lazy(() => import('./animations/basics/BounceBall'));
const BounceBallCode = lazy(() => import('./animations/basics/BounceBall?raw'));
const BouncingBall = lazy(() => import('./animations/basics/BouncingBall'));
const BouncingBallCode = lazy(() => import('./animations/basics/BouncingBall?raw'));
const CallbackOrder = lazy(() => import('./animations/basics/CallbackOrder'));
const CallbackOrderCode = lazy(() => import('./animations/basics/CallbackOrder?raw'));
const DelayAnimation = lazy(() => import('./animations/basics/DelayAnimation'));
const DelayAnimationCode = lazy(() => import('./animations/basics/DelayAnimation?raw'));
const DurationControl = lazy(() => import('./animations/basics/DurationControl'));
const DurationControlCode = lazy(() => import('./animations/basics/DurationControl?raw'));
const EasingComparison = lazy(() => import('./animations/basics/EasingComparison'));
const EasingComparisonCode = lazy(() => import('./animations/basics/EasingComparison?raw'));
const FlipEffect = lazy(() => import('./animations/basics/FlipEffect'));
const FlipEffectCode = lazy(() => import('./animations/basics/FlipEffect?raw'));
const GSAPContext = lazy(() => import('./animations/basics/GSAPContext'));
const GSAPContextCode = lazy(() => import('./animations/basics/GSAPContext?raw'));
const GSAPFrom = lazy(() => import('./animations/basics/GSAPFrom'));
const GSAPFromCode = lazy(() => import('./animations/basics/GSAPFrom?raw'));
const GSAPFromTo = lazy(() => import('./animations/basics/GSAPFromTo'));
const GSAPFromToCode = lazy(() => import('./animations/basics/GSAPFromTo?raw'));
const GSAPSet = lazy(() => import('./animations/basics/GSAPSet'));
const GSAPSetCode = lazy(() => import('./animations/basics/GSAPSet?raw'));
const GSAPTo = lazy(() => import('./animations/basics/GSAPTo'));
const GSAPToCode = lazy(() => import('./animations/basics/GSAPTo?raw'));
const GlobalTimeline = lazy(() => import('./animations/basics/GlobalTimeline'));
const GlobalTimelineCode = lazy(() => import('./animations/basics/GlobalTimeline?raw'));
const KillTweens = lazy(() => import('./animations/basics/KillTweens'));
const KillTweensCode = lazy(() => import('./animations/basics/KillTweens?raw'));
const MoveX = lazy(() => import('./animations/basics/MoveX'));
const MoveXCode = lazy(() => import('./animations/basics/MoveX?raw'));
const MoveY = lazy(() => import('./animations/basics/MoveY'));
const MoveYCode = lazy(() => import('./animations/basics/MoveY?raw'));
const MultipleTargets = lazy(() => import('./animations/basics/MultipleTargets'));
const MultipleTargetsCode = lazy(() => import('./animations/basics/MultipleTargets?raw'));
const NestedTimeline = lazy(() => import('./animations/basics/NestedTimeline'));
const NestedTimelineCode = lazy(() => import('./animations/basics/NestedTimeline?raw'));
const OnComplete = lazy(() => import('./animations/basics/OnComplete'));
const OnCompleteCode = lazy(() => import('./animations/basics/OnComplete?raw'));
const OnRepeat = lazy(() => import('./animations/basics/OnRepeat'));
const OnRepeatCode = lazy(() => import('./animations/basics/OnRepeat?raw'));
const OnReverse = lazy(() => import('./animations/basics/OnReverse'));
const OnReverseCode = lazy(() => import('./animations/basics/OnReverse?raw'));
const OnStart = lazy(() => import('./animations/basics/OnStart'));
const OnStartCode = lazy(() => import('./animations/basics/OnStart?raw'));
const OnUpdate = lazy(() => import('./animations/basics/OnUpdate'));
const OnUpdateCode = lazy(() => import('./animations/basics/OnUpdate?raw'));
const OpacityFade = lazy(() => import('./animations/basics/OpacityFade'));
const OpacityFadeCode = lazy(() => import('./animations/basics/OpacityFade?raw'));
const PathMotion = lazy(() => import('./animations/basics/PathMotion'));
const PathMotionCode = lazy(() => import('./animations/basics/PathMotion?raw'));
const PlayControl = lazy(() => import('./animations/basics/PlayControl'));
const PlayControlCode = lazy(() => import('./animations/basics/PlayControl?raw'));
const PulseEffect = lazy(() => import('./animations/basics/PulseEffect'));
const PulseEffectCode = lazy(() => import('./animations/basics/PulseEffect?raw'));
const RepeatAnimation = lazy(() => import('./animations/basics/RepeatAnimation'));
const RepeatAnimationCode = lazy(() => import('./animations/basics/RepeatAnimation?raw'));
const RestartControl = lazy(() => import('./animations/basics/RestartControl'));
const RestartControlCode = lazy(() => import('./animations/basics/RestartControl?raw'));
const ReverseControl = lazy(() => import('./animations/basics/ReverseControl'));
const ReverseControlCode = lazy(() => import('./animations/basics/ReverseControl?raw'));
const Rotation = lazy(() => import('./animations/basics/Rotation'));
const RotationCode = lazy(() => import('./animations/basics/Rotation?raw'));
const Rotation3D = lazy(() => import('./animations/basics/Rotation3D'));
const Rotation3DCode = lazy(() => import('./animations/basics/Rotation3D?raw'));
const ScaleXY = lazy(() => import('./animations/basics/ScaleXY'));
const ScaleXYCode = lazy(() => import('./animations/basics/ScaleXY?raw'));
const SeekControl = lazy(() => import('./animations/basics/SeekControl'));
const SeekControlCode = lazy(() => import('./animations/basics/SeekControl?raw'));
const ShakeEffect = lazy(() => import('./animations/basics/ShakeEffect'));
const ShakeEffectCode = lazy(() => import('./animations/basics/ShakeEffect?raw'));
const SkewAnimation = lazy(() => import('./animations/basics/SkewAnimation'));
const SkewAnimationCode = lazy(() => import('./animations/basics/SkewAnimation?raw'));
const SpeedControl = lazy(() => import('./animations/basics/SpeedControl'));
const SpeedControlCode = lazy(() => import('./animations/basics/SpeedControl?raw'));
const StaggerAnimation = lazy(() => import('./animations/basics/StaggerAnimation'));
const StaggerAnimationCode = lazy(() => import('./animations/basics/StaggerAnimation?raw'));
const SwingEffect = lazy(() => import('./animations/basics/SwingEffect'));
const SwingEffectCode = lazy(() => import('./animations/basics/SwingEffect?raw'));
const TimelineCallbacks = lazy(() => import('./animations/basics/TimelineCallbacks'));
const TimelineCallbacksCode = lazy(() => import('./animations/basics/TimelineCallbacks?raw'));
const TimelineLabel = lazy(() => import('./animations/basics/TimelineLabel'));
const TimelineLabelCode = lazy(() => import('./animations/basics/TimelineLabel?raw'));
const TimelinePosition = lazy(() => import('./animations/basics/TimelinePosition'));
const TimelinePositionCode = lazy(() => import('./animations/basics/TimelinePosition?raw'));
const TimelineReverse = lazy(() => import('./animations/basics/TimelineReverse'));
const TimelineReverseCode = lazy(() => import('./animations/basics/TimelineReverse?raw'));
const TimelineStagger = lazy(() => import('./animations/basics/TimelineStagger'));
const TimelineStaggerCode = lazy(() => import('./animations/basics/TimelineStagger?raw'));
const TimelineTimeScale = lazy(() => import('./animations/basics/TimelineTimeScale'));
const TimelineTimeScaleCode = lazy(() => import('./animations/basics/TimelineTimeScale?raw'));
const TransformAll = lazy(() => import('./animations/basics/TransformAll'));
const TransformAllCode = lazy(() => import('./animations/basics/TransformAll?raw'));
const TransformOrigin = lazy(() => import('./animations/basics/TransformOrigin'));
const TransformOriginCode = lazy(() => import('./animations/basics/TransformOrigin?raw'));
const TranslateZ = lazy(() => import('./animations/basics/TranslateZ'));
const TranslateZCode = lazy(() => import('./animations/basics/TranslateZ?raw'));
const TypewriterEffect = lazy(() => import('./animations/basics/TypewriterEffect'));
const TypewriterEffectCode = lazy(() => import('./animations/basics/TypewriterEffect?raw'));
const WaveEffect = lazy(() => import('./animations/basics/WaveEffect'));
const WaveEffectCode = lazy(() => import('./animations/basics/WaveEffect?raw'));
const WobbleEffect = lazy(() => import('./animations/basics/WobbleEffect'));
const WobbleEffectCode = lazy(() => import('./animations/basics/WobbleEffect?raw'));
const BasicScrollTrigger = lazy(() => import('./animations/scroll/fundamentals/BasicScrollTrigger'));
const BasicScrollTriggerCode = lazy(() => import('./animations/scroll/fundamentals/BasicScrollTrigger?raw'));
const BatchAnimations = lazy(() => import('./animations/scroll/fundamentals/BatchAnimations'));
const BatchAnimationsCode = lazy(() => import('./animations/scroll/fundamentals/BatchAnimations?raw'));
const ContainerAnimation = lazy(() => import('./animations/scroll/fundamentals/ContainerAnimation'));
const ContainerAnimationCode = lazy(() => import('./animations/scroll/fundamentals/ContainerAnimation?raw'));
const DestroyRecreateTriggers = lazy(() => import('./animations/scroll/fundamentals/DestroyRecreateTriggers'));
const DestroyRecreateTriggersCode = lazy(() => import('./animations/scroll/fundamentals/DestroyRecreateTriggers?raw'));
const DynamicTriggerCreation = lazy(() => import('./animations/scroll/fundamentals/DynamicTriggerCreation'));
const DynamicTriggerCreationCode = lazy(() => import('./animations/scroll/fundamentals/DynamicTriggerCreation?raw'));
const HorizontalContainers = lazy(() => import('./animations/scroll/fundamentals/HorizontalContainers'));
const HorizontalContainersCode = lazy(() => import('./animations/scroll/fundamentals/HorizontalContainers?raw'));
const LazyLoadedScrollTrigger = lazy(() => import('./animations/scroll/fundamentals/LazyLoadedScrollTrigger'));
const LazyLoadedScrollTriggerCode = lazy(() => import('./animations/scroll/fundamentals/LazyLoadedScrollTrigger?raw'));
const MatchMediaResponsive = lazy(() => import('./animations/scroll/fundamentals/MatchMediaResponsive'));
const MatchMediaResponsiveCode = lazy(() => import('./animations/scroll/fundamentals/MatchMediaResponsive?raw'));
const NestedScrollTriggers = lazy(() => import('./animations/scroll/fundamentals/NestedScrollTriggers'));
const NestedScrollTriggersCode = lazy(() => import('./animations/scroll/fundamentals/NestedScrollTriggers?raw'));
const PinSpacing = lazy(() => import('./animations/scroll/fundamentals/PinSpacing'));
const PinSpacingCode = lazy(() => import('./animations/scroll/fundamentals/PinSpacing?raw'));
const PinningElement = lazy(() => import('./animations/scroll/fundamentals/PinningElement'));
const PinningElementCode = lazy(() => import('./animations/scroll/fundamentals/PinningElement?raw'));
const RefreshBehavior = lazy(() => import('./animations/scroll/fundamentals/RefreshBehavior'));
const RefreshBehaviorCode = lazy(() => import('./animations/scroll/fundamentals/RefreshBehavior?raw'));
const ScrollDirectionDetection = lazy(() => import('./animations/scroll/fundamentals/ScrollDirectionDetection'));
const ScrollDirectionDetectionCode = lazy(() => import('./animations/scroll/fundamentals/ScrollDirectionDetection?raw'));
const ScrollProgressTracking = lazy(() => import('./animations/scroll/fundamentals/ScrollProgressTracking'));
const ScrollProgressTrackingCode = lazy(() => import('./animations/scroll/fundamentals/ScrollProgressTracking?raw'));
const ScrollVelocity = lazy(() => import('./animations/scroll/fundamentals/ScrollVelocity'));
const ScrollVelocityCode = lazy(() => import('./animations/scroll/fundamentals/ScrollVelocity?raw'));
const ScrubAnimation = lazy(() => import('./animations/scroll/fundamentals/ScrubAnimation'));
const ScrubAnimationCode = lazy(() => import('./animations/scroll/fundamentals/ScrubAnimation?raw'));
const StartEndMarkers = lazy(() => import('./animations/scroll/fundamentals/StartEndMarkers'));
const StartEndMarkersCode = lazy(() => import('./animations/scroll/fundamentals/StartEndMarkers?raw'));
const ToggleActions = lazy(() => import('./animations/scroll/fundamentals/ToggleActions'));
const ToggleActionsCode = lazy(() => import('./animations/scroll/fundamentals/ToggleActions?raw'));
const BlurReveal = lazy(() => import('./animations/scroll/reveal/BlurReveal'));
const BlurRevealCode = lazy(() => import('./animations/scroll/reveal/BlurReveal?raw'));
const CharacterReveal = lazy(() => import('./animations/scroll/reveal/CharacterReveal'));
const CharacterRevealCode = lazy(() => import('./animations/scroll/reveal/CharacterReveal?raw'));
const ClipPathReveal = lazy(() => import('./animations/scroll/reveal/ClipPathReveal'));
const ClipPathRevealCode = lazy(() => import('./animations/scroll/reveal/ClipPathReveal?raw'));
const FadeDown = lazy(() => import('./animations/scroll/reveal/FadeDown'));
const FadeDownCode = lazy(() => import('./animations/scroll/reveal/FadeDown?raw'));
const FadeLeft = lazy(() => import('./animations/scroll/reveal/FadeLeft'));
const FadeLeftCode = lazy(() => import('./animations/scroll/reveal/FadeLeft?raw'));
const FadeRight = lazy(() => import('./animations/scroll/reveal/FadeRight'));
const FadeRightCode = lazy(() => import('./animations/scroll/reveal/FadeRight?raw'));
const FadeUp = lazy(() => import('./animations/scroll/reveal/FadeUp'));
const FadeUpCode = lazy(() => import('./animations/scroll/reveal/FadeUp?raw'));
const GalleryReveal = lazy(() => import('./animations/scroll/reveal/GalleryReveal'));
const GalleryRevealCode = lazy(() => import('./animations/scroll/reveal/GalleryReveal?raw'));
const HeroEntrance = lazy(() => import('./animations/scroll/reveal/HeroEntrance'));
const HeroEntranceCode = lazy(() => import('./animations/scroll/reveal/HeroEntrance?raw'));
const ImageReveal = lazy(() => import('./animations/scroll/reveal/ImageReveal'));
const ImageRevealCode = lazy(() => import('./animations/scroll/reveal/ImageReveal?raw'));
const LineReveal = lazy(() => import('./animations/scroll/reveal/LineReveal'));
const LineRevealCode = lazy(() => import('./animations/scroll/reveal/LineReveal?raw'));
const MaskReveal = lazy(() => import('./animations/scroll/reveal/MaskReveal'));
const MaskRevealCode = lazy(() => import('./animations/scroll/reveal/MaskReveal?raw'));
const MasonryReveal = lazy(() => import('./animations/scroll/reveal/MasonryReveal'));
const MasonryRevealCode = lazy(() => import('./animations/scroll/reveal/MasonryReveal?raw'));
const ScaleReveal = lazy(() => import('./animations/scroll/reveal/ScaleReveal'));
const ScaleRevealCode = lazy(() => import('./animations/scroll/reveal/ScaleReveal?raw'));
const SequentialCards = lazy(() => import('./animations/scroll/reveal/SequentialCards'));
const SequentialCardsCode = lazy(() => import('./animations/scroll/reveal/SequentialCards?raw'));
const SplitTextReveal = lazy(() => import('./animations/scroll/reveal/SplitTextReveal'));
const SplitTextRevealCode = lazy(() => import('./animations/scroll/reveal/SplitTextReveal?raw'));
const WordReveal = lazy(() => import('./animations/scroll/reveal/WordReveal'));
const WordRevealCode = lazy(() => import('./animations/scroll/reveal/WordReveal?raw'));
const LayeredPin = lazy(() => import('./animations/scroll/pinning/LayeredPin'));
const LayeredPinCode = lazy(() => import('./animations/scroll/pinning/LayeredPin?raw'));
const MultiSectionPin = lazy(() => import('./animations/scroll/pinning/MultiSectionPin'));
const MultiSectionPinCode = lazy(() => import('./animations/scroll/pinning/MultiSectionPin?raw'));
const PinWithTimeline = lazy(() => import('./animations/scroll/pinning/PinWithTimeline'));
const PinWithTimelineCode = lazy(() => import('./animations/scroll/pinning/PinWithTimeline?raw'));
const PinnedImage = lazy(() => import('./animations/scroll/pinning/PinnedImage'));
const PinnedImageCode = lazy(() => import('./animations/scroll/pinning/PinnedImage?raw'));
const PinnedProductShowcase = lazy(() => import('./animations/scroll/pinning/PinnedProductShowcase'));
const PinnedProductShowcaseCode = lazy(() => import('./animations/scroll/pinning/PinnedProductShowcase?raw'));
const PinnedText = lazy(() => import('./animations/scroll/pinning/PinnedText'));
const PinnedTextCode = lazy(() => import('./animations/scroll/pinning/PinnedText?raw'));
const ProgressivePin = lazy(() => import('./animations/scroll/pinning/ProgressivePin'));
const ProgressivePinCode = lazy(() => import('./animations/scroll/pinning/ProgressivePin?raw'));
const ScrollStorytelling = lazy(() => import('./animations/scroll/pinning/ScrollStorytelling'));
const ScrollStorytellingCode = lazy(() => import('./animations/scroll/pinning/ScrollStorytelling?raw'));
const SplitScreenPin = lazy(() => import('./animations/scroll/pinning/SplitScreenPin'));
const SplitScreenPinCode = lazy(() => import('./animations/scroll/pinning/SplitScreenPin?raw'));
const StickyHero = lazy(() => import('./animations/scroll/pinning/StickyHero'));
const StickyHeroCode = lazy(() => import('./animations/scroll/pinning/StickyHero?raw'));
const ColorTransitionScrub = lazy(() => import('./animations/scroll/scrub/ColorTransitionScrub'));
const ColorTransitionScrubCode = lazy(() => import('./animations/scroll/scrub/ColorTransitionScrub?raw'));
const ImageSequenceScrub = lazy(() => import('./animations/scroll/scrub/ImageSequenceScrub'));
const ImageSequenceScrubCode = lazy(() => import('./animations/scroll/scrub/ImageSequenceScrub?raw'));
const NumberCounterScrub = lazy(() => import('./animations/scroll/scrub/NumberCounterScrub'));
const NumberCounterScrubCode = lazy(() => import('./animations/scroll/scrub/NumberCounterScrub?raw'));
const RotationScrub = lazy(() => import('./animations/scroll/scrub/RotationScrub'));
const RotationScrubCode = lazy(() => import('./animations/scroll/scrub/RotationScrub?raw'));
const SVGMorphScrub = lazy(() => import('./animations/scroll/scrub/SVGMorphScrub'));
const SVGMorphScrubCode = lazy(() => import('./animations/scroll/scrub/SVGMorphScrub?raw'));
const SVGPathDrawing = lazy(() => import('./animations/scroll/scrub/SVGPathDrawing'));
const SVGPathDrawingCode = lazy(() => import('./animations/scroll/scrub/SVGPathDrawing?raw'));
const ScaleScrub = lazy(() => import('./animations/scroll/scrub/ScaleScrub'));
const ScaleScrubCode = lazy(() => import('./animations/scroll/scrub/ScaleScrub?raw'));
const SmoothScrub = lazy(() => import('./animations/scroll/scrub/SmoothScrub'));
const SmoothScrubCode = lazy(() => import('./animations/scroll/scrub/SmoothScrub?raw'));
const ThreeDPerspectiveScrub = lazy(() => import('./animations/scroll/scrub/ThreeDPerspectiveScrub'));
const ThreeDPerspectiveScrubCode = lazy(() => import('./animations/scroll/scrub/ThreeDPerspectiveScrub?raw'));
const TimelineScrub = lazy(() => import('./animations/scroll/scrub/TimelineScrub'));
const TimelineScrubCode = lazy(() => import('./animations/scroll/scrub/TimelineScrub?raw'));
const VideoScrub = lazy(() => import('./animations/scroll/scrub/VideoScrub'));
const VideoScrubCode = lazy(() => import('./animations/scroll/scrub/VideoScrub?raw'));
const HorizontalCards = lazy(() => import('./animations/scroll/horizontal/HorizontalCards'));
const HorizontalCardsCode = lazy(() => import('./animations/scroll/horizontal/HorizontalCards?raw'));
const HorizontalGallery = lazy(() => import('./animations/scroll/horizontal/HorizontalGallery'));
const HorizontalGalleryCode = lazy(() => import('./animations/scroll/horizontal/HorizontalGallery?raw'));
const HorizontalTimeline = lazy(() => import('./animations/scroll/horizontal/HorizontalTimeline'));
const HorizontalTimelineCode = lazy(() => import('./animations/scroll/horizontal/HorizontalTimeline?raw'));
const InfiniteHorizontalLoop = lazy(() => import('./animations/scroll/horizontal/InfiniteHorizontalLoop'));
const InfiniteHorizontalLoopCode = lazy(() => import('./animations/scroll/horizontal/InfiniteHorizontalLoop?raw'));
const MixedVerticalHorizontal = lazy(() => import('./animations/scroll/horizontal/MixedVerticalHorizontal'));
const MixedVerticalHorizontalCode = lazy(() => import('./animations/scroll/horizontal/MixedVerticalHorizontal?raw'));
const PortfolioSlider = lazy(() => import('./animations/scroll/horizontal/PortfolioSlider'));
const PortfolioSliderCode = lazy(() => import('./animations/scroll/horizontal/PortfolioSlider?raw'));
const ProductShowcase = lazy(() => import('./animations/scroll/horizontal/ProductShowcase'));
const ProductShowcaseCode = lazy(() => import('./animations/scroll/horizontal/ProductShowcase?raw'));
const StickyHorizontalScroll = lazy(() => import('./animations/scroll/horizontal/StickyHorizontalScroll'));
const StickyHorizontalScrollCode = lazy(() => import('./animations/scroll/horizontal/StickyHorizontalScroll?raw'));
const BackgroundParallax = lazy(() => import('./animations/scroll/parallax/BackgroundParallax'));
const BackgroundParallaxCode = lazy(() => import('./animations/scroll/parallax/BackgroundParallax?raw'));
const DepthBasedMovement = lazy(() => import('./animations/scroll/parallax/DepthBasedMovement'));
const DepthBasedMovementCode = lazy(() => import('./animations/scroll/parallax/DepthBasedMovement?raw'));
const FloatingLayers = lazy(() => import('./animations/scroll/parallax/FloatingLayers'));
const FloatingLayersCode = lazy(() => import('./animations/scroll/parallax/FloatingLayers?raw'));
const ImageParallax = lazy(() => import('./animations/scroll/parallax/ImageParallax'));
const ImageParallaxCode = lazy(() => import('./animations/scroll/parallax/ImageParallax?raw'));
const MouseScrollHybrid = lazy(() => import('./animations/scroll/parallax/MouseScrollHybrid'));
const MouseScrollHybridCode = lazy(() => import('./animations/scroll/parallax/MouseScrollHybrid?raw'));
const MultiLayerParallax = lazy(() => import('./animations/scroll/parallax/MultiLayerParallax'));
const MultiLayerParallaxCode = lazy(() => import('./animations/scroll/parallax/MultiLayerParallax?raw'));
const PerspectiveParallax = lazy(() => import('./animations/scroll/parallax/PerspectiveParallax'));
const PerspectiveParallaxCode = lazy(() => import('./animations/scroll/parallax/PerspectiveParallax?raw'));
const TextParallax = lazy(() => import('./animations/scroll/parallax/TextParallax'));
const TextParallaxCode = lazy(() => import('./animations/scroll/parallax/TextParallax?raw'));
const AnimatedLogo = lazy(() => import('./animations/scroll/svg/AnimatedLogo'));
const AnimatedLogoCode = lazy(() => import('./animations/scroll/svg/AnimatedLogo?raw'));
const SVGCircularProgress = lazy(() => import('./animations/scroll/svg/CircularProgress'));
const SVGCircularProgressCode = lazy(() => import('./animations/scroll/svg/CircularProgress?raw'));
const ConnectionLines = lazy(() => import('./animations/scroll/svg/ConnectionLines'));
const ConnectionLinesCode = lazy(() => import('./animations/scroll/svg/ConnectionLines?raw'));
const DrawSVGOnScroll = lazy(() => import('./animations/scroll/svg/DrawSVGOnScroll'));
const DrawSVGOnScrollCode = lazy(() => import('./animations/scroll/svg/DrawSVGOnScroll?raw'));
const DynamicGraphDrawing = lazy(() => import('./animations/scroll/svg/DynamicGraphDrawing'));
const DynamicGraphDrawingCode = lazy(() => import('./animations/scroll/svg/DynamicGraphDrawing?raw'));
const FollowMotionPath = lazy(() => import('./animations/scroll/svg/FollowMotionPath'));
const FollowMotionPathCode = lazy(() => import('./animations/scroll/svg/FollowMotionPath?raw'));
const MorphSVGOnScroll = lazy(() => import('./animations/scroll/svg/MorphSVGOnScroll'));
const MorphSVGOnScrollCode = lazy(() => import('./animations/scroll/svg/MorphSVGOnScroll?raw'));
const OrbitAnimation = lazy(() => import('./animations/scroll/svg/OrbitAnimation'));
const OrbitAnimationCode = lazy(() => import('./animations/scroll/svg/OrbitAnimation?raw'));
const SignatureAnimation = lazy(() => import('./animations/scroll/svg/SignatureAnimation'));
const SignatureAnimationCode = lazy(() => import('./animations/scroll/svg/SignatureAnimation?raw'));
const WaveDrawing = lazy(() => import('./animations/scroll/svg/WaveDrawing'));
const WaveDrawingCode = lazy(() => import('./animations/scroll/svg/WaveDrawing?raw'));
const BeforeAfterTransitions = lazy(() => import('./animations/scroll/timelines/BeforeAfterTransitions'));
const BeforeAfterTransitionsCode = lazy(() => import('./animations/scroll/timelines/BeforeAfterTransitions?raw'));
const InteractiveStorySections = lazy(() => import('./animations/scroll/timelines/InteractiveStorySections'));
const InteractiveStorySectionsCode = lazy(() => import('./animations/scroll/timelines/InteractiveStorySections?raw'));
const MultiSceneStorytelling = lazy(() => import('./animations/scroll/timelines/MultiSceneStorytelling'));
const MultiSceneStorytellingCode = lazy(() => import('./animations/scroll/timelines/MultiSceneStorytelling?raw'));
const NestedTimelines = lazy(() => import('./animations/scroll/timelines/NestedTimelines'));
const NestedTimelinesCode = lazy(() => import('./animations/scroll/timelines/NestedTimelines?raw'));
const ProductFeatureWalkthrough = lazy(() => import('./animations/scroll/timelines/ProductFeatureWalkthrough'));
const ProductFeatureWalkthroughCode = lazy(() => import('./animations/scroll/timelines/ProductFeatureWalkthrough?raw'));
const ScrollControlledSequences = lazy(() => import('./animations/scroll/timelines/ScrollControlledSequences'));
const ScrollControlledSequencesCode = lazy(() => import('./animations/scroll/timelines/ScrollControlledSequences?raw'));
const TimelineScrubbing = lazy(() => import('./animations/scroll/timelines/TimelineScrubbing'));
const TimelineScrubbingCode = lazy(() => import('./animations/scroll/timelines/TimelineScrubbing?raw'));
const AccordionScroll = lazy(() => import('./animations/scroll/cards/AccordionScroll'));
const AccordionScrollCode = lazy(() => import('./animations/scroll/cards/AccordionScroll?raw'));
const ExpandingCards = lazy(() => import('./animations/scroll/cards/ExpandingCards'));
const ExpandingCardsCode = lazy(() => import('./animations/scroll/cards/ExpandingCards?raw'));
const FloatingPanels = lazy(() => import('./animations/scroll/cards/FloatingPanels'));
const FloatingPanelsCode = lazy(() => import('./animations/scroll/cards/FloatingPanels?raw'));
const LayeredSections = lazy(() => import('./animations/scroll/cards/LayeredSections'));
const LayeredSectionsCode = lazy(() => import('./animations/scroll/cards/LayeredSections?raw'));
const ProgressiveReveal = lazy(() => import('./animations/scroll/cards/ProgressiveReveal'));
const ProgressiveRevealCode = lazy(() => import('./animations/scroll/cards/ProgressiveReveal?raw'));
const RotatingCards = lazy(() => import('./animations/scroll/cards/RotatingCards'));
const RotatingCardsCode = lazy(() => import('./animations/scroll/cards/RotatingCards?raw'));
const SectionSnap = lazy(() => import('./animations/scroll/cards/SectionSnap'));
const SectionSnapCode = lazy(() => import('./animations/scroll/cards/SectionSnap?raw'));
const StackingCards = lazy(() => import('./animations/scroll/cards/StackingCards'));
const StackingCardsCode = lazy(() => import('./animations/scroll/cards/StackingCards?raw'));
const TimelineCards = lazy(() => import('./animations/scroll/cards/TimelineCards'));
const TimelineCardsCode = lazy(() => import('./animations/scroll/cards/TimelineCards?raw'));
const BeforeAfterSlider = lazy(() => import('./animations/scroll/media/BeforeAfterSlider'));
const BeforeAfterSliderCode = lazy(() => import('./animations/scroll/media/BeforeAfterSlider?raw'));
const CrossfadeImages = lazy(() => import('./animations/scroll/media/CrossfadeImages'));
const CrossfadeImagesCode = lazy(() => import('./animations/scroll/media/CrossfadeImages?raw'));
const ImageSequencePlayback = lazy(() => import('./animations/scroll/media/ImageSequencePlayback'));
const ImageSequencePlaybackCode = lazy(() => import('./animations/scroll/media/ImageSequencePlayback?raw'));
const KenBurnsOnScroll = lazy(() => import('./animations/scroll/media/KenBurnsOnScroll'));
const KenBurnsOnScrollCode = lazy(() => import('./animations/scroll/media/KenBurnsOnScroll?raw'));
const LightboxEntrance = lazy(() => import('./animations/scroll/media/LightboxEntrance'));
const LightboxEntranceCode = lazy(() => import('./animations/scroll/media/LightboxEntrance?raw'));
const ProgressiveBlur = lazy(() => import('./animations/scroll/media/ProgressiveBlur'));
const ProgressiveBlurCode = lazy(() => import('./animations/scroll/media/ProgressiveBlur?raw'));
const VideoFrameAnimation = lazy(() => import('./animations/scroll/media/VideoFrameAnimation'));
const VideoFrameAnimationCode = lazy(() => import('./animations/scroll/media/VideoFrameAnimation?raw'));
const ZoomReveal = lazy(() => import('./animations/scroll/media/ZoomReveal'));
const ZoomRevealCode = lazy(() => import('./animations/scroll/media/ZoomReveal?raw'));
const CharacterCascade = lazy(() => import('./animations/scroll/text/CharacterCascade'));
const CharacterCascadeCode = lazy(() => import('./animations/scroll/text/CharacterCascade?raw'));
const GradientTextAnimation = lazy(() => import('./animations/scroll/text/GradientTextAnimation'));
const GradientTextAnimationCode = lazy(() => import('./animations/scroll/text/GradientTextAnimation?raw'));
const HighlightCurrentLine = lazy(() => import('./animations/scroll/text/HighlightCurrentLine'));
const HighlightCurrentLineCode = lazy(() => import('./animations/scroll/text/HighlightCurrentLine?raw'));
const MarqueeActivation = lazy(() => import('./animations/scroll/text/MarqueeActivation'));
const MarqueeActivationCode = lazy(() => import('./animations/scroll/text/MarqueeActivation?raw'));
const RollingHeadlines = lazy(() => import('./animations/scroll/text/RollingHeadlines'));
const RollingHeadlinesCode = lazy(() => import('./animations/scroll/text/RollingHeadlines?raw'));
const SplitTextScrollReveal = lazy(() => import('./animations/scroll/text/SplitTextScrollReveal'));
const SplitTextScrollRevealCode = lazy(() => import('./animations/scroll/text/SplitTextScrollReveal?raw'));
const StrokeDrawing = lazy(() => import('./animations/scroll/text/StrokeDrawing'));
const StrokeDrawingCode = lazy(() => import('./animations/scroll/text/StrokeDrawing?raw'));
const VariableFontWeightAnimation = lazy(() => import('./animations/scroll/text/VariableFontWeightAnimation'));
const VariableFontWeightAnimationCode = lazy(() => import('./animations/scroll/text/VariableFontWeightAnimation?raw'));
const ActiveNavIndicator = lazy(() => import('./animations/scroll/progress/ActiveNavIndicator'));
const ActiveNavIndicatorCode = lazy(() => import('./animations/scroll/progress/ActiveNavIndicator?raw'));
const ScrollCircularProgress = lazy(() => import('./animations/scroll/progress/CircularProgress'));
const ScrollCircularProgressCode = lazy(() => import('./animations/scroll/progress/CircularProgress?raw'));
const ReadingProgressBar = lazy(() => import('./animations/scroll/progress/ReadingProgressBar'));
const ReadingProgressBarCode = lazy(() => import('./animations/scroll/progress/ReadingProgressBar?raw'));
const ScrollPercentage = lazy(() => import('./animations/scroll/progress/ScrollPercentage'));
const ScrollPercentageCode = lazy(() => import('./animations/scroll/progress/ScrollPercentage?raw'));
const ScrollPositionTracker = lazy(() => import('./animations/scroll/progress/ScrollPositionTracker'));
const ScrollPositionTrackerCode = lazy(() => import('./animations/scroll/progress/ScrollPositionTracker?raw'));
const SectionProgress = lazy(() => import('./animations/scroll/progress/SectionProgress'));
const SectionProgressCode = lazy(() => import('./animations/scroll/progress/SectionProgress?raw'));
const TimelineProgress = lazy(() => import('./animations/scroll/progress/TimelineProgress'));
const TimelineProgressCode = lazy(() => import('./animations/scroll/progress/TimelineProgress?raw'));
const BounceOnEnter = lazy(() => import('./animations/scroll/physics/BounceOnEnter'));
const BounceOnEnterCode = lazy(() => import('./animations/scroll/physics/BounceOnEnter?raw'));
const ElasticReveal = lazy(() => import('./animations/scroll/physics/ElasticReveal'));
const ElasticRevealCode = lazy(() => import('./animations/scroll/physics/ElasticReveal?raw'));
const FloatingObjects = lazy(() => import('./animations/scroll/physics/FloatingObjects'));
const FloatingObjectsCode = lazy(() => import('./animations/scroll/physics/FloatingObjects?raw'));
const InertiaMovement = lazy(() => import('./animations/scroll/physics/InertiaMovement'));
const InertiaMovementCode = lazy(() => import('./animations/scroll/physics/InertiaMovement?raw'));
const MagneticSections = lazy(() => import('./animations/scroll/physics/MagneticSections'));
const MagneticSectionsCode = lazy(() => import('./animations/scroll/physics/MagneticSections?raw'));
const MomentumElements = lazy(() => import('./animations/scroll/physics/MomentumElements'));
const MomentumElementsCode = lazy(() => import('./animations/scroll/physics/MomentumElements?raw'));
const PhysicsCards = lazy(() => import('./animations/scroll/physics/PhysicsCards'));
const PhysicsCardsCode = lazy(() => import('./animations/scroll/physics/PhysicsCards?raw'));
const SpringBasedScrollMotion = lazy(() => import('./animations/scroll/physics/SpringBasedScrollMotion'));
const SpringBasedScrollMotionCode = lazy(() => import('./animations/scroll/physics/SpringBasedScrollMotion?raw'));
const AnchorNavigation = lazy(() => import('./animations/scroll/smooth/AnchorNavigation'));
const AnchorNavigationCode = lazy(() => import('./animations/scroll/smooth/AnchorNavigation?raw'));
const CustomScrollContainer = lazy(() => import('./animations/scroll/smooth/CustomScrollContainer'));
const CustomScrollContainerCode = lazy(() => import('./animations/scroll/smooth/CustomScrollContainer?raw'));
const HorizontalSmoothScroll = lazy(() => import('./animations/scroll/smooth/HorizontalSmoothScroll'));
const HorizontalSmoothScrollCode = lazy(() => import('./animations/scroll/smooth/HorizontalSmoothScroll?raw'));
const InfiniteSmoothScroll = lazy(() => import('./animations/scroll/smooth/InfiniteSmoothScroll'));
const InfiniteSmoothScrollCode = lazy(() => import('./animations/scroll/smooth/InfiniteSmoothScroll?raw'));
const LenisIntegration = lazy(() => import('./animations/scroll/smooth/LenisIntegration'));
const LenisIntegrationCode = lazy(() => import('./animations/scroll/smooth/LenisIntegration?raw'));
const NativeSmoothScroll = lazy(() => import('./animations/scroll/smooth/NativeSmoothScroll'));
const NativeSmoothScrollCode = lazy(() => import('./animations/scroll/smooth/NativeSmoothScroll?raw'));
const ScrollRestoration = lazy(() => import('./animations/scroll/smooth/ScrollRestoration'));
const ScrollRestorationCode = lazy(() => import('./animations/scroll/smooth/ScrollRestoration?raw'));
const ScrollSmootherIntegration = lazy(() => import('./animations/scroll/smooth/ScrollSmootherIntegration'));
const ScrollSmootherIntegrationCode = lazy(() => import('./animations/scroll/smooth/ScrollSmootherIntegration?raw'));
const BatchScrollTrigger = lazy(() => import('./animations/scroll/performance/BatchScrollTrigger'));
const BatchScrollTriggerCode = lazy(() => import('./animations/scroll/performance/BatchScrollTrigger?raw'));
const GPUAcceleratedTransforms = lazy(() => import('./animations/scroll/performance/GPUAcceleratedTransforms'));
const GPUAcceleratedTransformsCode = lazy(() => import('./animations/scroll/performance/GPUAcceleratedTransforms?raw'));
const IntersectionObserverFallback = lazy(() => import('./animations/scroll/performance/IntersectionObserverFallback'));
const IntersectionObserverFallbackCode = lazy(() => import('./animations/scroll/performance/IntersectionObserverFallback?raw'));
const LazyInitialization = lazy(() => import('./animations/scroll/performance/LazyInitialization'));
const LazyInitializationCode = lazy(() => import('./animations/scroll/performance/LazyInitialization?raw'));
const MemoryCleanup = lazy(() => import('./animations/scroll/performance/MemoryCleanup'));
const MemoryCleanupCode = lazy(() => import('./animations/scroll/performance/MemoryCleanup?raw'));
const MobileOptimizations = lazy(() => import('./animations/scroll/performance/MobileOptimizations'));
const MobileOptimizationsCode = lazy(() => import('./animations/scroll/performance/MobileOptimizations?raw'));
const ReducedMotionSupport = lazy(() => import('./animations/scroll/performance/ReducedMotionSupport'));
const ReducedMotionSupportCode = lazy(() => import('./animations/scroll/performance/ReducedMotionSupport?raw'));
const ResponsiveTriggerManagement = lazy(() => import('./animations/scroll/performance/ResponsiveTriggerManagement'));
const ResponsiveTriggerManagementCode = lazy(() => import('./animations/scroll/performance/ResponsiveTriggerManagement?raw'));
const SVGBounce = lazy(() => import('./animations/svg/SVGBounce'));
const SVGBounceCode = lazy(() => import('./animations/svg/SVGBounce?raw'));
const SVGCircleDraw = lazy(() => import('./animations/svg/SVGCircleDraw'));
const SVGCircleDrawCode = lazy(() => import('./animations/svg/SVGCircleDraw?raw'));
const SVGClock = lazy(() => import('./animations/svg/SVGClock'));
const SVGClockCode = lazy(() => import('./animations/svg/SVGClock?raw'));
const SVGColorChange = lazy(() => import('./animations/svg/SVGColorChange'));
const SVGColorChangeCode = lazy(() => import('./animations/svg/SVGColorChange?raw'));
const SVGDotsConnection = lazy(() => import('./animations/svg/SVGDotsConnection'));
const SVGDotsConnectionCode = lazy(() => import('./animations/svg/SVGDotsConnection?raw'));
const SVGDrawLine = lazy(() => import('./animations/svg/SVGDrawLine'));
const SVGDrawLineCode = lazy(() => import('./animations/svg/SVGDrawLine?raw'));
const SVGEqualizer = lazy(() => import('./animations/svg/SVGEqualizer'));
const SVGEqualizerCode = lazy(() => import('./animations/svg/SVGEqualizer?raw'));
const SVGFlower = lazy(() => import('./animations/svg/SVGFlower'));
const SVGFlowerCode = lazy(() => import('./animations/svg/SVGFlower?raw'));
const SVGGraphBar = lazy(() => import('./animations/svg/SVGGraphBar'));
const SVGGraphBarCode = lazy(() => import('./animations/svg/SVGGraphBar?raw'));
const SVGHamburger = lazy(() => import('./animations/svg/SVGHamburger'));
const SVGHamburgerCode = lazy(() => import('./animations/svg/SVGHamburger?raw'));
const SVGHeartbeat = lazy(() => import('./animations/svg/SVGHeartbeat'));
const SVGHeartbeatCode = lazy(() => import('./animations/svg/SVGHeartbeat?raw'));
const SVGInfinity = lazy(() => import('./animations/svg/SVGInfinity'));
const SVGInfinityCode = lazy(() => import('./animations/svg/SVGInfinity?raw'));
const SVGLoadingRing = lazy(() => import('./animations/svg/SVGLoadingRing'));
const SVGLoadingRingCode = lazy(() => import('./animations/svg/SVGLoadingRing?raw'));
const SVGMoonCycle = lazy(() => import('./animations/svg/SVGMoonCycle'));
const SVGMoonCycleCode = lazy(() => import('./animations/svg/SVGMoonCycle?raw'));
const SVGMorph = lazy(() => import('./animations/svg/SVGMorph'));
const SVGMorphCode = lazy(() => import('./animations/svg/SVGMorph?raw'));
const SVGPathAnimate = lazy(() => import('./animations/svg/SVGPathAnimate'));
const SVGPathAnimateCode = lazy(() => import('./animations/svg/SVGPathAnimate?raw'));
const SVGPieChart = lazy(() => import('./animations/svg/SVGPieChart'));
const SVGPieChartCode = lazy(() => import('./animations/svg/SVGPieChart?raw'));
const SVGProgressRing = lazy(() => import('./animations/svg/SVGProgressRing'));
const SVGProgressRingCode = lazy(() => import('./animations/svg/SVGProgressRing?raw'));
const SVGPulsingCircle = lazy(() => import('./animations/svg/SVGPulsingCircle'));
const SVGPulsingCircleCode = lazy(() => import('./animations/svg/SVGPulsingCircle?raw'));
const SVGRotate = lazy(() => import('./animations/svg/SVGRotate'));
const SVGRotateCode = lazy(() => import('./animations/svg/SVGRotate?raw'));
const SVGScale = lazy(() => import('./animations/svg/SVGScale'));
const SVGScaleCode = lazy(() => import('./animations/svg/SVGScale?raw'));
const SVGSineWave = lazy(() => import('./animations/svg/SVGSineWave'));
const SVGSineWaveCode = lazy(() => import('./animations/svg/SVGSineWave?raw'));
const SVGSpiral = lazy(() => import('./animations/svg/SVGSpiral'));
const SVGSpiralCode = lazy(() => import('./animations/svg/SVGSpiral?raw'));
const SVGStarTwinkle = lazy(() => import('./animations/svg/SVGStarTwinkle'));
const SVGStarTwinkleCode = lazy(() => import('./animations/svg/SVGStarTwinkle?raw'));
const SVGSunRays = lazy(() => import('./animations/svg/SVGSunRays'));
const SVGSunRaysCode = lazy(() => import('./animations/svg/SVGSunRays?raw'));
const BasicMotionPath = lazy(() => import('./animations/motion-path/BasicMotionPath'));
const BasicMotionPathCode = lazy(() => import('./animations/motion-path/BasicMotionPath?raw'));
const MotionPathAlign = lazy(() => import('./animations/motion-path/MotionPathAlign'));
const MotionPathAlignCode = lazy(() => import('./animations/motion-path/MotionPathAlign?raw'));
const MotionPathBounce = lazy(() => import('./animations/motion-path/MotionPathBounce'));
const MotionPathBounceCode = lazy(() => import('./animations/motion-path/MotionPathBounce?raw'));
const MotionPathCurve = lazy(() => import('./animations/motion-path/MotionPathCurve'));
const MotionPathCurveCode = lazy(() => import('./animations/motion-path/MotionPathCurve?raw'));
const MotionPathFigure8 = lazy(() => import('./animations/motion-path/MotionPathFigure8'));
const MotionPathFigure8Code = lazy(() => import('./animations/motion-path/MotionPathFigure8?raw'));
const MotionPathLoop = lazy(() => import('./animations/motion-path/MotionPathLoop'));
const MotionPathLoopCode = lazy(() => import('./animations/motion-path/MotionPathLoop?raw'));
const MotionPathMultiple = lazy(() => import('./animations/motion-path/MotionPathMultiple'));
const MotionPathMultipleCode = lazy(() => import('./animations/motion-path/MotionPathMultiple?raw'));
const MotionPathOrbit = lazy(() => import('./animations/motion-path/MotionPathOrbit'));
const MotionPathOrbitCode = lazy(() => import('./animations/motion-path/MotionPathOrbit?raw'));
const MotionPathRacing = lazy(() => import('./animations/motion-path/MotionPathRacing'));
const MotionPathRacingCode = lazy(() => import('./animations/motion-path/MotionPathRacing?raw'));
const MotionPathReverse = lazy(() => import('./animations/motion-path/MotionPathReverse'));
const MotionPathReverseCode = lazy(() => import('./animations/motion-path/MotionPathReverse?raw'));
const MotionPathSVG = lazy(() => import('./animations/motion-path/MotionPathSVG'));
const MotionPathSVGCode = lazy(() => import('./animations/motion-path/MotionPathSVG?raw'));
const MotionPathScroll = lazy(() => import('./animations/motion-path/MotionPathScroll'));
const MotionPathScrollCode = lazy(() => import('./animations/motion-path/MotionPathScroll?raw'));
const MotionPathSnake = lazy(() => import('./animations/motion-path/MotionPathSnake'));
const MotionPathSnakeCode = lazy(() => import('./animations/motion-path/MotionPathSnake?raw'));
const MotionPathStartEnd = lazy(() => import('./animations/motion-path/MotionPathStartEnd'));
const MotionPathStartEndCode = lazy(() => import('./animations/motion-path/MotionPathStartEnd?raw'));
const MotionPathWave = lazy(() => import('./animations/motion-path/MotionPathWave'));
const MotionPathWaveCode = lazy(() => import('./animations/motion-path/MotionPathWave?raw'));
const BouncePhysics = lazy(() => import('./animations/physics/BouncePhysics'));
const BouncePhysicsCode = lazy(() => import('./animations/physics/BouncePhysics?raw'));
const ChainReaction = lazy(() => import('./animations/physics/ChainReaction'));
const ChainReactionCode = lazy(() => import('./animations/physics/ChainReaction?raw'));
const ConfettiEffect = lazy(() => import('./animations/physics/ConfettiEffect'));
const ConfettiEffectCode = lazy(() => import('./animations/physics/ConfettiEffect?raw'));
const ElasticBounce = lazy(() => import('./animations/physics/ElasticBounce'));
const ElasticBounceCode = lazy(() => import('./animations/physics/ElasticBounce?raw'));
const ExplosionEffect = lazy(() => import('./animations/physics/ExplosionEffect'));
const ExplosionEffectCode = lazy(() => import('./animations/physics/ExplosionEffect?raw'));
const FloatingBubble = lazy(() => import('./animations/physics/FloatingBubble'));
const FloatingBubbleCode = lazy(() => import('./animations/physics/FloatingBubble?raw'));
const FrictionSlide = lazy(() => import('./animations/physics/FrictionSlide'));
const FrictionSlideCode = lazy(() => import('./animations/physics/FrictionSlide?raw'));
const GravityDrop = lazy(() => import('./animations/physics/GravityDrop'));
const GravityDropCode = lazy(() => import('./animations/physics/GravityDrop?raw'));
const ImplosionEffect = lazy(() => import('./animations/physics/ImplosionEffect'));
const ImplosionEffectCode = lazy(() => import('./animations/physics/ImplosionEffect?raw'));
const MagneticAttract = lazy(() => import('./animations/physics/MagneticAttract'));
const MagneticAttractCode = lazy(() => import('./animations/physics/MagneticAttract?raw'));
const OrbitPhysics = lazy(() => import('./animations/physics/OrbitPhysics'));
const OrbitPhysicsCode = lazy(() => import('./animations/physics/OrbitPhysics?raw'));
const ParticleSystem = lazy(() => import('./animations/physics/ParticleSystem'));
const ParticleSystemCode = lazy(() => import('./animations/physics/ParticleSystem?raw'));
const PendulumSwing = lazy(() => import('./animations/physics/PendulumSwing'));
const PendulumSwingCode = lazy(() => import('./animations/physics/PendulumSwing?raw'));
const ProjectileMotion = lazy(() => import('./animations/physics/ProjectileMotion'));
const ProjectileMotionCode = lazy(() => import('./animations/physics/ProjectileMotion?raw'));
const RainDrops = lazy(() => import('./animations/physics/RainDrops'));
const RainDropsCode = lazy(() => import('./animations/physics/RainDrops?raw'));
const RepelForce = lazy(() => import('./animations/physics/RepelForce'));
const RepelForceCode = lazy(() => import('./animations/physics/RepelForce?raw'));
const SnowFall = lazy(() => import('./animations/physics/SnowFall'));
const SnowFallCode = lazy(() => import('./animations/physics/SnowFall?raw'));
const SpringMotion = lazy(() => import('./animations/physics/SpringMotion'));
const SpringMotionCode = lazy(() => import('./animations/physics/SpringMotion?raw'));
const TrajectoryPath = lazy(() => import('./animations/physics/TrajectoryPath'));
const TrajectoryPathCode = lazy(() => import('./animations/physics/TrajectoryPath?raw'));
const WavePhysics = lazy(() => import('./animations/physics/WavePhysics'));
const WavePhysicsCode = lazy(() => import('./animations/physics/WavePhysics?raw'));
const BasicDrag = lazy(() => import('./animations/draggable/BasicDrag'));
const BasicDragCode = lazy(() => import('./animations/draggable/BasicDrag?raw'));
const DragAxis = lazy(() => import('./animations/draggable/DragAxis'));
const DragAxisCode = lazy(() => import('./animations/draggable/DragAxis?raw'));
const DragBoundary = lazy(() => import('./animations/draggable/DragBoundary'));
const DragBoundaryCode = lazy(() => import('./animations/draggable/DragBoundary?raw'));
const DragCarousel = lazy(() => import('./animations/draggable/DragCarousel'));
const DragCarouselCode = lazy(() => import('./animations/draggable/DragCarousel?raw'));
const DragColorPicker = lazy(() => import('./animations/draggable/DragColorPicker'));
const DragColorPickerCode = lazy(() => import('./animations/draggable/DragColorPicker?raw'));
const DragDrop = lazy(() => import('./animations/draggable/DragDrop'));
const DragDropCode = lazy(() => import('./animations/draggable/DragDrop?raw'));
const DragKnob = lazy(() => import('./animations/draggable/DragKnob'));
const DragKnobCode = lazy(() => import('./animations/draggable/DragKnob?raw'));
const DragMultiple = lazy(() => import('./animations/draggable/DragMultiple'));
const DragMultipleCode = lazy(() => import('./animations/draggable/DragMultiple?raw'));
const DragPath = lazy(() => import('./animations/draggable/DragPath'));
const DragPathCode = lazy(() => import('./animations/draggable/DragPath?raw'));
const DragPhysics = lazy(() => import('./animations/draggable/DragPhysics'));
const DragPhysicsCode = lazy(() => import('./animations/draggable/DragPhysics?raw'));
const DragReorder = lazy(() => import('./animations/draggable/DragReorder'));
const DragReorderCode = lazy(() => import('./animations/draggable/DragReorder?raw'));
const DragResize = lazy(() => import('./animations/draggable/DragResize'));
const DragResizeCode = lazy(() => import('./animations/draggable/DragResize?raw'));
const DragRotate = lazy(() => import('./animations/draggable/DragRotate'));
const DragRotateCode = lazy(() => import('./animations/draggable/DragRotate?raw'));
const DragScale = lazy(() => import('./animations/draggable/DragScale'));
const DragScaleCode = lazy(() => import('./animations/draggable/DragScale?raw'));
const DragSlider = lazy(() => import('./animations/draggable/DragSlider'));
const DragSliderCode = lazy(() => import('./animations/draggable/DragSlider?raw'));
const DragSnap = lazy(() => import('./animations/draggable/DragSnap'));
const DragSnapCode = lazy(() => import('./animations/draggable/DragSnap?raw'));
const DragSortable = lazy(() => import('./animations/draggable/DragSortable'));
const DragSortableCode = lazy(() => import('./animations/draggable/DragSortable?raw'));
const DragThrow = lazy(() => import('./animations/draggable/DragThrow'));
const DragThrowCode = lazy(() => import('./animations/draggable/DragThrow?raw'));
const DragTimeline = lazy(() => import('./animations/draggable/DragTimeline'));
const DragTimelineCode = lazy(() => import('./animations/draggable/DragTimeline?raw'));
const DragTouch = lazy(() => import('./animations/draggable/DragTouch'));
const DragTouchCode = lazy(() => import('./animations/draggable/DragTouch?raw'));
const BorderDrawButton = lazy(() => import('./animations/buttons/BorderDrawButton'));
const BorderDrawButtonCode = lazy(() => import('./animations/buttons/BorderDrawButton?raw'));
const ClickRippleButton = lazy(() => import('./animations/buttons/ClickRippleButton'));
const ClickRippleButtonCode = lazy(() => import('./animations/buttons/ClickRippleButton?raw'));
const GradientShiftButton = lazy(() => import('./animations/buttons/GradientShiftButton'));
const GradientShiftButtonCode = lazy(() => import('./animations/buttons/GradientShiftButton?raw'));
const HoverGlowButton = lazy(() => import('./animations/buttons/HoverGlowButton'));
const HoverGlowButtonCode = lazy(() => import('./animations/buttons/HoverGlowButton?raw'));
const MagneticButton = lazy(() => import('./animations/buttons/MagneticButton'));
const MagneticButtonCode = lazy(() => import('./animations/buttons/MagneticButton?raw'));
const PulseButton = lazy(() => import('./animations/buttons/PulseButton'));
const PulseButtonCode = lazy(() => import('./animations/buttons/PulseButton?raw'));
const ScalePressButton = lazy(() => import('./animations/buttons/ScalePressButton'));
const ScalePressButtonCode = lazy(() => import('./animations/buttons/ScalePressButton?raw'));
const ShakeButton = lazy(() => import('./animations/buttons/ShakeButton'));
const ShakeButtonCode = lazy(() => import('./animations/buttons/ShakeButton?raw'));
const SlideFillButton = lazy(() => import('./animations/buttons/SlideFillButton'));
const SlideFillButtonCode = lazy(() => import('./animations/buttons/SlideFillButton?raw'));
const TextRevealButton = lazy(() => import('./animations/buttons/TextRevealButton'));
const TextRevealButtonCode = lazy(() => import('./animations/buttons/TextRevealButton?raw'));
const BorderGlowCard = lazy(() => import('./animations/cards/BorderGlowCard'));
const BorderGlowCardCode = lazy(() => import('./animations/cards/BorderGlowCard?raw'));
const ExpandCard = lazy(() => import('./animations/cards/ExpandCard'));
const ExpandCardCode = lazy(() => import('./animations/cards/ExpandCard?raw'));
const FlipCardHover = lazy(() => import('./animations/cards/FlipCardHover'));
const FlipCardHoverCode = lazy(() => import('./animations/cards/FlipCardHover?raw'));
const HoverLiftCard = lazy(() => import('./animations/cards/HoverLiftCard'));
const HoverLiftCardCode = lazy(() => import('./animations/cards/HoverLiftCard?raw'));
const RevealCard = lazy(() => import('./animations/cards/RevealCard'));
const RevealCardCode = lazy(() => import('./animations/cards/RevealCard?raw'));
const SlideCard = lazy(() => import('./animations/cards/SlideCard'));
const SlideCardCode = lazy(() => import('./animations/cards/SlideCard?raw'));
const StackCard = lazy(() => import('./animations/cards/StackCard'));
const StackCardCode = lazy(() => import('./animations/cards/StackCard?raw'));
const TiltCard = lazy(() => import('./animations/cards/TiltCard'));
const TiltCardCode = lazy(() => import('./animations/cards/TiltCard?raw'));
const CursorHoverEffect = lazy(() => import('./animations/cursor/CursorHoverEffect'));
const CursorHoverEffectCode = lazy(() => import('./animations/cursor/CursorHoverEffect?raw'));
const CursorMagnetic = lazy(() => import('./animations/cursor/CursorMagnetic'));
const CursorMagneticCode = lazy(() => import('./animations/cursor/CursorMagnetic?raw'));
const CursorRing = lazy(() => import('./animations/cursor/CursorRing'));
const CursorRingCode = lazy(() => import('./animations/cursor/CursorRing?raw'));
const CursorText = lazy(() => import('./animations/cursor/CursorText'));
const CursorTextCode = lazy(() => import('./animations/cursor/CursorText?raw'));
const CursorTrail = lazy(() => import('./animations/cursor/CursorTrail'));
const CursorTrailCode = lazy(() => import('./animations/cursor/CursorTrail?raw'));
const CustomCursor = lazy(() => import('./animations/cursor/CustomCursor'));
const CustomCursorCode = lazy(() => import('./animations/cursor/CustomCursor?raw'));
const BounceLoader = lazy(() => import('./animations/loaders/BounceLoader'));
const BounceLoaderCode = lazy(() => import('./animations/loaders/BounceLoader?raw'));
const FlipLoader = lazy(() => import('./animations/loaders/FlipLoader'));
const FlipLoaderCode = lazy(() => import('./animations/loaders/FlipLoader?raw'));
const GradientLoader = lazy(() => import('./animations/loaders/GradientLoader'));
const GradientLoaderCode = lazy(() => import('./animations/loaders/GradientLoader?raw'));
const ProgressLoader = lazy(() => import('./animations/loaders/ProgressLoader'));
const ProgressLoaderCode = lazy(() => import('./animations/loaders/ProgressLoader?raw'));
const PulseLoader = lazy(() => import('./animations/loaders/PulseLoader'));
const PulseLoaderCode = lazy(() => import('./animations/loaders/PulseLoader?raw'));
const RingLoader = lazy(() => import('./animations/loaders/RingLoader'));
const RingLoaderCode = lazy(() => import('./animations/loaders/RingLoader?raw'));
const SpinningLoader = lazy(() => import('./animations/loaders/SpinningLoader'));
const SpinningLoaderCode = lazy(() => import('./animations/loaders/SpinningLoader?raw'));
const WaveLoader = lazy(() => import('./animations/loaders/WaveLoader'));
const WaveLoaderCode = lazy(() => import('./animations/loaders/WaveLoader?raw'));
const AccordionNav = lazy(() => import('./animations/navigation/AccordionNav'));
const AccordionNavCode = lazy(() => import('./animations/navigation/AccordionNav?raw'));
const DropdownAnimate = lazy(() => import('./animations/navigation/DropdownAnimate'));
const DropdownAnimateCode = lazy(() => import('./animations/navigation/DropdownAnimate?raw'));
const HoverUnderline = lazy(() => import('./animations/navigation/HoverUnderline'));
const HoverUnderlineCode = lazy(() => import('./animations/navigation/HoverUnderline?raw'));
const MenuReveal = lazy(() => import('./animations/navigation/MenuReveal'));
const MenuRevealCode = lazy(() => import('./animations/navigation/MenuReveal?raw'));
const MobileHamburger = lazy(() => import('./animations/navigation/MobileHamburger'));
const MobileHamburgerCode = lazy(() => import('./animations/navigation/MobileHamburger?raw'));
const NavIndicator = lazy(() => import('./animations/navigation/NavIndicator'));
const NavIndicatorCode = lazy(() => import('./animations/navigation/NavIndicator?raw'));
const HeroFadeIn = lazy(() => import('./animations/hero/HeroFadeIn'));
const HeroFadeInCode = lazy(() => import('./animations/hero/HeroFadeIn?raw'));
const HeroParallax = lazy(() => import('./animations/hero/HeroParallax'));
const HeroParallaxCode = lazy(() => import('./animations/hero/HeroParallax?raw'));
const HeroSplitReveal = lazy(() => import('./animations/hero/HeroSplitReveal'));
const HeroSplitRevealCode = lazy(() => import('./animations/hero/HeroSplitReveal?raw'));
const HeroTextReveal = lazy(() => import('./animations/hero/HeroTextReveal'));
const HeroTextRevealCode = lazy(() => import('./animations/hero/HeroTextReveal?raw'));
const HeroVideoPoster = lazy(() => import('./animations/hero/HeroVideoPoster'));
const HeroVideoPosterCode = lazy(() => import('./animations/hero/HeroVideoPoster?raw'));
const ConnectingDots = lazy(() => import('./animations/shapes/ConnectingDots'));
const ConnectingDotsCode = lazy(() => import('./animations/shapes/ConnectingDots?raw'));
const FloatingGeometric = lazy(() => import('./animations/shapes/FloatingGeometric'));
const FloatingGeometricCode = lazy(() => import('./animations/shapes/FloatingGeometric?raw'));
const GridAnimation = lazy(() => import('./animations/shapes/GridAnimation'));
const GridAnimationCode = lazy(() => import('./animations/shapes/GridAnimation?raw'));
const MorphingShape = lazy(() => import('./animations/shapes/MorphingShape'));
const MorphingShapeCode = lazy(() => import('./animations/shapes/MorphingShape?raw'));
const PulsingRing = lazy(() => import('./animations/shapes/PulsingRing'));
const PulsingRingCode = lazy(() => import('./animations/shapes/PulsingRing?raw'));
const RotatingShapes = lazy(() => import('./animations/shapes/RotatingShapes'));
const RotatingShapesCode = lazy(() => import('./animations/shapes/RotatingShapes?raw'));
const GradientShift = lazy(() => import('./animations/backgrounds/GradientShift'));
const GradientShiftCode = lazy(() => import('./animations/backgrounds/GradientShift?raw'));
const GridBackground = lazy(() => import('./animations/backgrounds/GridBackground'));
const GridBackgroundCode = lazy(() => import('./animations/backgrounds/GridBackground?raw'));
const ParticleBackground = lazy(() => import('./animations/backgrounds/ParticleBackground'));
const ParticleBackgroundCode = lazy(() => import('./animations/backgrounds/ParticleBackground?raw'));
const StarsBackground = lazy(() => import('./animations/backgrounds/StarsBackground'));
const StarsBackgroundCode = lazy(() => import('./animations/backgrounds/StarsBackground?raw'));
const WaveBackground = lazy(() => import('./animations/backgrounds/WaveBackground'));
const WaveBackgroundCode = lazy(() => import('./animations/backgrounds/WaveBackground?raw'));
const BarChartAnimated = lazy(() => import('./animations/charts/BarChartAnimated'));
const BarChartAnimatedCode = lazy(() => import('./animations/charts/BarChartAnimated?raw'));
const DonutChartAnimated = lazy(() => import('./animations/charts/DonutChartAnimated'));
const DonutChartAnimatedCode = lazy(() => import('./animations/charts/DonutChartAnimated?raw'));
const LineChartAnimated = lazy(() => import('./animations/charts/LineChartAnimated'));
const LineChartAnimatedCode = lazy(() => import('./animations/charts/LineChartAnimated?raw'));
const PieChartAnimated = lazy(() => import('./animations/charts/PieChartAnimated'));
const PieChartAnimatedCode = lazy(() => import('./animations/charts/PieChartAnimated?raw'));
const RadarChartAnimated = lazy(() => import('./animations/charts/RadarChartAnimated'));
const RadarChartAnimatedCode = lazy(() => import('./animations/charts/RadarChartAnimated?raw'));
const ConnectingLines = lazy(() => import('./animations/lines/ConnectingLines'));
const ConnectingLinesCode = lazy(() => import('./animations/lines/ConnectingLines?raw'));
const PulsingLines = lazy(() => import('./animations/lines/PulsingLines'));
const PulsingLinesCode = lazy(() => import('./animations/lines/PulsingLines?raw'));
const WaveLines = lazy(() => import('./animations/lines/WaveLines'));
const WaveLinesCode = lazy(() => import('./animations/lines/WaveLines?raw'));
const Fireflies = lazy(() => import('./animations/particles/Fireflies'));
const FirefliesCode = lazy(() => import('./animations/particles/Fireflies?raw'));
const FloatingParticles = lazy(() => import('./animations/particles/FloatingParticles'));
const FloatingParticlesCode = lazy(() => import('./animations/particles/FloatingParticles?raw'));
const Sparkles = lazy(() => import('./animations/particles/Sparkles'));
const SparklesCode = lazy(() => import('./animations/particles/Sparkles?raw'));

import './App.css'

function App() {
  const navItems = [
    {
      label: "GSAP Core",
      bgColor: "#1a1a26",
      textColor: "#e4e4f0",
      links: [
        { label: "Basics", href: "#basic-gsap" },
        { label: "SVG Arrays", href: "#svg-gsap" },
        { label: "Plugins", href: "#plugins" }
      ]
    },
    {
      label: "Interactions", 
      bgColor: "#2a2a3e",
      textColor: "#e4e4f0",
      links: [
        { label: "Scroll", href: "#scroll-gsap" },
        { label: "Hover", href: "#hover-gsap" },
        { label: "Transitions", href: "#page-transitions" }
      ]
    },
    {
      label: "Effects",
      bgColor: "#12121a", 
      textColor: "#e4e4f0",
      links: [
        { label: "Text Elements", href: "#text-gsap" },
        { label: "Advanced 3D", href: "#advanced-gsap" },
        { label: "Custom Hooks", href: "#hooks" }
      ]
    }
  ];

  return (
    <div className="min-h-screen text-[var(--color-text)] font-sans antialiased selection:bg-[var(--color-accent)] selection:text-white">
      
      {/* Global Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none mesh-gradient">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
          src={heroVideo}
        />
        {/* Deep fade so components at the bottom are readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/80 to-[var(--color-bg)] z-10" />
      </div>

      {/* Top Navbar Component */}
      <div className="relative z-50 w-full pt-8 pb-4">
        <CardNav
          items={navItems}
          baseColor="#0a0a0f"
          menuColor="#ffffff"
          buttonBgColor="#ffffff"
          buttonTextColor="#000000"
          ease="power3.out"
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 w-full overflow-hidden">
        
        {/* Top Badge */}
        <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 px-3 py-2 sm:py-1.5 rounded-xl sm:rounded-full bg-[#1e1e24] border border-gray-700 text-sm font-medium mb-8 max-w-full">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md text-xs font-bold tracking-wide shrink-0">New</span>
            <span className="text-gray-300 text-xs sm:text-sm">Releasing: Huge Collection of Custom GSAP Components</span>
          </div>
          <a href="#" className="text-white font-semibold hover:underline flex items-center gap-1 shrink-0 text-xs sm:text-sm mt-1 sm:mt-0">Learn more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        </div>

        {/* Hero Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-end">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-[3.5rem] md:text-[4.5rem] leading-[1.1] sm:leading-[1.05] font-semibold tracking-tight text-white mb-4 sm:mb-6">
              Make your UI run at its best with full visibility and control
            </h1>
          </div>
          <div className="lg:col-span-5 pb-2">
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-md">
              Basic component libraries are great at structure, but blind to how motion feels in production. Give your developers line-level execution context with these stunning GSAP animations.
            </p>
          </div>
        </div>
      </div>

      {/* Component Showcase area */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-16 py-12">
        <Suspense fallback={
          <div className="h-96 w-full flex flex-col items-center justify-center border border-white/5 rounded-2xl glass-light animate-pulse-glow">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mb-4"></div>
            <span className="text-white/60 text-lg font-medium tracking-wide">Loading Premium Components...</span>
          </div>
        }>
          <section id="basic-gsap" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Basic GSAP Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Basic Timeline" description="basic timeline animation" code={BasicTimelineCode}><BasicTimeline /></ComponentPreview>
              <ComponentPreview title="Blink Effect" description="blink effect animation" code={BlinkEffectCode}><BlinkEffect /></ComponentPreview>
              <ComponentPreview title="Bounce Ball" description="bounce ball animation" code={BounceBallCode}><BounceBall /></ComponentPreview>
              <ComponentPreview title="Bouncing Ball" description="bouncing ball animation" code={BouncingBallCode}><BouncingBall /></ComponentPreview>
              <ComponentPreview title="Callback Order" description="callback order animation" code={CallbackOrderCode}><CallbackOrder /></ComponentPreview>
              <ComponentPreview title="Delay Animation" description="delay animation animation" code={DelayAnimationCode}><DelayAnimation /></ComponentPreview>
              <ComponentPreview title="Duration Control" description="duration control animation" code={DurationControlCode}><DurationControl /></ComponentPreview>
              <ComponentPreview title="Easing Comparison" description="easing comparison animation" code={EasingComparisonCode}><EasingComparison /></ComponentPreview>
              <ComponentPreview title="Flip Effect" description="flip effect animation" code={FlipEffectCode}><FlipEffect /></ComponentPreview>
              <ComponentPreview title="GSAPContext" description="gsapcontext animation" code={GSAPContextCode}><GSAPContext /></ComponentPreview>
              <ComponentPreview title="GSAPFrom" description="gsapfrom animation" code={GSAPFromCode}><GSAPFrom /></ComponentPreview>
              <ComponentPreview title="GSAPFrom To" description="gsapfrom to animation" code={GSAPFromToCode}><GSAPFromTo /></ComponentPreview>
              <ComponentPreview title="GSAPSet" description="gsapset animation" code={GSAPSetCode}><GSAPSet /></ComponentPreview>
              <ComponentPreview title="GSAPTo" description="gsapto animation" code={GSAPToCode}><GSAPTo /></ComponentPreview>
              <ComponentPreview title="Global Timeline" description="global timeline animation" code={GlobalTimelineCode}><GlobalTimeline /></ComponentPreview>
              <ComponentPreview title="Kill Tweens" description="kill tweens animation" code={KillTweensCode}><KillTweens /></ComponentPreview>
              <ComponentPreview title="Move X" description="move x animation" code={MoveXCode}><MoveX /></ComponentPreview>
              <ComponentPreview title="Move Y" description="move y animation" code={MoveYCode}><MoveY /></ComponentPreview>
              <ComponentPreview title="Multiple Targets" description="multiple targets animation" code={MultipleTargetsCode}><MultipleTargets /></ComponentPreview>
              <ComponentPreview title="Nested Timeline" description="nested timeline animation" code={NestedTimelineCode}><NestedTimeline /></ComponentPreview>
              <ComponentPreview title="On Complete" description="on complete animation" code={OnCompleteCode}><OnComplete /></ComponentPreview>
              <ComponentPreview title="On Repeat" description="on repeat animation" code={OnRepeatCode}><OnRepeat /></ComponentPreview>
              <ComponentPreview title="On Reverse" description="on reverse animation" code={OnReverseCode}><OnReverse /></ComponentPreview>
              <ComponentPreview title="On Start" description="on start animation" code={OnStartCode}><OnStart /></ComponentPreview>
              <ComponentPreview title="On Update" description="on update animation" code={OnUpdateCode}><OnUpdate /></ComponentPreview>
              <ComponentPreview title="Opacity Fade" description="opacity fade animation" code={OpacityFadeCode}><OpacityFade /></ComponentPreview>
              <ComponentPreview title="Path Motion" description="path motion animation" code={PathMotionCode}><PathMotion /></ComponentPreview>
              <ComponentPreview title="Play Control" description="play control animation" code={PlayControlCode}><PlayControl /></ComponentPreview>
              <ComponentPreview title="Pulse Effect" description="pulse effect animation" code={PulseEffectCode}><PulseEffect /></ComponentPreview>
              <ComponentPreview title="Repeat Animation" description="repeat animation animation" code={RepeatAnimationCode}><RepeatAnimation /></ComponentPreview>
              <ComponentPreview title="Restart Control" description="restart control animation" code={RestartControlCode}><RestartControl /></ComponentPreview>
              <ComponentPreview title="Reverse Control" description="reverse control animation" code={ReverseControlCode}><ReverseControl /></ComponentPreview>
              <ComponentPreview title="Rotation" description="rotation animation" code={RotationCode}><Rotation /></ComponentPreview>
              <ComponentPreview title="Rotation3D" description="rotation3d animation" code={Rotation3DCode}><Rotation3D /></ComponentPreview>
              <ComponentPreview title="Scale XY" description="scale xy animation" code={ScaleXYCode}><ScaleXY /></ComponentPreview>
              <ComponentPreview title="Seek Control" description="seek control animation" code={SeekControlCode}><SeekControl /></ComponentPreview>
              <ComponentPreview title="Shake Effect" description="shake effect animation" code={ShakeEffectCode}><ShakeEffect /></ComponentPreview>
              <ComponentPreview title="Skew Animation" description="skew animation animation" code={SkewAnimationCode}><SkewAnimation /></ComponentPreview>
              <ComponentPreview title="Speed Control" description="speed control animation" code={SpeedControlCode}><SpeedControl /></ComponentPreview>
              <ComponentPreview title="Stagger Animation" description="stagger animation animation" code={StaggerAnimationCode}><StaggerAnimation /></ComponentPreview>
              <ComponentPreview title="Swing Effect" description="swing effect animation" code={SwingEffectCode}><SwingEffect /></ComponentPreview>
              <ComponentPreview title="Timeline Callbacks" description="timeline callbacks animation" code={TimelineCallbacksCode}><TimelineCallbacks /></ComponentPreview>
              <ComponentPreview title="Timeline Label" description="timeline label animation" code={TimelineLabelCode}><TimelineLabel /></ComponentPreview>
              <ComponentPreview title="Timeline Position" description="timeline position animation" code={TimelinePositionCode}><TimelinePosition /></ComponentPreview>
              <ComponentPreview title="Timeline Reverse" description="timeline reverse animation" code={TimelineReverseCode}><TimelineReverse /></ComponentPreview>
              <ComponentPreview title="Timeline Stagger" description="timeline stagger animation" code={TimelineStaggerCode}><TimelineStagger /></ComponentPreview>
              <ComponentPreview title="Timeline Time Scale" description="timeline time scale animation" code={TimelineTimeScaleCode}><TimelineTimeScale /></ComponentPreview>
              <ComponentPreview title="Transform All" description="transform all animation" code={TransformAllCode}><TransformAll /></ComponentPreview>
              <ComponentPreview title="Transform Origin" description="transform origin animation" code={TransformOriginCode}><TransformOrigin /></ComponentPreview>
              <ComponentPreview title="Translate Z" description="translate z animation" code={TranslateZCode}><TranslateZ /></ComponentPreview>
              <ComponentPreview title="Typewriter Effect" description="typewriter effect animation" code={TypewriterEffectCode}><TypewriterEffect /></ComponentPreview>
              <ComponentPreview title="Wave Effect" description="wave effect animation" code={WaveEffectCode}><WaveEffect /></ComponentPreview>
              <ComponentPreview title="Wobble Effect" description="wobble effect animation" code={WobbleEffectCode}><WobbleEffect /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-fundamentals" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              ScrollTrigger Fundamentals
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Basic Scroll Trigger" description="basic scroll trigger animation" code={BasicScrollTriggerCode}><BasicScrollTrigger /></ComponentPreview>
              <ComponentPreview title="Batch Animations" description="batch animations animation" code={BatchAnimationsCode}><BatchAnimations /></ComponentPreview>
              <ComponentPreview title="Container Animation" description="container animation animation" code={ContainerAnimationCode}><ContainerAnimation /></ComponentPreview>
              <ComponentPreview title="Destroy Recreate Triggers" description="destroy recreate triggers animation" code={DestroyRecreateTriggersCode}><DestroyRecreateTriggers /></ComponentPreview>
              <ComponentPreview title="Dynamic Trigger Creation" description="dynamic trigger creation animation" code={DynamicTriggerCreationCode}><DynamicTriggerCreation /></ComponentPreview>
              <ComponentPreview title="Horizontal Containers" description="horizontal containers animation" code={HorizontalContainersCode}><HorizontalContainers /></ComponentPreview>
              <ComponentPreview title="Lazy Loaded Scroll Trigger" description="lazy loaded scroll trigger animation" code={LazyLoadedScrollTriggerCode}><LazyLoadedScrollTrigger /></ComponentPreview>
              <ComponentPreview title="Match Media Responsive" description="match media responsive animation" code={MatchMediaResponsiveCode}><MatchMediaResponsive /></ComponentPreview>
              <ComponentPreview title="Nested Scroll Triggers" description="nested scroll triggers animation" code={NestedScrollTriggersCode}><NestedScrollTriggers /></ComponentPreview>
              <ComponentPreview title="Pin Spacing" description="pin spacing animation" code={PinSpacingCode}><PinSpacing /></ComponentPreview>
              <ComponentPreview title="Pinning Element" description="pinning element animation" code={PinningElementCode}><PinningElement /></ComponentPreview>
              <ComponentPreview title="Refresh Behavior" description="refresh behavior animation" code={RefreshBehaviorCode}><RefreshBehavior /></ComponentPreview>
              <ComponentPreview title="Scroll Direction Detection" description="scroll direction detection animation" code={ScrollDirectionDetectionCode}><ScrollDirectionDetection /></ComponentPreview>
              <ComponentPreview title="Scroll Progress Tracking" description="scroll progress tracking animation" code={ScrollProgressTrackingCode}><ScrollProgressTracking /></ComponentPreview>
              <ComponentPreview title="Scroll Velocity" description="scroll velocity animation" code={ScrollVelocityCode}><ScrollVelocity /></ComponentPreview>
              <ComponentPreview title="Scrub Animation" description="scrub animation animation" code={ScrubAnimationCode}><ScrubAnimation /></ComponentPreview>
              <ComponentPreview title="Start End Markers" description="start end markers animation" code={StartEndMarkersCode}><StartEndMarkers /></ComponentPreview>
              <ComponentPreview title="Toggle Actions" description="toggle actions animation" code={ToggleActionsCode}><ToggleActions /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-reveal" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Reveal Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Blur Reveal" description="blur reveal animation" code={BlurRevealCode}><BlurReveal /></ComponentPreview>
              <ComponentPreview title="Character Reveal" description="character reveal animation" code={CharacterRevealCode}><CharacterReveal /></ComponentPreview>
              <ComponentPreview title="Clip Path Reveal" description="clip path reveal animation" code={ClipPathRevealCode}><ClipPathReveal /></ComponentPreview>
              <ComponentPreview title="Fade Down" description="fade down animation" code={FadeDownCode}><FadeDown /></ComponentPreview>
              <ComponentPreview title="Fade Left" description="fade left animation" code={FadeLeftCode}><FadeLeft /></ComponentPreview>
              <ComponentPreview title="Fade Right" description="fade right animation" code={FadeRightCode}><FadeRight /></ComponentPreview>
              <ComponentPreview title="Fade Up" description="fade up animation" code={FadeUpCode}><FadeUp /></ComponentPreview>
              <ComponentPreview title="Gallery Reveal" description="gallery reveal animation" code={GalleryRevealCode}><GalleryReveal /></ComponentPreview>
              <ComponentPreview title="Hero Entrance" description="hero entrance animation" code={HeroEntranceCode}><HeroEntrance /></ComponentPreview>
              <ComponentPreview title="Image Reveal" description="image reveal animation" code={ImageRevealCode}><ImageReveal /></ComponentPreview>
              <ComponentPreview title="Line Reveal" description="line reveal animation" code={LineRevealCode}><LineReveal /></ComponentPreview>
              <ComponentPreview title="Mask Reveal" description="mask reveal animation" code={MaskRevealCode}><MaskReveal /></ComponentPreview>
              <ComponentPreview title="Masonry Reveal" description="masonry reveal animation" code={MasonryRevealCode}><MasonryReveal /></ComponentPreview>
              <ComponentPreview title="Scale Reveal" description="scale reveal animation" code={ScaleRevealCode}><ScaleReveal /></ComponentPreview>
              <ComponentPreview title="Sequential Cards" description="sequential cards animation" code={SequentialCardsCode}><SequentialCards /></ComponentPreview>
              <ComponentPreview title="Split Text Reveal" description="split text reveal animation" code={SplitTextRevealCode}><SplitTextReveal /></ComponentPreview>
              <ComponentPreview title="Word Reveal" description="word reveal animation" code={WordRevealCode}><WordReveal /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-pinning" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Pinning Effects
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Layered Pin" description="layered pin animation" code={LayeredPinCode}><LayeredPin /></ComponentPreview>
              <ComponentPreview title="Multi Section Pin" description="multi section pin animation" code={MultiSectionPinCode}><MultiSectionPin /></ComponentPreview>
              <ComponentPreview title="Pin With Timeline" description="pin with timeline animation" code={PinWithTimelineCode}><PinWithTimeline /></ComponentPreview>
              <ComponentPreview title="Pinned Image" description="pinned image animation" code={PinnedImageCode}><PinnedImage /></ComponentPreview>
              <ComponentPreview title="Pinned Product Showcase" description="pinned product showcase animation" code={PinnedProductShowcaseCode}><PinnedProductShowcase /></ComponentPreview>
              <ComponentPreview title="Pinned Text" description="pinned text animation" code={PinnedTextCode}><PinnedText /></ComponentPreview>
              <ComponentPreview title="Progressive Pin" description="progressive pin animation" code={ProgressivePinCode}><ProgressivePin /></ComponentPreview>
              <ComponentPreview title="Scroll Storytelling" description="scroll storytelling animation" code={ScrollStorytellingCode}><ScrollStorytelling /></ComponentPreview>
              <ComponentPreview title="Split Screen Pin" description="split screen pin animation" code={SplitScreenPinCode}><SplitScreenPin /></ComponentPreview>
              <ComponentPreview title="Sticky Hero" description="sticky hero animation" code={StickyHeroCode}><StickyHero /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-scrub" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Scrub Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Color Transition Scrub" description="color transition scrub animation" code={ColorTransitionScrubCode}><ColorTransitionScrub /></ComponentPreview>
              <ComponentPreview title="Image Sequence Scrub" description="image sequence scrub animation" code={ImageSequenceScrubCode}><ImageSequenceScrub /></ComponentPreview>
              <ComponentPreview title="Number Counter Scrub" description="number counter scrub animation" code={NumberCounterScrubCode}><NumberCounterScrub /></ComponentPreview>
              <ComponentPreview title="Rotation Scrub" description="rotation scrub animation" code={RotationScrubCode}><RotationScrub /></ComponentPreview>
              <ComponentPreview title="SVGMorph Scrub" description="svgmorph scrub animation" code={SVGMorphScrubCode}><SVGMorphScrub /></ComponentPreview>
              <ComponentPreview title="SVGPath Drawing" description="svgpath drawing animation" code={SVGPathDrawingCode}><SVGPathDrawing /></ComponentPreview>
              <ComponentPreview title="Scale Scrub" description="scale scrub animation" code={ScaleScrubCode}><ScaleScrub /></ComponentPreview>
              <ComponentPreview title="Smooth Scrub" description="smooth scrub animation" code={SmoothScrubCode}><SmoothScrub /></ComponentPreview>
              <ComponentPreview title="Three DPerspective Scrub" description="three dperspective scrub animation" code={ThreeDPerspectiveScrubCode}><ThreeDPerspectiveScrub /></ComponentPreview>
              <ComponentPreview title="Timeline Scrub" description="timeline scrub animation" code={TimelineScrubCode}><TimelineScrub /></ComponentPreview>
              <ComponentPreview title="Video Scrub" description="video scrub animation" code={VideoScrubCode}><VideoScrub /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-horizontal" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Horizontal Scrolling
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Horizontal Cards" description="horizontal cards animation" code={HorizontalCardsCode}><HorizontalCards /></ComponentPreview>
              <ComponentPreview title="Horizontal Gallery" description="horizontal gallery animation" code={HorizontalGalleryCode}><HorizontalGallery /></ComponentPreview>
              <ComponentPreview title="Horizontal Timeline" description="horizontal timeline animation" code={HorizontalTimelineCode}><HorizontalTimeline /></ComponentPreview>
              <ComponentPreview title="Infinite Horizontal Loop" description="infinite horizontal loop animation" code={InfiniteHorizontalLoopCode}><InfiniteHorizontalLoop /></ComponentPreview>
              <ComponentPreview title="Mixed Vertical Horizontal" description="mixed vertical horizontal animation" code={MixedVerticalHorizontalCode}><MixedVerticalHorizontal /></ComponentPreview>
              <ComponentPreview title="Portfolio Slider" description="portfolio slider animation" code={PortfolioSliderCode}><PortfolioSlider /></ComponentPreview>
              <ComponentPreview title="Product Showcase" description="product showcase animation" code={ProductShowcaseCode}><ProductShowcase /></ComponentPreview>
              <ComponentPreview title="Sticky Horizontal Scroll" description="sticky horizontal scroll animation" code={StickyHorizontalScrollCode}><StickyHorizontalScroll /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-parallax" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Parallax
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Background Parallax" description="background parallax animation" code={BackgroundParallaxCode}><BackgroundParallax /></ComponentPreview>
              <ComponentPreview title="Depth Based Movement" description="depth based movement animation" code={DepthBasedMovementCode}><DepthBasedMovement /></ComponentPreview>
              <ComponentPreview title="Floating Layers" description="floating layers animation" code={FloatingLayersCode}><FloatingLayers /></ComponentPreview>
              <ComponentPreview title="Image Parallax" description="image parallax animation" code={ImageParallaxCode}><ImageParallax /></ComponentPreview>
              <ComponentPreview title="Mouse Scroll Hybrid" description="mouse scroll hybrid animation" code={MouseScrollHybridCode}><MouseScrollHybrid /></ComponentPreview>
              <ComponentPreview title="Multi Layer Parallax" description="multi layer parallax animation" code={MultiLayerParallaxCode}><MultiLayerParallax /></ComponentPreview>
              <ComponentPreview title="Perspective Parallax" description="perspective parallax animation" code={PerspectiveParallaxCode}><PerspectiveParallax /></ComponentPreview>
              <ComponentPreview title="Text Parallax" description="text parallax animation" code={TextParallaxCode}><TextParallax /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-svg" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              SVG Scroll Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Animated Logo" description="animated logo animation" code={AnimatedLogoCode}><AnimatedLogo /></ComponentPreview>
              <ComponentPreview title="Circular Progress" description="circular progress animation" code={SVGCircularProgressCode}><SVGCircularProgress /></ComponentPreview>
              <ComponentPreview title="Connection Lines" description="connection lines animation" code={ConnectionLinesCode}><ConnectionLines /></ComponentPreview>
              <ComponentPreview title="Draw SVGOn Scroll" description="draw svgon scroll animation" code={DrawSVGOnScrollCode}><DrawSVGOnScroll /></ComponentPreview>
              <ComponentPreview title="Dynamic Graph Drawing" description="dynamic graph drawing animation" code={DynamicGraphDrawingCode}><DynamicGraphDrawing /></ComponentPreview>
              <ComponentPreview title="Follow Motion Path" description="follow motion path animation" code={FollowMotionPathCode}><FollowMotionPath /></ComponentPreview>
              <ComponentPreview title="Morph SVGOn Scroll" description="morph svgon scroll animation" code={MorphSVGOnScrollCode}><MorphSVGOnScroll /></ComponentPreview>
              <ComponentPreview title="Orbit Animation" description="orbit animation animation" code={OrbitAnimationCode}><OrbitAnimation /></ComponentPreview>
              <ComponentPreview title="Signature Animation" description="signature animation animation" code={SignatureAnimationCode}><SignatureAnimation /></ComponentPreview>
              <ComponentPreview title="Wave Drawing" description="wave drawing animation" code={WaveDrawingCode}><WaveDrawing /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-timelines" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Advanced Timelines
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Before After Transitions" description="before after transitions animation" code={BeforeAfterTransitionsCode}><BeforeAfterTransitions /></ComponentPreview>
              <ComponentPreview title="Interactive Story Sections" description="interactive story sections animation" code={InteractiveStorySectionsCode}><InteractiveStorySections /></ComponentPreview>
              <ComponentPreview title="Multi Scene Storytelling" description="multi scene storytelling animation" code={MultiSceneStorytellingCode}><MultiSceneStorytelling /></ComponentPreview>
              <ComponentPreview title="Nested Timelines" description="nested timelines animation" code={NestedTimelinesCode}><NestedTimelines /></ComponentPreview>
              <ComponentPreview title="Product Feature Walkthrough" description="product feature walkthrough animation" code={ProductFeatureWalkthroughCode}><ProductFeatureWalkthrough /></ComponentPreview>
              <ComponentPreview title="Scroll Controlled Sequences" description="scroll controlled sequences animation" code={ScrollControlledSequencesCode}><ScrollControlledSequences /></ComponentPreview>
              <ComponentPreview title="Timeline Scrubbing" description="timeline scrubbing animation" code={TimelineScrubbingCode}><TimelineScrubbing /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-cards" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Cards & Sections
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Accordion Scroll" description="accordion scroll animation" code={AccordionScrollCode}><AccordionScroll /></ComponentPreview>
              <ComponentPreview title="Expanding Cards" description="expanding cards animation" code={ExpandingCardsCode}><ExpandingCards /></ComponentPreview>
              <ComponentPreview title="Floating Panels" description="floating panels animation" code={FloatingPanelsCode}><FloatingPanels /></ComponentPreview>
              <ComponentPreview title="Layered Sections" description="layered sections animation" code={LayeredSectionsCode}><LayeredSections /></ComponentPreview>
              <ComponentPreview title="Progressive Reveal" description="progressive reveal animation" code={ProgressiveRevealCode}><ProgressiveReveal /></ComponentPreview>
              <ComponentPreview title="Rotating Cards" description="rotating cards animation" code={RotatingCardsCode}><RotatingCards /></ComponentPreview>
              <ComponentPreview title="Section Snap" description="section snap animation" code={SectionSnapCode}><SectionSnap /></ComponentPreview>
              <ComponentPreview title="Stacking Cards" description="stacking cards animation" code={StackingCardsCode}><StackingCards /></ComponentPreview>
              <ComponentPreview title="Timeline Cards" description="timeline cards animation" code={TimelineCardsCode}><TimelineCards /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-media" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Image & Media Effects
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Before After Slider" description="before after slider animation" code={BeforeAfterSliderCode}><BeforeAfterSlider /></ComponentPreview>
              <ComponentPreview title="Crossfade Images" description="crossfade images animation" code={CrossfadeImagesCode}><CrossfadeImages /></ComponentPreview>
              <ComponentPreview title="Image Sequence Playback" description="image sequence playback animation" code={ImageSequencePlaybackCode}><ImageSequencePlayback /></ComponentPreview>
              <ComponentPreview title="Ken Burns On Scroll" description="ken burns on scroll animation" code={KenBurnsOnScrollCode}><KenBurnsOnScroll /></ComponentPreview>
              <ComponentPreview title="Lightbox Entrance" description="lightbox entrance animation" code={LightboxEntranceCode}><LightboxEntrance /></ComponentPreview>
              <ComponentPreview title="Progressive Blur" description="progressive blur animation" code={ProgressiveBlurCode}><ProgressiveBlur /></ComponentPreview>
              <ComponentPreview title="Video Frame Animation" description="video frame animation animation" code={VideoFrameAnimationCode}><VideoFrameAnimation /></ComponentPreview>
              <ComponentPreview title="Zoom Reveal" description="zoom reveal animation" code={ZoomRevealCode}><ZoomReveal /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-text" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Text Effects
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Character Cascade" description="character cascade animation" code={CharacterCascadeCode}><CharacterCascade /></ComponentPreview>
              <ComponentPreview title="Gradient Text Animation" description="gradient text animation animation" code={GradientTextAnimationCode}><GradientTextAnimation /></ComponentPreview>
              <ComponentPreview title="Highlight Current Line" description="highlight current line animation" code={HighlightCurrentLineCode}><HighlightCurrentLine /></ComponentPreview>
              <ComponentPreview title="Marquee Activation" description="marquee activation animation" code={MarqueeActivationCode}><MarqueeActivation /></ComponentPreview>
              <ComponentPreview title="Rolling Headlines" description="rolling headlines animation" code={RollingHeadlinesCode}><RollingHeadlines /></ComponentPreview>
              <ComponentPreview title="Split Text Scroll Reveal" description="split text scroll reveal animation" code={SplitTextScrollRevealCode}><SplitTextScrollReveal /></ComponentPreview>
              <ComponentPreview title="Stroke Drawing" description="stroke drawing animation" code={StrokeDrawingCode}><StrokeDrawing /></ComponentPreview>
              <ComponentPreview title="Variable Font Weight Animation" description="variable font weight animation animation" code={VariableFontWeightAnimationCode}><VariableFontWeightAnimation /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-progress" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Progress Indicators
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Active Nav Indicator" description="active nav indicator animation" code={ActiveNavIndicatorCode}><ActiveNavIndicator /></ComponentPreview>
              <ComponentPreview title="Circular Progress" description="circular progress animation" code={ScrollCircularProgressCode}><ScrollCircularProgress /></ComponentPreview>
              <ComponentPreview title="Reading Progress Bar" description="reading progress bar animation" code={ReadingProgressBarCode}><ReadingProgressBar /></ComponentPreview>
              <ComponentPreview title="Scroll Percentage" description="scroll percentage animation" code={ScrollPercentageCode}><ScrollPercentage /></ComponentPreview>
              <ComponentPreview title="Scroll Position Tracker" description="scroll position tracker animation" code={ScrollPositionTrackerCode}><ScrollPositionTracker /></ComponentPreview>
              <ComponentPreview title="Section Progress" description="section progress animation" code={SectionProgressCode}><SectionProgress /></ComponentPreview>
              <ComponentPreview title="Timeline Progress" description="timeline progress animation" code={TimelineProgressCode}><TimelineProgress /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-physics" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Physics & Interactive Scroll
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Bounce On Enter" description="bounce on enter animation" code={BounceOnEnterCode}><BounceOnEnter /></ComponentPreview>
              <ComponentPreview title="Elastic Reveal" description="elastic reveal animation" code={ElasticRevealCode}><ElasticReveal /></ComponentPreview>
              <ComponentPreview title="Floating Objects" description="floating objects animation" code={FloatingObjectsCode}><FloatingObjects /></ComponentPreview>
              <ComponentPreview title="Inertia Movement" description="inertia movement animation" code={InertiaMovementCode}><InertiaMovement /></ComponentPreview>
              <ComponentPreview title="Magnetic Sections" description="magnetic sections animation" code={MagneticSectionsCode}><MagneticSections /></ComponentPreview>
              <ComponentPreview title="Momentum Elements" description="momentum elements animation" code={MomentumElementsCode}><MomentumElements /></ComponentPreview>
              <ComponentPreview title="Physics Cards" description="physics cards animation" code={PhysicsCardsCode}><PhysicsCards /></ComponentPreview>
              <ComponentPreview title="Spring Based Scroll Motion" description="spring based scroll motion animation" code={SpringBasedScrollMotionCode}><SpringBasedScrollMotion /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-smooth" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Smooth Scrolling
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Anchor Navigation" description="anchor navigation animation" code={AnchorNavigationCode}><AnchorNavigation /></ComponentPreview>
              <ComponentPreview title="Custom Scroll Container" description="custom scroll container animation" code={CustomScrollContainerCode}><CustomScrollContainer /></ComponentPreview>
              <ComponentPreview title="Horizontal Smooth Scroll" description="horizontal smooth scroll animation" code={HorizontalSmoothScrollCode}><HorizontalSmoothScroll /></ComponentPreview>
              <ComponentPreview title="Infinite Smooth Scroll" description="infinite smooth scroll animation" code={InfiniteSmoothScrollCode}><InfiniteSmoothScroll /></ComponentPreview>
              <ComponentPreview title="Lenis Integration" description="lenis integration animation" code={LenisIntegrationCode}><LenisIntegration /></ComponentPreview>
              <ComponentPreview title="Native Smooth Scroll" description="native smooth scroll animation" code={NativeSmoothScrollCode}><NativeSmoothScroll /></ComponentPreview>
              <ComponentPreview title="Scroll Restoration" description="scroll restoration animation" code={ScrollRestorationCode}><ScrollRestoration /></ComponentPreview>
              <ComponentPreview title="Scroll Smoother Integration" description="scroll smoother integration animation" code={ScrollSmootherIntegrationCode}><ScrollSmootherIntegration /></ComponentPreview>
            </div>
          </section>

          <section id="scroll-performance" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Performance
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Batch Scroll Trigger" description="batch scroll trigger animation" code={BatchScrollTriggerCode}><BatchScrollTrigger /></ComponentPreview>
              <ComponentPreview title="GPUAccelerated Transforms" description="gpuaccelerated transforms animation" code={GPUAcceleratedTransformsCode}><GPUAcceleratedTransforms /></ComponentPreview>
              <ComponentPreview title="Intersection Observer Fallback" description="intersection observer fallback animation" code={IntersectionObserverFallbackCode}><IntersectionObserverFallback /></ComponentPreview>
              <ComponentPreview title="Lazy Initialization" description="lazy initialization animation" code={LazyInitializationCode}><LazyInitialization /></ComponentPreview>
              <ComponentPreview title="Memory Cleanup" description="memory cleanup animation" code={MemoryCleanupCode}><MemoryCleanup /></ComponentPreview>
              <ComponentPreview title="Mobile Optimizations" description="mobile optimizations animation" code={MobileOptimizationsCode}><MobileOptimizations /></ComponentPreview>
              <ComponentPreview title="Reduced Motion Support" description="reduced motion support animation" code={ReducedMotionSupportCode}><ReducedMotionSupport /></ComponentPreview>
              <ComponentPreview title="Responsive Trigger Management" description="responsive trigger management animation" code={ResponsiveTriggerManagementCode}><ResponsiveTriggerManagement /></ComponentPreview>
            </div>
          </section>

          <section id="svg" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              SVG Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="SVGBounce" description="svgbounce animation" code={SVGBounceCode}><SVGBounce /></ComponentPreview>
              <ComponentPreview title="SVGCircle Draw" description="svgcircle draw animation" code={SVGCircleDrawCode}><SVGCircleDraw /></ComponentPreview>
              <ComponentPreview title="SVGClock" description="svgclock animation" code={SVGClockCode}><SVGClock /></ComponentPreview>
              <ComponentPreview title="SVGColor Change" description="svgcolor change animation" code={SVGColorChangeCode}><SVGColorChange /></ComponentPreview>
              <ComponentPreview title="SVGDots Connection" description="svgdots connection animation" code={SVGDotsConnectionCode}><SVGDotsConnection /></ComponentPreview>
              <ComponentPreview title="SVGDraw Line" description="svgdraw line animation" code={SVGDrawLineCode}><SVGDrawLine /></ComponentPreview>
              <ComponentPreview title="SVGEqualizer" description="svgequalizer animation" code={SVGEqualizerCode}><SVGEqualizer /></ComponentPreview>
              <ComponentPreview title="SVGFlower" description="svgflower animation" code={SVGFlowerCode}><SVGFlower /></ComponentPreview>
              <ComponentPreview title="SVGGraph Bar" description="svggraph bar animation" code={SVGGraphBarCode}><SVGGraphBar /></ComponentPreview>
              <ComponentPreview title="SVGHamburger" description="svghamburger animation" code={SVGHamburgerCode}><SVGHamburger /></ComponentPreview>
              <ComponentPreview title="SVGHeartbeat" description="svgheartbeat animation" code={SVGHeartbeatCode}><SVGHeartbeat /></ComponentPreview>
              <ComponentPreview title="SVGInfinity" description="svginfinity animation" code={SVGInfinityCode}><SVGInfinity /></ComponentPreview>
              <ComponentPreview title="SVGLoading Ring" description="svgloading ring animation" code={SVGLoadingRingCode}><SVGLoadingRing /></ComponentPreview>
              <ComponentPreview title="SVGMoon Cycle" description="svgmoon cycle animation" code={SVGMoonCycleCode}><SVGMoonCycle /></ComponentPreview>
              <ComponentPreview title="SVGMorph" description="svgmorph animation" code={SVGMorphCode}><SVGMorph /></ComponentPreview>
              <ComponentPreview title="SVGPath Animate" description="svgpath animate animation" code={SVGPathAnimateCode}><SVGPathAnimate /></ComponentPreview>
              <ComponentPreview title="SVGPie Chart" description="svgpie chart animation" code={SVGPieChartCode}><SVGPieChart /></ComponentPreview>
              <ComponentPreview title="SVGProgress Ring" description="svgprogress ring animation" code={SVGProgressRingCode}><SVGProgressRing /></ComponentPreview>
              <ComponentPreview title="SVGPulsing Circle" description="svgpulsing circle animation" code={SVGPulsingCircleCode}><SVGPulsingCircle /></ComponentPreview>
              <ComponentPreview title="SVGRotate" description="svgrotate animation" code={SVGRotateCode}><SVGRotate /></ComponentPreview>
              <ComponentPreview title="SVGScale" description="svgscale animation" code={SVGScaleCode}><SVGScale /></ComponentPreview>
              <ComponentPreview title="SVGSine Wave" description="svgsine wave animation" code={SVGSineWaveCode}><SVGSineWave /></ComponentPreview>
              <ComponentPreview title="SVGSpiral" description="svgspiral animation" code={SVGSpiralCode}><SVGSpiral /></ComponentPreview>
              <ComponentPreview title="SVGStar Twinkle" description="svgstar twinkle animation" code={SVGStarTwinkleCode}><SVGStarTwinkle /></ComponentPreview>
              <ComponentPreview title="SVGSun Rays" description="svgsun rays animation" code={SVGSunRaysCode}><SVGSunRays /></ComponentPreview>
            </div>
          </section>

          <section id="motion-path" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Motion Path
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Basic Motion Path" description="basic motion path animation" code={BasicMotionPathCode}><BasicMotionPath /></ComponentPreview>
              <ComponentPreview title="Motion Path Align" description="motion path align animation" code={MotionPathAlignCode}><MotionPathAlign /></ComponentPreview>
              <ComponentPreview title="Motion Path Bounce" description="motion path bounce animation" code={MotionPathBounceCode}><MotionPathBounce /></ComponentPreview>
              <ComponentPreview title="Motion Path Curve" description="motion path curve animation" code={MotionPathCurveCode}><MotionPathCurve /></ComponentPreview>
              <ComponentPreview title="Motion Path Figure8" description="motion path figure8 animation" code={MotionPathFigure8Code}><MotionPathFigure8 /></ComponentPreview>
              <ComponentPreview title="Motion Path Loop" description="motion path loop animation" code={MotionPathLoopCode}><MotionPathLoop /></ComponentPreview>
              <ComponentPreview title="Motion Path Multiple" description="motion path multiple animation" code={MotionPathMultipleCode}><MotionPathMultiple /></ComponentPreview>
              <ComponentPreview title="Motion Path Orbit" description="motion path orbit animation" code={MotionPathOrbitCode}><MotionPathOrbit /></ComponentPreview>
              <ComponentPreview title="Motion Path Racing" description="motion path racing animation" code={MotionPathRacingCode}><MotionPathRacing /></ComponentPreview>
              <ComponentPreview title="Motion Path Reverse" description="motion path reverse animation" code={MotionPathReverseCode}><MotionPathReverse /></ComponentPreview>
              <ComponentPreview title="Motion Path SVG" description="motion path svg animation" code={MotionPathSVGCode}><MotionPathSVG /></ComponentPreview>
              <ComponentPreview title="Motion Path Scroll" description="motion path scroll animation" code={MotionPathScrollCode}><MotionPathScroll /></ComponentPreview>
              <ComponentPreview title="Motion Path Snake" description="motion path snake animation" code={MotionPathSnakeCode}><MotionPathSnake /></ComponentPreview>
              <ComponentPreview title="Motion Path Start End" description="motion path start end animation" code={MotionPathStartEndCode}><MotionPathStartEnd /></ComponentPreview>
              <ComponentPreview title="Motion Path Wave" description="motion path wave animation" code={MotionPathWaveCode}><MotionPathWave /></ComponentPreview>
            </div>
          </section>

          <section id="physics" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Physics Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Bounce Physics" description="bounce physics animation" code={BouncePhysicsCode}><BouncePhysics /></ComponentPreview>
              <ComponentPreview title="Chain Reaction" description="chain reaction animation" code={ChainReactionCode}><ChainReaction /></ComponentPreview>
              <ComponentPreview title="Confetti Effect" description="confetti effect animation" code={ConfettiEffectCode}><ConfettiEffect /></ComponentPreview>
              <ComponentPreview title="Elastic Bounce" description="elastic bounce animation" code={ElasticBounceCode}><ElasticBounce /></ComponentPreview>
              <ComponentPreview title="Explosion Effect" description="explosion effect animation" code={ExplosionEffectCode}><ExplosionEffect /></ComponentPreview>
              <ComponentPreview title="Floating Bubble" description="floating bubble animation" code={FloatingBubbleCode}><FloatingBubble /></ComponentPreview>
              <ComponentPreview title="Friction Slide" description="friction slide animation" code={FrictionSlideCode}><FrictionSlide /></ComponentPreview>
              <ComponentPreview title="Gravity Drop" description="gravity drop animation" code={GravityDropCode}><GravityDrop /></ComponentPreview>
              <ComponentPreview title="Implosion Effect" description="implosion effect animation" code={ImplosionEffectCode}><ImplosionEffect /></ComponentPreview>
              <ComponentPreview title="Magnetic Attract" description="magnetic attract animation" code={MagneticAttractCode}><MagneticAttract /></ComponentPreview>
              <ComponentPreview title="Orbit Physics" description="orbit physics animation" code={OrbitPhysicsCode}><OrbitPhysics /></ComponentPreview>
              <ComponentPreview title="Particle System" description="particle system animation" code={ParticleSystemCode}><ParticleSystem /></ComponentPreview>
              <ComponentPreview title="Pendulum Swing" description="pendulum swing animation" code={PendulumSwingCode}><PendulumSwing /></ComponentPreview>
              <ComponentPreview title="Projectile Motion" description="projectile motion animation" code={ProjectileMotionCode}><ProjectileMotion /></ComponentPreview>
              <ComponentPreview title="Rain Drops" description="rain drops animation" code={RainDropsCode}><RainDrops /></ComponentPreview>
              <ComponentPreview title="Repel Force" description="repel force animation" code={RepelForceCode}><RepelForce /></ComponentPreview>
              <ComponentPreview title="Snow Fall" description="snow fall animation" code={SnowFallCode}><SnowFall /></ComponentPreview>
              <ComponentPreview title="Spring Motion" description="spring motion animation" code={SpringMotionCode}><SpringMotion /></ComponentPreview>
              <ComponentPreview title="Trajectory Path" description="trajectory path animation" code={TrajectoryPathCode}><TrajectoryPath /></ComponentPreview>
              <ComponentPreview title="Wave Physics" description="wave physics animation" code={WavePhysicsCode}><WavePhysics /></ComponentPreview>
            </div>
          </section>

          <section id="draggable" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Draggable
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Basic Drag" description="basic drag animation" code={BasicDragCode}><BasicDrag /></ComponentPreview>
              <ComponentPreview title="Drag Axis" description="drag axis animation" code={DragAxisCode}><DragAxis /></ComponentPreview>
              <ComponentPreview title="Drag Boundary" description="drag boundary animation" code={DragBoundaryCode}><DragBoundary /></ComponentPreview>
              <ComponentPreview title="Drag Carousel" description="drag carousel animation" code={DragCarouselCode}><DragCarousel /></ComponentPreview>
              <ComponentPreview title="Drag Color Picker" description="drag color picker animation" code={DragColorPickerCode}><DragColorPicker /></ComponentPreview>
              <ComponentPreview title="Drag Drop" description="drag drop animation" code={DragDropCode}><DragDrop /></ComponentPreview>
              <ComponentPreview title="Drag Knob" description="drag knob animation" code={DragKnobCode}><DragKnob /></ComponentPreview>
              <ComponentPreview title="Drag Multiple" description="drag multiple animation" code={DragMultipleCode}><DragMultiple /></ComponentPreview>
              <ComponentPreview title="Drag Path" description="drag path animation" code={DragPathCode}><DragPath /></ComponentPreview>
              <ComponentPreview title="Drag Physics" description="drag physics animation" code={DragPhysicsCode}><DragPhysics /></ComponentPreview>
              <ComponentPreview title="Drag Reorder" description="drag reorder animation" code={DragReorderCode}><DragReorder /></ComponentPreview>
              <ComponentPreview title="Drag Resize" description="drag resize animation" code={DragResizeCode}><DragResize /></ComponentPreview>
              <ComponentPreview title="Drag Rotate" description="drag rotate animation" code={DragRotateCode}><DragRotate /></ComponentPreview>
              <ComponentPreview title="Drag Scale" description="drag scale animation" code={DragScaleCode}><DragScale /></ComponentPreview>
              <ComponentPreview title="Drag Slider" description="drag slider animation" code={DragSliderCode}><DragSlider /></ComponentPreview>
              <ComponentPreview title="Drag Snap" description="drag snap animation" code={DragSnapCode}><DragSnap /></ComponentPreview>
              <ComponentPreview title="Drag Sortable" description="drag sortable animation" code={DragSortableCode}><DragSortable /></ComponentPreview>
              <ComponentPreview title="Drag Throw" description="drag throw animation" code={DragThrowCode}><DragThrow /></ComponentPreview>
              <ComponentPreview title="Drag Timeline" description="drag timeline animation" code={DragTimelineCode}><DragTimeline /></ComponentPreview>
              <ComponentPreview title="Drag Touch" description="drag touch animation" code={DragTouchCode}><DragTouch /></ComponentPreview>
            </div>
          </section>

          <section id="buttons" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Button Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Border Draw Button" description="border draw button animation" code={BorderDrawButtonCode}><BorderDrawButton /></ComponentPreview>
              <ComponentPreview title="Click Ripple Button" description="click ripple button animation" code={ClickRippleButtonCode}><ClickRippleButton /></ComponentPreview>
              <ComponentPreview title="Gradient Shift Button" description="gradient shift button animation" code={GradientShiftButtonCode}><GradientShiftButton /></ComponentPreview>
              <ComponentPreview title="Hover Glow Button" description="hover glow button animation" code={HoverGlowButtonCode}><HoverGlowButton /></ComponentPreview>
              <ComponentPreview title="Magnetic Button" description="magnetic button animation" code={MagneticButtonCode}><MagneticButton /></ComponentPreview>
              <ComponentPreview title="Pulse Button" description="pulse button animation" code={PulseButtonCode}><PulseButton /></ComponentPreview>
              <ComponentPreview title="Scale Press Button" description="scale press button animation" code={ScalePressButtonCode}><ScalePressButton /></ComponentPreview>
              <ComponentPreview title="Shake Button" description="shake button animation" code={ShakeButtonCode}><ShakeButton /></ComponentPreview>
              <ComponentPreview title="Slide Fill Button" description="slide fill button animation" code={SlideFillButtonCode}><SlideFillButton /></ComponentPreview>
              <ComponentPreview title="Text Reveal Button" description="text reveal button animation" code={TextRevealButtonCode}><TextRevealButton /></ComponentPreview>
            </div>
          </section>

          <section id="cards" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Card Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Border Glow Card" description="border glow card animation" code={BorderGlowCardCode}><BorderGlowCard /></ComponentPreview>
              <ComponentPreview title="Expand Card" description="expand card animation" code={ExpandCardCode}><ExpandCard /></ComponentPreview>
              <ComponentPreview title="Flip Card Hover" description="flip card hover animation" code={FlipCardHoverCode}><FlipCardHover /></ComponentPreview>
              <ComponentPreview title="Hover Lift Card" description="hover lift card animation" code={HoverLiftCardCode}><HoverLiftCard /></ComponentPreview>
              <ComponentPreview title="Reveal Card" description="reveal card animation" code={RevealCardCode}><RevealCard /></ComponentPreview>
              <ComponentPreview title="Slide Card" description="slide card animation" code={SlideCardCode}><SlideCard /></ComponentPreview>
              <ComponentPreview title="Stack Card" description="stack card animation" code={StackCardCode}><StackCard /></ComponentPreview>
              <ComponentPreview title="Tilt Card" description="tilt card animation" code={TiltCardCode}><TiltCard /></ComponentPreview>
            </div>
          </section>

          <section id="cursor" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Custom Cursor
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Cursor Hover Effect" description="cursor hover effect animation" code={CursorHoverEffectCode}><CursorHoverEffect /></ComponentPreview>
              <ComponentPreview title="Cursor Magnetic" description="cursor magnetic animation" code={CursorMagneticCode}><CursorMagnetic /></ComponentPreview>
              <ComponentPreview title="Cursor Ring" description="cursor ring animation" code={CursorRingCode}><CursorRing /></ComponentPreview>
              <ComponentPreview title="Cursor Text" description="cursor text animation" code={CursorTextCode}><CursorText /></ComponentPreview>
              <ComponentPreview title="Cursor Trail" description="cursor trail animation" code={CursorTrailCode}><CursorTrail /></ComponentPreview>
              <ComponentPreview title="Custom Cursor" description="custom cursor animation" code={CustomCursorCode}><CustomCursor /></ComponentPreview>
            </div>
          </section>

          <section id="loaders" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Loaders
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Bounce Loader" description="bounce loader animation" code={BounceLoaderCode}><BounceLoader /></ComponentPreview>
              <ComponentPreview title="Flip Loader" description="flip loader animation" code={FlipLoaderCode}><FlipLoader /></ComponentPreview>
              <ComponentPreview title="Gradient Loader" description="gradient loader animation" code={GradientLoaderCode}><GradientLoader /></ComponentPreview>
              <ComponentPreview title="Progress Loader" description="progress loader animation" code={ProgressLoaderCode}><ProgressLoader /></ComponentPreview>
              <ComponentPreview title="Pulse Loader" description="pulse loader animation" code={PulseLoaderCode}><PulseLoader /></ComponentPreview>
              <ComponentPreview title="Ring Loader" description="ring loader animation" code={RingLoaderCode}><RingLoader /></ComponentPreview>
              <ComponentPreview title="Spinning Loader" description="spinning loader animation" code={SpinningLoaderCode}><SpinningLoader /></ComponentPreview>
              <ComponentPreview title="Wave Loader" description="wave loader animation" code={WaveLoaderCode}><WaveLoader /></ComponentPreview>
            </div>
          </section>

          <section id="navigation" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Navigation
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Accordion Nav" description="accordion nav animation" code={AccordionNavCode}><AccordionNav /></ComponentPreview>
              <ComponentPreview title="Dropdown Animate" description="dropdown animate animation" code={DropdownAnimateCode}><DropdownAnimate /></ComponentPreview>
              <ComponentPreview title="Hover Underline" description="hover underline animation" code={HoverUnderlineCode}><HoverUnderline /></ComponentPreview>
              <ComponentPreview title="Menu Reveal" description="menu reveal animation" code={MenuRevealCode}><MenuReveal /></ComponentPreview>
              <ComponentPreview title="Mobile Hamburger" description="mobile hamburger animation" code={MobileHamburgerCode}><MobileHamburger /></ComponentPreview>
              <ComponentPreview title="Nav Indicator" description="nav indicator animation" code={NavIndicatorCode}><NavIndicator /></ComponentPreview>
            </div>
          </section>

          <section id="hero" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Hero Animations
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Hero Fade In" description="hero fade in animation" code={HeroFadeInCode}><HeroFadeIn /></ComponentPreview>
              <ComponentPreview title="Hero Parallax" description="hero parallax animation" code={HeroParallaxCode}><HeroParallax /></ComponentPreview>
              <ComponentPreview title="Hero Split Reveal" description="hero split reveal animation" code={HeroSplitRevealCode}><HeroSplitReveal /></ComponentPreview>
              <ComponentPreview title="Hero Text Reveal" description="hero text reveal animation" code={HeroTextRevealCode}><HeroTextReveal /></ComponentPreview>
              <ComponentPreview title="Hero Video Poster" description="hero video poster animation" code={HeroVideoPosterCode}><HeroVideoPoster /></ComponentPreview>
            </div>
          </section>

          <section id="shapes" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Shapes
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Connecting Dots" description="connecting dots animation" code={ConnectingDotsCode}><ConnectingDots /></ComponentPreview>
              <ComponentPreview title="Floating Geometric" description="floating geometric animation" code={FloatingGeometricCode}><FloatingGeometric /></ComponentPreview>
              <ComponentPreview title="Grid Animation" description="grid animation animation" code={GridAnimationCode}><GridAnimation /></ComponentPreview>
              <ComponentPreview title="Morphing Shape" description="morphing shape animation" code={MorphingShapeCode}><MorphingShape /></ComponentPreview>
              <ComponentPreview title="Pulsing Ring" description="pulsing ring animation" code={PulsingRingCode}><PulsingRing /></ComponentPreview>
              <ComponentPreview title="Rotating Shapes" description="rotating shapes animation" code={RotatingShapesCode}><RotatingShapes /></ComponentPreview>
            </div>
          </section>

          <section id="backgrounds" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Backgrounds
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Gradient Shift" description="gradient shift animation" code={GradientShiftCode}><GradientShift /></ComponentPreview>
              <ComponentPreview title="Grid Background" description="grid background animation" code={GridBackgroundCode}><GridBackground /></ComponentPreview>
              <ComponentPreview title="Particle Background" description="particle background animation" code={ParticleBackgroundCode}><ParticleBackground /></ComponentPreview>
              <ComponentPreview title="Stars Background" description="stars background animation" code={StarsBackgroundCode}><StarsBackground /></ComponentPreview>
              <ComponentPreview title="Wave Background" description="wave background animation" code={WaveBackgroundCode}><WaveBackground /></ComponentPreview>
            </div>
          </section>

          <section id="charts" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Charts
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Bar Chart Animated" description="bar chart animated animation" code={BarChartAnimatedCode}><BarChartAnimated /></ComponentPreview>
              <ComponentPreview title="Donut Chart Animated" description="donut chart animated animation" code={DonutChartAnimatedCode}><DonutChartAnimated /></ComponentPreview>
              <ComponentPreview title="Line Chart Animated" description="line chart animated animation" code={LineChartAnimatedCode}><LineChartAnimated /></ComponentPreview>
              <ComponentPreview title="Pie Chart Animated" description="pie chart animated animation" code={PieChartAnimatedCode}><PieChartAnimated /></ComponentPreview>
              <ComponentPreview title="Radar Chart Animated" description="radar chart animated animation" code={RadarChartAnimatedCode}><RadarChartAnimated /></ComponentPreview>
            </div>
          </section>

          <section id="lines" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Lines
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Connecting Lines" description="connecting lines animation" code={ConnectingLinesCode}><ConnectingLines /></ComponentPreview>
              <ComponentPreview title="Pulsing Lines" description="pulsing lines animation" code={PulsingLinesCode}><PulsingLines /></ComponentPreview>
              <ComponentPreview title="Wave Lines" description="wave lines animation" code={WaveLinesCode}><WaveLines /></ComponentPreview>
            </div>
          </section>

          <section id="particles" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Particles
            </h2>

            <div className="grid gap-8">
              <ComponentPreview title="Fireflies" description="fireflies animation" code={FirefliesCode}><Fireflies /></ComponentPreview>
              <ComponentPreview title="Floating Particles" description="floating particles animation" code={FloatingParticlesCode}><FloatingParticles /></ComponentPreview>
              <ComponentPreview title="Sparkles" description="sparkles animation" code={SparklesCode}><Sparkles /></ComponentPreview>
            </div>
          </section>

          <section id="ui-components" className="space-y-12">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              UI Components
            </h2>

            <ComponentPreview
              title="Button"
              description="A customizable button component with various variants and sizes."
              code={ButtonDemoCode}
            >
              <ButtonDemo />
            </ComponentPreview>

            <ComponentPreview
              title="Badge"
              description="A small badge for status or labels with multiple color variants."
              code={BadgeDemoCode}
            >
              <BadgeDemo />
            </ComponentPreview>

            <ComponentPreview
              title="Input"
              description="A styled text input component for forms."
              code={InputDemoCode}
            >
              <InputDemo />
            </ComponentPreview>

            <ComponentPreview
              title="Select"
              description="A styled native select dropdown."
              code={SelectDemoCode}
            >
              <SelectDemo />
            </ComponentPreview>

            <ComponentPreview
              title="Slider"
              description="A customizable range slider component."
              code={SliderDemoCode}
            >
              <SliderDemo />
            </ComponentPreview>

            <ComponentPreview
              title="Tabs"
              description="A simple tabbed interface for switching between views."
              code={TabsDemoCode}
            >
              <TabsDemo />
            </ComponentPreview>

            <ComponentPreview
              title="Difficulty Badge"
              description="A specialized badge for indicating tutorial or component difficulty."
              code={DifficultyDemoCode}
            >
              <DifficultyDemo />
            </ComponentPreview>

            <ComponentPreview
              title="Plugin Badge"
              description="A specialized badge for displaying GSAP plugins required, highlighting Club GreenSock plugins."
              code={PluginBadgeDemoCode}
            >
              <PluginBadgeDemo />
            </ComponentPreview>

          </section>

          <section id="hooks" className="space-y-12">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Hooks
            </h2>

            <ComponentPreview
              title="useTheme"
              description="A custom hook to easily toggle between light and dark modes."
              code={ThemeHookDemoCode}
            >
              <ThemeHookDemo />
            </ComponentPreview>

            <ComponentPreview
              title="useMediaQuery"
              description="A custom hook that responds to CSS media queries in real-time."
              code={MediaQueryHookDemoCode}
            >
              <MediaQueryHookDemo />
            </ComponentPreview>
          </section>

          <section id="lib" className="space-y-12">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-[var(--color-border)]">
              Lib & Utilities
            </h2>

            <ComponentPreview
              title="Utility Functions"
              description="Handy helpers like cn(), copyToClipboard(), generateId(), and slugify()."
              code={UtilsDemoCode}
            >
              <UtilsDemo />
            </ComponentPreview>
          </section>

                </Suspense>
      </main>
        <CardNav
          items={navItems}
          baseColor="#0a0a0f"
          menuColor="#ffffff"
          buttonBgColor="#ffffff"
          buttonTextColor="#000000"
          ease="power3.out"
        />
        
        <ThemeToggle />
    </div>
  )
}

export default App