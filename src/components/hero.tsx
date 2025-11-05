import { useEffect, useRef } from "react"

const Hero = () =>{
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2
  },[])
  return (
    <section id="hero">
      <div>
        <h1>Macbook Pro</h1>
        <img src="/title.png" alt="macbook title" />
      </div>
      <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline></video>
      <button>Buy</button>
      <p>From $1599 or $133/month</p>
    </section>
  )
}

export {Hero}
