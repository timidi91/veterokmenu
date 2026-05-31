import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { menuData, globalCategories } from './data/menuData';
import type { MenuItem, MenuCategory } from './data/menuData';

// ─── Types ──────────────────────────────────────────────────────────────────
interface CartItem extends MenuItem {
  quantity: number;
}

// ─── Promo Banner (carousel) ─────────────────────────────────────────────────
const PROMO_SLIDES = [
  { src: '/pivoakk.png',   alt: 'Акция пиво'  },
  { src: '/vodkaaksia.png', alt: 'Акция водка' },
];

function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % PROMO_SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const slide = PROMO_SLIDES[currentSlide];

  return (
    <div style={{ marginLeft: 16, marginRight: 16, marginBottom: 32, marginTop: 24 }}>
      {/* Banner frame */}
      <div
        style={{
          border: '4px solid #134534',
          borderRadius: 28,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Slide image with fade transition */}
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="w-full h-auto block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          />
        </AnimatePresence>


      </div>

      {/* Pagination dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 10 }}>
        {PROMO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            style={{
              width: i === currentSlide ? 20 : 7,
              height: 7,
              borderRadius: 99,
              background: i === currentSlide ? '#E2B765' : 'rgba(19,69,52,0.45)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Header (photo background section) ──────────────────────────────────────
function AppHeader() {
  return (
    <div
      style={{
        backgroundImage: "url('/phoneosnova.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: 20,
        paddingBottom: 56,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay with blur */}
      <div
        className="absolute inset-0 bg-black/[.15] backdrop-blur-[6px]"
      />

      {/* Logo - centered, above overlay */}
      <div className="flex justify-center px-4 mb-4 relative z-10">
        <img
          src="/veteroklogo.png"
          alt="VeterOK Logo"
          style={{ height: 64, width: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Promo slider — above overlay */}
      <div className="relative z-10">
        <PromoBanner />
      </div>
    </div>
  );
}


// ─── Global Category Squircles ──────────────────────────────────────────────
interface GlobalCatRowProps {
  activeId: string;
  onSelect: (id: string) => void;
}

function GlobalCatRow({ activeId, onSelect }: GlobalCatRowProps) {
  return (
    <div
      className="flex gap-4 no-scrollbar overflow-x-auto"
      style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 4, paddingBottom: 4 }}
    >
      {globalCategories.map((cat) => {
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex-shrink-0 flex flex-col items-center overflow-hidden"
            style={{
              width: 106,
              height: 90,
              borderRadius: 16,
              border: isActive
                ? '2px solid rgba(230,226,218,0.85)'
                : '2px solid rgba(255,255,255,0.14)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              padding: 0,
              boxShadow: isActive ? '0 0 0 1px rgba(230,226,218,0.25), 0 4px 16px rgba(0,0,0,0.4)' : 'none',
            }}
          >
            {/* Background image — full opacity when active, dimmed when inactive */}
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isActive ? 1 : 0.45,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Dark overlay — solid film for inactive, gradient for active */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: isActive
                  ? 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)'
                  : 'rgba(0,0,0,0.55)',
                transition: 'background 0.3s ease',
              }}
            />

            {/* Text */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 6px',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 11.5,
                  color: 'var(--text)',
                  textAlign: 'center',
                  lineHeight: 1.25,
                  textTransform: 'uppercase',
                  letterSpacing: 0.2,
                  filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))',
                }}
              >
                {cat.name}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Search Bar ─────────────────────────────────────────────────────────────
interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-5">
      <div
        className="flex items-center gap-3"
        style={{
          background: 'var(--search-bg)',
          borderRadius: 99,
          border: '1.5px solid rgba(230,226,218,0.18)',
          paddingLeft: 18,
          paddingRight: 18,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        <Search size={17} color="var(--text-muted)" strokeWidth={2.5} />
        <input
          id="search-input"
          type="text"
          placeholder="Поиск блюд"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'var(--text)',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 14,
          }}
        />
        {value && (
          <button onClick={() => onChange('')} style={{ border: 'none', background: 'none', padding: 0 }}>
            <X size={15} color="var(--text-muted)" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Sub-category Pill Nav ──────────────────────────────────────────────────
interface PillNavProps {
  cats: MenuCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

function PillNav({ cats, activeId, onSelect }: PillNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    const el = container?.querySelector(`[data-id="${activeId}"]`) as HTMLElement | null;
    if (el && container) {
      const elLeft = el.offsetLeft;
      const elW = el.offsetWidth;
      const cW = container.clientWidth;
      container.scrollTo({ left: elLeft - cW / 2 + elW / 2, behavior: 'smooth' });
    }
  }, [activeId]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 no-scrollbar overflow-x-auto"
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      {cats.map(cat => {
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            data-id={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex-shrink-0"
            style={{
              borderRadius: 99,
              paddingLeft: 18,
              paddingRight: 18,
              paddingTop: 8,
              paddingBottom: 8,
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 13,
              background: isActive ? 'var(--pill-active-bg)' : 'var(--pill-inactive-bg)',
              color: isActive ? 'var(--pill-active-text)' : 'var(--text)',
              border: isActive
                ? '1.5px solid transparent'
                : '1.5px solid var(--pill-inactive-border)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase()}
          </button>
        );
      })}
    </div>
  );
}

// ─── Menu Item Card ─────────────────────────────────────────────────────────
interface CardProps {
  item: MenuItem;
  onAdd: () => void;
}

function MenuCard({ item, onAdd }: CardProps) {
  const hasImage = !!item.image;

  return (
    <div
      className="flex gap-3"
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 14,
        paddingBottom: 14,
        borderBottom: '1px solid var(--divider)',
      }}
    >
      {/* Left: Food photo — only rendered when image exists */}
      {hasImage && (
        <div
          style={{
            width: 108,
            minWidth: 108,
            height: 86,
            borderRadius: 16,
            overflow: 'hidden',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <img
            src={item.image!}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* Right: Info — expands to full width when no image */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: hasImage ? 86 : undefined }}>
        {/* Title */}
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 13.5,
            color: 'var(--text)',
            lineHeight: 1.3,
            marginBottom: 3,
          }}
        >
          {item.name}
          {item.weight ? (
            <span style={{ fontWeight: 500, opacity: 0.65, fontSize: 12 }}>
              {' '}({item.weight})
            </span>
          ) : null}
        </p>

        {/* Ingredients */}
        {item.ingredients ? (
          <p
            style={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: 11.5,
              color: 'var(--text-dim)',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.ingredients}
          </p>
        ) : null}

        {/* Price + Add button */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--text)',
            }}
          >
            {item.price.toLocaleString('ru-RU')} тг
          </span>

          <motion.button
            id={`add-${item.id}`}
            whileTap={{ scale: 0.85 }}
            onClick={onAdd}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'var(--text)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}
          >
            <Plus size={17} color="#134534" strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Modal ─────────────────────────────────────────────────────────────
interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
}

function CartModal({ cart, onClose, onInc, onDec }: CartModalProps) {
  const [isWaiterView, setIsWaiterView] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const service = Math.round(subtotal * 0.1);
  const total = subtotal + service;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 480,
          maxHeight: '92vh',
          background: '#134534',
          borderRadius: '32px 32px 0 0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ width: 42, height: 4, borderRadius: 99, background: 'rgba(230,226,218,0.25)' }} />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px 12px',
            borderBottom: '1px solid var(--divider)',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontWeight: 800,
              fontSize: 20,
              color: 'var(--text)',
            }}
          >
            Корзина
          </span>
          <button
            id="close-cart"
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(230,226,218,0.12)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={17} color="var(--text)" />
          </button>
        </div>

        {/* Items list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {cart.length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                padding: 40,
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: 15,
                color: 'var(--text-dim)',
              }}
            >
              Корзина пуста
            </p>
          ) : isWaiterView ? (
            <div style={{ paddingLeft: 20, paddingRight: 20 }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px 0', 
                    borderBottom: '1px solid var(--divider)' 
                  }}
                >
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, color: '#E6E2DA' }}>
                    {item.name} {item.weight && `(${item.weight})`}
                  </span>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, color: '#E6E2DA' }}>
                    x {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 20px',
                  borderBottom: '1px solid var(--divider)',
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      fontSize: 13,
                      color: 'var(--text)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginTop: 2 }}>
                    {(item.price * item.quantity).toLocaleString('ru-RU')} тг
                  </p>
                </div>
                {/* Qty controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <button
                    onClick={() => onDec(item.id)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: 'rgba(230,226,218,0.12)',
                      border: '1.5px solid rgba(230,226,218,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Minus size={12} color="var(--text)" strokeWidth={2.5} />
                  </button>
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      fontSize: 15,
                      color: 'var(--text)',
                      minWidth: 18,
                      textAlign: 'center',
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onInc(item.id)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: 'var(--text)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={12} color="#134534" strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals + CTA */}
        <div
          style={{
            padding: '16px 20px 24px',
            borderTop: '1px solid var(--divider)',
            background: 'rgba(0,0,0,0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: 'var(--text-dim)' }}>
              Сумма заказа
            </span>
            <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>
              {subtotal.toLocaleString('ru-RU')} тг
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: 'var(--text-dim)' }}>
              Обслуживание: 10%
            </span>
            <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>
              {service.toLocaleString('ru-RU')} тг
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
              padding: '12px 16px',
              background: 'rgba(230,226,218,0.08)',
              borderRadius: 14,
            }}
          >
            <span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 17, color: 'var(--text)' }}>
              Итого
            </span>
            <span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 17, color: 'var(--text)' }}>
              {total.toLocaleString('ru-RU')} тг
            </span>
          </div>
          {!isWaiterView ? (
            <button
              id="checkout-btn"
              onClick={() => setIsWaiterView(true)}
              style={{
                width: '100%',
                padding: '15px 0',
                borderRadius: 99,
                background: 'var(--text)',
                border: 'none',
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 15,
                color: '#134534',
                cursor: 'pointer',
                letterSpacing: 0.3,
              }}
            >
              Показать официанту
            </button>
          ) : (
            <button
              onClick={() => setIsWaiterView(false)}
              style={{
                width: '100%',
                padding: '15px 0',
                borderRadius: 99,
                background: 'transparent',
                border: '1.5px solid var(--text)',
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--text)',
                cursor: 'pointer',
                letterSpacing: 0.3,
              }}
            >
              Назад к редактированию
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}



