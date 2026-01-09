import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'

const categories = [
    { id: "Next Js", label: "Next Js" },
    { id: "Data Science", label: "Data Science" },
    { id: "Frontend Development", label: "Frontend Development" },
    { id: "Fullstack Development", label: "Fullstack Development" },
    { id: "MERN Stack Development", label: "MERN Stack Development" },
    { id: "Backend Development", label: "Backend Development" },
    { id: "Javascript", label: "Javascript" },
    { id: "Python", label: "Python" },
    { id: "Docker", label: "Docker" },
    { id: "MongoDB", label: "MongoDB" },
    { id: "HTML", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
    const [selectedCategories, setSelectedCatgories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");

    // Category change  handler
    const handleCategoryChange = (courseId) => {
        setSelectedCatgories((previousCategories) => {
            const newCategories = previousCategories.includes(courseId) ? (previousCategories.filter((id) => id !== courseId)) : ([...previousCategories, courseId])
            handleFilterChange(newCategories, sortByPrice);
            return newCategories;
        });
    }

    //  filter handler 
    const selecetdByPriceHandler = (selectedValue) => {
        setSortByPrice(selectedValue);
        handleFilterChange(selectedCategories, selectedValue)
    }

    return (
        <div className="w-full md:w-[20%]">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
                <Select onValueChange={selecetdByPriceHandler}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by price</SelectLabel>
                            <SelectItem value="low">Low to High</SelectItem>
                            <SelectItem value="high">High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator className="my-4" />
            <div>
                <h1>Category</h1>
                {categories.map((category) => (
                    <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                            id={category.id}
                            onCheckedChange={()=>handleCategoryChange(category.id)}
                        />
                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {category.label}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter