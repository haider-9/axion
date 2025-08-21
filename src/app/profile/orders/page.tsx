'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { Star, Search } from 'lucide-react';

// Mock order data
const orderData = [
  {
    id: 'B1X5L96',
    name: 'Concorde Ceiling Lamp',
    status: 'Delivered',
    date: 'July 23, 2025',
    price: 'Rs. 59,000',
    rating: 5,
    image: '/collection-1.jpg',
  },
  {
    id: 'AU13Q41',
    name: 'Golden Glow Lamp',
    status: 'In Progress',
    date: 'July 19, 2025',
    price: 'Rs. 27,000',
    rating: 5,
    image: '/collection-2.jpg',
  },
  {
    id: '2BLQ370',
    name: 'Ceiling Strip Chandelier',
    status: 'Cancelled',
    date: 'May 11, 2025',
    price: 'Rs. 49,500',
    rating: 5,
    image: '/product-1.jpg',
  },
  {
    id: '5TP4L38',
    name: 'Outdoor Lamp',
    status: 'Delivered',
    date: 'April 05, 2025',
    price: 'Rs. 3,250',
    rating: 5,
    image: '/product-2.jpg',
  },
];

export default function OrderHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 10;

  // Filter orders based on status, date, and search
  const filteredOrders = orderData.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Paginate filtered orders
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Order"
        titleHighlight="History"
        subtitle="Track all your purchases in their current status"
      />

      <div className="max-w-[85rem] mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by Order ID/Product Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {paginatedOrders.map((order) => (
            <Card key={order.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={order.image}
                      alt={order.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order ID:{order.id}
                      </h3>
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600">{order.name}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                    
                    <div className="flex items-center gap-2">
                      {renderStars(order.rating)}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-2xl font-bold text-blue-600">{order.price}</span>
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {filteredOrders.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredOrders.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
