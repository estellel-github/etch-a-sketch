/**
 * @jest-environment jsdom
 */

require('./main')

describe('main', () => {
    it('should be true', () => {
        expect(true).toBe(true)
    })
})