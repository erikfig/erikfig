/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { ColorInUpperCase } from "./color-in-upper-case";

const alphabetLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

type HackEffectTextProps = {
  text: string;
  colorInUppercase?: boolean;
  repetitions?: number;
  intervalTimer?: number;
}

const repetitions = 10;
const intervalTimer = 50

export const HackEffectText = ({ text, colorInUppercase, repetitions=10, intervalTimer=50 }: HackEffectTextProps) => {
  const [effectText, setEffectText] = useState(text);
  const [letterCount, setLetterCount] = useState(0);
  const [intervalId, setIntervalId] = useState<any>();

  const getRandonLetter = useCallback((letter: string) => {
    const alphabet = (/[A-Z]/.test(letter)) ? alphabetUpper : alphabetLower
    return alphabet[rand(0,alphabet.length - 1)]
  }, [])

  useEffect(() => {
    if (letterCount > text.length * repetitions && intervalId) {

      clearInterval(intervalId)
    }
  }, [letterCount, intervalId, text])
  
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      let localEffectText = text.split('')
      localEffectText.forEach((letter, i) => {
        if (count < (i+1) * repetitions && letter !== ' ')
          localEffectText[i] = getRandonLetter(letter)
      })
  
      setEffectText(localEffectText.join(''))
      setLetterCount((old) => {
        count = old + 1
        return count
      })
    }, intervalTimer)

    setIntervalId(interval)
    return () => clearInterval(interval);
  }, [])

  if (colorInUppercase)
    return <ColorInUpperCase text={effectText}/>

  return effectText
}