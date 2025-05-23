"use client";

import ProductCard from "@/components/store/products/ProductCard";
import { Fragment, useEffect, useState } from "react";
import ProductFilter from "@/components/store/products/ProductFilter";
import Link from "next/link";
import CartModal from "@/components/store/cart/CartModal";
import { fetchClient } from "../../../../utils/fetchClient";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon, FunnelIcon } from "@heroicons/react/24/outline";

export default function Products() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState<ProductType | {}>({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [openFilter, setOpenFilter] = useState(false);

  const category = searchParams?.get("category");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchClient(
        "/products?category=" +
          category +
          "&color=" +
          filters.color +
          "&size=" +
          filters.size +
          "&sort_price=" +
          filters.sort_price +
          "&status=" +
          filters.status +
          "&name=" +
          filters.name
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [category, filters]);

  return (
    <Fragment>
      <div className="mt-10 px-6">
        <div className="flex gap-3 text-xl items-center">
          <h1 className="font-bold capitalize">
            {category ? category : "Tous"}
          </h1>
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <p className="text-gray-400">{products.length} articles</p>
        </div>
      </div>

      <div className="py-2 px-6">
        {/* Bouton pour ouvrir le filtre sur mobile */}
        <button
          className="sm:hidden flex items-center gap-2 px-3 py-1 text-sm border rounded-md"
          onClick={() => setOpenFilter(true)}
        >
          <FunnelIcon className="h-5 w-5" />
          Filtres
        </button>
      </div>

      <div className="w-full flex gap-2 px-6 py-4 overflow-x-hidden">
        <div className="w-[14rem] hidden sm:block">
          <ProductFilter setFilters={setFilters} />
        </div>

        <div className=" w-full sm:flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((item: any, index: number) => {
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

          <div className="h-80 flex justify-center items-center w-full">
            <p>Vous avez atteint la fin de cette sélection</p>
          </div>
        </div>
      </div>
      <CartModal open={open} setOpen={setOpen} product={product} />

      {/* Modale pour le filtre sur mobile */}
      <Dialog
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        className="relative z-50"
      >
        {/* Fond */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          {/* Contenu de la modale */}
          <DialogPanel className="bg-white rounded-md w-full max-w-sm p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filtres</h2>
              <button onClick={() => setOpenFilter(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="h-[25rem] custom-scrollbar">
              <ProductFilter setFilters={setFilters} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Fragment>
  );
}
