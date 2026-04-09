## Core Challenges

- **Location updates** — drivers send GPS every 4 seconds; 1M drivers = 250K location updates/sec
- **Geospatial queries** — find all drivers within 5km of a rider in < 100ms
- **Matching** — optimally match rider to nearest available driver
- **Real-time ETA** — live traffic-aware routing; update ETA as driver moves

## Location Tracking Architecture

<!-- title: Driver Location Update — Redis Geo Index -->
```typescript
// Driver app sends location every 4 seconds
app.post('/driver/location', async (req, res) => {
  const { driverId, lat, lng } = req.body;

  // Redis GEO commands provide geospatial indexing
  // Uses a sorted set with geohash as score
  await redis.geoadd('drivers:active', lng, lat, driverId);

  // Expire driver from index if no update in 30 seconds
  await redis.expire(`driver:heartbeat:${driverId}`, 30);

  res.sendStatus(200);
});

// Rider requests a ride — find nearby drivers
async function findNearbyDrivers(riderLat: number, riderLng: number) {
  // GEORADIUS: find all drivers within 5km
  return redis.georadius(
    'drivers:active', riderLng, riderLat,
    5, 'km', 'WITHCOORD', 'WITHDIST', 'ASC', 'COUNT', 10
  );
}
```

## Matching Algorithm

Uber uses a matching engine that considers: **proximity**, **driver rating**, **ETA to rider**, and **driver heading** (a driver already moving towards you is preferred). The matching service batches requests every 500ms to find globally optimal assignments.

## Surge Pricing

H3 hexagonal grid divides cities into cells. When the ratio of rider requests to available drivers in a cell exceeds a threshold, surge multiplier is applied. Surge data is precomputed every 30 seconds and cached in Redis — it's read-heavy and eventual consistency is acceptable.
