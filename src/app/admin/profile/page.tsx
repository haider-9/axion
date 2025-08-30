'use client';

import { useEffect, useMemo, useState } from 'react';
import { redirect } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useActions } from '@/hooks/useActions';
import Link from 'next/link';

export default function AdminProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const { product, order } = useActions();
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        setUserData(parsed);
      } catch (e) {
        redirect('/login');
      }
    } else {
      redirect('/login');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const load = async () => {
      const p = await product.getAll();
      if ((p as any)?.success !== false && (p as any)?.data) {
        // handleAction returns underlying result; normalize
        // If returned directly, try common shapes
        const arr = (p as any).data?.products || (p as any).data || p;
        if (Array.isArray(arr)) setProducts(arr);
      }
      const o = await order.getAll({ limit: 20 });
      if ((o as any)?.success !== false && (o as any)?.data) {
        const arr = (o as any).data?.orders || (o as any).data || o;
        if (Array.isArray(arr)) setOrders(arr);
      }
    };
    if (userData?.isAdmin) load();
  }, [userData, product, order]);

  if (isLoading) return <div>Loading...</div>;
  if (!userData?.isAdmin) redirect('/');

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Admin" titleHighlight="Profile" />

      <div className="max-w-[85rem] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar attached to profile container */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Admin</CardTitle>
              <CardDescription>{userData?.name} • {userData?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant={activeTab === 'profile' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('profile')}>Profile</Button>
                <Button variant={activeTab === 'orders' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('orders')}>Orders</Button>
                <Button variant={activeTab === 'products' ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('products')}>Products</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">Personal Details</span>
                    </div>
                    <Button variant="outline" size="sm">Edit Details</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <div className="w-48 h-48 rounded-md overflow-hidden border bg-gray-50">
                          <Image src={(userData?.avatar as string) || '/about-image.jpg'} alt="Avatar" width={192} height={192} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-sm">
                        <DetailRow label="First Name" value={(userData?.name as string)?.split(' ')[0] || '—'} />
                        <DetailRow label="Last Name" value={(userData?.name as string)?.split(' ').slice(1).join(' ') || '—'} />
                        <DetailRow label="Email Address" value={userData?.email as string} />
                        <DetailRow label="Phone Number" value={userData?.phone as string || '—'} />
                        <DetailRow label="Role" value={userData?.isAdmin ? 'Admin' : 'User'} />
                        <DetailRow label="Status" value={userData?.status as string || 'Active'} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Address Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                      <DetailRow label="City" value={(userData?.city as string) || '—'} />
                      <DetailRow label="State" value={(userData?.state as string) || '—'} />
                      <DetailRow label="Code" value={(userData?.zip as string) || '—'} />
                      <DetailRow label="Phone Code" value={(userData?.phoneCode as string) || '—'} />
                      <DetailRow className="sm:col-span-2" label="Current Address" value={(userData?.address as string) || '—'} />
                      <DetailRow className="sm:col-span-2" label="Permanent Address" value={(userData?.permanentAddress as string) || '—'} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>All Orders</CardTitle>
                  <CardDescription>Recent orders from customers</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Let’s add first - orders</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="text-left">
                          <tr className="border-b">
                            <th className="py-2">Order</th>
                            <th className="py-2">Customer</th>
                            <th className="py-2">Total</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((o: any) => (
                            <tr key={o._id} className="border-b last:border-0">
                              <td className="py-2">#{o._id?.slice(-6)}</td>
                              <td className="py-2">{o.user?.name || '—'}</td>
                              <td className="py-2">${o.totalPrice ?? 0}</td>
                              <td className="py-2">{o.isDelivered ? 'Delivered' : o.isPaid ? 'Paid' : 'Pending'}</td>
                              <td className="py-2">
                                <Link className="underline" href={`/order/${o._id}`}>View</Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>All Products</CardTitle>
                  <CardDescription>Manage product catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Let’s add first - products</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="text-left">
                          <tr className="border-b">
                            <th className="py-2">Name</th>
                            <th className="py-2">Category</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((p: any) => (
                            <tr key={p._id} className="border-b last:border-0">
                              <td className="py-2">{p.name}</td>
                              <td className="py-2">{p.category?.name || '—'}</td>
                              <td className="py-2">${p.price}</td>
                              <td className="py-2">{p.stock ?? 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, className }: { label: string; value?: string; className?: string }) {
  return (
    <div className={className}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium mt-1">{value || '—'}</div>
    </div>
  );
}


