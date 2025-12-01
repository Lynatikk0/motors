# Project Structure (FSD-inspired)

This project follows a Feature-Sliced Design (FSD) approach adapted for Next.js App Router.

## Directory Overview

- **`src/app`**: Routing layer. Contains pages and layouts.
- **`src/widgets`**: Composition layer. Contains big blocks like Header, Footer, HeroSection.
- **`src/features`**: User interaction layer. Contains business logic features like CarFilter, BookingForm.
- **`src/entities`**: Business entity layer. Contains domain entities like CarCard, ReviewCard.
- **`src/shared`**: Reusable primitives. Contains UI kit, libs, constants, types.

## Layers

### Shared
- `ui`: Generic UI components (Button, Input, etc.)
- `lib`: Utility functions (cn, formatters)
- `const`: Global constants
- `types`: Global types

### Entities
- `car`: Car related components (Card, Details)
- `review`: Review related components

### Features
- `filter-cars`: Logic and UI for filtering cars
- `book-test-drive`: Form and logic for booking

### Widgets
- `header`: Main navigation
- `footer`: Site footer
- `hero`: Hero section
- `car-list`: Grid of cars

### App
- `layout.tsx`: Root layout
- `page.tsx`: Home page
