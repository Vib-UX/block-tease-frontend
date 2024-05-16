// import { MockUSDABI, PurchaseSubscriptionABI, BatchABI } from '@/constant/abi';
import { ethers } from 'ethers';

import { moonbase } from '@/app/Providers';

import batchAbi from '../constant/Batch.json';
import mockUsdAbi from '../constant/MockUSD.json';
import nftAbi from '../constant/nft.json';
import nftMarketPlaceSepoliaAbi from '../constant/NftMarketPlaceSepolia.json';
import NftsMarketPlaceMoonAbi from '../constant/nftsMarketPlaceAbi.json';
import precompileAbi from '../constant/Precompile.json';
import purchaseSubscriptionAbi from '../constant/PurchaseSubscription.json';
//const provider = new ethers.providers.Web3Provider(window.ethereum);

const purchaseSubscriptionAddress =
  '0xF99b791257ab50be7F235BC825E7d4B83942cf38';
const purchaseSubscriptionAddressMorph =
  '0xF99b791257ab50be7F235BC825E7d4B83942cf38';
const mockUsdAddress = '0xf7409b94F7285d27Ab1A456638A1110A4E55bFEC';
const batchAddress = '0x0000000000000000000000000000000000000808';
const precompileAddress = '0x000000000000000000000000000000000000080a';
const nftMarketPlaceAddrMoon = '0x8208834c529664385fd2CA735EFB64a41d79823b';
const nftMarketPlaceAddrSepolia = '0xc36B6BFa0ce8C6bdD8efcCd23CeC2E425768f64a';
const nft = '0x12B77FEb2c44dC16d57d96a1FedEd3136Ad02FBB';
type minitingNftProps = {
  modelId: number;
  fromAddr: string;
  subscriptionId: number;
  duration: number;
};
type batchSubscribeProps = {
  modelId: number;
  subscriptionId: number;
  priceInUsd: number;
  provider: any;
};
type approveNSubscribeProps = {
  priceInUsd: number;
  provider: any;
};

export async function mintingNft({
  modelId,
  subscriptionId,
  duration,
  fromAddr,
}: minitingNftProps) {
  const customNetwork = {
    name: 'ETH Sepolia',
    chainId: 11155111,
    url: 'https://sepolia.infura.io/v3/e00483b0387b4f9e909acbb3f1a7172e',
  };
  const nftProvider = new ethers.providers.JsonRpcProvider(customNetwork.url);
  console.log(nftProvider);
  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    nftProvider
  );
  console.log(thirdPartyGasSigner);
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrSepolia,
    nftMarketPlaceSepoliaAbi,
    thirdPartyGasSigner
  );
  console.log(nftMarketPlace);

  const txResponse = await nftMarketPlace.mintUnsafe(
    modelId,
    subscriptionId,
    duration,
    fromAddr
  );
  console.log(txResponse);
  const resp = await txResponse.wait();
  console.log(resp);
  return { trxHash: resp.transactionHash };
}
export async function checkBalances(provider: any) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  console.log(signer);
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, provider);

  const subscriptionBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(nftMarketPlaceAddrMoon),
    8
  );
  const signerBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(signerAddress),
    8
  );

  console.log(
    `PurchaseSubscription ${nftMarketPlaceAddrMoon} has a balance of: ${subscriptionBalance} mUSD`
  );
  console.log(
    `Account ${signerAddress} has a balance of: ${signerBalance} mUSD`
  );
  return { subscriptionBalance, signerBalance };
}
// export async function batchSubscribe({
//   modelId,
//   subscriptionId,
//   priceInUsd,
//   provider,
// }: batchSubscribeProps) {
//   await checkBalances(provider);

//   const thirdPartyGasSigner = new ethers.Wallet(
//     process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
//     provider
//   );

//   console.log(thirdPartyGasSigner);
//   const domain = {
//     name: 'Call Permit Precompile',
//     version: '1',
//     chainId: 1287,
//     verifyingContract: precompileAddress,
//   };

//   const types = {
//     CallPermit: [
//       { name: 'from', type: 'address' },
//       { name: 'to', type: 'address' },
//       { name: 'value', type: 'uint256' },
//       { name: 'data', type: 'bytes' },
//       { name: 'gaslimit', type: 'uint64' },
//       { name: 'nonce', type: 'uint256' },
//       { name: 'deadline', type: 'uint256' },
//     ],
//   };

