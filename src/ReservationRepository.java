package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Reservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Reservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT c.nomClient FROM Reservation r JOIN r.nomClient c WHERE r.id = :reservationId")
    String findNomClientByReservationId(@Param("reservationId") Long reservationId);

}
