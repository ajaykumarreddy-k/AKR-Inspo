const i=`import { DifficultyBadge } from '@/components/ui/difficulty'

export default function DifficultyDemo() {
  return (
    <div className="flex gap-4 justify-center">
      <DifficultyBadge difficulty="beginner" />
      <DifficultyBadge difficulty="intermediate" />
      <DifficultyBadge difficulty="advanced" />
    </div>
  )
}
`;export{i as default};
