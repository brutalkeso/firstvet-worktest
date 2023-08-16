import express from 'express';
import questions from './src/paths/Questions';
import {setGet} from './src/PathTypeHelpers';

const app = express();
const port = 8080;

setGet(app, '/questions', questions);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
