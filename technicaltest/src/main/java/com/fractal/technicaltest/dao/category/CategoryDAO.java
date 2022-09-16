package com.fractal.technicaltest.dao.category;

import java.util.List;

import com.fractal.technicaltest.models.Category.Category;

public interface CategoryDAO {
    List<Category> findAllCategories();
}
