
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'A modern admin dashboard built with Next.js and Tailwind CSS.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<>
        {children}
    </>
  );
}