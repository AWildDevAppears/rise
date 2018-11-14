import { Greeter } from '../src/scripts/greeter';

describe('Greeter', () => {
  let greeter: Greeter;
  beforeEach(() => {
    greeter = new Greeter('testing');
  });
  it('should greet', () => {
    const container = document.createElement('div');
    greeter.start(container);
    expect(Array.from(container.classList)).toContain('greeter');
    expect(container.innerHTML).toEqual('<h1>Welcome to testing!</h1>');
  });
});
