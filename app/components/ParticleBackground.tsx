'use client'

import { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        if (!ctx) return

        let animationId: number
        let particles: Particle[] = []

        const PARTICLE_COUNT = 60
        const CONNECTION_DISTANCE = 120
        // const PARTICLE_COLOR = '139, 92, 246'
        // const PARTICLE_COLOR = '0, 212, 245'   // #00D4F5 cyan
        const PARTICLE_COLOR = '245, 168, 0'   // #F5A800 amber
        const SPEED = 0.3

        function resize() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        function spawn(): Particle {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
            }
        }

        function init() {
            particles = Array.from({ length: PARTICLE_COUNT }, spawn)
        }

        function draw() {
            ctx?.clearRect(0, 0, canvas?.width, canvas?.height)

            //update + draw dots
            for (const p of particles) {
                p.x += p.vx
                p.y += p.vy

                // wrap around eges instead of bouncing
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas?.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${PARTICLE_COLOR}, 0.6)`
                ctx.fill()
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    
                    if (dist < CONNECTION_DISTANCE) {
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.3
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx?.stroke()
                    }
                }
            }
        animationId = requestAnimationFrame(draw)
        }
    resize()
    init()
    draw()

    window.addEventListener('resize', resize)

    return () => { 
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ zIndex: -1}}
            className="fixed inset-0 -z-10 pointer-events-none"
        ></canvas>
    )
}