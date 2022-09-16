package com.fractal.technicaltest.dao.order;

import java.util.List;

import com.fractal.technicaltest.models.SpecificOrder.SpecificOrder;

public interface OrderDAO {
    List<SpecificOrder> findOrderDetails(Integer id);
    SpecificOrder findOneOrderDetail(Integer id);
    void updateOrderDetail(SpecificOrder specificOrder);
    void deleteOrderDetail(Integer id);
    void updateTotal(Integer orderId);
}
