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

import React, { useState, useEffect } from 'react';
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
    ListItemButton,
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
import axios from 'axios';

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
                <LinkTab label="Selling" to="/catalog" sx={{ fontWeight: '800', fontFamily: 'Inter' }} />
                <LinkTab label="Rental" to="/rentalCatalog" sx={{ fontWeight: '800', fontFamily: 'Inter' }} />

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
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            console.log("Fetching categories...");
            // Simplified request - no authentication headers
            const response = await axios.get("http://localhost:3000/api/categories/getAllCategories");
            
            console.log("Response received:", response.data);
            // console.log("1Current products state:", products)
            
            // Check if response has data property
            if (response.data && (response.data.data || Array.isArray(response.data))) {
              // Handle both possible response formats
              const categoriesData = Array.isArray(response.data) ? response.data : 
                                  (response.data.data ? response.data.data : []);
              
              setCategories(categoriesData);
            //   console.log("2Current products state:", products)
              // console.log("The products are:", products);
            } else {
              console.error("Unexpected response format:", response.data);
              setError("Invalid data format received from server");
            }
            
            setLoading(false);
          } catch (err) {
            console.error("Error fetching categories:", err);
            setError(err.message || "Failed to fetch categories");
            setLoading(false);
          }
        };
    
        fetchCategories();
      }, []);
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get("http://localhost:3000/api/categories/getAllCategories");
    //             console.log("Full API response:", response.data);
    
    //             // Directly access the categories array from response.data
    //             const receivedCategories = response.data?.categories || [];
    
    //             if (receivedCategories.length > 0) {
    //                 setCategories(receivedCategories);
    //                 setError(null);
    //                 console.log("Categories set:", receivedCategories);
    //             } else {
    //                 console.warn("Received empty categories array");
    //                 setError("No categories found");
    //                 setCategories([]); // Explicitly set empty array
    //             }
    //         } catch (error) {
    //             console.error("API Error:", error);
    //             setError(error.message || "Failed to fetch categories");
    //             setCategories([]); // Clear on error
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchCategories();
    // }, []);
    useEffect(() => {
        console.log("Current categories state:", categories);
      }, [categories]);
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get('http://localhost:3000/api/categories/getAllCategories');
    //             console.log("Categories response:", response.data);
    //             if (response.data.categories) {
    //                 setCategories(response.data.categories);
    //                 setError(null);
    //             } else {
    //                 throw new Error("Unexpected response format");
    //             }
    //             // setCategories(response.data.categories);
    //             // console.log("categories:", categories);
    //             // console.log("set categories",setCategories);
    //             // setError(null);
    //         } catch (error) {
    //             console.error("Error fetching categories:", error);
    //             setError(err.message || "Failed to fetch categories");
    //             // setLoading(false);
    //         }finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchCategories();
    // }, []);


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
                <ListItem button component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItem>
                
                {/* Selling Section */}
                <ListItem button onClick={handleSellingMobileClick}>
                    <ListItemText primary="Selling" />
                    {sellingMobileOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={sellingMobileOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* New Products */}
                        <ListItem button onClick={handleNewSellingClick} sx={{ pl: 4 }}>
                            <ListItemText primary="New" />
                            {newSellingOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={newSellingOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {categories && categories.map(category => (
                                        <ListItem 
                                            key={`new-${category.slug}`}
                                            button 
                                            component={Link} 
                                            to={`/category/${category.slug}?condition=new`}
                                            sx={{ pl: 4 }}
                                            onClick={handleDrawerToggle}
                                        >
                                            <ListItemText className="category_name" primary={category.name} />
                                        </ListItem>
                                    ))}
                            </List>
                        </Collapse>
                        
                        {/* Second Hand Products */}
                        <ListItem button onClick={handleSecondHandSellingClick} sx={{ pl: 4 }}>
                            <ListItemText primary="Second Hand" />
                            {secondHandSellingOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={secondHandSellingOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {categories && categories.map(category => (
                                    <ListItem 
                                        key={`second-hand-${category.slug}`}
                                        button 
                                        component={Link} 
                                        to={`/category/${category.slug}?condition=second-hand`}
                                        sx={{ pl: 4 }}
                                        onClick={handleDrawerToggle}
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </Collapse>
                
                {/* Rental Section */}
                <ListItem button onClick={handleRentalMobileClick}>
                    <ListItemText primary="Rental" />
                    {rentalMobileOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={rentalMobileOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* New Rental Products */}
                        <ListItem button onClick={handleNewRentalClick} sx={{ pl: 4 }}>
                            <ListItemText primary="New" />
                            {newRentalOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={newRentalOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {categories && categories.map(category => (
                                    <ListItem 
                                        key={`rental-new-${category.slug}`}
                                        button 
                                        component={Link} 
                                        to={`/rental-category/${category.slug}?condition=new`}
                                        sx={{ pl: 4 }}
                                        onClick={handleDrawerToggle}
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        
                        {/* Second Hand Rental Products */}
                        <ListItem button onClick={handleSecondHandRentalClick} sx={{ pl: 4 }}>
                            <ListItemText primary="Second Hand" />
                            {secondHandRentalOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={secondHandRentalOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {categories && categories.map(category => (
                                    <ListItem 
                                        key={`rental-second-hand-${category.slug}`}
                                        button 
                                        component={Link} 
                                        to={`/rental-category/${category.slug}?condition=second-hand`}
                                        sx={{ pl: 4 }}
                                        onClick={handleDrawerToggle}
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItem>
                                ))}
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