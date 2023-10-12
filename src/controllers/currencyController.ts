import { Request, Response } from 'express';
import axios from 'axios';
import { fetchCurrencyConversionQuote } from '../utils/fetchCurrencyConversionQuote/fetchCurrencyConversionQuote';

export const convertCurrency = async (req: Request, res: Response) => {
    try {
        const { src, dst, amount, fee } = req.query;

        if (!src || !dst || !amount || !fee) {
            return res.status(400).json({ error: 'Invalid request. Please provide fromTokenAddress, toTokenAddress, amount, and fee.' });
        }

        const quote = await fetchCurrencyConversionQuote(
            String(src), String(dst), Number(amount), Number(fee)
        );

        const toAmount = Number(quote.toAmount);

        res.json({ toAmount });

    } catch (error) {
        res.status(500).json({ error: 'coudnt convert' });
    }
}