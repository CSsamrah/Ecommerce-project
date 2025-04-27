// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//     AppBar,
//     Toolbar,
//     IconButton,
//     Typography,
//     InputBase,
//     Badge,
//     MenuItem,
//     Menu,
//     Box,
//     Drawer,
//     List,
//     ListItem,
//     ListItemText,
//     Collapse,
//     Tabs,
//     Tab,
// } from '@mui/material';
// import {
//     Menu as MenuIcon,
//     Search as SearchIcon,
//     AccountCircle,
//     MoreVert as MoreIcon,
//     ShoppingCart as ShoppingCartIcon,
//     ExpandLess,
//     ExpandMore,
// } from '@mui/icons-material';
// import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
// import { Link } from 'react-router-dom';
// import { FaHome, FaBookOpen, FaThLarge, FaPhoneAlt } from "react-icons/fa";
// import { useCart } from '../pages/cartContext';

// // import Cart from '../Pages/Cart';

// // Assuming 'Cart' component is imported and defined somewhere in your project

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(3),
//         width: 'auto',
//     },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: '20ch',
//         },
//     },
// }));

// function LinkTab(props) {
//     return (
//         <Tab
//             component={Link}
//             to={props.to}
//             {...props}
//         />
//     );
// }

// LinkTab.propTypes = {
//     to: PropTypes.string.isRequired,
// };

// function NavTabs() {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <Box sx={{ width: '100%' }}>
//             <Tabs
//                 value={value}
//                 onChange={handleChange}
//                 aria-label="nav tabs example"
//                 role="navigation"
//                 sx={{ display: { xs: 'none', md: 'flex' } }}
//             >
//                 <LinkTab label="Home" to="/" sx={{ fontWeight: '800', fontFamily: 'Inter' }} />
//                 <LinkTab label="Dashboard" to="/" sx={{ fontWeight: '800', fontFamily: 'Inter' }} />
//                 <LinkTab label="Shop" to="/" sx={{ fontWeight: '800', fontFamily: 'Inter' }} />
//             </Tabs>
//         </Box>
//     );
// }

// const theme = createTheme({
//     typography: {
//         fontFamily: 'serif',
//     },
//     palette: {
//         primary: {
//             main: '#ffffff',
//             light: '#e0868f',
//             dark: 'ce5f6a',
//             contrastText: '#ffffff',
//         },
//         secondary: {
//             main: '#ed2d93',
//             light: '#f2e0cb',
//             dark: '#f4dbbc',
//             contrastText: '#4f220f',
//         },
//     },
// });

// export default function PrimarySearchAppBar() {
//     const {cartItems} = useCart();
//     const cart_items = cartItems.length;
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
//     const [drawerOpen, setDrawerOpen] = React.useState(false);
//     const [skincareOpen, setSkincareOpen] = React.useState(false);
//     const [shopMobileOpen, setShopMobileOpen] = useState(false);
//     const [sellingMobileOpen, setSellingMobileOpen] = useState(false);
//     const [rentalMobileOpen, setRentalMobileOpen] = useState(false);
//     const [isSearchActive, setIsSearchActive] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [results, setResults] = useState([]);
//     const isMenuOpen = Boolean(anchorEl);
//     const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         console.log("Searching for:", searchQuery);
//         // Implement search functionality here
//         setSearchQuery("");
//         setIsSearchActive(false);
//       };

//     const handleProfileMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMobileMenuClose = () => {
//         setMobileMoreAnchorEl(null);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         handleMobileMenuClose();
//     };

//     const handleMobileMenuOpen = (event) => {
//         setMobileMoreAnchorEl(event.currentTarget);
//     };

//     const handleDrawerToggle = () => {
//         setDrawerOpen(!drawerOpen);
//     };

//     const handleSkincareClick = () => {
//         setSkincareOpen(!skincareOpen);
//     };

//     const handleShopMobileClick = () => {
//         setShopMobileOpen(!shopMobileOpen);
//     };

//     const handleSellingMobileClick = () => {
//         setSellingMobileOpen(!sellingMobileOpen);
//     };

//     const handleRentalMobileClick = () => {
//         setRentalMobileOpen(!rentalMobileOpen);
//     };

