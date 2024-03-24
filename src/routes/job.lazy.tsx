import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/job')({
  component: Jobs,
});

function Jobs() {
  return <div>Jobs</div>;
}
