import express, { Request, Response } from 'express'
import { movieRoutes } from './modules/movies/movie.route';
const app = express()
//parser
app.use(express.json());


app.use("/api/movies", movieRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!...........')
})

export default app