//     const menuId = 'primary-search-account-menu';
//     const renderMenu = (
//         <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             id={menuId}
//             keepMounted
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             open={isMenuOpen}
//             onClose={handleMenuClose}
//         >
//             <MenuItem onClick={handleMenuClose} component={Link} to="/sign-up">Sign Up</MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/sign-in">Log In</MenuItem>
//         </Menu>
//     );

//     const mobileMenuId = 'primary-search-account-menu-mobile';
//     const renderMobileMenu = (
//         <Menu
//             anchorEl={mobileMoreAnchorEl}
//             anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             id={mobileMenuId}
//             keepMounted
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             open={isMobileMenuOpen}
//             onClose={handleMobileMenuClose}
//         >
//             <MenuItem>
//                 <form onSubmit={handleSearch} className="search_form">
//                           <input
//                             type="text"
//                             placeholder="Search..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="search_input"
//                           />
//                           <button type="submit" className="search_button">
//                             <IonIcon icon={searchOutline} />
//                           </button>
//                         </form>
//                         <ul className="search_results">
//                           {results.length > 0 ? (
//                             results.map((product) => (
//                               <li key={product.id}>
//                                 {product.name} - ${product.price}
//                               </li>
//                             ))
//                           ) : (
//                             <li>No results found</li>
//                           )}
//                         </ul>
//             </MenuItem>
//             <MenuItem component={Link} to="/cart">
//                 <IconButton aria-label="cart">
//                     <Badge badgeContent={cart_items} color="secondary">
//                         <ShoppingCartIcon />
//                     </Badge>
//                 </IconButton>
//             </MenuItem>
//             <MenuItem onClick={handleProfileMenuOpen}>
//                 <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="primary-search-account-menu"
//                     aria-haspopup="true"
//                     color="inherit"
//                 >
//                     <AccountCircle />
//                 </IconButton>
//                 <p>Profile</p>
//             </MenuItem>
//         </Menu>
//     );

//     const drawer = (
//         <Drawer
//             anchor="left"
//             open={drawerOpen}
//             onClose={handleDrawerToggle}
//             sx={{ '& .MuiDrawer-paper': { width: 300 } }}
//         >
//             <List>
//                 <ListItem button component={Link} to="/">
//                     <ListItemText primary="Home" />
//                 </ListItem>
//                 <ListItem button component={Link} to="/skintest">
//                     <ListItemText primary="Dashboard" />
//                 </ListItem>
//                 <ListItem button onClick={handleSkincareClick}>
//                     <ListItemText primary="Skincare" />
//                     {skincareOpen ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={skincareOpen} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding>
//                         <ListItem button component={Link} to="/skincare/cleansers" sx={{ pl: 4 }}>
//                             <ListItemText primary="Cleansers" />
//                         </ListItem>
//                         <ListItem button component={Link} to="/skincare/moisturizers" sx={{ pl: 4 }}>
//                             <ListItemText primary="Moisturizers" />
//                         </ListItem>
//                         <ListItem button component={Link} to="/skincare/serums" sx={{ pl: 4 }}>
//                             <ListItemText primary="Serums" />
//                         </ListItem>
//                         <ListItem button component={Link} to="/skincare/sunscreen" sx={{ pl: 4 }}>
//                             <ListItemText primary="Sunscreen" />
//                         </ListItem>
//                     </List>
//                 </Collapse>
//             </List>
//         </Drawer>
//     );

