"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { displayDate, event } from "@/data/event";
import { downloadCalendar, getCountdownTarget } from "@/lib/calendar";

const links = [
  { href: "#our-night", label: "Our Night" },
  { href: "#sola", label: "Sola" },
  { href: "#countdown", label: "Countdown" },
  { href: "#photos", label: "Photos" }
];

function Reveal({ children, className = "", effect = "rise", delay = 0 }: { children: React.ReactNode; className?: string; effect?: "rise" | "scale" | "left" | "right"; delay?: number }) {
  const reduce = useReducedMotion();
  const initial = effect === "scale" ? { opacity: 0, y: 28, scale: 0.97 } : effect === "left" ? { opacity: 0, x: -38 } : effect === "right" ? { opacity: 0, x: 38 } : { opacity: 0, y: 38 };
  return <motion.div className={className} initial={reduce ? false : initial} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Ornament({ light = false }: { light?: boolean }) {
  return <div className={`ornament ${light ? "ornament-light" : ""}`} aria-hidden="true"><span /><b>✽</b><span /></div>;
}

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={`button ${className}`} href={href} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true">↗</span></a>;
}

function CalendarButton({ className = "" }: { className?: string }) {
  return <button type="button" className={`button ${className}`} onClick={downloadCalendar}>ADD TO CALENDAR<span aria-hidden="true">↗</span></button>;
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`navigation ${scrolled ? "navigation-scrolled" : ""}`}>
    <a href="#top" className="nav-monogram" aria-label="Marwan and Sohila, back to top">M <span>✦</span> S</a>
    <nav className={open ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
      {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
    </nav>
    <button type="button" className="menu-button" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span /><span /></button>
  </header>;
}

function FloralFrame({ backgroundShift, nearTopShift, nearBottomShift }: { backgroundShift: MotionValue<number> | number; nearTopShift: MotionValue<number> | number; nearBottomShift: MotionValue<number> | number }) {
  return <>
    <motion.div className="hero-image" style={{ y: backgroundShift }} aria-hidden="true"><Image src="/images/hero-frame.webp" alt="" fill priority sizes="100vw" quality={82} className="hero-background" /></motion.div>
    <div className="hero-vignette" aria-hidden="true" />
    <motion.div className="floral-layer floral-layer-top" style={{ y: nearTopShift }} aria-hidden="true"><Image src="/images/floral-near-top.webp" alt="" fill priority sizes="(max-width: 700px) 67vw, 58vw" /></motion.div>
    <motion.div className="floral-layer floral-layer-bottom" style={{ y: nearBottomShift }} aria-hidden="true"><Image src="/images/floral-near-bottom.webp" alt="" fill priority sizes="(max-width: 700px) 70vw, 52vw" /></motion.div>
  </>;
}

function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const imageShift = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const topShift = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const bottomShift = useTransform(scrollYProgress, [0, 1], [0, 105]);
  return <section ref={section} id="top" className="hero" aria-labelledby="hero-title">
    <FloralFrame backgroundShift={reduce ? 0 : imageShift} nearTopShift={reduce ? 0 : topShift} nearBottomShift={reduce ? 0 : bottomShift} />
    <div className="hero-content">
      <p className="hero-intro">{event.introLine}</p>
      <h1 id="hero-title" className="hero-names"><span>{event.groom}</span><em>&amp;</em><span>{event.bride}</span></h1>
      <p className="hero-invitation">{event.invitationLine}</p>
      <Ornament />
      <p className="hero-date">{displayDate}</p>
      <p className="hero-venue">{event.venue}</p>
      <p className="hero-signature">{event.closingLine}</p>
    </div>
    <a className="scroll-cue" href="#our-night" aria-label="Scroll to our night"><span>SCROLL TO DISCOVER</span><i /></a>
  </section>;
}

function EventDetails() {
  return <section id="our-night" className="evening section-pad">
    <Reveal className="section-eyebrow"><span>01</span> THE INVITATION</Reveal>
    <Reveal className="evening-inner">
      <p className="script-accent">With all our love</p>
      <h2>An Evening Where<br /><i>Love Blooms</i></h2>
      <Ornament />
      <p className="evening-copy">Together with our families,<br />we invite you to share a night filled with love,<br className="desktop-break" /> warmth, laughter, and memories.</p>
    </Reveal>
    <Reveal className="date-composition" effect="scale"><span>FRIDAY</span><strong>27</strong><span>NOVEMBER<br />2026</span></Reveal>
  </section>;
}

