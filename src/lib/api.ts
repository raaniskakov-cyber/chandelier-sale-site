export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  old_price?: number;
  description: string;
  image_url: string;
  additional_images?: string[];
  stock_quantity: number;
  is_new?: boolean;
  is_sale?: boolean;
  pickup_available?: boolean;
  has_remote?: boolean;
  is_dimmable?: boolean;
  has_color_change?: boolean;
  power?: number;
  voltage?: number;
  light_source?: string;
  style?: string;
  color?: string;
  material?: string;
  height?: number;
  length?: number;
  width?: number;
  depth?: number;
  diameter?: number;
  chain_length?: number;
  rating?: number;
  reviews_count?: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

const API_BASE = 'https://functions.poehali.dev';

export const api = {
  async getProducts(filters?: any): Promise<{ products: Product[]; total: number }> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    
    const url = `${API_BASE}/a3fd8ed2-0343-4f13-b1e5-a2b2cc6f8a07?${params}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE}/a3fd8ed2-0343-4f13-b1e5-a2b2cc6f8a07?id=${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    const data = await response.json();
    return data.products[0];
  },

  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${API_BASE}/0d0dfc96-5a4b-443f-a055-06ec9cbe4d36`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  async register(email: string, password: string, name: string): Promise<User> {
    const response = await fetch(`${API_BASE}/0d0dfc96-5a4b-443f-a055-06ec9cbe4d36`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, action: 'register' }),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  async createOrder(items: CartItem[], totalAmount: number): Promise<Order> {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total_amount: totalAmount
      }),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },
};
