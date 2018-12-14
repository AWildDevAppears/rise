// This test only exists to make sure Jest works.
test('adds 1 + 2 to equal 3', () => {
    function sum(a, b) {
        return a + b;
    }

    expect(sum(1, 2)).toBe(3);
});
