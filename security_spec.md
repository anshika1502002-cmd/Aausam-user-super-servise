# Aausam User Service Security Specification

## Data Invariants
1. A Ride cannot be created without a valid userId.
2. Only the assigned driver or the customer can update a ride's status.
3. Users can only see their own orders and rides.
4. Drivers can see available rides in the system.
5. Vendors can manage their own products.
6. Admin has full access.

## The Dirty Dozen Payloads
1. **Unauthorized Create**: Attempting to create a ride for another user.
2. **Invalid Status Transition**: A user trying to set ride status to 'completed' without driver action.
3. **Price Manipulation**: A user trying to set the price of a product.
4. **Data Injection**: Massive strings in the pickup address.
5. **PII Leak**: Non-owner trying to read user profile details (email, phone).
6. **Orphaned Write**: Creating a ride with a non-existent userId.
7. **Role Escalation**: A user trying to update their own role to 'admin'.
8. **Impersonation**: Setting `ownerId` in a product to someone else's UID.
9. **Bypassing Terminal State**: Updating a 'completed' ride.
10. **Shadow Fields**: Adding an `isVerified: true` field to a user profile update.
11. **Query Scraping**: Listing all users without a filter.
12. **Timestamp Fraud**: Sending a client-side `createdAt` timestamp instead of `request.time`.

## Test Runner (Draft Plan)
I will implement `firestore.rules.test.ts` to verify these protections.
