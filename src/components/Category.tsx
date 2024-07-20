import { RiCellphoneFill } from "react-icons/ri";
import { DiHtml5DeviceAccess } from "react-icons/di";
import { DiMongodb } from "react-icons/di";
import { DiGulp } from "react-icons/di";
import { DiProlog } from "react-icons/di";

const iconCategory = [
    <RiCellphoneFill />,
    <DiHtml5DeviceAccess />,
    <DiMongodb />,
    <DiGulp />,
    <DiProlog />
];

interface CategoryProps {
    category?: CategoryObject;
}

export interface CategoryObject {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export const Category = ({ category }: CategoryProps) => {

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max);
    }

    return (
        <div className="w-48 h-28 mt-5 border rounded flex flex-col justify-center items-center bg-blue-100 text-6xl text-blue-500 cursor-pointer">
            { iconCategory[ getRandomInt(4) ]}
            <span className="text-base">{ category?.name }</span>
        </div>
    )
}
