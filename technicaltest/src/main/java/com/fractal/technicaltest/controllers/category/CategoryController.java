package com.fractal.technicaltest.controllers.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fractal.technicaltest.dao.category.CategoryDAO;
import com.fractal.technicaltest.models.Category.Category;

@RestController
@CrossOrigin
public class CategoryController {
    
    @Autowired
    private CategoryDAO categoryDAO;

    @RequestMapping(value = "api/categories/find-all")
    public List<Category>findAlCategories(){
        return categoryDAO.findAllCategories();
    }
}
