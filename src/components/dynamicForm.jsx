import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = {
    vendorDetails: {
        vendor: { type: "select", required: true },
        address: { type: "text", required: true },
    },
    invoiceDetails: {
        generalInformation: {
            purchaseOrderNumber: { type: "select", required: true },
            invoiceNumber: { type: "text", required: true },
            invoiceDate: { type: "date", required: true },
            totalVendor: { type: "number", required: true, min: 0 },
            totalAmount: { type: "number", required: true, min: 0 },
            paymentTerms: { type: "select", required: true },
            invoiceDueDate: { type: "date", required: true },
            glPostDate: { type: "date", required: true },
        },
        expenseDetails: {
            lineAmount: { type: "number", required: true, min: 0 },
            department: { type: "select", required: true },
            account: { type: "select", required: true },
            location: { type: "select", required: true },
        },
    },
    comments: { type: "textarea", required: true },
};

const initialValues = {
    vendorDetails: {
        vendor: "",
        address: "",
    },
    invoiceDetails: {
        generalInformation: {
            purchaseOrderNumber: "",
            invoiceNumber: "",
            invoiceDate: "",
            totalVendor: "",
            totalAmount: "",
            paymentTerms: "",
            invoiceDueDate: "",
            glPostDate: "",
        },
        expenseDetails: {
            lineAmount: "",
            department: "",
            account: "",
            location: "",
        },
    },
    comments: "",
};

const validationSchema = Yup.object({
    vendorDetails: Yup.object({
        vendor: Yup.string().required("Vendor is required"),
        address: Yup.string().required("Address is required"),
    }),
    invoiceDetails: Yup.object({
        generalInformation: Yup.object({
            purchaseOrderNumber: Yup.string().required("Required"),
            invoiceNumber: Yup.string().required("Invoice Number is required"),
            invoiceDate: Yup.date().required("Invoice Date is required"),
            totalVendor: Yup.number().min(0, "Must be >= 0").required("Required"),
            totalAmount: Yup.number().min(0, "Must be >= 0").required("Required"),
            paymentTerms: Yup.string().required("Required"),
            invoiceDueDate: Yup.date().required("Required"),
            glPostDate: Yup.date().required("Required"),
        }),
        expenseDetails: Yup.object({
            lineAmount: Yup.number().min(0, "Must be >= 0").required("Required"),
            department: Yup.string().required("Required"),
            account: Yup.string().required("Required"),
            location: Yup.string().required("Required"),
        }),
    }),
    comments: Yup.string().required("Required"),
});

const DynamicForm = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            localStorage.setItem("invoiceData", JSON.stringify(values));
            alert("Data saved to localStorage");
        },
    });

    useEffect(() => {
        const storedData = localStorage.getItem("invoiceData");
        if (storedData) {
            formik.setValues(JSON.parse(storedData));
        }
    }, []);

    const populateDummyData = () => {
        const dummy = {
            vendorDetails: {
                vendor: "Option1",
                address: "123 Dummy Street",
            },
            invoiceDetails: {
                generalInformation: {
                    purchaseOrderNumber: "PO123",
                    invoiceNumber: "INV456",
                    invoiceDate: "2024-01-01",
                    totalVendor: 1000,
                    totalAmount: 1000,
                    paymentTerms: "Option1",
                    invoiceDueDate: "2024-01-10",
                    glPostDate: "2024-01-05",
                },
                expenseDetails: {
                    lineAmount: 1000,
                    department: "Option1",
                    account: "Option1",
                    location: "Option1",
                },
            },
            comments: "Dummy comment",
        };
        formik.setValues(dummy);
    };

    const renderInput = (name, path, type) => {
        const fieldProps = formik.getFieldProps(path);
        const error = formik.errors?.[name]?.[path] && formik.touched?.[name]?.[path];

        switch (type) {
            case "textarea":
                return (
                    <div>
                        <label className="block font-medium capitalize">{path.split(".").pop()}</label>
                        <textarea {...fieldProps} className="border rounded p-2 w-full" />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                    </div>
                );
            case "select":
                return (
                    <div>
                        <label className="block font-medium capitalize">{path.split(".").pop()}</label>
                        <select {...fieldProps} className="border rounded p-2 w-full">
                            <option value="">Select</option>
                            <option value="Option1">Option1</option>
                            <option value="Option2">Option2</option>
                        </select>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                    </div>
                );
            default:
                return (
                    <div>
                        <label className="block font-medium capitalize">{path.split(".").pop()}</label>
                        <input type={type} {...fieldProps} className="border rounded p-2 w-full" />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                    </div>
                );
        }
    };

    const renderSection = (section, parentPath = "") => {
        return Object.entries(section).map(([key, value]) => {
            const path = parentPath ? `${parentPath}.${key}` : key;
            if (value.type) {
                return <div key={path}>{renderInput(key, path, value.type)}</div>;
            } else {
                return (
                    <fieldset key={path} className="border p-4 rounded space-y-2">
                        <legend className="font-bold capitalize">{key}</legend>
                        {renderSection(value, path)}
                    </fieldset>
                );
            }
        });
    };

    return (
        <form onSubmit={formik.handleSubmit} className="w-full p-5">
            {renderSection(formSchema)}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={populateDummyData}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Fill Dummy Data
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default DynamicForm;
