import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ArrowUpToLine } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfUploadViewer = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="p-4 m-4 w-full flex-col rounded-[1rem]  border-4 border-gray-300 border-dashed flex items-center bg-white h-screen ">
            
            
            <h1 className="text-xl font-bold bg-amber-200">PDF Upload & Viewer</h1>

            {/* upload button */}

            <div className="flex flex-col items-center justify-center p-4">
                <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-lg shadow  transition-colors"
                >
                    Upload File

                    <ArrowUpToLine size={16} />
                </label>
                <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={onFileChange}
                />
            </div>

            {file && (
                <div className="mt-4 border p-4 bg-red-200">
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="space-y-4"
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={600}
                            />
                        ))}
                    </Document>
                </div>
            )}
        </div>
    );
};

export default PdfUploadViewer;
