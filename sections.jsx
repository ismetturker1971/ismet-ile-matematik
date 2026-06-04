/* global React, window */
const { useState, useEffect, useRef } = React;

/* ===================== HEADER ===================== */
function Header({ cartCount, onCart }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <header className={"im-header" + (solid ? " solid" : "")}>
      <div className="im-wrap im-header-in">
        <Brand />
        <nav className="im-nav">
          <button onClick={() => go("egitimler")}>Eğitimler</button>
          <button onClick={() => go("yeni")}>Yeni</button>
          <button onClick={() => go("indirim")}>İndirim</button>
          <button onClick={() => go("takvim")}>Takvim</button>
          <button onClick={() => go("yorumlar")}>Yorumlar</button>
        </nav>
        <div className="im-header-act">
          <button className="im-ghost im-hide-sm" onClick={() => go("egitimler")}>İlk ders bedava</button>
          <button className="im-cartbtn" onClick={onCart} aria-label="Sepet">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2m6 18a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {cartCount > 0 && <span className="im-cartbtn-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ===================== MARQUEE ===================== */
function Marquee() {
  const items = ["TÜREV", "∫ İNTEGRAL", "π LİMİT", "△ GEOMETRİ", "∑ SERİLER", "% PROBLEM", "∞ OLİMPİYAT", "ƒ FONKSİYON", "√ KÖKLÜ", "≠ DENKLEM"];
  const row = [...items, ...items];
  return (
    <div className="im-marquee" aria-hidden="true">
      <div className="im-marquee-track">
        {row.map((t, i) => (
          <span key={i} className="im-marquee-item">{t}<span className="im-marquee-star">✦</span></span>
        ))}
      </div>
    </div>
  );
}

/* ===================== HERO ===================== */
function Hero({ stats, onExplore }) {
  return (
    <section className="im-hero">
      <div className="im-hero-glow im-hero-glow-1" />
      <div className="im-hero-glow im-hero-glow-2" />
      <div className="im-grid-bg" />
      <div className="im-wrap im-hero-in">
        <div className="im-hero-left">
          <span className="im-pill"><i className="im-pill-dot" /> 52.000+ öğrenci bu sayfadan başladı</span>
          <h1 className="im-hero-title">
            Matematiği <span className="im-hl">korkulan ders</span> olmaktan çıkar.
          </h1>
          <p className="im-hero-sub">
            TYT'den olimpiyata, LGS'den üniversiteye — İsmet hocayla sıfırdan zirveye.
            Video dersler, canlı yayınlar ve sınırsız soru çözümü tek yerde.
          </p>
          <div className="im-hero-cta">
            <button className="im-cta" onClick={onExplore}>Eğitimleri keşfet →</button>
            <button className="im-ghost im-ghost-lg" onClick={onExplore}>▶ İlk ders bedava</button>
          </div>
          <div className="im-hero-stats">
            {stats.map((s) => (
              <div className="im-stat" key={s.id}>
                <span className="im-stat-val">{s.value}</span>
                <span className="im-stat-lab">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="im-hero-right">
          <div className="im-portrait">
            <image-slot id="ismet-portrait" style={{ width: "100%", height: "100%" }} shape="rounded" radius="26" placeholder="İsmet hocanın fotoğrafını sürükle"></image-slot>
            <div className="im-portrait-grid" />
          </div>
          <div className="im-float im-float-rate">
            <span className="im-float-big">4.9</span>
            <Stars value={4.9} size={12} />
            <span className="im-float-cap">12.4K değerlendirme</span>
          </div>
          <div className="im-float im-float-live">
            <span className="im-live-dot" /> Canlı yayın bu akşam 20:00
          </div>
          <div className="im-float im-float-sym im-fs-1">π</div>
          <div className="im-float im-float-sym im-fs-2">∑</div>
          <div className="im-float im-float-sym im-fs-3">√</div>
        </div>
      </div>
    </section>
  );
}

/* ===================== LOGOS ===================== */
function LogosStrip({ logos }) {
  return (
    <section className="im-logos">
      <div className="im-wrap">
        <p className="im-logos-cap">Türkiye'nin önde gelen kurum ve okullarıyla iş birliği</p>
        <div className="im-logos-row">
          {logos.map((l) => <CompanyLogo key={l.id} logo={l} />)}
        </div>
      </div>
    </section>
  );
}

/* ===================== COURSE GRID (filterable) ===================== */
function CourseSection({ courses, categories, cart, onAdd }) {
  const [active, setActive] = useState("hepsi");
  const list = active === "hepsi" ? courses : courses.filter((c) => c.cat === active);
  const ids = cart.map((c) => c.id);
  return (
    <section className="im-section" id="egitimler">
      <div className="im-wrap">
        <SectionHead kicker="EĞİTİM VİDEOLARI" title="Sana uygun eğitimi seç" sub="Filtrele, ön izleme için kartların üzerine gel, sepete at." />
        <div className="im-filters">
          {categories.map((c) => (
            <button
              key={c.id}
              className={"im-filter" + (active === c.id ? " active" : "")}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="im-grid">
          {list.map((c) => (
            <CourseCard key={c.id} course={c} onAdd={onAdd} inCart={ids.includes(c.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== LATEST (horizontal rail) ===================== */
function LatestSection({ courses, cart, onAdd }) {
  const railRef = useRef(null);
  const ids = cart.map((c) => c.id);
  const scroll = (dir) => {
    railRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };
  return (
    <section className="im-section im-section-alt" id="yeni">
      <div className="im-wrap">
        <div className="im-head-row">
          <SectionHead kicker="SON ÇIKAN EĞİTİMLER" title="Taze içerikler 🔥" sub="Yeni yayınlanan derslere ilk sen göz at." inline />
          <div className="im-rail-nav">
            <button onClick={() => scroll(-1)} aria-label="Geri">‹</button>
            <button onClick={() => scroll(1)} aria-label="İleri">›</button>
          </div>
        </div>
      </div>
      <div className="im-rail" ref={railRef}>
        <div className="im-rail-pad" />
        {courses.map((c) => (
          <div className="im-rail-item" key={c.id}>
            <CourseCard course={c} onAdd={onAdd} inCart={ids.includes(c.id)} />
          </div>
        ))}
        <div className="im-rail-pad" />
      </div>
    </section>
  );
}

/* ===================== DISCOUNT (with countdown) ===================== */
function useCountdown(targetMs) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  let diff = Math.max(0, targetMs - now);
  const h = Math.floor(diff / 3.6e6);
  const m = Math.floor((diff % 3.6e6) / 6e4);
  const s = Math.floor((diff % 6e4) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}

function DiscountSection({ courses, cart, onAdd }) {
  // hedef: yarın aynı saat
  const targetRef = useRef(Date.now() + 1000 * 60 * 60 * 11 + 1000 * 60 * 42 + 1000 * 17);
  const { h, m, s } = useCountdown(targetRef.current);
  const ids = cart.map((c) => c.id);
  return (
    <section className="im-section im-discount" id="indirim">
      <div className="im-disc-glow" />
      <div className="im-wrap">
        <div className="im-disc-head">
          <div>
            <span className="im-kicker im-kicker-dark">⚡ SINIRLI SÜRE</span>
            <h2 className="im-section-title">İndirimdeki eğitimler</h2>
            <p className="im-section-sub">Kampanya bitmeden sepetini doldur — fiyatlar geri yükselecek.</p>
          </div>
          <div className="im-countdown">
            <span className="im-cd-label">Biten süre</span>
            <div className="im-cd-clock">
              <span className="im-cd-box">{h}<i>sa</i></span><b>:</b>
              <span className="im-cd-box">{m}<i>dk</i></span><b>:</b>
              <span className="im-cd-box im-cd-live">{s}<i>sn</i></span>
            </div>
          </div>
        </div>
        <div className="im-grid">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} onAdd={onAdd} inCart={ids.includes(c.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CALENDAR ===================== */
function CalendarSection({ events, onAdd }) {
  return (
    <section className="im-section im-section-alt" id="takvim">
      <div className="im-wrap">
        <SectionHead kicker="EĞİTİM TARİHLERİ & TAKVİM" title="Canlı yayın takvimi" sub="Sınırlı kontenjanlı canlı dersler — kartından koltuğunu ayır." />
        <div className="im-cal-grid">
          {events.map((e) => (
            <article className="im-cal-card" key={e.id}>
              <div className="im-cal-date">
                <span className="im-cal-day">{e.day}</span>
                <span className="im-cal-mon">{e.month}</span>
              </div>
              <div className="im-cal-body">
                <div className="im-cal-meta">
                  <span className={"im-cal-type t-" + e.type.toLowerCase()}>{e.type}</span>
                  <span className="im-cal-when">{e.weekday} · {e.time}</span>
                </div>
                <h3 className="im-cal-title">{e.title}</h3>
                <div className="im-cal-foot">
                  <span className={"im-cal-seats" + (e.seats <= 8 ? " low" : "")}>
                    {e.seats <= 8 ? "🔥 " : ""}{e.seats} koltuk kaldı
                  </span>
                  <button className="im-cal-join" onClick={() => onAdd(e)}>Koltuk ayır</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function TestimonialsSection({ items }) {
  return (
    <section className="im-section" id="yorumlar">
      <div className="im-wrap">
        <SectionHead kicker="MÜŞTERİ REFERANSLARI" title="Öğrenciler ne diyor?" sub="Binlerce öğrencinin başarı hikâyesinden birkaçı." />
        <div className="im-tst-grid">
          {items.map((t) => (
            <figure className="im-tst" key={t.id} style={{ "--c": t.color }}>
              <Stars value={t.rating} size={14} />
              <blockquote className="im-tst-quote">“{t.quote}”</blockquote>
              <figcaption className="im-tst-by">
                <Avatar name={t.name} color={t.color} />
                <div>
                  <span className="im-tst-name">{t.name}</span>
                  <span className="im-tst-role">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CTA BANNER ===================== */
function CtaBanner({ onExplore }) {
  return (
    <section className="im-section">
      <div className="im-wrap">
        <div className="im-banner">
          <div className="im-banner-grid" />
          <span className="im-banner-sym im-bs-1">∑</span>
          <span className="im-banner-sym im-bs-2">π</span>
          <h2 className="im-banner-title">Bugün başla, ilk ders <span className="im-hl">bedava</span>.</h2>
          <p className="im-banner-sub">Üye ol, denemeni kullan, beğenirsen devam et. Risk yok — 30 gün koşulsuz iade.</p>
          <div className="im-banner-cta">
            <button className="im-cta im-cta-dark" onClick={onExplore}>Ücretsiz başla</button>
            <button className="im-ghost im-ghost-onlight" onClick={onExplore}>Eğitimleri gör</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  const cols = [
    { h: "Eğitimler", links: ["TYT Matematik", "AYT Matematik", "LGS Kampı", "KPSS", "Üniversite", "Olimpiyat"] },
    { h: "Platform", links: ["Nasıl çalışır?", "Canlı yayınlar", "Mobil uygulama", "Hediye kart", "Kurumsal"] },
    { h: "Destek", links: ["Yardım merkezi", "İletişim", "İade politikası", "SSS"] },
  ];
  return (
    <footer className="im-footer">
      <div className="im-wrap">
        <div className="im-footer-top">
          <div className="im-footer-brand">
            <Brand size={24} />
            <p className="im-footer-tag">Matematiği herkes için ulaşılabilir kılıyoruz. Sıfırdan zirveye, seninle.</p>
            <div className="im-footer-social">
              {["IG", "YT", "TT", "X", "in"].map((s) => (
                <a key={s} className="im-soc" href="#" onClick={(e) => e.preventDefault()}>{s}</a>
              ))}
            </div>
            <form className="im-news" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="E-posta adresin" aria-label="E-posta" />
              <button type="submit">Abone ol</button>
            </form>
          </div>
          <div className="im-footer-cols">
            {cols.map((c) => (
              <div className="im-footer-col" key={c.h}>
                <h4>{c.h}</h4>
                <ul>{c.links.map((l) => <li key={l}><a href="#" onClick={(e) => e.preventDefault()}>{l}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="im-footer-bot">
          <span>© 2026 İsmet ile Matematik · Tüm hakları saklıdır.</span>
          <div className="im-footer-legal">
            <a href="#" onClick={(e) => e.preventDefault()}>Gizlilik</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Koşullar</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Çerezler</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- shared section head ---------- */
function SectionHead({ kicker, title, sub, inline }) {
  return (
    <div className={"im-section-head" + (inline ? " inline" : "")}>
      <span className="im-kicker">{kicker}</span>
      <h2 className="im-section-title">{title}</h2>
      {sub && <p className="im-section-sub">{sub}</p>}
    </div>
  );
}

Object.assign(window, {
  Header, Marquee, Hero, LogosStrip, CourseSection, LatestSection,
  DiscountSection, CalendarSection, TestimonialsSection, CtaBanner, Footer, SectionHead,
});
