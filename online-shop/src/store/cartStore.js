import { create } from "zustand";
function getInitialItems() {
  try {
    const savedItems = localStorage.getItem("cart");

    return savedItems ? JSON.parse(savedItems) : [];
  } catch {
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: getInitialItems(),

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity < 1
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
    })),

  clear: () => set({ items: [] }),
}));

// Save cart outside React using Zustand subscription
useCartStore.subscribe((state) => {
  localStorage.setItem("cart", JSON.stringify(state.items));
});
