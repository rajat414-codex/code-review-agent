# Engineering Code Review Standards

1. **Error Handling**: Every asynchronous function or database operation must be wrapped in a proper try-catch block.
2. **Logging Hygiene**: Never leave raw console.log statements in production code. Use structured logging or remove them.
3. **Input Validation**: Never trust user input. Parameters must be checked before processing.
4. **Unit Tests**: Every exported function must have an accompanying test file.