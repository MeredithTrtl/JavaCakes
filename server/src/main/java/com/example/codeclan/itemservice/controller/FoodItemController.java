package com.example.codeclan.itemservice.controller;

import com.example.codeclan.itemservice.models.Category;
import com.example.codeclan.itemservice.models.FoodItem;
import com.example.codeclan.itemservice.repository.CategoryRepository;
import com.example.codeclan.itemservice.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/foodItems")
public class FoodItemController {

    @Autowired
    FoodItemRepository foodItemRepository;


    @GetMapping(value = "/{id}")
    public ResponseEntity getFoodItem(@PathVariable Long id){
        return new ResponseEntity<>(foodItemRepository.findById(id), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<FoodItem> postFoodItem(@RequestBody FoodItem foodItem){
        foodItemRepository.save(foodItem);
        return new ResponseEntity<>(foodItem, HttpStatus.OK);
    }
    @PatchMapping(value = "/{id}")
    public ResponseEntity<FoodItem> updateFoodItem(@RequestBody FoodItem foodItem){
        foodItemRepository.save(foodItem);
        return new ResponseEntity<>(foodItem, HttpStatus.OK);
    }
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<FoodItem> deleteFoodItem(@PathVariable Long id) {
        FoodItem found = foodItemRepository.getOne(id);
        foodItemRepository.delete(found);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    @GetMapping(value = "/onList")
    public ResponseEntity<List<FoodItem>> getFoodItemsOnShoppingList(){
       return new ResponseEntity<>(foodItemRepository.findByShoppingListTrue(),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity findFoodItemsByCategory(@RequestParam(name = "category", required = false) String category){
        if (category != null){
            return new ResponseEntity(foodItemRepository.findByCategoryNameIgnoreCase(category), HttpStatus.OK);
        }
        return new ResponseEntity<>(foodItemRepository.findAll(), HttpStatus.OK);
    }
}
