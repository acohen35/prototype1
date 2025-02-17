# Phone Frame Containment Patterns

## Overview
This document outlines the patterns and best practices for ensuring components stay properly contained within the phone frame in our mobile-first application.

## Problem Context
Mobile components can break out of the phone frame bounds when using improper positioning or overflow handling. This was observed in the UpcomingStationSelector component where the footer button broke containment.

## Core Principles

### 1. Container Structure
```tsx
<div className="flex flex-col h-full bg-white">
  {/* Header */}
  {/* Content */}
  {/* Footer */}
</div>
```
- Use `flex flex-col h-full` for proper height containment
- Include background colors for visual containment
- Maintain consistent structure across components

### 2. Content Areas

#### Headers
```tsx
<div className="bg-[#0B4EA2] text-white p-4">
  <button onClick={onBack}>
    <ArrowLeft size={24} />
  </button>
  <h1 className="text-xl">Title</h1>
</div>
```
- Fixed positioning at top
- Consistent padding and styling
- Clear visual hierarchy

#### Scrollable Content
```tsx
<div className="flex-1 overflow-y-auto">
  <div className="bg-gray-50">
    {/* List items or content */}
  </div>
</div>
```
- Use `flex-1` for flexible height
- Single overflow container
- Proper background colors

#### Footers
```tsx
<div className="bg-white border-t border-gray-200">
  <div className="px-4 py-4">
    {/* Footer content */}
  </div>
</div>
```
- Standard flow positioning (preferred)
- Clear visual separation with borders
- Consistent padding

## Implementation Patterns

### 1. Standard Layout (Preferred)
```tsx
<div className="flex flex-col h-full bg-white">
  <div className="bg-[#0B4EA2] text-white p-4">
    {/* Header content */}
  </div>
  
  <div className="flex-1 overflow-y-auto">
    {/* Main content */}
  </div>
  
  <div className="bg-white border-t px-4 py-4">
    {/* Footer content */}
  </div>
</div>
```

### 2. With Floating Action Button
```tsx
<div className="flex flex-col h-full bg-white">
  <div className="bg-[#0B4EA2] text-white p-4">
    {/* Header content */}
  </div>
  
  <div className="flex-1 overflow-y-auto pb-20">
    {/* Main content */}
  </div>
  
  <div className="bg-white border-t px-4 py-4">
    <div className="flex justify-end">
      <button className="rounded-full bg-[#0B4EA2] w-14 h-14">
        {/* Button content */}
      </button>
    </div>
  </div>
</div>
```

### 3. With Tabs
```tsx
<div className="flex flex-col h-full bg-white">
  <div className="bg-[#0B4EA2] text-white p-4">
    {/* Header content */}
  </div>
  
  <div className="border-b">
    <div className="flex">
      <button className="flex-1 py-4 border-b-2">Tab 1</button>
      <button className="flex-1 py-4">Tab 2</button>
    </div>
  </div>
  
  <div className="flex-1 overflow-y-auto">
    {/* Tab content */}
  </div>
</div>
```

## PhoneFrame Component Constraints

The PhoneFrame component provides these fixed dimensions:
- Width: w-[390px]
- Height: h-[800px]
- Rounded corners: rounded-[2.5rem]

All child components must respect these constraints.

## Best Practices

1. **Overflow Handling**
   - Use single overflow point
   - Avoid nested overflow containers
   - Add padding for floating elements

2. **Positioning**
   - Prefer standard flow over fixed/sticky
   - Use relative positioning on parent containers
   - Maintain proper stacking context

3. **Visual Containment**
   - Consistent background colors
   - Clear visual hierarchy
   - Proper spacing and borders

4. **Mobile Considerations**
   - Account for notch and home indicator
   - Consider safe areas
   - Test touch interactions

## Examples in Codebase

1. **ScheduleView**: Best example of proper containment
   - Clean flex structure
   - Single overflow point
   - Standard flow footer

2. **UpcomingStationSelector**: Recently improved
   - Fixed footer containment
   - Proper overflow handling
   - Clear visual hierarchy

## Testing Checklist

- [ ] Content stays within phone frame bounds
- [ ] Scrolling works smoothly
- [ ] Footer remains properly positioned
- [ ] No layout shifts during interaction
- [ ] Visual hierarchy is maintained
- [ ] Touch targets are accessible

## Implementation History

### Fixed Positioning Solution (Success) - 2/17/2025

The key to proper containment was understanding how fixed positioning interacts with containing blocks in CSS. We discovered that certain CSS properties can create new containing blocks for fixed elements, including:
- transform
- perspective
- filter
- contain: paint
- will-change: transform/perspective/filter
- transform-style: preserve-3d

By adding `[transform-style:preserve-3d]` to the PhoneFrame's screen content container, we created a new containing block that properly constrains fixed elements within the phone frame bounds:

```tsx
// PhoneFrame.tsx
<div className="relative bg-white dark:bg-gray-900 rounded-[2.5rem] h-[800px] overflow-hidden [transform-style:preserve-3d]">
  {children}
</div>
```

This allows components to safely use fixed positioning for floating elements like search buttons, while ensuring they remain contained within the phone frame:

```tsx
// Example usage in components
<div className="fixed bottom-4 right-4">
  <button className="w-14 h-14 rounded-full bg-[#0B4EA2]">...</button>
</div>
```

### Key Learnings

1. Fixed Positioning Containment
   - Fixed elements are normally positioned relative to the viewport
   - CSS transform properties can create new containing blocks
   - Using `transform-style: preserve-3d` provides reliable containment

2. Component Structure
   - PhoneFrame establishes the containing block
   - Child components can safely use fixed positioning
   - No need for complex padding or overflow tricks

3. Best Practices
   - Use fixed positioning for floating action buttons
   - Keep consistent spacing (bottom-4 right-4)
   - Maintain proper z-index stacking

## Related Documentation
- [PhoneFrame Component](../components/PhoneFrame.tsx)
- [Layout Patterns](./layout-patterns.md)
- [Mobile Design System](./design-system.md)
