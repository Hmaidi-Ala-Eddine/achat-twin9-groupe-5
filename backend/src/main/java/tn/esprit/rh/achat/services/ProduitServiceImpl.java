package tn.esprit.rh.achat.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.rh.achat.entities.Produit;
import tn.esprit.rh.achat.entities.Stock;
import tn.esprit.rh.achat.repositories.CategorieProduitRepository;
import tn.esprit.rh.achat.repositories.ProduitRepository;
import tn.esprit.rh.achat.repositories.StockRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
public class ProduitServiceImpl implements IProduitService {

	@Autowired
	ProduitRepository produitRepository;

	@Autowired
	StockRepository stockRepository;

	@Autowired
	CategorieProduitRepository categorieProduitRepository;

	@Override
	public List<Produit> retrieveAllProduits() {
		log.info("Retrieving all products...");
		List<Produit> produits = (List<Produit>) produitRepository.findAll();
		for (Produit produit : produits) {
			log.info("Product retrieved: {}", produit);
		}
		log.info("Total products retrieved: {}", produits.size());
		log.info("TEST LOGBACK - Ceci est un test de log !");

		return produits;
	}

	@Transactional
	public Produit addProduit(Produit p) {
		log.info("Adding new product: {}", p);
		Produit savedProduit = produitRepository.save(p);
		log.info("Product saved successfully with ID: {}", savedProduit.getIdProduit());
		return savedProduit;
	}

	@Override
	public void deleteProduit(Long produitId) {
		log.warn("Deleting product with ID: {}", produitId);
		produitRepository.deleteById(produitId);
		log.info("Product with ID {} deleted successfully", produitId);
	}

	@Override
	public Produit updateProduit(Produit p) {
		log.info("Updating product: {}", p);
		Produit updatedProduit = produitRepository.save(p);
		log.info("Product updated successfully with ID: {}", updatedProduit.getIdProduit());
		return updatedProduit;
	}

	@Override
	public Produit retrieveProduit(Long produitId) {
		log.info("Retrieving product with ID: {}", produitId);
		Produit produit = produitRepository.findById(produitId).orElse(null);
		if (produit == null) {
			log.warn("Product with ID {} not found", produitId);
		} else {
			log.info("Product retrieved: {}", produit);
		}
		return produit;
	}

	@Override
	public void assignProduitToStock(Long idProduit, Long idStock) {
		log.info("Assigning product ID {} to stock ID {}", idProduit, idStock);
		Produit produit = produitRepository.findById(idProduit).orElse(null);
		Stock stock = stockRepository.findById(idStock).orElse(null);

		if (produit == null) {
			log.error("Product with ID {} not found", idProduit);
			return;
		}
		if (stock == null) {
			log.error("Stock with ID {} not found", idStock);
			return;
		}

		produit.setStock(stock);
		produitRepository.save(produit);
		log.info("Product ID {} successfully assigned to stock ID {}", idProduit, idStock);
	}
}