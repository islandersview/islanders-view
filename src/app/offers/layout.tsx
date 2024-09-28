import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <h1>Loading...</h1>
        </div>
      }
    >
      <div>{children}</div>
    </Suspense>
  );
}
