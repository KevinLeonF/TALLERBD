package Parcial_1.KevinLeon.Models;

// PedidoRequestDTO.java
public class PedidoRequestDTO {
    private String cliente;
    private int cantidad;
    private int gafasId; // Usamos 'gafasId' si el frontend envía el ID como 'gafasId' o 'gafas_id'

    // Constructor vacío (necesario para Jackson)
    public PedidoRequestDTO() {}

    // Getters y Setters para todos los campos
    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public int getGafasId() { return gafasId; }
    public void setGafasId(int gafasId) { this.gafasId = gafasId; }
}
