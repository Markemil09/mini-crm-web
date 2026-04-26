export type TicketStatus = 'open' | 'resolved';

export type Contact = {
  full_name: string;
  email: string;
};

export type Ticket = {
  id: string;
  contact_id: string;
  description: string;
  status: TicketStatus;
  webhook_notified: boolean;
  created_at: string;
  contacts: Contact;
};

export type TicketFormData = {
  full_name: string;
  email: string;
  description: string;
};
