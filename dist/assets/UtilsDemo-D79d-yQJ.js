const e=`import { useState } from 'react'
import { copyToClipboard, generateId, slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function UtilsDemo() {
  const [textToSlug, setTextToSlug] = useState('My Awesome GSAP Animation!')
  const [slug, setSlug] = useState(slugify(textToSlug))
  const [copied, setCopied] = useState(false)
  const [generatedId, setGeneratedId] = useState(generateId())

  const handleSlugify = (val: string) => {
    setTextToSlug(val)
    setSlug(slugify(val))
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedId)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      
      <div className="flex flex-col items-center gap-3 w-full">
        <p className="font-semibold text-sm">Generate ID & Copy</p>
        <div className="flex items-center gap-3">
          <Badge variant="primary" className="text-lg px-4 py-1">{generatedId}</Badge>
          <Button size="sm" onClick={() => setGeneratedId(generateId())}>New ID</Button>
          <Button size="sm" variant={copied ? 'success' : 'outline'} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy ID'}
          </Button>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[var(--color-border)]" />

      <div className="flex flex-col items-center gap-3 w-full">
        <p className="font-semibold text-sm">Slugify String</p>
        <Input 
          value={textToSlug} 
          onChange={(e) => handleSlugify(e.target.value)} 
          placeholder="Type something to slugify..." 
        />
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          Result: <code className="text-[var(--color-primary)]">{slug}</code>
        </p>
      </div>

    </div>
  )
}
`;export{e as default};
