import type { SVGProps } from "react";

export function ContainerIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M21.5 16.0018V7.99739C21.4997 7.73541 21.4308 7.47807 21.3001 7.25101C21.1694 7.02394 20.9815 6.83506 20.7552 6.70317L13.6302 2.55661C13.2869 2.35675 12.8968 2.25146 12.4995 2.25146C12.1023 2.25146 11.7122 2.35675 11.3689 2.55661L4.24484 6.70317C4.01848 6.83506 3.83061 7.02394 3.69993 7.25101C3.56925 7.47807 3.50032 7.73541 3.5 7.99739V16.0018C3.50016 16.2639 3.56901 16.5214 3.6997 16.7487C3.83038 16.9759 4.01834 17.1649 4.24484 17.2969L11.3698 21.4435C11.7132 21.6431 12.1033 21.7482 12.5005 21.7482C12.8976 21.7482 13.2877 21.6431 13.6311 21.4435L20.7561 17.2969C20.9824 17.1648 21.1702 16.9758 21.3007 16.7485C21.4312 16.5213 21.4999 16.2638 21.5 16.0018Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.73438 7.21826L12.5 12.3745M12.5 12.3745L21.2656 7.21826M12.5 12.3745V21.7495"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
