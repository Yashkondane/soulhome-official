# Krisha Membership Platform

A comprehensive membership-based web application built with **Next.js 16**, **Supabase**, and **Stripe**. This platform manages user subscriptions, exclusive resource downloads, events, and provides a robust admin dashboard for content management.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Tech Stack

### Frontend
-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
-   **UI Components:** [Radix UI](https://www.radix-ui.com/), [Shadcn/ui](https://ui.shadcn.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Forms:** React Hook Form + Zod validation

### Backend & Database
-   **BaaS:** [Supabase](https://supabase.com/) (Auth, Database, Storage)
-   **Database:** PostgreSQL
-   **Payments:** [Stripe](https://stripe.com/)

## Key Features

-   **Secure Authentication:** User sign-up, login, and protected routes using Supabase Auth.
-   **Subscription Management:** Integration with Stripe for monthly/yearly memberships.
-   **Resource Downloads:** Exclusive content for members with download limits per billing cycle.
-   **Event Management:** Browse, book, and manage events. Admin tools for creating and editing events with image uploads.
-   **Admin Dashboard:** Comprehensive control panel for managing users, subscriptions, and events.
-   **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
-   **Modern UI:** Aesthetically pleasing interface with smooth animations and dark mode support.

## Getting Started

### Prerequisites

-   Node.js 18+ installed
-   npm or yarn package manager
-   A Supabase project
-   A Stripe account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/soulhome-website.git
    cd soulhome-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    stripe_secret_key=your_stripe_secret_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    ```

4.  **Database Setup:**
    Run the consolidated SQL script located in the `scripts/` folder in your Supabase SQL Editor.
    *   Execute `scripts/000_setup_project_complete.sql` to set up the entire schema, functions, RLS policies, and test data.
    *   Optionally, use `scripts/014_make_user_admin.sql` to promote a user to admin.

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI primitives
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions, hooks, and types
├── public/               # Static assets (images, fonts)
├── scripts/              # SQL scripts for database setup and migrations
├── styles/               # Global styles
├── .env.local            # Environment variables (not committed)
└── package.json          # Project dependencies and scripts
```

## Database Scripts

The `scripts/` directory contains SQL files to help you manage your Supabase database:

-   `000_setup_project_complete.sql`: The main setup script that consolidates schema, functions, RLS policies, and test data.
-   `014_make_user_admin.sql`: Utility script to promote a user to admin.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
