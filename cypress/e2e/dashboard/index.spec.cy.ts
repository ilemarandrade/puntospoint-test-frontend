import { IMovementsData } from '@/types/recharts';
import {
  filtersByDates,
  filterTags,
} from '../../../src/constants/filters-options';
import {
  EnumDateMainParameters,
  EnumFiltersTags,
} from '../../../src/types/filters';
import { formatNumber } from '../../../src/utils/format-number';
import { format } from 'date-fns';
import {
  columnsCashback,
  columnsClients,
  columnsDate,
  columnsMoney,
  columnsTransactions,
} from '../../../src/constants/tables/columns';

describe('Dashboard Filters', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display all date filter parameters', () => {
    filtersByDates.forEach((filter) => {
      cy.findByRole('button', { name: filter.label }).should('be.visible');
    });
  });

  it('Should display the corresponding subparameters for the selected filter', () => {
    filtersByDates.forEach((filter) => {
      const parameters = cy
        .findByRole('button', { name: filter.label })
        .should('be.visible');

      parameters.click();

      if (filter.parameter === EnumDateMainParameters.CUSTOM) {
        cy.findByTestId('date-picker').should('be.visible');
      } else {
        filter.subParameters?.forEach((currentSubParameter) => {
          cy.findByRole('button', { name: currentSubParameter.label }).should(
            'be.visible'
          );
        });
      }
    });
  });

  it('Should show tags in the filters', () => {
    filterTags.firstGroup.forEach((currentTag) => {
      cy.findByRole('button', { name: currentTag.label });
    });

    filterTags.secondGroup.forEach((currentTag) => {
      cy.findByRole('button', { name: currentTag.label });
    });
  });

  it('Should trigger API requests with the correct parameters ans subparameter when filters are clicked', () => {
    cy.intercept('GET', '/api/movements*').as('getMovements');

    cy.wait('@getMovements');

    filtersByDates.forEach((filter) => {
      if (
        filter.parameter !== EnumDateMainParameters.CUSTOM &&
        filter.parameter !== EnumDateMainParameters.YTD_YTG
      ) {
        cy.findByRole('button', { name: filter.label }).click();

        cy.wait('@getMovements').then((interception) => {
          expect(interception.request.url).to.include(
            `parameter=${filter.parameter}`
          );
        });

        if (filter.subParameters) {
          filter.subParameters.forEach((subParameter) => {
            if (subParameter.name !== 'ALL') {
              cy.findByRole('button', { name: subParameter.label }).click();

              cy.wait('@getMovements').then((interception) => {
                expect(interception.request.url).to.include(
                  `parameter=${filter.parameter}`
                );
                expect(interception.request.url).to.include(
                  `subParameter=${subParameter.name}`
                );
              });
            }
          });
        }
      }
    });

    cy.findByRole('button', {
      name: filtersByDates.find(
        (filter) => filter.parameter === EnumDateMainParameters.YTD_YTG
      )?.label,
    }).click();

    cy.wait('@getMovements').then((interception) => {
      expect(interception.request.url).to.include(
        `parameter=${EnumDateMainParameters.YTD_YTG}`
      );
      expect(interception.request.url).to.include(
        `tags=${EnumFiltersTags.MONEY}`
      );
    });
  });

  it('Should trigger API requests with the correct tag when tags button are clicked', () => {
    cy.intercept('GET', '/api/movements?parameter*').as('getMovements');

    filterTags.secondGroup.forEach((currentTag) => {
      cy.findByRole('button', { name: currentTag.label }).click();

      cy.wait('@getMovements').then((interception) => {
        expect(interception.request.url).to.include(`tags=${currentTag.value}`);
      });
    });

    cy.findByRole('button', { name: filterTags.firstGroup[1].label }).click();

    cy.wait('@getMovements').then((interception) => {
      expect(interception.request.url).to.include(
        `tags=${filterTags.firstGroup[1].value}`
      );
    });
  });
});