// ─── Floating Cart FAB ───────────────────────────────────────────────────────
interface FABProps {
  count: number;
  total: number;
  onClick: () => void;
}

function FloatingCart({ count, total, onClick }: FABProps) {
  return (
    <motion.button
      id="fab-cart"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 13,
        paddingBottom: 13,
        borderRadius: 99,
        background: 'var(--text)',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 8px 28px rgba(0,0,0,0.45)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <ShoppingCart size={20} color="#134534" strokeWidth={2.5} />
        <motion.span
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            width: 17,
            height: 17,
            borderRadius: '50%',
            background: '#d04444',
            color: '#fff',
            fontFamily: 'Inter',
            fontWeight: 800,
            fontSize: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {count}
        </motion.span>
      </div>
      <span
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: 13.5,
          color: '#134534',
        }}
      >
        {total.toLocaleString('ru-RU')} тг
      </span>
    </motion.button>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [search, setSearch] = useState('');
  const [activeGlobal, setActiveGlobal] = useState(globalCategories[0].id);
  // Seed with the actual first sub-category ID so the pill is correct on initial render
  const initialSubCat = (() => {
    const firstGlobal = globalCategories[0];
    const firstCat = menuData.find(c => firstGlobal.categoryIds.includes(c.id));
    return firstCat?.id ?? '';
  })();
  const [activeSubCat, setActiveSubCat] = useState(initialSubCat);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const feedRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const userScrolling = useRef(false);

  // Filtered categories by global + search
  const globalCat = globalCategories.find(g => g.id === activeGlobal);
  const baseCats = menuData.filter(c => globalCat?.categoryIds.includes(c.id));
  const filteredCats = baseCats
    .map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.ingredients.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(cat => cat.items.length > 0);

  // Active sub-cat init and scroll reset moved to handleGlobalChange

  // On mount: ensure scroll is at 0 and the first pill is selected
  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
    if (filteredCats.length > 0) setActiveSubCat(filteredCats[0].id);
    // Silence observer for a beat so it doesn't override the seeded state
    userScrolling.current = true;
    const t = setTimeout(() => { userScrolling.current = false; }, 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll spy
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const feed = feedRef.current;
    if (!feed) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        if (userScrolling.current) return;
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (e.isIntersecting) {
            if (!best || e.boundingClientRect.top < best.boundingClientRect.top) best = e;
          }
        }
        if (best) {
          const id = best.target.getAttribute('data-cat-id');
          if (id) setActiveSubCat(id);
        }
      },
      { root: feed, rootMargin: '-100px 0px -80% 0px', threshold: 0 }
    );

    filteredCats.forEach(c => {
      const el = sectionRefs.current[c.id];
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [filteredCats.map(c => c.id).join(','), activeGlobal]);

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      // Check both window.scrollY and document element for cross-browser reliability
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      if (scrolled > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handlePillClick = useCallback((id: string) => {
    setActiveSubCat(id);
    userScrolling.current = true;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => { userScrolling.current = false; }, 900);
  }, []);

  const handleGlobalChange = (id: string) => {
    setActiveGlobal(id);
    
    // 1. Force reset the active pill category to the first sub-category of the new main menu
    const newGlobalCat = globalCategories.find(g => g.id === id);
    if (newGlobalCat && newGlobalCat.categoryIds.length > 0) {
      // Find the base categories for the new main menu
      const newBaseCats = menuData.filter(c => newGlobalCat.categoryIds.includes(c.id));
      
      // Apply the current search filter
      const newFilteredCats = newBaseCats
        .map(cat => ({
          ...cat,
          items: cat.items.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.ingredients.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter(cat => cat.items.length > 0);
        
      if (newFilteredCats.length > 0) {
        setActiveSubCat(newFilteredCats[0].id);
      }
    }

    // 2. Reset scroll position immediately
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
    
    // Temporarily disable intersection observer from firing while we reset
    userScrolling.current = true;
    setTimeout(() => {
      userScrolling.current = false;
    }, 100);
  };

  // Cart helpers
  const addItem = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const incItem = (id: string) => setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  const decItem = (id: string) => setCart(prev => {
    const item = prev.find(i => i.id === id);
    if (!item || item.quantity <= 1) return prev.filter(i => i.id !== id);
    return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
  });

  const totalCount = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="app-container">
      {/* ── GRAY HEADER ZONE ─────────────────────────────────── */}
      <AppHeader />

      {/* ── GREEN OVERLAY PANEL ──────────────────────────────── */}
      <div
        style={{
          flex: 1,
          background: '#134534',
          borderRadius: '40px 40px 0 0',
          marginTop: -40,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Sticky top nav area */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: '#134534',
            paddingTop: 22,
            paddingBottom: 10,
          }}
        >
          {/* Global categories, Search, Pills — equal gap-6 between each */}
          <div className="flex flex-col gap-6">
            {/* Global categories (squircles) */}
            <GlobalCatRow activeId={activeGlobal} onSelect={handleGlobalChange} />

            {/* Search bar */}
            <SearchBar value={search} onChange={setSearch} />

            {/* Sub-category pills */}
            {filteredCats.length > 0 && (
              <PillNav cats={filteredCats} activeId={activeSubCat} onSelect={handlePillClick} />
            )}
          </div>

          {/* Subtle divider */}
          <div style={{ height: 1, background: 'var(--divider)', marginTop: 16 }} />
        </div>

        {/* ── SCROLLABLE MENU FEED ─────────────────────────── */}
        <div
          ref={feedRef}
          className="no-scrollbar"
          style={{ flex: 1, overflowY: 'auto' }}
        >
          {filteredCats.map(cat => (
            <div
              key={cat.id}
              id={cat.id}
              ref={el => { sectionRefs.current[cat.id] = el; }}
              data-cat-id={cat.id}
              style={{ scrollMarginTop: 168 }}
            >
              {/* Section heading */}
              {cat.id !== 'alkogol' && (
                <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 10 }}>
                  <h2
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 800,
                      fontSize: 22,
                      color: 'var(--text)',
                      textTransform: cat.name === cat.name.toUpperCase() ? 'none' : 'uppercase',
                      letterSpacing: 0.2,
                    }}
                  >
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase()}
                  </h2>
                </div>
              )}

              {/* Items */}
              {cat.items.map((item, index) => {
                // Check if this item starts a new subCategory group
                const showSubCategory = item.subCategory && (index === 0 || cat.items[index - 1].subCategory !== item.subCategory);
                
                return (
                  <React.Fragment key={item.id}>
                    {showSubCategory && (
                      <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 32, paddingBottom: 12 }}>
                        <h3
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 800,
                            fontSize: 22,
                            color: 'var(--text)',
                            textTransform: item.subCategory! === item.subCategory!.toUpperCase() ? 'none' : 'uppercase',
                            letterSpacing: 0.2,
                          }}
                        >
                          {item.subCategory!.charAt(0).toUpperCase() + item.subCategory!.slice(1).toLowerCase()}
                        </h3>
                      </div>
                    )}
                    <MenuCard item={item} onAdd={() => addItem(item)} />
                  </React.Fragment>
                );
              })}
            </div>
          ))}

          {filteredCats.length === 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px',
                gap: 8,
              }}
            >
              <Search size={32} color="var(--text-muted)" />
              <p
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 15,
                  color: 'var(--text-dim)',
                  textAlign: 'center',
                }}
              >
                Ничего не найдено
              </p>
            </div>
          )}

          {/* Bottom spacer for FAB */}
          <div className="pb-36" />
        </div>
      </div>

      {/* ── CART MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {cartOpen && (
          <CartModal cart={cart} onClose={() => setCartOpen(false)} onInc={incItem} onDec={decItem} />
        )}
      </AnimatePresence>

      {/* ── FLOATING CART ──────────────────────────────────── */}
      <AnimatePresence>
        {totalCount > 0 && (
          <FloatingCart count={totalCount} total={totalPrice} onClick={() => setCartOpen(true)} />
        )}
      </AnimatePresence>

      {/* ── SCROLL TO TOP FAB ──────────────────────────────── */}
      {showScrollTop && !cartOpen && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-4 left-4 z-[9999] bg-[#E6E2DA] text-[#134534] w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
}
