export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type PluginType =
  | 'ScrollTrigger'
  | 'MotionPathPlugin'
  | 'DrawSVGPlugin'
  | 'MorphSVGPlugin'
  | 'Flip'
  | 'SplitText'
  | 'Observer'
  | 'Draggable'
  | 'InertiaPlugin'
  | 'Physics2DPlugin'
  | 'PhysicsPropsPlugin'
  | 'ScrollSmoother'

export type ControlType =
  | 'number'
  | 'select'
  | 'color'
  | 'range'
  | 'boolean'

export interface ControlConfig {
  key: string
  label: string
  type: ControlType
  defaultValue: unknown
  options?: { label: string; value: string | number }[]
  min?: number
  max?: number
  step?: number
}

export interface SnippetMeta {
  id: string
  title: string
  slug: string
  description: string
  category: string
  difficulty: Difficulty
  tags: string[]
  requiredPlugins: PluginType[]
  performanceRating: 1 | 2 | 3 | 4 | 5
  controls: ControlConfig[]
  thumbnail?: string
}

export interface AnimationComponent {
  meta: SnippetMeta
  Component: React.FC<AnimationProps>
}

export interface AnimationProps {
  controls: Record<string, unknown>
  isPlaying: boolean
  restartKey: number
}

export type TabId = 'preview' | 'react' | 'typescript' | 'tailwind' | 'timeline' | 'explanation'

export interface CategoryGroup {
  name: string
  slug: string
  description: string
  icon: string
  items: SnippetMeta[]
}

export interface SnippetFile {
  filename: string
  language: string
  code: string
}
