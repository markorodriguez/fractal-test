package com.fractal.technicaltest.controllers.orders;

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

import com.fractal.technicaltest.dao.orders.OrdersDAO;
import com.fractal.technicaltest.models.OrderPkg.Order;

@RestController
@CrossOrigin
@RequestMapping("api/orders")
public class OrdersController {
    
    @Autowired
    private OrdersDAO ordersDAO;

    @GetMapping(path = "/find-one/{id}")
    public Order findOneOrder(@PathVariable Integer id){
        try {
            return ordersDAO.findOneOrder(id);
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping(path = "/find-all")
    public List<Order> findAllOrders(){
        return ordersDAO.findAllOrders();
    }

    @DeleteMapping(path = "/delete-one/{id}")
    public void findAndDelete(@PathVariable Integer id){
        ordersDAO.deleteOneOrder(id);
    }

    @PostMapping(path = "/update-one/{id}")
    public void updateOrder(@PathVariable Integer id, @RequestBody String status){
        ordersDAO.updateOrder(id, status.replace("\"", ""));
    }

    @PostMapping(path = "/add-order")
    public void addOrder(@RequestBody Order order){
        ordersDAO.addOneOrder(order);
    }

}
