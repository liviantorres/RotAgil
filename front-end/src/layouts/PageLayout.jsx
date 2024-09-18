import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const PageLayout = ({ NavType, userProfileImage }) => { 
  const navigate = useNavigate();

  let links = [
    { href: '/', text: 'Inicio' },
  ];

  let button = {};

  if (NavType === 'register') {
    button = {
      type: 'button',
      text: 'Login',
      onClick: () => navigate('/login')
    };
  } else if (NavType === 'login') {
    links = [
      { href: '/', text: 'Inicio' },
      { href: '/login', text: 'Sobre Nós' },
      { href: '/login', text: 'Contato' },
    ];
    button = {
      type: 'button',
      text: 'Login',
      onClick: () => navigate('/login')
    };
  } else if (NavType === 'home') {
    links = [
      { href: '/trajetos', text: 'Trajetos' },
      { href: '/pontos', text: 'Pontos' }
    ];

    button = {
      type: 'link',
      profileImage: '' ,
      onClick:()=> navigate('/perfil'),
    };
  }

  return (
    <LayoutContainer>
      <div style={{ flex: 1 }}>
        <Navbar links={links} button={button} profileImage={button.profileImage} />
        <Outlet />
      </div>
    </LayoutContainer>
  );
};

PageLayout.propTypes = {
  NavType: PropTypes.string.isRequired,
  userProfileImage: PropTypes.string, 
};

export default PageLayout;
