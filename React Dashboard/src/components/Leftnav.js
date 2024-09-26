import React from 'react';
import { Fragment } from 'react'
import logo from "../logo-toolbox.png"
import "./css/Leftnav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBox, faUser, faTruck, faPaintRoller, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


function Leftnav() {
  return (
    <Fragment>
      <section id="left-body">
          <nav id="top-nav">
            <Link to="/" className="nav-img" exact="true">
              <img src={ logo } alt="toolbox-logo" />
            </Link>
            <MenuList className="menu-list">
              <Link to="/" className="link-nav" exact="true">
                <MenuItem className="menu-item">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faHome} />
                  </ListItemIcon>
                  <ListItemText>Inicio</ListItemText>
                </MenuItem>
              </Link>
              <Link to="/products" className="link-nav" exact="true">
                <MenuItem className="menu-item">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faBox} />
                  </ListItemIcon>
                  <ListItemText>Productos</ListItemText>
                </MenuItem>
              </Link>
              <Link to="/users" className="link-nav" exact="true">
                <MenuItem className="menu-item">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faUser} />
                  </ListItemIcon>
                  <ListItemText>Usuarios</ListItemText>
                </MenuItem>
              </Link>
              <Link to="/brands" className="link-nav" exact="true">
                <MenuItem className="menu-item">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faTruck} />
                  </ListItemIcon>
                  <ListItemText>Marcas</ListItemText>
                </MenuItem>
              </Link>
              <Link to="/categories" className="link-nav" exact="true">
                <MenuItem className="menu-item">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faPaintRoller} />
                  </ListItemIcon>
                  <ListItemText>Categorías</ListItemText>
                </MenuItem>
              </Link>
              <Link to="/sales" className="link-nav" exact="true">
                <MenuItem className="menu-item">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faDollarSign} />
                  </ListItemIcon>
                  <ListItemText>Sales</ListItemText>
                </MenuItem>
              </Link>
            </MenuList>
          </nav>
          <nav id="bot-nav">
            <MenuList className="menu-list">
              <a className="link-nav" href="http://localhost:3001">
                <MenuItem className="menu-item">
                  <ListItemText>Volver al sitio</ListItemText>
                </MenuItem>
              </a>
            </MenuList>
          </nav>
      </section>
    </Fragment>
  );
}

export default Leftnav;