import { TicketRow } from './TicketRow';
import type { Ticket } from '@/types';

const COLUMNS = ['Customer', 'Email', 'Description', 'Status', 'Notified', 'Created', 'Action'];

type TicketTableProps = {
  tickets: Ticket[];
  onStatusChange: (id: string, status: 'open' | 'resolved') => Promise<void>;
};

export function TicketTable({ tickets, onStatusChange }: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border border-border-base bg-surface-subtle py-16 text-center">
        <p className="text-text-subtle">No tickets yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border-base">
      <table className="min-w-full divide-y divide-border-base">
        <thead className="bg-surface-subtle">
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-subtle"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-base bg-surface-base">
          {tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} onStatusChange={onStatusChange} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
