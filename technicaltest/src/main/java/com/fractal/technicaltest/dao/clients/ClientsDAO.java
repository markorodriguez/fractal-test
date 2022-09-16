package com.fractal.technicaltest.dao.clients;

import java.util.List;

import com.fractal.technicaltest.models.ClientPkg.Client;

public interface ClientsDAO {
    Client findOneClient(Integer clientId);

    List<Client> findAllClients();
}
