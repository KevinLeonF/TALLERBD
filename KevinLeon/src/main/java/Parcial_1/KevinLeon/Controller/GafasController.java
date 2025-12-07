package Parcial_1.KevinLeon.Controller;

import Parcial_1.KevinLeon.Models.Gafas;
import Parcial_1.KevinLeon.Repository.GafasRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gafas")
@CrossOrigin(origins = "http://localhost:3000") /* http://localhost:8080 */
public class GafasController {

    @Autowired
    private GafasRepository gafasRepository;

    @GetMapping
    public List<Gafas> obtenerTodos() {
        return gafasRepository.findAll();
    }

    @GetMapping("/{id}")
    public Gafas obtenerUno(@PathVariable int id) {
        return gafasRepository.findById(id).orElse(null);
    }

    @PostMapping
    public String crear(@RequestBody Gafas nuevo) {
        gafasRepository.save(nuevo);
        return "Gafa agregada con éxito";
    }

    @PutMapping("/{id}")
    public String actualizar(@PathVariable int id, @RequestBody Gafas actualizado) {
        if (gafasRepository.existsById(id)) {
            actualizado.setId(id);
            gafasRepository.save(actualizado);
            return "Gafa actualizada correctamente";
        }
        return "No se encontró la Gafa";
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable int id) {
        if (gafasRepository.existsById(id)) {
            gafasRepository.deleteById(id);
            return "Gafa eliminada con éxito";
        }
        return "No se encontró la Gafa";
    }
}
