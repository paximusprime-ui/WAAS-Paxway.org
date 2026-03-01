// ─── WAAS Backend — Express Server ────────────────────────────
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import checkoutRoutes from './routes/checkout.js';
import quoteRoutes from './routes/quote.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Security ─────────────────────────────────────────────────
app.use(helmet());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// ─── Rate Limiting ────────────────────────────────────────────
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', apiLimiter);

// ─── Stripe Webhook (needs raw body — MUST be before json parser) ─
app.use(
    '/api/stripe/webhook',
    express.raw({ type: 'application/json' })
);

// ─── Body Parsing (everything else) ──────────────────────────
app.use(express.json({ limit: '1mb' }));

// ─── Logging ──────────────────────────────────────────────────
app.use(morgan('combined'));

// ─── Routes ───────────────────────────────────────────────────
app.use('/api', checkoutRoutes);
app.use('/api', quoteRoutes);

// ─── Health Check ─────────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// ─── 404 Catch ────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({
        error:
            process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : err.message,
    });
});

// ─── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ WAAS Backend running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Frontend:    ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

export default app;
