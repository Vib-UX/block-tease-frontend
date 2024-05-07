// import { MockUSDABI, PurchaseSubscriptionABI, BatchABI } from '@/constant/abi';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const purchaseSubscriptionAddress =
  '0xF99b791257ab50be7F235BC825E7d4B83942cf38';
const mockUsdAddress = '0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA';
const batchAddress = '0x0000000000000000000000000000000000000808';
const mockUsdAbi = [
  'function balanceOf(address account) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
];
const purchaseSubscriptionAbi = [
  'function subscribeWithToken(uint256 modelId, uint256 subscriptionId, uint256 priceInUsd) external',
];

const batchAbi = [
  'function batchAll(address[] targets, uint256[] values, bytes[] data, uint256[] gasLimits) external returns (bool)',
];
export async function checkBalances() {
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  console.log(signer);
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, provider);

  const subscriptionBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(purchaseSubscriptionAddress),
    8
  );
  const signerBalance = ethers.utils.formatUnits(
    await mockUsd.balanceOf(signerAddress),
    8
  );

  console.log(
    `PurchaseSubscription ${purchaseSubscriptionAddress} has a balance of: ${subscriptionBalance} mUSD`
  );
  console.log(
    `Account ${signerAddress} has a balance of: ${signerBalance} mUSD`
  );
  return { subscriptionBalance, signerBalance };
}

export async function batchSubscribe(modelId, subscriptionId, priceInUsd) {
  await checkBalances();
  const acc = await window.ethereum.enable();
  const signer: any = provider.getSigner(acc[0]);
  console.log(await signer.getAddress());
  const mockUsd = new ethers.Contract(mockUsdAddress, mockUsdAbi, signer);
  console.log(mockUsd, 'mockUsd');
  const purchaseSubscription = new ethers.Contract(
    purchaseSubscriptionAddress,
    purchaseSubscriptionAbi,
    signer
  );
  console.log(purchaseSubscription, 'purchaseSubscription');
  const batch = new ethers.Contract(batchAddress, batchAbi, signer);
  console.log(batch, 'batch');
  const priceInMinUnits = ethers.utils.parseUnits(priceInUsd.toString(), 8);
  console.log(priceInMinUnits, 'priceInMinUnits');
  const approvalCallData = mockUsd.interface.encodeFunctionData('approve', [
    purchaseSubscriptionAddress,
    priceInMinUnits,
  ]);
  console.log(approvalCallData);
  const subscribeCallData = purchaseSubscription.interface.encodeFunctionData(
    'subscribeWithToken',
    [modelId, subscriptionId, priceInMinUnits]
  );
  console.log(subscribeCallData);

  const batchTx = await batch.batchAll(
    [mockUsdAddress, purchaseSubscriptionAddress],
    [],
    [approvalCallData, subscribeCallData],
    []
  );
  await batchTx.wait();
  console.log(`Batch executed for approval and subscription: ${batchTx.hash}`);
  await checkBalances();
}

export const main = async () => {
  await batchSubscribe(4, 3, 2);
};
