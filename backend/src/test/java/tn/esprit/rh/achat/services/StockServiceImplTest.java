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

    private Stock stock1, stock2;

    @BeforeEach
    void setUp() {
        stock1 = new Stock();
        stock1.setIdStock(1L);
        stock1.setLibelleStock("Stock A");
        stock1.setQte(10);
        stock1.setQteMin(5);

        stock2 = new Stock();
        stock2.setIdStock(2L);
        stock2.setLibelleStock("Stock B");
        stock2.setQte(3);
        stock2.setQteMin(5);
    }

    @Test
    void testRetrieveAllStocks() {
        when(stockRepository.findAll()).thenReturn(Arrays.asList(stock1, stock2));

        List<Stock> stocks = stockService.retrieveAllStocks();

        assertNotNull(stocks);
        assertEquals(2, stocks.size());
        verify(stockRepository, times(1)).findAll();
    }

    @Test
    void testAddStock() {
        when(stockRepository.save(any(Stock.class))).thenReturn(stock1);

        Stock savedStock = stockService.addStock(stock1);

        assertNotNull(savedStock);
        assertEquals("Stock A", savedStock.getLibelleStock());
    }

    @Test
    void testUpdateStock() {
        when(stockRepository.save(any(Stock.class))).thenReturn(stock2);

        Stock updatedStock = stockService.updateStock(stock2);

        assertNotNull(updatedStock);
        assertEquals(2L, updatedStock.getIdStock());
        assertEquals("Stock B", updatedStock.getLibelleStock());
    }

    @Test
    void testDeleteStock() {
        doNothing().when(stockRepository).deleteById(1L);

        stockService.deleteStock(1L);

        verify(stockRepository, times(1)).deleteById(1L);
    }

    @Test
    void testRetrieveStock() {
        when(stockRepository.findById(1L)).thenReturn(Optional.of(stock1));

        Stock stock = stockService.retrieveStock(1L);

        assertNotNull(stock);
        assertEquals(1L, stock.getIdStock());
        assertEquals("Stock A", stock.getLibelleStock());
    }

    @Test
    void testRetrieveStatusStock() {
        when(stockRepository.retrieveStatusStock()).thenReturn(Arrays.asList(stock2));

        String status = stockService.retrieveStatusStock();

        assertNotNull(status);
        assertTrue(status.contains("Stock B"));
        assertTrue(status.contains("inférieur à la quantité minimale"));
    }
}