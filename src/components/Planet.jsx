import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Icon, SectionLabel } from './ui';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span className="planet__word" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

// Words light up one by one as the section scrolls through the viewport.
function Planet({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] });
  const words = t.planet.text.split(' ');
  const leafRotate = useTransform(scrollYProgress, [0, 1], [-30, 20]);

  return (
    <section className="section planet" ref={ref}>
      <div className="container planet__inner">
        <div className="planet__label">
          <SectionLabel>{t.planet.label}</SectionLabel>
          <motion.span className="planet__leaf" style={{ rotate: leafRotate }} aria-hidden="true">
            <Icon.Leaf size={40} strokeWidth="1.4" />
          </motion.span>
        </div>
        <p className="planet__text">
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default Planet;
