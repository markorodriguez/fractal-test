package com.fractal.technicaltest.dao.category;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.fractal.technicaltest.models.Category.Category;

@Repository
@Transactional
public class CategoryDAOImp implements CategoryDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Category> findAllCategories() {
        return entityManager.createQuery("FROM Category", Category.class).getResultList();
    }
    
}
