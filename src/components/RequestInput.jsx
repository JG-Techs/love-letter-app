import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

export default function RequestInput() {
    const [request, setRequest] = useState('')
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [savedRequest, setSavedRequest] = useState(null)
    const [isSending, setIsSending] = useState(false)

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
    const SERVICE_ID = "service_ral5j6o"
    const TEMPLATE_ID = "template_23gb1jd"
    const PUBLIC_KEY = "dlqF1VOAI5bLPsxiO"

    useEffect(() => {
        const existing = localStorage.getItem('love_letter_request')
        if (existing) {
            setSavedRequest(existing)
            setSubmitted(true)
        }
    }, [])

    const handleSubmit = async () => {
        if (!request.trim()) return

        setIsSending(true)

        // Save to local storage immediately
        localStorage.setItem('love_letter_request', request)

        try {
            // Prepare template params
            const templateParams = {
                order_id: Math.floor(1000 + Math.random() * 9000), // Random 4-digit ID for subject
                request: request,           // Matches {{request}} in your template
                email: email,               // Matches {{email}} - recipient address
                from_name: "Jom",           // Matches {{from_name}} in your template
                to_name: "My Love",
                reply_to: email,
            }

            // Send email using EmailJS
            // NOTE: You might need two separate templates/calls if you want distinct emails (one to you, one to her)
            // Or just use the Auto-Reply feature in EmailJS dashboard for the receipt.
            // This call usually sends the main notification to YOU (the owner of EmailJS account)
            if (SERVICE_ID !== "YOUR_SERVICE_ID") {
                await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            } else {
                console.log("EmailJS keys not set, simulating success.")
                await new Promise(resolve => setTimeout(resolve, 1500))
            }

        } catch (error) {
            console.error("Failed to send email:", error)
            // Show detailed error for debugging
            const errorMsg = error?.text || error?.message || JSON.stringify(error)
            alert(`EmailJS Error: ${errorMsg}\n\nBut I saved your wish! 💗`)
        } finally {
            setIsSending(false)
            setSavedRequest(request)
            setSubmitted(true)
        }
    }

    if (submitted) {
        return (
            <div className="card">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <h2 style={{ marginBottom: '15px' }}>Request Received 💗</h2>
                    <p style={{ marginBottom: '20px' }}>I’ll do my best to make this come true.</p>

                    <div style={{
                        background: '#FFF0F5',
                        padding: '20px',
                        borderRadius: '15px',
                        marginTop: '20px',
                        border: '2px dashed #FF6F91'
                    }}>
                        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', fontWeight: '600', color: '#FF6F91' }}>
                            "{savedRequest}"
                        </p>
                    </div>
                    {email && <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#888' }}>Receipt sent to {email} 💌</p>}

                    <button
                        onClick={() => {
                            localStorage.removeItem('love_letter_request')
                            setSavedRequest(null)
                            setSubmitted(false)
                            setRequest('')
                        }}
                        style={{
                            marginTop: '25px',
                            background: 'transparent',
                            color: '#FF6F91',
                            border: '1px solid #FF6F91',
                            padding: '8px 16px',
                            fontSize: '0.9rem'
                        }}
                    >
                        Send Another ↻
                    </button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="card">
            <h2 style={{ marginBottom: '20px' }}>Make a Wish</h2>

            <textarea
                rows="4"
                placeholder="Anything... a date, a promise, a hug, or even something silly"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                disabled={isSending}
            />

            <input
                type="email"
                placeholder="Your email (for a cute receipt) 💌"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: '10px' }}
                disabled={isSending}
            />

            <button onClick={handleSubmit} disabled={!request.trim() || isSending}>
                {isSending ? "Sending... 🚀" : "Send my request 💌"}
            </button>
        </div>
    )
}