//     return (
//         <ThemeProvider theme={theme}>
//             <Box sx={{ flexGrow: 1 }}>
//                 <AppBar position='absolute' color='transparent' elevation={0}>
//                     <Toolbar>
//                         <IconButton
//                             size="large"
//                             edge="start"
//                             color="inherit"
//                             aria-label="open drawer"
//                             sx={{ mr: 2 }}
//                             onClick={handleDrawerToggle}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Box sx={{ flexGrow: 1 }}>
//                             <NavTabs />
//                         </Box>
//                         <Box sx={{ flexGrow: 1 }}>
//                             <Typography
//                                 variant="h4"
//                                 noWrap
//                                 component="div"
//                                 sx={{
//                                     display: 'flex',
//                                     fontWeight: '600',
//                                     color: 'white',
//                                     flexGrow: 1,
//                                     justifyContent: { xs: 'center', md: 'flex-start' },
//                                 }}
//                             >
//                                 Glow Quester
//                             </Typography>
//                         </Box>
//                         {/* <Search>
//                             <SearchIconWrapper>
//                                 <SearchIcon />
//                             </SearchIconWrapper>
//                             <StyledInputBase
//                                 placeholder="Search…"
//                                 inputProps={{ 'aria-label': 'search' }}
//                             />
//                         </Search> */}
//                         <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//                             <Link to="/cart" style={{ textDecoration: 'none' }}>
//                                 <IconButton aria-label="cart">
//                                     <Badge badgeContent={cart_items} color="secondary">
//                                         <ShoppingCartIcon />
//                                     </Badge>
//                                 </IconButton>
//                             </Link>
//                             <IconButton
//                                 size="large"
//                                 edge="end"
//                                 aria-label="account of current user"
//                                 aria-controls={menuId}
//                                 aria-haspopup="true"
//                                 onClick={handleProfileMenuOpen}
//                                 color="inherit"
//                             >
//                                 <AccountCircle />
//                             </IconButton>
//                         </Box>
//                         <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//                             <IconButton
//                                 size="large"
//                                 aria-label="show more"
//                                 aria-controls={mobileMenuId}
//                                 aria-haspopup="true"
//                                 onClick={handleMobileMenuOpen}
//                                 color="inherit"
//                             >
//                                 <MoreIcon />
//                             </IconButton>
//                         </Box>
//                     </Toolbar>
//                 </AppBar>
//                 {renderMobileMenu}
//                 {renderMenu}
//                 {drawer}
//             </Box>
//         </ThemeProvider>
//     );
// }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    AccountCircle,
    MoreVert as MoreIcon,
    ShoppingCart as ShoppingCartIcon,
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { FaHome, FaBookOpen, FaThLarge, FaPhoneAlt } from "react-icons/fa";
import { useCart } from '../pages/cartContext';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function LinkTab(props) {
    return (
        <Tab
            component={Link}
            to={props.to}
            {...props}
        />
    );
}

LinkTab.propTypes = {
    to: PropTypes.string.isRequired,
};

function NavTabs({shopOpen, setShopOpen}) {
    const [value, setValue] = React.useState(0);

    const handleShopClick = () => {
        setShopOpen(!shopOpen);
        setValue(!value); // Toggle value to potentially manage other tabs if needed
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={() => {}} // Prevent default tab change behavior
                aria-label="nav tabs example"
                role="navigation"
                sx={{ display: { xs: 'none', md: 'flex' } }}
            >
                <LinkTab label="Home" to="/" sx={{ fontWeight: '800', fontFamily: 'Inter' }} />
                <LinkTab label="Dashboard" to="/dashboard" sx={{ fontWeight: '800', fontFamily: 'Inter' }} />
                <LinkTab label="Shop" to="/catalog" sx={{ fontWeight: '800', fontFamily: 'Inter' }} />

                {/* <Tab
                    label="Shop"
                    onClick={handleShopClick}
                    sx={{ fontWeight: '800', fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: '5px' }}
                    icon={shopOpen ? <ExpandLess /> : <ExpandMore />}
                    iconPosition="end"
                /> */}
            </Tabs>
            {/* {shopOpen && (
                <Box sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', top: '64px', left: '50%', transform: 'translateX(-50%)', bgcolor: 'white', boxShadow: 1, zIndex: 10 }}>
                    <Box sx={{ display: 'flex' }}>
                        <List disablePadding>
                            <ListItem button component={Link} to="/shop/selling" onClick={() => setShopOpen(false)}>
                                <ListItemText primary="Selling" />
                            </ListItem>
                            <ListItem button component={Link} to="/shop/rental" onClick={() => setShopOpen(false)}>
                                <ListItemText primary="Rental" />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            )} */}
        </Box>
    );
}

const theme = createTheme({
    typography: {
        fontFamily: 'serif',
    },
    palette: {
        primary: {
            main: '#ffffff',
            light: '#e0868f',
            dark: 'ce5f6a',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ed2d93',
            light: '#f2e0cb',
            dark: '#f4dbbc',
            contrastText: '#4f220f',
        },
    },
});

