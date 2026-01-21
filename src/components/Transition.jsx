import { motion } from 'framer-motion'

export default function Transition({ onNext }) {
    return (
        <div className="card">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <p style={{ fontSize: '1.3rem', marginBottom: '20px' }}>
                    I can’t promise everything...<br />
                    but I promise I’ll try.
                </p>
                <button onClick={onNext}>
                    One thing you want from me
                </button>
            </motion.div>
        </div>
    )
}
