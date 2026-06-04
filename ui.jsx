/* global React, window */
const { useState, useRef, useEffect } = React;

const TL = (n) => "₺" + n.toLocaleString("tr-TR");

/* ---------- Brand mark ---------- */
function Brand({ size = 22 }) {
  return (
    <div className="im-brand" style={{ fontSize: size }}>
      <span className="im-brand-mark" aria-hidden="true">∑</span>
      <span className="im-brand-name">
        İSMET<span className="im-brand-dim"> ile </span>MATEMATİK
      </span>
    </div>
  );
}

/* ---------- Stars ---------- */
function Stars({ value, size = 13 }) {
  const full = Math.round(value);
  return (
    <span className="im-stars" style={{ fontSize: size }} aria-label={value + " yıldız"}>
      {"★★★★★".slice(0, full)}
      <span className="im-stars-empty">{"★★★★★".slice(full)}</span>
    </span>
  );
}

/* ---------- Avatar (initials) ---------- */
function Avatar({ name, color, size = 44 }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="im-avatar"
      style={{ width: size, height: size, fontSize: size * 0.36, color: color, borderColor: color }}
    >
      {initials}
    </div>
  );
}

/* ---------- Generic company logo wordmarks ---------- */
function CompanyLogo({ logo }) {
  const { name, kind } = logo;
  if (kind === "dot") {
    return (
      <span className="im-logo">
        <span className="im-logo-dot" />{name}
      </span>
    );
  }
  if (kind === "bracket") {
    return (
      <span className="im-logo">
        <span className="im-logo-brk">{"{"}</span>{name}<span className="im-logo-brk">{"}"}</span>
      </span>
    );
  }
  return <span className="im-logo">{name}</span>;
}

/* ---------- Video-cover thumbnail with hover playback ---------- */
function Thumb({ course, playing }) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const videoSources = course.video?.sources || [];
  const hasVideo = videoSources.length > 0 || !!course.video?.src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setVideoPlaying(true);
    const onPause = () => setVideoPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [course.video?.sources, course.video?.src]);

  useEffect(() => {
    if (!wrapperRef.current || isVisible || !hasVideo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [isVisible, hasVideo]);

  const toggleVideo = (e) => {
    if (!hasVideo) return;
    e.stopPropagation();
    if (!isVisible) {
      setIsVisible(true);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={"im-thumb" + (hasVideo ? " has-video" : "") + ((playing || videoPlaying) ? " is-playing" : "")}
      style={{ "--g1": course.g1, "--g2": course.g2 }}
      onClick={toggleVideo}
      role={hasVideo ? "button" : undefined}
      tabIndex={hasVideo ? 0 : undefined}
      onKeyDown={hasVideo ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleVideo(e);
        }
      } : undefined}
    >
      <div className="im-thumb-grid" />
      {hasVideo ? (
        <>
          <video
            ref={videoRef}
            className="im-thumb-video"
            preload={isVisible ? "metadata" : "none"}
            playsInline
            poster={course.video.poster}
          >
            {isVisible && videoSources.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))}
            {isVisible && course.video?.src && (
              <source src={course.video.src} type={course.video.type || "video/mp4"} />
            )}
          </video>
          <div className="im-thumb-video-overlay">
            <span className="im-thumb-video-label">TYT Matematik Ders Videosu</span>
          </div>
          <div className="im-thumb-play">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              {videoPlaying ? (
                <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
              ) : (
                <path d="M8 5v14l11-7z" fill="currentColor" />
              )}
            </svg>
          </div>
        </>
      ) : (
        <>
          <span className="im-thumb-symbol">{course.symbol}</span>
          <div className="im-thumb-play">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
        </>
      )}
      <div className="im-thumb-scan" />
      <div className="im-thumb-bar"><i /></div>
      <div className="im-thumb-time">12:48</div>
    </div>
  );
}

