import { ethers } from 'ethers';
import nftMarketPlaceAbi from '../constant/nftsMarketPlaceAbi.json';
import batchAbi from '../constant/Batch.json';
import callPermitAbi from '../constant/Precompile.json';
import {
  default as mockUsdAbi,
} from '../constant/MockUSD.json';
import { checkBalances } from '@/lib/func';

const batchAddress = '0x0000000000000000000000000000000000000808';
const precompileAddress = '0x000000000000000000000000000000000000080a';
const nftMarketPlaceAddrMoon = '0xA524319d310fa96AAf6E25F8af729587C2DEaE8a';
const mockUsdAddress = '0xf7409b94F7285d27Ab1A456638A1110A4E55bFEC';

export async function executeSubscriptions(subscriptions: any, provider: any) {

  console.log("Initializing gasless subscription execution process.");

  const thirdPartyGasSigner = new ethers.Wallet(
    process.env.NEXT_PUBLIC_THIRD_PARTY_SIGNER || '',
    provider
  );
  console.log(`Third-party gas signer initialized: ${thirdPartyGasSigner.address}`);
  
  const signer = provider.getSigner();
  const userSigner = await signer.getAddress();
  console.log(`User signer retrieved: ${userSigner}`);
  
  await checkBalances(signer);

  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  const nftMarketPlace = new ethers.Contract(
    nftMarketPlaceAddrMoon, // NFT Marketplace Address
    nftMarketPlaceAbi,
    signer
  );

  const batch = new ethers.Contract(
    batchAddress, // Batch contract address
    batchAbi,
    signer
  );

  const callPermit = new ethers.Contract(
    precompileAddress, // The Call Permit Precompile contract address
    callPermitAbi,
    thirdPartyGasSigner
  );

  const domain = {
    name: 'Call Permit Precompile',
    version: '1',
    chainId: 1287,
    verifyingContract: precompileAddress,
  };

  console.log("Domain for EIP-712 structured data prepared.");

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

  console.log("Types for EIP-712 structured data prepared.");

  // Calculate total amount needed for all subscriptions and approve it
  const totalAmount = subscriptions.reduce(
    (sum, sub) => sum + parseFloat(sub.priceInUsd),
    0
  );
  const totalMinUnits = ethers.utils.parseUnits(totalAmount.toString(), 8);
  console.log(`Total amount for approval calculated: ${totalAmount} USD`);

  const approvalCallData = mockUsd.interface.encodeFunctionData(
    'approve',
    [nftMarketPlaceAddrMoon, totalMinUnits]
  );

  console.log("Approval call data encoded successfully.");

  // Sign and dispatch the total approval using Call Permit Precompile
  let nonce = await callPermit.nonces(userSigner);
  let message = {
    from: userSigner,
    to: mockUsdAddress,
    value: 0,
    data: approvalCallData,
    gaslimit: 24000000,
    nonce,
    deadline: '1714762357000', 
  };

  console.log("Message for total approval prepared, proceeding to sign...");

  let signature = await signer._signTypedData(domain, types, message);
  let formattedSignature = ethers.utils.splitSignature(signature);

  console.log("Signature for total approval obtained, dispatching transaction...");

  let dispatch = await callPermit.dispatch(
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
  console.log(`Total Approval Gasless Transaction completed. Hash: ${dispatch.hash}`);

  // Proceed with subscriptions using batchSome
  const to = [],
    callData = [];

  subscriptions.forEach((sub) => {
    const priceInMinUnits = ethers.utils.parseUnits(
      sub.priceInUsd.toString(),
      8
    );
    const subscribeCallData = nftMarketPlace.interface.encodeFunctionData(
      'purchaseSubscription',
      [sub.modelId, sub.subscriptionId, priceInMinUnits]
    );

    to.push(nftMarketPlaceAddrMoon);
    callData.push(subscribeCallData);
  });

  console.log("Subscription data prepared for batch processing.");

  const batchData = batch.interface.encodeFunctionData('batchSome', [
    to,
    [],
    callData,
    []
  ]);

  nonce = await callPermit.nonces(userSigner);
  message = {
    from: userSigner,
    to: batchAddress,
    value: 0,
    data: batchData,
    gaslimit: 24000000,
    nonce,
    deadline: '1714762357000',
  };

  console.log("Message for batch processing of subscriptions prepared, proceeding to sign...");

  signature = await signer._signTypedData(domain, types, message);
  formattedSignature = ethers.utils.splitSignature(signature);

  console.log("Signature for batch processing obtained, dispatching transaction...");

  dispatch = await callPermit.dispatch(
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
  console.log(`BatchSome Subscription Gasless Transaction completed. Hash: ${dispatch.hash}`);
  await checkBalances(signer);
  return { fromAddr: dispatch.from, dispatch: dispatch.hash };
}
