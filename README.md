## Transaction payment splitting service (TPSS) API

The TPSS is used to calculate the amount due to one or more split payment 'entities' as well as the amount left after all splits have been computed.

## Stack

The API was built using Nodejs and Expressjs.
it was hosted on Heroku hosting platform 
Link: `https://tpss-api.herokuapp.com/`

### API documentation

endpoint: 'POST api/split-payment/compute'
The api recieves a request of the format as posted below

```json
{
  "ID": 13092,
  "Amount": 5500,
  "Currency": "NGN",
  "CustomerEmail": "anon8@customers.io",
  "SplitInfo": [
    {
      "SplitType": "FLAT",
      "SplitValue": 450,
      "SplitEntityId": "LNPYACC0019"
    },
    {
      "SplitType": "RATIO",
      "SplitValue": 3,
      "SplitEntityId": "LNPYACC0011"
    },
    {
      "SplitType": "PERCENTAGE",
      "SplitValue": 3,
      "SplitEntityId": "LNPYACC0015"
    },
    {
      "SplitType": "RATIO",
      "SplitValue": 2,
      "SplitEntityId": "LNPYACC0016"
    },
    {
      "SplitType": "RATIO",
      "SplitValue": 7,
      "SplitEntityId": "LNPYACC0021"
    },
    {
      "SplitType": "FLAT",
      "SplitValue": 2450,
      "SplitEntityId": "LNPYACC0029"
    },
    {
      "SplitType": "PERCENTAGE",
      "SplitValue": 10,
      "SplitEntityId": "LNPYACC0215"
    }
  ]
}
```

It then sends back a json response of the format:

```json
{
  "ID": 13092,
  "Balance": 591.09375,
  "SplitBreakdown": [
    {
      "SplitEntityId": "LNPYACC0019",
      "Amount": 450
    },
    {
      "SplitEntityId": "LNPYACC0029",
      "Amount": 2450
    },
    {
      "SplitEntityId": "LNPYACC0015",
      "Amount": 78
    },
    {
      "SplitEntityId": "LNPYACC0215",
      "Amount": 252.20000000000002
    },
    {
      "SplitEntityId": "LNPYACC0011",
      "Amount": 567.45
    },
    {
      "SplitEntityId": "LNPYACC0016",
      "Amount": 283.725
    },
    {
      "SplitEntityId": "LNPYACC0021",
      "Amount": 827.53125
    }
  ]
}
```
