import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/data";
import { cn } from "@/utils/cn";
import { useEscapeKey, useFocusTrap, useLockBodyScroll, useTimedFlag } from "@/lib/hooks";
import { IconClose, IconMinus, IconPlus } from "./ui/Icons";
import { Button } from "./ui/Button";

/** Designed fallback artwork for products with no photography yet. */
function ProductArt({ art }: { art: NonNullable<Product["art"]> }) {
  if (art === "digital") {
    const bars = Array.from({ length: 34 });
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-espresso-700 via-espresso to-espresso-800">
        <div className="flex h-24 items-end gap-[3px] px-6" aria-hidden="true">
          {bars.map((_, index) => (
            <span
              key={index}
              className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-gold/25 to-gold/70"
              style={{
                height: `${20 + Math.abs(Math.sin(index * 0.7)) * 80}%`,
                animationDelay: `${(index % 10) * 110}ms`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (art === "merch") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-espresso-700 via-espresso to-espresso-800">
        <svg viewBox="0 0 120 120" className="h-32 w-32 text-gold/70" aria-hidden="true">
          <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
          <text
            x="60"
            y="60"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="26"
            letterSpacing="2"
            fill="currentColor"
          >
            BMF
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-espresso-700 via-espresso to-espresso-800">
      <svg viewBox="0 0 120 120" className="h-32 w-32 text-gold/60" aria-hidden="true">
        <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="60" cy="60" r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}

export function ProductArtView({ product }: { product: Product }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={`${product.title} — placeholder product image`}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    );
  }
  return <ProductArt art={product.art ?? "vinyl"} />;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, triggerAdded] = useTimedFlag(2400);

  useLockBodyScroll(Boolean(product));
  useEscapeKey(onClose, Boolean(product));
  useFocusTrap(panelRef, Boolean(product));

  useEffect(() => {
    if (product) setQuantity(1);
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:items-center md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.title} — product details`}
    >
      <button
        type="button"
        aria-label="Close product details"
        onClick={onClose}
        tabIndex={-1}
        className="modal-backdrop fixed inset-0 h-full w-full cursor-default border-0 bg-espresso/93 backdrop-blur-md"
      />

      <div
        ref={panelRef}
        className="modal-panel relative my-auto w-full max-w-5xl border border-gold/25 bg-espresso-800 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-ivory/20 bg-espresso/70 text-ivory/70 backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          <IconClose size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* image */}
          <div className="relative aspect-square overflow-hidden border-b border-ivory/10 md:border-b-0 md:border-r">
            <ProductArtView product={product} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-800/40 to-transparent" />
            <span className="absolute left-5 top-5 border border-gold/40 bg-espresso/70 px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.26em] text-gold backdrop-blur-sm">
              {product.category}
            </span>
          </div>

          {/* details */}
          <div className="flex flex-col gap-6 p-6 sm:p-9">
            <div>
              <p className="u-label text-gold">{product.category}</p>
              <h3 className="u-display mt-4 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.05] text-ivory">
                {product.title}
              </h3>
            </div>

            <p className="font-sans text-[0.92rem] font-light leading-[1.9] text-ivory/60">
              {product.description}
            </p>

            <ul className="flex flex-col gap-3">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  <span className="font-sans text-[0.85rem] font-light leading-[1.7] text-ivory/55">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-4 border-y border-ivory/10 py-5">
              <span className="u-label text-ivory/35">Price</span>
              <span className="u-display text-[1.6rem] text-gold">{product.price}</span>
            </div>

            {/* quantity */}
            <div className="flex flex-wrap items-center gap-5">
              <span className="u-label text-ivory/35">Quantity</span>
              <div className="flex items-center border border-ivory/20">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center text-ivory/70 transition-colors duration-300 hover:bg-gold hover:text-espresso"
                >
                  <IconMinus size={15} />
                </button>
                <span
                  className="w-12 text-center font-sans text-[13px] tabular-nums text-ivory"
                  aria-live="polite"
                  aria-label={`Quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center text-ivory/70 transition-colors duration-300 hover:bg-gold hover:text-espresso"
                >
                  <IconPlus size={15} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => {
                  onAddToCart(product, quantity);
                  triggerAdded();
                }}
                className={cn("w-full transition-colors duration-500", added && "bg-gold-200")}
              >
                {added ? "Added to Your Selection" : "Add to Cart"}
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                Continue Browsing
              </Button>
            </div>

            <p className="font-sans text-[10.5px] leading-relaxed tracking-[0.06em] text-ivory/35">
              Front-end prototype. This is a placeholder product — no payment is taken
              and no order is placed. Pricing and availability will be confirmed before
              the shop goes live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
