'use client';

import { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { API_CATEGORIES } from './api-data';
import { API_DICTIONARY } from './api-dictionary';
import type { Lang } from './dictionary';
import CodeBlock from './CodeBlock';

interface ApiSectionProps {
  lang: Lang;
}

type T = (typeof API_DICTIONARY)['es'];

const ALL_COMMANDS = API_CATEGORIES.flatMap((c) => c.commands);

function findCommand(name: string | null) {
  if (!name) return null;
  return ALL_COMMANDS.find((c) => c.name === name) ?? null;
}

const GettingStarted: FC<{ t: T }> = ({ t }) => (
  <div>
    <div className="border border-[#1C3A2E] bg-[#0A1F16] p-6 mb-6">
      <h3 className="text-sm font-bold mb-3 text-[#E8FFF3]">{t.gettingStartedTitle}</h3>
      <ul className="text-xs text-[#9CB8AC] space-y-2 leading-relaxed">
        <li>
          <span className="text-[#39FF8E]">{t.gsEndpointLabel}:</span>{' '}
          <code className="text-[#A7C4B5]">http://127.0.0.1:8332/</code> — {t.gsEndpointNote}
        </li>
        <li>
          <span className="text-[#39FF8E]">{t.gsAuthLabel}:</span> {t.gsAuthNote}
        </li>
        <li>
          <span className="text-[#39FF8E]">{t.gsCliLabel}:</span>{' '}
          <code className="text-[#A7C4B5]">cryptonite-cli &lt;comando&gt; [args]</code>
        </li>
        <li>
          <span className="text-[#39FF8E]">{t.gsP2pLabel}:</span>{' '}
          <code className="text-[#A7C4B5]">8333</code> — {t.gsP2pNote}
        </li>
      </ul>
    </div>

    <div className="border border-[#1C3A2E] bg-[#0A1F16] p-6 mb-6">
      <h3 className="text-sm font-bold mb-3 text-[#E8FFF3]">{t.gsEnvelopeTitle}</h3>
      <p className="text-xs text-[#9CB8AC] mb-3 leading-relaxed">{t.gsEnvelopeNote}</p>
      <CodeBlock
        text={
          '> curl --user myusername --data-binary \'{"jsonrpc": "1.0", "id":"curltest", "method": "getinfo", "params": [] }\' -H \'content-type: text/plain;\' http://127.0.0.1:8332/'
        }
      />
    </div>

    <div className="border border-[#39FF8E]/30 bg-[#0A1F16] p-6">
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
  </div>
);

const CommandDetail: FC<{ cmd: NonNullable<ReturnType<typeof findCommand>>; t: T }> = ({ cmd, t }) => (
  <div>
    <div className="flex items-center gap-2 flex-wrap mb-2">
      <code className="text-base font-bold text-[#39FF8E]">{cmd.name}</code>
      {cmd.native && (
        <span className="text-[9px] tracking-widest border border-[#39FF8E]/50 text-[#39FF8E] px-1.5 py-0.5">
          {t.labelNativeBadge}
        </span>
      )}
    </div>
    <p className="text-sm text-[#9CB8AC] mb-4 leading-relaxed">{cmd.descriptionEn}</p>
    <p className="text-[10px] tracking-wide text-[#71717A] mb-3">
      {t.labelSource}: <code>{cmd.source}</code>
    </p>
    <CodeBlock text={cmd.signature} />
    {cmd.noteEn && (
      <div className="border border-[#39FF8E]/30 bg-[#39FF8E]/5 p-3 mt-3">
        <p className="text-[10px] tracking-widest text-[#39FF8E] mb-1">{t.labelBugNote}</p>
        <pre className="whitespace-pre-wrap text-xs text-[#9CB8AC]">{cmd.noteEn}</pre>
      </div>
    )}
    <div className="mt-3">
      <CodeBlock text={cmd.detail} />
    </div>
  </div>
);

const ApiSection: FC<ApiSectionProps> = ({ lang }) => {
  const t = API_DICTIONARY[lang];
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [openCats, setOpenCats] = useState<Set<string>>(new Set());

  // al cargar con #cmd-xxx en la URL, seleccionar ese comando y abrir su categoría
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#cmd-')) {
      const name = hash.slice(5);
      const found = ALL_COMMANDS.find((c) => c.name === name);
      if (found) {
        setSelected(name);
        const cat = API_CATEGORIES.find((c) => c.commands.some((cm) => cm.name === name));
        if (cat) setOpenCats(new Set([cat.category]));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

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

  const selectedCmd = findCommand(selected);

  function selectCommand(name: string) {
    setSelected(name);
    window.history.replaceState(null, '', `#cmd-${name}`);
  }

  function toggleCat(category: string) {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  const flatOptions = filteredCategories.flatMap((cat) =>
    cat.commands.map((cmd) => ({ category: cat.category, cmd }))
  );

  return (
    <section id="api" className="px-6 py-16 max-w-6xl mx-auto border-t border-[#1C3A2E]">
      <p className="text-xs tracking-[0.25em] text-[#39FF8E] mb-3 text-center">{t.eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{t.title}</h2>
      <p className="text-xs text-[#9CB8AC] mb-2 text-center max-w-2xl mx-auto leading-relaxed">
        {t.intro}
      </p>
      <p className="text-xs text-[#39FF8E]/80 mb-8 text-center">{t.commandCount}</p>

      <div className="mb-6">
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

      {/* Selector para mobile: combina categoría+comando en un único <select> */}
      <div className="md:hidden mb-6">
        <select
          value={selected ?? ''}
          onChange={(e) => {
            if (e.target.value) selectCommand(e.target.value);
          }}
          className="w-full bg-[#0A1F16] border border-[#1C3A2E] px-4 py-2.5 text-xs text-[#E8FFF3]"
        >
          <option value="">{t.mobileSelectPlaceholder}</option>
          {filteredCategories.map((cat) => (
            <optgroup key={cat.category} label={t.categoryNames[cat.category] ?? cat.category}>
              {cat.commands.map((cmd) => (
                <option key={cmd.name} value={cmd.name}>
                  {cmd.name}
                  {cmd.native ? ` (${t.labelNativeBadge})` : ''}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar — solo desktop */}
        <aside className="hidden md:block">
          <div className="sticky top-4 max-h-[75vh] overflow-y-auto border border-[#1C3A2E] bg-[#0A1F16]">
            {isSearching && totalMatches === 0 && (
              <p className="text-xs text-[#71717A] p-4">{t.searchNoResults}</p>
            )}
            {filteredCategories.map((cat) => {
              const isOpen = isSearching || openCats.has(cat.category);
              return (
                <div key={cat.category} className="border-b border-[#1C3A2E] last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleCat(cat.category)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#06120D]/60 transition-colors duration-200"
                  >
                    <span className="text-xs font-bold">
                      {t.categoryNames[cat.category] ?? cat.category}
                    </span>
                    <span className="text-[10px] text-[#71717A]">{cat.commands.length}</span>
                  </button>
                  {isOpen && (
                    <div className="pb-2">
                      {cat.commands.map((cmd) => (
                        <button
                          key={cmd.name}
                          type="button"
                          onClick={() => selectCommand(cmd.name)}
                          className={`w-full text-left px-4 py-1.5 text-xs flex items-center gap-1.5 transition-colors duration-200 ${
                            selected === cmd.name
                              ? 'text-[#39FF8E] bg-[#39FF8E]/10'
                              : 'text-[#9CB8AC] hover:text-[#E8FFF3]'
                          }`}
                        >
                          <code className="truncate">{cmd.name}</code>
                          {cmd.native && <span className="text-[#39FF8E] shrink-0">●</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Panel de contenido */}
        <div className="min-w-0">
          {selectedCmd ? (
            <CommandDetail cmd={selectedCmd} t={t} />
          ) : isSearching ? (
            totalMatches === 0 ? (
              <p className="text-xs text-[#71717A] text-center py-8 md:hidden">
                {t.searchNoResults}
              </p>
            ) : (
              <div className="md:hidden space-y-1">
                {flatOptions.map(({ cmd }) => (
                  <button
                    key={cmd.name}
                    type="button"
                    onClick={() => selectCommand(cmd.name)}
                    className="w-full text-left border border-[#1C3A2E] bg-[#0A1F16] px-4 py-3"
                  >
                    <code className="text-xs font-bold text-[#39FF8E]">{cmd.name}</code>
                    <p className="text-xs text-[#9CB8AC] mt-1">{cmd.descriptionEn}</p>
                  </button>
                ))}
                <p className="hidden md:block text-xs text-[#71717A] text-center py-8">
                  {t.selectFromSidebar}
                </p>
              </div>
            )
          ) : (
            <GettingStarted t={t} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ApiSection;
