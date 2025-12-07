package Parcial_1.KevinLeon.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "Pedidos")

public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String cliente;

    private int cantidad;

    // Relación con Gafas
    @ManyToOne
    @JoinColumn(name = "gafas_id") // columna FK en Pedido
    private Gafas gafa;

    public Pedido() {}

    public Pedido(String cliente, int cantidad, Gafas gafa) {
        this.cliente = cliente;
        this.cantidad = cantidad;
        this.gafa = gafa;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public Gafas getGafa() { return gafa; }
    public void setGafa(Gafas gafa) { this.gafa = gafa; }
}
