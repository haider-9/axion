# Axion Backend Usage Guide

This guide explains how to use all the server actions and backend functionality in the Axion e-commerce application.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Environment variables configured

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/axion
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/axion

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📚 Available Server Actions

### 1. User Management

#### Basic User Actions (`/src/app/actions/users/actions.ts`)

##### Create User
```typescript
import { createUser } from '@/app/actions';

// In a form action or component
const result = await createUser(formData);
if (result.success) {
  console.log('User created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

**Form Fields Required:**
- `name`: string
- `email`: string  
- `password`: string
- `isAdmin`: checkbox (optional)

##### Authenticate User
```typescript
import { authenticateUser } from '@/app/actions';

const result = await authenticateUser(email, password);
if (result.success) {
  console.log('User authenticated:', result.data);
} else {
  console.error('Error:', result.error);
}
```

#### User Profile Actions (`/src/app/actions/users/profile-actions.ts`)

##### Update User Profile
```typescript
import { updateUserProfile } from '@/app/actions';

const result = await updateUserProfile(userId, formData);
if (result.success) {
  console.log('Profile updated:', result.data);
} else {
  console.error('Error:', result.error);
}
```

**Form Fields Required:**
- `name`: string
- `street`: string
- `city`: string
- `postalCode`: string
- `country`: string

##### Change Password
```typescript
import { changePassword } from '@/app/actions';

const result = await changePassword(userId, currentPassword, newPassword);
if (result.success) {
  console.log('Password changed successfully');
} else {
  console.error('Error:', result.error);
}
```

##### Wishlist Management
```typescript
import { addToWishlist, removeFromWishlist, getWishlist } from '@/app/actions';

// Add to wishlist
await addToWishlist(userId, productId);

// Remove from wishlist
await removeFromWishlist(userId, productId);

// Get wishlist
const wishlist = await getWishlist(userId);
```

### 2. Product Management

#### Basic Product Actions (`/src/app/actions/products/action.ts`)

##### Create Product
```typescript
import { createProduct } from '@/app/actions';

