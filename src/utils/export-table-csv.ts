type typeBody = string | number;

export const exportTableCsv = ({
  headers,
  body,
}: {
  headers: string[];
  body: typeBody[][];
}) => {
  const csvContent = [headers.join(','), ...body].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'datos_ventas.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
