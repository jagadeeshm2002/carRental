import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";



export const RangeFilter: React.FC<{
  title: string;
  minValue: number | undefined;
  maxValue: number | undefined;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  step?: number;
  minPossible?: number;
  maxPossible?: number;
  unit?: string;
}> = ({
  title,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  step = 1,
  minPossible = 0,
  maxPossible = 100000,
  unit = "",
}) => {
  return (
    <div className="mb-4">
      <Label className="text-sm font-medium mb-2">{title}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={minValue || ""}
          onChange={(e) =>
            onMinChange(e.target.value ? Number(e.target.value) : 0)
          }
          placeholder={`Min ${unit}`}
          min={minPossible}
          max={maxPossible}
          step={step}
        />
        <span className="text-gray-500">-</span>
        <Input
          type="number"
          value={maxValue || ""}
          onChange={(e) =>
            onMaxChange(e.target.value ? Number(e.target.value) : 0)
          }
          placeholder={`Max ${unit}`}
          min={minPossible}
          max={maxPossible}
          step={step}
        />
      </div>
    </div>
  );
};

export const YearFilter: React.FC<{
  value: number | undefined;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mb-4">
      <Label className="text-sm font-medium mb-2">Year: {value || "Any"}</Label>
      <Slider
        min={2000}
        max={currentYear}
        value={[value || 2000]}
        onValueChange={(values) => onChange(values[0])}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>2000</span>
        <span>{currentYear}</span>
      </div>
    </div>
  );
};

export const CheckboxListFilter: React.FC<{
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (options: string[]) => void;
}> = ({ title, options, selectedOptions, onChange }) => {
  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="mb-4">
      <Label className="text-sm font-medium mb-2">{title}</Label>
      <div className="max-h-40 overflow-y-auto">
        {options.map((option) => (
          <div key={option} className="flex items-center mb-1">
            <Checkbox
              id={option}
              checked={selectedOptions.includes(option)}
              onCheckedChange={() => toggleOption(option)}
            />
            <label htmlFor={option} className="ml-2 text-sm text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RadioFilter: React.FC<{
  title: string;
  options: { value: string; label: string }[];
  value: string | undefined;
  onChange: (value: string) => void;
}> = ({ title, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <Label className="text-sm font-medium mb-2">{title}</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center mb-1">
            <RadioGroupItem value={option.value} id={option.value} />
            <label
              htmlFor={option.value}
              className="ml-2 text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by model name..."
        className="pl-10"
      />
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
    </div>
  );
};
