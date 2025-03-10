'use client';

import { useState } from 'react';
import CardPulso from '../card-pulso';
import SwitchCustom from '../switch-custom';
import { ButtonBase } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import useGetMovements from '@/hooks/use-get-movements';
import { EnumFiltersTags, EnumThisMonthSubParameters } from '@/types/filters';

const AsideDashboard = () => {
  const { data } = useGetMovements({
    filters: {
      tags: [
        EnumFiltersTags.CLIENTS,
        EnumFiltersTags.MONEY,
        EnumFiltersTags.TRANSACTIONS,
        EnumFiltersTags.CASHBACK,
      ],
      from: EnumThisMonthSubParameters.MARCH,
      to: EnumThisMonthSubParameters.MAY,
    },
  });

  console.log({ data });

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
      <div className={`h-full ${isCollapsed ? '-space-y-24' : 'space-y-4'}`}>
        {data?.length
          ? data.map((item, index) => (
              <CardPulso
                key={`card-${index}`}
                className={isCollapsed ? `!z-${(index + 1) * 10} relative` : ''}
                data={{
                  date: new Date(item.date),
                  clients: item.totalCustomers,
                  totalSales: item.totalMoney,
                  totalAmount: item.totalMoney,
                  cashbackAccumulated: item.cashbackAccumulated,
                  invoiced: item.invoiced,
                }}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default AsideDashboard;
