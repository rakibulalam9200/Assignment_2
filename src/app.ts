import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api',UserRoutes)

app.get('/', (req: Request, res: Response) => {
  // const a = 10;

  res.send('........Assalamualicum....');
});

export default app;
