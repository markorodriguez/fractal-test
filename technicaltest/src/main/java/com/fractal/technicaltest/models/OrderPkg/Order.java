package com.fractal.technicaltest.models.OrderPkg;

import javax.persistence.Entity;
import javax.persistence.Table;

import java.util.Date;

import javax.persistence.Column;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.format.annotation.DateTimeFormat;

import com.fractal.technicaltest.models.ClientPkg.Client;

import lombok.Getter;
import lombok.Setter;



@Entity
@Table(name = "orders")
public class Order{

    @Id 
    @Getter @Setter @Column(name = "order_id") @Cascade(CascadeType.REMOVE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Getter @Setter @Column(name = "status")
    private String status;

    @Getter @Setter @Column(name = "date")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    @Getter @Setter @Column(name = "total_order")
    private Double totalOrder;

    @ManyToOne @Getter @Setter
    @JoinColumn(name = "client_id")
    Client client;

    

}
