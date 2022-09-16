package com.fractal.technicaltest.controllers.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fractal.technicaltest.dao.products.ProductsDAO;
import com.fractal.technicaltest.models.ProductPkg.Product;

@RestController
@CrossOrigin(allowCredentials = "false")
public class ProductsController {
    
    @Autowired
    private ProductsDAO productsDAO;

    @RequestMapping(value = "api/products/find-one/{id}")
    public Product findOneProduct(@PathVariable Integer id){
        return productsDAO.findOneProduct(id);
    }

    @RequestMapping(value = "api/products/find-all")
    public List<Product> findAllProducts(){
        return productsDAO.findAllProducts();
    }

    @RequestMapping(value = "api/products/update", method = RequestMethod.POST)
    public void updateProducts(@RequestBody Product product){
        productsDAO.updateProducts(product);
    }

    @RequestMapping(value = "api/products/delete", method = RequestMethod.DELETE)
    public void deleteProduct(@RequestBody Integer id){
        productsDAO.removeOneProduct(id);
    }
}
