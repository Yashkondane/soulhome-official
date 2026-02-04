export function DecorativeCircle({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="2 4"
                fill="none"
                opacity="0.6"
            />
        </svg>
    );
}
