'use client';

import { useState, useEffect } from 'react';
import { Wallet, Landmark, History } from 'lucide-react';

// Define a clear type for our data structure
type AddressData = {
  address: string;
  balance: number;
  signatures: string[];
};

function InfoCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function AddressDetails({ id }: { id: string }) {
  // Use our new AddressData type here instead of 'any'
  const [data, setData] = useState<AddressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/lookup/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(result => setData(result))
      .catch(err => setError((err as Error).message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="text-center text-lg text-text-secondary">Loading wallet data...</div>;
  }

  if (error || !data) {
    return <div className="text-red-500 text-center p-8 bg-surface rounded-lg">Error: Could not load wallet details.</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <InfoCard title="Wallet Address" icon={<Wallet className="text-primary" />}>
        <p className="text-lg md:text-xl font-mono break-all text-text-secondary">{data.address}</p>
      </InfoCard>

      <InfoCard title="SOL Balance" icon={<Landmark className="text-secondary" />}>
         <p className="text-3xl font-bold text-text-primary">{data.balance.toFixed(6)} <span className="text-xl text-secondary">SOL</span></p>
      </InfoCard>

      <InfoCard title="Recent History" icon={<History className="text-primary" />}>
        <ul className="space-y-2 font-mono text-sm">
          {/* Add the ': string' type to 'sig' to satisfy the linter */}
          {data.signatures.map((sig: string) => (
            <li key={sig} className="p-3 bg-background rounded-md truncate hover:bg-border transition-colors">
              <a href={`/tx/${sig}`} className="text-text-secondary hover:text-primary">{sig}</a>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}

