package com.fractal.technicaltest.dao.order;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.fractal.technicaltest.models.OrderPkg.Order;
import com.fractal.technicaltest.models.ProductPkg.Product;
import com.fractal.technicaltest.models.SpecificOrder.SpecificOrder;

@Repository
@Transactional
public class OrderDAOImp implements OrderDAO {

    @PersistenceContext
    EntityManager entityManager;
    
    @Override
    public List<SpecificOrder> findOrderDetails(Integer id) {
        return entityManager.createQuery("FROM SpecificOrder WHERE order_id = :orderId ", SpecificOrder.class).setParameter("orderId", id).getResultList();
    }

    @Override
    public SpecificOrder findOneOrderDetail(Integer id) {
        return entityManager.createQuery("FROM SpecificOrder WHERE id =: itemId", SpecificOrder.class).setParameter("itemId", id).getSingleResult();    
    }

    @Override
    public void updateOrderDetail(SpecificOrder specificOrder) {
        Product respectiveProduct = entityManager.createQuery("FROM Product p WHERE p.id = :productId", Product.class).setParameter("productId", specificOrder.getProduct().getId()).getSingleResult();
        double subtotal = 0;
        subtotal = respectiveProduct.getPrice() * specificOrder.getQuantity();
        specificOrder.setSubtotal(subtotal);
        entityManager.merge(specificOrder);
    }

    @Override
    public void deleteOrderDetail(Integer id) {
        SpecificOrder specificOrder = entityManager.find( SpecificOrder.class, id);
        entityManager.remove(specificOrder);
    }

    @Override
    public void updateTotal(Integer id) {

        Order respectiveOrder = entityManager.find(Order.class, id);
        List<SpecificOrder> specificOrder = entityManager.createQuery("FROM SpecificOrder so WHERE so.order.id = : orderID", SpecificOrder.class).setParameter("orderID", id).getResultList();
        
        double accumulator = 0;

        for(SpecificOrder orderItem : specificOrder){
            accumulator= accumulator + orderItem.getSubtotal();
        }

        double subtotalPlusTaxes = accumulator + ((accumulator*0.1)+(accumulator*0.055)+(accumulator*0.0924)+(accumulator*0.0249));

        respectiveOrder.setTotalOrder(subtotalPlusTaxes);

    }
    
}
