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
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sean')
      cy.get('#password').type('hello')
      cy.get('#login-button').click()
      cy.contains('logged in as sean')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sean')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.red-noti')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'logged in as sean')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'sean', password: 'hello' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Introduction to Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress')
      cy.get('#new-blog-button').click()
      cy.contains('Introduction to Cypress')
    })

    describe('and user has created a blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Introduction to Cypress',
          author: 'Cypress',
          url: 'https://docs.cypress.io/guides/core-concepts/introduction-to-cypress'
        })
        cy.contains('Introduction to Cypress').as('myBlog')
      })

      it('their blog can be deleted by themselves', function() {
        cy.get('@myBlog').contains('view').click()
        cy.get('@myBlog').contains('delete').click()
        cy.get('html').should('not.contain', 'Introduction to Cypress')
      })

      it('their blog cannot be deleted by someone else', function() {
        cy.get('#logout-button').click()
        cy.get('@myBlog').contains('view').click()
        cy.get('@myBlog').should('not.contain', 'delete')
      })
    })
  })

  describe('When there are existing blogs', function() {
    beforeEach(() => {
      cy.login({ username: 'sean', password: 'hello' })
      cy.createBlog({
        title: 'Introduction to Cypress',
        author: 'Cypress',
        url: 'https://docs.cypress.io/guides/core-concepts/introduction-to-cypress'
      })
      cy.contains('log out').click()
    })

    it('a blog can be liked', function() {
      cy.contains('Introduction to Cypress').as('blogDiv')
      cy.get('@blogDiv').contains('view').click()
      cy.get('@blogDiv').contains('like').click()
    })
  })
})