import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/our-approach")({
  beforeLoad: () => {
    throw redirect({ to: "/approach" });
  },
});
