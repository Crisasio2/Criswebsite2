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
  getSearchSuggestions(query: string): Promise<string[]>;
  
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

  // Función para normalizar texto eliminando tildes y caracteres especiales
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimina tildes y diacríticos
      .replace(/[^a-z0-9\s]/g, '') // Elimina caracteres especiales excepto espacios
      .trim();
  }

  // Función para calcular similitud entre strings (algoritmo de Levenshtein simplificado)
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    // Búsqueda exacta de substring
    if (longer.includes(shorter)) return 0.9;
    
    // Búsqueda de palabras individuales
    const shorterWords = shorter.split(' ');
    const longerWords = longer.split(' ');
    let matchedWords = 0;
    
    shorterWords.forEach(word => {
      if (longerWords.some(lWord => lWord.includes(word) || word.includes(lWord))) {
        matchedWords++;
      }
    });
    
    return shorterWords.length > 0 ? matchedWords / shorterWords.length : 0;
  }

  async searchProducts(query: string, category?: string): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    
    if (!query && !category) {
      return allProducts;
    }
    
    const normalizedQuery = this.normalizeText(query || '');
    const normalizedCategory = this.normalizeText(category || '');
    
    // Primero, búsqueda exacta
    const exactMatches = allProducts.filter(product => {
      const normalizedName = this.normalizeText(product.name);
      const normalizedDescription = this.normalizeText(product.description);
      const normalizedMaterial = this.normalizeText(product.material || '');
      const normalizedProductCategory = this.normalizeText(product.category);
      
      const matchesQuery = !normalizedQuery || 
        normalizedName.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery) ||
        normalizedMaterial.includes(normalizedQuery);
      
      const matchesCategory = !normalizedCategory || 
        normalizedProductCategory.includes(normalizedCategory);
      
      return matchesQuery && matchesCategory;
    });

    // Si hay coincidencias exactas, devolver esas
    if (exactMatches.length > 0) {
      return exactMatches;
    }

    // Si no hay coincidencias exactas, hacer búsqueda inteligente con similitud
    const fuzzyMatches = allProducts
      .map(product => {
        const normalizedName = this.normalizeText(product.name);
        const normalizedDescription = this.normalizeText(product.description);
        const normalizedMaterial = this.normalizeText(product.material || '');
        const normalizedProductCategory = this.normalizeText(product.category);
        
        let queryScore = 0;
        let categoryScore = 1; // Por defecto, categoria coincide si no se especifica
        
        if (normalizedQuery) {
          const nameScore = this.calculateSimilarity(normalizedQuery, normalizedName);
          const descScore = this.calculateSimilarity(normalizedQuery, normalizedDescription);
          const materialScore = this.calculateSimilarity(normalizedQuery, normalizedMaterial);
          queryScore = Math.max(nameScore, descScore, materialScore);
        }
        
        if (normalizedCategory) {
          categoryScore = this.calculateSimilarity(normalizedCategory, normalizedProductCategory);
        }
        
        // Score combinado (query score tiene más peso)
        const totalScore = normalizedQuery ? (queryScore * 0.7 + categoryScore * 0.3) : categoryScore;
        
        return { product, score: totalScore };
      })
      .filter(item => item.score > 0.3) // Solo productos con similaridad razonable
      .sort((a, b) => b.score - a.score) // Ordenar por relevancia
      .map(item => item.product);

    return fuzzyMatches;
  }

  async getSearchSuggestions(query: string): Promise<string[]> {
    const allProducts = Array.from(this.products.values());
    const normalizedQuery = this.normalizeText(query);
    
    // Obtener todas las palabras únicas de productos
    const allWords = new Set<string>();
    const commonSearchTerms = [
      'champu', 'jabon', 'cepillo', 'bolsa', 'vela', 'termo',
      'natural', 'ecologico', 'organico', 'sostenible', 'biodegradable',
      'bambu', 'algodon', 'soja', 'acero', 'artesanal',
      'cosmetica', 'higiene', 'hogar', 'limpieza', 'cuidado',
      'reutilizable', 'reciclado', 'compost', 'plastico'
    ];
    
    for (const product of allProducts) {
      const words = this.normalizeText(`${product.name} ${product.description} ${product.category} ${product.material}`)
        .split(' ')
        .filter(word => word.length > 2);
      for (const word of words) {
        allWords.add(word);
      }
    }
    
    // Agregar términos comunes de búsqueda
    for (const term of commonSearchTerms) {
      allWords.add(term);
    }
    
    // Calcular similitud con el query
    const suggestions = Array.from(allWords)
      .map(word => ({
        word,
        similarity: this.calculateSimilarity(normalizedQuery, word)
      }))
      .filter(item => item.similarity > 0.4 && item.word !== normalizedQuery)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(item => item.word);
    
    // También sugerir nombres de productos similares
    const productSuggestions = allProducts
      .map(product => ({
        name: product.name,
        similarity: this.calculateSimilarity(normalizedQuery, this.normalizeText(product.name))
      }))
      .filter(item => item.similarity > 0.3)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
      .map(item => item.name);
    
    const combinedSuggestions = [...suggestions, ...productSuggestions];
    const uniqueSuggestions = combinedSuggestions.filter((item, index) => 
      combinedSuggestions.indexOf(item) === index
    );
    return uniqueSuggestions.slice(0, 5);
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
