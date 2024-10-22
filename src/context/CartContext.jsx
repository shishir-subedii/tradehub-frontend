import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);

    return (
            /* [cartData, setCartData] because cartData is array*/
        <CartContext.Provider value={[cartData, setCartData]}>
            {children}
        </CartContext.Provider>
    );
};
