import { ReactNode, useEffect, useState } from "react"
import { clearInterval } from "timers";
import { useInterval } from "./use-interval";

type ChangeTextIntervalProps = {
  text: ReactNode[];
}

export const ChangeTextInterval = ({ text }: ChangeTextIntervalProps) => {
  const [currentElement, setCurrentElement] = useState<ReactNode>(text[0])
  const [count, setCount] = useState<number>(1)

  useInterval(() => {
      if (count >= text.length) {
        setCount(1)
      }

      if (count < text.length) {
        setCount(count + 1)
      }

  }, 10000)

  useEffect(() => {
    setCurrentElement(text[count - 1])
  }, [count, text])

  return currentElement
}