import { useGSAP } from '@gsap/react'
import {
  PresentationControls,
  type PresentationControlProps,
} from '@react-three/drei'
import gsap from 'gsap'
import { useRef } from 'react'
import { Group, Mesh } from 'three'
import { Macbook14Model } from '../macbook-14'
import { Macbook16Model } from '../macbook-16'
const ANIMATION_DURATION = 1
const OFFSET_DISTANCE = 5
const SCALE_LARGE_DESKTOP = 0.08
const SCALE_LARGE_MOBILE = 0.05

const fadeMeshes = (group: Group | null, opacity: number) => {
  if (!group) return
  group.traverse((child) => {
    if (child instanceof Mesh) {
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material]
      materials.forEach((material) => {
        material.transparent = true
        gsap.to(material, { opacity, duration: ANIMATION_DURATION })
      })
    }
  })
}

const moveGroup = (group: Group | null, x: number) => {
  if (!group) return
  gsap.to(group.position, { x, duration: ANIMATION_DURATION })
}

export const ModelSwitcher = ({
  scale,
  isMobile,
}: {
  scale: number
  isMobile: boolean
}) => {
  const smallMacbookRef = useRef<Group>(null)
  const largeMacbookRef = useRef<Group>(null)
  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE)
      moveGroup(largeMacbookRef.current, 0)
      fadeMeshes(smallMacbookRef.current, 0)
      fadeMeshes(largeMacbookRef.current, 1)
    } else {
      moveGroup(smallMacbookRef.current, 0)
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE)
      fadeMeshes(smallMacbookRef.current, 1)
      fadeMeshes(largeMacbookRef.current, 0)
    }
  }, [scale])

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    polar: [-Math.PI, Math.PI],
    azimuth: [-Infinity, Infinity],
  } satisfies PresentationControlProps
  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <Macbook16Model scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <Macbook14Model scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  )
}
