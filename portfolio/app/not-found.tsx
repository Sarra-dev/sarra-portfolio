import Link from "next/link";
export default function NotFound() {
  return <div className="wrap py-32 text-center"><h1 className="font-display text-4xl font-semibold">Page not found</h1>
    <p className="mt-3 text-slate-400">This page doesn't exist or has moved.</p><Link href="/" className="btn-primary mt-6">Back to home</Link></div>;
}
