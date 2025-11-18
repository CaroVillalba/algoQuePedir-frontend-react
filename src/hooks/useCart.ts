import { create } from 'zustand'
import type { CartItem } from '../types/Order'

interface CartState {
    restaurantId: number | null;
    items: CartItem[];

    addItem: (item: CartItem, restaurantId: number) => boolean;
    removeItem: (itemId: number) => void;
    clearCart: () => void;

    getSubtotal: () => number;
    getTotalItems: () => number;
}

export const useCart = create<CartState>((set, get) => ({
    restaurantId: null,
    items: [],
    
    addItem: (item: CartItem, restaurantId: number) => {
        const state = get();

        if (state.restaurantId === null) {
            set({
                restaurantId,
                items: [item]
            });
            return true;
        }

        if (state.restaurantId === restaurantId) {
            const existing = state.items.find(i => i.id === item.id);

            if (existing) {
                set({
                    items: state.items.map(i =>
                        i.id === item.id
                            ? {
                                ...i,
                                qty: i.qty + item.qty,
                                total: (i.qty + item.qty) * i.unitPrice
                            }
                            : i
                    )
                });
            } else {
                set({ items: [...state.items, item] });
            }

            return true;
        }

        return false;
    },

    removeItem: (itemId) => {
        set(state => ({
            items: state.items.filter(i => i.id !== itemId)
        }));
    },

    clearCart: () => {
        set({
            restaurantId: null,
            items: []
        });
    },

    getSubtotal: () => {
        return get().items.reduce((acc, i) => acc + i.total, 0);
    },

    getTotalItems: () => {
        return get().items.reduce((acc, i) => acc + i.qty, 0);
    }
}));