//   const signer = provider.getSigner();

//   const userSigner = signer.getAddress();
//   const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);

//   const purchaseSubscription = new ethers.Contract(
//     purchaseSubscriptionAddress,
//     purchaseSubscriptionAbi,
//     signer
//   );

//   const batch = new ethers.Contract(batchAddress, batchAbi, signer);

//   const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);

//   const approvalCallData = mockUsd.interface.encodeFunctionData('approve', [
//     purchaseSubscriptionAddress,
//     priceInMinUnits,
//   ]);
//   //rename to purchaase subs data
//   const subscribeCallData = purchaseSubscription.interface.encodeFunctionData(
//     'subscribeWithToken', //puracseSubscrition call this
//     [modelId, subscriptionId, priceInMinUnits] // send this m,s,duration
//   );

//   const batchInterface = new ethers.utils.Interface(batchAbi);
//   const data = batchInterface.encodeFunctionData('batchAll', [
//     [mockUsdAddress, purchaseSubscriptionAddress], //nftmarketplaceaddr
//     [],
//     [approvalCallData, subscribeCallData],
//     [],
//   ]);

//   const callPermit = new ethers.Contract(
//     precompileAddress, // Call Permit contract
//     precompileAbi,
//     thirdPartyGasSigner
//   );

//   const nonce = await callPermit.nonces(userSigner);

//   const gasLimit = 24000000;
//   const message = {
//     from: (await provider.getSigner().getAddress()).toString(),
//     to: batchAddress, // BatchAddress
//     value: 0,
//     data,
//     gaslimit: gasLimit,
//     nonce,
//     deadline: '1714762357000', // Randomly created deadline in the future
//   };

//   const signature = await provider
//     .getSigner()
//     ._signTypedData(domain, types, message);
//   console.log(`Signature hash: ${signature}`);

//   const formattedSignature = ethers.utils.splitSignature(signature);

//   // This gets dispatched using the dApps signer
//   const dispatch = await callPermit.dispatch(
//     message.from,
//     message.to,
//     message.value,
//     message.data,
//     message.gaslimit,
//     message.deadline,
//     formattedSignature.v.toString(),
//     formattedSignature.r,
//     formattedSignature.s
//   );

//   await dispatch.wait();
//   console.log(`Gasless Batch Precompile Transaction hash: ${dispatch.hash}`);

