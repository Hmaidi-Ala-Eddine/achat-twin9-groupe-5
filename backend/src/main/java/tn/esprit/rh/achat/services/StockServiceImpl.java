package tn.esprit.rh.achat.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.rh.achat.entities.Stock;
import tn.esprit.rh.achat.repositories.StockRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class StockServiceImpl implements IStockService {

    @Autowired
    StockRepository stockRepository;

    @Override
    public List<Stock> retrieveAllStocks() {
        log.info("In method retrieveAllStocks ...");
        List<Stock> stocks = stockRepository.findAll();
        for (Stock stock : stocks) {
            log.info("Stock details - ID: {}, Libelle: {}, Quantité: {}, Quantité Min: {}", 
                stock.getIdStock(), stock.getLibelleStock(), stock.getQte(), stock.getQteMin());
        }
        log.info("Total number of stocks retrieved: {}", stocks.size());
        return stocks;
    }

    @Override
    public Stock addStock(Stock s) {
        log.info("In method addStock ...");
        log.info("Adding new stock - Libelle: {}, Quantité: {}, Quantité Min: {}", 
            s.getLibelleStock(), s.getQte(), s.getQteMin());
        Stock savedStock = stockRepository.save(s);
        log.info("Stock added successfully - ID: {}, Libelle: {}", 
            savedStock.getIdStock(), savedStock.getLibelleStock());
        return savedStock;
    }

    @Override
    public void deleteStock(Long stockId) {
        log.info("In method deleteStock ...");
        Stock stock = stockRepository.findById(stockId).orElse(null);
        if (stock != null) {
            log.info("Deleting stock - ID: {}, Libelle: {}", stockId, stock.getLibelleStock());
            stockRepository.deleteById(stockId);
            log.info("Stock deleted successfully");
        } else {
            log.warn("Stock not found with ID: {}", stockId);
        }
    }

    @Override
    public Stock updateStock(Stock s) {
        log.info("In method updateStock ...");
        log.debug("Updating stock : {}", s);
        Stock updatedStock = stockRepository.save(s);
        log.info("Stock updated successfully : {}", updatedStock);
        log.info("Out method updateStock");
        return updatedStock;
    }

    @Override
    public Stock retrieveStock(Long stockId) {
        log.info("In method retrieveStock id: {}", stockId);
        Stock stock = stockRepository.findById(stockId).orElse(null);
        if (stock != null) {
            log.info("Stock found : {}", stock);
        } else {
            log.warn("No Stock found with id : {}", stockId);
        }
        log.info("Out method retrieveStock");
        return stock;
    }

    @Override
    public String retrieveStatusStock() {
        log.info("In method retrieveStatusStock ...");
        StringBuilder finalMessage = new StringBuilder();
        String newLine = System.getProperty("line.separator");
        List<Stock> stocksEnRouge = new ArrayList<>();
        List<Stock> stocks = stockRepository.findAll();
        for (Stock stock : stocks) {
            if (stock.getQte() <= stock.getQteMin()) {
                stocksEnRouge.add(stock);
            }
        }
        if (!stocksEnRouge.isEmpty()) {
            for (Stock stock : stocksEnRouge) {
                finalMessage.append(newLine).append("Le stock ").append(stock.getLibelleStock())
                        .append(" a une quantité de ").append(stock.getQte())
                        .append(" inférieure à la quantité min ").append(stock.getQteMin());
            }
            log.warn("Stocks en alerte : {}", finalMessage);
        } else {
            finalMessage.append("Tous les stocks sont ok");
            log.info(finalMessage.toString());
        }
        log.info("Out method retrieveStatusStock");
        return finalMessage.toString();
    }
}