export default function PrimarySearchAppBar() {
    const { cartItems } = useCart();
    const cart_items = cartItems ? cartItems.length : 0;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [skincareOpen, setSkincareOpen] = React.useState(false);
    const [shopMobileOpen, setShopMobileOpen] = useState(false);
    const [sellingMobileOpen, setSellingMobileOpen] = useState(false);
    const [rentalMobileOpen, setRentalMobileOpen] = useState(false);
    const [shopOpen, setShopOpen] = useState(false);
    // New state variables for New and Second Hand dropdowns
    const [newSellingOpen, setNewSellingOpen] = useState(false);
    const [secondHandSellingOpen, setSecondHandSellingOpen] = useState(false);
    const [newRentalOpen, setNewRentalOpen] = useState(false);
    const [secondHandRentalOpen, setSecondHandRentalOpen] = useState(false);


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

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleSkincareClick = () => {
        setSkincareOpen(!skincareOpen);
    };

    const handleShopMobileClick = () => {
        setShopMobileOpen(!shopMobileOpen);
    };

    const handleSellingMobileClick = () => {
        setSellingMobileOpen(!sellingMobileOpen);
    };

    const handleRentalMobileClick = () => {
        setRentalMobileOpen(!rentalMobileOpen);
    };

    const handleNewSellingClick = () => {
        setNewSellingOpen(!newSellingOpen);
    };
    
    const handleSecondHandSellingClick = () => {
        setSecondHandSellingOpen(!secondHandSellingOpen);
    };
    
    const handleNewRentalClick = () => {
        setNewRentalOpen(!newRentalOpen);
    };
    
    const handleSecondHandRentalClick = () => {
        setSecondHandRentalOpen(!secondHandRentalOpen);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component={Link} to="/sign">Sign Up</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/sign">Log In</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem component={Link} to="/cart">
                <IconButton aria-label="cart">
                    <Badge badgeContent={cart_items} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const drawer = (
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{ '& .MuiDrawer-paper': { width: 300 } }}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Dashborad" />
                </ListItem>
                {/* <ListItem button onClick={handleSkincareClick}>
                    <ListItemText primary="Skincare" />
                    {skincareOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={skincareOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to="/skincare/cleansers" sx={{ pl: 4 }}>
                            <ListItemText primary="Cleansers" />
                        </ListItem>
                        <ListItem button component={Link} to="/skincare/moisturizers" sx={{ pl: 4 }}>
                            <ListItemText primary="Moisturizers" />
                        </ListItem>
                        <ListItem button component={Link} to="/skincare/serums" sx={{ pl: 4 }}>
                            <ListItemText primary="Serums" />
                        </ListItem>
                        <ListItem button component={Link} to="/skincare/sunscreen" sx={{ pl: 4 }}>
                            <ListItemText primary="Sunscreen" />
                        </ListItem>
                    </List>
                </Collapse> */}
                {/* Shop main category */}
                <ListItem button onClick={handleShopMobileClick}>
                    <ListItemText primary="Shop" />
                    {shopMobileOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={shopMobileOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* Selling category */}
                        <ListItem button onClick={handleSellingMobileClick} sx={{ pl: 4 }}>
                            <ListItemText primary="Selling" />
                            {sellingMobileOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={sellingMobileOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {/* New subcategory under Selling */}
                                <ListItem button onClick={handleNewSellingClick} sx={{ pl: 8 }}>
                                    <ListItemText primary="New" />
                                    {newSellingOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={newSellingOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button component={Link} to="/shop/selling/new/category1" sx={{ pl: 12 }}>
                                            <ListItemText primary="Computer Hardware" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/selling/new/category2" sx={{ pl: 12 }}>
                                            <ListItemText primary="Networking Components" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/selling/new/category3" sx={{ pl: 12 }}>
                                            <ListItemText primary="Peripherals and Accessories" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/selling/new/category4" sx={{ pl: 12 }}>
                                            <ListItemText primary="Storage and Backup" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/selling/new/category5" sx={{ pl: 12 }}>
                                            <ListItemText primary="Power and Electrical" />
                                        </ListItem>
                                    </List>
                                </Collapse>
                                
                                {/* Second Hand subcategory under Selling */}
                                <ListItem button onClick={handleSecondHandSellingClick} sx={{ pl: 8 }}>
                                    <ListItemText primary="Second Hand" />
                                    {secondHandSellingOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={secondHandSellingOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button component={Link} to="/shop/selling/second-hand/category1" sx={{ pl: 12 }}>
                                            <ListItemText primary="Computer Hardware" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/selling/second-hand/category2" sx={{ pl: 12 }}>
                                            <ListItemText primary="Networking Components" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/selling/second-hand/category3" sx={{ pl: 12 }}>
                                            <ListItemText primary="Peripherals and Accessories" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/selling/second-hand/category4" sx={{ pl: 12 }}>
                                            <ListItemText primary="Storage and Backup" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/selling/second-hand/category5" sx={{ pl: 12 }}>
                                            <ListItemText primary="Power and Electrical" />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </Collapse>
                        
                        {/* Rental category */}
                        <ListItem button onClick={handleRentalMobileClick} sx={{ pl: 4 }}>
                            <ListItemText primary="Rental" />
                            {rentalMobileOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={rentalMobileOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {/* New subcategory under Rental */}
                                <ListItem button onClick={handleNewRentalClick} sx={{ pl: 8 }}>
                                    <ListItemText primary="New" />
                                    {newRentalOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={newRentalOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button component={Link} to="/shop/rental/new/category1" sx={{ pl: 12 }}>
                                            <ListItemText primary="Computer Hardware" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/rental/new/category2" sx={{ pl: 12 }}>
                                            <ListItemText primary="Networking Components" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/rental/new/category3" sx={{ pl: 12 }}>
                                            <ListItemText primary="Peripherals and Accessories" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/rental/new/category4" sx={{ pl: 12 }}>
                                            <ListItemText primary="Storage and Backup" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/rental/new/category5" sx={{ pl: 12 }}>
                                            <ListItemText primary="Power and Electrical" />
                                        </ListItem>
                                    </List>
                                </Collapse>
                                
                                {/* Second Hand subcategory under Rental */}
                                <ListItem button onClick={handleSecondHandRentalClick} sx={{ pl: 8 }}>
                                    <ListItemText primary="Second Hand" />
                                    {secondHandRentalOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={secondHandRentalOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button component={Link} to="/shop/rental/second-hand/category1" sx={{ pl: 12 }}>
                                            <ListItemText primary="Computer Hardware" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/rental/second-hand/category2" sx={{ pl: 12 }}>
                                            <ListItemText primary="Networking Components" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/rental/second-hand/category3" sx={{ pl: 12 }}>
                                            <ListItemText primary="Peripherals and Accessories" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/rental/second-hand/category4" sx={{ pl: 12 }}>
                                            <ListItemText primary="Storage and Backup" />
                                        </ListItem>
                                        <ListItem button component={Link} to="/shop/rental/second-hand/category5" sx={{ pl: 12 }}>
                                            <ListItemText primary="Power and Electrical" />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </Collapse>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='absolute' color='transparent' elevation={0}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }}>
                            <NavTabs />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="h4"
                                noWrap
                                component="div"
                                sx={{
                                    display: 'flex',
                                    fontWeight: '600',
                                    color: 'white',
                                    flexGrow: 1,
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                }}
                            >
                                TechWare
                            </Typography>
                        </Box>
                        {/* <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search> */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Box onMouseLeave={() => setShopOpen(false)}>
                                {shopOpen && (
                                    <Box sx={{ position: 'absolute', top: '64px', bgcolor: 'white', boxShadow: 1, zIndex: 10, display: 'flex' }}>
                                        <List disablePadding>
                                            <ListItem button component={Link} to="/shop/selling">
                                                <ListItemText primary="Selling" />
                                            </ListItem>
                                            <ListItem button component={Link} to="/shop/rental">
                                                <ListItemText primary="Rental" />
                                            </ListItem>
                                        </List>
                                    </Box>
                                )}
                            </Box>
                            <Link to="/cart" style={{ textDecoration: 'none' }}>
                                <IconButton aria-label="cart">
                                    <Badge badgeContent={cart_items} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Link>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
                {drawer}
            </Box>
        </ThemeProvider>
    );
}