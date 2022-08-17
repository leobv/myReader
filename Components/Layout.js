import { Outlet, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchAppBar from "./NavBar";


const Layout = () => {
  return (
    <>
      <nav>
          <SearchAppBar aria-label='text'>
            <ButtonGroup variant="contained" aria-label="text button group">
              <Button><Link to="/">Home</Link></Button>  
              <Button><Link to="/search">Search Book</Link></Button>
            </ButtonGroup>
          </SearchAppBar>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;