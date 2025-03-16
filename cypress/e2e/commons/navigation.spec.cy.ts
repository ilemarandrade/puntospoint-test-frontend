import { linksMenu } from '../../../src/constants/links-menu';

describe('TopBar Navigation', () => {
  it('Should navigate between pages', () => {
    cy.visit('/');

    cy.findByRole('img', { name: 'Logo' }).should('be.visible');

    linksMenu.forEach((link) => {
      const currentLink = cy.findByRole('link', { name: link.title });

      cy.findByRole('link', { name: link.title }).should(
        'have.attr',
        'href',
        link.url
      );

      currentLink.click();

      cy.url('includes', link.url);
    });
  });

  it('Should open and close the profile menu', () => {
    cy.visit('/');

    cy.findByText('Pamela Rojas Gonzalez').should('be.visible');

    cy.findByTestId('profile-button').as('profileButton');

    cy.get('@profileButton').should('be.visible');

    cy.get('@profileButton').click();

    cy.findByRole('menuitem', { name: 'Cerrar Sesion' }).as('closeSession');
    cy.findByRole('menuitem', { name: 'Editar perfil' }).as('editProfile');

    cy.get('@editProfile').should('be.visible');
    cy.get('@closeSession').should('be.visible');

    cy.get('@editProfile').click();

    cy.get('@editProfile').should('not.exist');
    cy.get('@closeSession').should('not.exist');
  });
});

describe('TopBar Navigation Mobile', () => {
  it('Should navigate between pages', () => {
    cy.viewport('samsung-note9');
    cy.visit('/');

    cy.findByRole('img', { name: 'Logo' }).should('be.visible');

    cy.findByTestId('MenuIcon').as('menu');

    cy.get('@menu').should('be.visible');

    cy.get('@menu').click();

    linksMenu.forEach((link) => {
      cy.findByRole('link', { name: link.title }).as('currentLink');

      cy.findByRole('link', { name: link.title }).should(
        'have.attr',
        'href',
        link.url
      );

      cy.get('@currentLink').click();

      cy.url('includes', link.url);
    });
  });
});
