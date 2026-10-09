import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import homeScreen from '../assets/screens/home.webp';
import resultsScreen from '../assets/screens/results.webp';
import qrCode from '../assets/appstore-qr.svg';
import { Hanger, Phone, Reveal, SectionLabel, StoreButtons } from './ui';

function Download({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  // Front phone comes down onto the rail; the back one rises from the bottom edge.
  const frontY = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const backY = useTransform(scrollYProgress, [0, 1], [260, 30]);
  const backRotate = useTransform(scrollYProgress, [0, 1], [14, 7]);

  return (
    <section className="section download" id="download" ref={ref}>
      <div className="container">
        <div className="download__card">
          <span className="download__rail" aria-hidden="true" />
          <div className="download__copy">
            <Reveal>
              <SectionLabel tone="dark">{t.download.label}</SectionLabel>
            </Reveal>
            <Reveal as="h2" className="download__title" delay={0.05}>
              {t.download.title1}
              <br />
              <em>{t.download.title2}</em>
            </Reveal>
            <Reveal as="p" className="download__desc" delay={0.1}>
              {t.download.desc}
            </Reveal>
            <Reveal delay={0.15} className="download__actions">
              <StoreButtons t={t} variant="light" />
              <div className="qr">
                <img src={qrCode} alt="" width="84" height="84" />
                <span>
                  <strong>{t.download.qr}</strong>
                  <small>{t.download.qrSub}</small>
                </span>
              </div>
            </Reveal>
          </div>

          <div className="download__stage" aria-hidden="true">
            <motion.div className="download__phone download__phone--back" style={{ y: backY, rotate: backRotate }}>
              <Phone src={resultsScreen} alt="" />
            </motion.div>
            <motion.div className="download__phone download__phone--front" style={{ y: frontY }}>
              <div className="sway sway--slow">
                <Hanger />
                <Phone src={homeScreen} alt="" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Download;