const result = await createProduct(formData);
if (result.success) {
  console.log('Product created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

**Form Fields Required:**
- `name`: string
- `slug`: string (unique identifier)
- `price`: number
- `description`: string
- `images`: comma-separated string
- `category`: ObjectId (Category reference)
- `stock`: number
- `featured`: checkbox

##### Get All Products
```typescript
import { getProducts } from '@/app/actions';

const result = await getProducts();
if (result.success) {
  console.log('Products:', result.data);
} else {
  console.error('Error:', result.error);
}
```

##### Update Product
```typescript
import { updateProduct } from '@/app/actions';

const result = await updateProduct(productId, formData);
if (result.success) {
  console.log('Product updated:', result.data);
} else {
  console.error('Error:', result.error);
}
```

##### Delete Product
```typescript
import { deleteProduct } from '@/app/actions';

const result = await deleteProduct(productId);
if (result.success) {
  console.log('Product deleted successfully');
} else {
  console.error('Error:', result.error);
}
```

#### Enhanced Product Actions (`/src/app/actions/products/enhanced-actions.ts`)

##### Search and Filter Products
```typescript
import { searchProducts, ProductFilters } from '@/app/actions';

const filters: ProductFilters = {
  category: 'electronics',
  minPrice: 10,
  maxPrice: 100,
  featured: true,
  inStock: true,
  search: 'phone',
  sortBy: 'price',
  sortOrder: 'asc',
  page: 1,
  limit: 12
};

const result = await searchProducts(filters);
if (result.success) {
  console.log('Products:', result.data.products);
  console.log('Pagination:', result.data.pagination);
}
```

##### Get Featured Products
```typescript
import { getFeaturedProducts } from '@/app/actions';

const result = await getFeaturedProducts(8); // Limit to 8 products
if (result.success) {
  console.log('Featured products:', result.data);
}
```

##### Get Products by Category
```typescript
import { getProductsByCategory } from '@/app/actions';

const result = await getProductsByCategory('electronics', 12);
if (result.success) {
  console.log('Category products:', result.data);
}
```

##### Get Product by Slug
```typescript
import { getProductBySlug } from '@/app/actions';

const result = await getProductBySlug('iphone-15');
if (result.success) {
  console.log('Product:', result.data);
}
```

##### Update Product Stock
```typescript
import { updateProductStock } from '@/app/actions';

// Add stock
await updateProductStock(productId, 10, 'add');

// Subtract stock
await updateProductStock(productId, 5, 'subtract');
```

##### Get Product Recommendations
```typescript
import { getProductRecommendations } from '@/app/actions';

const result = await getProductRecommendations(productId, 4);
if (result.success) {
  console.log('Recommendations:', result.data);
}
```

### 3. Order Management

#### Basic Order Actions (`/src/app/actions/orders/actions.ts`)

##### Create Order
```typescript
import { createOrder } from '@/app/actions';

const orderData = {
  user: userId,
  orderItems: [
    {
      name: 'Product Name',
      qty: 2,
      image: 'product-image.jpg',
      price: 29.99,
      product: productId
    }
  ],
  shippingAddress: {
    fullName: 'John Doe',
    address: '123 Main St',
    city: 'New York',
    postalCode: '10001',
    country: 'USA'
  },
  paymentMethod: 'credit_card',
  itemsPrice: 59.98,
  shippingPrice: 5.99,
  taxPrice: 5.40,
  totalPrice: 71.37
};

const result = await createOrder(orderData);
if (result.success) {
  console.log('Order created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

##### Get User Orders
```typescript
import { getUserOrders } from '@/app/actions';

const result = await getUserOrders(userId);
if (result.success) {
  console.log('User orders:', result.data);
} else {
  console.error('Error:', result.error);
}
```

##### Update Order Status
```typescript
import { updateOrderStatus } from '@/app/actions';

// Mark as paid
const result = await updateOrderStatus(orderId, 'paid');

// Mark as delivered
const result = await updateOrderStatus(orderId, 'delivered');
```

#### Enhanced Order Actions (`/src/app/actions/orders/enhanced-actions.ts`)

##### Get All Orders with Filtering
```typescript
import { getAllOrders, OrderFilters } from '@/app/actions';

const filters: OrderFilters = {
  status: 'pending',
  dateFrom: new Date('2024-01-01'),
  dateTo: new Date('2024-12-31'),
  page: 1,
  limit: 20
};

const result = await getAllOrders(filters);
if (result.success) {
  console.log('Orders:', result.data.orders);
  console.log('Pagination:', result.data.pagination);
}
```

##### Cancel Order
```typescript
import { cancelOrder } from '@/app/actions';

const result = await cancelOrder(orderId, 'Customer requested cancellation');
if (result.success) {
  console.log('Order cancelled successfully');
}
```

##### Process Refund
```typescript
import { processRefund } from '@/app/actions';

const result = await processRefund(orderId, 50.00, 'Product damaged');
if (result.success) {
  console.log('Refund processed successfully');
}
```

##### Get Order Analytics
```typescript
import { getOrderAnalytics } from '@/app/actions';

const result = await getOrderAnalytics(
  new Date('2024-01-01'),
  new Date('2024-12-31')
);
if (result.success) {
  console.log('Daily analytics:', result.data.dailyAnalytics);
  console.log('Summary:', result.data.summary);
}
```

##### Update Shipping Tracking
```typescript
import { updateShippingTracking } from '@/app/actions';

const result = await updateShippingTracking(
  orderId,
  '1Z999AA1234567890',
  'UPS'
);
if (result.success) {
  console.log('Shipping tracking updated');
}
```

### 4. Category Management (`/src/app/actions/categories/actions.ts`)

##### Create Category
```typescript
import { createCategory } from '@/app/actions';

const result = await createCategory(formData);
if (result.success) {
  console.log('Category created:', result.data);
}
```

**Form Fields Required:**
- `name`: string
- `slug`: string (unique identifier)
- `description`: string (optional)
- `image`: string (optional)

##### Get All Categories
```typescript
import { getCategories } from '@/app/actions';

const result = await getCategories();
if (result.success) {
  console.log('Categories:', result.data);
}
```

##### Get Category by Slug
```typescript
import { getCategoryBySlug } from '@/app/actions';

const result = await getCategoryBySlug('electronics');
if (result.success) {
  console.log('Category:', result.data);
}
```

##### Update Category
```typescript
import { updateCategory } from '@/app/actions';

const result = await updateCategory(categoryId, formData);
if (result.success) {
  console.log('Category updated:', result.data);
}
```

##### Delete Category
```typescript
import { deleteCategory } from '@/app/actions';

const result = await deleteCategory(categoryId);
if (result.success) {
  console.log('Category deleted successfully');
}
```

### 5. Admin Management (`/src/app/actions/admin/admin-actions.ts`)

##### Get All Users
```typescript
import { getAllUsers } from '@/app/actions';

const result = await getAllUsers(1, 20); // page 1, 20 users per page
if (result.success) {
  console.log('Users:', result.data.users);
  console.log('Pagination:', result.data.pagination);
}
```

##### Update User Role
```typescript
import { updateUserRole } from '@/app/actions';

const result = await updateUserRole(userId, true); // Make user admin
if (result.success) {
  console.log('User role updated:', result.data);
}
```

##### Delete User
```typescript
import { deleteUser } from '@/app/actions';

const result = await deleteUser(userId);
if (result.success) {
  console.log('User deleted successfully');
}
```

##### Get Dashboard Statistics
```typescript
import { getDashboardStats } from '@/app/actions';

const result = await getDashboardStats();
if (result.success) {
  console.log('Stats:', result.data.stats);
  console.log('Recent orders:', result.data.recentOrders);
  console.log('Low stock products:', result.data.lowStockProducts);
}
```

##### Get Product Analytics
```typescript
import { getProductAnalytics } from '@/app/actions';

const result = await getProductAnalytics();
if (result.success) {
  console.log('Top selling products:', result.data.topSellingProducts);
  console.log('Category performance:', result.data.categoryPerformance);
}
```

##### Bulk Update Product Stock
```typescript
import { bulkUpdateProductStock } from '@/app/actions';

const updates = [
  { productId: '123', newStock: 50 },
  { productId: '456', newStock: 25 }
];

const result = await bulkUpdateProductStock(updates);
if (result.success) {
  console.log(`Updated ${result.data.modifiedCount} products`);
}
```

##### Export Data
```typescript
import { exportData } from '@/app/actions';

// Export users as CSV
const usersCSV = await exportData('users', 'csv');

// Export products as JSON
const productsJSON = await exportData('products', 'json');
```

## 🗄️ Database Models

### User Model
```typescript
{
  name: string (required)
  email: string (required, unique)
  password: string (required, hashed)
  isAdmin: boolean (default: false)
  address: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  wishlist: Product[] (ObjectId references)
  timestamps: true
}
```

### Product Model
```typescript
{
  name: string (required)
  slug: string (required, unique)
  price: number (required)
  description: string
  images: string[]
  category: Category (ObjectId reference)
  stock: number (default: 0)
  featured: boolean (default: false)
  rating: number (default: 0)
  numReviews: number (default: 0)
  timestamps: true
}
```

### Order Model
```typescript
{
  user: User (ObjectId reference, required)
  orderItems: [{
    name: string (required)
    qty: number (required)
    image: string (required)
    price: number (required)
    product: Product (ObjectId reference, required)
  }]
  shippingAddress: {
    fullName: string (required)
    address: string (required)
    city: string (required)
    postalCode: string (required)
    country: string (required)
  }
  paymentMethod: string (required)
  paymentResult: {
    id: string
    status: string
    update_time: string
    email_address: string
  }
  itemsPrice: number (required)
  shippingPrice: number (required)
  taxPrice: number (required)
  totalPrice: number (required)
  isPaid: boolean (default: false)
  isDelivered: boolean (default: false)
  isCancelled: boolean (default: false)
  paidAt: Date
  deliveredAt: Date
  cancelledAt: Date
  cancellationReason: string
  refund: {
    amount: number
    reason: string
    processedAt: Date
    status: 'pending' | 'processed' | 'failed'
  }
  shipping: {
    trackingNumber: string
    carrier: string
    updatedAt: Date
  }
  timestamps: true
}
```

### Category Model
```typescript
{
  name: string (required, unique)
  slug: string (required, unique)
  description: string
  image: string
  timestamps: true
}
```

## 🔐 Authentication

### NextAuth Configuration
The app uses NextAuth.js with:
- Credentials provider (email/password)
- Google OAuth (optional)
- MongoDB adapter
- JWT sessions

### Protected Routes
Use the `auth()` function to protect server-side routes:

```typescript
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  // Your protected logic here
}
```

### Client-Side Protection
Use the `useSession` hook for client-side protection:

```typescript
import { useSession } from 'next-auth/react';

export default function ProtectedComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Access denied</div>;
  
  return <div>Protected content</div>;
}
```

## 🛒 Cart Management

### Zustand Store
The cart uses Zustand for state management:

```typescript
import { useCartStore } from '@/store';

