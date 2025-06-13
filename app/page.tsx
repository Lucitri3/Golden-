import Search from '@/components/Search';

export default function HomePage() {
  return (
    <div>
      <Search />
      <div className="mt-8 p-6 bg-surface border border-border rounded-lg text-text-secondary">
        <h2 className="text-xl font-bold text-text-primary mb-4">How This Works</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>This tool uses Solana&apos;s free, public JSON RPC API.</li>
          <li>It can only look up specific addresses or transactions you provide.</li>
          <li>Global search and real-time updates are not supported due to RPC limitations.</li>
        </ul>
      </div>
    </div>
  );
}

