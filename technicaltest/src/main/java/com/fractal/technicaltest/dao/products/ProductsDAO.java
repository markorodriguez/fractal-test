package com.fractal.technicaltest.dao.products;

import java.util.List;

import com.fractal.technicaltest.models.ProductPkg.Product;

public interface ProductsDAO {
    Product findOneProduct(Integer id);
    List<Product> findAllProducts();
    void updateProducts(Product product);
    void removeOneProduct(Integer id);
}

