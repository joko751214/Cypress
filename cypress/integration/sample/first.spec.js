beforeEach(() => {
  cy.fixture('example').as('titleLists');
});

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})

describe('Testing The Page', () => {
  it('testing', () => {
    cy.get('#addTodo').type("new task")
    // 還沒找到如何在click裡面設置時間的方法
    // cy.contains('新增').click({timeout: 15000})
    cy.contains('新增').click()
    cy.get('[type="checkbox"]').first().check()
    cy.get('.nav-item').click({ multiple: true })
    cy.get('.nav-item').first().click()
    cy.get('[type="checkbox"]').last().check()
    cy.get('@titleLists').then((lists) => {
      lists.forEach(el => {
        const title = el.title;
        cy.get('#addTodo').type(`${title}`)
        cy.contains('新增').click()
      })
    })
    cy.get(':checkbox').then((item) => {
      const len = item.length;
      for(let i=0;i<len;i++) {
        if(item[i].checked) {
          cy.get(item[i]).click()
        }
      }
    })
  })
})

describe('Delete Task', () => {
  it('Deleting', () => {
    cy.get('.removeBtn').first().click()
    cy.get('.removeBtn').eq(3).click()
  })
});

describe('Remove All Task', () => {
  it('Removing', () => {
    cy.contains('清除所有任務').click()
  })
});