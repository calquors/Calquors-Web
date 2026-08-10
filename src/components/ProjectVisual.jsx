import React from 'react'

export default function ProjectVisual({ slug }) {
  if (slug === 'revfit') {
    return (
      <div className="proj-visual-container revfit-visual">
        <div className="revfit-mockup">
          <div className="revfit-top font-mono">
            <span className="revfit-badge">WORKOUT LIVE</span>
            <span className="revfit-heart">♥ 148 BPM</span>
          </div>
          <div className="revfit-center">
            <div className="revfit-ring-box">
              <svg viewBox="0 0 100 100" className="revfit-svg-ring">
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="38" fill="none" stroke="#4ade80" strokeWidth="8"
                  strokeDasharray="238.7" strokeDashoffset="55" strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="revfit-ring-inner font-mono">
                <span className="revfit-percent">78%</span>
                <span className="revfit-label">TARGET</span>
              </div>
            </div>
          </div>
          <div className="revfit-metrics font-mono">
            <div className="m-item">
              <span className="m-val">1,280</span>
              <span className="m-lbl">KCAL</span>
            </div>
            <div className="m-item">
              <span className="m-val">45:20</span>
              <span className="m-lbl">TIME</span>
            </div>
            <div className="m-item">
              <span className="m-val">14</span>
              <span className="m-lbl">SETS</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'omeglevc') {
    return (
      <div className="proj-visual-container omeglevc-visual">
        <div className="omeglevc-mockup">
          <div className="omeglevc-bar font-mono">
            <div className="window-dots">
              <span className="dot d-red" />
              <span className="dot d-yellow" />
              <span className="dot d-green" />
            </div>
            <span className="omeglevc-url">https://omeglevc.com</span>
            <span className="omeglevc-tag">WebRTC</span>
          </div>
          <div className="omeglevc-grid">
            <div className="v-feed feed-you">
              <div className="avatarYou" />
              <span className="feed-tag font-mono">You (HD)</span>
              <div className="audio-wave">
                <span /><span /><span />
              </div>
            </div>
            <div className="v-feed feed-peer">
              <div className="avatarPeer" />
              <span className="feed-tag font-mono">Peer #9204</span>
              <span className="latency font-mono">12ms</span>
            </div>
          </div>
          <div className="omeglevc-actions font-mono">
            <span className="btn-icon">🎙</span>
            <span className="btn-icon">📹</span>
            <span className="btn-skip">Next Match →</span>
          </div>
        </div>
      </div>
    )
  }

  // default to rivelo
  return (
    <div className="proj-visual-container rivelo-visual">
      <div className="rivelo-mockup">
        <div className="rivelo-header font-mono">
          <span className="rivelo-title">rivelolabs / engine v2.4</span>
          <span className="rivelo-status">● OPERATIONAL</span>
        </div>
        <div className="rivelo-code font-mono">
          <div className="c-line"><span className="c-kw">const</span> engine = <span className="c-fn">initRiveloCore</span>()</div>
          <div className="c-line">engine.<span className="c-fn">deployGlobal</span>({'{'} edge: <span className="c-str">"active"</span> {'}'})</div>
          <div className="c-line c-ok">✓ 12,400 req/s — 99.99% Uptime</div>
        </div>
        <div className="rivelo-bars">
          {[45, 65, 80, 50, 95, 70, 85, 100, 60, 90].map((h, i) => (
            <div
              key={i}
              className="r-bar-col"
              style={{
                height: `${h}%`,
                background: i === 7 ? 'var(--accent)' : 'rgba(255,255,255,0.25)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
