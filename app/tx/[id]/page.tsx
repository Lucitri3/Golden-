import TransactionDetails from '@/components/TransactionDetails';

export default function TransactionPage({ params }: any) {
  return (
    <div>
      <TransactionDetails id={params.id} />
    </div>
  );
}

