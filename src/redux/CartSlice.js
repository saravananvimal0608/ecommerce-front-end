import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiRequest } from '../common/common.js'

const initialState = {
    items: [],
    loading: false,
    error: null
};
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const response = await apiRequest("/cart", "GET", null,)
        return response.data; // only items array
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
});
export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await apiRequest("/cart/update", "PUT", { productId, quantity });
            return response.data; // updated cart
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update cart");
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async (productId, { rejectWithValue }) => {
        try {
            await apiRequest("/cart/remove", "DELETE", { productId });
            return productId;   // <-- unwrap expects a value
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove item");
        }
    }
);


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeLocalItem: (state, action) => {
            state.items = state.items.filter(
                i => i.productId._id !== action.payload
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateLocalQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(i => i.productId._id === productId);
            if (item) item.quantity = quantity;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                const id = action.payload.productId;
                state.items = state.items.filter((item) => item.productId._id !== id);
            });
    }
});

export const { addItem, removeLocalItem, clearCart, updateLocalQuantity } = cartSlice.actions;

// Selector to get cart item count
export const selectCartItemCount = (state) => state.cart.items.length;

export default cartSlice.reducer;
