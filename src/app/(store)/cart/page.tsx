"use client";

import CartAccordion from "@/components/store/cart/CartAccordion";
import CartCard from "@/components/store/cart/CartCard";
import CartCheckout from "@/components/store/cart/CartCheckout";
import { useCart } from "@/context/CartContext";
import { Fragment, useEffect, useState } from "react";
import { fetchClient } from "../../../../utils/fetchClient";
import toast from "react-hot-toast";
import Link from "next/link";
import ProductCard from "@/components/store/products/ProductCard";
import CartModal from "@/components/store/cart/CartModal";

export default function CartPage() {
  const [accessories, setAccessories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<any>({});

  const fetchAccessories = async () => {
    setLoading(true);
    try {
      const res = await fetchClient(`/accessories`);
      if (res && res.success === true) {
        setLoading(false);
        setAccessories(res.data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error);
      toast.error("Erreur interne du serveur.");
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  return (
    <Fragment>
      <div className="my-20">
        <h1 className="text-xl font-bold py-10 px-6">Votre panier</h1>
        {cart.length === 0 ? (
          <p className="text-xl">Votre panier est vide</p>
        ) : (
          <div className=" block md:flex gap-2 px-6">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
              {cart.map((item, index) => {
                return <CartCard key={index} cartItem={item} />;
              })}
              {/* <CartCard />
              <CartCard />
              <CartCard />
              <CartCard /> */}
            </div>
            <div className=" w-full md:w-[26rem] pt-10 md:pt-0 px-0 md:px-4">
              <div>
                <CartCheckout />
              </div>
              <CartAccordion />
            </div>
          </div>
        )}

        <div className="py-10 px-6">
          <h1 className="font-bold mb-6">Ajoutez des accessoires</h1>
          {accessories && accessories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {accessories.map((item: any, index: number) => {
                return (
                  <Link href={`/products/${item.id}`} key={index}>
                    <ProductCard
                      product={item}
                      setOpen={setOpen}
                      setProduct={setProduct}
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div>
              <h1>Pas d&apos;accessoires</h1>
            </div>
          )}
        </div>
      </div>
      <CartModal open={open} setOpen={setOpen} product={product} />
    </Fragment>
  );
}
