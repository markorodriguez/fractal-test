package com.fractal.technicaltest.dao.orders;

import java.util.List;

import com.fractal.technicaltest.models.OrderPkg.Order;

public interface OrdersDAO {
    Order findOneOrder(Integer id);
    List<Order> findAllOrders();
    void deleteOneOrder(Integer id);
    void updateOrder(Integer id, String status);
    void addOneOrder(Order order);
}

