import supertest from 'supertest';
import app from '../serverSso'; 
import User from "../models/user";
import { connectToDatabase } from '../config/dbConfig';
const dotenv = require('dotenv');
dotenv.config();

const request = supertest(app)

describe('Test request with mongoose', () => {

  beforeAll(async () => {
     await connectToDatabase;
  });
  // afterEach(async () => {
  //    await db.clearDatabase();
  //    serverInstance.close();
  //    User.collection.deleteMany();
  // });
  // afterAll(async () => {
  //    await db.closeDatabase();
  // });

  test('GET - /', async () => {
     const res = await request.get('/').send();
     const body = res.body;
     const message = body.message;
     expect(res.statusCode).toBe(200);
     expect(res.text).toBe("Serveur nodemon + mongoose jc node en fonctionnement");
  });
  test('POST - /auth/signup', async () => {
       const res = await request
           .post('/auth/signup')
           .send({ username: 'nn8', password: 'ledzep1980'})
           .set({Accept: 'Application/json'});
           expect(res.status).toBe(201);          
  })
  test('POST - /auth/login', async () => {
       await request
           .post('/auth/signup/')
           .send({ username: 'nn9', password: 'ledzep1980'})
           .set({Accept: 'Application/json'})
       const res = await request
           .post('/auth/login')
           .send({ username: 'user', password: 'ledzep1980'})
           .set({Accept: 'Application/json'})
           expect(res.status).toBe(200);
           
  })
})

// describe('Tester la recup by UserId', () => {
//   beforeAll(async () => {
//     await connectToDatabase;
//  });

//  test('getUserByHisId', async () => {

//   const userJC = new User();
//   const resultat = await userJC.getUserByHisId();
  
//   expect(resultat).toBe("kk99p");
// });

// })