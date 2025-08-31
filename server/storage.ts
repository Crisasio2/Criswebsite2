import { type User, type InsertUser, type Product, type InsertProduct, type CartItem, type InsertCartItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string, category?: string): Promise<Product[]>;
  
  // Cart
  getCartItems(userId?: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(userId?: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const mockProducts: InsertProduct[] = [
      {
        name: "Champú Sólido Natural",
        description: "Champú ecológico sin envases plásticos, formulado con ingredientes naturales.",
        price: "12.99",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Cosmética",
        material: "Ingredientes naturales",
        certification: "100% Sostenible",
        inStock: 50
      },
      {
        name: "Cepillo de Bambú",
        description: "Cepillo de dientes biodegradable hecho de bambú sostenible.",
        price: "4.50",
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Higiene",
        material: "Bambú Orgánico",
        certification: "100% Biodegradable",
        inStock: 100
      },
      {
        name: "Bolsas Reutilizables",
        description: "Set de 5 bolsas de algodón orgánico para compras sin residuos.",
        price: "15.99",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Hogar Ecológico",
        material: "Algodón Orgánico",
        certification: "Comercio Justo",
        inStock: 75
      },
      {
        name: "Jabón Artesanal",
        description: "Jabón natural hecho a mano con aceites esenciales orgánicos.",
        price: "8.75",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Cosmética",
        material: "Aceites Esenciales",
        certification: "Artesanal",
        inStock: 30
      },
      {
        name: "Vela de Soja",
        description: "Vela aromática hecha con cera de soja natural en contenedor reciclado.",
        price: "18.50",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Hogar Ecológico",
        material: "Cera de Soja",
        certification: "100% Natural",
        inStock: 25
      },
      {
        name: "Termo de Acero",
        description: "Termo reutilizable de acero inoxidable, mantiene la temperatura 12h.",
        price: "24.99",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "Hogar Ecológico",
        material: "Acero Inoxidable",
        certification: "Libre de BPA",
        inStock: 40
      }
    ];

    mockProducts.forEach(product => this.createProduct(product));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      material: insertProduct.material ?? null,
      certification: insertProduct.certification ?? null,
      inStock: insertProduct.inStock ?? null
    };
    this.products.set(id, product);
    return product;
  }

  async searchProducts(query: string, category?: string): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    
    if (!query && !category) {
      return allProducts;
    }
    
    const lowerQuery = query?.toLowerCase().trim();
    const lowerCategory = category?.toLowerCase().trim();
    
    return allProducts.filter(product => {
      const matchesQuery = !lowerQuery || 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.material?.toLowerCase().includes(lowerQuery);
      
      const matchesCategory = !lowerCategory || 
        product.category.toLowerCase().includes(lowerCategory);
      
      return matchesQuery && matchesCategory;
    });
  }

  async getCartItems(userId?: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => 
      !userId || item.userId === userId
    );
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id,
      quantity: insertCartItem.quantity || 1,
      userId: insertCartItem.userId ?? null
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(userId?: string): Promise<void> {
    if (userId) {
      const itemsToDelete = Array.from(this.cartItems.entries())
        .filter(([, item]) => item.userId === userId)
        .map(([id]) => id);
      
      itemsToDelete.forEach(id => this.cartItems.delete(id));
    } else {
      this.cartItems.clear();
    }
  }
}

export const storage = new MemStorage();
