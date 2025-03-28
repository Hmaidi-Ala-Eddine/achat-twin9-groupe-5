package tn.esprit.rh.achat.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import tn.esprit.rh.achat.entities.Produit;
import tn.esprit.rh.achat.repositories.ProduitRepository;

@ExtendWith(MockitoExtension.class)
class ProduitServiceImplTest {

    @Mock
    private ProduitRepository produitRepository;

    @InjectMocks
    private ProduitServiceImpl produitService;

    private Produit produit1, produit2;

    @BeforeEach
    void setUp() {
        produit1 = new Produit();
        produit1.setIdProduit(1L);
        produit1.setLibelleProduit("Produit A");

        produit2 = new Produit();
        produit2.setIdProduit(2L);
        produit2.setLibelleProduit("Produit B");
    }

    @Test
    void testRetrieveAllProduits() {
        when(produitRepository.findAll()).thenReturn(Arrays.asList(produit1, produit2));

        List<Produit> produits = produitService.retrieveAllProduits();

        assertNotNull(produits);
        assertEquals(2, produits.size());
        verify(produitRepository, times(1)).findAll();
    }

    @Test
    void testRetrieveProduit() {
        when(produitRepository.findById(1L)).thenReturn(Optional.of(produit1));

        Produit produit = produitService.retrieveProduit(1L);

        assertNotNull(produit);
        assertEquals(1L, produit.getIdProduit());
        assertEquals("Produit A", produit.getLibelleProduit());
    }

    @Test
    void testAddProduit() {
        when(produitRepository.save(any(Produit.class))).thenReturn(produit1);

        Produit savedProduit = produitService.addProduit(produit1);

        assertNotNull(savedProduit);
        assertEquals(1L, savedProduit.getIdProduit());
    }

    @Test
    void testUpdateProduit() {
        when(produitRepository.save(any(Produit.class))).thenReturn(produit2);

        Produit updatedProduit = produitService.updateProduit(produit2);

        assertNotNull(updatedProduit);
        assertEquals(2L, updatedProduit.getIdProduit());
        assertEquals("Produit B", updatedProduit.getLibelleProduit());
    }

    @Test
    void testDeleteProduit() {
        doNothing().when(produitRepository).deleteById(1L);

        produitService.deleteProduit(1L);

        verify(produitRepository, times(1)).deleteById(1L);
    }
}

