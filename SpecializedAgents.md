# Specialized Agents for Transit App

## 1. StateFlowAgent
Specializes in React context and state management patterns
- Analyzes data flow between components
- Optimizes context usage and state updates
- Identifies prop drilling issues
- Implements proper state initialization
- Documents state management patterns

## 2. AccessibilityAgent
Focuses on making the app accessible to all users
- Ensures WCAG compliance
- Implements proper ARIA attributes
- Manages focus states and keyboard navigation
- Tests with screen readers
- Documents accessibility patterns

## 3. ResponsiveLayoutAgent
Handles responsive design and mobile-first patterns
- Implements fluid layouts
- Manages breakpoints and media queries
- Ensures touch-friendly interfaces
- Handles device-specific features
- Documents responsive patterns

## 4. PerformanceAgent
Optimizes app performance and loading
- Analyzes render performance
- Implements code splitting
- Optimizes asset loading
- Manages caching strategies
- Documents performance patterns

## 5. AnimationAgent
Handles smooth transitions and animations
- Implements performant animations
- Manages transition states
- Ensures accessibility of animations
- Handles animation timing
- Documents animation patterns

## 6. LocalizationAgent
Manages internationalization and localization
- Implements i18n patterns
- Handles RTL layouts
- Manages string translations
- Ensures proper date/time formatting
- Documents localization patterns

## 7. ComponentPatternAgent
Maintains consistent component architecture
- Enforces component patterns
- Manages prop interfaces
- Implements reusable hooks
- Ensures consistent error handling
- Documents component patterns

## 8. TestingAgent
Ensures comprehensive test coverage
- Implements unit tests
- Manages integration tests
- Handles E2E testing
- Tests edge cases
- Documents testing patterns

## Common Traits Across Agents

### 1. Analysis Capabilities
- Systematic problem investigation
- Pattern recognition
- Root cause analysis
- Edge case identification

### 2. Documentation Focus
- Clear problem/solution records
- Pattern libraries
- Best practices
- Implementation guides

### 3. Tool Usage
- Effective use of browser_action
- Strategic file operations
- Memory bank management
- MCP tool integration

### 4. Implementation Approach
- Minimal necessary changes
- Reusable patterns
- Consistent standards
- Thorough testing

## Agent Collaboration Example

When implementing a new feature:

1. **ComponentPatternAgent**
   - Designs component structure
   - Defines prop interfaces
   - Establishes patterns

2. **StateFlowAgent**
   - Implements state management
   - Optimizes data flow
   - Manages context

3. **ResponsiveLayoutAgent**
   - Implements mobile-first design
   - Handles device adaptations
   - Manages layout

4. **AccessibilityAgent**
   - Ensures WCAG compliance
   - Implements ARIA
   - Tests accessibility

5. **AnimationAgent**
   - Adds transitions
   - Optimizes animations
   - Ensures smooth UX

6. **LocalizationAgent**
   - Implements i18n
   - Handles translations
   - Manages RTL

7. **PerformanceAgent**
   - Optimizes rendering
   - Manages loading
   - Improves performance

8. **TestingAgent**
   - Implements tests
   - Verifies functionality
   - Ensures coverage

## Memory Bank Integration

Each agent maintains specialized sections in the memory bank:

```
.memory-bank/
  ├── patterns/
  │   ├── state-patterns.md
  │   ├── accessibility-patterns.md
  │   ├── responsive-patterns.md
  │   ├── performance-patterns.md
  │   ├── animation-patterns.md
  │   ├── localization-patterns.md
  │   ├── component-patterns.md
  │   └── testing-patterns.md
  └── implementations/
      ├── state-examples.md
      ├── accessibility-examples.md
      ├── responsive-examples.md
      ├── performance-examples.md
      ├── animation-examples.md
      ├── localization-examples.md
      ├── component-examples.md
      └── testing-examples.md
```

Remember: While each agent has its specialty, they all work together to maintain a cohesive, high-quality codebase. Their combined expertise ensures that all aspects of the application meet high standards while maintaining consistency and documentation.
