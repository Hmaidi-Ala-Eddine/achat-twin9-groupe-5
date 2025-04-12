package tn.esprit.rh.achat.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import tn.esprit.rh.achat.entities.Operateur;
import tn.esprit.rh.achat.repositories.OperateurRepository;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class OperateurServiceImplTest {

    @Mock
    private OperateurRepository operateurRepository;

    @InjectMocks
    private OperateurServiceImpl operateurService;

    private Operateur operateur1, operateur2;

    @BeforeEach
    void setUp() {
        operateur1 = new Operateur();
        operateur1.setIdOperateur(1L);
        operateur1.setNom("Ahmed");
        operateur1.setPrenom("Ben Salah");
        operateur1.setPassword("123");

        operateur2 = new Operateur();
        operateur2.setIdOperateur(2L);
        operateur2.setNom("Youssef");
        operateur2.setPrenom("Mansouri");
        operateur2.setPassword("abc");
    }

    @Test
    void testRetrieveAllOperateurs() {
        when(operateurRepository.findAll()).thenReturn(Arrays.asList(operateur1, operateur2));

        List<Operateur> result = operateurService.retrieveAllOperateurs();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(operateurRepository, times(1)).findAll();
    }

    @Test
    void testAddOperateur() {
        when(operateurRepository.save(any(Operateur.class))).thenReturn(operateur1);

        Operateur saved = operateurService.addOperateur(operateur1);

        assertNotNull(saved);
        assertEquals("Ahmed", saved.getNom());
        verify(operateurRepository, times(1)).save(operateur1);
    }

    @Test
    void testUpdateOperateur() {
        when(operateurRepository.save(any(Operateur.class))).thenReturn(operateur2);

        Operateur updated = operateurService.updateOperateur(operateur2);

        assertNotNull(updated);
        assertEquals(2L, updated.getIdOperateur());
        assertEquals("Youssef", updated.getNom());
        verify(operateurRepository, times(1)).save(operateur2);
    }

    @Test
    void testDeleteOperateur() {
        doNothing().when(operateurRepository).deleteById(1L);

        operateurService.deleteOperateur(1L);

        verify(operateurRepository, times(1)).deleteById(1L);
    }

    @Test
    void testRetrieveOperateurFound() {
        when(operateurRepository.findById(1L)).thenReturn(Optional.of(operateur1));

        Operateur found = operateurService.retrieveOperateur(1L);

        assertNotNull(found);
        assertEquals("Ahmed", found.getNom());
        verify(operateurRepository, times(1)).findById(1L);
    }

    @Test
    void testRetrieveOperateurNotFound() {
        when(operateurRepository.findById(999L)).thenReturn(Optional.empty());

        Operateur found = operateurService.retrieveOperateur(999L);

        assertNull(found);
        verify(operateurRepository, times(1)).findById(999L);
    }
}
