# Yescrow - a smart contract escrow agent. 

Yescrow is a smart contract to build trust between online strangers. 

We are a centralized middleman - Yescrow will start its decentralization after escrowing 1,000 ETH.

All addresses that interacted with the contract before that will be airdropped DAO governance tokens.

**Less scams = More fun**

## Contact, requests and feedback

crow@yescrow.io

<a href="t.me/sunsakis">Telegram</a>

<a href="twitter.com/yescrowio">Twitter</a>

## Smart contract functions

```
function createDepositETH( address _seller )
```
```
 function createDepositERC20( address _seller, address _token, uint256 _amount )
```
```
 function createDepositERC721( address _seller, address _token, uint256[] calldata _tokenIds )
```
```
function releaseDeposit( uint256 _id )
```
```
function intervene( uint256 _id, address _to ) onlyOwner
```

## Getting Started

This is a [Next.js](https://nextjs.org/) interface bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Install the dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

