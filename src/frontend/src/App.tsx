import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChevronRight, Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Category, type Item, type JournalEntry } from "./backend.d";
import { SAMPLE_ITEMS, SAMPLE_JOURNAL_ENTRIES } from "./data/sampleData";
import {
  useAllItems,
  useItemsByCategory,
  useJournalEntries,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

type Page =
  | "home"
  | "personalities"
  | "dreams"
  | "desires"
  | "journal"
  | "become";

interface CartItem extends Item {
  cartId: string;
}

const categoryImages: Record<string, string[]> = {
  [Category.personality]: [
    "/assets/generated/personality-stoic.dim_600x800.jpg",
    "/assets/generated/personality-romantic.dim_600x800.jpg",
    "/assets/generated/personality-stoic.dim_600x800.jpg",
    "/assets/generated/personality-romantic.dim_600x800.jpg",
  ],
  [Category.dream]: [
    "/assets/generated/dream-escape.dim_600x800.jpg",
    "/assets/generated/dream-masterwork.dim_600x800.jpg",
    "/assets/generated/dream-escape.dim_600x800.jpg",
  ],
  [Category.desire]: [
    "/assets/generated/desire-seen.dim_600x800.jpg",
    "/assets/generated/desire-seen.dim_600x800.jpg",
    "/assets/generated/desire-seen.dim_600x800.jpg",
  ],
};

function getItemImage(item: Item, index: number): string {
  const images = categoryImages[item.category] || [];
  return (
    images[index % images.length] ||
    "/assets/generated/personality-stoic.dim_600x800.jpg"
  );
}

// Product Card
function ProductCard({
  item,
  index,
  onSelect,
}: {
  item: Item;
  index: number;
  onSelect: (item: Item) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group cursor-pointer"
      onClick={() => onSelect(item)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(item)}
      data-ocid={`item.card.${index + 1}`}
    >
      <div className="border border-border bg-card shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-muted-foreground/30 transition-all duration-500">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "3/4" }}
        >
          <div className="absolute inset-2 overflow-hidden border border-border/40">
            <img
              src={getItemImage(item, index)}
              alt={item.name}
              className="w-full h-full object-cover filter grayscale brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
          </div>
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[9px] tracking-widest uppercase text-muted-foreground bg-background/80 border border-border px-2 py-1">
              {item.category}
            </span>
          </div>
        </div>
        <div className="p-5 border-t border-border">
          <h3 className="font-cinzel text-sm font-semibold tracking-widest uppercase mb-2 text-foreground">
            {item.name}
          </h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {item.shortDescription}
          </p>
          <div className="border-t border-border/50 pt-3">
            <span className="text-[9px] tracking-widest uppercase text-muted-foreground/60 block mb-1">
              CURRENCY
            </span>
            <span className="text-xs text-foreground/80 font-cormorant italic">
              {item.existentialPrice}
            </span>
          </div>
          <button
            type="button"
            className="mt-4 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors duration-200"
          >
            ACQUIRE <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Item Modal
function ItemModal({
  item,
  index,
  onClose,
  onAcquire,
}: {
  item: Item;
  index: number;
  onClose: () => void;
  onAcquire: (item: Item) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="item.modal"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          data-ocid="item.close_button"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 relative" style={{ minHeight: "300px" }}>
            <div className="absolute inset-3 border border-border/40 overflow-hidden">
              <img
                src={getItemImage(item, index)}
                alt={item.name}
                className="w-full h-full object-cover filter grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
            </div>
          </div>
          <div className="md:w-3/5 p-8 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="text-[9px] tracking-widest uppercase text-muted-foreground border border-border px-2 py-1">
                  {item.category}
                </span>
              </div>
              <h2 className="font-cinzel text-xl font-bold tracking-wider uppercase mb-4 text-foreground">
                {item.name}
              </h2>
              <p className="font-cormorant text-base text-muted-foreground leading-relaxed mb-6">
                {item.longDescription}
              </p>
            </div>
            <div>
              <div className="border border-border p-4 mb-6 bg-muted/20">
                <span className="text-[9px] tracking-widest uppercase text-muted-foreground/60 block mb-2">
                  EXISTENTIAL CURRENCY
                </span>
                <span className="font-cinzel text-lg text-foreground tracking-wide">
                  {item.existentialPrice}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onAcquire(item)}
                className="w-full border border-border bg-secondary hover:bg-accent text-foreground text-xs tracking-widest uppercase py-4 transition-all duration-300 hover:border-muted-foreground/50"
                data-ocid="item.primary_button"
              >
                ACQUIRE — {item.existentialPrice}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Journal Card
function JournalCard({
  entry,
  index,
  onSelect,
  large = false,
}: {
  entry: JournalEntry;
  index: number;
  onSelect: (entry: JournalEntry) => void;
  large?: boolean;
}) {
  const journalImages = [
    "/assets/generated/journal-cover.dim_800x500.jpg",
    "/assets/generated/dream-masterwork.dim_600x800.jpg",
    "/assets/generated/personality-romantic.dim_600x800.jpg",
  ];
  const img = journalImages[index % journalImages.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer border border-border bg-card hover:border-muted-foreground/30 transition-all duration-500"
      onClick={() => onSelect(entry)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(entry)}
      data-ocid={`journal.item.${index + 1}`}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: large ? "16/7" : "16/9" }}
      >
        <img
          src={img}
          alt={entry.title}
          className="w-full h-full object-cover filter grayscale brightness-60 group-hover:brightness-75 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-widest uppercase text-muted-foreground bg-background/80 border border-border px-2 py-1">
            {entry.themeTag}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-cinzel text-sm font-semibold tracking-wider uppercase mb-3 text-foreground group-hover:text-foreground/80 transition-colors">
          {entry.title}
        </h3>
        <p className="text-sm text-muted-foreground font-cormorant italic leading-relaxed">
          {entry.excerpt}
        </p>
        <button
          type="button"
          className="mt-4 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors duration-200"
        >
          READ <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.article>
  );
}

