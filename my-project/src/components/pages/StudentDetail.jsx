import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Updated tech stack options
const techStackOptions = [
    { value: "MERN Stack", label: "MERN Stack" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Flutter", label: "Flutter" },
    { value: "React Native", label: "React Native" },
    { value: "Django", label: "Django" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "Express.js", label: "Express.js" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "Firebase", label: "Firebase" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Redis", label: "Redis" },
    { value: "TensorFlow", label: "TensorFlow" },
    { value: "OpenAI", label: "OpenAI" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Swift", label: "Swift" },
    { value: "Rust", label: "Rust" },
    { value: "Go", label: "Go" },
    { value: "Scala", label: "Scala" },
    { value: "C#", label: "C#" },
    { value: "C++", label: "C++" },
    { value: "Julia", label: "Julia" },
    { value: "PHP", label: "PHP" },
    { value: "Next.js", label: "Next.js" },
    { value: "Svelte", label: "Svelte" },
    { value: "Laravel", label: "Laravel" },
    { value: "ASP.NET", label: "ASP.NET" },
    { value: "Apache Kafka", label: "Apache Kafka" },
    { value: "Socket.io", label: "Socket.io" },
    { value: "Elixir", label: "Elixir" },
    { value: "RabbitMQ", label: "RabbitMQ" },
    { value: "Cloud Functions", label: "Cloud Functions" },
    { value: "Nginx", label: "Nginx" },
    { value: "Jenkins", label: "Jenkins" },
    { value: "Terraform", label: "Terraform" },
];

const StudentDetail = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        techStack: [], // Make sure this is an empty array by default
        bio: "",
        email: "",
        linkedIn: "",
        github: "",
        portfolio: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (selectedOptions) => {
        setFormData({
            ...formData,
            techStack: selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [], // Ensure techStack is an array
        });
    };

    const handleChangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        // Validate form fields
        if (
            !formData.email ||
            !formData.bio ||
            !formData.linkedIn ||
            !formData.github ||
            !formData.portfolio ||
            formData.techStack.length === 0
        ) {
            toast({
                title: "Error",
                description:
                    "All fields are required, and techStack must be a non-empty array.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/student/updateStudent", // The endpoint you're hitting
                formData, // Send form data
                { headers: { "Content-Type": "application/json" } },
            );
            toast({ title: "Success", description: response.data.message });
        } catch (error) {
            console.error(error.response?.data); // Log detailed error response
            toast({
                title: "Error",
                description: error.response?.data?.error || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md p-6 shadow-lg bg-white dark:bg-gray-800 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        Student Profile Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label
                                htmlFor="techStack"
                                className="capitalize text-gray-900 dark:text-white"
                            >
                                Tech Stack
                            </Label>
                            <Select
                                id="techStack"
                                name="techStack"
                                isMulti
                                options={techStackOptions}
                                value={formData.techStack.map((tech) => ({
                                    value: tech,
                                    label: tech,
                                }))}
                                onChange={handleChange}
                                getOptionLabel={(e) => e.label}
                                getOptionValue={(e) => e.value}
                                className="mt-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                isSearchable
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: "transparent",
                                        borderColor: "transparent",
                                        boxShadow: "none",
                                        color: "white", // Make text color white
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: "#333", // Dark background for dropdown
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isSelected
                                            ? "#1e40af"
                                            : state.isFocused
                                                ? "#4b5563"
                                                : "#333", // Dark mode option hover/selected
                                        color: "#fff", // Make option text white
                                    }),
                                    multiValue: (provided) => ({
                                        ...provided,
                                        backgroundColor: "#1e40af", // Selected item background color
                                        color: "#fff", // Text color for selected item
                                    }),
                                }}
                            />
                        </div>
                        {Object.keys(formData).map(
                            (key) =>
                                key !== "techStack" && (
                                    <div key={key}>
                                        <Label
                                            htmlFor={key}
                                            className="capitalize text-gray-900 dark:text-white"
                                        >
                                            {key.replace(/([A-Z])/g, " $1")}
                                        </Label>
                                        <Input
                                            id={key}
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChangeInput}
                                            required
                                            className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                ),
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Updating..." : "Update Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentDetail;
