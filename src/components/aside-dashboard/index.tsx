'use client';

import { useState } from 'react';
import CardPulso from '../card-pulso';
import { data } from '../recharts/main-recharts/data-mock';
import SwitchCustom from '../switch-custom';
import { ButtonBase } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const AsideDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="space-y-4 ">
      <div className="flex justify-between">
        <SwitchCustom onClick={() => {}} />

        <ButtonBase className="h-12 w-12" onClick={toggleCollapse}>
          <ArrowBackIosNewRoundedIcon
            fontSize="medium"
            className={` ${!isCollapsed ? '-rotate-[270deg]' : '-rotate-90'}`}
          />
        </ButtonBase>
      </div>
      <div
        className={`space-y-4 h-full ${
          isCollapsed ? '-space-y-24' : 'space-y-4'
        }`}
      >
        {data
          .filter((_, index) => index < 3)
          .map((item, index) => (
            <CardPulso
              key={`card-${index}`}
              className={isCollapsed ? `!z-${(index + 1) * 10} relative` : ''}
              data={{
                date: new Date('2023-10-01T04:00:00Z'),
                clients: item.totalCustomers,
                totalSales: item.totalMoney,
                totalAmount: item.totalMoney,
                cashbackAccumulated: item.cashbackAccumulated,
                invoiced: [
                  {
                    date: new Date('2023-09-15T04:00:00Z'),
                    amount: 1000,
                  },
                  {
                    date: new Date('2023-09-15T04:00:00Z'),
                    amount: 1000,
                  },
                  {
                    date: new Date('2023-09-15T04:00:00Z'),
                    amount: 1000,
                  },
                ],
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default AsideDashboard;