//   await checkBalances(provider);
//   return { fromAddr: dispatch.from, dispatch: dispatch.hash };
// }
export async function batchSubscribeFor({
  modelId,
  subscriptionId,
  priceInUsd,
  provider,
}: batchSubscribeProps) {
  await checkBalances(provider);

  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  console.log(thirdPartyGasSigner);
  const domain = {
    name: 'Call Permit Precompile',
    version: '1',
    chainId: 1287,
    verifyingContract: precompileAddress,
  };
  const types = {
    CallPermit: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'gaslimit', type: 'uint64' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };
  const signer = provider.getSigner();

  const userSigner = signer.getAddress();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  //1 -> replace purchase subs with nft marketplace
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrMoon,
    NftsMarketPlaceMoonAbi,
    signer
  );
  const batch = new ethers.Contract(batchAddress, batchAbi, signer);
  const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);
  const approvalCallData = mockUsd.interface.encodeFunctionData('approve', [
    nftMarketPlaceAddrMoon,
    priceInMinUnits,
  ]);
  // const approvalCallData = mockUsd.interface.encodeFunctionData(
  //   'purchaseSubscription',
  //   [nftMarketPlaceAddrMoon, priceInMinUnits]
  // );
  const subscribeCallData = nftMarketPlace.interface.encodeFunctionData(
    'purchaseSubscription', //puracseSubscrition call this
    [modelId, subscriptionId, priceInMinUnits] // send this m,s,duration
  );
  const batchInterface = new ethers.utils.Interface(batchAbi);
  const data = batchInterface.encodeFunctionData('batchAll', [
    [mockUsdAddress, nftMarketPlaceAddrMoon], //nftmarketplaceaddr
    [],
    [approvalCallData, subscribeCallData],
    [],
  ]);
  const callPermit = new ethers.Contract(
    precompileAddress, // Call Permit contract
    precompileAbi,
    thirdPartyGasSigner
  );
  const nonce = await callPermit.nonces(userSigner);

  const gasLimit = 24000000;
  const message = {
    from: (await provider.getSigner().getAddress()).toString(),
    to: batchAddress, // BatchAddress
    value: 0,
    data,
    gaslimit: gasLimit,
    nonce,
    deadline: '1714762357000', // Randomly created deadline in the future
  };

  const signature = await provider
    .getSigner()
    ._signTypedData(domain, types, message);
  console.log(`Signature hash: ${signature}`);

  const formattedSignature = ethers.utils.splitSignature(signature);

  // This gets dispatched using the dApps signer
  const dispatch = await callPermit.dispatch(
    message.from,
    message.to,
    message.value,
    message.data,
    message.gaslimit,
    message.deadline,
    formattedSignature.v.toString(),
    formattedSignature.r,
    formattedSignature.s
  );

  await dispatch.wait();
  console.log(`Gasless Batch Precompile Transaction hash: ${dispatch.hash}`);

  await checkBalances(provider);
  return { fromAddr: dispatch.from, dispatch: dispatch.hash };
}
//apporve on morphs and subscribe
export async function approveNSubscribe({
  provider,
  priceInUsd,
}: approveNSubscribeProps) {
  const signer = provider.getSigner();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  const purchaseSubscription = new ethers.Contract(
    purchaseSubscriptionAddress,
    purchaseSubscriptionAbi,
    signer
  );
  const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);
  const approve = await mockUsd.approve(
    purchaseSubscriptionAddressMorph.toString(),
    priceInMinUnits
  );
  await approve.wait();
  console.log(`Approval hash: ${approve.hash}`);
  const Subscribe = await purchaseSubscription.subscribeWithToken(
    4,
    3,
    priceInMinUnits
  );
  const res = await Subscribe.wait();
  console.log(res);
  return { fromAddr: res.from, hash: res.transactionHash };
}
export async function getModalPayment(id: number) {
  const nftProvider = new ethers.providers.JsonRpcProvider(moonbase.rpcUrl);
  const thirdPartyProvider = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    nftProvider
  );
  const mockUsd = new ethers.Contract(
    nftMarketPlaceAddrMoon,
    NftsMarketPlaceMoonAbi,
    thirdPartyProvider
  );
  const modelBalance = await mockUsd.models(id);
  const modelBalanceValue = ethers.utils.formatUnits(modelBalance.priceUSD, 8);
  return modelBalanceValue;
}
export async function checkUserBalance(provider: any) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, provider);
  const signerBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(signerAddress),
    8
  );
  return { signerBalance, signerAddress };
}
export async function getTestFunds(provider: any) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const thirdPartyProvider = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  console.log(thirdPartyProvider);
  const mockUsd = new ethers.Contract(
    mockUsdAddress,
    mockUsdAbi,
    thirdPartyProvider
  );
  const trx = await mockUsd.transfer(signerAddress, 1000e8);
  return { trxhash: trx.hash };
}
export async function balanceOffModel(provider: any, modelId: string) {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const nftUsd = new ethers.Contract(nft, nftAbi, provider);
  const checkBalance = await nftUsd.balanceOf(
    signerAddress,
    localStorage.getItem(modelId) || ''
  );

  const BalanceValue = parseInt(checkBalance._hex, 16);

  return BalanceValue > 0;
}
export async function batchList(
  provider: any,
  tokenId: string | null,
  priceInUsd: number
) {
  await checkBalances(provider);
  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  console.log(thirdPartyGasSigner);
  const domain = {
    name: 'Call Permit Precompile',
    version: '1',
    chainId: 1287,
    verifyingContract: precompileAddress,
  };
  const types = {
    CallPermit: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'gaslimit', type: 'uint64' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };
  const signer = provider.getSigner();

  const userSigner = signer.getAddress();
  const listNft = new ethers.Contract(nft, nftAbi, signer);
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrMoon,
    NftsMarketPlaceMoonAbi,
    signer
  );
  const batch = new ethers.Contract(batchAddress, batchAbi, signer);
  const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);
  console.log(priceInMinUnits);
  const approvalCallData = listNft.interface.encodeFunctionData(
    'setApprovalForAll',
    [nftMarketPlaceAddrMoon, true]
  );
  console.log(approvalCallData);
  const listCallData = nftMarketPlace.interface.encodeFunctionData('listNFT', [
    tokenId,
    priceInMinUnits,
  ]);
  console.log(listCallData);
  const batchInterface = new ethers.utils.Interface(batchAbi);
  const data = batchInterface.encodeFunctionData('batchAll', [
    [nft, nftMarketPlaceAddrMoon], //nftmarketplaceaddr
    [],
    [approvalCallData, listCallData],
    [],
  ]);
  const callPermit = new ethers.Contract(
    precompileAddress, // Call Permit contract
    precompileAbi,
    thirdPartyGasSigner
  );
  const nonce = await callPermit.nonces(userSigner);

  const gasLimit = 24000000;
  const message = {
    from: (await provider.getSigner().getAddress()).toString(),
    to: batchAddress, // BatchAddress
    value: 0,
    data,
    gaslimit: gasLimit,
    nonce,
    deadline: '1714762357000', // Randomly created deadline in the future
  };

  const signature = await provider
    .getSigner()
    ._signTypedData(domain, types, message);
  console.log(`Signature hash: ${signature}`);

  const formattedSignature = ethers.utils.splitSignature(signature);

  // This gets dispatched using the dApps signer
  const dispatch = await callPermit.dispatch(
    message.from,
    message.to,
    message.value,
    message.data,
    message.gaslimit,
    message.deadline,
    formattedSignature.v.toString(),
    formattedSignature.r,
    formattedSignature.s
  );

  await dispatch.wait();
  console.log(dispatch);
  console.log(`Gasless Batch Precompile Transaction hash: ${dispatch.hash}`);

  await checkBalances(provider);
  return { fromAddr: dispatch.from, dispatch: dispatch.hash };
}
export async function BuyNft(provider: any, tokenId: any) {
  console.log(tokenId);
  await checkBalances(provider);
  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  console.log(thirdPartyGasSigner);
  const domain = {
    name: 'Call Permit Precompile',
    version: '1',
    chainId: 1287,
    verifyingContract: precompileAddress,
  };
  const types = {
    CallPermit: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'gaslimit', type: 'uint64' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };
  const signer = provider.getSigner();

  const userSigner = signer.getAddress();
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  //1 -> replace purchase subs with nft marketplace
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrMoon,
    NftsMarketPlaceMoonAbi,
    signer
  );
  const batch = new ethers.Contract(batchAddress, batchAbi, signer);
  const listingPrice = new ethers.Contract(
    nftMarketPlaceAddrMoon,
    NftsMarketPlaceMoonAbi,
    thirdPartyGasSigner
  );
  const resp = await listingPrice.listings('4000000496299419492');
  const price = await resp.price;
  console.log(price);
  const approvalCallData = mockUsd.interface.encodeFunctionData('approve', [
    nftMarketPlaceAddrMoon,
    price,
  ]);
  const buyNFT = nftMarketPlace.interface.encodeFunctionData(
    'buyNFTWithUSDC', //puracseSubscrition call this
    [tokenId] // tokenid
  );
  const batchInterface = new ethers.utils.Interface(batchAbi);
  const data = batchInterface.encodeFunctionData('batchAll', [
    [mockUsdAddress, nftMarketPlaceAddrMoon], //nftmarketplaceaddr
    [],
    [approvalCallData, buyNFT],
    [],
  ]);
  const callPermit = new ethers.Contract(
    precompileAddress, // Call Permit contract
    precompileAbi,
    thirdPartyGasSigner
  );
  const nonce = await callPermit.nonces(userSigner);

  const gasLimit = 24000000;
  const message = {
    from: (await provider.getSigner().getAddress()).toString(),
    to: batchAddress, // BatchAddress
    value: 0,
    data,
    gaslimit: gasLimit,
    nonce,
    deadline: '1714762357000', // Randomly created deadline in the future
  };

  const signature = await provider
    .getSigner()
    ._signTypedData(domain, types, message);
  console.log(`Signature hash: ${signature}`);

  const formattedSignature = ethers.utils.splitSignature(signature);

  // This gets dispatched using the dApps signer
  const dispatch = await callPermit.dispatch(
    message.from,
    message.to,
    message.value,
    message.data,
    message.gaslimit,
    message.deadline,
    formattedSignature.v.toString(),
    formattedSignature.r,
    formattedSignature.s
  );

  await dispatch.wait();
  console.log(`Gasless Batch Precompile Transaction hash: ${dispatch.hash}`);

  await checkBalances(provider);
  return { fromAddr: dispatch.from, dispatch: dispatch.hash };
}
