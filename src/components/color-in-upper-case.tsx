import { ReactNode, useEffect, useState } from "react"
import { renderToString } from "react-dom/server"

type ColorInUpperCaseProps = {
  text: string
}

export const ColorInUpperCase = ({ text }: ColorInUpperCaseProps) => {
  const checkCharacter = (letter: string, text: string, key:number,) => {
    if (key > 0) {
       const lastLatter: string = text[key - 1];

       if (/[A-Z]/.test(lastLatter)) return false
    }

    return (/[A-Z]/.test(letter))
  }

  return (
    text.split('').map((letter, key) => (
      (checkCharacter(letter, text, key)) ? <span key={`${letter}-${key}`} className="primary-text-color">{letter}</span> : letter)
    )
)
}
