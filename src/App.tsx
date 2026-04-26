import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Home } from '@/pages/Home';
import { Admin } from '@/pages/Admin';
import { cn } from '@/lib/utils';

function NavLink({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={cn(
        'text-sm font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:shadow-focus rounded',
        active ? 'text-accent-base' : 'text-text-subtle hover:text-text-base',
      )}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}

function Layout() {
  return (
    <>
      <header className="border-b border-border-base bg-surface-subtle">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            <span className="font-semibold text-text-base mr-2">Mini CRM</span>
            <NavLink to="/" label="Submit Ticket" />
            <NavLink to="/admin" label="Admin Dashboard" />
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
