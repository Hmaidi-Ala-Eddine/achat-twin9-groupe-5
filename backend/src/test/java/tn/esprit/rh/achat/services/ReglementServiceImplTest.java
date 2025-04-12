package tn.esprit.rh.achat.services;

import lombok.var;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import tn.esprit.rh.achat.entities.Reglement;
import tn.esprit.rh.achat.repositories.FactureRepository;
import tn.esprit.rh.achat.repositories.ReglementRepository;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReglementServiceImplTest {

    @InjectMocks
    private ReglementServiceImpl reglementService;

    @Mock
    private ReglementRepository reglementRepository;

    @Mock
    private FactureRepository factureRepository;

    private Reglement reglement;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        reglement = new Reglement();
        reglement.setIdReglement(1L);
        reglement.setMontantPaye(100f);
        reglement.setMontantRestant(50f);
        reglement.setPayee(true);
        reglement.setDateReglement(new Date());
    }

    @Test
    void testRetrieveAllReglements() {
        // Given
        when(reglementRepository.findAll()).thenReturn(Arrays.asList(reglement));

        // When
        var reglements = reglementService.retrieveAllReglements();

        // Then
        assertNotNull(reglements);
        assertEquals(1, reglements.size());
        assertEquals(reglement.getIdReglement(), reglements.get(0).getIdReglement());
    }

    @Test
    void testAddReglement() {
        // Given
        when(reglementRepository.save(any(Reglement.class))).thenReturn(reglement);

        // When
        Reglement savedReglement = reglementService.addReglement(reglement);

        // Then
        assertNotNull(savedReglement);
        assertEquals(reglement.getIdReglement(), savedReglement.getIdReglement());
    }

    @Test
    void testRetrieveReglement() {
        // Given
        when(reglementRepository.findById(1L)).thenReturn(Optional.of(reglement));

        // When
        Reglement foundReglement = reglementService.retrieveReglement(1L);

        // Then
        assertNotNull(foundReglement);
        assertEquals(reglement.getIdReglement(), foundReglement.getIdReglement());
    }

    @Test
    void testRetrieveReglementNotFound() {
        // Given
        when(reglementRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        Reglement foundReglement = reglementService.retrieveReglement(1L);

        // Then
        assertNull(foundReglement);
    }

    @Test
    void testRetrieveReglementByFacture() {
        // Given
        when(reglementRepository.retrieveReglementByFacture(1L)).thenReturn(Arrays.asList(reglement));

        // When
        var reglements = reglementService.retrieveReglementByFacture(1L);

        // Then
        assertNotNull(reglements);
        assertEquals(1, reglements.size());
    }

    @Test
    void testGetChiffreAffaireEntreDeuxDate() {
        // Given
        Date startDate = new Date();
        Date endDate = new Date();
        when(reglementRepository.getChiffreAffaireEntreDeuxDate(startDate, endDate)).thenReturn(150f);

        // When
        float chiffreAffaire = reglementService.getChiffreAffaireEntreDeuxDate(startDate, endDate);

        // Then
        assertEquals(150f, chiffreAffaire);
    }
}

