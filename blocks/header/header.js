/* stylelint-disable */
header .header-nav-wrapper {
  background-color: var(--background-color);
  width: 100%;
  z-index: 20;
  position: fixed;
  top: 40px;
  padding: 2em 0;
  border-bottom: 1px solid var(--color-neutral-400);
}

@media (width < 768px) {
  header .header-nav-wrapper {
    padding: 0;
  }
}

header .header-nav-wrapper.minimized {
  padding: 0.75em 0;
  transition: padding-bottom .30s ease, padding-top .30s;
  box-shadow: 0 8px 20px 0 rgba(0 0 0 / 26%);
}

header nav {
  box-sizing: border-box;
  display: grid;
  grid-template:
    'hamburger brand tools' var(--nav-height) 'sections sections sections' 1fr / auto 1fr auto;
  align-items: center;
  margin: auto;
  max-width: 1400px;
  height: var(--nav-height);
  padding: 0 16px;
  font-family: var(--type-base-font-family);
}

header nav[aria-expanded='true'] {
  grid-template:
    'hamburger brand' var(--nav-height) 'sections sections' 1fr
    'tools tools' var(--nav-height) / auto 1fr;
  overflow-y: auto;
  min-height: 96vh;
}

@media (width >=600px) {
  header nav {
    padding: 0 32px;
  }
}

@media (width >=900px) {
  header nav {
    display: flex;
    justify-content: space-between;
  }

  header nav[aria-expanded='true'] {
    min-height: 0;
    overflow: visible;
  }
}

@media (width < 900px) {
  header .header-nav-wrapper nav {
    height: unset;
  }
}

header .header-nav-wrapper .nav-brand {
  margin-right: 1.5em;
}

header nav p {
  margin: 0;
  line-height: 1;
}

header nav a:any-link {
  color: currentcolor;
  text-transform: uppercase;
  font-size: var(--body-font-size-xxs);
  letter-spacing: 0.16em;
  padding: 1.5rem 0;
}

@media (width <=900px) {
  header nav a:any-link {
    font-size: var(--body-font-size-xs);
  }

}


/* hamburger */
header nav .nav-hamburger {
  grid-area: hamburger;
  height: 22px;
  display: flex;
  align-items: center;
}

header nav .nav-hamburger button {
  height: 22px;
  margin: 0;
  border: 0;
  border-radius: 0;
  padding: 0;
  background-color: var(--color-neutral-50);
  color: inherit;
  overflow: initial;
  text-overflow: initial;
  white-space: initial;
}

header nav .nav-hamburger-icon,
header nav .nav-hamburger-icon::before,
header nav .nav-hamburger-icon::after {
  box-sizing: border-box;
  display: block;
  position: relative;
  width: 20px;
}

header nav .nav-hamburger-icon::before,
header nav .nav-hamburger-icon::after {
  content: '';
  position: absolute;
  background: currentcolor;
}

header nav[aria-expanded='false'] .nav-hamburger-icon,
header nav[aria-expanded='false'] .nav-hamburger-icon::before,
header nav[aria-expanded='false'] .nav-hamburger-icon::after {
  height: 2px;
  border-radius: 2px;
  background: currentcolor;
}

header nav[aria-expanded='false'] .nav-hamburger-icon::before {
  top: -6px;
}

header nav[aria-expanded='false'] .nav-hamburger-icon::after {
  top: 6px;
}

header nav[aria-expanded='true'] .nav-hamburger-icon {
  height: 22px;
}

header nav[aria-expanded='true'] .nav-hamburger-icon::before,
header nav[aria-expanded='true'] .nav-hamburger-icon::after {
  top: 3px;
  left: 1px;
  transform: rotate(45deg);
  transform-origin: 2px 1px;
  width: 24px;
  height: 2px;
  border-radius: 2px;
}

header nav[aria-expanded='true'] .nav-hamburger-icon::after {
  top: unset;
  bottom: 3px;
  transform: rotate(-45deg);
}

@media (width >=900px) {
  header nav .nav-hamburger {
    display: none;
    visibility: hidden;
  }
}

/* brand */
header nav .nav-brand a {
  grid-area: brand;
  flex-basis: 128px;
  font: var(--type-headline-1-font);
  letter-spacing: var(--type-headline-1-letter-spacing);
}

header nav .nav-brand img {
  height: 48px;
  width: auto;

  @media (width<=768px) {
    & {
      width: 100px;
    }
  }
}

/* sections */
header nav .nav-sections {
  grid-area: sections;
  flex: 1 1 auto;
  display: none;
  visibility: hidden;
}

header nav[aria-expanded='true'] .nav-sections {
  display: block;
  visibility: visible;
  align-self: start;
}

header nav .nav-sections ul {
  list-style: none;
  padding-left: 0;
  font: var(--type-body-1-default-font);
  letter-spacing: var(--type-body-1-default-letter-spacing);
}

header nav .nav-sections ul>li {
  font-weight: 700;
}

@media (width < 768px) {
  header nav .nav-sections ul>li {
    margin: 15px 0;
  }
}

header nav .nav-sections ul>li>ul {
  margin-top: 0;
}

header nav .nav-sections ul>li>ul>li {
  font-weight: 500;
}

header nav .nav-sections ul>li>a {
  padding: 1em 1.2em;
}

header nav .nav-sections ul>li>a.active,
header nav .nav-sections ul>li>a:hover {
  text-decoration: none;
  background-color: var(--color-neutral-200);
}

