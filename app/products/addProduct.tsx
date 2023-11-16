'use client'
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function AddProduct () {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();


    async function handleSubmit(e:SyntheticEvent) {
        e.preventDefault();

        setIsMutating(true);

        await fetch("http://localhost:4500/products" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                price: price,
            }),
        });

        setIsMutating(false);

        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }
    return (
        <div>
            <button className="btn" onClick={handleChange}>
                Add New
            </button>
            <input type="checkbox"  checked={modal} onChange= {handleChange}
            className="modal-toggle"/>
            <div className="modal">
            <div className="modal-box">
                <h3 className="font-hold text-lg">Add new product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="" className="label font-bold">Title</label>
                        <input type="text" 
                        className="input w-full input-bordered" 
                        placeholder="Product name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="" className="label font-bold">Price</label>
                        <input type="text" 
                        className="input w-full input-bordered" 
                        placeholder="Price" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn"
                        onClick={handleChange}>Close</button>
                        {!isMutating ? (
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        ) : (
                            <button type="button" className="btn loading">
                                Saving...
                            </button>
                        )}
                        
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}