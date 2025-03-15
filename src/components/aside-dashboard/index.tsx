'use client';

import { useState } from 'react';
import CardPulso from '../card-pulso';
import SwitchCustom from '../switch-custom';
import { ButtonBase } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import useGetMovements from '@/hooks/use-get-movements';
import { EnumFiltersTags } from '@/types/filters';
import CardPulsoSkeleton from '../card-pulso/card-pulso-skeleton';
import { subMonths } from 'date-fns';

const filters = {
  tags: [
    EnumFiltersTags.CLIENTS,
    EnumFiltersTags.MONEY,
    EnumFiltersTags.TRANSACTIONS,
    EnumFiltersTags.CASHBACK,
  ],
  from: subMonths(new Date(), 3),
  to: new Date(),
};

const AsideDashboard = () => {
  const { data, isLoading } = useGetMovements({
    filters,
  });

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

        {isLoading && (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, index) => (
              <CardPulsoSkeleton key={`card-skeleton-${index}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AsideDashboard;
