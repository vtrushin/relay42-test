describe('Create mission', () => {
	it('Should post data of new mission', () => {
		cy.visit('/add')
		cy.get('[data-testid="mission-edit-form"]').within(() => {
			cy.get('input[name="name"]').clear().type('Expedition 3')
			cy.get('select[name="destination"]').select('marsAlpha116')
			cy.get('input[name="departure"]').clear().type('2028-11-10')
			cy.get('input[name="members.0.experience"]').clear().type('12')
			cy.get('[data-testid="add-member"]').click()
			cy.get('select[name="members.1.type"]').select('engineer')
			cy.get('input[name="members.1.experience"]').clear().type('22')
			cy.get('select[name="members.1.job"]').select('maintenance')
			cy.get('[data-testid="add-member"]').click()
			cy.get('input[name="members.2.age"]').clear().type('40')
			cy.get('[data-testid="add-member"]').click()
			cy.get('[data-testid="submit"]').click()
		})

		cy.get('[data-testid~="mission-3"]').within(() => {
			cy.get('[data-testid="name"]').should('contain.text', 'Expedition 3')
			cy.get('[data-testid="member-pilot-count"]').should('have.text', '1')
			cy.get('[data-testid="member-engineer-count"]').should('have.text', '1')
			cy.get('[data-testid="member-passenger-count"]').should('have.text', '2')
			cy.get('[data-testid="destination"]').should('contain.text', 'Mars Alpha-116')
			cy.get('[data-testid="departure"]').should('contain.text', '10 Nov 2028')
		})
	})

	it('Should be able to select only one pilot', () => {
		cy.visit('/add')
		cy.get('[data-testid="mission-edit-form"]').within(() => {
			cy.get('select[name="members.0.type"]').should('be.disabled')
			cy.get('[data-testid~="delete-button-1"]').should('not.exist')
		})
	})

	it('Should be able to select only one pilot', () => {
		cy.visit('/add')
		cy.get('[data-testid="mission-edit-form"]').within(() => {
			cy.get('input[name="members.0.experience"]').clear().type('9')
			cy.get('[data-testid="submit"]').click()
			cy.get('[data-testid="error"]').should('contain.text', 'At least 10')
		})
	})

	it('Should not add similar engineers', () => {
		cy.visit('/add')
		cy.get('[data-testid="mission-edit-form"]').within(() => {
			cy.get('[data-testid="add-member"]').click()
			cy.get('select[name="members.1.type"]').select('engineer')
			cy.get('select[name="members.1.job"]').should('have.value', 'navigation')

			cy.get('[data-testid="add-member"]').click()
			cy.get('select[name="members.2.type"]').select('engineer')
			cy.get('select[name="members.2.job"]').should('have.value', 'solarPanels')

			cy.get('[data-testid="add-member"]').click()
			cy.get('select[name="members.3.type"]').select('engineer')
			cy.get('select[name="members.3.job"]').should('have.value', 'maintenance')

			cy.get('[data-testid="add-member"]').click()
			cy.get('select[name="members.4.type"]').select('engineer')
			cy.get('select[name="members.4.job"]').should('have.value', 'mechanics')
		})
	})

	it('Should be able to delete members', () => {
		cy.visit('/add')
		cy.get('[data-testid="mission-edit-form"]').within(() => {
			cy.get('[data-testid="add-member"]').click()
			cy.get('[data-testid="add-member"]').click()
			cy.get('[data-testid="add-member"]').click()
			cy.get('[data-testid~="delete-button-3"]').click()
			cy.get('[data-testid~="delete-button-2"]').click()
			cy.get('[data-testid~="delete-button-1"]').click()
			cy.get('[data-testid~="delete-button-1"]').should('not.exist')
		})
	})

	it('Should go home on click Cancel', () => {
		cy.visit('/add')
		cy.get('[data-testid="cancel-button"]').click()
		cy.url().should('not.contain', '/add')
	})
})




