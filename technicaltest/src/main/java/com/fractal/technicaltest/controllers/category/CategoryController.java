package com.fractal.technicaltest.controllers.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fractal.technicaltest.dao.category.CategoryDAO;
import com.fractal.technicaltest.models.Category.Category;

@RestController
@CrossOrigin
@RequestMapping(path = "api/categories" )
public class CategoryController {
    
    @Autowired
    private CategoryDAO categoryDAO;

    @GetMapping(path = "/find-all")
    public List<Category>findAlCategories(){
        return categoryDAO.findAllCategories();
    }
}
