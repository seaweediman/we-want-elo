import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

interface NavbarDropdownContextProps {
  open: boolean;
  handleClickToggle: () => void;
  handleClickItem: () => void;
}

const NavbarDropdownContext = React.createContext<Partial<NavbarDropdownContextProps>>({});

const StyledNavbarDropdown = styled.div`
  display: inline-block;
  position: relative;
`;

interface NavbarDropdownState {
  open: boolean;
}

export class NavbarDropdown extends React.Component<React.HTMLAttributes<HTMLDivElement>, NavbarDropdownState> {
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: React.HTMLAttributes<HTMLDivElement>) {
    super(props);
    this.state = { open: false };
    this.handleClickToggle = this.handleClickToggle.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClickItem() {
    this.setState({ open: false });
  }

  handleClickOutside(e: MouseEvent) {
    if (this.state.open) {
      if (this.ref.current && !this.ref.current.contains(e.target as Node)) {
        this.setState({ open: false });
        e.stopPropagation();
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  render() {
    const contextValue = {
      open: this.state.open,
      handleClickToggle: this.handleClickToggle,
      handleClickItem: this.handleClickItem,
    };
    return (
      <NavbarDropdownContext.Provider value={contextValue}>
        <StyledNavbarDropdown ref={this.ref} {...this.props}>
          {this.props.children}
        </StyledNavbarDropdown>
      </NavbarDropdownContext.Provider>
    );
  }
}

export const NavbarDropdownToggle: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const contextValue = React.useContext(NavbarDropdownContext);
  const { onClick, ...other } = props;
  return (
    <span
      onClick={(e) => {
        if (onClick) onClick(e);
        contextValue.handleClickToggle!();
      }}
      {...other}
    >
      {props.children}
    </span>
  );
};

export const NavbarDropdownOpen: React.FC = (props) => {
  const contextValue = React.useContext(NavbarDropdownContext);
  return <>{!contextValue.open! && props.children}</>;
};

export const NavbarDropdownClose: React.FC = (props) => {
  const contextValue = React.useContext(NavbarDropdownContext);
  return <>{contextValue.open! && props.children}</>;
};

const StyledNavbarDropdownMenu = styled.div`
  position: absolute;
  width: max-content;
`;

export const NavbarDropdownMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const contextValue = React.useContext(NavbarDropdownContext);
  return <>{contextValue.open! && <StyledNavbarDropdownMenu {...props}>{props.children}</StyledNavbarDropdownMenu>}</>;
};

type CSSTransitionProps = React.ComponentProps<typeof CSSTransition>;
export type NavbarDropdownCSSTransitionMenuProps = React.HTMLAttributes<HTMLDivElement> & CSSTransitionProps;

export const NavbarDropdownCSSTransitionMenu: React.FC<NavbarDropdownCSSTransitionMenuProps> = (props) => {
  const contextValue = React.useContext(NavbarDropdownContext);
  return (
    <CSSTransition in={contextValue.open!} unmountOnExit {...props}>
      <StyledNavbarDropdownMenu {...props}>{props.children}</StyledNavbarDropdownMenu>
    </CSSTransition>
  );
};

const StyledNavbarDropdownItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const NavbarDropdownItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const contextValue = React.useContext(NavbarDropdownContext);
  const { onClick, ...other } = props;
  return (
    <StyledNavbarDropdownItem
      onClick={(e) => {
        if (onClick) onClick(e);
        contextValue.handleClickItem!();
      }}
      {...other}
    >
      {props.children}
    </StyledNavbarDropdownItem>
  );
};