function VenueSection() {
  return <section id="sola" className="venue section-pad">
    <div className="venue-topline"><span>02 / THE SETTING</span><span>{event.venue}</span></div>
    <Reveal className="venue-heading"><p className="script-accent">Where we&apos;ll meet</p><h2>{event.venueBrand}</h2><p>{event.venueTagline}</p></Reveal>
    <Reveal className="venue-image-wrap" effect="scale"><Image src="/images/sola-editorial.webp" alt="A floral celebration setting inspired by SOLA, with draped arches and glowing lanterns" fill sizes="(max-width: 700px) 100vw, 90vw" quality={85} className="venue-image" /><div className="venue-image-shade" /></Reveal>
    <Reveal className="venue-bottom"><p>A setting illuminated by lanterns,<br />wrapped in flowers, and made for<br />an unforgettable night.</p><ExternalLink href={event.mapsUrl} className="button-outline-light">VIEW LOCATION</ExternalLink></Reveal>
  </section>;
}

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, getCountdownTarget().getTime() - Date.now()));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);
  const seconds = Math.floor((remaining ?? 0) / 1000);
  const units = [
    { label: "DAYS", value: Math.floor(seconds / 86400) },
    { label: "HOURS", value: Math.floor((seconds % 86400) / 3600) },
    { label: "MINUTES", value: Math.floor((seconds % 3600) / 60) },
    { label: "SECONDS", value: seconds % 60 }
  ];
  return <section id="countdown" className="countdown section-pad">
    <div className="section-eyebrow"><span>03</span> THE WAIT</div>
    <Reveal className="countdown-inner"><p className="script-accent">Counting the moments</p><h2>Until Our Forever<br /><i>Begins</i></h2><Ornament />
      {remaining === 0 ? <p className="countdown-finished">Tonight, our forever blooms.</p> : <div className="countdown-grid" aria-label="Time until November 27, 2026">{units.map((unit, index) => <motion.div className="countdown-unit" key={unit.label} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}><strong>{remaining === null ? "--" : String(unit.value).padStart(2, "0")}</strong><span>{unit.label}</span></motion.div>)}</div>}
      <p className="countdown-date">{displayDate} <span>✦</span> {event.venue}</p>
    </Reveal>
  </section>;
}

function PhotoUploadCTA() {
  return <section id="photos" className="photos section-pad">
    <div className="photos-layout">
      <Reveal className="photos-art" effect="left"><div className="photo-back"><Image src="/images/hero-frame.webp" alt="" fill sizes="(max-width: 700px) 70vw, 30vw" className="photo-crop" /></div><div className="photo-front"><Image src="/images/sola-editorial.webp" alt="Flowers and lanterns at a celebration setting inspired by SOLA" fill sizes="(max-width: 700px) 65vw, 28vw" className="photo-crop" /></div><span className="photo-spark" aria-hidden="true">✺</span></Reveal>
      <Reveal className="photos-copy" effect="right" delay={0.12}><div className="section-eyebrow"><span>04</span> THE MEMORIES</div><p className="script-accent">Every moment matters</p><h2>Share Our <i>Night</i></h2><Ornament /><p className="photos-lead">Captured a beautiful moment?<br />Help us collect the memories of our night.</p><ExternalLink href={event.photosUrl} className="button-burgundy">ADD YOUR PHOTOS</ExternalLink><p className="photos-note">Share your favorite moments from the celebration.</p></Reveal>
    </div>
  </section>;
}

function MusicToggle() {
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  useEffect(() => {
    let active = true;
    fetch("/music.mp3", { method: "HEAD" }).then(response => { if (active && response.ok && response.headers.get("content-type")?.includes("audio")) setAvailable(true); }).catch(() => {});
    return () => { active = false; };
  }, []);
  useEffect(() => () => { audio?.pause(); }, [audio]);
  if (!available) return null;
  const toggle = async () => {
    const player = audio ?? new Audio("/music.mp3");
    if (!audio) { player.loop = true; setAudio(player); }
    if (playing) { player.pause(); setPlaying(false); }
    else { try { await player.play(); setPlaying(true); } catch { setPlaying(false); } }
  };
  return <button type="button" className="music-toggle" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}><span aria-hidden="true">♫</span> {playing ? "Pause music" : "Play music"}</button>;
}

function Footer() {
  return <footer className="footer"><span>M ✦ S</span><span>{displayDate}</span><span>{event.closingLine}</span></footer>;
}

export default function Home() {
  const [intro, setIntro] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setIntro(false), 600); return () => clearTimeout(timer); }, []);
  return <>
    {intro && <div className="intro-screen" aria-hidden="true"><span>M <i>✦</i> S</span></div>}
    <Navigation />
    <main><Hero /><EventDetails /><VenueSection /><Countdown /><PhotoUploadCTA />
      <section className="closing section-pad"><Reveal><p className="script-accent">A beautiful beginning</p><h2>{event.groom} <em>&amp;</em> {event.bride}</h2><p className="closing-date">{displayDate}</p><Ornament light /><p className="closing-message">We cannot wait to celebrate with you.</p><div className="closing-actions"><ExternalLink href={event.mapsUrl} className="button-outline-light">OPEN LOCATION</ExternalLink><ExternalLink href={event.photosUrl} className="button-outline-light">ADD YOUR PHOTOS</ExternalLink><CalendarButton className="button-outline-light" /></div></Reveal></section>
    </main>
    <Footer /><MusicToggle />
  </>;
}
