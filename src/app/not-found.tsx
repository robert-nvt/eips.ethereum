import Link from "next/link";
import { EthLogo } from "@/components/eth-logo";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-6 h-20 w-20 animate-float opacity-80">
          <EthLogo />
        </div>
        <h1 className="text-5xl font-bold text-white">404</h1>
        <p className="mt-3 text-muted">This proposal could not be found.</p>
        <Link
          href="/en"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-colors hover:bg-primary/90"
        >
          Back to Explorer
        </Link>
      </div>
    </div>
  );
}
