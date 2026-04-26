import type { Ticket, TicketFormData, TicketStatus } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function submitTicket(data: TicketFormData): Promise<Ticket> {
  const res = await fetch(`${API_BASE}/api/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? 'Failed to submit ticket');
  }
  return res.json();
}

export async function fetchTickets(): Promise<Ticket[]> {
  const res = await fetch(`${API_BASE}/api/tickets`);
  if (!res.ok) throw new Error('Failed to fetch tickets');
  return res.json();
}

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket> {
  const res = await fetch(`${API_BASE}/api/tickets/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update ticket status');
  return res.json();
}
