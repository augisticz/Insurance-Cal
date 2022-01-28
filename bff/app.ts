import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
const port = 3001
const isTrue = true;
const bodyParser = require('body-parser');

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', new Boolean(isTrue).toString());
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));

const getRateInsurance = (paymentFrequency: string) => {
  let rateInsurance = 0
  switch (paymentFrequency) {
    case 'YEARLY':
      rateInsurance = 26.03 
    break;
    case 'HALFYEARLY':
      rateInsurance = 13.015
    break;
    case 'QUARTERLY':
      rateInsurance = 6.5075
    break;
    case 'MONTHLY':
      rateInsurance = 2.16916667
    break;
  }
  return rateInsurance
}

app.post('/getProduct', (req: Request, res: Response) => {
  try {
    const fixedRate: number = 1000;
    const calWithType1 = (req.body.saPerYear * getRateInsurance(req.body.paymentFrequency)) / fixedRate;
    const calWithType2 = (req.body.premiumPerYear * fixedRate) / getRateInsurance(req.body.paymentFrequency);
    const result = req.body.calType === 'calType1' ? calWithType1 : calWithType2;
    
    res.json({
      ...req.body,
      baseSumAssured: result
    })
  } catch (error) {
    // console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})