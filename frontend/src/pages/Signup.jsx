import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [focused, setFocused] = useState('')
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (!agreed) { setError('Please agree to the Terms & Privacy Policy.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${API}/api/auth/register`, {
        name: form.name, email: form.email, password: form.password,
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
      setLoading(false)
    }
  }

  const passwordStrength = pw => {
    if (!pw) return 0
    let s = 0
    if (pw.length >= 8) s++
    if (/[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    return s
  }
  const strength = passwordStrength(form.password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColors = ['', '#ef4444', '#f97316', '#3b82f6', '#10b981']
  const strengthColor = strengthColors[strength]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Barlow+Condensed:wght@500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --white: #ffffff;
          --off: #f7f6f3;
          --paper: #faf9f6;
          --ink: #0d0d0d;
          --ink2: #1a1a1a;
          --mid: #6b6b6b;
          --lite: #c8c8c4;
          --accent: #e8321a;
          --accent2: #ff5a3d;
          --rule: #e0deda;
        }

        .su-root {
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          background: var(--paper);
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr;
          position: relative;
        }
        @media (min-width: 900px) {
          .su-root {
            grid-template-columns: 1fr 520px;
            grid-template-rows: 1fr;
          }
        }

        /* ═══════════════════════════════════════
           HEADER BAR (mobile only)
        ═══════════════════════════════════════ */
        .su-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid var(--rule);
          background: var(--white);
        }
        @media (min-width: 900px) { .su-topbar { display: none; } }

        .topbar-brand {
          display: flex; align-items: center; gap: 10px;
        }
        .topbar-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          color: var(--ink);
        }
        .topbar-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          margin-bottom: 2px;
        }
        .topbar-signin {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--mid);
          text-decoration: none;
          transition: color 0.2s;
        }
        .topbar-signin:hover { color: var(--accent); }

        /* ═══════════════════════════════════════
           LEFT — EDITORIAL PANEL
        ═══════════════════════════════════════ */
        .su-editorial {
          display: none;
          position: relative;
          overflow: hidden;
          background: var(--ink);
        }
        @media (min-width: 900px) { .su-editorial { display: block; } }

        /* Cross-hatch background */
        .su-editorial::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Big letter watermark */
        .ed-watermark {
          position: absolute;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52vw;
          line-height: 0.85;
          color: rgba(255,255,255,0.025);
          bottom: -2vw;
          right: -4vw;
          letter-spacing: -8px;
          pointer-events: none;
          user-select: none;
        }
        @media (min-width: 900px) { .ed-watermark { font-size: 28vw; } }

        /* Red accent slash */
        .ed-slash {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 5px;
          background: var(--accent);
        }

        .ed-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 3.5rem 3rem;
        }

        /* Top nav */
        .ed-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: auto;
        }
        .ed-brand {
          display: flex; align-items: center; gap: 10px;
        }
        .ed-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 4px;
          color: var(--white);
        }
        .ed-brand-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
        }
        .ed-issue {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          font-weight: 500;
        }

        /* Center text */
        .ed-main {
          padding: 3rem 0;
        }

        .ed-kicker {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 1.8rem;
        }
        .ed-kicker-bar {
          width: 40px; height: 2px;
          background: var(--accent);
        }
        .ed-kicker-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
        }

        .ed-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 6vw, 6.5rem);
          line-height: 0.95;
          color: var(--white);
          letter-spacing: 2px;
          margin-bottom: 2rem;
        }
        .ed-headline .red { color: var(--accent); }

        .ed-rule {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin-bottom: 2rem;
        }

        .ed-body {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          max-width: 360px;
          font-weight: 300;
          font-style: italic;
          margin-bottom: 2.5rem;
        }

        /* Benefits grid */
        .ed-benefits {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .ed-benefit {
          padding: 1.2rem;
          border-right: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .ed-benefit:nth-child(even) { border-right: none; }
        .ed-benefit:nth-child(3),
        .ed-benefit:nth-child(4) { border-bottom: none; }

        .ed-benefit-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          line-height: 1;
          color: var(--accent);
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .ed-benefit-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }
        .ed-benefit-title {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          margin-top: 2px;
        }

        /* Footer of left panel */
        .ed-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ed-footer-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .ed-footer-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(232,50,26,0.15);
          border: 1px solid rgba(232,50,26,0.3);
          border-radius: 2px;
          padding: 4px 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
        }
        .ed-footer-tag::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ═══════════════════════════════════════
           RIGHT — FORM PANEL
        ═══════════════════════════════════════ */
        .su-form-panel {
          background: var(--white);
          border-left: 1px solid var(--rule);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .su-form-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 3rem 2.5rem;
          max-width: 100%;
        }
        @media (min-width: 900px) {
          .su-form-inner { padding: 4rem 3rem; }
        }

        /* Top of form */
        .form-header {
          margin-bottom: 2.4rem;
          animation: slideIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .form-step-label {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 1rem;
        }
        .step-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--white);
          background: var(--accent);
          padding: 3px 8px;
          border-radius: 2px;
        }
        .step-of {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--lite);
        }

        .form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3.2rem;
          line-height: 0.95;
          color: var(--ink);
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }
        .form-sub {
          font-size: 14px;
          color: var(--mid);
          font-weight: 300;
          font-style: italic;
        }

        /* Error */
        .err {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px;
          background: rgba(232,50,26,0.06);
          border-left: 3px solid var(--accent);
          border-radius: 2px;
          font-size: 13px;
          color: var(--accent);
          margin-bottom: 1.4rem;
          animation: slideIn 0.3s ease both;
        }

        /* Fields */
        .field {
          margin-bottom: 1.1rem;
          animation: slideIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .field:nth-child(1) { animation-delay: 0.05s; }
        .field:nth-child(2) { animation-delay: 0.1s; }
        .field:nth-child(3) { animation-delay: 0.15s; }
        .field:nth-child(4) { animation-delay: 0.2s; }

        .field-label {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--mid);
          margin-bottom: 7px;
          transition: color 0.2s;
        }
        .field-label.active { color: var(--ink); }
        .field-label::before {
          content: '';
          display: inline-block;
          width: 3px; height: 12px;
          background: var(--accent);
          border-radius: 1px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .field-label.active::before { opacity: 1; }

        .field-wrap {
          position: relative;
        }
        .field-input {
          width: 100%;
          background: var(--off);
          border: 1.5px solid var(--rule);
          border-radius: 4px;
          padding: 13px 14px 13px 44px;
          font-size: 14.5px;
          font-family: 'Barlow', sans-serif;
          font-weight: 400;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field-input::placeholder { color: var(--lite); font-style: italic; }
        .field-input:focus {
          border-color: var(--ink);
          background: var(--white);
          box-shadow: 4px 4px 0 rgba(0,0,0,0.06);
        }
        .field-input.pr { padding-right: 44px; }

        .field-ico {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          color: var(--lite);
          pointer-events: none;
          transition: color 0.2s;
        }
        .field-ico.active { color: var(--ink); }

        .pw-btn {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: var(--lite); padding: 3px;
          display: flex; align-items: center;
          transition: color 0.2s;
        }
        .pw-btn:hover { color: var(--ink); }

        /* Strength bar */
        .strength-row {
          display: flex; align-items: center; gap: 8px; margin-top: 8px;
        }
        .s-bars { display: flex; gap: 3px; flex: 1; }
        .s-bar {
          flex: 1; height: 3px; border-radius: 99px;
          background: var(--rule); transition: background 0.3s;
        }
        .s-lbl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          min-width: 44px; text-align: right;
          transition: color 0.3s;
        }

        /* Match indicator */
        .match-row {
          display: flex; align-items: center; gap: 5px;
          margin-top: 7px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
        }

        /* Terms */
        .terms-row {
          display: flex; align-items: flex-start; gap: 10px;
          margin: 1rem 0 1.4rem;
        }
        .terms-check {
          width: 18px; height: 18px;
          border: 2px solid var(--lite);
          border-radius: 3px;
          flex-shrink: 0;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
          transition: border-color 0.2s, background 0.2s;
        }
        .terms-check.on {
          background: var(--ink);
          border-color: var(--ink);
        }
        .terms-text {
          font-size: 12.5px;
          color: var(--mid);
          line-height: 1.6;
          font-weight: 300;
        }
        .terms-text a {
          color: var(--ink);
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
        }
        .terms-text a:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        /* Submit */
        .sub-btn {
          width: 100%;
          background: var(--ink);
          color: var(--white);
          border: 2px solid var(--ink);
          border-radius: 4px;
          padding: 15px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 4px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .sub-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .sub-btn:hover:not(:disabled)::before { transform: translateX(0); }
        .sub-btn span { position: relative; z-index: 1; }
        .sub-btn:active:not(:disabled) { transform: scale(0.99); }
        .sub-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .spin {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 10px;
          vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Divider */
        .or-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 1.4rem 0;
        }
        .or-divider::before, .or-divider::after {
          content: ''; flex: 1; height: 1px; background: var(--rule);
        }
        .or-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; color: var(--lite);
        }

        /* Social */
        .social-btns {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
          margin-bottom: 1.4rem;
        }
        .soc {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          border: 1.5px solid var(--rule);
          border-radius: 4px;
          padding: 11px 12px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--mid); background: var(--off);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .soc:hover {
          border-color: var(--ink);
          color: var(--ink);
          background: var(--white);
        }

        /* Bottom links */
        .form-bottom {
          margin-top: 1.4rem;
          padding-top: 1.4rem;
          border-top: 1px solid var(--rule);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .already {
          font-size: 13px; color: var(--mid);
        }
        .already a {
          font-weight: 700; color: var(--ink); text-decoration: none;
          border-bottom: 1.5px solid var(--ink);
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
        }
        .already a:hover { color: var(--accent); border-color: var(--accent); }

        .back-link {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--lite); text-decoration: none;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--accent); }
      `}</style>

      <div className="su-root">

        {/* Mobile top bar */}
        <div className="su-topbar">
          <div className="topbar-brand">
            <div className="topbar-dot" />
            <span className="topbar-logo">Store</span>
          </div>
          <Link to="/login" className="topbar-signin">Sign In →</Link>
        </div>

        {/* ═══ LEFT EDITORIAL PANEL ═══ */}
        <div className="su-editorial">
          <div className="ed-slash" />
          <div className="ed-watermark">N</div>

          <div className="ed-content">
            <div className="ed-nav">
              <div className="ed-brand">
                <div className="ed-brand-dot" />
                <span className="ed-brand-name">Store</span>
              </div>
              <span className="ed-issue">Est. 2024</span>
            </div>

            <div className="ed-main">
              <div className="ed-kicker">
                <div className="ed-kicker-bar" />
                <span className="ed-kicker-text">New Member</span>
              </div>
              <h2 className="ed-headline">
                JOIN<br />
                THE <span className="red">INNER</span><br />
                CIRCLE
              </h2>
              <div className="ed-rule" />
              <p className="ed-body">
                Every great journey starts with a single step.
                Yours begins here — with access to curated products,
                member-only pricing, and a community of discerning shoppers.
              </p>

              <div className="ed-benefits">
                {[
                  { num: '10%', label: 'Welcome', title: 'Off first order' },
                  { num: '50K', label: 'Community', title: 'Active members' },
                  { num: '$0', label: 'Shipping', title: 'Over $50 orders' },
                  { num: '4.9', label: 'Rating', title: 'Avg. review score' },
                ].map(b => (
                  <div key={b.label} className="ed-benefit">
                    <div className="ed-benefit-num">{b.num}</div>
                    <div className="ed-benefit-label">{b.label}</div>
                    <div className="ed-benefit-title">{b.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ed-footer">
              <span className="ed-footer-text">© 2024 Store Inc.</span>
              <span className="ed-footer-tag">Free to join</span>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT FORM PANEL ═══ */}
        <div className="su-form-panel">
          <div className="su-form-inner">

            <div className="form-header">
              <div className="form-step-label">
                <span className="step-num">New Account</span>
                <span className="step-of">— Takes 30 seconds</span>
              </div>
              <h1 className="form-title">Create<br />Account</h1>
              <p className="form-sub">Free forever. No credit card required.</p>
            </div>

            {error && (
              <div className="err">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Social */}
            <div className="social-btns">
              <button className="soc">
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="soc">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <div className="or-divider"><span className="or-text">or with email</span></div>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="field">
                <label className={`field-label ${focused === 'name' ? 'active' : ''}`}>Full Name</label>
                <div className="field-wrap">
                  <span className={`field-ico ${focused === 'name' ? 'active' : ''}`}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="e.g. Alex Johnson"
                    className="field-input"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="field">
                <label className={`field-label ${focused === 'email' ? 'active' : ''}`}>Email</label>
                <div className="field-wrap">
                  <span className={`field-ico ${focused === 'email' ? 'active' : ''}`}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="you@email.com"
                    className="field-input"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label className={`field-label ${focused === 'password' ? 'active' : ''}`}>Password</label>
                <div className="field-wrap">
                  <span className={`field-ico ${focused === 'password' ? 'active' : ''}`}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password" value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    placeholder="Min. 8 characters"
                    className="field-input pr"
                    required
                  />
                  <button type="button" className="pw-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    }
                  </button>
                </div>
                {form.password && (
                  <div className="strength-row">
                    <div className="s-bars">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="s-bar" style={{ background: i <= strength ? strengthColor : undefined }} />
                      ))}
                    </div>
                    <span className="s-lbl" style={{ color: strengthColor }}>{strengthLabel}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="field">
                <label className={`field-label ${focused === 'confirm' ? 'active' : ''}`}>Confirm Password</label>
                <div className="field-wrap">
                  <span className={`field-ico ${focused === 'confirm' ? 'active' : ''}`}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword" value={form.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused('')}
                    placeholder="Repeat your password"
                    className="field-input pr"
                    required
                  />
                  <button type="button" className="pw-btn" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    }
                  </button>
                </div>
                {form.confirmPassword && (
                  <div className="match-row" style={{ color: form.password === form.confirmPassword ? '#10b981' : '#ef4444' }}>
                    {form.password === form.confirmPassword
                      ? <><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> Match</>
                      : <><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg> No match</>
                    }
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="terms-row">
                <div className={`terms-check ${agreed ? 'on' : ''}`} onClick={() => setAgreed(!agreed)}>
                  {agreed && (
                    <svg width="11" height="11" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </div>
                <p className="terms-text">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. I confirm I'm 18+.
                </p>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} className="sub-btn">
                {loading
                  ? <><span className="spin" /><span>Creating Account…</span></>
                  : <span>Create My Account →</span>
                }
              </button>
            </form>

            <div className="form-bottom">
              <p className="already">Already a member? <Link to="/login">Sign in</Link></p>
              <Link to="/" className="back-link">
                <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signup