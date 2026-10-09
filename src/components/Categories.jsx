import { motion } from 'framer-motion';
import { HangTag, Icon, Reveal, SectionLabel, stagger } from './ui';

const TONES = ['paper', 'mint', 'paper', 'deep', 'paper', 'mint', 'deep', 'paper', 'mint', 'paper'];
const STRINGS = [26, 48, 34, 58, 30, 44, 54, 28, 40, 50];

const drop = {
  hidden: { y: -90, opacity: 0, rotate: -8 },
  show: { y: 0, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 9 } },
};

function Categories({ t }) {
  return (
    <section className="section cats" id="categories">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <SectionLabel>{t.categories.label}</SectionLabel>
          <h2 className="section-title">{t.categories.title}</h2>
          <p className="section-sub">{t.categories.sub}</p>
        </Reveal>

        <motion.ul
          className="cats__rack"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.06)}
        >
          {t.categories.items.map((name, i) => (
            <motion.li key={name} variants={drop}>
              <HangTag
                as="a"
                href="#download"
                tone={TONES[i % TONES.length]}
                string={STRINGS[i % STRINGS.length]}
                className="cat swing-hover"
              >
                <span className="cat__num">{String(i + 1).padStart(2, '0')}</span>
                <strong className="cat__name">{name}</strong>
                <span className="cat__cta">
                  {t.categories.cta}
                  <Icon.Arrow size={14} />
                </span>
              </HangTag>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default Categories;
