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
            const response = await apiRequest("/cart/remove", "DELETE", { productId });

            return response.data; // return updated cart items
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
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                const removedId = action.meta.arg;
                state.items = state.items.filter(item => item.productId._id !== removedId);
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

});

export const { addItem, removeItem, clearCart, updateLocalQuantity } = cartSlice.actions;
export default cartSlice.reducer;