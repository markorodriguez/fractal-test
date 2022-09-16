import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Container, Button, Table, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ModalSOrder from "../components/SpecificOrder/ModalSOrder";
import { ICategory } from "../models/Data/ICategory";
import { configs } from "../config/uri";
import ModalNewSOrder from "../components/SpecificOrder/ModalNewSOrder";

export default function OrderDetails() {
    const [orderData, setOrderData] = useState<any>({});
    const [orderDetails, setOrderDetails] = useState<any[]>([]);
    const [taxesDetails, setTaxesDetails] = useState<any>({});

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>({});
    const [products, setProducts] = useState<ICategory[]>([]);

    const { register, handleSubmit, reset } = useForm();

    const [selectedProduct, setSelectedProduct] = useState<any>();

    const [showModalNew, setShowModalNew] = useState(false);

    const { id }: any = useParams();

    const navigator = useNavigate();

    
    useEffect(() => {
        fetchOrderData(id);
        fetchOrderDetails(id);
        fetchProducts();
    }, [id]);


    const fetchOrderData = async (orderId: number) => {
        const resOrder = await fetch(
            `http://localhost:8080/api/orders/find-one/${orderId}`
        );

        try {
            const orderDescription = await resOrder.json();
            setOrderData(orderDescription);
        } catch (error) {
            navigator("/orders");
        }
    };

    const fetchOrderDetails = async (orderId: number) => {
        const resOrderDtls = await fetch(
            `http://localhost:8080/api/order/${orderId}`
        );

        const orderDtls = await resOrderDtls.json();

        setOrderDetails(orderDtls);

        const orderDtslObj = {
            subtotal: orderDtls.reduce((a: any, b: any) => a + b.subtotal, 0),

            get totalCityTax() {
                return this.subtotal * 0.1;
            },
            get totalCountyTax() {
                return this.subtotal * 0.055;
            },
            get totalStateTax() {
                return this.subtotal * 0.0924;
            },
            get totalFederalTax() {
                return this.subtotal * 0.0249;
            },
            get totalTaxes() {
                return (
                    this.totalCityTax +
                    this.totalCountyTax +
                    this.totalStateTax +
                    this.totalFederalTax
                );
            },
            get totalOrder() {
                return this.subtotal + this.totalTaxes;
            },
        };

        setTaxesDetails(orderDtslObj);
    };

    const fetchProducts = async () => {
        const resProducts = await fetch(`${configs.backend}/products/find-all`);
        const producstData = await resProducts.json();
        setProducts(producstData);
    };

    const fetchOneProduct = async (prodId: number) => {
        const resProduct = await fetch(
            `${configs.backend}/products/find-one/${prodId}`
        );
        const productData = await resProduct.json();
        console.log(productData, "DATA PRODUCT IN ORDER ITEM");
        setSelectedProduct(productData);
    };

    const fetchOneOrderItem = async (orderItemId: number) => {
        const resOrderItem = await fetch(
            `${configs.backend}/order/find-one/${orderItemId}`
        );
        const resOrderItemData = await resOrderItem.json();
        console.log(resOrderItemData, "SELECTED ORDER ITEM");
        setShowModal(true);
        setSelectedItem(resOrderItemData);
    };

    const handleForm = async (data: any) => {
        await fetch(`${configs.backend}/order/update`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log(data, "DATA FORM");
        fetchOrderDetails(id);
        closeModal(false);
    };

    const closeModal = (value: boolean) => {
        setShowModal(value);
    };

    const closeNewModal = () => {
        setShowModalNew(false);
    };

    const deleteOrderDetail = async (orderDetailId: number) => {
        await fetch(`${configs.backend}/order/delete/${orderDetailId}`, {
            method: "DELETE",
        });

        fetchOrderDetails(id);
        reset();
    };

    const formatMoney = (amount: number | string) => {
        return parseFloat(amount?.toString()).toFixed(2);
    };

    const updateStatus = async (orderId: number, status: string) => {
        await fetch(`${configs.backend}/orders/update-one/${orderId}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
              },
              body: JSON.stringify(status)
        })

     };

    return (
        <div>
            <NavBar activeElement="order" />
            <Container className="mt-5">
                {selectedItem.id ? (
                    <ModalSOrder
                        showModal={showModal}
                        handleForm={handleForm}
                        title="Edit an order item"
                        closeModal={closeModal}
                    >
                        <Form onSubmit={handleSubmit(handleForm)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Order Item ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Id"
                                    {...register("id")}
                                    required
                                    readOnly
                                    value={selectedItem.id}
                                    defaultValue={selectedItem.id}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    placeholder="Id"
                                    {...register("order.id")}
                                    required
                                    readOnly
                                    value={selectedItem.order.id}
                                    defaultValue={selectedItem.order.id}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Select
                                    placeholder="Choose a category"
                                    defaultValue={selectedItem.product.id}
                                    {...register("product.id")}
                                    required
                                >
                                    {products.map((product, index) => {
                                        return (
                                            <option
                                                onClick={() => {
                                                    fetchOneProduct(product.id);
                                                }}
                                                key={"optionCategory" + index}
                                                value={product.id}
                                            >
                                                {product.name}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    required
                                    min={0}
                                    {...register("quantity")}
                                    placeholder="Set a quantity"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={"$ " + selectedProduct?.price}
                                    disabled
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-end">
                                <Button type="submit">Submit form</Button>
                            </div>
                        </Form>
                    </ModalSOrder>
                ) : (
                    " "
                )}
                <ModalNewSOrder
                    title="Add a new item"
                    closeModal={closeNewModal}
                    showModal={showModalNew}
                    handleForm={handleForm}
                >
                    <Form onSubmit={handleSubmit(handleForm)}>
                        <Form.Group>
                            <Form.Control
                                type="hidden"
                                placeholder="Id"
                                {...register("order.id")}
                                value={id}
                                defaultValue={id}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Select
                                placeholder="Choose a category"
                                {...register("product.id")}
                                required
                            >
                                {products.map((product, index) => {
                                    return (
                                        <option
                                            onClick={() => {
                                                fetchOneProduct(product.id);
                                            }}
                                            key={"optionCategory" + index}
                                            value={product.id}
                                        >
                                            {product.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                min={1}
                                {...register("quantity")}
                                placeholder="Set a quantity"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Unit Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={"$ " + selectedProduct?.price}
                                disabled
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button type="submit">Submit form</Button>
                        </div>
                    </Form>
                </ModalNewSOrder>

                <div className="d-flex justify-content-between align-items-center ">
                    <h3>Order N°{id}</h3>
                    <Link to="/orders">
                        <Button variant="secondary" className="px-5">
                            Back
                        </Button>
                    </Link>
                </div>
                <div className="pt-5 w-50 order-details text-secondary">
                    <div className=" d-flex justify-content-between">
                        <p>Customer</p>{" "}
                        <p>{orderData?.client?.name + " " + orderData?.client?.lastName}</p>
                    </div>
                    <div className=" my-3 d-flex justify-content-between">
                        <p>Status</p>
                        <select onChange={(e)=>{updateStatus(parseInt(id), e.target.value)}}>
                            <option value="Pending" selected disabled>Choose a status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Date</p> <p> {orderData?.date}</p>
                    </div>
                </div>

                <Table bordered className="mt-4 text-center">
                    <thead className="bg-light">
                        <tr>
                            <th>N°</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {orderDetails.length > 0 ? (
                        <>
                            <tbody>
                                {orderDetails.map((el, index) => {
                                    return (
                                        <tr key={"keyRowOrderDetail-" + index}>
                                            <td>{el.id}</td>
                                            <td>{el.product.name}</td>
                                            <td>{el.quantity}</td>
                                            <td>$ {el.product.price}</td>
                                            <td>$ {formatMoney(el.subtotal)}</td>
                                            <td>
                                                <Button
                                                    onClick={() => {
                                                        reset();
                                                        fetchOneOrderItem(el.id);
                                                        fetchOneProduct(el.product.id);
                                                    }}
                                                    variant="warning"
                                                    className="mx-2 px-4"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        reset();
                                                        deleteOrderDetail(el.id);
                                                    }}
                                                    variant="danger"
                                                    className="mx-2 px-4"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </>
                    ) : null}
                </Table>

                <div className="d-flex justify-content-end">
                    <Button
                        className="px-4"
                        onClick={() => {
                            fetchOneProduct(1);
                            setShowModalNew(true);
                        }}
                    >
                        + Add item
                    </Button>
                </div>

                {orderDetails.length > 0 ? (
                    <div className="d-flex justify-content-end mt-4">
                        <div className="d-flex w-25 flex-column">
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="fw-semibold fs-5">Subtotal</span>{" "}
                                <span className="fs-4">$ {taxesDetails.subtotal}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="fw-semibold fs-5">Taxes</span> <span> </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="px-4 fs-6 fw-semibold">Total City Tax</span>{" "}
                                <span>$ {formatMoney(taxesDetails.totalCityTax)}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="px-4 fs-6 fw-semibold">Total Country Tax</span>{" "}
                                <span>$ {formatMoney(taxesDetails.totalCountyTax)}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="px-4 fs-6 fw-semibold">Total State Tax</span>{" "}
                                <span>$ {formatMoney(taxesDetails.totalStateTax)}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="px-4 fs-6 fw-semibold">Total Federal Tax</span>{" "}
                                <span>$ {formatMoney(taxesDetails.totalFederalTax)}</span>
                            </div>
                            <div className="d-flex mt-2 align-items-center justify-content-between">
                                <span className="fw-semibold fs-5">Total</span>{" "}
                                <span className="fs-4">
                                    $ {formatMoney(taxesDetails.totalOrder)}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Container>
        </div>
    );
}
