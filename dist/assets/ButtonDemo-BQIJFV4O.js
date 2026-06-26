const t=`import { Button } from '@/components/ui/button'

export default function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <Button variant="default">Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default Size</Button>
        <Button size="lg">Large Size</Button>
      </div>
    </div>
  )
}
`;export{t as default};
