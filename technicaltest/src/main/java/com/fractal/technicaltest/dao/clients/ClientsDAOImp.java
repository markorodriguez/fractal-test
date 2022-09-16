package com.fractal.technicaltest.dao.clients;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;
import com.fractal.technicaltest.models.ClientPkg.Client;

@Repository
@Transactional
public class ClientsDAOImp implements ClientsDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Client findOneClient(Integer clientId) {
        return entityManager.createQuery("FROM Client c WHERE c.id = :clientId", Client.class).setParameter("clientId", clientId).getSingleResult();
    }

    @Override
    public List<Client> findAllClients() {
        return entityManager.createQuery("FROM Client", Client.class).getResultList();
    }

}
