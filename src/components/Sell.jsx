import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import womenScreen from '../assets/screens/category-women.webp';
import { SELLER_REPLY_HOURS, STORE_LINKS } from '../config';
import { fmt } from '../i18n';
import { Hanger, HangTag, Icon, Phone, Reveal, SectionLabel, fadeUp, stagger } from './ui';

const STEP_ICONS = [Icon.Camera, Icon.Tag, Icon.Wallet];

function Sell({ t }) {
  const ref = useRef(null);
  const stageRef = useRef(null);
  // The rail starts at scaleX(0) with its origin off-screen, so it can't observe itself; watch the stage.
  const stageInView = useInView(stageRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // The whole rack drifts together; things hanging from the rail must never detach from it.
  const stageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="section sell" id="sell" ref={ref}>
      <div className="container sell__grid">
        <motion.div className="sell__stage" style={{ y: stageY }} ref={stageRef}>
          <motion.span
            className="rail"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: stageInView ? 1 : 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="hang hang--sell">
            <motion.div
              initial={{ y: -120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 90, damping: 11, delay: 0.2 }}
            >
              <div className="sway">
                <Hanger />
                <Phone src={womenScreen} alt={t.sell.imageAlt} />
              </div>
            </motion.div>
          </div>

          <div className="sell__tags" aria-hidden="true">
            {t.sell.tags.map((tag, i) => (
              <motion.div
                key={tag}
                className={`sell__tag sell__tag--${i}`}
                initial={{ y: -80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 110, damping: 10, delay: 0.5 + i * 0.12 }}
              >
                <HangTag tone={i === 1 ? 'deep' : i === 2 ? 'mint' : 'paper'} string={40 + i * 26} className="swing">
                  {tag}
                </HangTag>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="sell__copy">
          <Reveal>
            <SectionLabel>{t.sell.label}</SectionLabel>
          </Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            {t.sell.title}
          </Reveal>
          <Reveal as="p" className="sell__desc" delay={0.1}>
            {t.sell.desc}
          </Reveal>

          <motion.ol
            className="sell__steps"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.1, 0.1)}
          >
            {t.sell.steps.map((step, i) => {
              const StepIcon = STEP_ICONS[i];
              return (
                <motion.li key={step.title} variants={fadeUp}>
                  <span className="sell__step-icon">
                    <StepIcon size={22} />
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <span>{fmt(step.desc, { h: SELLER_REPLY_HOURS })}</span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>

          <Reveal className="sell__cta" delay={0.1}>
            <a className="btn btn--primary btn--lg" href={STORE_LINKS.ios} target="_blank" rel="noopener noreferrer">
              {t.sell.cta}
              <Icon.Arrow size={20} />
            </a>
            <span className="sell__note">
              <Icon.Check size={16} strokeWidth="2.4" />
              {t.sell.note}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Sell;
