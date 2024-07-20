import { CategoriesSection } from "../components/CategoriesSection"
import { ProductShop } from "../components/ProductShop"
import { ProductsSection } from "../components/ProductsSection"
import { ShoppingLayout } from "../layout/ShoppingLayout"

export const HomePage = () => {
    return (
        <ShoppingLayout>
            <div className="mt-36">
                <ProductShop />
                <CategoriesSection />
                <ProductsSection />
            </div>
        </ShoppingLayout>
    )
}