// Add item to cart
useCartStore.getState().addItem({
  productId: '123',
  name: 'Product Name',
  price: 29.99,
  quantity: 1
});

// Remove item from cart
useCartStore.getState().removeItem('123');

// Clear cart
useCartStore.getState().clearCart();

// Access cart state
const { items, totalPrice } = useCartStore();
```

## 📡 API Routes

### Available Endpoints

#### `/api` - Health Check
- `GET`: Returns status message

#### `/api/register` - User Registration
- `POST`: Create new user account
- Body: `{ email, password, name }`

#### `/api/auth/[...nextauth]` - NextAuth Routes
- Handles all authentication flows

## 🚧 Missing Features & TODO

The following features are not yet implemented but would be valuable additions:

### Product Reviews & Ratings
- Create, read, update, delete product reviews
- Rating calculation and aggregation
- Review moderation system

### Product Variants
- Size, color, material options
- Variant-specific pricing and stock
- Variant selection in cart

### Payment Integration
- Stripe/PayPal integration
- Payment webhooks
- Subscription management
- Payment method storage

### Email & Notifications
- Email verification
- Password reset emails
- Order confirmation emails
- Shipping updates
- Marketing emails

### Advanced Search & Filtering
- Elasticsearch integration
- Faceted search
- Search suggestions
- Search analytics

### Inventory Management
- Low stock alerts
- Automatic reorder points
- Supplier management
- Purchase orders

### Customer Support
- Ticket system
- Live chat integration
- FAQ management
- Return/refund requests

### Analytics & Reporting
- Advanced sales reports
- Customer behavior analytics
- A/B testing
- Performance metrics

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## 📁 Project Structure

```
src/
├── app/
│   ├── actions/          # Server actions
│   │   ├── users/        # User management & profiles
│   │   ├── products/     # Product management & search
│   │   ├── orders/       # Order management & analytics
│   │   ├── categories/   # Category management
│   │   └── admin/        # Admin dashboard & analytics
│   ├── api/              # API routes
│   └── ...               # Next.js app router
├── components/            # Reusable UI components
├── features/              # Feature-specific components
├── lib/                   # Utilities and configurations
├── models/                # Database models
├── store/                 # State management
└── types/                 # TypeScript type definitions
```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check `MONGODB_URI` environment variable
   - Ensure MongoDB is running
   - Verify network connectivity

2. **Authentication Issues**
   - Check `NEXTAUTH_SECRET` is set
   - Verify `NEXTAUTH_URL` matches your domain
   - Check Google OAuth credentials if using Google sign-in

3. **Action Execution Errors**
   - Ensure all required form fields are provided
   - Check database connection
   - Verify user permissions for admin actions

### Debug Mode
Enable debug mode by setting `NODE_ENV=development` in your environment variables.

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check MongoDB connection and permissions

---

**Note**: This is a development version. For production use, ensure proper security measures, input validation, and error handling are implemented.
