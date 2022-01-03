import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Badge, InputBase, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

//
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        // backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
//
export default function Navbar(props) {
    // ! navigate
    const navigate = useNavigate()

    // !
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            {/* {
                currentUser ? (

                    <Button onClick={logout}>
                        <h6 className="text3">{currentUser.email}</h6>
                        <LogoutIcon />
                    </Button>

                ) : (
                    <Link to="/register">
                        <Button >
                            Войти
                            <AccountCircle
                                style={{ color: "rgba(169, 169, 169, 0.748)" }}
                            />
                        </Button>
                    </Link>
                )} */}

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Link to="/cart">
                <MenuItem>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge
                            style={{ color: "black" }}
                            // badgeContent={productsCountInCart}
                            color="error"
                        >
                            {/* <ShoppingCart /> */}
                        </Badge>
                    </IconButton>
                    <p style={{ color: '#1a1a1a' }} >Корзина</p>
                </MenuItem>
            </Link>
            <MenuItem onClick={() => {
                // handleOpen();
                // getFavorite();
            }}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    {/* <Badge badgeContent={productsCountInFavorites} color="error">
                        <BookmarkBorderIcon />
                    </Badge> */}
                </IconButton>
                <p>Избранное</p>
            </MenuItem>
            <MenuItem onClick={() => {
                // navigate('/purchaseHistory')
            }}>
                <IconButton
                    size="large"
                    color="inherit"
                    style={{ color: "black" }}

                >
                    <Badge color="error">
                        {/* <ListAltIcon /> */}
                    </Badge>
                </IconButton>
                <p>Покупки</p>
            </MenuItem>
            <MenuItem onClick={() => {
                // navigate('/views')
            }}>
                <IconButton
                    onClick={() => navigate('/views')}
                    size="large"
                    aria-label="show 17 new notifications"
                    style={{ color: "black" }}
                >
                    <Badge color="error">
                        {/* <HistoryIcon /> */}
                    </Badge>
                </IconButton>
                <p>История</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {/* <AccountCircle /> */}
                </IconButton>
                <p>Профиль</p>
            </MenuItem>
        </Menu>
    );
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className='my-navbar bx-none' position="static">
                    <Toolbar >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        // onClick={() => navigate('/')}
                        >
                            <img className='nav-logo'
                                src=""
                                alt="" />
                        </Typography>
                        {/* <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    onChange={(e) => {
                                        filterPhones(`q`, e.target.value);
                                    }}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search> */}

                        {/* {currentUser ? (
                                currentUser.email === adminEmail ? (
                                    <Link to="/admin">
                                        <Button>Admin</Button>
                                    </Link>
                                ) : null
                            ) : null} */}
                        {/* <Link to='/products'>
                                <Button style={{ color: '#000' }}>Наши продукты</Button>
                            </Link> */}
                        <a href='/' className='navbar-p' >Home</a>
                        {/* <a href='' className='navbar-p'>About</a> */}
                        {/* <a className='navbar-p'>Fabrics</a> */}
                        <a href='#new-in' className='navbar-p'>Home Accessories</a>
                        <a href='#contact' className='navbar-p'>Contact</a>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Link to="/cart">
                                    <Badge
                                        style={{ color: "rgba(102, 102, 102, 0.644)" }}
                                        // badgeContent={productsCountInCart}
                                        color="error"
                                    >
                                        {/* <ShoppingCart /> */}
                                    </Badge>
                                </Link>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                style={{ color: "rgba(102, 102, 102, 0.644)" }}
                            >
                                {/* <Badge badgeContent={productsCountInFavorites} color="error">
                                        <BookmarkBorderIcon
                                            onClick={() => {
                                                handleOpen();
                                                getFavorite();
                                            }}
                                        />
                                    </Badge> */}
                            </IconButton>
                            <IconButton
                                onClick={() => navigate('/views')}
                                size="large"
                                aria-label="show 17 new notifications"
                                style={{ color: "rgba(102, 102, 102, 0.644)" }}
                            >
                                <Badge color="error">
                                    {/* <HistoryIcon /> */}
                                </Badge>
                            </IconButton>
                            <MenuItem onClick={() => {
                                navigate('/purchaseHistory')
                            }}>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    style={{ color: "rgba(102, 102, 102, 0.644)" }}

                                >
                                    <Badge color="error">
                                        {/* <ListAltIcon /> */}
                                    </Badge>
                                </IconButton>
                            </MenuItem>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                style={{ color: "rgba(102, 102, 102, 0.644)" }}
                            >
                                {/* {currentUser ? (
                                        <>
                                            <p style={{ fontSize: '15px' }} className="text3">{currentUser.email}</p>
                                            <LogoutIcon onClick={() => {
                                                logout()
                                            }} />
                                        </>
                                    ) : (
                                        <Link to="/register">

                                            <AccountCircle
                                                style={{ color: "rgba(169, 169, 169, 0.748)" }}
                                            />

                                        </Link>
                                    )} */}
                                <AccountCircle
                                // style={{ color: "rgba(169, 169, 169, 0.748)" }}
                                />

                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                style={{ color: "rgba(102, 102, 102, 0.644)" }}
                            >
                                {/* <MoreIcon /> */}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
        </React.Fragment>
    );
}
