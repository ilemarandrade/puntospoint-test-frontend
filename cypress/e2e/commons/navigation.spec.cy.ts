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

    const profileButton = cy
      .findByTestId('profile-button')
      .should('be.visible');

    profileButton.click();

    const closeSession = cy.findByRole('menuitem', { name: 'Cerrar Sesion' });
    const editProfile = cy.findByRole('menuitem', { name: 'Editar perfil' });

    editProfile.should('be.visible');
    closeSession.should('be.visible');

    editProfile.click();

    editProfile.should('not.be.visible');
    closeSession.should('not.be.visible');
  });
});

describe('TopBar Navigation Mobile', () => {
  it('Should navigate between pages', () => {
    cy.viewport('samsung-note9');
    cy.visit('/');

    cy.findByRole('img', { name: 'Logo' }).should('be.visible');

    const menu = cy.findByTestId('MenuIcon');

    menu.should('be.visible');

    menu.click();

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
});
