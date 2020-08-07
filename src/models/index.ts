export const fetchAllCountries = async () => [
  {
    id: 1,
    title: 'Kitisuru',
  },
  {
    id: 2,
    title: 'Roysambu',
  },
  {
    id: 3,
    title: 'Buruburu',
  },
  {
    id: 4,
    title: 'Embakasi',
  },
  {
    id: 5,
    title: 'Westlands',
  }
];

export const fetchAllProducts = async () => [
  {
    id: 1,
    countryId: 1,
    title: 'Choco choco giftbox 🍫🍫',
    description:
`*What is in the box*
♡1pc Hershey's
♡1pc Kinder bueno chocolate
♡6pcs mini Cadbury chocolate
♡3pcs Twix
♡3pcs Mars
♡16pcs Alpens candy

*Pricing*
Box - *Ksh 1430*
Birthday Card - *Ksh 200*

*Contact*
DM - *0758806808*
IG - *https://www.instagram.com/be_vante/*`,
    image: 'https://i.pinimg.com/564x/b8/8c/36/b88c3622a56fba25638aa15bd161ba2e.jpg',
  },
  {
    id: 2,
    countryId: 1,
    title: 'Donuts Series box C 🍩🍩',
    description:
`*What's in it?*
♡6pcs donuts
♡1pc Hershey's
♡1pc kitkat
♡1pc Cadbury large black forest chocolate
♡1pc Cadbury egg
♡7pcs Alpens candy
♡3pcs Walker's Toffee

*Pricing*
Box - *Ksh 1,845*

*Contact*
DM - *0758806808*
IG - *https://www.instagram.com/be_vante/*`,
    image: 'https://i.pinimg.com/564x/e8/91/1d/e8911d7d31e88364c22a2cf66fa965cf.jpg',
  },
  {
    id: 3,
    countryId: 2,
    title: 'Hijab bouquet 🧕🏾🧕🏾',
    description:
`*What's in it for you?*
- 2 beautifully wrapped Hijabs.

*Pricing*
Box - *Ksh 1,700*`,
    image: 'https://i.pinimg.com/564x/56/e0/4d/56e04d6083bcfa2161c4eb64ac65f745.jpg',
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
    {
    id: 5,
    countryId: 5,
    title: 'Cookies and Brownies series 🍪🍪',
    description:
    `*Available flavors*
    ♡ Chocolate chunk
    ♡ Salted Caramel
    ♡ Chocolate chunk
    ♡ Mint chocolate chunk
    ♡ Peanut butter chocolate chunk
    ♡ Coffee chocolate chunk
    ♡ Coconut chocolate chunk.

    *Pricing*
    Box - *Ksh 1430*
    Birthday Card - *Ksh 200*

    *Contact*
    DM - *0758806808*
    IG - *https://www.instagram.com/be_vante/*

    *Pricing*
        Box - *Ksh 1430*
        Birthday Card - *Ksh 200*

    *Remember to order 24 Hrs prior 😊*`,
        image: 'https://i.pinimg.com/564x/b8/8c/36/b88c3622a56fba25638aa15bd161ba2e.jpg',
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
