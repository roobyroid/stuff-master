import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import { useState, useEffect } from 'react';

import { toggleForm } from '../../features/user/userSlice';
import { ROUTES } from '../../utils/routes';

import styles from '../../styles/Header.module.css';

import logo from '../../images/logo.svg';
import avatar from '../../images/avatar.jpg';

const Header = () => {
	const [values, setValues] = useState({ name: 'Guest', avatar: avatar });
	const [searchValue, setSearchValue] = useState('');
	const { currentUser, cart } = useSelector(({ user }) => user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { data, isLoading } = useGetProductsQuery({ title: searchValue });

	useEffect(() => {
		if (!currentUser) return;

		setValues(currentUser);
	}, [currentUser, values]);

	const handleClick = () => {
		if (!currentUser) dispatch(toggleForm(true));
		else navigate(ROUTES.PROFILE);
	};

	const handleSearch = ({ target: { value } }) => {
		setSearchValue(value);
	};

	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={logo} alt="Stuff" />
				</Link>
			</div>

			<div className={styles.info}>
				<div className={styles.user} onClick={handleClick}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${values.avatar})` }}
					/>
					<div className={styles.username}>{values.name}</div>
				</div>

				<form className={styles.form}>
					<div className={styles.icon}>
						<svg className="icon">
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
						</svg>
					</div>
					<div className={styles.input}>
						<input
							type="search"
							name="search"
							placeholder="Search for anything..."
							autoComplete="off"
							onChange={handleSearch}
							value={searchValue}
						/>
					</div>

					{searchValue && (
						<div className={styles.box}>
							{isLoading
								? 'Loading'
								: !data.length
								? 'No results'
								: data.map(({ id, title, images }) => {
										return (
											<Link
												to={`/products/${id}`}
												key={id}
												className={styles.item}
												onClick={() => setSearchValue('')}
											>
												<div
													className={styles.image}
													style={{
														backgroundImage: `url(${images[0]})`,
													}}
												/>
												<div className={styles.title}>{title}</div>
											</Link>
										);
								  })}
						</div>
					)}
				</form>

				<div className={styles.account}>
					<Link to={ROUTES.HOME} className={styles.favorites}>
						<svg className={styles['icon-fav']}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
						</svg>
					</Link>

					<Link to={ROUTES.CART} className={styles.cart}>
						<svg className={styles['icon-cart']}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
						</svg>
						{!!cart.length && (
							<span className={styles.count}>{cart.length}</span>
						)}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
