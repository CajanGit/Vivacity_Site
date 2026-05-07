'use client'

import { useEffect, useRef } from 'react'

interface Wave {
    yBase: number
    amplitude: number
    frequency: number
    speed: number
    phase: number
    opacity: number
    lineWidth: number
    color: string
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        if (!ctx) return

        let animationId: number

        // Generate waves once — stored outside draw() so they don't reset each frame
        // This is the key to "random but stable" — randomize on mount, not on render
        const waveCount = 32
        const waves: Wave[] = Array.from({ length: waveCount }, (_, i) => ({
            // Spread waves across full canvas height, with some randomness
            yBase: (canvas.height / waveCount) * i + (Math.random() - 0.5) * 60,
            // Randomize amplitude — some waves are gentle, some dramatic
            amplitude: 15 + Math.random() * 55,
            // Randomize frequency — some waves are tight, some are long and rolling
            frequency: 0.005 + Math.random() * 0.006,
            // Randomize speed — subtle variation makes it feel alive
            speed: 0.003 + Math.random() * 0.012,
            // Random starting phase so they're not all in sync at t=0
            phase: Math.random() * Math.PI * 2,
            // Vary opacity for depth — some waves recede, some pop
            opacity: 0.1 + Math.random() * 0.28,
            // Vary thickness slightly
            lineWidth: 1 + Math.random() * 0.9,
            // Green channel varies 140–230, shifting between deep blue and bright cyan
            // Blue channel varies 200–255, keeping everything in the cool blue family
            color: `rgba(0, ${Math.floor(140 + Math.random() * 90)}, ${Math.floor(200 + Math.random() * 55)}, `,

        }))

        function resize() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            // Recalculate yBase on resize so waves still spread across full height
            waves.forEach((wave, i) => {
                wave.yBase = (canvas.height / waveCount) * i + (Math.random() - 0.5) * 60
            })
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            waves.forEach((wave) => {

                wave.phase += wave.speed
            

                ctx.beginPath()
                ctx.strokeStyle = `${wave.color}${wave.opacity})`
                ctx.lineWidth = wave.lineWidth

            // Step by 3px for performance — smooth enough, cheaper than every pixel
                for (let x = 0; x <= canvas.width; x += 3) {
                    const y = wave.yBase + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
                }

                ctx.stroke()
            })

            animationId = requestAnimationFrame(draw)
        }

        resize()
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
            className="fixed inset-0 -z-10 pointer-events-none"
        />
    )
}