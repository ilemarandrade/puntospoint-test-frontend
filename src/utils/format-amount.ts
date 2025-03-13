const formatAmount = (amount: number) => {
  const value = Number(amount);
  return value >= 1000000
    ? `$${(value / 1000000).toFixed(0)}M`
    : `$${value.toLocaleString()}`;
};

export default formatAmount;
