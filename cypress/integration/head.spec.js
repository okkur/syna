// file deepcode ignore PromiseNotCaughtGeneral: Cypress will fail in case there are any errors
describe('head.js', () => {
  describe('stream', () => {
    beforeEach('visit dev page', () => {
      cy.visit('/dev/js-helpers')
    })

    it('should have access to syna.stream', () => {
      cy.window().then(win => {
        expect(win.syna.stream).not.be.equal(null)
      })
    })
    
    it('should register listeners', () => {
      cy.window().then(win => {
        win.syna.stream.subscribe('test', () => null)
        expect(win.syna.stream._topics.test).not.be.equal(null)
        expect(win.syna.stream._topics.test).have.length(1)
      })
    })

    it('should publish events to listeners', () => {
      cy.window().then(win => {
        const t = {
          listener: () => null
        }

        const spy = cy.spy(t, 'listener')
        win.syna.stream.subscribe('test', t.listener)
        win.syna.stream.publish('test', {})
        cy.wait(200).then(() => {
          expect(spy).to.be.called
        })
      })
    })
    
    it('should unregister listeners', () => {
      cy.window().then(win => {
        const token = win.syna.stream.subscribe('test', () => null)
        expect(win.syna.stream._topics.test).not.be.equal(null)
        expect(win.syna.stream._topics.test).have.length(1)
        win.syna.stream.unsubscribe(token)
        expect(win.syna.stream._topics.test).have.length(0)
      })
    })
  })

  describe('api', () => {
    beforeEach('visit dev page', () => {
      cy.visit('/dev/js-helpers')
    })

    it('should register items', () => {
      cy.window().then(win => {
        win.syna.api.register('test', 'testId', true)
        expect(win.syna.api._registry.test).not.be.equal(null)
        expect(win.syna.api._registry.test.testId).be.equal(true)
      })
    })

    it('should update item in registry', () => {
      cy.window().then(win => {
        win.syna.api.register('test', 'testId', true)
        expect(win.syna.api._registry.test.testId).be.equal(true)
        win.syna.api.update('test', 'testId', false)
        expect(win.syna.api._registry.test.testId).be.equal(false)
      })
    })

    it('should get item from registry', () => {
      cy.window().then(win => {
        win.syna.api.register('test', 'testId', true)
        expect(win.syna.api.get('test', 'testId')).be.equal(true)
      })
    })

    it('should get items from registry', () => {
      cy.window().then(win => {
        win.syna.api.register('test', 'testId', true)
        expect(win.syna.api.getScope('test')).be.deep.equal({ testId: true })
      })
    })

    it('should turn items from registry to array', () => {
      cy.window().then(win => {
        win.syna.api.register('test', 'testId', true)
        expect(win.syna.api.toArray('test')).be.deep.equal([ true ])
      })
    })

    it('should render a template correctly', () => {
      cy.window().then(win => {
        expect(win.syna.api.renderTemplate(`<title>Hello \${ name }</title>
\${ isset testTrue }should be there\${ end }
\${ isset testFalse }should not be there\${ end }`.trim(), { testTrue: true, name: 'world' })).to.equal(`<title>Hello world</title>
should be there
`)
      })
    })
  })
})