/* ---------- Course card ---------- */
function CourseCard({ course, onAdd, inCart }) {
  const [hover, setHover] = useState(false);
  const discount = course.oldPrice
    ? Math.round((1 - course.price / course.oldPrice) * 100)
    : 0;
  return (
    <article
      className="im-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="im-card-top">
        <Thumb course={course} playing={hover} />
        {discount > 0 && <span className="im-badge im-badge-disc">%{discount} İNDİRİM</span>}
        {course.new && discount === 0 && <span className="im-badge im-badge-new">YENİ</span>}
        {course.tag && <span className="im-chip-tag">{course.tag}</span>}
      </div>

      <div className="im-card-body">
        <div className="im-card-meta">
          <span className="im-card-cat">{labelFor(course.cat)}</span>
          <span className="im-dot-sep">·</span>
          <span>{course.level}</span>
        </div>
        <h3 className="im-card-title">{course.title}</h3>

        <div className="im-card-stats">
          <Stars value={course.rating} />
          <span className="im-rate-num">{course.rating.toFixed(1)}</span>
          <span className="im-dot-sep">·</span>
          <span>{course.students.toLocaleString("tr-TR")} öğrenci</span>
        </div>

        <div className="im-card-facts">
          <span>▦ {course.lessons} ders</span>
          <span>◷ {course.hours} saat</span>
        </div>

        <div className="im-card-foot">
          <div className="im-price">
            <span className="im-price-now">{TL(course.price)}</span>
            {course.oldPrice && <span className="im-price-old">{TL(course.oldPrice)}</span>}
          </div>
          <button
            className={"im-add" + (inCart ? " is-in" : "")}
            onClick={() => onAdd(course)}
          >
            {inCart ? "Sepette ✓" : "Sepete ekle"}
          </button>
        </div>
      </div>
    </article>
  );
}

function labelFor(cat) {
  const map = { tyt: "TYT", ayt: "AYT", lgs: "LGS", kpss: "KPSS", uni: "Üniversite", olimpiyat: "Olimpiyat" };
  return map[cat] || cat;
}

/* ---------- Cart drawer ---------- */
function CartDrawer({ open, items, onClose, onRemove }) {
  const total = items.reduce((s, c) => s + c.price, 0);
  const old = items.reduce((s, c) => s + (c.oldPrice || c.price), 0);
  const saved = old - total;
  return (
    <>
      <div className={"im-cart-scrim" + (open ? " open" : "")} onClick={onClose} />
      <aside className={"im-cart" + (open ? " open" : "")} aria-hidden={!open}>
        <header className="im-cart-head">
          <h3>Sepetin <span>({items.length})</span></h3>
          <button className="im-cart-x" onClick={onClose} aria-label="Kapat">✕</button>
        </header>

        <div className="im-cart-list">
          {items.length === 0 && (
            <div className="im-cart-empty">
              <span className="im-cart-empty-mark">∅</span>
              <p>Sepetin boş.<br />Bir eğitim ekleyip zirveye başla.</p>
            </div>
          )}
          {items.map((c) => (
            <div className="im-cart-item" key={c.id}>
              <div className="im-cart-thumb" style={{ background: `linear-gradient(135deg, ${c.g1}, ${c.g2})` }}>
                {c.symbol}
              </div>
              <div className="im-cart-info">
                <p className="im-cart-name">{c.title}</p>
                <span className="im-cart-price">{TL(c.price)}</span>
              </div>
              <button className="im-cart-rm" onClick={() => onRemove(c.id)} aria-label="Çıkar">✕</button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <footer className="im-cart-foot">
            {saved > 0 && (
              <div className="im-cart-saved">
                <span>İndirim kazancın</span>
                <strong>−{TL(saved)}</strong>
              </div>
            )}
            <div className="im-cart-total">
              <span>Toplam</span>
              <strong>{TL(total)}</strong>
            </div>
            <button className="im-cta im-cart-pay">Ödemeye geç →</button>
            <p className="im-cart-note">30 gün koşulsuz iade · Ömür boyu erişim</p>
          </footer>
        )}
      </aside>
    </>
  );
}

Object.assign(window, { TL, Brand, Stars, Avatar, CompanyLogo, Thumb, CourseCard, CartDrawer, labelFor });
