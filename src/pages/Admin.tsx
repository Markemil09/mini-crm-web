import { useEffect, useState } from 'react';
import { fetchTickets, updateTicketStatus } from '@/lib/api';
import { TicketTable } from '@/components/admin/TicketTable';
import type { Ticket, TicketStatus } from '@/types';

export function Admin() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets()
      .then(setTickets)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load tickets'),
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(id: string, status: TicketStatus) {
    const updated = await updateTicketStatus(id, status);
    setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  if (loading) {
    return <p className="text-text-subtle">Loading tickets…</p>;
  }

  if (error) {
    return (
      <p className="rounded-md bg-status-error-bg px-4 py-3 text-sm text-status-error" role="alert">
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
        <span className="text-sm text-text-subtle">{tickets.length} total</span>
      </div>
      <TicketTable tickets={tickets} onStatusChange={handleStatusChange} />
    </section>
  );
}
