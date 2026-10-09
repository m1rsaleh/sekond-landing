import { Icon } from './ui';

// Two crossing "tapes" of category words. Pure CSS animation so it costs nothing on the main thread.
function Tape({ items, reverse = false, tone }) {
  const row = (
    <ul className="tape__row">
      {items.map((item) => (
        <li key={item}>
          {item}
          <Icon.Tag size={22} className="tape__icon" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`tape tape--${tone} ${reverse ? 'tape--reverse' : ''}`}>
      <div className="tape__track">
        {row}
        <div aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}

function Marquee({ t }) {
  const items = t.marquee;
  const shifted = [...items.slice(5), ...items.slice(0, 5)];
  return (
    <section className="marquee" aria-label={t.categories.label}>
      <Tape items={items} tone="deep" />
      <div aria-hidden="true">
        <Tape items={shifted} tone="mint" reverse />
      </div>
    </section>
  );
}

export default Marquee;
