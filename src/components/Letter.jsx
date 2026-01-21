import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
    "Happy first Monthsary!",
    "or should I say.. Another month with you, and I still get excited talking to you.",
    "Thank you for being patient, kind, and choosing me every day.",
    "Do you remember na you told me na di ka mahilig sa RPGs or yung games na nakakalaro ibang players but you're now playing those games na",
    "I love that you actually enjoy them na.",
    "and your answer to my first question sayo.",
    "You got me at 'manhwa' part.",
    "Didn't expect I'll actually get you.",
    "'The universe conspires to helps you achieve it' you told me na this is one of your fave qoutes from a book.",
    "So I may not have read the entire book but I did check it out. Turns out I also would like a qoute from this book.",
    "So, I love you because the entire universe conspired to help me find you.",
    "I may not have much right now...",
    "...but I wanted to give you something made with love.",
    "So here's my heart, written in code. 💻💗"
]

export default function Letter({ onComplete }) {
    const [index, setIndex] = useState(0)
    const [showMusicPrompt, setShowMusicPrompt] = useState(false)
    const [musicPlaying, setMusicPlaying] = useState(false)
    const iframeRef = useRef(null)

    const musicTriggerIndex = messages.findIndex(m => m.includes("conspired to help me find you"))

    useEffect(() => {
        if (index === musicTriggerIndex) {
            setShowMusicPrompt(true)
        }
    }, [index, musicTriggerIndex])

    const handleClick = (e) => {
        // Don't advance if clicking the music button
        if (e.target.closest('.music-btn')) return

        if (index < messages.length - 1) {
            setIndex(prev => prev + 1)
        } else {
            onComplete()
        }
    }

    const handlePlayMusic = (e) => {
        e.stopPropagation()
        setMusicPlaying(true)
        setShowMusicPrompt(false)
    }

    return (
        <div className="card" onClick={handleClick} style={{ cursor: 'pointer', minHeight: '350px', position: 'relative' }}>

            {/* YouTube Embed - visible when music is playing */}
            {musicPlaying && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '280px',
                    height: '158px',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(255, 111, 145, 0.4)',
                    zIndex: 1000
                }}>
                    <iframe
                        ref={iframeRef}
                        width="280"
                        height="158"
                        src="https://www.youtube.com/embed/RAVfp4YZ8nA?autoplay=1&start=77"
                        title="Our Song"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%' }}
                >
                    <p style={{ fontSize: '1.4rem', lineHeight: '1.6', color: '#4A4A4A', padding: '0 10px' }}>
                        {messages[index]}
                    </p>

                    {/* Music prompt appears on special quote */}
                    {showMusicPrompt && !musicPlaying && (
                        <motion.button
                            className="music-btn"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={handlePlayMusic}
                            style={{
                                marginTop: '20px',
                                background: 'linear-gradient(135deg, #FF6F91 0%, #FF9671 100%)',
                                border: 'none',
                                borderRadius: '50px',
                                padding: '15px 25px',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(255, 111, 145, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                margin: '20px auto 0'
                            }}
                        >
                            🎵 You also made me fall for this...
                        </motion.button>
                    )}

                    <p style={{ marginTop: '30px', fontSize: '0.9rem', color: '#FF6F91' }}>
                        {index < messages.length - 1 ? "(Tap to continue)" : "(Tap to finish)"}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
