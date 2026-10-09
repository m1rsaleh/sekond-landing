import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AVANS_PERCENT, DISPUTE_DAYS, SELLER_REPLY_HOURS } from '../config';
import { fmt } from '../i18n';
import { Icon, Reveal, SectionLabel, ease, fadeUp, stagger } from './ui';

function FAQ({ t, onNavigate }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();
  const vars = { p: AVANS_PERCENT, h: SELLER_REPLY_HOURS, d: DISPUTE_DAYS };

  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <Reveal className="faq__head">
          <SectionLabel>{t.faq.label}</SectionLabel>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-sub">{t.faq.sub}</p>
          <a
            href="/support"
            className="btn btn--ghost"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('support');
            }}
          >
            <Icon.Chat size={20} />
            {t.faq.contactCta}
          </a>
        </Reveal>

        <motion.ul
          className="faq__list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.07)}
        >
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            return (
              <motion.li key={item.q} className={`faq__item ${isOpen ? 'is-open' : ''}`} variants={fadeUp}>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{fmt(item.q, vars)}</span>
                  <span className="faq__toggle" aria-hidden="true">
                    <Icon.Plus size={18} strokeWidth="2.2" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <p>{fmt(item.a, vars)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

export default FAQ;
