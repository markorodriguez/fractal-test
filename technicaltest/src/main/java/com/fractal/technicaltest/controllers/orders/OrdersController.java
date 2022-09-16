package com.fractal.technicaltest.controllers.orders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fractal.technicaltest.dao.orders.OrdersDAO;
// import com.fractal.technicaltest.models.OrderPkg.Order;
import com.fractal.technicaltest.models.OrderPkg.Order;

@RestController
@CrossOrigin
@RequestMapping("api/orders")
public class OrdersController {
    
    @Autowired
    private OrdersDAO ordersDAO;

    @RequestMapping(value = "/find-one/{id}")
    public Order findOneOrder(@PathVariable Integer id){
        try {
            return ordersDAO.findOneOrder(id);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/find-all")
    public List<Order> findAllOrders(){
        return ordersDAO.findAllOrders();
    }

    @RequestMapping(value = "/delete-one/{id}", method = RequestMethod.DELETE)
    public void findAndDelete(@PathVariable Integer id){
        ordersDAO.deleteOneOrder(id);
    }

    @RequestMapping(value = "/update-one/{id}", method = RequestMethod.POST)
    public void updateOrder(@PathVariable Integer id, @RequestBody String status){
        ordersDAO.updateOrder(id, status.replaceAll("\"", ""));
    }

    @RequestMapping(value = "/add-order", method = RequestMethod.POST)
    public void addOrder(@RequestBody Order order){
        ordersDAO.addOneOrder(order);
    }

}
