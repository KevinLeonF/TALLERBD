package Parcial_1.KevinLeon.Repository;

import Parcial_1.KevinLeon.Models.Gafas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GafasRepository extends JpaRepository<Gafas, Integer> {
}
