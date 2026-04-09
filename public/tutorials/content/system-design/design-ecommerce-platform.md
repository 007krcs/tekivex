## Core Services

| Service | Responsibility | Database |
| --- | --- | --- |
| Product Catalog | Browse, search, product details | Elasticsearch (search) + PostgreSQL (master data) |
| Inventory | Stock levels, reservations, warehouse routing | PostgreSQL with row-level locking |
| Cart | Add/remove items, apply coupons | Redis (fast, TTL-based cart expiry) |
| Order | Order lifecycle (placed → paid → fulfilled → delivered) | PostgreSQL (ACID transactions) |
| Payment | Charge, refund, fraud detection | PostgreSQL + Stripe/Adyen |
| Notification | Order confirmation, shipping updates | Kafka + email/SMS workers |

## Order Processing Flow

**Flow:**

1. **Place Order** — Validate cart, reserve inventory (decrement stock with check)
2. **Process Payment** — Call payment gateway; handle 3DS; wait for webhook confirmation
3. **Confirm Order** — Payment webhook: transition order to CONFIRMED; release reserved stock
4. **Fulfillment** — Route to nearest warehouse; pick/pack/ship; generate tracking
5. **Delivery** — Carrier updates status via webhook; notify customer


## Inventory Consistency

<!-- title: Atomic Inventory Reservation -->
```sql
-- Reserve stock atomically — prevents overselling
-- Only succeeds if stock >= requested quantity
UPDATE inventory
SET reserved = reserved + :qty,
    available = available - :qty
WHERE product_id = :productId
  AND available >= :qty  -- Constraint: don't go negative
RETURNING available;

-- available = 0 rows updated → out of stock, abort order
-- available > 0 → reservation successful
```
