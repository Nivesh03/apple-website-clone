import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Features from './components/features'
import Footer from './components/footer'
import { Hero } from './components/hero'
import Highlights from './components/highlights'
import { Navbar } from './components/navbar'
import { Performance } from './components/performance'
import { ProductViewer } from './components/product-viewer'
import { Showcase } from './components/showcase'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  )
}

export default App
