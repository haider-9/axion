import { getOrderById } from '@/app/actions/orders/enhanced-actions';
import PageHeader from '@/components/PageHeader';

export default async function OrderDetail({ params }: { params: { id: string } }) {
  const res = await getOrderById(params.id);
  if (!res.success) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <p className="text-sm text-muted-foreground">Order not found.</p>
      </div>
    );
  }
  const order: any = res.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Order" titleHighlight={`#${params.id.slice(-6)}`} />
      <div className="max-w-4xl mx-auto bg-white rounded-lg border p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Customer</h3>
            <p>{order.user?.name} ({order.user?.email})</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Status</h3>
            <p>{order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending'}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems?.map((it: any, idx: number) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-2">{it.product?.name || it.name}</td>
                    <td className="py-2">{it.qty}</td>
                    <td className="py-2">${it.price}</td>
                    <td className="py-2">${(it.price * it.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold">Total: ${order.totalPrice?.toFixed?.(2) ?? order.totalPrice}</div>
        </div>
      </div>
    </div>
  );
}


