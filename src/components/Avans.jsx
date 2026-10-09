import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { AVANS_PERCENT, DISPUTE_DAYS, SELLER_REPLY_HOURS } from '../config';
import { fmt } from '../i18n';
import { HangTag, Icon, Reveal, SectionLabel, fadeUp, money, stagger } from './ui';

const MIN = 5;
const MAX = 300;

function AnimatedMoney({ value }) {
  const spring = useSpring(value, { stiffness: 160, damping: 22 });
  const text = useTransform(spring, (v) => money(Math.round(v * 100) / 100));
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <motion.span>{text}</motion.span>;
}

function Calculator({ t }) {
  const [price, setPrice] = useState(30);
  const avans = (price * AVANS_PERCENT) / 100;
  const fill = ((price - MIN) / (MAX - MIN)) * 100;

  return (
    <Reveal className="calc" delay={0.15}>
      <div className="calc__head">
        <label htmlFor="avans-price">{t.avans.calcLabel}</label>
        <span className="calc__hint">{t.avans.calcHint}</span>
      </div>
      <div className="calc__price">
        <AnimatedMoney value={price} />
      </div>
      <input
        id="avans-price"
        type="range"
        min={MIN}
        max={MAX}
        step={5}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        style={{ '--fill': `${fill}%` }}
        aria-valuetext={money(price)}
      />
      <div className="calc__split">
        <HangTag tone="mint" string={28} className="calc__tag">
          <small>
            {t.avans.calcAvans} · {AVANS_PERCENT}%
          </small>
          <strong>
            <AnimatedMoney value={avans} />
          </strong>
        </HangTag>
        <span className="calc__plus" aria-hidden="true">
          <Icon.Plus size={18} />
        </span>
        <HangTag tone="paper" string={44} className="calc__tag calc__tag--meet">
          <small>{t.avans.calcMeet}</small>
          <strong>
            <AnimatedMoney value={price - avans} />
          </strong>
        </HangTag>
      </div>
    </Reveal>
  );
}

function Timer({ label }) {
  return (
    <span className="timer" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" className="timer__track" />
        <circle cx="24" cy="24" r="20" className="timer__run" pathLength="100" />
      </svg>
      <small>{label}</small>
    </span>
  );
}

const OUTCOME_ICONS = [Icon.Check, Icon.Undo, Icon.Flag];
const TRUST_ICONS = [Icon.Shield, Icon.Chat, Icon.Headset];

function Avans({ t }) {
  const vars = { p: AVANS_PERCENT, h: SELLER_REPLY_HOURS, d: DISPUTE_DAYS };

  return (
    <section className="section avans" id="avans">
      <div className="avans__texture" aria-hidden="true" />
      <div className="container">
        <div className="avans__top">
          <div className="avans__copy">
            <Reveal>
              <SectionLabel tone="dark">{t.avans.label}</SectionLabel>
            </Reveal>
            <motion.div
              className="bubble"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ type: 'spring', stiffness: 160, damping: 16 }}
            >
              {t.avans.hook}
            </motion.div>
            <Reveal as="h2" className="avans__answer" delay={0.15}>
              {t.avans.answer}
            </Reveal>
            <Reveal as="p" className="avans__desc" delay={0.25}>
              {t.avans.desc}
            </Reveal>
          </div>
          <Calculator t={t} />
        </div>

        <motion.ol
          className="outcomes"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger(0.12)}
        >
          {t.avans.outcomes.map((item, i) => {
            const OutcomeIcon = OUTCOME_ICONS[i];
            return (
              <motion.li key={item.title} className={`outcome outcome--${i}`} variants={fadeUp}>
                <div className="outcome__top">
                  <span className="outcome__icon">
                    <OutcomeIcon size={22} />
                  </span>
                  {i === 1 && <Timer label={fmt(t.avans.timer, vars)} />}
                </div>
                <h3>{item.title}</h3>
                <p>{fmt(item.desc, vars)}</p>
              </motion.li>
            );
          })}
        </motion.ol>

        <motion.ul
          className="trust"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger(0.1)}
        >
          {t.avans.trust.map((item, i) => {
            const TrustIcon = TRUST_ICONS[i];
            return (
              <motion.li key={item.title} variants={fadeUp}>
                <TrustIcon size={24} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

export default Avans;
