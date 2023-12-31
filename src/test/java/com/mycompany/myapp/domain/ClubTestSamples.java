package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ClubTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Club getClubSample1() {
        return new Club().id(1L).nomClub("nomClub1");
    }

    public static Club getClubSample2() {
        return new Club().id(2L).nomClub("nomClub2");
    }

    public static Club getClubRandomSampleGenerator() {
        return new Club().id(longCount.incrementAndGet()).nomClub(UUID.randomUUID().toString());
    }
}
