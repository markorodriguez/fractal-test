package com.fractal.technicaltest.controllers.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fractal.technicaltest.dao.products.ProductsDAO;
import com.fractal.technicaltest.models.ProductPkg.Product;

@RestController
@CrossOrigin
@RequestMapping(path = "api/products")
public class ProductsController {
    
    @Autowired
    private ProductsDAO productsDAO;

    @RequestMapping(value = "/find-one/{id}")
    public Product findOneProduct(@PathVariable Integer id){
        return productsDAO.findOneProduct(id);
    }

    @RequestMapping(value = "/find-all")
    public List<Product> findAllProducts(){
        return productsDAO.findAllProducts();
    }

    @PostMapping(value = "/update")
    public void updateProducts(@RequestBody Product product){
        productsDAO.updateProducts(product);
    }

    @DeleteMapping(value = "/delete")
    public void deleteProduct(@RequestBody Integer id){
        productsDAO.removeOneProduct(id);
    }
}
