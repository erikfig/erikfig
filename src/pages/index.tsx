import { Poppins } from 'next/font/google'
import { HackEffectText } from "../components/hack-effect-text";
import dynamic from 'next/dynamic'
import { Suspense } from "react";
import { ChangeTextInterval } from '@/components/change-text-interval';
import Image from 'next/image';
import Head from 'next/head';

const ModelCanvas = dynamic(() => import('../components/three-d-model')
  .then((mod) => mod.ThreeDModelCanva), { ssr: false })

const popping = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const poppingBold = Poppins({
  weight: '600',
  subsets: ['latin'],
})

const poppingBlack = Poppins({
  weight: '800',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div className={`bg-1 min-h-screen ${poppingBold.className}`}>
      <Head>
      <title>Erik Figueiredo | Desenvolvedor FullStack Senior</title>
        <link rel="manifest" href="/erikfig/manifest.json" />
        <link rel="icon" href="/erikfig/icon512_rounded.png" />
      </Head>

      <div className="bg-2 min-h-screen">
        <div className="bg-3 flex min-h-screen flex-col items-center">
          <header className="bg-clarify flex w-full flex-col items-center">
            <div className="flex justify-between items-center w-full max-w-screen-2xl px-8">
              <h1 className="text-3xl py-6 flex items-center text-nowrap text-ellipsis gap-3 overflow-hidden" style={{maxWidth: 284}}>
                <Image className="rounded-full" src="/erikfig/erik.jpeg" alt="Foto Erik" width={50} height={50} />
                <HackEffectText text="Erik Figueiredo" intervalTimer={25}/>
              </h1>

              <a className='up-on-hover flex items-center gap-3' href="https://github.com/erikfig" target="_blank">
                <Image src="/erikfig/github-mark.svg" alt="GitHub" width={50} height={50} />
              </a>
            </div>
          </header>
          <main className="relative flex-1 w-full max-w-screen-2xl px-8 overflow-x-hidden ">
            <Suspense>
              <ModelCanvas/>
            </Suspense>

            <h2 className={`text-7xl mt-10 lg:mt-28 pb-10 overflow-hidden ${poppingBlack.className}`}>
              <ChangeTextInterval text={[
                <HackEffectText key="hack-1" text="Full Stack!!" colorInUppercase intervalTimer={25}/>,
                <HackEffectText key="hack-2" text="Node.js" colorInUppercase />,
                <HackEffectText key="hack-3" text="React.js" colorInUppercase />,
                <HackEffectText key="hack-4" text="React Native" colorInUppercase />,
                <HackEffectText key="hack-5" text="Vue.js" colorInUppercase />,
                <HackEffectText key="hack-6" text="PHP" colorInUppercase />,
              ]} /></h2>

            <p className={`w-3/6 leading-9 text-2xl mb-10 ${poppingBold.className}`}>Desenvolvedor Sênior com mais de 15 anos de experiência, especializado em Node.js, TypeScript e PHP<span className="blink">_</span></p>

            <blockquote className="border-l-4 pl-4">
              <p>Cada sonho que você deixa para trás é um pedaço do seu futuro que deixa de existir</p>
              <cite>Steve Jobs</cite>
            </blockquote>

          </main>
          <footer className="w-full max-w-screen-2xl pt-8 pr-8 pb-4 pl-8 flex items-center justify-between gap-3">
            <div className='flex items-center gap-3'>
              <a href="https://www.linkedin.com/in/erik-figueiredo/" target="_blank" className="up-on-hover py-2 px-4 bg-gray-950 rounded-md font-bold flex items-center gap-3" style={{ height: 41 }}>
                <Image className="inline" src="/erikfig/linkedin-mark.svg" alt="Linkedin" width={25} height={25} />
                <HackEffectText text="Linkedin" intervalTimer={25} />
              </a>
              <a href="/erikfig/profile.pdf" target="_blank" className="up-on-hover py-2 px-4 bg-gray-900 rounded-md font-bold flex items-center gap-3" style={{ height: 41 }}>
                <Image className="inline" src="/erikfig/download.svg" alt="Currículo" width={25} height={25} />
                <HackEffectText text="Currículo" intervalTimer={25} />
              </a>
            </div>

            <button
              className="flex p-4 bg-gray-900 rounded-full font-bold items-center gap-3"
              onClick={
                () => { 
                  navigator.share({
                   title: 'Erik Figueiredo', 
                   text: 'Compartilhar Site',                 
                   url: window.location.href
                  }
                )}
              }>
              <Image className="inline" src="/erikfig/share.svg" alt="Compartilhar" width={25} height={25} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
