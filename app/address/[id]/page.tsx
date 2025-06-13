import AddressDetails from '@/components/AddressDetails';

export default function AddressPage({ params }: any) {
  return (
    <div>
      <AddressDetails id={params.id} />
    </div>
  );
}

