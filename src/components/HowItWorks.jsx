import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'framer-motion';
import filterScreen from '../assets/screens/filter.webp';
import heelsScreen from '../assets/screens/product-heels.webp';
import { AVANS_PERCENT } from '../config';
import { fmt } from '../i18n';
import { HangTag, Icon, Phone, Reveal, SectionLabel, ease, money } from './ui';

// The example matches the real "Qara klassik dabanlı ayaqqabı" listing (₼30) shown on screen.
const EXAMPLE_PRICE = 30;
const SCREENS = [filterScreen, heelsScreen, heelsScreen];
// Steps 2 and 3 share a screen; render each image once so switching between them does not flash.
const STICKY_SCREENS = [...new Set(SCREENS)];
const ICONS = [Icon.Search, Icon.Wallet, Icon.Handshake];

const EXAMPLE_AVANS = (EXAMPLE_PRICE * AVANS_PERCENT) / 100;
const EXAMPLE_MEET = EXAMPLE_PRICE - EXAMPLE_AVANS;

function Overlays({ active, t }) {
  const avans = EXAMPLE_AVANS;
  const meet = EXAMPLE_MEET;
  return (
    <div className="how__overlays">
      <AnimatePresence>
        {active >= 1 && (
          <motion.div
            key="avans"
            className="how__tag how__tag--avans"
            initial={{ opacity: 0, y: -40, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: -4, transition: { type: 'spring', stiffness: 120, damping: 12 } }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.25 } }}
          >
            <HangTag tone="deep" string={40}>
              <small>{t.how.tagAvans}</small>
              <strong>{money(avans)}</strong>
              {active >= 2 && (
                <motion.span className="how__tag-check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Icon.Check size={12} strokeWidth="3" />
                </motion.span>
              )}
            </HangTag>
          </motion.div>
        )}
        {active >= 2 && (
          <motion.div
            key="meet"
            className="how__tag how__tag--meet"
            initial={{ opacity: 0, y: -40, rotate: 12 }}
            animate={{ opacity: 1, y: 0, rotate: 5, transition: { type: 'spring', stiffness: 120, damping: 12, delay: 0.1 } }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.25 } }}
          >
            <HangTag tone="mint" string={64}>
              <small>{t.how.tagMeet}</small>
              <strong>{money(meet)}</strong>
            </HangTag>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile only: step 3 shows the price split instead of repeating the step 2 screenshot.
function PriceSplit({ t }) {
  return (
    <div className="how__split" aria-hidden="true">
      <HangTag tone="deep" string={26} className="swing">
        <small>{t.how.tagAvans}</small>
        <strong>{money(EXAMPLE_AVANS)}</strong>
      </HangTag>
      <Icon.Plus size={18} className="how__split-plus" />
      <HangTag tone="mint" string={46} className="swing">
        <small>{t.how.tagMeet}</small>
        <strong>{money(EXAMPLE_MEET)}</strong>
      </HangTag>
    </div>
  );
}

function Step({ index, step, isActive, onActive, t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const StepIcon = ICONS[index];

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className={`how__step ${isActive ? 'is-active' : ''}`}>
      <span className="how__dot" aria-hidden="true">
        <StepIcon size={20} />
      </span>
      <Reveal className="how__step-body" amount={0.4}>
        <span className="how__num">0{index + 1}</span>
        <h3>{step.title}</h3>
        <p>{fmt(step.desc, { p: AVANS_PERCENT })}</p>
        <div className="how__step-media">
          {index === 2 ? <PriceSplit t={t} /> : <Phone src={SCREENS[index]} alt={step.alt} className="phone--sm" />}
        </div>
      </Reveal>
    </div>
  );
}

function HowItWorks({ t }) {
  const [active, setActive] = useState(0);
  const stepsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 60%', 'end 55%'] });
  const thread = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section className="section how" id="how">
      <div className="container">
        <Reveal className="section-head">
          <SectionLabel>{t.how.label}</SectionLabel>
          <h2 className="section-title">{t.how.title}</h2>
        </Reveal>

        <div className="how__grid">
          <div className="how__steps" ref={stepsRef}>
            <span className="how__thread" aria-hidden="true">
              <motion.span className="how__thread-fill" style={{ scaleY: thread }} />
            </span>
            {t.how.steps.map((step, index) => (
              <Step key={step.title} index={index} step={step} isActive={active === index} onActive={setActive} t={t} />
            ))}
          </div>

          <div className="how__sticky" aria-hidden="true">
            <div className="how__phone-wrap">
              <span className="how__halo" />
              <Phone className="how__phone">
                {STICKY_SCREENS.map((src) => {
                  const shown = SCREENS[active] === src;
                  return (
                    <motion.img
                      key={src}
                      src={src}
                      alt=""
                      loading="lazy"
                      className="how__screen"
                      initial={false}
                      animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 1.04 }}
                      transition={{ duration: 0.6, ease }}
                    />
                  );
                })}
              </Phone>
              <Overlays active={active} t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
