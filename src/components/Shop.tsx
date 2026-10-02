import { useState } from "react";
import { products, type Product } from "@/lib/data";
import { SectionHeading, SectionLabel, SectionShell } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { ProductArtView, ProductModal } from "./ProductModal";
import { TextLink } from "./ui/Button";
import { IconBag, IconTrash } from "./ui/Icons";

type CartLine = { product: Product; quantity: number };

export function Shop() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [bagOpen, setBagOpen] = useState(false);

  const itemCount = cart.reduce((total, line) => total + line.quantity, 0);

  const addToCart = (product: Product, quantity: number) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: Math.min(10, line.quantity + quantity) }
            : line,
        );
      }
      return [...current, { product, quantity }];
    });
    setBagOpen(true);
  };

  const removeLine = (id: string) => {
    setCart((current) => current.filter((line) => line.product.id !== id));
  };

  return (
    <SectionShell id="shop" className="bg-espresso">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_15%_0%,rgba(198,161,91,0.09),transparent_70%)]"
      />

      <div className="relative">
        {/* ---------------- Header ---------------- */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>The Shop</SectionLabel>
            <SectionHeading className="mt-6" size="lg">
              Take the Music
              <br />
              <span className="u-italic text-gold">Home.</span>
            </SectionHeading>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <Reveal variant="up" delay={160} className="max-w-[34ch]">
              <p className="font-sans text-[0.92rem] font-light leading-[1.9] text-ivory/50">
                Physical editions, digital downloads and artist merchandise. Products
                shown here are placeholders, ready to be swapped for Brenda's real
                catalogue.
              </p>
            </Reveal>

            <button
              type="button"
              onClick={() => setBagOpen((open) => !open)}
              aria-expanded={bagOpen}
              className="group inline-flex items-center gap-3 border border-gold/40 px-5 py-3 font-sans text-[10px] uppercase tracking-[0.24em] text-gold transition-colors duration-400 hover:bg-gold hover:text-espresso"
            >
              <IconBag size={15} />
              Your Selection
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 font-sans text-[9px] tabular-nums text-espresso transition-colors duration-400 group-hover:bg-espresso group-hover:text-gold">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        {/* ---------------- Selection panel ---------------- */}
        {bagOpen && (
          <Reveal
            variant="up"
            className="mt-8 border border-gold/25 bg-espresso-800/60 p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="u-label text-gold">Your Selection</h3>
              <button
                type="button"
                onClick={() => setCart([])}
                className="font-sans text-[10px] uppercase tracking-[0.24em] text-ivory/40 transition-colors duration-300 hover:text-gold"
              >
                Clear all
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="mt-5 font-sans text-[0.88rem] font-light leading-[1.8] text-ivory/50">
                Nothing selected yet. Open a product and choose “Add to Cart” to build a
                selection.
              </p>
            ) : (
              <ul className="mt-5 flex flex-col divide-y divide-ivory/10">
                {cart.map((line) => (
                  <li key={line.product.id} className="flex items-center gap-4 py-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden border border-ivory/10">
                      <ProductArtView product={line.product} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-[0.88rem] text-ivory">
                        {line.product.title}
                      </p>
                      <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                        Qty {line.quantity} · {line.product.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.product.id)}
                      aria-label={`Remove ${line.product.title} from selection`}
                      className="flex h-9 w-9 items-center justify-center border border-ivory/15 text-ivory/50 transition-colors duration-300 hover:border-gold hover:text-gold"
                    >
                      <IconTrash size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-6 font-sans text-[10.5px] leading-relaxed tracking-[0.06em] text-ivory/35">
              Front-end prototype — no checkout is processed. Your selection is held in
              this session only.
            </p>
          </Reveal>
        )}

        {/* ---------------- Product grid ---------------- */}
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 xl:grid-cols-4">
          {products.map((product, index) => (
            <Reveal as="li" variant="up" delay={index * 100} key={product.id}>
              <article className="group flex h-full flex-col border border-ivory/10 bg-espresso-800/40 transition-all duration-600 hover:border-gold/40 hover:bg-espresso-800/70">
                <div className="relative aspect-square overflow-hidden">
                  <div className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                    <ProductArtView product={product} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 border border-gold/35 bg-espresso/65 px-3 py-1.5 font-sans text-[8.5px] uppercase tracking-[0.24em] text-gold backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <h3 className="u-display text-[1.45rem] leading-tight text-ivory transition-colors duration-400 group-hover:text-gold-200">
                      {product.title}
                    </h3>
                    <p className="mt-3 font-sans text-[0.85rem] font-light leading-[1.8] text-ivory/50">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-ivory/10 pt-5">
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
                      {product.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveProduct(product)}
                      className="group/btn inline-flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.24em] text-ivory/75 transition-colors duration-400 hover:text-gold"
                    >
                      View Product
                      <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1">
                        <svg width="20" height="7" viewBox="0 0 20 7" fill="none" aria-hidden="true">
                          <path d="M0 3.5h16M13 1l3.5 2.5L13 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal variant="fade" delay={200} className="mt-14 flex flex-col items-start gap-4">
          <TextLink href="#music">Explore All Music</TextLink>
          <p className="max-w-[52ch] font-sans text-[0.85rem] font-light leading-[1.85] text-ivory/40">
            Full discography, digital editions and limited releases will be listed here
            as each one is confirmed.
          </p>
        </Reveal>
      </div>

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={addToCart}
      />
    </SectionShell>
  );
}
