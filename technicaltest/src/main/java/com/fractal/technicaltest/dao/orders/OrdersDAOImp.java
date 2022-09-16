package com.fractal.technicaltest.dao.orders;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.fractal.technicaltest.models.OrderPkg.Order;

@Repository
@Transactional
public class OrdersDAOImp implements OrdersDAO {
    
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Order findOneOrder(Integer orderId) {
        return entityManager.createQuery("FROM Order o WHERE o.id = :orderId", Order.class).setParameter("orderId", orderId).getSingleResult();
    }

    @Override
    public List<Order> findAllOrders() {
        return entityManager.createQuery("FROM Order", Order.class).getResultList();
    }

    @Override
    public void deleteOneOrder(Integer id) {
        
        Order orderToDelete = entityManager.find(Order.class, id);

        entityManager.remove(orderToDelete);
        
    }

    @Override
    public void updateOrder(Integer id, String status) {
        Order orderToUpdate = entityManager.find(Order.class, id);

        orderToUpdate.setStatus(status);

        entityManager.merge(orderToUpdate);
    }

    @Override
    public void addOneOrder(Order order) {
        
        Date date = new Date();
   
        order.setDate(date);
        order.setTotalOrder(0.00);

        entityManager.merge(order);
        
    }



}
