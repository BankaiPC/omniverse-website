'use client';

import type { FC } from 'react';
import { useActionState } from 'react';
import { checkPassword, type GateState } from './actions';

const initialState: GateState = {};

const GateForm: FC = () => {
  const [state, formAction, isPending] = useActionState(checkPassword, initialState);

  return (
    <main
      style={{ background: '#0A0A0B', color: '#E5E5E5' }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <form
        action={formAction}
        className="w-full max-w-sm border p-8"
        style={{ borderColor: '#27272A', background: '#111113', borderRadius: '4px' }}
      >
        <p className="text-xs tracking-[0.25em] uppercase font-quantum mb-2" style={{ color: '#6D28D9' }}>
          ACCESO CONFIDENCIAL
        </p>
        <h1 className="text-2xl font-quantum mb-6" style={{ color: '#E5E5E5' }}>
          Omniverse Games
        </h1>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          className="w-full bg-transparent border px-3 py-2 mb-3 text-sm outline-none"
          style={{ borderColor: '#27272A', borderRadius: '4px', color: '#E5E5E5' }}
        />
        {state.error && (
          <p className="text-sm mb-3" style={{ color: '#F87171' }}>
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full border py-2 text-sm tracking-wide transition-colors duration-200 disabled:opacity-50"
          style={{ borderColor: '#6D28D9', color: '#E5E5E5', borderRadius: '4px' }}
        >
          {isPending ? 'Verificando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
};

export default GateForm;
