describe('Home Page', () => {
  beforeEach(() => {
    cy.fixture('courses.json').as('coursesJSON'); // create coursesJSON fixture from mock courses.json
    cy.server(); // init server. If no server init - will be error on api calls
    cy.route('api/courses', '@coursesJSON').as('courses'); // simulate api/course with coursesJSON fixture data
    cy.visit('/'); // go to home page
  });

  it('should display a list of courses', () => {
    cy.contains('All Courses'); // Check if page has following words
    cy.wait('@courses'); // wait for simulated response
    cy.get('mat-card').should('have.length', 9)
  });

  it('should display the advanced courses', () => {
    cy.get('.mat-tab-label').should('have.length', 2);
    cy.get('.mat-tab-label').last().click();
    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);
    cy.get('.mat-tab-body-active .mat-card-title').first().should('contain', 'Angular Security Course');
  });
});
