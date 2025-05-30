

interface SkeltonProps {
    className?: string
}


export default function Skeleton(props: SkeltonProps) {
    return (
        <div 
            className={`${props.className} animate-pulse w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-md`}
        >
        </div>
    );
}