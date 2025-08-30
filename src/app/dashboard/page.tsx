'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { getOrderAnalytics } from '@/app/actions/orders/enhanced-actions';

export default function DashboardRoute() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      try { setUserData(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userData?.isAdmin) redirect('/');

  // server-side analytics via RSC fetch is not possible here (client route), so show placeholder chart

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Admin" titleHighlight="Dashboard" subtitle="Manage your e-commerce platform" />
      <div className="max-w-[85rem] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <div className="lg:sticky lg:top-8 h-max">
          <div className="rounded-2xl bg-white border p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Image src="/about-image.jpg" width={48} height={48} alt="Avatar" className="rounded-full object-cover" />
              <div>
                <div className="font-medium">{userData?.name}</div>
                <div className="text-xs text-muted-foreground">{userData?.email}</div>
              </div>
            </div>
            <nav className="space-y-1 text-sm">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Orders', href: '/admin' },
                { label: 'Products', href: '/admin' },
                { label: 'Discounts', href: '/admin' },
                { label: 'Blogs', href: '/blog' },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="block px-3 py-2 rounded-lg hover:bg-muted aria-[current=true]:bg-black/5" aria-current={item.href === '/dashboard'}>
                  {item.label}
                </Link>
              ))}
              <button className="w-full px-3 py-2 text-left rounded-lg hover:bg-muted">Logout</button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-emerald-600">+16% Last Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-red-600">-09% Last Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-emerald-600">+12% Last Month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders Per Day</CardTitle>
            <CardDescription>Orders volume trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md border flex items-end gap-1 p-3">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="flex-1 bg-[#2CA6A4]/20" style={{ height: `${10 + (i * 3) % 90}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Last 5 Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1,2,3,4,5].map((i)=> (
                    <TableRow key={i}>
                      <TableCell>#{27640 + i}</TableCell>
                      <TableCell>Customer {i}</TableCell>
                      <TableCell className="text-emerald-600">Rs.{(59999 - i*2000).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Modern Table Lamp', value: 24 },
                { name: 'Sleek Floor Lamp', value: 18 },
                { name: 'Solar Garden Lights', value: 14 },
              ].map((p) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>{p.name}</span>
                    <span className="text-muted-foreground">{p.value}%</span>
                  </div>
                  <Progress value={p.value} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: 'Outdoor Garden Lamp', stock: 4, status: 'Low', color: 'bg-red-500' },
                  { name: 'Concorde Ceiling Lamp', stock: 5, status: 'Low', color: 'bg-red-500' },
                  { name: 'Strip Chandelier', stock: 7, status: 'Medium', color: 'bg-orange-500' },
                ].map((p, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-muted" />
                      {p.name}
                    </TableCell>
                    <TableCell>{p.stock} pcs</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs text-white rounded ${p.color}`}>{p.status}</span>
                    </TableCell>
                    <TableCell>
                      <button className="px-3 py-1 text-sm rounded bg-muted hover:bg-black/5">Restock</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        </div>
      </div>
    </div>
  );
}


