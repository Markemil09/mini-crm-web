import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Ticket } from '@/types';

type TicketRowProps = {
  ticket: Ticket;
  onStatusChange: (id: string, status: 'open' | 'resolved') => Promise<void>;
};

export function TicketRow({ ticket, onStatusChange }: TicketRowProps) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      await onStatusChange(ticket.id, ticket.status === 'open' ? 'resolved' : 'open');
    } finally {
      setLoading(false);
    }
  }

  return (
    <tr className="hover:bg-surface-subtle transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-text-base whitespace-nowrap">
        {ticket.contacts.full_name}
      </td>
      <td className="px-4 py-3 text-sm text-text-subtle whitespace-nowrap">
        {ticket.contacts.email}
      </td>
      <td className="px-4 py-3 text-sm text-text-subtle max-w-xs">
        <span className="line-clamp-2">{ticket.description}</span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Badge
          label={ticket.status === 'open' ? 'Open' : 'Resolved'}
          variant={ticket.status === 'open' ? 'warning' : 'success'}
        />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Badge
          label={ticket.webhook_notified ? 'Sent' : 'Pending'}
          variant={ticket.webhook_notified ? 'success' : 'error'}
        />
      </td>
      <td className="px-4 py-3 text-sm text-text-subtle whitespace-nowrap">
        {new Date(ticket.created_at).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Button
          label={loading ? '…' : ticket.status === 'open' ? 'Resolve' : 'Reopen'}
          variant={ticket.status === 'open' ? 'primary' : 'secondary'}
          size="sm"
          onClick={handleToggle}
          disabled={loading}
        />
      </td>
    </tr>
  );
}
