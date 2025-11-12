import React from 'react';

type IconName = 'chip' | 'shirt' | 'food' | 'truck' | 'round' | 'score' | 'check' | 'cross' | 'info';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icons: React.FC<IconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'chip':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M15.75 21v-1.5M12 4.5v-1.5m0 18v-1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5v9h-7.5z" />
        </svg>
      );
    case 'shirt':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      );
    case 'food':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        );
    case 'truck':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path d="M7.5 12.5h-1.5a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-1-1Z" />
                <path d="M18 12.5h-1.5a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-1-1Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 16.5h-1a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 0-.5-.5Zm-10 0h-1a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 0-.5-.5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 4.5h-8a1 1 0 0 0-1 1v9h1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 14.5h15v-5a1 1 0 0 0-1-1h-2.5l-3-3.5h-3l-1.5 3.5h-4Z" />
            </svg>
        );
    case 'round':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.182-3.182m0-4.991v4.99" />
            </svg>
        );
    case 'score':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
        );
    case 'check':
        return (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        );
    case 'cross':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        );
    case 'info':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
        );
    default:
      return null;
  }
};