package com.fractal.technicaltest.models.SpecificOrder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fractal.technicaltest.models.OrderPkg.Order;
import com.fractal.technicaltest.models.ProductPkg.Product;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "specific_orders")

/* This class represents specific details about every purchased product from an OrderItem class */

public class SpecificOrder { 

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id_specific_order")
    private Integer id;

    @Getter @Setter @Column(name = "quantity_so")
    private Integer quantity;

    @ManyToOne @Getter @Setter
    @JoinColumn(name = "products_id")
    Product product;
    
    @Getter @Setter @Column(name = "subtotal")
    private Double subtotal;

    @ManyToOne @Getter @Setter 
    @JoinColumn(name = "order_id")
    Order order;

}