// Journal Modal
function JournalModal({
  entry,
  onClose,
}: {
  entry: JournalEntry;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="journal.modal"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 bg-card border border-border max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          data-ocid="journal.close_button"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-10">
          <div className="mb-6">
            <span className="text-[9px] tracking-widest uppercase text-muted-foreground border border-border px-2 py-1">
              {entry.themeTag}
            </span>
          </div>
          <h2 className="font-cinzel text-2xl font-bold tracking-wider uppercase mb-8 text-foreground leading-tight">
            {entry.title}
          </h2>
          <div className="font-cormorant text-lg text-muted-foreground leading-loose whitespace-pre-wrap">
            {entry.content}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Cart Drawer
function CartDrawer({
  cart,
  onClose,
  onRemove,
}: {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (cartId: string) => void;
}) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" data-ocid="cart.panel">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
        className="relative z-10 w-full max-w-md bg-card border-l border-border flex flex-col h-full"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-cinzel text-sm tracking-widest uppercase text-foreground">
            YOUR ACQUISITIONS
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="cart.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-16" data-ocid="cart.empty_state">
              <p className="font-cinzel text-xs tracking-widest uppercase text-muted-foreground">
                YOUR CART IS EMPTY
              </p>
              <p className="text-xs text-muted-foreground/50 mt-3 font-cormorant italic">
                You are still entirely yourself.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((cartItem, i) => (
                <div
                  key={cartItem.cartId}
                  className="border border-border p-4 flex justify-between items-start"
                  data-ocid={`cart.item.${i + 1}`}
                >
                  <div className="flex-1">
                    <span className="text-[9px] tracking-widest uppercase text-muted-foreground/60 block mb-1">
                      {cartItem.category}
                    </span>
                    <h4 className="font-cinzel text-xs tracking-wide text-foreground mb-2">
                      {cartItem.name}
                    </h4>
                    <div>
                      <span className="text-[9px] tracking-widest uppercase text-muted-foreground/50 block">
                        COST
                      </span>
                      <span className="text-xs font-cormorant italic text-muted-foreground">
                        {cartItem.existentialPrice}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(cartItem.cartId)}
                    className="text-muted-foreground/40 hover:text-muted-foreground transition-colors ml-4"
                    data-ocid={`cart.delete_button.${i + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t border-border">
            {!accepted ? (
              <>
                <div className="mb-4">
                  <span className="text-[9px] tracking-widest uppercase text-muted-foreground/60 block mb-2">
                    TOTAL SURRENDERED
                  </span>
                  <div className="space-y-1">
                    {cart.map((cartItem) => (
                      <div
                        key={cartItem.cartId}
                        className="text-xs font-cormorant italic text-muted-foreground"
                      >
                        — {cartItem.existentialPrice}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAccepted(true)}
                  className="w-full border border-border bg-secondary hover:bg-accent text-foreground text-xs tracking-widest uppercase py-4 transition-all duration-300 hover:border-muted-foreground/50"
                  data-ocid="cart.confirm_button"
                >
                  ACCEPT THE TERMS
                </button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-4"
                data-ocid="cart.success_state"
              >
                <p className="font-cinzel text-xs tracking-widest uppercase text-foreground mb-4">
                  THE EXCHANGE IS COMPLETE
                </p>
                <p className="text-sm font-cormorant italic text-muted-foreground leading-relaxed">
                  You have paid. You will not remember what you have
                  surrendered. This is the nature of all transactions. Welcome
                  to the new you.
                </p>
                <p className="text-[10px] tracking-widest uppercase text-muted-foreground/40 mt-6">
                  — THE SELF MARKET
                </p>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Hero Section
function HeroSection({ onShop }: { onShop: () => void }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-background.dim_1920x1080.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-ocid="hero.section"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(5% 0.003 280 / 0.92), oklch(8% 0.003 280 / 0.75) 50%, oklch(8% 0.003 280) 100%)",
        }}
      />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-8">
            EST. IN THE AGE OF SELF-INVENTION
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.12em] uppercase text-foreground mb-6"
          style={{ textShadow: "0 0 80px rgba(0,0,0,0.8)" }}
        >
          THE SELF
          <br />
          MARKET
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="h-px bg-border mx-auto mb-8"
          style={{ maxWidth: "300px" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-12 leading-loose"
        >
          ARCHITECTS OF BECOMING
          <span className="mx-4 text-border">|</span>
          SHOP PERSONALITIES, DREAMS &amp; DESIRES
        </motion.p>
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={onShop}
          className="border border-border bg-secondary/80 hover:bg-accent text-foreground text-xs tracking-[0.25em] uppercase px-12 py-5 transition-all duration-400 hover:border-muted-foreground/50 backdrop-blur-sm"
          data-ocid="hero.primary_button"
        >
          ACQUIRE YOURS
        </motion.button>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, oklch(8% 0.003 280), transparent)",
        }}
      />
    </section>
  );
}

// Selections Section
function SelectionsSection({
  onSelectItem,
}: {
  onSelectItem: (item: Item) => void;
}) {
  const { data: items = SAMPLE_ITEMS } = useAllItems();
  const featured = items.slice(0, 4);

  return (
    <section
      className="py-24 px-6 bg-background"
      data-ocid="selections.section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            CURATED FOR YOUR DISSOLUTION
          </p>
          <h2 className="font-cinzel text-2xl md:text-3xl font-bold tracking-[0.15em] uppercase text-foreground">
            THIS WEEK&#39;S SELECTIONS
          </h2>
          <div
            className="h-px bg-border mx-auto mt-6"
            style={{ maxWidth: "200px" }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item, i) => (
            <ProductCard
              key={String(item.id)}
              item={item}
              index={i}
              onSelect={onSelectItem}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Journal Preview
function JournalPreview({
  onSelectEntry,
  onViewAll,
}: {
  onSelectEntry: (entry: JournalEntry) => void;
  onViewAll: () => void;
}) {
  const { data: entries = SAMPLE_JOURNAL_ENTRIES } = useJournalEntries();
  const preview = entries.slice(0, 2);

  return (
    <section
      className="py-24 px-6"
      style={{ background: "oklch(9% 0.003 280)" }}
      data-ocid="journal.section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
              MEDITATIONS ON IDENTITY
            </p>
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold tracking-[0.15em] uppercase text-foreground">
              JOURNAL
            </h2>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            data-ocid="journal.link"
          >
            ALL ENTRIES <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preview.map((entry, i) => (
            <JournalCard
              key={String(entry.id)}
              entry={entry}
              index={i}
              onSelect={onSelectEntry}
              large
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Category Page
function CategoryPage({
  category,
  onSelectItem,
}: {
  category: Category;
  onSelectItem: (item: Item) => void;
}) {
  const { data: items = [] } = useItemsByCategory(category);

  const titles: Record<Category, string> = {
    [Category.personality]: "PERSONALITIES",
    [Category.dream]: "DREAMS",
    [Category.desire]: "DESIRES",
  };

  const subtitles: Record<Category, string> = {
    [Category.personality]:
      "Choose who you wish to become. The price is who you are.",
    [Category.dream]:
      "Acquire the visions that haunt your sleep and hollow days.",
    [Category.desire]: "The longings you cannot name. Now named. Now priced.",
  };

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            THE CATALOG
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl font-black tracking-[0.15em] uppercase text-foreground mb-6">
            {titles[category]}
          </h1>
          <div
            className="h-px bg-border mx-auto mb-6"
            style={{ maxWidth: "200px" }}
          />
          <p className="font-cormorant italic text-lg text-muted-foreground max-w-lg mx-auto">
            {subtitles[category]}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ProductCard
              key={String(item.id)}
              item={item}
              index={i}
              onSelect={onSelectItem}
            />
          ))}
        </div>
        {items.length === 0 && (
          <div className="text-center py-24" data-ocid="category.empty_state">
            <p className="font-cinzel text-xs tracking-widest uppercase text-muted-foreground">
              THE CATALOG IS BEING ASSEMBLED
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// Journal Page
function JournalPage({
  onSelectEntry,
}: {
  onSelectEntry: (entry: JournalEntry) => void;
}) {
  const { data: entries = SAMPLE_JOURNAL_ENTRIES } = useJournalEntries();

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            MEDITATIONS ON IDENTITY
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl font-black tracking-[0.15em] uppercase text-foreground mb-6">
            THE JOURNAL
          </h1>
          <div
            className="h-px bg-border mx-auto"
            style={{ maxWidth: "200px" }}
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry, i) => (
            <JournalCard
              key={String(entry.id)}
              entry={entry}
              index={i}
              onSelect={onSelectEntry}
            />
          ))}
        </div>
        {entries.length === 0 && (
          <div className="text-center py-24" data-ocid="journal.empty_state">
            <p className="font-cinzel text-xs tracking-widest uppercase text-muted-foreground">
              THE JOURNAL IS SILENT
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// What You've Become Page
function WhatYouveBecomePagePage({
  cart,
  onDiscard,
}: {
  cart: CartItem[];
  onDiscard: () => void;
}) {
  const personalities = cart.filter((i) => i.category === Category.personality);
  const dreams = cart.filter((i) => i.category === Category.dream);
  const desires = cart.filter((i) => i.category === Category.desire);

  const sections: { items: CartItem[]; heading: string; subheading: string }[] =
    [
      {
        items: personalities,
        heading: "YOU HAVE ASSUMED:",
        subheading:
          "These are the masks you have chosen to wear until they fit.",
      },
      {
        items: dreams,
        heading: "YOU NOW DREAM OF:",
        subheading:
          "The visions you purchased. They will visit you nightly, uninvited.",
      },
      {
        items: desires,
        heading: "YOU CRAVE:",
        subheading: "The hungers you have imported. They belong to you now.",
      },
    ].filter((s) => s.items.length > 0);

  return (
    <main className="min-h-screen pt-24 pb-32 px-6" data-ocid="become.page">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            A PORTRAIT OF THE ASSEMBLED SELF
          </p>
          <h1
            className="font-cinzel text-4xl md:text-5xl font-black tracking-[0.15em] uppercase text-foreground mb-6"
            style={{ textShadow: "0 0 60px oklch(50% 0.003 280 / 0.4)" }}
          >
            WHAT YOU&#39;VE BECOME
          </h1>
          <div
            className="h-px bg-border mx-auto"
            style={{ maxWidth: "200px" }}
          />
        </motion.div>

        {/* Empty state */}
        {cart.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-center py-24 border border-border/40"
            data-ocid="become.empty_state"
          >
            <div
              className="w-px mx-auto mb-12"
              style={{
                height: "80px",
                background:
                  "linear-gradient(to bottom, transparent, oklch(40% 0.003 280), transparent)",
              }}
            />
            <p className="font-cinzel text-sm tracking-[0.2em] uppercase text-foreground mb-6">
              YOU ARE STILL ENTIRELY YOURSELF
            </p>
            <p className="font-cormorant italic text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
              Nothing has been acquired. Nothing has been lost.
              <br />
              <br />
              The original remains intact — for now.
            </p>
            <div
              className="w-px mx-auto mt-12"
              style={{
                height: "80px",
                background:
                  "linear-gradient(to bottom, transparent, oklch(40% 0.003 280), transparent)",
              }}
            />
          </motion.div>
        )}

        {/* Populated dossier */}
        {cart.length > 0 && (
          <>
            {/* Preamble */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16 border-l-2 border-border/60 pl-6"
            >
              <p className="font-cormorant italic text-lg text-muted-foreground leading-relaxed">
                The following is a comprehensive record of the self you have
                constructed through deliberate acquisition. Each entry
                represents something surrendered, something gained. The exchange
                is permanent.
              </p>
            </motion.div>

            {/* Category sections */}
            {sections.map((section, sectionIdx) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + sectionIdx * 0.2 }}
                className="mb-16"
              >
                <div className="mb-8">
                  <h2 className="font-cinzel text-xs tracking-[0.35em] uppercase text-muted-foreground/70 mb-2">
                    {section.heading}
                  </h2>
                  <p className="font-cormorant italic text-sm text-muted-foreground/50">
                    {section.subheading}
                  </p>
                </div>

                <div className="space-y-0">
                  {section.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.cartId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + sectionIdx * 0.2 + itemIdx * 0.1,
                      }}
                      className="border-t border-border/40 py-6 flex flex-col md:flex-row md:items-start md:justify-between gap-3"
                      data-ocid={`become.item.${sectionIdx * 10 + itemIdx + 1}`}
                    >
                      <div>
                        <h3 className="font-cinzel text-base font-semibold tracking-[0.15em] uppercase text-foreground mb-1">
                          {item.name}
                        </h3>
                        <p className="font-cormorant italic text-sm text-muted-foreground/70 max-w-sm leading-relaxed">
                          {item.shortDescription}
                        </p>
                      </div>
                      <div className="md:text-right shrink-0">
                        <span className="text-[9px] tracking-widest uppercase text-muted-foreground/40 block mb-1">
                          SURRENDERED
                        </span>
                        <span className="font-cormorant italic text-sm text-muted-foreground">
                          {item.existentialPrice}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  <div className="border-t border-border/40" />
                </div>
              </motion.div>
            ))}

            {/* Closing inscription */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-center py-16 border border-border/30"
              style={{ background: "oklch(7% 0.003 280)" }}
            >
              <div
                className="w-px mx-auto mb-10"
                style={{
                  height: "60px",
                  background:
                    "linear-gradient(to bottom, transparent, oklch(40% 0.003 280), transparent)",
                }}
              />
              <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-foreground mb-4">
                THIS IS THE SELF YOU HAVE CONSTRUCTED
              </p>
              <p className="font-cormorant italic text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                The original is no longer available.
              </p>
              <div
                className="w-px mx-auto mt-10 mb-10"
                style={{
                  height: "60px",
                  background:
                    "linear-gradient(to bottom, transparent, oklch(40% 0.003 280), transparent)",
                }}
              />
              <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/40">
                — THE SELF MARKET
              </p>
            </motion.div>

            {/* Discard button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-center mt-16"
            >
              <button
                type="button"
                onClick={onDiscard}
                className="border border-border/50 text-muted-foreground/50 hover:text-foreground hover:border-muted-foreground/50 text-[10px] tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300"
                data-ocid="become.delete_button"
              >
                DISCARD THIS SELF
              </button>
              <p className="text-[9px] tracking-widest uppercase text-muted-foreground/30 mt-4">
                All acquisitions will be released. You will begin again.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}

// Music Player
function MusicPlayer() {
  const [decision, setDecision] = useState<
    "pending" | "yes" | "sure" | "dismissed"
  >("pending");

  const handleYes = () => {
    setDecision("yes");
  };

  return (
    <div className="fixed bottom-6 left-6 z-30">
      <AnimatePresence mode="wait">
        {decision === "pending" && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border border-border bg-card/90 backdrop-blur-sm px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            data-ocid="music.prompt"
          >
            <p className="font-cinzel text-[9px] tracking-widest uppercase text-muted-foreground mb-2">
              a side of music with your impending doom?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleYes}
                className="font-cinzel text-[9px] tracking-widest uppercase text-foreground hover:text-muted-foreground transition-colors"
                data-ocid="music.yes"
              >
                yes
              </button>
              <span className="text-muted-foreground/40 text-[9px]">/</span>
              <button
                type="button"
                onClick={() => setDecision("sure")}
                className="font-cinzel text-[9px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="music.no"
              >
                no
              </button>
            </div>
          </motion.div>
        )}
        {decision === "sure" && (
          <motion.div
            key="sure"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border border-border bg-card/90 backdrop-blur-sm px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            data-ocid="music.sure_prompt"
          >
            <p className="font-cinzel text-[9px] tracking-widest uppercase text-muted-foreground mb-2">
              you sure?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDecision("dismissed")}
                className="font-cinzel text-[9px] tracking-widest uppercase text-foreground hover:text-muted-foreground transition-colors"
                data-ocid="music.sure_yes"
              >
                yes
              </button>
              <span className="text-muted-foreground/40 text-[9px]">/</span>
              <button
                type="button"
                onClick={handleYes}
                className="font-cinzel text-[9px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="music.sure_no"
              >
                no
              </button>
            </div>
          </motion.div>
        )}
        {decision === "yes" && (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ opacity: 0.45 }}
            className="hover:opacity-80 transition-opacity duration-300"
            data-ocid="music.player"
          >
            <iframe
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/kiara-m-811774439/sets/the-self-magazine&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_playcount=false&visual=false&buying=false&liking=false&download=false&sharing=false&color=%23555555"
              width="200"
              height="60"
              allow="autoplay"
              title="background music"
              style={{ border: "none", display: "block" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Navigation
function Nav({
  page,
  onNavigate,
  cartCount,
  onCartOpen,
}: {
  page: Page;
  onNavigate: (p: Page) => void;
  cartCount: number;
  onCartOpen: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: "HOME", page: "home" },
    { label: "PERSONALITIES", page: "personalities" },
    { label: "DREAMS", page: "dreams" },
    { label: "DESIRES", page: "desires" },
    { label: "JOURNAL", page: "journal" },
    { label: "WHAT YOU'VE BECOME", page: "become" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 border-b border-border"
      style={{
        background: "oklch(6% 0.003 280 / 0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="font-cinzel text-sm font-bold tracking-[0.2em] uppercase text-foreground hover:text-foreground/80 transition-colors"
          data-ocid="nav.link"
        >
          THE SELF MARKET
        </button>
        <div className="hidden md:flex items-center gap-0">
          {links.map((link, i) => (
            <span key={link.page} className="flex items-center">
              {i > 0 && <span className="text-border mx-3 text-xs">|</span>}
              <button
                type="button"
                onClick={() => onNavigate(link.page)}
                className={`text-[10px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                  page === link.page
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`nav.${link.page}.link`}
              >
                {link.label}
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onCartOpen}
            className="relative flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.cart.button"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-[10px] tracking-widest uppercase">CART</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-foreground text-background text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border overflow-hidden"
            style={{ background: "oklch(6% 0.003 280)" }}
          >
            {links.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => {
                  onNavigate(link.page);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left px-6 py-4 text-[10px] tracking-[0.2em] uppercase border-b border-border/50 transition-colors ${
                  page === link.page
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`nav.mobile.${link.page}.link`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Footer
function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t border-border py-16 px-6"
      style={{ background: "oklch(6% 0.003 280)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-cinzel text-xs tracking-widest uppercase text-foreground mb-6">
              THE SELF MARKET
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-cormorant italic">
              A catalog of selves for those who can no longer tell which one is
              real.
            </p>
          </div>
          <div>
            <h4 className="font-cinzel text-[10px] tracking-widest uppercase text-muted-foreground mb-6">
              CATALOG
            </h4>
            <ul className="space-y-3">
              {(["personalities", "dreams", "desires"] as Page[]).map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => onNavigate(p)}
                    className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-cinzel text-[10px] tracking-widest uppercase text-muted-foreground mb-6">
              READING
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("journal")}
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  JOURNAL
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("become")}
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  WHAT YOU&#39;VE BECOME
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-cinzel text-[10px] tracking-widest uppercase text-muted-foreground mb-6">
              A NOTE
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-cormorant italic">
              All transactions are final. We accept no responsibility for who
              you become.
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center">
          <p className="text-[10px] tracking-widest uppercase text-muted-foreground/50">
            &copy; {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// App Shell
function AppShell() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    item: Item;
    index: number;
  } | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const { data: allItems = SAMPLE_ITEMS } = useAllItems();

  const handleSelectItem = useCallback(
    (item: Item) => {
      const idx = allItems.findIndex((i) => i.id === item.id);
      setSelectedItem({ item, index: idx >= 0 ? idx : 0 });
    },
    [allItems],
  );

  const handleAcquire = useCallback((item: Item) => {
    setCart((prev) => [
      ...prev,
      { ...item, cartId: `${item.id}-${Date.now()}` },
    ]);
    setSelectedItem(null);
    toast(
      <div className="font-cinzel text-xs tracking-wider uppercase">
        <span className="block text-foreground">{item.name} — ACQUIRED</span>
        <span className="text-muted-foreground text-[10px] normal-case font-normal font-cormorant italic mt-1 block">
          Cost: {item.existentialPrice}
        </span>
      </div>,
      { duration: 3000 },
    );
  }, []);

  const handleRemoveFromCart = useCallback((cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const handleDiscardSelf = useCallback(() => {
    setCart([]);
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast(
      <div className="font-cinzel text-xs tracking-wider uppercase">
        <span className="block text-foreground">SELF DISCARDED</span>
        <span className="text-muted-foreground text-[10px] normal-case font-normal font-cormorant italic mt-1 block">
          You have returned to the beginning.
        </span>
      </div>,
      { duration: 4000 },
    );
  }, []);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav
        page={page}
        onNavigate={navigate}
        cartCount={cart.length}
        onCartOpen={() => setCartOpen(true)}
      />
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HeroSection onShop={() => navigate("personalities")} />
            <SelectionsSection onSelectItem={handleSelectItem} />
            <JournalPreview
              onSelectEntry={setSelectedEntry}
              onViewAll={() => navigate("journal")}
            />
          </motion.div>
        )}
        {(page === "personalities" ||
          page === "dreams" ||
          page === "desires") && (
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CategoryPage
              category={
                page === "personalities"
                  ? Category.personality
                  : page === "dreams"
                    ? Category.dream
                    : Category.desire
              }
              onSelectItem={handleSelectItem}
            />
          </motion.div>
        )}
        {page === "journal" && (
          <motion.div
            key="journal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <JournalPage onSelectEntry={setSelectedEntry} />
          </motion.div>
        )}
        {page === "become" && (
          <motion.div
            key="become"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <WhatYouveBecomePagePage
              cart={cart}
              onDiscard={handleDiscardSelf}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer onNavigate={navigate} />
      <MusicPlayer />
      <AnimatePresence>
        {selectedItem && (
          <ItemModal
            item={selectedItem.item}
            index={selectedItem.index}
            onClose={() => setSelectedItem(null)}
            onAcquire={handleAcquire}
          />
        )}
        {selectedEntry && (
          <JournalModal
            entry={selectedEntry}
            onClose={() => setSelectedEntry(null)}
          />
        )}
        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onRemove={handleRemoveFromCart}
          />
        )}
      </AnimatePresence>
      <Toaster
        toastOptions={{
          style: {
            background: "oklch(10% 0.003 280)",
            border: "1px solid oklch(18% 0.006 280)",
            color: "oklch(92% 0.005 80)",
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
