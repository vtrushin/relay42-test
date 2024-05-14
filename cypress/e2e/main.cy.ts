describe('Load missions', () => {
	it('Contains two missions', () => {
		cy.visit('/')
		cy.get('[data-testid~="mission-1"]').should('exist')
		cy.get('[data-testid~="mission-2"]').should('exist')
	})

	it('Should refer to a specific mission when click', () => {
		cy.visit('/')
		cy.get('[data-testid~="mission-1"]').click()
		cy.url().should('include', '/edit/1')
		cy.get('[data-testid~="mission-title"]').should('have.text', 'Expedition 1')
	})

	it('Should refer to a new mission when click', () => {
		cy.visit('/')
		cy.get('[data-testid="new-mission"]').click()
		cy.url().should('include', '/add')
	})

	it('Should return filtered list when searching', () => {
		cy.visit('/')
		cy.get('[data-testid="search"]').type('1')
		cy.get('[data-testid~="mission-1"]').should('exist')
		cy.get('[data-testid~="mission-2"]').should('not.exist')
	})
})




