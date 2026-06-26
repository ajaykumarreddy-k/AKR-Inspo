import { useState } from 'react'
import { Slider } from '@/components/ui/slider'

export default function SliderDemo() {
  const [value, setValue] = useState(50)

  return (
    <div className="w-full max-w-sm flex flex-col gap-6 items-center">
      <Slider value={value} onChange={setValue} min={0} max={100} />
      <p className="text-sm text-[var(--color-text-muted)]">
        Value: <span className="font-semibold text-[var(--color-text)]">{value}</span>
      </p>
    </div>
  )
}
