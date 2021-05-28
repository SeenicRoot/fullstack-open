describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'sean', password: 'hello' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sean')
      cy.get('#password').type('hello')
      cy.contains('login').click()
      cy.contains('logged in as sean')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sean')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.get('.red-noti').should('contain', 'wrong username or password')
      cy.get('html').should('not.contain', 'logged in as sean')
    })
  })
})