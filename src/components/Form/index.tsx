import { ChangeEvent, FormEvent } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../Spinner";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Config {
    labelText: string;
    labelId: string;
    type: string;
    formType: string;
    value: string;
    link?: {
        linkText: string;
        linkUrl: string;
    };
    required: boolean;
    options?: string[];
}

interface Props {
    config: Config[];
    isLoading: boolean;
    btnText: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    variant?: 'outline' | 'destructive' | 'ghost' | 'default' | 'link' | 'secondary';
}

export default function Form({ isLoading, onChange, onSubmit, btnText, config, variant = 'default' }: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {config.map((field, index) => (
                <div key={index} className="space-y-2">
                    <Label htmlFor={field.labelId}>{field.labelText}</Label>
                    {(() => {
                        switch (field.type) {
                            case "select":
                                return field.options ? (
                                    <Select onValueChange={(value) => onChange({ target: { name: field.formType, value } } as ChangeEvent<HTMLInputElement>)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={field.labelText} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>{field.labelText}</SelectLabel>
                                                {field.options.map((option, idx) => (
                                                    <SelectItem key={idx} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : null;

                            case "checkbox":
                                return (
                                    <Checkbox
                                        id={field.labelId}
                                        name={field.formType}
                                        checked={field.value === "true"}
                                        onCheckedChange={(checked) => onChange({ target: { name: field.formType, value: checked ? "true" : "false" } } as ChangeEvent<HTMLInputElement>)}
                                        disabled={isLoading}
                                    />
                                );

                            case "radio":
                                return field.options ? (
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={(value) => onChange({ target: { name: field.formType, value } } as ChangeEvent<HTMLInputElement>)}
                                    >
                                        {field.options.map((option, idx) => (
                                            <div key={idx} className="flex items-center space-x-2">
                                                <RadioGroupItem id={`${field.labelId}-${idx}`} value={option} />
                                                <Label htmlFor={`${field.labelId}-${idx}`}>{option}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                ) : null;

                            default:
                                return (
                                    <Input
                                        id={field.labelId}
                                        name={field.formType}
                                        type={field.type}
                                        value={field.value}
                                        onChange={onChange}
                                        required={field.required}
                                        disabled={isLoading}
                                    />
                                );
                        }
                    })()}
                    {field.link && (
                        <a href={field.link.linkUrl} className="text-blue-600 underline">
                            {field.link.linkText}
                        </a>
                    )}
                </div>
            ))}
            <Button type="submit" disabled={isLoading} variant={variant}>
                {isLoading ? <Spinner /> : btnText}
            </Button>
        </form>
    );
}
