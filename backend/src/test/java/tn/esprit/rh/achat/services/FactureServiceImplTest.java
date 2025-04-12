package tn.esprit.rh.achat.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import tn.esprit.rh.achat.entities.*;
import tn.esprit.rh.achat.repositories.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FactureServiceImplTest {

    @InjectMocks
    private FactureServiceImpl factureService;

    @Mock
    private FactureRepository factureRepository;

    @Mock
    private OperateurRepository operateurRepository;

    @Mock
    private DetailFactureRepository detailFactureRepository;

    @Mock
    private FournisseurRepository fournisseurRepository;

    @Mock
    private ProduitRepository produitRepository;

    @Mock
    private ReglementServiceImpl reglementService;

    private Facture facture;

    @BeforeEach
    void setUp() {
        facture = new Facture();
        facture.setIdFacture(1L);
        facture.setMontantFacture(100.0f);
    }

    @Test
    void testRetrieveAllFactures() {
        when(factureRepository.findAll()).thenReturn(List.of(facture));
        List<Facture> result = factureService.retrieveAllFactures();
        assertEquals(1, result.size());
        verify(factureRepository).findAll();
    }

    @Test
    void testAddFacture() {
        when(factureRepository.save(any(Facture.class))).thenReturn(facture);
        Facture result = factureService.addFacture(facture);
        assertNotNull(result);
        assertEquals(1L, result.getIdFacture());
    }

    @Test
    void testCancelFacture() {
        when(factureRepository.findById(1L)).thenReturn(Optional.of(facture));
        factureService.cancelFacture(1L);
        verify(factureRepository).save(any(Facture.class));
        verify(factureRepository).updateFacture(1L);
    }

    @Test
    void testRetrieveFacture() {
        when(factureRepository.findById(1L)).thenReturn(Optional.of(facture));
        Facture result = factureService.retrieveFacture(1L);
        assertNotNull(result);
        assertEquals(1L, result.getIdFacture());
    }

    @Test
    void testGetFacturesByFournisseur() {

    }

    @Test
    void testAssignOperateurToFacture() {
        // Create mock Operateur and Facture
        Operateur operateur = new Operateur();
        operateur.setFactures(new HashSet<>());  // Initialize the factures set

        when(operateurRepository.findById(1L)).thenReturn(Optional.of(operateur));
        when(factureRepository.findById(1L)).thenReturn(Optional.of(facture));

        // Call the service method
        factureService.assignOperateurToFacture(1L, 1L);

        // Verify that the factures set has been updated
        assertTrue(operateur.getFactures().contains(facture));
        verify(operateurRepository).save(operateur);
    }

    @Test
    void testPourcentageRecouvrement() {
        Date start = new Date();
        Date end = new Date();
        when(factureRepository.getTotalFacturesEntreDeuxDates(start, end)).thenReturn(200f);
        when(reglementService.getChiffreAffaireEntreDeuxDate(start, end)).thenReturn(100f);
        float result = factureService.pourcentageRecouvrement(start, end);
        assertEquals(50.0f, result);
    }
}


