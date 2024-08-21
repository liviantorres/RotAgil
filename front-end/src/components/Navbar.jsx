import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';



const NavbarContainer = styled.div`
  background-color: #1f2121;
  color: #fff;
  height: 100px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const LinkItem = styled.h2`
  margin-right: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 20px;
  padding: 2px;
  margin-left: 14px;
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #ccc;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  padding: 10px 50px;
  background-color: #3f3f3f;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    background-color: #1f2121;
  }
`;

const ButtonLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  padding: 10px 50px;
  background-color: #3f3f3f;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 20px;

  &:hover {
    background-color: #1f2121;
  }
`;

const Navbar = ({ links, button }) => {
  return (
    <NavbarContainer>
      <LinksContainer>
        {links.map((link, index) => (
          <LinkItem key={index}>
            <a href={link.href}>{link.text}</a>
          </LinkItem>
        ))}
      </LinksContainer>
      <ButtonContainer>
        {button.type === 'link' ? (
          <ButtonLink href={button.href}>
            {button.text}
          </ButtonLink>
        ) : (
          <Button onClick={button.onClick}>
            {button.text}
          </Button>
        )}
      </ButtonContainer>
    </NavbarContainer>
  );
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  button: PropTypes.shape({
    type: PropTypes.oneOf(['link', 'button']).isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default Navbar;
