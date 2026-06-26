const e=`import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CallbackOrder() {
  const boxRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const orderRef = useRef<string[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      orderRef.current = []
      gsap.to(boxRef.current, {
        x: 150,
        duration: 1,
        ease: 'power2.out',
        repeat: 1,
        yoyo: true,
        onStart: () => orderRef.current.push('onStart'),
        onRepeat: () => orderRef.current.push('onRepeat'),
        onReverse: () => orderRef.current.push('onReverse'),
        onComplete: () => {
          orderRef.current.push('onComplete')
          if (logRef.current) {
            logRef.current.textContent = orderRef.current.join(' → ')
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const handleRestart = () => {
    orderRef.current = []
    if (logRef.current) logRef.current.textContent = 'Restarting...'
    const ctx = gsap.context(() => {
      orderRef.current = []
      gsap.to(boxRef.current, {
        x: 150,
        duration: 1,
        ease: 'power2.out',
        repeat: 1,
        yoyo: true,
        onStart: () => orderRef.current.push('onStart'),
        onRepeat: () => orderRef.current.push('onRepeat'),
        onReverse: () => orderRef.current.push('onReverse'),
        onComplete: () => {
          orderRef.current.push('onComplete')
          if (logRef.current) {
            logRef.current.textContent = orderRef.current.join(' → ')
          }
        }
      })
    }, boxRef)
    ctx.revert()
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-xl font-bold text-[var(--color-text)]">Callback Order</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Order of all callbacks</p>
      <div className="relative w-72 h-20 flex items-center">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center text-white font-bold text-sm"
        >
          Ord
        </div>
      </div>
      <button onClick={handleRestart} className="px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs hover:border-[var(--color-primary)] transition-colors">
        Restart
      </button>
      <div ref={logRef} className="text-xs text-[var(--color-text-muted)] text-center max-w-xs">Click restart to see order</div>
    </div>
  )
}
`;export{e as default};
