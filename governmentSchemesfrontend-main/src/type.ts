
export default interface Scholarship {
    id: number;
    title: string;
    category: string; // Ensure 'string' is used as a type annotation
    shortDescription: string;
    description: string;
    eligibility: string[];
    benefit: string;
    documents: string[];
    applicationProcess: string;
    deadline: string;
    website: string;
    department: string;
    contact: string;
    color: string;
    faqs: {
        question: string;
        answer: string;
    }[];
};
