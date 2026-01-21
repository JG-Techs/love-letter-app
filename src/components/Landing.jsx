import { motion } from 'framer-motion'

export default function Landing({ onNext }) {
    return (
        <div className="card">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1>Hi Babe 💗</h1>
                <p style={{ marginTop: '15px', fontSize: '1.2rem', color: '#666' }}>
                    I made something just for you.
                </p>
                <button onClick={onNext}>
                    Open my letter
                </button>
            </motion.div>
        </div>
    )
}
