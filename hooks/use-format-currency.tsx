import { useMemo } from "react";

export const useFormatCurrency = (amount: number): string => {

    const formatCurrency = (amount: number) => 
        new Intl.NumberFormat('en-US', 
            {style: 'currency', currency: 'USD'})
            .format(amount);

    return useMemo(
        () => formatCurrency(amount),
        [amount]
    );
}