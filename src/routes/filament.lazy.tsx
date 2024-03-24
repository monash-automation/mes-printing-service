import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/filament')({
  component: Filaments,
});

function Filaments() {
  return <div>Filaments</div>;
}
