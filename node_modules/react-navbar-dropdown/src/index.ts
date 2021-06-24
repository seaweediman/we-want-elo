import {
  NavbarDropdown as NavbarDropdownMain,
  NavbarDropdownToggle,
  NavbarDropdownOpen,
  NavbarDropdownClose,
  NavbarDropdownMenu,
  NavbarDropdownCSSTransitionMenu,
  NavbarDropdownItem,
  NavbarDropdownCSSTransitionMenuProps,
} from './navbar-dropdown';

export default class NavbarDropdown extends NavbarDropdownMain {
  static Toggle = NavbarDropdownToggle;
  static Open = NavbarDropdownOpen;
  static Close = NavbarDropdownClose;
  static Menu = NavbarDropdownMenu;
  static CSSTransitionMenu = NavbarDropdownCSSTransitionMenu;
  static Item = NavbarDropdownItem;
}

export { NavbarDropdownCSSTransitionMenuProps };
