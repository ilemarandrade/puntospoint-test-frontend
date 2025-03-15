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
    <div className="space-y-4 mt-16 xl:mt-0">
      <div className="flex justify-between">
        <SwitchCustom onClick={() => {}} />

        <ButtonBase
          className="h-12 w-12 hidden xl:block"
          onClick={toggleCollapse}
        >
          <ArrowBackIosNewRoundedIcon
            fontSize="medium"
            className={` ${!isCollapsed ? '-rotate-[270deg]' : '-rotate-90'}`}
          />
        </ButtonBase>
      </div>
      <div
        className={`h-full ${
          isCollapsed ? 'xl:-space-y-24' : 'xl:space-y-4'
        } flex xl:block gap-4 overflow-x-auto p-2 xl:p-0`}
      >
        {isLoading ? (
          <div className="flex  xl:flex-col gap-4">
            {[...Array(3)].map((_, index) => (
              <CardPulsoSkeleton key={`card-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <>
            {data?.length
              ? data.map((item, index) => (
                  <CardPulso
                    key={`card-${index}`}
                    className={
                      isCollapsed ? `!z-${(index + 1) * 10} relative` : ''
                    }
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
          </>
        )}
      </div>
    </div>
  );
};

export default AsideDashboard;
