import React from "react";
import styled from "styled-components";
import logo from "../assets/MitaLogo.jpg";
import { Heading, Text } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { useAuthUser } from "../react-query/auth/useAuthUser";
import { useUsers } from "../react-query/users/useUsers";
import { useRecoilState } from "recoil";
import { isSidebarOpenState } from "../data/atomdata";

const Nav = () => {
  //const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const { openSidebar } = useProductsContext();
  const { myUser } = useUserContext();
  const { authuser } = useAuthUser();
  const { users } = useUsers();

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="mita tea shop" />
          </Link>
          <Link to={{ pathname: 'https://www.star-clicks.com/secure/ads.php?pid=42817033652524660'}} target="_blank" >Star Click</Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Heading as="h4" size="md">
                  <Link to={url} href="#">
                    {text}
                  </Link>
                </Heading>
              </li>
            );
          })}
          {authuser && authuser.length > 0 && (
            <Heading as="h4" size="md">
              <li>
                <Link to="/myorders">My Orders</Link>
                <Link to="/checkout">Checkout</Link>
                {users &&
                  users.length > 0 &&
                  users[0].role === "1" &&
                  users[0].email === authuser[0].email && (
                    <Link to="/admin">Admin</Link>
                  )}
              </li>
            </Heading>
          )}
          {/* { authuser && authuser.length > 0 &&
            users && users.length > 0 &&
            users[0].email === authuser.email &&
            users[0].role === "1" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )} */}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;
