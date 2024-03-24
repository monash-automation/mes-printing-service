import PrinterDashboard from '@/components/printer-dashboard.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <PrinterDashboard />
    </div>
  );
}
