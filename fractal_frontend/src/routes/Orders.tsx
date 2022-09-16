import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Container, Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { configs } from "../config/uri";
import NewOrderModal from "../components/Orders/NewOrderModal";
import { useForm } from "react-hook-form";

export default function Order() {
  const [dataOrders, setDataOrders] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { register, reset, handleSubmit } = useForm();
  const [dataUsers, setDataUsers] = useState<any[]>([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:8080/api/orders/find-all");
    const orders = await res.json();
    setDataOrders(orders);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteOrder = async (idOrder: number) => {
    await fetch(`${configs.backend}/orders/delete-one/${idOrder}`, {
      method: "DELETE",
    });
    fetchOrders();
  };

  const handleForm = async (data:any) => {
    await fetch(`${configs.backend}/orders/add-order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    })
    reset();
    fetchOrders();
   };

  const fetchCustomers = async () => {
    const resCustomers = await fetch(`${configs.backend}/clients/find-all`);
    const customers = await resCustomers.json();
    setDataUsers(customers);
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  return (
    <div>
      <NavBar activeElement="order" />
      <Container className="mt-5">
        <NewOrderModal
          showModal={showModal}
          title="Add an order"
          closeModal={closeModal}
        >
          <Form onSubmit={handleSubmit(handleForm)}>
            <Form.Group className="mb-3">
              <Form.Label>Consumer</Form.Label>
              <Form.Select
                placeholder="Choose a category"
                required
                {...register("client.id")}
              >
                {dataUsers.map((customer, index) => {
                  return (
                    <option key={"optionKey" + index} value={customer.id}>
                      {customer.name + " " + customer.lastName}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select required {...register("status")}>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Form.Group>
            
            <div className="d-flex mt-4 justify-content-end">
              <Button type="submit">Submit form</Button>
            </div>
          </Form>
        </NewOrderModal>

        <h3>Orders</h3>
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            className="px-lg-5"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Order
          </Button>
        </div>
        <Table bordered className="text-center mt-4">
          <thead className="bg-light">
            <tr>
              <th>N°</th>
              <th>Consumer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataOrders.map((el, index): any => {
              return (
                <tr key={"keyRowOrders" + index}>
                  <td>{el.id}</td>
                  <td>{el.client.name + " " + el.client.lastName}</td>
                  <td>{el.status}</td>
                  <td>{el.date}</td>
                  <td>$ {parseFloat(el.totalOrder).toFixed(2)}</td>
                  <td>
                    <Link to={`/order/${el.id}`}>
                      <Button variant="warning" className="mx-2 px-4">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        deleteOrder(el.id);
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
        </Table>
      </Container>
    </div>
  );
}
