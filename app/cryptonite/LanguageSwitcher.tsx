import type { FC } from 'react';
import { setCryptoniteLanguage } from './lang-actions';
import { LANGUAGES, type Lang } from './dictionary';

interface LanguageSwitcherProps {
  current: Lang;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ current }) => {
  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((l) => (
        <form key={l.code} action={setCryptoniteLanguage.bind(null, l.code)}>
          <button
            type="submit"
            aria-current={l.code === current}
            className={`text-xs px-2 py-1 border transition-colors duration-200 ${
              l.code === current
                ? 'border-[#39FF8E] text-[#39FF8E]'
                : 'border-[#1C3A2E] text-[#9CB8AC] hover:border-[#39FF8E]/60'
            }`}
          >
            {l.label}
          </button>
        </form>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
