import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import homeScreen from '../assets/screens/home.webp';
import trenchScreen from '../assets/screens/product-trench.webp';
import { Hanger, HangTag, Icon, Phone, SectionLabel, StoreButtons, ease } from './ui';

const lineIn = (delay) => ({
  // 140% clears the extra bottom padding of the accent line (room for the scribble).
  initial: { y: '140%' },
  animate: { y: '0%', transition: { duration: 0.9, ease, delay } },
});

const pop = (delay) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease, delay } },
});

// Phones "get hung" on the rail: drop from above and settle with a spring.
const hangIn = (delay) => ({
  initial: { y: -140, opacity: 0, rotate: -6 },
  animate: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 90, damping: 11, mass: 0.9, delay },
  },
});

function Hero({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer parallax (desktop only; touch devices never fire pointermove without a press).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const frontX = useTransform(sx, (v) => v * 18);
  const frontY = useTransform(sy, (v) => v * 10);
  const backX = useTransform(sx, (v) => v * -12);
  const chipX = useTransform(sx, (v) => v * 34);
  const chipY = useTransform(sy, (v) => v * 22);

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__glow" />
        <span className="hero__grid-lines" />
      </div>

      <div className="container hero__grid">
        <motion.div className="hero__copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div {...pop(0.05)}>
            <SectionLabel as="h1">{t.hero.tag}</SectionLabel>
          </motion.div>

          {/* The slogan is the visual headline; the H1 above carries the search keyword. */}
          <p className="hero__title">
            <span className="line">
              <motion.span {...lineIn(0.15)}>{t.hero.title1}</motion.span>
            </span>
            <span className="line line--accent">
              <motion.span {...lineIn(0.28)}>
                {t.hero.title2}
                <svg className="scribble" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path
                    d="M4 16C60 6 120 4 176 9s88 9 120 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, transition: { duration: 0.9, ease, delay: 1.05 } }}
                  />
                </svg>
              </motion.span>
            </span>
          </p>

          <motion.p className="hero__sub" {...pop(0.5)}>
            {t.hero.sub}
          </motion.p>

          <motion.div {...pop(0.62)}>
            <StoreButtons t={t} />
          </motion.div>

          <motion.ul className="hero__facts" {...pop(0.74)}>
            {t.hero.facts.map((fact) => (
              <li key={fact}>
                <span className="hero__fact-icon">
                  <Icon.Check size={14} strokeWidth="2.6" />
                </span>
                {fact}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="hero__stage" style={{ y: stageY }}>
          <motion.span
            className="rail"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 1.1, ease, delay: 0.1 } }}
          />

          <motion.div className="hang hang--back" style={{ x: backX }}>
            <motion.div {...hangIn(0.85)}>
              <div className="sway sway--slow">
                <Hanger>
                  <HangTag className="hero__price" string={34} tone="mint">
                    <span className="hero__price-now">₼85</span>
                    <span className="hero__price-was">₼249</span>
                  </HangTag>
                </Hanger>
                <Phone src={trenchScreen} alt={t.hero.imageAlt2} />
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="hang hang--front" style={{ x: frontX, y: frontY }}>
            <motion.div {...hangIn(0.55)}>
              <div className="sway">
                <Hanger />
                <Phone src={homeScreen} alt={t.hero.imageAlt} eager />
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="float-chip float-chip--avans" style={{ x: chipX, y: chipY }}>
            <motion.div className="float-chip__inner" {...pop(1.35)}>
              <span className="float-chip__icon">
                <Icon.Shield size={18} />
              </span>
              {t.hero.chipAvans}
            </motion.div>
          </motion.div>

          <motion.div className="float-chip float-chip--cond" style={{ x: backX, y: chipY }}>
            <motion.div className="float-chip__inner" {...pop(1.5)}>
              <span className="float-chip__dot" />
              {t.hero.chipCondition}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
