import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { getRelatedProducts } from '../../features/products/productsSlice';
import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';

const SingleProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
	const { list, related } = useSelector(({ products }) => products);

	useEffect(() => {
		if (!isLoading && !isFetching && !isSuccess) {
			navigate(ROUTES.HOME);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, isFetching, isSuccess]);

	useEffect(() => {
		if (!data || !list.length) return;
		dispatch(getRelatedProducts(data.category.id));
	}, [data, list.length, dispatch]);

	return !data ? (
		<section className="preloader">Loading</section>
	) : (
		<>
			<Product {...data} />
			<Products products={related} amount={5} title="Related products" />
		</>
	);
};

export default SingleProduct;
