import { faker } from '@faker-js/faker';
import { eachDayOfInterval, format, getMonth, getYear } from 'date-fns';

export const generateWeeklyData = () => {
  const daysOfWeek = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const adjustedCurrentDay = (currentDay + 6) % 7; // Ajustar para que Lunes sea 0 y Domingo sea 6

  return daysOfWeek.map((day, index) => {
    // Si el índice del día es mayor que el día actual, establecer valores en 0
    if (index > adjustedCurrentDay) {
      return {
        date: day,
        newCustomers: 0,
        purchased: 0,
        notPurchased: 0,
        totalCustomers: 0,
        totalMoney: 0,
        sales: 0,
        returns: 0,
        cashbackGenerated: 0,
        cashbackAccumulated: 0,
        totalCashback: 0,
        transactions: 0,
      };
    }

    // Generar datos normalmente para los días válidos
    return {
      date: day,
      newCustomers: faker.number.int({ min: 200, max: 400 }),
      purchased: faker.number.int({ min: 1000, max: 3000 }),
      notPurchased: faker.number.int({ min: 200, max: 600 }),
      totalCustomers: faker.number.int({ min: 2000, max: 3000 }),
      totalMoney: faker.number.int({ min: 5000000, max: 12000000 }),
      sales: faker.number.int({ min: 1000000, max: 7000000 }),
      returns: faker.number.int({ min: 200000, max: 600000 }),
      cashbackGenerated: faker.number.int({ min: 100000, max: 300000 }),
      cashbackAccumulated: faker.number.int({ min: 100000, max: 1500000 }),
      totalCashback: faker.number.int({ min: 200000, max: 2000000 }),
      transactions: faker.number.int({ min: 800, max: 2000 }),
    };
  });
};

export const generateMonthlyDataLast6Months = () => {
  const currentDate = new Date();
  const data = [];

  for (let i = 0; i < 6; i++) {
    const month = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    data.push({
      date: month.toLocaleString('es-ES', { month: 'long' }),
      newCustomers: faker.number.int({ min: 200, max: 400 }),
      purchased: faker.number.int({ min: 1000, max: 3000 }),
      notPurchased: faker.number.int({ min: 200, max: 600 }),
      totalCustomers: faker.number.int({ min: 2000, max: 3000 }),
      totalMoney: faker.number.int({ min: 5000000, max: 12000000 }),
      sales: faker.number.int({ min: 1000000, max: 7000000 }),
      returns: faker.number.int({ min: 200000, max: 600000 }),
      cashbackGenerated: faker.number.int({ min: 100000, max: 300000 }),
      cashbackAccumulated: faker.number.int({ min: 100000, max: 1500000 }),
      totalCashback: faker.number.int({ min: 200000, max: 2000000 }),
      transactions: faker.number.int({ min: 800, max: 2000 }),
    });
  }

  return data.reverse(); // Para que los meses estén en orden cronológico
};

export const generateYearlyData = () => {
  const currentYear = new Date().getFullYear();
  const data = [];

  for (let year = 2020; year <= currentYear; year++) {
    data.push({
      date: year.toString(), // Año como string
      newCustomers: faker.number.int({ min: 2000, max: 5000 }),
      purchased: faker.number.int({ min: 10000, max: 30000 }),
      notPurchased: faker.number.int({ min: 2000, max: 6000 }),
      totalCustomers: faker.number.int({ min: 5000, max: 10000 }),
      totalMoney: faker.number.int({ min: 10000000, max: 50000000 }),
      sales: faker.number.int({ min: 1000000, max: 7000000 }),
      returns: faker.number.int({ min: 200000, max: 600000 }),
      cashbackGenerated: faker.number.int({ min: 100000, max: 300000 }),
      cashbackAccumulated: faker.number.int({ min: 100000, max: 1500000 }),
      totalCashback: faker.number.int({ min: 200000, max: 2000000 }),
      transactions: faker.number.int({ min: 800, max: 2000 }),
    });
  }

  return data;
};

