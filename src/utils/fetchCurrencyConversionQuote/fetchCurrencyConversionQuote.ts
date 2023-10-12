import axios, { AxiosResponse } from "axios";

interface IConversionQuoteResponse {
    toAmount: string;
}

export const fetchCurrencyConversionQuote = async (
    src: string,
    dst: string,
    amount: number,
    fee: number
): Promise<IConversionQuoteResponse> => {
    try {
        const response: AxiosResponse<IConversionQuoteResponse> = await axios.get(`${process.env.API_BASE_URL}/swap/v5.2/1/quote`, {
            params: {
                src,
                dst,
                amount,
                fee,
            },

            headers: {
                Authorization: `Bearer ${process.env.AUTH_KEY}`
            }
        });

        console.log(response);

        const quote = response.data;

        return quote;
    } catch (error) {
        throw new Error('Quote retrieval  failed');
    }
   
}