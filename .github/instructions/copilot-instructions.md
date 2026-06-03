# GitHub Copilot Code Assist Instructions – AI Generated Code Tagging 

## Purpose
These instructions define the mandatory approach for tagging **AI-generated code changes** to ensure **traceability and auditability**.

They are designed to work with GitHub Copilot's **current behavior**, where instructions are **contextual guidance** (not hard rules), and therefore must be **short, explicit, and reinforced**.

These instructions apply to:
- All IDEs (VS Code, IntelliJ, Eclipse, Visual Studio, etc.)
- All Copilot modes: Chat, Ask, Edit, Agent, Inline suggestions
- All programming languages and technologies

---

## MANDATORY AI TAGGING (PRIMARY RULE)

Whenever GitHub Copilot **adds, edits, or refactors code**, the affected code **MUST be explicitly tagged** with start and end markers.

### Required Tag Pair
Use the language-appropriate comment syntax with **both START and END tags**:

**Line comments:**
- `// START OF AI GENERATED`
- `// END OF AI GENERATED`

**Script comments:**
- `# START OF AI GENERATED`
- `# END OF AI GENERATED`

**Block comments:**
- `/* START OF AI GENERATED */`
- `/* END OF AI GENERATED */`

**SQL comments:**
- `-- START OF AI GENERATED`
- `-- END OF AI GENERATED`

⚠️ **Both tags are mandatory** for **all AI-generated changes**.

---

## Tag Placement Rules (Follow Exactly)

1. **New or modified function / method**  
   Place **START OF AI GENERATED** immediately **before** the function/method declaration.  
   Place **END OF AI GENERATED** immediately **after** the closing brace.

2. **Partial modification inside existing code**  
   Place **START OF AI GENERATED** immediately **before** the first modified line.  
   Place **END OF AI GENERATED** immediately **after** the last modified line.

3. **New or generated files**  
   Place **START OF AI GENERATED** after required headers (copyright, package, imports).  
   Place **END OF AI GENERATED** at the end of the AI-generated content.

4. **Multiple AI-generated sections in one file**  
   Use **separate tag pairs** for each distinct AI-generated block.  
   Each section gets its own START and END tags.

5. **Single line changes**  
   Even single-line changes require both START and END tags.

---

## IMPORTANT USAGE NOTE (Copilot Behavior)

GitHub Copilot does **not strictly enforce repository instructions**.

To ensure correct tagging:
- These instructions **must be referenced in Edit / Agent prompts**
- File-level header comments provide the **strongest signal**
- Reviewers and CI checks are the final enforcement mechanism

### Example Prompt Reinforcement

When using Copilot Edit or Agent mode, include this reminder:

```
"Add START OF AI GENERATED and END OF AI GENERATED tags using appropriate comment syntax."
```

---

## Examples

### Java - New Method
```java
// START OF AI GENERATED
public Order createOrder(OrderRequest request) {
    Order order = new Order();
    order.setCustomerId(request.getCustomerId());
    order.setItems(request.getItems());
    return orderRepository.save(order);
}
// END OF AI GENERATED
```

### Kotlin - New Class
```kotlin
// START OF AI GENERATED
data class UserDto(
    val id: Long,
    val name: String,
    val email: String
)
// END OF AI GENERATED
```

### Python - Function
```python
# START OF AI GENERATED
def calculate_discount(items: List[Item]) -> Decimal:
    total = sum(item.price for item in items)
    if total > 100:
        return total * Decimal('0.1')
    return Decimal('0')
# END OF AI GENERATED
```

### SQL - Query
```sql
-- START OF AI GENERATED
UPDATE orders 
SET status = 'COMPLETED', 
    updated_at = CURRENT_TIMESTAMP,
    completed_by = :userId
WHERE id = :orderId
  AND status = 'PENDING';
-- END OF AI GENERATED
```

### YAML - Configuration
```yaml
# START OF AI GENERATED
apiVersion: v1
kind: Service
metadata:
  name: user-service
  namespace: production
spec:
  selector:
    app: user-api
  ports:
    - port: 8080
      targetPort: 8080
# END OF AI GENERATED
```

### TypeScript - Partial Modification
```typescript
function processPayment(payment: Payment): Result {
    validatePayment(payment);
    
    // START OF AI GENERATED
    const fee = calculateProcessingFee(payment.amount);
    const total = payment.amount + fee;
    const transaction = createTransaction(payment, total);
    // END OF AI GENERATED
    
    return saveTransaction(transaction);
}
```

### New File with Headers
```java
/**
 * Copyright 2026 Company Name
 * Licensed under Apache License 2.0
 */
package com.example.service;

import java.util.List;
import com.example.model.User;

// START OF AI GENERATED
public class UserService {
    private final UserRepository repository;
    
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
    
    public List<User> findAllActive() {
        return repository.findByStatus("ACTIVE");
    }
}
// END OF AI GENERATED
```

### Multiple AI Sections in One File
```java
public class OrderController {
    
    // START OF AI GENERATED
    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return orderService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    // END OF AI GENERATED
    
    // Existing human-written code
    public void someExistingMethod() {
        // ...
    }
    
    // START OF AI GENERATED
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        Order order = orderService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
    // END OF AI GENERATED
}
```

---

## Summary

All AI-generated code must be wrapped with:
- **START OF AI GENERATED** (before the code)
- **END OF AI GENERATED** (after the code)

Use the appropriate comment syntax for your language. Both tags are mandatory.

## Prompt Reinforcement

As per the file's advice, you may still need to reinforce the prompt with: "Add START OF AI GENERATED and END OF AI GENERATED tags."
