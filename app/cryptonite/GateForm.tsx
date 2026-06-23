'use client';

import type { FC } from 'react';
import { useActionState } from 'react';
import { checkPassword, type GateState } from './actions';

const initialState: GateState = {};

const GateForm: FC = () => {
  const [state, formAction, isPending] = useActionState(checkPassword, initialState);

  return (
    <main
      style={{ background: '#06120D', color: '#E8FFF3' }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <form
        action={formAction}
        className="w-full max-w-sm border border-[#1C3A2E] bg-[#0A1F16] p-8"
      >
        <img
          src="/cryptonite/coin-logo.png"
          alt="Cryptonite"
          width={56}
          height={56}
          className="w-14 h-14 mb-4"
        />
        <p className="text-xs tracking-[0.2em] text-[#39FF8E] mb-2">
          ACCESO RESTRINGIDO
        </p>
        <h1 className="text-2xl font-bold mb-6">Cryptonite</h1>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          className="w-full bg-transparent border border-[#1C3A2E] px-3 py-2 mb-3 text-sm outline-none focus:border-[#39FF8E]"
        />
        {state.error && (
          <p className="text-sm text-red-400 mb-3">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full border border-[#39FF8E] py-2 text-sm tracking-wide hover:bg-[#39FF8E] hover:text-[#06120D] transition-colors duration-200 disabled:opacity-50"
        >
          {isPending ? 'Verificando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
};

export default GateForm;
