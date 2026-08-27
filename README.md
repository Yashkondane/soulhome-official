# Krisha Membership Platform

A comprehensive membership-based web application built with **Next.js 16**, **AWS**, and **Stripe**. This platform manages user subscriptions, exclusive resource downloads, events, and provides a robust admin dashboard for content management. It has successfully processed **50+ course purchases** and features a full-stack, scalable architecture.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Project Highlights

-   **Architected and developed a full-stack Next.js educational and membership platform**, leveraging **AWS RDS (PostgreSQL)** for robust relational data modeling and **AWS Cognito** for secure role-based access control across public, user dashboard, and admin portal routes.
-   **Engineered an end-to-end payment and enrollment workflow using Stripe**, successfully processing **50+ course purchases** with high reliability, and integrating automated email confirmations via serverless **AWS Lambda** functions (via Next.js API routes) and Resend.
-   **Built a comprehensive administrative dashboard with dynamic content management**, featuring a custom rich-text editor (Tiptap) for publishing blogs and managing digital resources, storing media assets securely in **AWS S3**.
-   **Implemented a scalable waitlist and lead-generation system**, capturing and managing prospective students, and utilized **AWS CloudFront** alongside Next.js server-side rendering to deliver optimized, fast-loading marketing pages for high conversion rates.

## Tech Stack

### Frontend
-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
-   **UI Components:** [Radix UI](https://www.radix-ui.com/), [Shadcn/ui](https://ui.shadcn.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Forms:** React Hook Form + Zod validation

### Backend & Services
-   **Cloud Infrastructure:** AWS (Cognito, RDS, S3, CloudFront, Lambda)
-   **File Storage:** [Google Drive API](https://developers.google.com/drive) (Secure hosting for large resources) & AWS S3
-   **Database:** PostgreSQL (AWS RDS)
-   **Payments:** [Stripe](https://stripe.com/)
-   **Emails:** [Resend](https://resend.com/)

## Key Features

-   **Secure Authentication:** User sign-up, login, and protected routes using AWS Cognito.
-   **Subscription Management:** Integration with Stripe for monthly/yearly memberships.
-   **Secure Resource Hub:** Exclusive content library with seamless AWS S3 / Google Drive integration for viewing PDFs, videos, and audio.
-   **Event Management:** Browse, book, and manage events. Admin tools for creating and editing events with image uploads.
-   **Admin Dashboard:** Comprehensive control panel for managing users, subscriptions, and events.
-   **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
-   **Modern UI:** Aesthetically pleasing interface with smooth animations and dark mode support.

## Getting Started

### Prerequisites

-   Node.js 18+ installed
-   npm or yarn package manager
-   An AWS Account (Cognito, RDS, S3)
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
    AWS_COGNITO_USER_POOL_ID=your_cognito_pool_id
    AWS_COGNITO_CLIENT_ID=your_cognito_client_id
    AWS_RDS_DATABASE_URL=your_rds_database_url
    AWS_S3_BUCKET_NAME=your_s3_bucket_name
    STRIPE_SECRET_KEY=your_stripe_secret_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    RESEND_API_KEY=your_resend_api_key
    GOOGLE_SERVICE_CLIENT_EMAIL=your_google_service_client_email
    GOOGLE_SERVICE_PRIVATE_KEY=your_google_service_private_key
    ```

4.  **Database Setup:**
    Run the consolidated SQL script located in the `scripts/` folder in your AWS RDS PostgreSQL instance.
    *   Execute `scripts/000_setup_project_complete.sql` to set up the entire schema.

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```text
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI primitives
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions, hooks, and types
├── public/               # Static assets (images, fonts)
├── scripts/              # SQL scripts for database setup
├── styles/               # Global styles
├── .env.local            # Environment variables (not committed)
└── package.json          # Project dependencies and scripts
```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