@media (width >=900px) {
  header nav .nav-sections {
    display: block;
    visibility: visible;
    white-space: nowrap;
  }

  header nav[aria-expanded='true'] .nav-sections {
    align-self: unset;
  }

  header nav .nav-sections .nav-drop {
    position: relative;
    padding-right: 16px;
    cursor: pointer;
  }

  header nav .nav-sections .nav-drop::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0.4rem;
    right: 0.2rem;
    transform: rotate(135deg);
    width: 0.6rem;
    height: 0.6rem;
    border: 2px solid currentcolor;
    border-radius: 0 1px 0 0;
    border-width: 2px 2px 0 0;
  }

  header nav .nav-sections .nav-drop[aria-expanded='true']::after {
    top: unset;
    bottom: 0.5em;
    transform: rotate(315deg);
  }

  header nav .nav-sections ul {
    display: flex;
    gap: 2em;
    margin: 0;
  }

  header nav .nav-sections .default-content-wrapper>ul>li {
    flex: 0 1 auto;
    position: relative;
    font-weight: 500;
    width: 15%;
  }

  header nav .nav-sections .default-content-wrapper>ul>li>ul {
    display: none;
    position: relative;
  }

  header nav .nav-sections .default-content-wrapper>ul>li[aria-expanded='true']>ul {
    display: block;
    position: absolute;
    left: -1em;
    width: 200px;
    margin-top: 12px;
    padding: 1em;
    background-color: var(--color-neutral-500);
    white-space: initial;
  }

  header nav .nav-sections .default-content-wrapper>ul>li>ul::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--color-neutral-500);
  }

  header nav .nav-sections .default-content-wrapper>ul>li>ul>li {
    padding: 8px 0;
  }
}

/* tools */
header nav .nav-panel {
  z-index: 100;
  position: absolute;
  box-shadow: var(--shape-shadow-2);
  background: var(--background-color);
  left: 0;
  top: 60px;
  width: 100%;
  display: none;
  box-sizing: border-box;
}

header nav .nav-panel--show {
  display: block;
}

header nav .nav-tools {
  grid-area: tools;
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  height: 100%;
}

header nav .nav-tools .minicart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

header nav .nav-tools>button,
header nav .nav-tools .minicart-wrapper>button {
  color: var(--color-brand-300);
  background: transparent;
  padding: 5px 10px;
  margin-left: 1em;
  height: 100%;
  border: unset;
  cursor: pointer;
}

header nav .nav-tools button.nav-cart-button {
  background-image: url(/icons/shopping-cart.svg);
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  background-size: 20px;
  padding: 5px 15px;
  margin: 1rem;
  width: auto;
  height: 34px;
}

header nav .nav-tools button.nav-cart-button[data-count]::after {
  content: attr(data-count);
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--color-black-100);
  color: var(--color-neutral-100);
  border-radius: 50%;
  width: 1.6em;
  height: 1.6em;
  display: flex;
  align-items: center;
  font-size: 0.65em;
  justify-content: center;
}

header nav .nav-tools button.nav-search-button {
  font-size: 0;
  background-image: url('/icons/search.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  background-size: 20px;
  padding: 5px 15px;
  margin: 1rem;
  height: 34px;
}

header nav .nav-tools button.nav-search-button:hover,
header nav .nav-tools button.nav-cart-button:hover {
  background-color: var(--color-neutral-200);
  cursor: pointer;
}

header .nav-search-panel {
  padding: 1rem;
}

header .search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

header .nav-search-panel input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font: var(--type-headline-2-default-font);
  font-size: var(--body-font-size-xs);
  letter-spacing: var(--type-headline-2-default-letter-spacing);
  border: 1px solid currentcolor;
  appearance: none;
}

/* Mini Cart  */
.cart-mini-cart:not(:has(.cart-empty-cart)) {
  max-height: 760px;
  min-height: 360px;
}

.cart-mini-cart__heading-text::after {
  border-bottom: 2px solid var(--color-brand-600);
  content: "";
  display: block;
  padding-top: 10px;
  min-width: 84px;
  width: fit-content;
}

.cart-mini-cart__heading .cart-mini-cart__heading-divider {
  display: none;
}

.cart-mini-cart .cart-mini-cart__footer__ctas a {
  font-size: var(--body-font-size-md);
  width: auto;
}

.cart-mini-cart .cart-mini-cart__footer__ctas a.dropin-button--primary:hover {
  background-color: var(--color-brand-600);
}

.cart-mini-cart .cart-mini-cart__footer__ctas a.dropin-button--primary:active {
  background-color: var(--color-brand-700);
}

.cart-mini-cart .cart-empty-cart__actions a {
  width: auto;
}

.cart-mini-cart .dropin-cart-item__remove {
  color: var(--color-black-100);
}

header .nav-search-button:focus,
header .nav-cart-button:focus {
  background-color: unset;
}

header .nav-search-input .search_autocomplete .popover-container {
  width: 100%;
}

/* If viewport height is below max, set max height to 90% of viewport */
@media (height < 768px) {
  .cart-mini-cart:not(:has(.cart-empty-cart)) {
    max-height: calc(100vh - var(--nav-height));
  }
}

@media (width > 768px) {

  header nav .nav-search-panel,
  header nav .minicart-panel {
    min-width: 398px;
    width: auto;
    left: unset;
    right: 0;
    top: 40px;
  }
}

@media (width >=1024px) {

  header nav .minicart-wrapper,
  header nav .search-wrapper {
    position: relative;
  }

  header .nav-search-input {
    left: unset;
    right: 20px;
  }

  header nav .minicart-panel,
  header nav .nav-search-panel {
    left: unset;
    right: 0;
  }
}

.lang-nav-selector {
  font-size: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  padding: 5px 15px;
  height: auto;
  display: flex;
  align-self: center;
}
