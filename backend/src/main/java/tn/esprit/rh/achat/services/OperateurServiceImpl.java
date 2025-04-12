package tn.esprit.rh.achat.services;

import lombok.extern.slf4j.Slf4j; // ✅ Needed for @Slf4j to work
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.rh.achat.entities.Operateur;
import tn.esprit.rh.achat.repositories.OperateurRepository;

import java.util.List;

@Service
@Slf4j // ✅ Enables the `log` object for logging
public class OperateurServiceImpl implements IOperateurService {

    @Autowired
    OperateurRepository operateurRepository;

    @Override
    public List<Operateur> retrieveAllOperateurs() {
        log.info("Retrieving all operators...");
        List<Operateur> operateurs = (List<Operateur>) operateurRepository.findAll();
        for (Operateur o : operateurs) {
            log.debug("Operator found: {}", o);
        }
        log.info("Total operators retrieved: {}", operateurs.size());
        return operateurs;
    }

    @Override
    public Operateur addOperateur(Operateur o) {
        log.info("Adding new operator: {}", o);
        Operateur saved = operateurRepository.save(o);
        log.info("Operator added successfully with ID: {}", saved.getIdOperateur());
        return saved;
    }

    @Override
    public void deleteOperateur(Long id) {
        log.warn("Deleting operator with ID: {}", id);
        operateurRepository.deleteById(id);
        log.info("Operator with ID {} deleted", id);
    }

    @Override
    public Operateur updateOperateur(Operateur o) {
        log.info("Updating operator: {}", o);
        Operateur updated = operateurRepository.save(o);
        log.info("Operator updated successfully with ID: {}", updated.getIdOperateur());
        return updated;
    }

    @Override
    public Operateur retrieveOperateur(Long id) {
        log.info("Retrieving operator with ID: {}", id);
        Operateur o = operateurRepository.findById(id).orElse(null);
        if (o == null) {
            log.warn("Operator with ID {} not found", id);
        } else {
            log.info("Operator retrieved: {}", o);
        }
        return o;
    }
}
