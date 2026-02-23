export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-white">
      {children}
    </section>
  );
}
