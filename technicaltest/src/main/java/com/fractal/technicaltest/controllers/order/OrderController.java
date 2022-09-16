package com.fractal.technicaltest.controllers.order;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fractal.technicaltest.dao.order.OrderDAO;
import com.fractal.technicaltest.models.SpecificOrder.SpecificOrder;

@RestController
@CrossOrigin
@RequestMapping(path = "api/order")
public class OrderController {
    
    @Autowired
    private OrderDAO orderDAO;

    @GetMapping(path = "/{id}")
    public List<SpecificOrder> findOrderDetails(@PathVariable Integer id){
        return orderDAO.findOrderDetails(id);
    }
    
    @GetMapping(path = "/find-one/{id}")
    public SpecificOrder findOneOrderDetails(@PathVariable Integer id){
        return orderDAO.findOneOrderDetail(id);
    }

    @PostMapping(path = "/update")
    public void updateOrderDetails(@RequestBody SpecificOrder specificOrder){
        orderDAO.updateOrderDetail(specificOrder);
        orderDAO.updateTotal(specificOrder.getOrder().getId());
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteOrderDetails(@PathVariable Integer id){
        SpecificOrder foundOrder = orderDAO.findOneOrderDetail(id);
        orderDAO.deleteOrderDetail(id);
        orderDAO.updateTotal(foundOrder.getOrder().getId()); 
    }

}
