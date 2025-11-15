import type { JSX } from "react"

type SplitTextProps = {
  children: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  charClassName?: string
  wordClassName?: string
}

export function SplitText({
  children,
  className = "",
  as: Comp = "p",
  charClassName = "char",
  wordClassName = "word",
}: SplitTextProps) {
  if (!children) return null
  const words = children.split(/(\s+)/)
  let charIndex = 0
  let wordIndex = 0

  return (
    // @ts-expect-error - cannot type correctly yet
    <Comp
      // @ts-expect-error - cannot type correctly yet
      className={className}
      // @ts-expect-error - cannot type correctly yet
      style={
        {
          "--word-total": words.filter((_, i) => i % 2 === 0).length,
          "--char-total": children.length,
        } as React.CSSProperties
      }
    >
      {words.map((word, wordArrayIndex) => {
        // Skip empty strings that might occur from split
        if (!word.trim() && word === "") return null
        // Check if it's a word or whitespace
        const isWhitespace = /^\s+$/.test(word)
        if (isWhitespace) {
          return (
            <span key={`whitespace-${wordArrayIndex}`} className="whitespace">
              {word}
            </span>
          )
        }
        const currentWordIndex = wordIndex++
        return (
          <span
            key={`word-${currentWordIndex}`}
            className={wordClassName}
            data-word={word.trim()}
            style={
              {
                "--word-index": currentWordIndex,
              } as React.CSSProperties
            }
          >
            {word.split("").map((char) => {
              const currentCharIndex = charIndex++
              return (
                <span
                  key={`char-${currentCharIndex}`}
                  className={charClassName}
                  data-char={char}
                  aria-hidden="true"
                  style={
                    {
                      "--char-index": currentCharIndex,
                    } as React.CSSProperties
                  }
                >
                  {char}
                </span>
              )
            })}
          </span>
        )
      })}
    </Comp>
  )
}
