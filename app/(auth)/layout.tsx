import "@/styles/globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {children}
    </section>
  );
}
