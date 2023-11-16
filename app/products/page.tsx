import { json } from "stream/consumers"
import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";

export const metadata = {
    title: "Product List"
};


type Product = {
    id : number,
    title : string,
    price : number,
    number : number
}

async function getProduct() {
    const res = await fetch ('http://localhost:4500/products',{cache:'no-store'});
    return res.json();
}

export default async function productList(){
    const products: Product[] = await getProduct();
    return (
        <>
        <div className="py-10 px-10">
            <div className="py-2">
                <AddProduct/>
            </div>
            <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index+1}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.number}</td>
                                <td className="flex">
                                    <div className="mr-1">
                                        <UpdateProduct {...product}/>
                                    </div>
                                    <DeleteProduct {...product}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>  
        </>
    )
}