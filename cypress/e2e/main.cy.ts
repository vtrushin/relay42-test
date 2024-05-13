describe('Load missions', () => {
	it('Contains two missions', () => {
		cy.visit('/')
		expect(cy.get('[data-testid~=mission-1]').should('exist'))
		expect(cy.get('[data-testid~=mission-2]').should('exist'))
	})

	it('Should refer to a specific mission when click', () => {
		cy.visit('/')
		cy.get('[data-testid~=mission-1]').click()
		cy.url().should('include', '/edit/1')
	})

	it('Should refer to a new mission when click', () => {
		cy.visit('/')
		cy.get('[data-testid=new-mission]').click()
		cy.url().should('include', '/add')
	})

	it('Should return filtered list when searching', () => {
		cy.visit('/')
		cy.get('[data-testid=search]').type('1')
		expect(cy.get('[data-testid~=mission-1]').should('exist'))
		expect(cy.get('[data-testid~=mission-2]').should('not.exist'))
	})
})




