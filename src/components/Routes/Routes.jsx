import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Home/Home';
import SingleProduct from '../Products/SingleProduct';
import Profile from '../Profile/Profile';
import SingleCategory from '../Categories/SingleCategory';

import { ROUTES } from '../../utils/routes';
import Cart from '../Cart/Cart';

const AppRoutes = () => (
	<Routes basename="stuff-master">
		<Route index element={<Home />} />
		<Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
		<Route path={ROUTES.PROFILE} element={<Profile />} />
		<Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
		<Route path={ROUTES.CART} element={<Cart />} />
	</Routes>
);

export default AppRoutes;
