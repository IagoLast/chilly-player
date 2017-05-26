import { ChillyPlayerPage } from './app.po';

describe('chilly-player App', () => {
  let page: ChillyPlayerPage;

  beforeEach(() => {
    page = new ChillyPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
