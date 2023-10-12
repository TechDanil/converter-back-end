import axios from 'axios';
import { Request, Response } from 'express';

export const getAllTokens = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${process.env.API_BASE_URL}/swap/v5.2/1/tokens`, {
            headers: {
                Authorization: `Bearer ${process.env.AUTH_KEY}`
            }
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}