import { BaseStaticHtmlComponent } from './component.interface';

export class FooterHtmlComponent extends BaseStaticHtmlComponent {
  toHtml() {
    return /* html */ `
      <footer>
        <a class="logo" href='/'>
          <img src='/logo.png' alt='logo' />
          <span>World Knowledge</span>
        </a>
        <div class="links">
          <a href="/contact">Contact</a>
          <span>|</span>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <p class="all-right-reserved">© 2022 World Knowledge. All rights reserved</p>
      </footer>
    `;
  }
}
