import { TicketForm } from '@/components/ticket/TicketForm';

export function Home() {
  return (
    <section className="mx-auto max-w-lg" aria-labelledby="page-heading">
      <h1 id="page-heading" className="mb-6 text-2xl font-bold text-text-base">
        Contact Support
      </h1>
      <TicketForm />
    </section>
  );
}
