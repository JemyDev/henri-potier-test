import type { ReactElement } from "react";
import { useRef } from "react";
import { useStore } from "@nanostores/react";

import { CartItem } from "@components/CartItem";
import { CartTotal } from "@components/CartTotal";
import { useClickOutside } from "@hooks/useClickOutside";
import { cartItems, isCartOpen } from "@stores/cart";

export function Cart(): ReactElement | null {
    const items = useStore(cartItems);
    const cartOpen = useStore(isCartOpen);
	const parentRef = useRef<HTMLDivElement | null>(null);
	const wrapperRef = useClickOutside<HTMLBaseElement, HTMLDivElement>({ parentRef, callback: onClose });

    return (
        <div ref={parentRef} className={`relative z-10 bg-opacity-0 transition-opacity ${cartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
						<div className="pointer-events-auto relative w-screen max-w-md">
							<div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
								<button type="button" onClick={onClose} className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
									<span className="sr-only">Close panel</span>
									X
								</button>
							</div>
							<aside ref={wrapperRef} className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
								<div className="px-4 sm:px-6">
									<h2 className="text-lg font-medium text-gray-900">List of items</h2>
								</div>
								<div className="relative mt-6 flex-1 px-4 sm:px-6">
									{Object.values(items).length === 0 ? (
										<p>Cart is empty for now!</p>
									) : (
										<div className="flex flex-col gap-3">
											{Object.values(items).map(item => (
												<CartItem key={item.id} item={item} />
											))}
											<CartTotal />
										</div>
									)}
								</div>
							</aside>
						</div>
					</div>
				</div>
			</div>
		</div>
    );

    function onClose() {
		isCartOpen.set(false);
    };
}