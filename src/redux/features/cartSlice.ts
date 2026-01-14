import { addCoupon } from "@/services/cart";
import { IProduct } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  name: string;
  mobile: string;
  // email: string;
  products: CartProduct[];
  shippingAddress: string;
  city: string;
  coupon: {
    code: string;
    discountAmount: number;
    isLoading: boolean;
    error: string;
  };
}

const initialState: InitialState = {
  name: "",
  mobile: "",
  // email: "",
  products: [],
  shippingAddress: "",
  city: "",
  coupon: {
    code: "",
    discountAmount: 0,
    isLoading: false,
    error: "",
  },
};

export const fetchCoupon = createAsyncThunk(
  "cart/fetchCoupon",
  async ({
    couponCode,
    subTotal,
  }: {
    couponCode: string;
    subTotal: number;
  }) => {
    try {
      const res = await addCoupon(couponCode, subTotal);

      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    } catch (err: any) {
      console.log(err);
      throw new Error(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // console.log("➡️ addProduct action triggered");
      // Incoming product from UI
      const incomingProduct = action.payload;
      // console.log("📦 Incoming product:", incomingProduct);

      // Current cart products
      // console.log("🛒 Current cart products:", state.products);

      // Try to find product already in cart
      const existingProduct = state.products.find(
        (product) => product._id === incomingProduct._id
      );
      // console.log("🔍 Existing product found:", existingProduct);
      // If product already exists → increase quantity
      if (existingProduct) {
        existingProduct.orderQuantity += 1;

        // console.log("➕ Quantity increased to:", existingProduct.orderQuantity);

        // console.log("🛒 Updated cart products:", state.products);
        return;
      }
      // If product does not exist → add new
      const newProduct = {
        ...incomingProduct,
        orderQuantity: 1,
      };

      state.products.push(newProduct);
      // console.log("✅ New product added to cart:", newProduct);
      // console.log("🛒 Final cart products:", state.products);
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateMobile: (state, action) => {
      state.mobile = action.payload;
    },
    // updateEmail: (state, action) => {
    //   state.email = action.payload;
    // },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    clearCart: (state) => {
      state.name = "";
      state.mobile = "";
      // state.email = "";
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCoupon.pending, (state) => {
      state.coupon.isLoading = true;
      state.coupon.error = "";
    });
    builder.addCase(fetchCoupon.rejected, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = action.error.message as string;
      state.coupon.code = "";
      state.coupon.discountAmount = 0;
    });
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = "";
      state.coupon.code = action.payload.data.coupon.code;
      state.coupon.discountAmount = action.payload.data.discountAmount;
    });
  },
});

//* Products
export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    name: state.cart.name,
    mobile: state.cart.mobile,
    // email: state.cart.email,
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "White",
    })),
    shippingAddress: state.cart.shippingAddress,
    city: state.cart.city,
    paymentMethod: "COD",
  };
};
//* Payment
// export const subTotalSelector = (state: RootState) => {
//   return state.cart.products.reduce((acc, product) => {
//     console.log({ product });
//     if (product.offerPrice) {
//       console.log("Acc", acc);
//       return acc + product.offerPrice * product.orderQuantity;
//     } else {
//       console.log("Acc", acc);
//       return acc + product.price * product.orderQuantity;
//     }
//   }, 0);
// };
//* Payment
export const subTotalSelector = (state: RootState) => {
  // console.log("🧮 ### Subtotal calculation started");
  // console.log("🛒 Cart products:", state.cart.products);

  const subTotal = state.cart.products.reduce((accumulator, product, index) => {
    // console.log(`\n➡️ Processing product #${index + 1}`);
    // console.log("📦 Product:", product);

    const quantity = product.orderQuantity;
    const price = product.offerPrice ?? product.price;

    // console.log("🔢 Quantity:", quantity);
    // console.log("💰 Unit price used:", price);
    // console.log("🧾 Previous subtotal (acc):", accumulator);

    const productTotal = price * quantity;
    // console.log("📊 Product total:", productTotal);

    const newSubtotal = accumulator + productTotal;
    // console.log("✅ New subtotal:", newSubtotal);

    return newSubtotal;
  }, 0);

  // console.log("🏁 Final subtotal:", subTotal);
  return subTotal; // New subTotal and subTotal is same
};

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "ঢাকা শহরের ভিতরে (BDT 70)" &&
    state.cart.products.length > 0
  ) {
    return 70;
  } else if (
    state.cart.city &&
    state.cart.city !== "ঢাকা শহরের ভিতরে (BDT 70)" &&
    state.cart.products.length > 0
  ) {
    return 130;
  } else {
    return 0;
  }
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);
  const discountAmount = discountAmountSelector(state);

  return subTotal - discountAmount + shippingCost;
};

export const couponSelector = (state: RootState) => {
  return state.cart.coupon;
};
export const discountAmountSelector = (state: RootState) => {
  return state.cart.coupon.discountAmount;
};

//* Address and others

export const nameSelector = (state: RootState) => {
  return state.cart.name;
};
export const mobileSelector = (state: RootState) => {
  return state.cart.mobile;
};
// export const emailSelector = (state: RootState) => {
//   return state.cart.name;
// };

export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateName,
  updateMobile,
  // updateEmail,
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
