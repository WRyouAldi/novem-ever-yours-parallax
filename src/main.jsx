import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./site.css";

const asset = (path) => `https://raw.githubusercontent.com/WRyouAldi/-novem-ever-yours-/main/assets/${path}`;

function FloatingPetals() {
  return <div className="petal-field" aria-hidden="true">{Array.from({length:9},(_,i)=><i key={i} style={{"--i":i}}>✿</i>)}</div>;
}

function Hero() {
  const ref=useRef(null);
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:["start start","end start"]});
  const backY=useTransform(scrollYProgress,[0,1],[0,reduce?0:150]);
  const midY=useTransform(scrollYProgress,[0,1],[0,reduce?0:85]);
  const frontY=useTransform(scrollYProgress,[0,1],[0,reduce?0:-45]);
  const titleY=useTransform(scrollYProgress,[0,1],[0,reduce?0:90]);
  const opacity=useTransform(scrollYProgress,[0,.72,1],[1,.55,0]);
  return <section className="hero" id="top" ref={ref}>
    <motion.div className="hero-photo hero-photo-back" style={{y:backY}} />
    <motion.div className="hero-atmosphere" style={{y:midY}} />
    <motion.div className="hero-florals" style={{y:frontY}} aria-hidden="true"><span>✿</span><span>✧</span><span>✿</span></motion.div>
    <motion.div className="hero-copy" style={{y:titleY,opacity}}>
      <p className="eyebrow">27 · 11 · 25 — OUR LITTLE UNIVERSE</p>
      <h1>Novem-ever<br/><em>Yours.</em></h1>
      <p className="hero-sub">A love story, written in every season.</p>
      <a className="text-link" href="#beginning">SCROLL TO BEGIN <span>↓</span></a>
    </motion.div>
    <div className="hero-side-note">TWO HEARTS · ONE JOURNEY</div>
  </section>;
}

function StorySection({number,kicker,title,body,image,align="left"}) {
  const ref=useRef(null);
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
  const imageY=useTransform(scrollYProgress,[0,1],[reduce?0:90,reduce?0:-90]);
  const textY=useTransform(scrollYProgress,[0,1],[reduce?0:35,reduce?0:-35]);
  return <section className={`story story-${align}`} ref={ref}>
    <div className="story-index">{number}</div>
    <motion.div className="story-image-wrap" style={{y:imageY}}><img src={asset(image)} alt={title} loading="lazy"/></motion.div>
    <motion.div className="story-copy" style={{y:textY}}>
      <p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{body}</p>
    </motion.div>
  </section>;
}

function Journey() {
  const ref=useRef(null);
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:["start 75%","end 55%"]});
  const scale=useTransform(scrollYProgress,[0,1],[0,1]);
  return <section className="journey" ref={ref} id="journey">
    <p className="eyebrow">THE LITTLE THINGS BECAME EVERYTHING</p>
    <h2>Our Journey</h2>
    <div className="journey-line"><motion.span style={{scaleY:reduce?1:scale}} /></div>
    <div className="milestones">
      {[["27","The beginning"],["11","A day to remember"],["25","Our promise"],["∞","And still, forever"]].map(([date,label],i)=><motion.article className="milestone" key={date} initial={reduce?false:{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.5}} transition={{duration:.7,delay:i*.08}}><span>{date}</span><p>{label}</p></motion.article>)}
    </div>
  </section>;
}

function Closing() {
  const ref=useRef(null);
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
  const flowerY=useTransform(scrollYProgress,[0,1],[reduce?0:65,reduce?0:-65]);
  const flowerRotate=useTransform(scrollYProgress,[0,1],reduce?[0,0]:[-12,12]);
  return <section className="closing" id="forever" ref={ref}>
    <motion.div className="closing-flower" style={{y:flowerY,rotate:flowerRotate}} aria-hidden="true">✿</motion.div>
    <p className="eyebrow">IN EVERY SEASON, IN EVERY VERSION OF US</p>
    <h2>Forever &<br/><em>Always.</em></h2>
    <p className="closing-note">Novem-ever yours, with all my love.</p>
    <a href="#top" className="text-link">BACK TO OUR UNIVERSE ↑</a>
  </section>;
}

function App() {
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll();
  const progress=useTransform(scrollYProgress,[0,1],[0,1]);
  return <main>
    <motion.div className="reading-progress" style={{scaleX:progress}} />
    <Hero />
    <div className="intro" id="beginning"><p className="eyebrow">A STORY THAT FEELS LIKE HOME</p><h2>Some moments pass.<br/><em>Some become our forever.</em></h2><p>Take your time. This little world is made to be felt, not rushed.</p></div>
    <StorySection number="01" kicker="WHERE IT ALL BEGAN" title="The Beginning" body="Dari satu hari sederhana, tumbuh cerita yang ingin selalu kita jaga. Setiap langkah kecil membawa kita ke tempat yang sama: saling memilih." image="photos/cover.webp" />
    <StorySection number="02" kicker="MOMENTS, KEPT CLOSE" title="Little Things" body="Tawa, perjalanan, tatapan, dan hal-hal kecil yang mungkin terlihat biasa. Tapi bersamamu, semuanya punya arti." image="photos/gallery/photo-08.webp" align="right" />
    <Journey />
    <StorySection number="03" kicker="MORE THAN A MEMORY" title="Still Choosing You" body="Bukan tentang hari yang selalu sempurna. Ini tentang tetap berjalan berdampingan, di setiap musim yang datang." image="photos/gallery/photo-21.webp" />
    <Closing />
    <footer className="footer"><span>♡ NOVEM-EVER YOURS</span><span>MADE WITH LOVE · 27 — 11 — 25</span></footer>
  </main>;
}

class AppErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error) {
    window.__showBootError?.(error?.message || "Aplikasi mengalami error saat render.");
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}

const rootElement = document.getElementById("root");
const bootElement = document.getElementById("boot-status");
try {
  rootElement.hidden = false;
  createRoot(rootElement).render(
    <React.StrictMode>
      <AppErrorBoundary><App /></AppErrorBoundary>
    </React.StrictMode>
  );
  if (bootElement) bootElement.hidden = true;
} catch (error) {
  window.__showBootError?.(error?.message || String(error));
}
