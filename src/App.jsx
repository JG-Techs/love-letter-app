import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Landing from './components/Landing'
import Letter from './components/Letter'
import Transition from './components/Transition'
import RequestInput from './components/RequestInput'
import './index.css'

function App() {
  const [step, setStep] = useState(0)

  // 0: Landing
  // 1: Letter
  // 2: Transition
  // 3: Input / Result

  const nextStep = () => setStep(prev => prev + 1)

  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.div
          key="landing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Landing onNext={nextStep} />
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          key="letter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Letter onComplete={nextStep} />
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          key="transition"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Transition onNext={nextStep} />
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          key="request"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RequestInput />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
