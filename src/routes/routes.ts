import express, { Request, Response } from 'express';
import { getAllTokens } from '../controllers/tokenController';
import { convertCurrency } from '../controllers/currencyController';

const router = express.Router();

router.get('/currency-tokens', getAllTokens);
router.get('/currency-quote', convertCurrency)

export default router;