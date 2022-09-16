import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Container, Button, Table, Form } from "react-bootstrap";
import { useForm } from "react-hook-form"

import ModalComponent from "../components/Product/Modal";

import { configs } from "../config/uri";
import { ICategory } from "../models/Data/ICategory";
import NewProduct from "../components/Product/NewProduct";


export default function Products() {

  const [dataProducts, setDataProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  const [showNewProduct, setNewProduct] = useState(false)

  const [productDetails, setProductDetails] = useState<any>({});
  const [categories, setCategories] = useState<ICategory[]>([])
  
  const {register, handleSubmit, reset} = useForm()

  const deleteProduct = async (id:Number) => {
    if(window.confirm('Are you sure you want to delete this product?')){

      await fetch(`${configs.backend}/products/delete`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(id),
      })
  
      fetchProducts()
      return;
    }

  }

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:8080/api/products/find-all");
    const products = await res.json();
    fetchCategories()
    setDataProducts(products);
  };

  const fetchOneProduct = async (productId: Number) => {
    const resOneProduct = await fetch(
      `http://localhost:8080/api/products/find-one/${productId}`
    );
    const productDetails = await resOneProduct.json();
    setProductDetails(productDetails);
    reset()
    console.log(productDetails, 'base form');
  };

  const fetchCategories = async () => {
    const resCategories = await fetch(`${configs.backend}/categories/find-all`)
    const categoriesList = await resCategories.json()
    setCategories(categoriesList)
  }

  const handleForm = async (data:any) => {
   await fetch(`${configs.backend}/products/update`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
   })
   closeModal(false)
   fetchProducts()
  }

  const closeModal = (value: boolean) => {
    setShowModal(value);
  };

  const closeNewProductForm = () => {
    setNewProduct(false)
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <NavBar activeElement="products" />
      <Container className="mt-5">
        <ModalComponent
          showModal={showModal}
          title="Edit a product"
          closeModal={closeModal}
          handleForm={handleForm}
        >
          {productDetails.name ? <Form onSubmit={handleSubmit(handleForm)}>
            <Form.Group className="mb-3" >
              <Form.Label>Product ID</Form.Label>
              <Form.Control type="text" placeholder="Id" {...register("id")} required readOnly value={productDetails.id} defaultValue={productDetails.id} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Write a name" {...register("name")} required  defaultValue={productDetails.name ? productDetails.name : ' '} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select placeholder="Choose a category" defaultValue={1} required  {...register("category.id")} >
                  {categories.map((category,index)=>{
                    return <option key={'optionCategory'+index} value={category.id}>
                      {category.name}
                    </option>
                  })}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01" required min={0} {...register("price")} defaultValue={productDetails.price}  placeholder="Set a price" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select {...register("productStatus")} required defaultValue={productDetails.productStatus} placeholder="Choose a status">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
            </Form.Group>
             <Button type="submit">
                  Submit form
              </Button>     
          </Form> : ' '}
        </ModalComponent>
        
        <NewProduct showModal={showNewProduct}
          title="Add a product"
          closeModal={closeNewProductForm}>
             <Form onSubmit={handleSubmit(handleForm)}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Write a name" required {...register("name")} defaultValue=" " />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select placeholder="Choose a category" defaultValue={1}  {...register("category.id")} >
                  {categories.map((category,index)=>{
                    return <option key={'optionCategory'+index} value={category.id}>
                      {category.name}
                    </option>
                  })}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01" min={0} {...register("price")} defaultValue=" "  placeholder="Set a price" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select {...register("productStatus")} defaultValue={productDetails.productStatus} placeholder="Choose a status">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
            </Form.Group>
             <Button type="submit">
                  Submit form
              </Button>     
          </Form>
        </NewProduct>

        <h3>Products</h3>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={()=>{ reset(); setNewProduct(true)}} className="px-lg-5">
            Create Product
          </Button>
        </div>
        <Table bordered className="text-center mt-4">
          <thead className="bg-light">
            <tr>
              <th>N°</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataProducts.map((el, index): any => {
              return (
                <tr key={"keyRow" + index}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.category.name}</td>
                  <td>$ {el.price}</td>
                  <td>{el.productStatus}</td>
                  <td>
                    <Button
                      onClick={() => {
                        fetchOneProduct(el.id);
                        setShowModal(true);
                      }}
                      variant="warning"
                      className="mx-2"
                    >
                      Edit
                    </Button>
                    <Button onClick={()=>{
                      deleteProduct(el.id)
                    }} variant="danger" className="mx-2">
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
