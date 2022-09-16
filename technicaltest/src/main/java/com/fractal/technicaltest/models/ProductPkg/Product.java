package com.fractal.technicaltest.models.ProductPkg;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fractal.technicaltest.models.Category.Category;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @Getter @Setter @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Getter @Setter @Column(name = "product_name")
    private String name;

    @Getter @Setter @Column(name = "product_price")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @Getter @Setter
    Category category;
    
    @Getter @Setter @Column(name = "product_status")
    private String productStatus;

}
