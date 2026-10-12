import { Fragment, useEffect, useRef, useState } from 'react'

// Hero footage lives in /public. Two cuts: a 16:9 one for desktop/tablet and a
// lighter centre-cropped 9:16 one for phones held upright. WebM is smaller
// (Chrome, Firefox, Edge); MP4 is the fallback for Safari / iOS.
const VARIANTS = {
  landscape: { webm: '/hero.webm', mp4: '/hero.mp4', poster: '/hero-poster.jpg' },
  portrait: { webm: '/hero-portrait.webm', mp4: '/hero-portrait.mp4', poster: '/hero-portrait-poster.jpg' },
}
const PORTRAIT_QUERY = '(max-aspect-ratio: 4/5)'

const HEADLINE = ['We build products', 'that actually ship']
const CHAR_START = 0.35 // seconds before the first letter appears
const CHAR_STEP = 0.028 // stagger between letters

// Splits the headline into letters (kept together per word so lines wrap
// cleanly) and gives each one a staggered blur-in delay.
function RevealLine({ text, offset, suffix }) {
  let n = offset
  return (
    <span className="vh-line">
      {text.split(' ').map((word, wi, words) => (
        <Fragment key={wi}>
          <span className="vh-word-wrap">
            {[...word].map((ch, ci) => (
              <span
                key={ci}
                className="vh-char"
                style={{ animationDelay: `${CHAR_START + n++ * CHAR_STEP}s` }}
              >
                {ch}
              </span>
            ))}
            {wi === words.length - 1 && suffix}
          </span>
          {wi < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}

export default function VideoHero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [muted, setMuted] = useState(true)
  // null until mounted: the pre-rendered HTML ships just the poster, and the
  // browser picks the right video once it knows the screen shape.
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection && navigator.connection.saveData
    if (reduceMotion || saveData) return // poster only

    const mq = window.matchMedia(PORTRAIT_QUERY)
    const pick = () => setVariant(mq.matches ? 'portrait' : 'landscape')
    pick()
    mq.addEventListener('change', pick)
    return () => mq.removeEventListener('change', pick)
  }, [])

  // Pause when off-screen to save battery and data.
  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.05 })
    io.observe(section)
    return () => io.disconnect()
  }, [variant])

  // Browsers only autoplay muted video, so sound is opt-in.
  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    if (!v.muted) v.play().catch(() => {})
    setMuted(v.muted)
  }

  const line2Offset = HEADLINE[0].replace(/ /g, '').length
  const totalChars = line2Offset + HEADLINE[1].replace(/ /g, '').length
  const subDelay = CHAR_START + totalChars * CHAR_STEP + 0.1

  return (
    <section ref={sectionRef} className="vh" aria-label="Calquors — product studio">
      <div className="vh-media">
        {variant && (
          <video
            key={variant}
            ref={videoRef}
            className={`vh-video ${ready ? 'is-ready' : ''}`}
            poster={VARIANTS[variant].poster}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            aria-hidden="true"
          >
            <source src={VARIANTS[variant].webm} type="video/webm" />
            <source src={VARIANTS[variant].mp4} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="vh-scrim" />

      <div className="container vh-inner">
        <div className="vh-copy">
          <h1 className="vh-title">
            <span className="sr-only">{HEADLINE.join(' ')} — Calquors product studio</span>
            <span aria-hidden="true">
              <RevealLine text={HEADLINE[0]} offset={0} />
              <RevealLine
                text={HEADLINE[1]}
                offset={line2Offset}
                suffix={
                  <span
                    className="vh-char vh-reg"
                    style={{ animationDelay: `${CHAR_START + totalChars * CHAR_STEP}s` }}
                  >®</span>
                }
              />
            </span>
          </h1>

          <p className="vh-sub vh-fade" style={{ animationDelay: `${subDelay}s` }}>
            Nobody ships on promises. We prototype it, we find where it breaks,
            and we put working software in your hands. Calquors is built to be
            treated exactly that way.
          </p>
        </div>

        {variant && <button
          className="vh-sound"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
        >
          <span className={`vh-bars ${muted ? '' : 'is-on'}`} aria-hidden="true">
            <i /><i /><i /><i />
          </span>
          {muted ? 'Sound off' : 'Sound on'}
        </button>}
      </div>
    </section>
  )
}
