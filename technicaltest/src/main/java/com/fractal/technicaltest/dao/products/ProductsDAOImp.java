package com.fractal.technicaltest.dao.products;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.fractal.technicaltest.models.ProductPkg.Product;

@Repository
@Transactional
public class ProductsDAOImp implements ProductsDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Product findOneProduct(Integer id) {
        return entityManager.createQuery("FROM Product p WHERE p.id = :productId", Product.class).setParameter("productId", id).getSingleResult();
    }

    @Override
    public List<Product> findAllProducts() {
        return entityManager.createQuery("FROM Product", Product.class).getResultList();    
    }

    @Override
    public void updateProducts(Product product) {
        entityManager.merge(product);
    }

    @Override
    public void removeOneProduct(Integer id) {
       Product product = entityManager.find(Product.class, id);
       entityManager.remove(product);
    }
    
}
