import { useState } from 'react';
import { submitTicket } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import type { TicketFormData } from '@/types';

type FormErrors = Partial<Record<keyof TicketFormData, string>>;

function validate(data: TicketFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.full_name.trim()) errors.full_name = 'Name is required';
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!data.description.trim()) errors.description = 'Issue description is required';
  return errors;
}

const EMPTY_FORM: TicketFormData = { full_name: '', email: '', description: '' };

export function TicketForm() {
  const [form, setForm] = useState<TicketFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(field: keyof TicketFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setServerError(null);
    try {
      await submitTicket(form);
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-status-success-bg">
            <span className="text-3xl text-status-success" aria-hidden="true">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-text-base">Ticket Submitted!</h2>
          <p className="text-text-subtle max-w-sm">
            We've received your request and will get back to you soon.
          </p>
          <Button
            label="Submit Another Ticket"
            variant="secondary"
            onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); }}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-text-base">Submit a Support Ticket</h2>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Input
          label="Full Name"
          id="full_name"
          value={form.full_name}
          onChange={(e) => handleChange('full_name', e.target.value)}
          error={errors.full_name}
          placeholder="Jane Smith"
          required
          autoComplete="name"
          maxLength={100}
        />
        <Input
          label="Email Address"
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          placeholder="jane@example.com"
          required
          autoComplete="email"
          maxLength={254}
        />
        <Textarea
          label="Issue Description"
          id="description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
          placeholder="Describe your issue in as much detail as possible…"
          rows={4}
          required
          maxLength={2000}
        />
        {serverError && (
          <p className="rounded-md bg-status-error-bg px-4 py-3 text-sm text-status-error" role="alert">
            {serverError}
          </p>
        )}
        <Button
          label={submitting ? 'Submitting…' : 'Submit Ticket'}
          type="submit"
          disabled={submitting}
        />
      </form>
    </Card>
  );
}
