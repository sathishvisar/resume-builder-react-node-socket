import { useState } from "react";
import { Navigation } from "./Typography";

interface Props {
    labelLeft?: string;
    labelRight?: string;
    initialValue?:  boolean;
    onToggle?: (value: boolean) => void;
    className?: string;
}
const ToggleButton: React.FC<Props> = ({initialValue, labelLeft, labelRight, onToggle, className}) => {
    const [isToggled, setIsToggled] = useState(initialValue);

    const handleToggle = () => {
        const newValue = !isToggled;
        setIsToggled(!isToggled);
        onToggle?.(newValue)
    }
    return (
        <div className={`flex items-center place-content-center space-x-3 ${className}`}>
        <Navigation className="text-gray-700">{labelLeft}</Navigation>
        <button
            onClick={handleToggle}
            className={`
                relative w-12 h-6 rounded-full
                transition-colors duration-300
                ${isToggled ? "bg-primary-brand" : "bg-primary-brand"}
            `}
        >
            <span
            className={`
                absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300
                ${isToggled ? "translate-x-6" : "translate-x-0"}
            `}
            />
        </button>
        <Navigation className="text-gray-700">{labelRight}</Navigation>
        </div>
    );
};

export default ToggleButton;
