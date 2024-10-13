export default function SectionWrapper({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`max-w-[1920px] ${className}`}>
      {children}
    </section>
  );
}