export const generateHourlyData = (isToday = false) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours(); // Obtener la hora actual (0-23)

  const hours = Array.from({ length: 24 }, (_, index) => index); // Genera un array de 0 a 23

  return hours.map((hour) => {
    // Formatear la hora en AM/PM
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convertir a formato de 12 horas
    const amPm = isPM ? 'pm' : 'am';

    // Si es hoy y la hora es mayor que la hora actual, establecer valores en 0
    if (isToday && hour > currentHour) {
      return {
        date: `${formattedHour}:00 ${amPm}`, // Formato HH:MM AM/PM
        newCustomers: 0,
        purchased: 0,
        notPurchased: 0,
        totalCustomers: 0,
        totalMoney: 0,
        sales: 0,
        returns: 0,
        cashbackGenerated: 0,
        cashbackAccumulated: 0,
        totalCashback: 0,
        transactions: 0,
      };
    }

    // Generar datos normalmente para las horas válidas
    return {
      date: `${formattedHour}:00 ${amPm}`, // Formato HH:MM AM/PM
      newCustomers: faker.number.int({ min: 10, max: 100 }),
      purchased: faker.number.int({ min: 5, max: 50 }),
      notPurchased: faker.number.int({ min: 1, max: 20 }),
      totalCustomers: faker.number.int({ min: 100, max: 500 }),
      totalMoney: faker.number.int({ min: 100000, max: 1000000 }),
      sales: faker.number.int({ min: 1000, max: 10000 }),
      returns: faker.number.int({ min: 100, max: 500 }),
      cashbackGenerated: faker.number.int({ min: 50, max: 300 }),
      cashbackAccumulated: faker.number.int({ min: 50, max: 1500 }),
      totalCashback: faker.number.int({ min: 100, max: 2000 }),
      transactions: faker.number.int({ min: 10, max: 100 }),
    };
  });
};

export const generateAllData = () => {
  return {
    weeklyData: generateWeeklyData(),
    monthlyData: generateMonthlyDataLast6Months(),
    yearlyData: generateYearlyData(),
  };
};

export const generateDailyDataForMonth = (month?: number) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Mes actual (0 = enero, 11 = diciembre)
  const currentDay = currentDate.getDate(); // Día actual

  // Si el mes especificado es mayor que el mes actual, devolver un array vacío
  if (month !== undefined && month > currentMonth) {
    return []; // O puedes usar `return null;` si prefieres
  }

  const targetMonth = month !== undefined ? month : currentMonth; // Si se pasa un mes, usarlo; si no, usar el mes actual
  const daysInMonth = new Date(year, targetMonth + 1, 0).getDate(); // Número de días en el mes
  const data = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, targetMonth, day);
    if (targetMonth === currentMonth && day > currentDay) {
      break;
    } else {
      // Generar datos normalmente
      data.push({
        date: date.toLocaleDateString('es-ES', {
          month: 'long',
          day: 'numeric',
        }),
        newCustomers: faker.number.int({ min: 50, max: 200 }),
        purchased: faker.number.int({ min: 20, max: 100 }),
        notPurchased: faker.number.int({ min: 5, max: 30 }),
        totalCustomers: faker.number.int({ min: 200, max: 500 }),
        totalMoney: faker.number.int({ min: 100000, max: 1000000 }),
        sales: faker.number.int({ min: 1000, max: 10000 }),
        returns: faker.number.int({ min: 100, max: 500 }),
        cashbackGenerated: faker.number.int({ min: 50, max: 300 }),
        cashbackAccumulated: faker.number.int({ min: 50, max: 1500 }),
        totalCashback: faker.number.int({ min: 100, max: 2000 }),
        transactions: faker.number.int({ min: 10, max: 100 }),
      });
    }
  }

  return data;
};

export const generateMonthlyData = (year?: number) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0 = enero, 11 = diciembre

  const data = [];
  const targetYear = year || currentYear; // Si no se pasa un año, usar el año actual

  // Si se pasa un año, generar datos para todos los meses de ese año
  for (let month = 0; month < 12; month++) {
    // Si el año es el actual, solo generar hasta el mes actual
    if (targetYear === currentYear && month > currentMonth) {
      break; // Salir del bucle si se pasa el mes actual
    }

    const date = new Date(targetYear, month, 1);
    data.push({
      date: date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }), // Formato: "octubre de 2023"
      newCustomers: faker.number.int({ min: 50, max: 200 }),
      purchased: faker.number.int({ min: 20, max: 100 }),
      notPurchased: faker.number.int({ min: 5, max: 30 }),
      totalCustomers: faker.number.int({ min: 200, max: 500 }),
      totalMoney: faker.number.int({ min: 100000, max: 1000000 }),
      sales: faker.number.int({ min: 1000, max: 10000 }),
      returns: faker.number.int({ min: 100, max: 500 }),
      cashbackGenerated: faker.number.int({ min: 50, max: 300 }),
      cashbackAccumulated: faker.number.int({ min: 50, max: 1500 }),
      totalCashback: faker.number.int({ min: 100, max: 2000 }),
      transactions: faker.number.int({ min: 10, max: 100 }),
    });
  }

  return data;
};

