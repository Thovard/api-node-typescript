import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Open server: http://localhost:3000');  
});
