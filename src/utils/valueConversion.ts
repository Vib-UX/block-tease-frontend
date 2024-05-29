export function usdcToEth(usdcAmount: number) {
  const conversionRate = 0.00045; // 1 USDC = 0.00045 ETH
  const ethAmount = usdcAmount * conversionRate;
  return parseFloat(ethAmount.toFixed(3));
}
export function usdcToAvax(usdcAmount: number) {
  const conversionRate = 0.029; // 1 USDC = 0.029 AVAX
  const avaxAmount = usdcAmount * conversionRate;
  return parseFloat(avaxAmount.toFixed(3));
}

export function usdcToWeth(usdcAmount: number) {
  const conversionRate = 0.000325; // 1 USDC = 0.000325 WETH
  const wethAmount = usdcAmount * conversionRate;
  return parseFloat(wethAmount.toFixed(4));
}
