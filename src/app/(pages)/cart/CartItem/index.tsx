'use client';

import React, { useState } from 'react';

import classes from './index.module.scss';
import Link from 'next/link';
import { Media } from '../../../_components/Media';
import { Price } from '../../../_components/Price';
import Image from 'next/image';
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton';
import plus from '../../../../../public/assets/icons/plus.svg'
import minus from '../../../../../public/assets/icons/minus.svg'


const CartItem = ({ product, title, metaImage, qty, addItemToCart }) => {
	const [quantity, setQuantity] = useState(qty);

	const decrementQty = () => {
		const updatedQty = quantity > 1 ? quantity - 1 : 1;
		setQuantity(updatedQty);
		addItemToCart({ product, quantity: Number(updatedQty) });
	};

	const incrementQty = () => {
		const updatedQty = quantity + 1;
		setQuantity(updatedQty);
		addItemToCart({ product, quantity: Number(updatedQty) });
	};

	const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedQty = Number(e.target.value);
		setQuantity(updatedQty);
		addItemToCart({ product, quantity: Number(updatedQty) });
	};

	return (
		<li className={classes.item} key={title}>
			<Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
				{!metaImage && <span>No Image</span>}
				{metaImage && typeof metaImage !== 'string' && (
					<Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
				)}
			</Link>

			<div className={classes.itemDetails}>
				<div className={classes.titleWrapper}>
					<h6>{title}</h6>
					<Price product={product} button={false} />
				</div>
				<div className={classes.quantity}>
					<div className={classes.quantityBtn} onClick={decrementQty}>
						<Image
							src={minus}
							alt="minus"
							width={24}
							height={24}
							className={classes.qtnBt}
						/>
					</div>

					<input
						type="text"
						className={classes.quantityInput}
						value={quantity}
						onChange={enterQty}
					/>

					<div className={classes.quantityBtn} onClick={incrementQty}>
						<Image
							src={plus}
							alt="plus"
							width={24}
							height={24}
							className={classes.qtnBt}
						/>
					</div>
				</div>
			</div>
			<div className={classes.subtotalWrapper}>
				<Price product={product} button={false} quantity={quantity} />
				<RemoveFromCartButton product={product} />
			</div>
		</li>
	);
};

export default CartItem;
