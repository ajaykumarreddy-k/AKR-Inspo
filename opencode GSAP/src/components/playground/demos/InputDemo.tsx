import { Input } from '@/components/ui/input'

export default function InputDemo() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <Input type="text" placeholder="Enter your name" />
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled input" />
    </div>
  )
}
