/* global React, window, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle */
const { useState, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c8ff2e",
  "accent2": "#7c5cff",
  "radius": "yumuşak",
  "grain": true
}/*EDITMODE-END*/;

const RADIUS_MAP = { keskin: 6, yumuşak: 16, yuvarlak: 26 };

function App() {
  const D = window.DATA;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const addToCart = useCallback((course) => {
    setCart((prev) => {
      if (prev.find((c) => c.id === course.id)) return prev;
      return [...prev, course];
    });
    setToast(course.title);
    window.clearTimeout(window.__t);
    window.__t = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const newest = D.COURSES.filter((c) => c.new);
  const discounted = D.COURSES.filter((c) => c.oldPrice);

  const themeVars = {
    "--accent": t.accent,
    "--accent2": t.accent2,
    "--r": RADIUS_MAP[t.radius] + "px",
  };

  return (
    <div className="im-app" style={themeVars} data-grain={t.grain ? "on" : "off"}>
      <Header cartCount={cart.length} onCart={() => setCartOpen(true)} />
      <Hero stats={D.STATS} onExplore={() => scrollTo("egitimler")} />
      <Marquee />
      <LogosStrip logos={D.LOGOS} />
      <CourseSection courses={D.COURSES} categories={D.CATEGORIES} cart={cart} onAdd={addToCart} />
      <LatestSection courses={newest} cart={cart} onAdd={addToCart} />
      <DiscountSection courses={discounted} cart={cart} onAdd={addToCart} />
      <CalendarSection events={D.CALENDAR} onAdd={(e) => {
        setToast("Koltuğun ayrıldı: " + e.title);
        window.clearTimeout(window.__t);
        window.__t = window.setTimeout(() => setToast(null), 2200);
      }} />
      <TestimonialsSection items={D.TESTIMONIALS} />
      <CtaBanner onExplore={() => scrollTo("egitimler")} />
      <Footer />

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />

      {/* Toast */}
      <div className={"im-toast" + (toast ? " show" : "")}>
        <span className="im-toast-mark">✓</span>
        <span className="im-toast-text">{toast}</span>
        <button className="im-toast-link" onClick={() => { setCartOpen(true); setToast(null); }}>Sepete git</button>
      </div>

      {/* Tweaks */}
      <TweaksPanel>
        <TweakSection label="Tema rengi" />
        <TweakColor label="Ana vurgu" value={t.accent}
          options={["#c8ff2e", "#38e1ff", "#ff7ac8", "#ffd23f", "#7c5cff"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakColor label="İkincil vurgu" value={t.accent2}
          options={["#7c5cff", "#38e1ff", "#ff7ac8", "#c8ff2e"]}
          onChange={(v) => setTweak("accent2", v)} />
        <TweakSection label="Biçim" />
        <TweakRadio label="Köşe" value={t.radius}
          options={["keskin", "yumuşak", "yuvarlak"]}
          onChange={(v) => setTweak("radius", v)} />
        <TweakToggle label="Grain dokusu" value={t.grain}
          onChange={(v) => setTweak("grain", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
