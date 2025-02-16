import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { IncomingMessage } from 'http';

const app = express();
const PORT = 3000;

const options = {
    target: 'https://dummyjson.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
    onProxyReq: (proxyReq: IncomingMessage, req: Request, res: Response) => {
        proxyReq.headers = {
            ...proxyReq.headers,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        };
    },
    selfHandleResponse: true,
    onProxyRes: async (proxyRes: IncomingMessage, req: Request, res: Response) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.end(await streamToString(proxyRes));
    }
};

function streamToString(stream: IncomingMessage): Promise<string> {
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}

app.use('/api/auth', createProxyMiddleware(options));

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
