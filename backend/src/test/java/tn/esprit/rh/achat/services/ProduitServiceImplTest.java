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
import tn.esprit.rh.achat.entities.Stock;
import tn.esprit.rh.achat.repositories.StockRepository;

@ExtendWith(MockitoExtension.class)
class StockServiceImplTest {

    @Mock
    private StockRepository stockRepository;

    @InjectMocks
    private StockServiceImpl stockService;

    private Stock stock1;
    private Stock stock2;
    private List<Stock> stockList;

    @BeforeEach
    void setUp() {
        // Premier stock
        stock1 = new Stock();
        stock1.setIdStock(1L);
        stock1.setLibelleStock("Stock 1");
        stock1.setQte(100);
        stock1.setQteMin(10);

        // Deuxième stock
        stock2 = new Stock();
        stock2.setIdStock(2L);
        stock2.setLibelleStock("Stock 2");
        stock2.setQte(5);
        stock2.setQteMin(20);

        stockList = Arrays.asList(stock1, stock2);
    }

    @Test
    void testRetrieveAllStocks() {
        // Given
        when(stockRepository.findAll()).thenReturn(stockList);

        // When
        List<Stock> retrievedStocks = stockService.retrieveAllStocks();

        // Then
        assertNotNull(retrievedStocks);
        assertEquals(2, retrievedStocks.size());
        verify(stockRepository).findAll();
    }

    @Test
    void testAddStock() {
        // Given
        Stock stockToAdd = new Stock();
        stockToAdd.setLibelleStock("Nouveau Stock");
        when(stockRepository.save(any(Stock.class))).thenReturn(stockToAdd);

        // When
        Stock result = stockService.addStock(stockToAdd);

        // Then
        assertNotNull(result);
        assertEquals("Nouveau Stock", result.getLibelleStock());
        verify(stockRepository).save(stockToAdd);
    }

    @Test
    void testDeleteStock() {
        // Given
        Long stockId = 1L;
        when(stockRepository.findById(stockId)).thenReturn(Optional.of(stock1));

        // When
        stockService.deleteStock(stockId);

        // Then
        verify(stockRepository).deleteById(stockId);
    }

    @Test
    void testUpdateStock() {
        // Given
        Stock stockToUpdate = stock1;
        stockToUpdate.setLibelleStock("Stock Modifié");
        when(stockRepository.save(any(Stock.class))).thenReturn(stockToUpdate);

        // When
        Stock result = stockService.updateStock(stockToUpdate);

        // Then
        assertNotNull(result);
        assertEquals("Stock Modifié", result.getLibelleStock());
        verify(stockRepository).save(stockToUpdate);
    }

    @Test
    void testRetrieveStock() {
        // Given
        Long stockId = 1L;
        when(stockRepository.findById(stockId)).thenReturn(Optional.of(stock1));

        // When
        Stock result = stockService.retrieveStock(stockId);

        // Then
        assertNotNull(result);
        assertEquals(stockId, result.getIdStock());
        verify(stockRepository).findById(stockId);
    }

    @Test
    void testRetrieveStatusStock() {
        // Given
        when(stockRepository.findAll()).thenReturn(stockList);

        // When
        String status = stockService.retrieveStatusStock();

        // Then
        assertNotNull(status);
        assertTrue(status.contains("Stock 2"));
        assertTrue(status.contains("inférieure à la quantité min"));
        verify(stockRepository).findAll();
    }
}