describe('Authorisation Code Flow', () => {
  it('should get user requested data', () => {
    cy.visit('/')
    cy.get('button').contains('Login').click()

    // Identity Provider Selection page
    cy.contains('Reference ISP').click()

    // Identity Provider Login page
    cy.get('[name="username"]').type(Cypress.env('idpUsername'))
    cy.get('[name="password"]').type(Cypress.env('idpPassword'))
    cy.get('button').contains('Login').click()

    // Identity Provider Consent page
    cy.get('body').then(($body) => {
      // Identity Provider can skip this step depending on configuration
      if ($body.find('button[type="submit"]').length > 0) {
        cy.log('Consent page is shown')
        $body.find('button[type="submit"]').trigger('click')
      } else {
        cy.log('Consent page was skipped')
      }
    })
    
    // User data page
    cy.contains('sub')
    cy.contains('birthdate')
    cy.contains('name')
  })
})
