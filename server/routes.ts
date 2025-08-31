import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertCartItemSchema, type SearchFilters } from "@shared/schema";
import { z } from "zod";

const searchFiltersSchema = z.object({
  product: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products/search", async (req, res) => {
    try {
      const filters = searchFiltersSchema.parse(req.body);
      const products = await storage.searchProducts(
        filters.product || "",
        filters.category
      );
      res.json(products);
    } catch (error) {
      res.status(400).json({ message: "Invalid search parameters" });
    }
  });

  // Cart API
  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems();
      const cartWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return { ...item, product };
        })
      );
      res.json(cartWithProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartItemData = insertCartItemSchema.parse(req.body);
      
      // Check if item already exists in cart
      const existingItems = await storage.getCartItems(cartItemData.userId || undefined);
      const existingItem = existingItems.find(item => item.productId === cartItemData.productId);
      
      if (existingItem) {
        // Update quantity
        const updatedItem = await storage.updateCartItemQuantity(
          existingItem.id, 
          existingItem.quantity + (cartItemData.quantity || 1)
        );
        const product = await storage.getProduct(updatedItem!.productId);
        res.json({ ...updatedItem, product });
      } else {
        // Add new item
        const newItem = await storage.addToCart(cartItemData);
        const product = await storage.getProduct(newItem.productId);
        res.json({ ...newItem, product });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      if (quantity === 0) {
        await storage.removeFromCart(req.params.id);
        res.json({ message: "Item removed from cart" });
      } else {
        const updatedItem = await storage.updateCartItemQuantity(req.params.id, quantity);
        if (!updatedItem) {
          return res.status(404).json({ message: "Cart item not found" });
        }
        const product = await storage.getProduct(updatedItem.productId);
        res.json({ ...updatedItem, product });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      await storage.clearCart();
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
