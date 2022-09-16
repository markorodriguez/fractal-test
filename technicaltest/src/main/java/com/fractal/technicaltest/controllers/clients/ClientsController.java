package com.fractal.technicaltest.controllers.clients;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fractal.technicaltest.dao.clients.ClientsDAO;
import com.fractal.technicaltest.models.ClientPkg.Client;

@RestController
@CrossOrigin
public class ClientsController {
    
    @Autowired
    private ClientsDAO clientsDAO;

    @RequestMapping(value = "api/clients/find-one/{id}")
    public Client findOneClient(@PathVariable Integer id){
        return clientsDAO.findOneClient(id);
    }
    
    @RequestMapping(value = "api/clients/find-all")
    public List<Client> findAllClients(){
        return clientsDAO.findAllClients();
    }

}
