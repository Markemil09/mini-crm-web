import { useEffect, useState } from 'react';
import { fetchTickets, updateTicketStatus, getAdminKey, setAdminKey, clearAdminKey } from '@/lib/api';
import { TicketTable } from '@/components/admin/TicketTable';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import type { Ticket, TicketStatus } from '@/types';

type View = 'login' | 'dashboard';

export function Admin() {
  const [view, setView] = useState<View>(() =>
    getAdminKey() !== null ? 'dashboard' : 'login',
  );

  // --- login state ---
  const [keyInput, setKeyInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  // --- dashboard state ---
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tickets whenever the view switches to dashboard
  useEffect(() => {
    if (view !== 'dashboard') return;
    setLoading(true);
    setError(null);
    fetchTickets()
      .then(setTickets)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load tickets'),
      )
      .finally(() => setLoading(false));
  }, [view]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setSigningIn(true);
    setAdminKey(keyInput);
    try {
      const data = await fetchTickets();
      setTickets(data);
      setView('dashboard');
    } catch (err: unknown) {
      clearAdminKey();
      setLoginError(
        err instanceof Error ? err.message : 'Invalid key. Please try again.',
      );
    } finally {
      setSigningIn(false);
    }
  }

  function handleSignOut() {
    clearAdminKey();
    setKeyInput('');
    setLoginError(null);
    setTickets([]);
    setError(null);
    setView('login');
  }

  async function handleStatusChange(id: string, status: TicketStatus) {
    setError(null);
    try {
      const updated = await updateTicketStatus(id, status);
      setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket status');
    }
  }

  // --- Login form ---
  if (view === 'login') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-sm">
          <Card>
            <h1 className="mb-6 text-xl font-semibold text-text-base">Admin Access</h1>
            <form onSubmit={handleSignIn} noValidate className="flex flex-col gap-5">
              <Input
                label="Admin Key"
                id="admin-key"
                type="password"
                value={keyInput}
                onChange={(e) => {
                  setKeyInput(e.target.value);
                  if (loginError) setLoginError(null);
                }}
                placeholder="Enter your admin key"
                required
                autoComplete="current-password"
              />
              {loginError && (
                <p
                  className="rounded-md bg-status-error-bg px-4 py-3 text-sm text-status-error"
                  role="alert"
                >
                  {loginError}
                </p>
              )}
              <Button
                label={signingIn ? 'Signing in…' : 'Sign In'}
                type="submit"
                disabled={signingIn || keyInput.trim() === ''}
              />
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // --- Dashboard ---
  if (loading) {
    return <p className="text-text-subtle">Loading tickets…</p>;
  }

  if (error && tickets.length === 0) {
    return (
      <p
        className="rounded-md bg-status-error-bg px-4 py-3 text-sm text-status-error"
        role="alert"
      >
        {error}
      </p>
    );
  }

  return (
    <section aria-labelledby="admin-heading">
      <div className="mb-6 flex items-center justify-between">
        <h1 id="admin-heading" className="text-2xl font-bold text-text-base">
          Support Tickets
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-subtle">{tickets.length} total</span>
          <Button label="Sign out" variant="ghost" size="sm" onClick={handleSignOut} />
        </div>
      </div>
      {error && (
        <p
          className="mb-4 rounded-md bg-status-error-bg px-4 py-3 text-sm text-status-error"
          role="alert"
        >
          {error}
        </p>
      )}
      <TicketTable tickets={tickets} onStatusChange={handleStatusChange} />
    </section>
  );
}
