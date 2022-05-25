describe('Global Blue test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Tax Calculator');
  });

  it('Calculate net and vat value when entering gross', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="gross"]').type('10');
    cy.get('input[formcontrolname="net"]').should('not.eq', 0);
    cy.get('input[formcontrolname="vat"]').should('not.eq', 0);
  });

  it('Calculate gross and vat value when entering net', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="net"]').type('10');
    cy.get('input[formcontrolname="gross"]').should('not.eq', '0');
    cy.get('input[formcontrolname="vat"]').should('not.eq', '0');
  });

  it('Calculate gross and net value when entering vat', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="vat"]').type('10');
    cy.get('input[formcontrolname="gross"]').should('not.eq', '0');
    cy.get('input[formcontrolname="net"]').should('not.eq', '0');
  });

  it('Changing rate value update the net value', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="net"]').type('10');
    cy.get('mat-button-toggle[value="20"]').click();
    cy.get('input[formcontrolname="net"]').should('not.eq', '10');
  });

  it('Changing rate value update the vat value', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="vat"]').type('10');
    cy.get('mat-button-toggle[value="20"]').click();
    cy.get('input[formcontrolname="vat"]').should('not.eq', '10');
  });

  it('Typing text on net input should show mat error', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="net"]').type('example').blur();
    cy.get('mat-error').should('contain', 'Only numbers allowed');
  });

  it('Typing text on vat input should show mat error', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="vat"]').type('example').blur();
    cy.get('mat-error').should('contain', 'Only numbers allowed');
  });

  it('Typing text on gross input should show mat error', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="gross"]').type('example').blur();
    cy.get('mat-error').should('contain', 'Only numbers allowed');
  });
});
