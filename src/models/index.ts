export const fetchAllCountries = async () => [
  {
    id: 1,
    title: 'Kenya',
  },
  {
    id: 2,
    title: 'Nigeria',
  },
  {
    id: 3,
    title: 'Uganda',
  },
  {
    id: 4,
    title: 'USA',
  }
];

export const fetchAllProducts = async () => [
  {
    id: 1,
    countryId: 1,
    title: 'M-KOPA 5 Solar Home System',
    description:
`*What is in the box*
- 1 8W Solar Panel
- 1 Rechargeable FM/USB Radio
- 1 M-KOPA 5 Control Unit with Lithium Battery
- 4 Bright 1.2W LED Bulbs
- 1 5-in-1 Phone Charge Cable
- 1 Custom Charge Cable
- 1 Rechargeable LED Torch

*Features*
_Affordable_
Customers buy the solar home system on an affordable M-KOPA payment plan, with an initial deposit followed by daily payments for up to one year. After completing payments, customers own the product outright.

_Locally Available_
M-KOPA Solar is available through hundreds of M-KOPA dealers in Kenya and Uganda. To find your nearest M-KOPA dealer, contact customer care on +254 (0) 0707333222 or click here M-KOPA’s customer care team is available to support our customers, agents and retail partners.

*Pricing*
Deposit - *Ksh 2,999*
Daily Rate - *Ksh 50*
Number of Days - *420 Days*
Total Price - *Ksh 23,999*
Cash Price - *Ksh 18,999*`,
    image: 'https://i.pinimg.com/564x/e8/91/1d/e8911d7d31e88364c22a2cf66fa965cf.jpg',
  },
  {
    id: 2,
    countryId: 1,
    title: 'M-KOPA 6 Solar Home System',
    description:
`*What is in the box*
- 2 Solar Panel (8 Watts Each)
- M-KOPA 6 Control Unit With 6.4V, 6.4Ah Lithium Battery
- Brighter, 1.4W LED Bulbs
- 1 Strip Bulb
- 2 Phone Charge Cable
- Custom Charge Cable (For Radio & Torch)
- 1 Bulb Extension Cable
- 1 x Solar Tube Light
Note: Rechargeable Torch and Radio sold separately.

*Features*
_Affordable_
Customers buy the solar home system on an affordable M-KOPA payment plan, with an initial deposit followed by daily payments for up to one year. After completing payments, customers own the product outright.

_Locally Available_
M-KOPA Solar is available through hundreds of M-KOPA dealers in Kenya and Uganda. To find your nearest M-KOPA dealer, contact customer care on +254 (0) 0707333222 or click here M-KOPA’s customer care team is available to support our customers, agents and retail partners.

*Pricing*
Deposit - *Ksh 2,499*
Daily Rate - *Ksh 50*
Number of Days - *365 Days*
Total Loan - *Ksh 20,749*
Extras:
Radios - *40 days*
Torch - *40 days*
Torch and Radio - *80 days*`,
    image: 'https://i.pinimg.com/564x/b8/8c/36/b88c3622a56fba25638aa15bd161ba2e.jpg',
  },
  {
    id: 3,
    countryId: 2,
    title: 'M-KOPA Solar Home Set',
    description:
`*What is in the box*
- 32″ Flat Screen Digital TV
- 2 x M-KOPA 6000 Control Units
- 2 x 60 W Solar Panel
- 2 x Solar Tube Lights
- 1 x 6M Extension Cable
- 1 x 18” Fan
- Phone Charge Cables
- 2 x Solar Lights with high and low setting

*Benefits Of M-KOPA Solar Set*
- TV-up to 12 hours of viewing (including daylight hours)
- Fan-upto 12 hours
- Lights upto 6 hours a night
- Hours of usage is only an indication, true usage will depend on the solar home system.
- No need to buy petrol,save money
- Make payments in full and on time to qualify for system upgrades and more
- No more cost,smoke and noise from a generator
- 2-year warranty on the M-kopa system /panel/battery/TV
- 1-year warranty on accessories and lights

*Pricing*
_Direct Debit_
Commitment Fee - *N 29,000*
Daily Rate - *N 500*
Weekly Rate - *N 3,500*
Monthly Rate - *N 15,000*
Total payment in installments (maximum of 2 years) - *N 389,000*
Outright Purchase - *N 311,200*

_Quickteller_
Commitment Fee - *N 49,000*
Daily Rate - *N 500*
Weekly Rate - *N 3,500*
Monthly Rate - *N 15,000*
Total payment in installments (maximum of 2 years) - *N 409,000*
Outright Purchase - *N 311,200*`,
    image: 'http://www.m-kopa.com/wp-content/uploads/2014/11/6000-Fan-2panels-Hi-res.jpg',
  },
  {
      id: 4,
      countryId: 4,
      title: 'Rolls royce Phantom',
      description:
  `*What is in it for you*
  - Luggage capacity 19.0 Cu.Ft.
  - Maximum cargo capacity 19.0 Cu.Ft.
  - Standard seating - 5
  - Fuel tank capacity - 23.8 Gal
  - Base engine siz - 6.8 L
  - Horsepower - 563 Hp

  *Features*
  _Class and comfort_
  Customers buy the Rolls royce Phantom at a sensible payment plan, with an initial deposit followed by monthly payments for up to 2 years. After completing payments, you own your beast!

  _Ship using a local provider_
  Get instant auto transport quotes from trusted and responsible vehicle haulers in your area who we partner with

  *Pricing*
  Deposit - *$135, 000*
  Monthly Rate - *$13, 125*
  Number of Days - *420 Days*
  Total Price - *$450,000*
  Cash Price - *$440,000*`,
      image: 'https://cdn.pixabay.com/photo/2015/11/06/16/33/rolls-1029584_1280.jpg',
    },
];

export const fetchAllProductsByCountryId = async (countryId: number) => {
  const products = await fetchAllProducts();
  return products.filter((product) => product.countryId === countryId);
};

export const fetchAllUsers = async () => [
  {
    loan: {
      currency: 'KES',
      dailyRate: 50,
      totalDays: 420,
      amount: 2999,
    },
    statements: [
      {
        currency: 'KES',
        amountPaid: 50,
        amountRemaining: 2949,
        createdAt: '2020-06-07 02:01',
      },
      {
        currency: 'KES',
        amountPaid: 50,
        amountRemaining: 2899,
        createdAt: '2020-06-06 17:16',
      },
      {
        currency: 'KES',
        amountPaid: 50,
        amountRemaining: 2849,
        createdAt: '2020-06-05 12:05',
      },
      {
        currency: 'KES',
        amountPaid: 50,
        amountRemaining: 2799,
        createdAt: '2020-06-04 15:36',
      },
    ],
  },
];
