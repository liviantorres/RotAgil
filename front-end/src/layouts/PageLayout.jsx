
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Navbar from "../components/Navbar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const PageLayout = ({ NavType }) => {
  let links = [
    { href: '/', text: 'Inicio' },
    
  ];

  let button = {};

  if (NavType === 'register') {
    button = {
      type: 'button',
      text: 'Login',
      onClick: () => alert('Admin Dashboard Clicked')
    };
  }else if(NavType === 'login'){
    links = [
      { href: '/', text: 'Inicio' },
      { href: '/login', text: 'Sobre Nós'},
      { href: '/login', text: 'Contato'},
    ];
  }else if(NavType === 'home'){
    links = [
      {href: '/trajetos', text: 'Trajetos'},
      {href: '/pontos', text: 'Pontos'}
    ];
    button = {
      type: '',
      text:'',
    }
  }

  return (
    <LayoutContainer>
      
      <div style={{ flex: 1 }}>
        <Navbar links={links} button={button} />
          <Outlet />
      </div>
    </LayoutContainer>
  );
};

PageLayout.propTypes = {
  NavType: PropTypes.string.isRequired,
};

export default PageLayout;