export const generateMonthlyDataFrom2020To2025 = () => {
  const startYear = 2020;
  const endYear = 2025;
  const data = [];

  for (let year = startYear; year <= endYear; year++) {
    data.push({
      date: year.toString(),
      newCustomers: faker.number.int({ min: 50, max: 200 }),
      purchased: faker.number.int({ min: 20, max: 100 }),
      notPurchased: faker.number.int({ min: 5, max: 30 }),
      totalCustomers: faker.number.int({ min: 200, max: 500 }),
      totalMoney: faker.number.int({ min: 100000, max: 1000000 }),
      sales: faker.number.int({ min: 1000, max: 10000 }),
      returns: faker.number.int({ min: 100, max: 500 }),
      cashbackGenerated: faker.number.int({ min: 50, max: 300 }),
      cashbackAccumulated: faker.number.int({ min: 50, max: 1500 }),
      totalCashback: faker.number.int({ min: 100, max: 2000 }),
      transactions: faker.number.int({ min: 10, max: 100 }),
    });
  }

  return data;
};

export const generateMonthlyDataByRange = (from: Date, to: Date) => {
  const data = [];

  const startYear = getYear(from);
  const startMonth = getMonth(from); // 0-11
  const endYear = getYear(to);
  const endMonth = getMonth(to); // 0-11

  for (let year = startYear; year <= endYear; year++) {
    const monthStart = year === startYear ? startMonth : 0;
    const monthEnd = year === endYear ? endMonth : 11;

    for (let month = monthStart; month <= monthEnd; month++) {
      const date = new Date(year, month, 1);
      data.push({
        date: date,
        newCustomers: faker.number.int({ min: 50, max: 200 }),
        purchased: faker.number.int({ min: 20, max: 100 }),
        notPurchased: faker.number.int({ min: 5, max: 30 }),
        totalCustomers: faker.number.int({ min: 200, max: 500 }),
        totalMoney: faker.number.int({ min: 100000, max: 1000000 }),
        sales: faker.number.int({ min: 1000, max: 10000 }),
        returns: faker.number.int({ min: 100, max: 500 }),
        cashbackGenerated: faker.number.int({ min: 50, max: 300 }),
        cashbackAccumulated: faker.number.int({ min: 50, max: 1500 }),
        totalCashback: faker.number.int({ min: 100, max: 2000 }),
        transactions: faker.number.int({ min: 10, max: 100 }),
        invoiced: [
          {
            date: new Date(date.setDate(1)),
            amount: 1000,
          },
          {
            date: new Date(date.setDate(10)),
            amount: 1000,
          },
          {
            date: new Date(date.setDate(20)),
            amount: 1000,
          },
        ],
      });
    }
  }

  return data.reverse();
};
export const generateCustomData = (startDate?: Date, endDate?: Date) => {
  if (!startDate || !endDate) return [];

  if (startDate > endDate) {
    const temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const dailyData = days.map((day) => {
    const formattedDate = format(day, 'dd-MM-yyyy');

    return {
      date: formattedDate,
      newCustomers: faker.number.int({ min: 10, max: 100 }),
      purchased: faker.number.int({ min: 5, max: 50 }),
      notPurchased: faker.number.int({ min: 1, max: 20 }),
      totalCustomers: faker.number.int({ min: 100, max: 500 }),
      totalMoney: faker.number.int({ min: 100000, max: 1000000 }),
      sales: faker.number.int({ min: 1000, max: 10000 }),
      returns: faker.number.int({ min: 100, max: 500 }),
      cashbackGenerated: faker.number.int({ min: 50, max: 300 }),
      cashbackAccumulated: faker.number.int({ min: 50, max: 1500 }),
      totalCashback: faker.number.int({ min: 100, max: 2000 }),
      transactions: faker.number.int({ min: 10, max: 100 }),
    };
  });

  return dailyData;
};
