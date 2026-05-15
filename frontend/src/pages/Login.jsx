import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState('')

  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const API = import.meta.env.VITE_API_URL;

const res = await axios.post(
  `${API}/api/auth/login`,
  form,
  { timeout: 5000 }
);
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      if (res.data.user.role === 'admin') navigate('/admin')
      else navigate('/home')
    } catch (err) {
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError('Server not responding.')
      } else if (!err.response) {
        setError('Cannot connect to server.')
      } else {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
      }
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #0a0a0f;
          --ink2: #14141c;
          --gold: #c9a84c;
          --gold2: #e8c96d;
          --cream: #f5f0e8;
          --muted: #6b6878;
          --line: rgba(201,168,76,0.2);
          --err: #e05c5c;
        }

        .lr {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr;
          background: var(--ink);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 900px) {
          .lr { grid-template-columns: 1fr 1fr; }
        }

        /* ── NOISE TEXTURE overlay ── */
        .lr::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        /* ════ LEFT — VISUAL SIDE ════ */
        .lr-visual {
          display: none;
          position: relative;
          overflow: hidden;
          background: var(--ink2);
          border-right: 1px solid var(--line);
        }
        @media (min-width: 900px) { .lr-visual { display: block; } }

        /* big decorative number */
        .lr-visual .bg-num {
          position: absolute;
          font-family: 'DM Serif Display', serif;
          font-size: 38vw;
          line-height: 1;
          color: rgba(201,168,76,0.04);
          bottom: -4vw;
          left: -3vw;
          user-select: none;
          pointer-events: none;
          letter-spacing: -4px;
        }

        /* Diagonal accent line */
        .lr-visual::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 200%;
          background: linear-gradient(to bottom, transparent, var(--gold), transparent);
          right: 80px;
          top: -50%;
          opacity: 0.15;
          transform: rotate(-8deg);
          transform-origin: top;
        }

        /* Dot grid */
        .dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(201,168,76,0.18) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 70% 60% at 30% 50%, black 30%, transparent 80%);
        }

        .visual-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
        }

        .v-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .v-logo-mark {
          width: 36px; height: 36px;
          border: 1.5px solid var(--gold);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          color: var(--gold);
          font-family: 'DM Serif Display', serif;
        }
        .v-logo-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: var(--cream);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .v-middle {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 0;
        }

        .v-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .v-eyebrow-line {
          width: 32px; height: 1px;
          background: var(--gold);
        }
        .v-eyebrow-text {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
        }

        .v-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.4rem, 3.5vw, 3.6rem);
          color: var(--cream);
          line-height: 1.08;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
        }
        .v-headline em {
          font-style: italic;
          color: var(--gold2);
        }

        .v-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.75;
          max-width: 300px;
          margin-bottom: 2.5rem;
        }

        .v-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .v-tag {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--cream);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 5px 12px;
        }

        .v-bottom {
          border-top: 1px solid var(--line);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .v-stat {
          text-align: center;
        }
        .v-stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--gold2);
        }
        .v-stat-lbl {
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ════ RIGHT — FORM SIDE ════ */
        .lr-form {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
        }

        .form-shell {
          width: 100%;
          max-width: 400px;
          animation: riseIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Mobile logo */
        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2.5rem;
        }
        @media (min-width: 900px) { .mobile-logo { display: none; } }
        .mobile-logo-mark {
          width: 34px; height: 34px;
          border: 1.5px solid var(--gold);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          color: var(--gold);
          font-family: 'DM Serif Display', serif;
        }
        .mobile-logo-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: var(--cream);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .form-step {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .form-step::before {
          content: '';
          width: 20px; height: 1px;
          background: var(--gold);
        }

        .form-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2.4rem;
          color: var(--cream);
          line-height: 1.1;
          margin-bottom: 0.4rem;
          letter-spacing: -0.5px;
        }
        .form-title em {
          font-style: italic;
          color: var(--gold2);
        }
        .form-sub {
          font-size: 13.5px;
          color: var(--muted);
          margin-bottom: 2.2rem;
          line-height: 1.6;
        }

        /* ── Error ── */
        .err-box {
          border: 1px solid rgba(224,92,92,0.3);
          border-left: 2px solid var(--err);
          background: rgba(224,92,92,0.06);
          border-radius: 6px;
          padding: 11px 14px;
          font-size: 13px;
          color: #f08080;
          margin-bottom: 1.4rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Fields ── */
        .field {
          margin-bottom: 1.1rem;
        }
        .field-lbl {
          font-family: 'Syne', sans-serif;
          font-size: 10.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--muted);
          display: block;
          margin-bottom: 7px;
          transition: color 0.2s;
        }
        .field-lbl.active { color: var(--gold); }

        .field-wrap {
          position: relative;
        }
        .field-ico {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #3a3846;
          transition: color 0.2s;
          pointer-events: none;
        }
        .field-ico.active { color: var(--gold); }

        .field-inp {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 13px 14px 13px 42px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: var(--cream);
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field-inp::placeholder { color: #3a3846; }
        .field-inp:focus {
          border-color: var(--gold);
          background: rgba(201,168,76,0.04);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
        }
        .field-inp.padright { padding-right: 44px; }

        .pw-btn {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #3a3846; padding: 3px;
          transition: color 0.2s;
          display: flex; align-items: center;
        }
        .pw-btn:hover { color: var(--gold); }

        /* ── Forgot ── */
        .forgot {
          text-align: right;
          margin-top: -4px;
          margin-bottom: 1.6rem;
        }
        .forgot a {
          font-size: 12px;
          color: var(--muted);
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .forgot a:hover { color: var(--gold); }

        /* ── Submit button ── */
        .sub-btn {
          width: 100%;
          background: var(--gold);
          color: var(--ink);
          border: none;
          border-radius: 8px;
          padding: 14px;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(201,168,76,0.25);
        }
        .sub-btn:hover:not(:disabled) {
          background: var(--gold2);
          transform: translateY(-1px);
          box-shadow: 0 6px 32px rgba(201,168,76,0.35);
        }
        .sub-btn:active:not(:disabled) { transform: translateY(0); }
        .sub-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .sub-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .sub-btn:hover::before { transform: translateX(100%); }

        .spin {
          display: inline-block;
          width: 13px; height: 13px;
          border: 2px solid rgba(10,10,15,0.3);
          border-top-color: var(--ink);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Divider ── */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 1.6rem 0;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #2e2b3a;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.07);
        }

        /* ── Social buttons ── */
        .socials {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 1.8rem;
        }
        .soc-btn {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 11px 10px;
          background: rgba(255,255,255,0.02);
          font-size: 12.5px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: var(--muted);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .soc-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(201,168,76,0.04);
        }

        /* ── Signup ── */
        .signup-line {
          text-align: center;
          font-size: 13px;
          color: var(--muted);
          margin-top: 1.4rem;
        }
        .signup-line a {
          color: var(--gold2);
          font-weight: 600;
          text-decoration: none;
          font-family: 'Syne', sans-serif;
        }
        .signup-line a:hover { text-decoration: underline; }

        .back-link {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          margin-top: 1rem;
          font-size: 12px;
          color: #2e2b3a;
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--gold); }
      `}</style>

      <div className="lr">

        {/* ═══ LEFT VISUAL PANEL ═══ */}
        <div className="lr-visual">
          <div className="dot-grid" />
          <div className="bg-num">S</div>

          <div className="visual-content">
            {/* Logo */}
            <div className="v-logo">
              <div className="v-logo-mark">S</div>
              <span className="v-logo-name">Store</span>
            </div>

            {/* Middle */}
            <div className="v-middle">
              <div className="v-eyebrow">
                <div className="v-eyebrow-line" />
                <span className="v-eyebrow-text">Premium Commerce</span>
              </div>
              <h2 className="v-headline">
                Curated for<br />
                those with<br />
                <em>discerning</em> taste.
              </h2>
              <p className="v-desc">
                Access an exclusive catalog of hand-picked products,
                personalized recommendations, and priority delivery —
                all crafted around you.
              </p>
              <div className="v-tags">
                {['Free Delivery', 'Easy Returns', 'Secure Checkout', 'Member Perks'].map(t => (
                  <span key={t} className="v-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Stats bottom */}
            <div className="v-bottom">
              {[['50K+', 'Members'], ['2M+', 'Products'], ['4.9', 'Avg Rating']].map(([v, l]) => (
                <div key={l} className="v-stat">
                  <div className="v-stat-val">{v}</div>
                  <div className="v-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ RIGHT FORM PANEL ═══ */}
        <div className="lr-form">
          <div className="form-shell">

            {/* Mobile logo */}
            <div className="mobile-logo">
              <div className="mobile-logo-mark">S</div>
              <span className="mobile-logo-name">Store</span>
            </div>

            <div className="form-step">Sign In</div>
            <h1 className="form-title">Welcome<br /><em>back.</em></h1>
            <p className="form-sub">Your account is waiting. Pick up where you left off.</p>

            {/* Error */}
            {error && (
              <div className="err-box">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {error}
              </div>
            )}

            {/* Social */}
            <div className="socials">
              <button className="soc-btn">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="soc-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <div className="divider">or continue with email</div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="field">
                <label className={`field-lbl ${focused === 'email' ? 'active' : ''}`}>Email</label>
                <div className="field-wrap">
                  <span className={`field-ico ${focused === 'email' ? 'active' : ''}`}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="your@email.com"
                    className="field-inp"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label className={`field-lbl ${focused === 'password' ? 'active' : ''}`}>Password</label>
                <div className="field-wrap">
                  <span className={`field-ico ${focused === 'password' ? 'active' : ''}`}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password" value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    placeholder="••••••••"
                    className="field-inp padright"
                    required
                  />
                  <button type="button" className="pw-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="forgot">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} className="sub-btn">
                {loading ? (
                  <><span className="spin" />Authenticating…</>
                ) : (
                  'Access My Account →'
                )}
              </button>
            </form>

            <p className="signup-line">
              New here?{' '}
              <Link to="/signup">Create an account</Link>
            </p>

            <Link to="/" className="back-link">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login