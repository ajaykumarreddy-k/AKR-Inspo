const e=`import { useState } from 'react'
import { Select } from '@/components/ui/select'

export default function SelectDemo() {
  const [value, setValue] = useState<string | number>('apple')

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 items-center">
      <Select 
        value={value} 
        onChange={setValue} 
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Cherry', value: 'cherry' }
        ]}
      />
      <p className="text-sm text-[var(--color-text-muted)]">
        Selected value: <span className="font-semibold text-[var(--color-text)]">{value}</span>
      </p>
    </div>
  )
}
`;export{e as default};
