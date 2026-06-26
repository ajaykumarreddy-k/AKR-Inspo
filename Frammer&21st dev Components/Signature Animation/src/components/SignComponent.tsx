import { useEffect, useState } from "react"
import { FirstWord } from "./FirstWord"
import { SecondWord } from "./SecondWord"

type Variant = "JgPK8j7fl" | "QfYgIeLfN" | "VVZswk5qf"

const START_VARIANT: Variant = "QfYgIeLfN"
const END_VARIANT: Variant = "VVZswk5qf"

export function SignComponent() {
  const [variant, setVariant] = useState<Variant>("JgPK8j7fl")

  useEffect(() => {
    const t1 = setTimeout(() => {
      setVariant(START_VARIANT)
    }, 300)

    const t2 = setTimeout(() => {
      setVariant(END_VARIANT)
    }, 3800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const isStart = variant === START_VARIANT || variant === END_VARIANT
  const isEnd = variant === END_VARIANT

  return (
    <div className="sign-container">
      {isStart && (
        <div className="sign-logo-first" style={{ transform: "translateY(-50%)" }}>
          <FirstWord />
        </div>
      )}
      {isEnd && (
        <div className="sign-logo-second" style={{ transform: "translateY(-50%)" }}>
          <SecondWord />
        </div>
      )}
    </div>
  )
}
