package Parcial_1.KevinLeon.Controller;

import Parcial_1.KevinLeon.Models.Pedido;
import Parcial_1.KevinLeon.Models.Gafas;
import Parcial_1.KevinLeon.Models.PedidoRequestDTO;
import Parcial_1.KevinLeon.Repository.PedidoRepository;
import Parcial_1.KevinLeon.Repository.GafasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:3000") /* http://localhost:8080 */
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private GafasRepository gafasRepository;

    // Obtener todos los pedidos
    @GetMapping
    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }

    // Obtener un pedido por ID
    @GetMapping("/{id}")
    public Pedido obtenerUno(@PathVariable int id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    // Crear un nuevo pedido
    @PostMapping

    public Pedido create(@RequestBody Map<String, Object> body) {
        String cliente = (String) body.get("cliente");

        // ➡️ Conversión de CANTIDAD
        Number cantidadNum = (Number) body.get("cantidad");
        int cantidad = cantidadNum.intValue();

        // ➡️ Conversión de ID GAFAS
        Number gafasIdNum = (Number) body.get("gafas_id");
        int gafasId = gafasIdNum.intValue();

        Gafas g = gafasRepository.findById(gafasId)
                .orElseThrow(() -> new RuntimeException("Gafas no encontrada"));

        Pedido p = new Pedido(cliente, cantidad, g);
        return pedidoRepository.save(p);
    }
    /*// ➡️ Recibe el DTO en lugar del Map<String, Object>
    public Pedido create(@RequestBody PedidoRequestDTO pedidoDTO) {

        // 1. Encontrar la Gafa usando el ID del DTO
        Gafas g = gafasRepository.findById(pedidoDTO.getGafasId())
                .orElseThrow(() -> new RuntimeException("Gafas no encontrada"));

        // 2. Crear el Pedido usando los datos del DTO
        Pedido p = new Pedido(pedidoDTO.getCliente(), pedidoDTO.getCantidad(), g);

        return pedidoRepository.save(p);
    }

    public Pedido create(@RequestBody Map<String, Object> body) {
        String cliente = (String) body.get("cliente");
        int cantidad = (int) body.get("cantidad");
        int gafasId = (int) body.get("gafas_id");

        Gafas g = gafasRepository.findById(gafasId)
                .orElseThrow(() -> new RuntimeException("Gafas no encontrada"));

        Pedido p = new Pedido(cliente, cantidad, g);
        return pedidoRepository.save(p);
    }

     * public String crear(@RequestParam int gafasId, @RequestParam String
     * cliente, @RequestParam int cantidad) {
     * Gafas gafa = gafasRepository.findById(gafasId).orElse(null);
     * if (gafa == null) {
     * return "No se encontró la Gafa con ID: " + gafasId;
     * }
     * 
     * Pedido nuevoPedido = new Pedido(cliente, cantidad, gafa);
     * pedidoRepository.save(nuevoPedido);
     * return "Pedido agregado con éxito";
     * }
     */

    // Actualizar un pedido
    @PutMapping("/{id}")

    public Pedido update(@PathVariable int id, @RequestBody Map<String, Object> body) {

        // 1. Encontrar el Pedido existente
        Pedido p = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        // 2. Actualizar el Cliente (String: no necesita conversión)
        p.setCliente((String) body.get("cliente"));

        // ➡️ 3. Conversión Segura para CANTIDAD (debe ser int)
        Number cantidadNum = (Number) body.get("cantidad");
        int cantidad = cantidadNum.intValue();
        p.setCantidad(cantidad); // Asignar el valor convertido

        // ➡️ 4. Conversión Segura para ID GAFAS (debe ser int)
        Number gafasIdNum = (Number) body.get("gafas_id");
        int gafasId = gafasIdNum.intValue();

        // 5. Encontrar la Gafa
        Gafas g = gafasRepository.findById(gafasId)
                .orElseThrow(() -> new RuntimeException("Gafas no encontrada"));

        // 6. Asignar la Gafa
        p.setGafa(g);

        // 7. Guardar y devolver
        return pedidoRepository.save(p);
    }
    /*
    public Pedido update(@PathVariable int id, @RequestBody Map<String, Object> body) {
        Pedido p = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        p.setCliente((String) body.get("cliente"));
        p.setCantidad((int) body.get("cantidad"));

        int gafasId = (int) body.get("gafas_id");
        Gafas g = gafasRepository.findById(gafasId)
                .orElseThrow(() -> new RuntimeException("Gafas no encontrada"));
        p.setGafa(g);

        return pedidoRepository.save(p);
    }

     * public String actualizar(@PathVariable int id,
     * 
     * @RequestParam int gafasId,
     * 
     * @RequestParam String cliente,
     * 
     * @RequestParam int cantidad) {
     * Pedido existente = pedidoRepository.findById(id).orElse(null);
     * if (existente == null) {
     * return "No se encontró el Pedido con ID: " + id;
     * }
     * 
     * Gafas gafa = gafasRepository.findById(gafasId).orElse(null);
     * if (gafa == null) {
     * return "No se encontró la Gafa con ID: " + gafasId;
     * }
     * 
     * existente.setCliente(cliente);
     * existente.setCantidad(cantidad);
     * existente.setGafa(gafa);
     * 
     * pedidoRepository.save(existente);
     * return "Pedido actualizado correctamente";
     * }
     */

    // Eliminar un pedido
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        pedidoRepository.deleteById(id);
        return "Pedido eliminado";
    }
    /*
     * public String eliminar(@PathVariable int id) {
     * if (!pedidoRepository.existsById(id)) {
     * return "No se encontró el Pedido con ID: " + id;
     * }
     * pedidoRepository.deleteById(id);
     * return "Pedido eliminado con éxito";
     * }
     */
}