describe('Aside Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('GET', '/api/movements?from*').as('getMovements');
  });

  it('Should render movements data correctly in CardPulso components', () => {
    cy.wait('@getMovements').then((interception) => {
      const responseData: { data: IMovementsData[] } = JSON.parse(
        interception.response.body
      );

      responseData.data.forEach((movement, index) => {
        const dateTitle = new Date(movement.date);
        cy.contains(
          dateTitle.toLocaleDateString('es-ES', { month: 'long' })
        ).should('be.visible');

        cy.findAllByTestId('card-pulso-client')
          .eq(index)
          .findByText('Clientes')
          .should('be.visible');

        cy.findAllByTestId('card-pulso-client')
          .eq(index)
          .findByText(formatNumber(movement.totalCustomers))
          .should('be.visible');

        cy.findAllByTestId('card-pulso-sale')
          .eq(index)
          .findByText('Ventas Totales')
          .should('be.visible');

        cy.findAllByTestId('card-pulso-sale')
          .eq(index)
          .findByText(formatNumber(movement.sales))
          .should('be.visible');

        cy.findAllByTestId('card-pulso-amount')
          .eq(index)
          .findByText(`Monto Total`)
          .should('be.visible');

        cy.findAllByTestId('card-pulso-amount')
          .eq(index)
          .findByText(`$${formatNumber(movement.totalMoney)}`)
          .should('be.visible');

        cy.findAllByTestId('card-pulso-accumulated')
          .eq(index)
          .findByText(`Acumulado`)
          .should('be.visible');

        cy.findAllByTestId('card-pulso-accumulated')
          .eq(index)
          .findByText(`$${formatNumber(movement.cashbackAccumulated)}`)
          .should('be.visible');

        // Validar las facturas
        movement.invoiced?.forEach((invoice, invoiceIndex) => {
          cy.findAllByTestId('card-pulso-invoice')
            .eq(index * 3 + invoiceIndex)
            .findByText(`Facturado ${format(invoice.date, 'dd/MM')}`)
            .should('be.visible');

          cy.findAllByTestId('card-pulso-invoice')
            .eq(index * 3 + invoiceIndex)
            .findByText(`$${formatNumber(invoice.amount)}`)
            .should('be.visible');
        });
      });
    });
  });
});

const columnsByTag = {
  clients: columnsClients,
  transactions: columnsTransactions,
  money: columnsMoney,
  cashback: columnsCashback,
  date: columnsDate,
};

describe('Tables based in tags filters', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('GET', '/api/movements?parame*').as('getMovements');
  });

  it('Should display the correct table based on the selected tag', () => {
    filterTags.secondGroup.forEach((currentTag) => {
      cy.findByRole('button', { name: currentTag.label }).click();

      cy.wait('@getMovements').then((interception) => {
        const responseData: { data: IMovementsData[] } = JSON.parse(
          interception.response.body
        );
        const limitedData = responseData.data.slice(0, 10);

        cy.findByTestId(`table-${currentTag.dataTestid}`).should('be.visible');

        cy.get(
          `div[data-testid="table-${currentTag.dataTestid}"] table tbody tr`
        ).should('have.length.lte', 10);

        limitedData.forEach((movement, index) => {
          cy.get(
            `div[data-testid="table-${currentTag.dataTestid}"] table tbody tr`
          )
            .eq(index)
            .within(() => {
              columnsByTag[currentTag.dataTestid as any].forEach(
                (column, index) => {
                  cy.get('td')
                    .eq(index)
                    .should(
                      'have.text',
                      column.render
                        ? column.render(movement)
                        : movement[column.keyAccessor]
                    );
                }
              );
            });
        });

        cy.get(`div[data-testid="table-date"] table tbody tr`).should(
          'have.length.lte',
          10
        );

        limitedData.forEach((movement, index) => {
          cy.get(`div[data-testid="table-date"] table tbody tr`)
            .eq(index)
            .within(() => {
              columnsByTag.date.forEach((column, index) => {
                cy.get('td')
                  .eq(index)
                  .should(
                    'have.text',
                    column.render
                      ? column.render(movement)
                      : movement[column.keyAccessor]
                  );
              });
            });
        });
      });
    });

    cy.findByRole('button', { name: filterTags.firstGroup[1].label }).click();

    cy.wait('@getMovements');

    filterTags.firstGroup.forEach((currentTag) => {
      cy.findByRole('button', { name: currentTag.label }).click();

      cy.wait('@getMovements').then((interception) => {
        const responseData: { data: IMovementsData[] } = JSON.parse(
          interception.response.body
        );
        const limitedData = responseData.data.slice(0, 10);

        cy.findByTestId(`table-${currentTag.dataTestid}`).should('be.visible');

        cy.get(
          `div[data-testid="table-${currentTag.dataTestid}"] table tbody tr`
        ).should('have.length.lte', 10);

        limitedData.forEach((movement, index) => {
          cy.get(
            `div[data-testid="table-${currentTag.dataTestid}"] table tbody tr`
          )
            .eq(index)
            .within(() => {
              columnsByTag[currentTag.dataTestid as any].forEach(
                (column, index) => {
                  cy.get('td')
                    .eq(index)
                    .should(
                      'have.text',
                      column.render
                        ? column.render(movement)
                        : movement[column.keyAccessor]
                    );
                }
              );
            });
        });

        cy.get(`div[data-testid="table-date"] table tbody tr`).should(
          'have.length.lte',
          10
        );

        limitedData.forEach((movement, index) => {
          cy.get(`div[data-testid="table-date"] table tbody tr`)
            .eq(index)
            .within(() => {
              columnsByTag.date.forEach((column, index) => {
                cy.get('td')
                  .eq(index)
                  .should(
                    'have.text',
                    column.render
                      ? column.render(movement)
                      : movement[column.keyAccessor]
                  );
              });
            });
        });
      });
    });
  });
});
