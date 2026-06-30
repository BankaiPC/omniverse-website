'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import type { FC } from 'react';
import { API_CATEGORIES } from './api-data';
import { API_DICTIONARY } from './api-dictionary';
import type { Lang } from './dictionary';
import CodeBlock from './CodeBlock';

interface ApiSectionProps {
  lang: Lang;
}

const CommandRow: FC<{
  name: string;
  native: boolean;
  source: string;
  signature: string;
  description: string;
  noteEn?: string;
  detail: string;
  t: (typeof API_DICTIONARY)['es'];
  forceOpen: boolean;
}> = ({ name, native, source, signature, description, noteEn, detail, t, forceOpen }) => {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
      rowRef.current?.scrollIntoView({ block: 'center' });
    }
  }, [forceOpen]);

  return (
    <div id={`cmd-${name}`} ref={rowRef} className="border-b border-[#1C3A2E] last:border-b-0 scroll-mt-24">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left py-3 px-4 flex items-start justify-between gap-3 hover:bg-[#0A1F16]/60 transition-colors duration-200"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <code className="text-xs font-bold text-[#39FF8E]">{name}</code>
            {native && (
              <span className="text-[9px] tracking-widest border border-[#39FF8E]/50 text-[#39FF8E] px-1.5 py-0.5">
                {t.labelNativeBadge}
              </span>
            )}
            <a
              href={`#cmd-${name}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[#71717A] hover:text-[#39FF8E] text-[10px]"
              title={t.labelCopyLink}
            >
              #
            </a>
          </div>
          <p className="text-xs text-[#9CB8AC] mt-1 leading-relaxed">{description}</p>
        </div>
        <span className="text-[#39FF8E] text-xs shrink-0 mt-1">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 text-xs">
          <p className="text-[10px] tracking-wide text-[#71717A] mb-2">
            {t.labelSource}: <code>{source}</code>
          </p>
          <CodeBlock text={signature} />
          {noteEn && (
            <div className="border border-[#39FF8E]/30 bg-[#39FF8E]/5 p-3 mt-2">
              <p className="text-[10px] tracking-widest text-[#39FF8E] mb-1">{t.labelBugNote}</p>
              <pre className="whitespace-pre-wrap text-[#9CB8AC]">{noteEn}</pre>
            </div>
          )}
          <div className="mt-2">
            <CodeBlock text={detail} />
          </div>
        </div>
      )}
    </div>
  );
};

const CategoryAccordion: FC<{
  label: string;
  commands: (typeof API_CATEGORIES)[number]['commands'];
  t: (typeof API_DICTIONARY)['es'];
  forceOpen: boolean;
  highlightCmd: string | null;
}> = ({ label, commands, t, forceOpen, highlightCmd }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  return (
    <div className="border border-[#1C3A2E] bg-[#0A1F16]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-bold">{label}</span>
        <span className="text-xs text-[#9CB8AC]">
          {commands.length} {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="border-t border-[#1C3A2E]">
          {commands.map((cmd) => (
            <CommandRow
              key={cmd.name}
              name={cmd.name}
              native={cmd.native}
              source={cmd.source}
              signature={cmd.signature}
              description={cmd.descriptionEn}
              noteEn={cmd.noteEn}
              detail={cmd.detail}
              t={t}
              forceOpen={highlightCmd === cmd.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ApiSection: FC<ApiSectionProps> = ({ lang }) => {
  const t = API_DICTIONARY[lang];
  const [query, setQuery] = useState('');
  const [hashCmd, setHashCmd] = useState<string | null>(null);

  // al cargar con un #cmd-xxx en la URL, expandir esa categoría/comando
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#cmd-')) {
      setHashCmd(hash.slice(5));
    }
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return API_CATEGORIES;
    return API_CATEGORIES.map((cat) => ({
      ...cat,
      commands: cat.commands.filter(
        (cmd) =>
          cmd.name.toLowerCase().includes(normalizedQuery) ||
          cmd.descriptionEn.toLowerCase().includes(normalizedQuery)
      ),
    })).filter((cat) => cat.commands.length > 0);
  }, [normalizedQuery]);

  const totalMatches = filteredCategories.reduce((sum, c) => sum + c.commands.length, 0);
  const isSearching = normalizedQuery.length > 0;

  return (
    <section id="api" className="px-6 py-16 max-w-5xl mx-auto border-t border-[#1C3A2E]">
      <p className="text-xs tracking-[0.25em] text-[#39FF8E] mb-3 text-center">{t.eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{t.title}</h2>
      <p className="text-xs text-[#9CB8AC] mb-2 text-center max-w-2xl mx-auto leading-relaxed">
        {t.intro}
      </p>
      <p className="text-xs text-[#39FF8E]/80 mb-10 text-center">{t.commandCount}</p>

      <div className="border border-[#39FF8E]/30 bg-[#0A1F16] p-6 mb-10">
        <h3 className="text-sm font-bold mb-1 text-[#39FF8E]">{t.nativeTitle}</h3>
        <p className="text-xs text-[#9CB8AC] mb-5 leading-relaxed">{t.nativeIntro}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {t.natives.map((n) => (
            <div key={n.command} className="border border-[#1C3A2E] p-4">
              <code className="text-xs font-bold text-[#39FF8E]">{n.command}</code>
              <p className="text-[10px] tracking-widest text-[#71717A] mt-1 mb-2">{n.feature}</p>
              <p className="text-xs text-[#9CB8AC] leading-relaxed">{n.what}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 sticky top-2 z-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full bg-[#0A1F16] border border-[#1C3A2E] focus:border-[#39FF8E] outline-none px-4 py-2.5 text-xs text-[#E8FFF3] placeholder:text-[#71717A]"
        />
        {isSearching && (
          <p className="text-[10px] text-[#71717A] mt-1.5 px-1">
            {totalMatches} {t.searchResultsLabel}
          </p>
        )}
      </div>

      {isSearching && totalMatches === 0 ? (
        <p className="text-xs text-[#71717A] text-center py-8">{t.searchNoResults}</p>
      ) : (
        <div className="space-y-3">
          {filteredCategories.map((cat) => (
            <CategoryAccordion
              key={cat.category}
              label={t.categoryNames[cat.category] ?? cat.category}
              commands={cat.commands}
              t={t}
              forceOpen={isSearching || (hashCmd !== null && cat.commands.some((c) => c.name === hashCmd))}
              highlightCmd={hashCmd}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ApiSection;
