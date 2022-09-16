package com.fractal.technicaltest.controllers.order;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fractal.technicaltest.dao.order.OrderDAO;
import com.fractal.technicaltest.models.SpecificOrder.SpecificOrder;

@RestController
@CrossOrigin
public class OrderController {
    
    @Autowired
    private OrderDAO orderDAO;

    @RequestMapping(value = "api/order/{id}")
    public List<SpecificOrder> findOrderDetails(@PathVariable Integer id){
        return orderDAO.findOrderDetails(id);
    }
    
    @RequestMapping(value = "api/order/find-one/{id}")
    public SpecificOrder findOneOrderDetails(@PathVariable Integer id){
        return orderDAO.findOneOrderDetail(id);
    }

    @RequestMapping(value = "api/order/update", method = RequestMethod.POST)
    public void updateOrderDetails(@RequestBody SpecificOrder specificOrder){
        orderDAO.updateOrderDetail(specificOrder);
        orderDAO.updateTotal(specificOrder.getOrder().getId());
    }

    @RequestMapping(value = "api/order/delete/{id}", method = RequestMethod.DELETE)
    public void deleteOrderDetails(@PathVariable Integer id){
        SpecificOrder foundOrder = orderDAO.findOneOrderDetail(id);
        orderDAO.deleteOrderDetail(id);
        orderDAO.updateTotal(foundOrder.getOrder().getId()); 
    }

}
