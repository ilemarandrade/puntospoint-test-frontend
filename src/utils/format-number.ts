export function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Reemplaza los separadores de miles
}
