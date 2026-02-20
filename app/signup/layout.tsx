export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-blue-50">
      {children}
    </section>
  );
}
