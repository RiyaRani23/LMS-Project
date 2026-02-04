import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  { id: "NextJS", label: "NextJS" },
  { id: "Data Science", label: "Data Science" },
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  { id: "MERN Stack", label: "MERN Stack" },
  { id: "Backend Development", label: "Backend Development" },
  { id: "Javascript", label: "Javascript" },
  { id: "Python", label: "Python" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const selectByPriceHandler = (value) => {
    setSortByPrice(value);
  };

  useEffect(() => {
    handleFilterChange(selectedCategories, sortByPrice);
  }, [selectedCategories, sortByPrice]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-bold text-lg">Sort By</h2>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <hr className="border-gray-200" />

      {/* Category Filter */}
      <div className="space-y-4">
        <h2 className="font-bold text-lg">Categories</h2>
        <div className="grid gap-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;