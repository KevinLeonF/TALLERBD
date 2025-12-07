package Parcial_1.KevinLeon.Models;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore; // ⬅️ Nuevo Import
import com.fasterxml.jackson.annotation.JsonIgnore; // ⬅️ IMPORTANTE
import java.util.List; // ⬅️ Nuevo Import


@Entity
@Table(name = "gafas")
public class Gafas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String diseno;
    private String color;
    private double precio;
    private String marca;

    @OneToMany(mappedBy = "gafa") // 'mappedBy' apunta al campo 'gafa' en la clase Pedido
    // 2. Rompe el bucle de serialización: No incluirá la lista de pedidos
    @JsonIgnore
    private List<Pedido> pedidos;

    @JsonIgnore // ⬅️ ESTO EVITA LA SERIALIZACIÓN EN BUCLE

    public Gafas() {}

    public Gafas(String diseno, String color, double precio, String marca) {
        this.diseno = diseno;
        this.color = color;
        this.precio = precio;
        this.marca = marca;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDiseno() {
        return diseno;
    }

    public void setDiseno(String diseno) {
        this.diseno = diseno;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public List<Pedido> getPedidos() {
        return pedidos;
    }

    public void setPedidos(List<Pedido> pedidos) {
        this.pedidos = pedidos;
    }
}
