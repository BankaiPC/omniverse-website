import type { FC } from 'react';

const ComingSoon: FC = () => {
  return (
    <main
      style={{ background: '#06120D', color: '#E8FFF3' }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.2em] text-[#39FF8E] mb-2">
          PREVIEW PRIVADA
        </p>
        <h1 className="text-3xl font-bold">Cryptonite — próximamente aquí</h1>
      </div>
    </main>
  );
};

export default ComingSoon;
