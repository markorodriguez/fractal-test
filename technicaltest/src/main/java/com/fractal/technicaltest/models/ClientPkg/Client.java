package com.fractal.technicaltest.models.ClientPkg;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "clients")

public class Client {

    @Getter @Setter @Column(name = "client_id")
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Getter @Setter @Column(name = "client_name")
    private String name;

    @Getter @Setter @Column(name = "client_lastname")
    private String lastName;

    
}
